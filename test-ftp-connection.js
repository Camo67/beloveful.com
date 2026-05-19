#!/usr/bin/env node

/**
 * Test script to diagnose FTP connection issues with Bluehost
 */

import { Client } from 'basic-ftp';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs/promises';

// Load environment variables
dotenv.config({ path: '.env' });
dotenv.config({ path: '.env.local', override: true });

console.log('🔍 Testing FTP Connection to Bluehost\n');
console.log('Configuration:');
console.log(`  Host: ${process.env.CPANEL_FTP_HOST || 'NOT SET'}`);
console.log(`  Port: ${process.env.CPANEL_FTP_PORT || '21 (default)'}`);
console.log(`  User: ${process.env.CPANEL_FTP_USER || 'NOT SET'}`);
console.log(`  Password: ${process.env.CPANEL_FTP_PASSWORD ? '***SET***' : 'NOT SET'}`);
console.log(`  Root: ${process.env.CPANEL_FTP_ROOT || '/public_html/images'}`);
console.log(`  Secure: ${process.env.CPANEL_FTP_SECURE || 'false'}\n`);

if (!process.env.CPANEL_FTP_HOST || !process.env.CPANEL_FTP_USER || !process.env.CPANEL_FTP_PASSWORD) {
  console.error('❌ ERROR: Missing required FTP credentials!');
  console.error('\nPlease set the following in your .env.local file:');
  console.error('  CPANEL_FTP_HOST=your-bluehost-ip-or-domain');
  console.error('  CPANEL_FTP_USER=your-ftp-username');
  console.error('  CPANEL_FTP_PASSWORD=your-ftp-password');
  process.exit(1);
}

async function tryFtpSimpleConfig() {
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
        console.log(`✅ Found VS Code ftp-simple config: ${first.name || first.host}`);
        return first;
      }
    } catch (e) {
      // ignore missing files
    }
  }
  console.log('⚠️  No VS Code ftp-simple config found');
  return null;
}

async function testConnection() {
  const client = new Client();
  client.ftp.verbose = true;

  try {
    console.log('📡 Attempting FTP connection...\n');
    
    await client.access({
      host: process.env.CPANEL_FTP_HOST,
      user: process.env.CPANEL_FTP_USER,
      password: process.env.CPANEL_FTP_PASSWORD,
      port: Number(process.env.CPANEL_FTP_PORT || 21),
      secure: (process.env.CPANEL_FTP_SECURE || '').toLowerCase() === 'true',
    });

    console.log('✅ Successfully connected to FTP server!\n');

    // Try to list root directory
    console.log('📂 Listing root directory...');
    const rootEntries = await client.list('.');
    console.log(`   Found ${rootEntries.length} entries in root\n`);

    // Try to access the configured root path
    const ftpRoot = process.env.CPANEL_FTP_ROOT || '/public_html/images';
    console.log(`📂 Trying to access: ${ftpRoot}`);
    try {
      const entries = await client.list(ftpRoot);
      console.log(`   ✅ Successfully accessed ${ftpRoot}`);
      console.log(`   Found ${entries.length} entries:\n`);
      
      entries.slice(0, 10).forEach(entry => {
        const type = entry.isDirectory ? 'DIR ' : 'FILE';
        console.log(`     ${type} ${entry.name} (${entry.size} bytes)`);
      });
      
      if (entries.length > 10) {
        console.log(`     ... and ${entries.length - 10} more`);
      }
    } catch (err) {
      console.error(`   ❌ Failed to access ${ftpRoot}:`, err.message);
    }

    console.log('\n✅ FTP connection test completed successfully!');
  } catch (error) {
    console.error('\n❌ FTP connection failed!');
    console.error('Error:', error.message);
    console.error('\nCommon issues:');
    console.error('  1. Incorrect FTP credentials (host, username, or password)');
    console.error('  2. Firewall blocking FTP connection');
    console.error('  3. FTP server not running on Bluehost');
    console.error('  4. Wrong port (try 21 for FTP, 22 for SFTP)');
    console.error('  5. Passive mode issues (try setting secure: false)');
    console.error('\nTroubleshooting steps:');
    console.error('  1. Verify credentials in Bluehost cPanel');
    console.error('  2. Check if you can connect using an FTP client (FileZilla, etc.)');
    console.error('  3. Ensure your IP is not blocked by Bluehost firewall');
    console.error('  4. Try connecting with explicit FTP over TLS (secure: true)');
  } finally {
    client.close();
  }
}

// Main execution
(async () => {
  // Try to load from VS Code config if env vars are missing
  if (!process.env.CPANEL_FTP_PASSWORD) {
    console.log('⚠️  FTP password not set in environment variables');
    console.log('   Checking VS Code ftp-simple config...\n');
    const config = await tryFtpSimpleConfig();
    if (config) {
      process.env.CPANEL_FTP_HOST = process.env.CPANEL_FTP_HOST || config.host;
      process.env.CPANEL_FTP_USER = process.env.CPANEL_FTP_USER || config.username;
      process.env.CPANEL_FTP_PASSWORD = process.env.CPANEL_FTP_PASSWORD || config.password;
      if (!process.env.CPANEL_FTP_ROOT && config.path && config.path !== '/') {
        process.env.CPANEL_FTP_ROOT = config.path;
      }
      console.log('   ✅ Loaded credentials from ftp-simple config\n');
    }
  }

  await testConnection();
})();
