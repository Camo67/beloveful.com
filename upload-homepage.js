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

async function waitForResource(publicId, maxWaitSeconds = 30) {
  const startTime = Date.now();
  const maxWaitMs = maxWaitSeconds * 1000;
  
  while (Date.now() - startTime < maxWaitMs) {
    try {
      const resource = await cloudinary.api.resource(publicId, { resource_type: 'image' });
      if (resource.secure_url) {
        return resource;
      }
    } catch (error) {
      // Resource not found yet, wait and retry
    }
    await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2s between checks
  }
  throw new Error('Timeout waiting for resource to be available');
}

async function uploadFile(filePath, folder, maxRetries = 3) {
  const filename = path.basename(filePath);
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const publicId = path.basename(filename, path.extname(filename));
      const fullPublicId = `beloveful-website/Homepage/${folder}/${publicId}`;
      const uploadOptions = {
        folder: `beloveful-website/Homepage/${folder}`,
        public_id: publicId,
        overwrite: true,
        unique_filename: false,
        resource_type: 'image'
      };
      
      // Upload (may be async)
      const result = await cloudinary.uploader.upload(filePath, uploadOptions);
      
      // If pending or no URL, wait for processing
      let url = result.secure_url || result.url;
      let finalResult = result;
      
      if (!url || result.status === 'pending') {
        console.log(`  ⏳ ${filename} - processing...`);
        finalResult = await waitForResource(fullPublicId, 30);
        url = finalResult.secure_url;
      }
      
      console.log(`✓ ${filename} -> ${url}`);
      return { 
        success: true, 
        file: filename, 
        url: url, 
        publicId: finalResult.public_id, 
        folder,
        bytes: finalResult.bytes,
        format: finalResult.format
      };
    } catch (error) {
      const isRetryable = error.http_code === 503 || 
                         error.http_code === 429 || 
                         error.message.includes('503') ||
                         error.message.includes('Timeout');
      
      if (isRetryable && attempt < maxRetries) {
        const delay = Math.pow(2, attempt) * 1000; // Exponential backoff: 2s, 4s, 8s
        console.log(`⚠ ${filename} - ${error.message} (attempt ${attempt}/${maxRetries}, retrying in ${delay/1000}s...)`);
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        console.error(`✗ ${filename} - ${error.message}${attempt > 1 ? ` (failed after ${attempt} attempts)` : ''}`);
        return { success: false, file: filename, error: error.message, folder, attempts: attempt };
      }
    }
  }
  // Should not reach here, but just in case
  return { success: false, file: filename, error: 'Max retries exceeded', folder };
}

async function uploadHomepage() {
  console.log('Uploading Homepage Slideshow Images...\n');
  
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
    results.push(await uploadFile(file, 'Desktop'));
  }
  
  console.log('\n--- Mobile Portrait ---');
  for (const file of mobileFiles) {
    results.push(await uploadFile(file, 'Mobile'));
  }
  
  const successful = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;
  
  console.log(`\n${'='.repeat(50)}`);
  console.log(`Complete: ${successful} uploaded, ${failed} failed`);
  console.log('='.repeat(50));
  
  fs.writeFileSync(
    'homepage-upload-report.json',
    JSON.stringify(results, null, 2)
  );
}

uploadHomepage().catch(console.error);
