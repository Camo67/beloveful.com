#!/usr/bin/env node

import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

const CLOUDINARY_BASE = `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}`;

// Region to folder mapping
const REGION_MAP = {
  'Africa': ['Africa'],
  'Asia': ['Asia'],
  'Middle East': ['Middle East'],
  'South America': ['South America'],
  'North America': ['North America'],
  'Europe': ['Europe & Scandinavia'],
  'Oceania': ['Oceania', 'Australia & New Zealand'],
  'Erasing Borders': ['Erasing Borders']
};

// Fetch all resources from Cloudinary
async function fetchAllImages() {
  console.log('Fetching images from Cloudinary...\n');
  
  let allResources = [];
  let nextCursor = null;
  
  do {
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: 'beloveful/',
      max_results: 500,
      next_cursor: nextCursor
    });
    
    allResources = allResources.concat(result.resources);
    nextCursor = result.next_cursor;
    console.log(`Fetched ${allResources.length} images...`);
  } while (nextCursor);
  
  console.log(`\nTotal images fetched: ${allResources.length}\n`);
  return allResources;
}

// Parse path to extract region/country
function parseImagePath(publicId) {
  // Remove prefix: beloveful/Africa/Egypt/image.jpg -> Africa/Egypt/image.jpg
  const path = publicId.replace('beloveful/', '');
  const parts = path.split('/');
  
  if (parts.length < 2) return null;
  
  const folder = parts[0];
  const country = parts[1];
  const filename = parts[parts.length - 1];
  
  // Find matching region
  let region = null;
  for (const [regionName, folders] of Object.entries(REGION_MAP)) {
    if (folders.includes(folder)) {
      region = regionName;
      break;
    }
  }
  
  return { region, country, filename, path };
}

// Generate image URLs with transformations
function generateImageURLs(publicId) {
  const encodedId = encodeURIComponent(publicId).replace(/%2F/g, '/');
  
  return {
    desktop: `${CLOUDINARY_BASE}/image/upload/f_auto,q_auto,w_1920/${encodedId}`,
    mobile: `${CLOUDINARY_BASE}/image/upload/f_auto,q_auto,w_800/${encodedId}`
  };
}

// Organize images by country
function organizeByCountry(images) {
  const albums = new Map();
  
  for (const image of images) {
    const parsed = parseImagePath(image.public_id);
    if (!parsed || !parsed.region || !parsed.country) continue;
    
    const key = `${parsed.region}:${parsed.country}`;
    
    if (!albums.has(key)) {
      albums.set(key, {
        region: parsed.region,
        country: parsed.country,
        slug: parsed.country.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        images: []
      });
    }
    
    const urls = generateImageURLs(image.public_id);
    albums.get(key).images.push(urls);
  }
  
  return Array.from(albums.values());
}

// Generate TypeScript data file
function generateDataFile(albums) {
  const albumsJson = JSON.stringify(albums, null, 2);
  
  const content = `// Auto-generated from Cloudinary on ${new Date().toISOString()}
// Run: node generate-cloudinary-data.js

import { CountryAlbum } from './data';

export const CLOUDINARY_ALBUMS: CountryAlbum[] = ${albumsJson};
`;
  
  fs.writeFileSync('src/lib/cloudinaryData.ts', content);
  console.log('✓ Generated src/lib/cloudinaryData.ts');
}

// Generate summary report
function generateReport(albums) {
  console.log('\n' + '='.repeat(60));
  console.log('ALBUM SUMMARY');
  console.log('='.repeat(60) + '\n');
  
  const byRegion = new Map();
  
  for (const album of albums) {
    if (!byRegion.has(album.region)) {
      byRegion.set(album.region, []);
    }
    byRegion.get(album.region).push(album);
  }
  
  for (const [region, regionAlbums] of byRegion.entries()) {
    console.log(`\n${region}:`);
    for (const album of regionAlbums) {
      console.log(`  - ${album.country}: ${album.images.length} images`);
    }
  }
  
  console.log('\n' + '='.repeat(60));
  console.log(`Total Albums: ${albums.length}`);
  console.log(`Total Images: ${albums.reduce((sum, a) => sum + a.images.length, 0)}`);
  console.log('='.repeat(60) + '\n');
}

// Main function
async function main() {
  try {
    const images = await fetchAllImages();
    const albums = organizeByCountry(images);
    
    generateDataFile(albums);
    generateReport(albums);
    
    console.log('✅ Complete! Import in data.ts:');
    console.log("   import { CLOUDINARY_ALBUMS } from './cloudinaryData';\n");
    
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main();
