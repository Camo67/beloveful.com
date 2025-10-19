#!/usr/bin/env node

/**
 * Adds missing countries from public folder to data.ts
 * Scans for images and creates album entries
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_PATH = path.join(__dirname, '../src/lib/data.ts');
const PUBLIC_PATH = path.join(__dirname, '../public/Website beloveful.com');

// Countries to add with their folder mappings
const missingCountries = [
  {
    country: 'South Africa',
    region: 'Africa',
    slug: 'south-africa',
    publicFolder: 'Africa/South Africa'
  },
  {
    country: 'Portugal',
    region: 'Europe',
    slug: 'portugal',
    publicFolder: 'Europe & Scandinavia/Portugal'
  },
  {
    country: 'New York',
    region: 'North America',
    slug: 'new-york',
    publicFolder: 'North America/New York'
  },
  {
    country: 'Cuba',
    region: 'North America', // Or should this be Central America & Caribbean?
    slug: 'cuba',
    publicFolder: 'Central America & Caribbean/Cuba'
  }
];

console.log('📂 Scanning public folders for images...\n');

const foundAlbums = [];

missingCountries.forEach(({ country, region, slug, publicFolder }) => {
  const folderPath = path.join(PUBLIC_PATH, publicFolder);
  
  if (!fs.existsSync(folderPath)) {
    console.log(`⚠️  Folder not found: ${publicFolder}`);
    return;
  }
  
  const files = fs.readdirSync(folderPath)
    .filter(f => /\.(jpg|jpeg|png)$/i.test(f))
    .sort();
  
  if (files.length === 0) {
    console.log(`⚠️  No images in ${publicFolder}`);
    return;
  }
  
  console.log(`✅ ${country}: Found ${files.length} images`);
  
  // For now, we'll note that these images exist locally
  // They would need to be uploaded to Cloudinary first
  foundAlbums.push({
    country,
    region,
    slug,
    imageCount: files.length,
    folderPath: publicFolder,
    files: files.slice(0, 5) // Show first 5 as sample
  });
});

console.log('\n📊 Summary:\n');
foundAlbums.forEach(album => {
  console.log(`  ${album.country} (${album.region})`);
  console.log(`    Slug: ${album.slug}`);
  console.log(`    Images: ${album.imageCount}`);
  console.log(`    Folder: ${album.folderPath}`);
  console.log(`    Sample files:`, album.files.slice(0, 3).join(', '));
  console.log('');
});

console.log('\n⚠️  IMPORTANT:');
console.log('   These images are in the public folder but not in portfolio.');
console.log('   To add them to the portfolio, you need to:');
console.log('   1. Upload the images to Cloudinary');
console.log('   2. Get the Cloudinary URLs');
console.log('   3. Add album entries to data.ts with those URLs\n');
console.log('   Run the Cloudinary import script to do this automatically.');
