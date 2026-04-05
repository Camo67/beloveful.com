#!/usr/bin/env node

import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const HOMEPAGE_DIR = path.join(__dirname, 'public', 'Website beloveful.com', 'Homepage');

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

async function uploadFile(filePath, folder) {
  const filename = path.basename(filePath);
  
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: `Website beloveful.com/Homepage/${folder}`,
      public_id: path.basename(filename, path.extname(filename)),
      overwrite: true,
      use_filename: true,
      unique_filename: false
    });
    
    console.log(`✓ ${filename}`);
    return { success: true, file: filename, url: result.secure_url, folder };
  } catch (error) {
    console.error(`✗ ${filename} - ${error.message}`);
    return { success: false, file: filename, error: error.message, folder };
  }
}

async function uploadHomepage() {
  console.log('Uploading Homepage Slideshow Images (with delays)...\n');
  
  const desktopDir = path.join(HOMEPAGE_DIR, 'Desktop Landscape');
  const mobileDir = path.join(HOMEPAGE_DIR, 'Mobile Portrait');
  
  const desktopFiles = fs.readdirSync(desktopDir)
    .filter(f => /\.(jpg|jpeg|png)$/i.test(f))
    .map(f => path.join(desktopDir, f));
  
  const mobileFiles = fs.readdirSync(mobileDir)
    .filter(f => /\.(jpg|jpeg|png)$/i.test(f))
    .map(f => path.join(mobileDir, f));
  
  console.log(`Desktop: ${desktopFiles.length} images`);
  console.log(`Mobile: ${mobileFiles.length} images\n`);
  
  const results = [];
  
  console.log('--- Desktop Landscape ---');
  for (const file of desktopFiles) {
    results.push(await uploadFile(file, 'Desktop Landscape'));
    await sleep(2000); // 2 second delay
  }
  
  console.log('\n--- Mobile Portrait ---');
  for (const file of mobileFiles) {
    results.push(await uploadFile(file, 'Mobile Portrait'));
    await sleep(2000); // 2 second delay
  }
  
  const successful = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;
  
  console.log(`\n${'='.repeat(50)}`);
  console.log(`Complete: ${successful} uploaded, ${failed} failed`);
  console.log('='.repeat(50));
  
  const report = {
    timestamp: new Date().toISOString(),
    successful,
    failed,
    results
  };
  
  fs.writeFileSync('homepage-upload-report.json', JSON.stringify(report, null, 2));
  console.log('\nReport saved to homepage-upload-report.json');
}

uploadHomepage().catch(console.error);
