import { Client } from 'basic-ftp';
import fs from 'fs/promises';
import path from 'path';

const IMAGE_EXTENSIONS = new Set([
  '.jpg', '.jpeg', '.png', '.gif', '.webp', '.tif', '.tiff', '.bmp', '.svg', '.avif', '.heic'
]);

function isSafeName(name: string) {
  return name && name !== '.' && name !== '..' && !name.startsWith('__MACOSX') && !name.startsWith('.');
}

function isImageFile(name: string) {
  const ext = path.extname(name || '').toLowerCase();
  return IMAGE_EXTENSIONS.has(ext);
}

export function ftpSyncMiddleware() {
  return {
    name: 'ftp-sync-middleware',
    configureServer(server: any) {
      server.middlewares.use('/dev-api/ftp-sync', async (req: any, res: any) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end('Method Not Allowed');
          return;
        }

        try {
          const paths = await performFtpScan();
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ success: true, paths }));
        } catch (err: any) {
          console.error('FTP Sync Error:', err);
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          
          // Provide helpful error messages based on error type
          let errorMessage = err.message || 'Unknown FTP error';
          let errorCode = 'UNKNOWN_ERROR';
          
          if (err.message?.includes('credentials not found')) {
            errorCode = 'MISSING_CREDENTIALS';
            errorMessage = 'FTP credentials are missing. Please set CPANEL_FTP_HOST, CPANEL_FTP_USER, and CPANEL_FTP_PASSWORD in your .env.local file. See .env.local.template for instructions.';
          } else if (err.code === 'ECONNREFUSED') {
            errorCode = 'CONNECTION_REFUSED';
            errorMessage = `Cannot connect to FTP server at ${process.env.CPANEL_FTP_HOST}:${process.env.CPANEL_FTP_PORT || 21}. Check that the host and port are correct, and ensure your firewall allows FTP connections.`;
          } else if (err.code === 'ETIMEDOUT' || err.message?.includes('timeout')) {
            errorCode = 'TIMEOUT';
            errorMessage = `Connection timed out to ${process.env.CPANEL_FTP_HOST}:${process.env.CPANEL_FTP_PORT || 21}. The server may be unreachable or blocking your IP.`;
          } else if (err.message?.includes('530') || err.message?.toLowerCase().includes('login')) {
            errorCode = 'AUTH_FAILED';
            errorMessage = 'FTP authentication failed. Please verify your username and password in Bluehost cPanel > FTP Accounts.';
          } else if (err.code === 'ENOTFOUND') {
            errorCode = 'HOST_NOT_FOUND';
            errorMessage = `FTP host '${process.env.CPANEL_FTP_HOST}' not found. Please check the hostname is correct.`;
          }
          
          res.end(JSON.stringify({ 
            success: false, 
            error: errorMessage,
            code: errorCode,
            hint: 'Check your .env.local file and ensure FTP credentials are correct. Run "node test-ftp-connection.js" to diagnose connection issues.'
          }));
        }
      });
    }
  };
}

async function performFtpScan() {
  let FTP_HOST = process.env.CPANEL_FTP_HOST;
  let FTP_USER = process.env.CPANEL_FTP_USER;
  let FTP_PASSWORD = process.env.CPANEL_FTP_PASSWORD;
  let FTP_PORT = Number(process.env.CPANEL_FTP_PORT || 21);
  let FTP_ROOT = process.env.CPANEL_FTP_ROOT || '/public_html/images';
  const SECURE = (process.env.CPANEL_FTP_SECURE || '').toLowerCase() === 'true';

  // Try to load credentials from VS Code ftp-simple config if env vars are missing
  if (!FTP_HOST || !FTP_USER || !FTP_PASSWORD) {
    console.log('⚠️  FTP credentials incomplete in environment variables, checking VS Code ftp-simple config...');
    
    const home = process.env.HOME || process.env.USERPROFILE;
    const candidates = [];
    if (home) {
      candidates.push(path.join(home, '.config', 'Code', 'User', 'globalStorage', 'humy2833.ftp-simple', 'ftp-simple-temp.json'));
    }
    candidates.push(path.join(process.cwd(), '.config', 'Code', 'User', 'globalStorage', 'humy2833.ftp-simple', 'ftp-simple-temp.json'));

    for (const configPath of candidates) {
      try {
        const raw = await fs.readFile(configPath, 'utf8');
        const parsed = JSON.parse(raw);
        const first = Array.isArray(parsed) ? parsed[0] : null;
        if (first) {
          console.log(`✅ Loaded FTP credentials from: ${first.name || first.host}`);
          FTP_HOST = FTP_HOST || first.host;
          FTP_USER = FTP_USER || first.username;
          FTP_PASSWORD = FTP_PASSWORD || first.password;
          if (!process.env.CPANEL_FTP_ROOT && first.path && first.path !== '/') {
            FTP_ROOT = first.path;
          }
          break;
        }
      } catch (e: any) {
        if (e.code !== 'ENOENT') {
          console.warn('⚠️  Error reading ftp-simple config:', e.message);
        }
      }
    }
  }

  // Final validation - throw helpful error if still missing
  const missing = [];
  if (!FTP_HOST) missing.push('CPANEL_FTP_HOST');
  if (!FTP_USER) missing.push('CPANEL_FTP_USER');
  if (!FTP_PASSWORD) missing.push('CPANEL_FTP_PASSWORD');
  
  if (missing.length > 0) {
    const errorMsg = `Missing FTP credentials: ${missing.join(', ')}. Please add these to your .env.local file. See .env.local.template for an example.`;
    console.error('❌', errorMsg);
    throw new Error(errorMsg);
  }

  console.log(`📡 Connecting to FTP: ${FTP_HOST}:${FTP_PORT} as ${FTP_USER}`);

  const client = new Client();
  client.ftp.verbose = false; // Set to true for detailed FTP debugging
  const allPaths: string[] = [];

  async function scanDir(remotePath: string, relativeParts: string[]) {
    let entries;
    try {
      entries = await client.list(remotePath);
    } catch (error: any) {
      console.warn(`Failed to list ${remotePath}:`, error.message);
      return;
    }

    for (const entry of entries) {
      if (!isSafeName(entry.name)) continue;
      if (entry.isDirectory) {
        await scanDir(`${remotePath}/${entry.name}`, [...relativeParts, entry.name]);
      } else if (isImageFile(entry.name)) {
        allPaths.push(`/Website beloveful.com/${[...relativeParts, entry.name].join('/')}`);
      }
    }
  }

  try {
    await client.access({
      host: FTP_HOST,
      user: FTP_USER,
      password: FTP_PASSWORD,
      port: FTP_PORT,
      secure: SECURE,
    });
    
    console.log(`✅ Connected to FTP server`);
    console.log(`📂 Scanning directory: ${FTP_ROOT}`);
    
    let rootEntries = await client.list(FTP_ROOT);
    rootEntries = rootEntries.filter(entry => entry.isDirectory && isSafeName(entry.name));

    console.log(`📁 Found ${rootEntries.length} subdirectories to scan`);

    for (const entry of rootEntries) {
      await scanDir(`${FTP_ROOT}/${entry.name}`, [entry.name]);
    }
    
    console.log(`✅ Scan complete: found ${allPaths.length} images`);
  } finally {
    client.close();
  }

  return allPaths;
}
