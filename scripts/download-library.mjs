import { Client } from 'basic-ftp';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');
const outputRoot = path.join(repoRoot, 'public', 'Website beloveful.com');

const FTP_HOST = process.env.CPANEL_FTP_HOST;
const FTP_USER = process.env.CPANEL_FTP_USER;
const FTP_PASSWORD = process.env.CPANEL_FTP_PASSWORD;
const FTP_PORT = Number(process.env.CPANEL_FTP_PORT || 21);
const FTP_ROOT = process.env.CPANEL_FTP_ROOT || '/public_html/beloveful.com/public_html/Website beloveful.com';
const SECURE = (process.env.CPANEL_FTP_SECURE || '').toLowerCase() === 'true';

async function main() {
  if (!FTP_HOST || !FTP_USER || !FTP_PASSWORD) {
    console.error('❌ Missing FTP credentials in .env');
    process.exit(1);
  }

  const client = new Client();
  client.ftp.verbose = true;

  try {
    await client.access({
      host: FTP_HOST,
      user: FTP_USER,
      password: FTP_PASSWORD,
      port: FTP_PORT,
      secure: SECURE,
    });

    console.log(`☁️  Connected to ${FTP_HOST}`);
    console.log(`📂 Downloading from ${FTP_ROOT} to ${outputRoot}`);

    await fs.mkdir(outputRoot, { recursive: true });
    await client.downloadToDir(outputRoot, FTP_ROOT);

    console.log('🎉 Download complete!');
    
    console.log('🔄 Generating metadata...');
    const { execSync } = await import('child_process');
    execSync(`node scripts/generate-metadata.mjs`, { stdio: 'inherit' });
    
    console.log('✨ All done!');
  } catch (err) {
    console.error('❌ Download failed:', err);
  } finally {
    client.close();
  }
}

main();
