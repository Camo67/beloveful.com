#!/usr/bin/env node

/**
 * Deduplicates images in data.ts
 * - Removes duplicate images within each album
 * - Reports cross-album duplicates but doesn't remove them (might be intentional)
 * - Creates backup before modifying
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_PATH = path.join(__dirname, '../src/lib/data.ts');

// Read the file
console.log('📖 Reading data.ts...');
const content = fs.readFileSync(DATA_PATH, 'utf8');

// Create backup
const backupPath = `${DATA_PATH}.backup.${Date.now()}`;
fs.writeFileSync(backupPath, content);
console.log(`💾 Backup created: ${path.basename(backupPath)}\n`);

// Parse albums - find the ALBUMS array
const albumsMatch = content.match(/export const ALBUMS: CountryAlbum\[\] = \[([\s\S]*?)\n\];/);
if (!albumsMatch) {
  console.error('❌ Could not find ALBUMS array in data.ts');
  process.exit(1);
}

const albumsContent = albumsMatch[1];

// Parse each album and deduplicate
let deduplicatedContent = content;
let totalDuplicatesRemoved = 0;
let albumsProcessed = 0;

// Split into individual albums (each starts with a { and ends with },)
const albumPattern = /\{\s*"region":\s*"([^"]+)",\s*"country":\s*"([^"]+)",\s*"slug":\s*"([^"]+)",\s*"images":\s*\[([\s\S]*?)\]\s*\}/g;

let match;
const albums = [];

while ((match = albumPattern.exec(albumsContent)) !== null) {
  const [fullMatch, region, country, slug, imagesContent] = match;
  
  // Extract image URLs
  const imagePattern = /\{\s*"desktop":\s*"([^"]+)",\s*"mobile":\s*"([^"]+)"\s*\}/g;
  const images = [];
  let imgMatch;
  
  while ((imgMatch = imagePattern.exec(imagesContent)) !== null) {
    images.push({
      desktop: imgMatch[1],
      mobile: imgMatch[2]
    });
  }
  
  albums.push({
    region,
    country,
    slug,
    images,
    originalCount: images.length
  });
}

console.log(`📊 Found ${albums.length} albums\n`);

// Deduplicate each album
albums.forEach(album => {
  const seenUrls = new Set();
  const uniqueImages = [];
  
  album.images.forEach(img => {
    const key = `${img.desktop}|${img.mobile}`;
    if (!seenUrls.has(key)) {
      seenUrls.add(key);
      uniqueImages.push(img);
    }
  });
  
  const removed = album.originalCount - uniqueImages.length;
  if (removed > 0) {
    albumsProcessed++;
    totalDuplicatesRemoved += removed;
    console.log(`✂️  ${album.country} (${album.region})`);
    console.log(`   Removed ${removed} duplicate(s): ${album.originalCount} → ${uniqueImages.length} images`);
  }
  
  album.images = uniqueImages;
});

console.log(`\n📈 Summary:`);
console.log(`   Albums with duplicates: ${albumsProcessed}`);
console.log(`   Total duplicates removed: ${totalDuplicatesRemoved}\n`);

// Rebuild the data.ts content
let newAlbumsContent = albums.map(album => {
  const imagesStr = album.images.map(img => 
    `      { "desktop": "${img.desktop}", "mobile": "${img.mobile}" }`
  ).join(',\n');
  
  return `  {
    "region": "${album.region}",
    "country": "${album.country}",
    "slug": "${album.slug}",
    "images": [
${imagesStr}
    ]
  }`;
}).join(',\n');

// Replace the albums content
const newContent = content.replace(
  /export const ALBUMS: CountryAlbum\[\] = \[([\s\S]*?)\n\];/,
  `export const ALBUMS: CountryAlbum[] = [\n${newAlbumsContent}\n];`
);

// Write back
fs.writeFileSync(DATA_PATH, newContent);
console.log('✅ Updated data.ts\n');

// Check for cross-album duplicates
console.log('🔍 Checking for cross-album duplicates...');
const allUrls = new Map(); // url -> [album names]
albums.forEach(album => {
  album.images.forEach(img => {
    const url = img.desktop;
    if (!allUrls.has(url)) {
      allUrls.set(url, []);
    }
    allUrls.get(url).push(album.country);
  });
});

const crossAlbumDuplicates = Array.from(allUrls.entries())
  .filter(([url, albums]) => albums.length > 1);

if (crossAlbumDuplicates.length > 0) {
  console.log(`\n⚠️  Found ${crossAlbumDuplicates.length} images appearing in multiple albums:`);
  crossAlbumDuplicates.slice(0, 10).forEach(([url, albums]) => {
    const shortUrl = url.split('/').pop().substring(0, 40);
    console.log(`   ${shortUrl}... in: ${albums.join(', ')}`);
  });
  if (crossAlbumDuplicates.length > 10) {
    console.log(`   ... and ${crossAlbumDuplicates.length - 10} more`);
  }
  console.log(`\n   ℹ️  Note: These may be intentional (same image in different regions)`);
}

console.log('\n✨ Deduplication complete!');
