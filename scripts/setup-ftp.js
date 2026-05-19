#!/usr/bin/env node

/**
 * Interactive setup script for Bluehost FTP credentials
 * Run with: node scripts/setup-ftp.js
 */

import fs from 'fs/promises';
import path from 'path';
import readline from 'readline';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question, defaultValue) {
  return new Promise((resolve) => {
    const defaultText = defaultValue ? ` [${defaultValue}]` : '';
    rl.question(`${question}${defaultText}: `, (answer) => {
      resolve(answer.trim() || defaultValue || '');
    });
  });
}

async function main() {
  console.log('\n🔧 Bluehost FTP Setup Assistant\n');
  console.log('This will help you configure FTP access for the admin panel.\n');
  console.log('You can find your FTP credentials in Bluehost cPanel > FTP Accounts\n');

  // Check if .env.local already exists
  const envLocalPath = path.join(rootDir, '.env.local');
  let existingConfig = {};
  
  try {
    const content = await fs.readFile(envLocalPath, 'utf8');
    console.log('✅ Found existing .env.local file\n');
    
    // Parse existing values
    content.split('\n').forEach(line => {
      const match = line.match(/^([^#][^=]+)=(.*)$/);
      if (match) {
        existingConfig[match[1].trim()] = match[2].trim();
      }
    });
  } catch (e) {
    console.log('ℹ️  No .env.local file found. Will create a new one.\n');
  }

  console.log('Enter your Bluehost FTP credentials:\n');

  // Get credentials with defaults from existing config or template
  const host = await ask(
    'FTP Host (IP or domain)',
    existingConfig.CPANEL_FTP_HOST || '67.222.38.79'
  );
  
  const port = await ask(
    'FTP Port',
    existingConfig.CPANEL_FTP_PORT || '21'
  );
  
  const user = await ask(
    'FTP Username',
    existingConfig.CPANEL_FTP_USER || 'belovefu'
  );
  
  const password = await ask(
    'FTP Password',
    existingConfig.CPANEL_FTP_PASSWORD || ''
  );

  if (!password) {
    console.log('\n⚠️  Warning: Empty password provided!');
    const confirmEmpty = await ask('Continue anyway? (yes/no)', 'no');
    if (confirmEmpty.toLowerCase() !== 'yes') {
      console.log('\n❌ Setup cancelled. Please run again with a valid password.');
      rl.close();
      return;
    }
  }

  const ftpRoot = await ask(
    'FTP Root Path',
    existingConfig.CPANEL_FTP_ROOT || '/public_html/beloveful.com/public_html/images'
  );
  
  const secure = await ask(
    'Use Secure FTP (FTPS)?',
    existingConfig.CPANEL_FTP_SECURE || 'false'
  );

  const baseUrl = await ask(
    'Public Base URL for images',
    existingConfig.CPANEL_IMAGES_BASE_URL || '/Website%20beloveful.com'
  );

  // Generate .env.local content
  const envContent = `# Local Environment Configuration - Auto-generated
# IMPORTANT: Do NOT commit this file to version control!

# Bluehost FTP Configuration
CPANEL_FTP_HOST=${host}
CPANEL_FTP_PORT=${port}
CPANEL_FTP_USER=${user}
CPANEL_FTP_PASSWORD=${password}
CPANEL_FTP_ROOT=${ftpRoot}
CPANEL_FTP_SECURE=${secure}
CPANEL_IMAGES_BASE_URL=${baseUrl}

# Development settings
VITE_DEV_MODE=true
VITE_DEBUG_UPLOADS=false

# Contact Form Configuration
CONTACT_FORM_TO_EMAIL=tony@beloveful.com
CONTACT_FORM_FROM_EMAIL=website@beloveful.com
CONTACT_FORM_FROM_NAME=Beloveful Contact Form
`;

  // Write to .env.local
  await fs.writeFile(envLocalPath, envContent, 'utf8');
  console.log('\n✅ Configuration saved to .env.local\n');

  // Ask to test connection
  const testNow = await ask('Would you like to test the connection now? (yes/no)', 'yes');
  
  if (testNow.toLowerCase() === 'yes') {
    console.log('\n🧪 Testing FTP connection...\n');
    
    // Load the test script
    const testScript = path.join(rootDir, 'test-ftp-connection.js');
    try {
      const { spawn } = await import('child_process');
      const child = spawn('node', [testScript], { stdio: 'inherit' });
      
      await new Promise((resolve, reject) => {
        child.on('close', (code) => {
          if (code === 0) {
            resolve();
          } else {
            reject(new Error(`Test failed with code ${code}`));
          }
        });
      });
      
      console.log('\n✅ FTP connection test completed!\n');
    } catch (error) {
      console.error('\n❌ Connection test failed:', error.message);
      console.error('\nPlease check your credentials and try again.');
      console.error('You can also run "node test-ftp-connection.js" manually for more details.\n');
    }
  }

  console.log('\n📝 Next steps:');
  console.log('1. Start your dev server: npm run dev');
  console.log('2. Go to Admin Panel > Images > Upload Images');
  console.log('3. Click "Scan Bluehost FTP" to scan for images\n');

  rl.close();
}

main().catch((error) => {
  console.error('\n❌ Setup failed:', error.message);
  rl.close();
  process.exit(1);
});
