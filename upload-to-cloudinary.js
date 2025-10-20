#!/usr/bin/env node

import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Configure Cloudinary explicitly
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

// Configuration from your settings
const UPLOAD_CONFIG = {
  overwrite: true,
  use_filename: true,
  unique_filename: false, // Keep original names
  type: 'upload',
  resource_type: 'image',
  invalidate: true, // Invalidate CDN cache on overwrite
  // notification_url: 'https://your-webhook-url.com/notify', // Optional
  // async: true, // Process asynchronously
};

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB limit for free tier
const MAX_RETRIES = 3; // Retry failed uploads
const RETRY_DELAY = 2000; // Wait 2s before retry
const UPLOAD_DELAY = 100; // 100ms between uploads to avoid rate limits

// Sleep utility
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SOURCE_DIR = path.join(__dirname, 'public', 'Website beloveful.com');

// Get all image files recursively
function getImageFiles(dir) {
  const files = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      files.push(...getImageFiles(fullPath));
    } else if (/\.(jpg|jpeg|png|gif|webp)$/i.test(item.name)) {
      files.push(fullPath);
    }
  }
  return files;
}

// Upload single file with retry logic
async function uploadFile(filePath, retryCount = 0) {
  const relativePath = path.relative(SOURCE_DIR, filePath);
  const displayName = path.basename(filePath, path.extname(filePath));
  
  // Check file size
  const stats = fs.statSync(filePath);
  if (stats.size > MAX_FILE_SIZE) {
    console.log(`⚠ Skipped: ${relativePath} - File too large (${(stats.size / 1024 / 1024).toFixed(2)}MB)`);
    return { success: false, file: relativePath, error: 'File too large', skipped: true };
  }
  
  // Clean public_id: remove extensions and normalize
  const publicId = relativePath
    .replace(/\\/g, '/')           // Windows path fix
    .replace(/\.[^.]+$/, '')      // Remove extension
    .trim()                        // Remove whitespace
    .replace(/\s+$/, '');          // Remove trailing spaces
  
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      ...UPLOAD_CONFIG,
      folder: 'beloveful',
      display_name: displayName,
      public_id: publicId,
      tags: ['portfolio', 'beloveful-website']
    });
    
    console.log(`✓ Uploaded: ${relativePath}`);
    return { success: true, file: relativePath, url: result.secure_url, publicId: result.public_id };
  } catch (error) {
    const is503 = error.message.includes('503') || error.http_code === 503;
    const isRateLimit = error.message.includes('rate') || error.http_code === 429;
    
    // Retry on 503 or rate limit errors
    if ((is503 || isRateLimit) && retryCount < MAX_RETRIES) {
      const delay = RETRY_DELAY * Math.pow(2, retryCount); // Exponential backoff
      console.log(`⟳ Retry ${retryCount + 1}/${MAX_RETRIES}: ${relativePath} (waiting ${delay}ms)`);
      await sleep(delay);
      return uploadFile(filePath, retryCount + 1);
    }
    
    console.error(`✗ Failed: ${relativePath} - ${error.message}`);
    return { success: false, file: relativePath, error: error.message, retries: retryCount };
  }
}

// Main upload function
async function uploadAll() {
  console.log('Starting Cloudinary upload...\n');
  
  if (!fs.existsSync(SOURCE_DIR)) {
    console.error(`Source directory not found: ${SOURCE_DIR}`);
    process.exit(1);
  }
  
  const files = getImageFiles(SOURCE_DIR);
  console.log(`Found ${files.length} image files\n`);
  
  const results = [];
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const result = await uploadFile(file);
    results.push(result);
    
    // Progress indicator
    if ((i + 1) % 50 === 0) {
      console.log(`\n📊 Progress: ${i + 1}/${files.length} (${((i + 1) / files.length * 100).toFixed(1)}%)\n`);
    }
    
    // Small delay to avoid rate limiting
    if (i < files.length - 1) {
      await sleep(UPLOAD_DELAY);
    }
  }
  
  // Summary
  const successful = results.filter(r => r.success).length;
  const skipped = results.filter(r => r.skipped).length;
  const failed = results.filter(r => !r.success && !r.skipped).length;
  
  console.log(`\n${'='.repeat(50)}`);
  console.log(`Upload complete:`);
  console.log(`  ✓ Successful: ${successful}`);
  console.log(`  ⚠ Skipped: ${skipped} (too large)`);
  console.log(`  ✗ Failed: ${failed}`);
  console.log('='.repeat(50));
  
  // Save report
  fs.writeFileSync(
    'cloudinary-upload-report.json',
    JSON.stringify(results, null, 2)
  );
  console.log('\nDetailed report saved to: cloudinary-upload-report.json');
}

uploadAll().catch(console.error);
