#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_PATH = path.join(__dirname, '../src/lib/data.ts');
const content = fs.readFileSync(DATA_PATH, 'utf8');

// Parse albums
const albumPattern = /\{\s*"region":\s*"([^"]+)",\s*"country":\s*"([^"]+)",\s*"slug":\s*"([^"]+)",\s*"images":\s*\[([\s\S]*?)\]\s*\}/g;

let match;
const albums = [];

while ((match = albumPattern.exec(content)) !== null) {
  const [, region, country, slug, imagesContent] = match;
  
  const imagePattern = /\{\s*"desktop":\s*"([^"]+)",\s*"mobile":\s*"([^"]+)"\s*\}/g;
  const images = [];
  let imgMatch;
  
  while ((imgMatch = imagePattern.exec(imagesContent)) !== null) {
    images.push(imgMatch[1]); // just use desktop URL
  }
  
  albums.push({ region, country, slug, images });
}

console.log('📊 Checking for actual duplicate images...\n');

// Check within each album
let albumsWithDuplicates = 0;
let totalDuplicates = 0;

albums.forEach(album => {
  const urlCounts = {};
  album.images.forEach(url => {
    urlCounts[url] = (urlCounts[url] || 0) + 1;
  });
  
  const dups = Object.entries(urlCounts).filter(([, count]) => count > 1);
  if (dups.length > 0) {
    albumsWithDuplicates++;
    const dupCount = dups.reduce((sum, [, count]) => sum + (count - 1), 0);
    totalDuplicates += dupCount;
    console.log(`❌ ${album.country} (${album.region}): ${dupCount} duplicate(s)`);
    dups.forEach(([url, count]) => {
      console.log(`   ${count}x: ${url.split('/').pop().substring(0, 50)}`);
    });
  }
});

if (albumsWithDuplicates === 0) {
  console.log('✅ No duplicate images within any album!');
}

console.log(`\n📈 Within-Album Summary:`);
console.log(`   Albums with duplicates: ${albumsWithDuplicates}`);
console.log(`   Total duplicate images: ${totalDuplicates}`);

// Check cross-album
console.log(`\n🔍 Checking cross-album duplicates...`);
const allUrls = new Map();
albums.forEach(album => {
  album.images.forEach(url => {
    if (!allUrls.has(url)) {
      allUrls.set(url, []);
    }
    allUrls.get(url).push(album.country);
  });
});

const crossDups = Array.from(allUrls.entries()).filter(([, countries]) => countries.length > 1);
console.log(`   Images in multiple albums: ${crossDups.length}`);

if (crossDups.length > 0) {
  console.log('\n   Sample cross-album duplicates (first 10):');
  crossDups.slice(0, 10).forEach(([url, countries]) => {
    console.log(`   ${url.split('/').pop().substring(0, 40)}... in: ${countries.join(', ')}`);
  });
  if (crossDups.length > 10) {
    console.log(`   ... and ${crossDups.length - 10} more`);
  }
}

console.log('\n✨ Check complete!');
