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
const BASE_DIR = path.join(__dirname, 'public', 'Website beloveful.com');

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const REGIONS = [
  'Africa',
  'Asia',
  'Middle East',
  'South America',
  'North America',
  'Europe & Scandinavia',
  'Oceania',
  'Erasing Borders'
];

async function uploadFile(filePath, region, country) {
  const filename = path.basename(filePath);
  
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: `Website beloveful.com/${region}/${country}`,
      public_id: path.basename(filename, path.extname(filename)),
      overwrite: true,
      use_filename: true,
      unique_filename: false
    });
    
    console.log(`  ✓ ${filename}`);
    return { success: true, file: filename, url: result.secure_url, region, country };
  } catch (error) {
    console.error(`  ✗ ${filename} - ${error.message}`);
    return { success: false, file: filename, error: error.message, region, country };
  }
}

async function getImageFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  
  return fs.readdirSync(dir)
    .filter(f => /\.(jpg|jpeg|png)$/i.test(f))
    .map(f => path.join(dir, f));
}

async function uploadPortfolio() {
  console.log('Uploading Travel Portfolio Images...\n');
  
  const results = [];
  let totalCount = 0;
  
  for (const region of REGIONS) {
    const regionDir = path.join(BASE_DIR, region);
    
    if (!fs.existsSync(regionDir)) {
      console.log(`⊘ ${region} - directory not found`);
      continue;
    }
    
    console.log(`\n=== ${region} ===`);
    
    const items = fs.readdirSync(regionDir, { withFileTypes: true });
    const countries = items.filter(item => item.isDirectory()).map(item => item.name);
    
    for (const country of countries) {
      const countryDir = path.join(regionDir, country);
      const images = await getImageFiles(countryDir);
      
      if (images.length === 0) continue;
      
      console.log(`\n${country} (${images.length} images)`);
      totalCount += images.length;
      
      for (const imagePath of images) {
        const result = await uploadFile(imagePath, region, country);
        results.push(result);
        await sleep(1500); // 1.5 second delay to avoid rate limiting
      }
    }
  }
  
  const successful = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;
  
  console.log(`\n${'='.repeat(60)}`);
  console.log(`COMPLETE: ${successful}/${totalCount} uploaded, ${failed} failed`);
  console.log('='.repeat(60));
  
  const report = {
    timestamp: new Date().toISOString(),
    totalImages: totalCount,
    successful,
    failed,
    results
  };
  
  fs.writeFileSync('portfolio-upload-report.json', JSON.stringify(report, null, 2));
  console.log('\nReport saved to portfolio-upload-report.json');
}

uploadPortfolio().catch(console.error);
