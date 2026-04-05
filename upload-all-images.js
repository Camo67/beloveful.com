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

// Mapping of folder names to proper region/country names
const REGION_MAP = {
  'Africa': 'Africa',
  'Asia': 'Asia',
  'Central America & Caribbean': 'Central America & Caribbean',
  'Europe & Scandinavia': 'Europe & Scandinavia',
  'Middle East': 'Middle East',
  'North America': 'North America',
  'South America': 'South America',
  'Erasing Borders': 'Erasing Borders'
};

const COUNTRY_SLUGS = {
  'Egypt': 'egypt',
  'Ethiopia': 'ethiopia',
  'Morocco': 'morocco',
  'Namibia': 'namibia',
  'South Africa': 'south-africa',
  'Hong Kong': 'hong-kong',
  'Japan': 'japan',
  'Myanmar': 'myanmar',
  'Nepal': 'nepal',
  'Thailand': 'thailand',
  'Vietnam': 'vietnam',
  'Caribbean': 'caribbean',
  'Cuba': 'cuba',
  'Mexico': 'mexico',
  'Puerto Rico': 'puerto-rico',
  'France': 'france',
  'Greece': 'greece',
  'Italy': 'italy',
  'Portugal': 'portugal',
  'Spain': 'spain',
  'UK & Ireland': 'uk-ireland',
  'Jordan': 'jordan',
  'Israel | Palestine': 'israel-palestine',
  'Chicago': 'chicago',
  'New York': 'new-york',
  'Argentina': 'argentina'
};

async function uploadFile(filePath, region, country) {
  const filename = path.basename(filePath);
  
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: `Website beloveful.com/${region}/${country}`,
      public_id: path.basename(filename, path.extname(filename)),
      overwrite: true,
      use_filename: true,
      unique_filename: false,
      resource_type: 'image'
    });
    
    process.stdout.write('.');
    return { success: true, file: filename, url: result.secure_url, region, country };
  } catch (error) {
    console.error(`\n  ✗ ${filename} - ${error.message}`);
    return { success: false, file: filename, error: error.message, region, country };
  }
}

async function getImageFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  
  return fs.readdirSync(dir)
    .filter(f => /\.(jpg|jpeg|png)$/i.test(f))
    .map(f => path.join(dir, f));
}

async function uploadAll() {
  console.log('Starting COMPLETE image upload to Cloudinary...\n');
  
  const results = [];
  let totalCount = 0;
  let uploadedCount = 0;
  const albums = [];
  
  for (const [regionFolder, regionName] of Object.entries(REGION_MAP)) {
    const regionDir = path.join(BASE_DIR, regionFolder);
    
    if (!fs.existsSync(regionDir)) {
      console.log(`⊘ ${regionName} - directory not found`);
      continue;
    }
    
    console.log(`\n${'='.repeat(60)}`);
    console.log(`${regionName}`);
    console.log('='.repeat(60));
    
    const items = fs.readdirSync(regionDir, { withFileTypes: true });
    const countries = items.filter(item => item.isDirectory()).map(item => item.name);
    
    for (const country of countries) {
      const countryDir = path.join(regionDir, country);
      const images = await getImageFiles(countryDir);
      
      if (images.length === 0) continue;
      
      const slug = COUNTRY_SLUGS[country] || country.toLowerCase().replace(/\s+/g, '-');
      
      console.log(`\n${country} (${images.length} images)`);
      totalCount += images.length;
      
      const albumImages = [];
      
      for (const imagePath of images) {
        const result = await uploadFile(imagePath, regionName, country);
        results.push(result);
        
        if (result.success) {
          uploadedCount++;
          albumImages.push({
            desktop: result.url,
            mobile: result.url
          });
        }
        
        await sleep(1000); // 1 second delay
      }
      
      if (albumImages.length > 0) {
        albums.push({
          region: regionName,
          country,
          slug,
          images: albumImages
        });
      }
      
      console.log(` ✓ ${albumImages.length}/${images.length} uploaded`);
    }
  }
  
  console.log(`\n${'='.repeat(60)}`);
  console.log(`COMPLETE: ${uploadedCount}/${totalCount} images uploaded`);
  console.log('='.repeat(60));
  
  // Save detailed report
  const report = {
    timestamp: new Date().toISOString(),
    totalImages: totalCount,
    successful: uploadedCount,
    failed: totalCount - uploadedCount,
    results,
    albums
  };
  
  fs.writeFileSync('complete-upload-report.json', JSON.stringify(report, null, 2));
  console.log('\n✓ Report saved to complete-upload-report.json');
  
  // Generate TypeScript file
  const tsCode = `// Generated from complete image upload
import { CountryAlbum } from './data';

export const COMPLETE_ALBUMS: CountryAlbum[] = ${JSON.stringify(albums, null, 2)};
`;
  
  fs.writeFileSync('src/lib/completeAlbums.ts', tsCode);
  console.log('✓ Generated src/lib/completeAlbums.ts');
  console.log(`\n${albums.length} countries with images ready!`);
}

uploadAll().catch(console.error);
