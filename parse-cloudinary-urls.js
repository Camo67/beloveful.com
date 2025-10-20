#!/usr/bin/env node

import fs from 'fs';

// Read and clean URLs
const content = fs.readFileSync('cloudinary_urls.txt', 'utf-8');
const urls = [...new Set(
  content
    .match(/https:\/\/res\.cloudinary\.com\/[^\s'"]+\.jpg/g) || []
)];

console.log(`Found ${urls.length} unique Cloudinary URLs\n`);

// Country code to region/country mapping
const countryMap = {
  'EGY': { region: 'Africa', country: 'Egypt', slug: 'egypt' },
  'ETH': { region: 'Africa', country: 'Ethiopia', slug: 'ethiopia' },
  'NAM': { region: 'Africa', country: 'Namibia', slug: 'namibia' },
  'HK': { region: 'Asia', country: 'Hong Kong', slug: 'hong-kong' },
  'IND': { region: 'Asia', country: 'India', slug: 'india' },
  'CHI': { region: 'Asia', country: 'China', slug: 'china' },
  'JAP': { region: 'Asia', country: 'Japan', slug: 'japan' },
  'JOR': { region: 'Middle East', country: 'Jordan', slug: 'jordan' },
  'PAL': { region: 'Middle East', country: 'Israel | Palestine', slug: 'israel-palestine' },
};

// Group URLs by country
const albums = {};

urls.forEach(url => {
  // Extract country code from URL
  const match = url.match(/\/(EGY|ETH|NAM|HK|IND|CHI|JAP|JOR|PAL)-/i);
  if (match) {
    const code = match[1].toUpperCase();
    const mapping = countryMap[code];
    
    if (mapping) {
      const key = mapping.slug;
      if (!albums[key]) {
        albums[key] = {
          ...mapping,
          images: []
        };
      }
      albums[key].images.push({
        desktop: url,
        mobile: url
      });
    }
  }
});

// Generate TypeScript code
const albumsArray = Object.values(albums);
console.log('Albums organized:');
albumsArray.forEach(album => {
  console.log(`  ${album.country}: ${album.images.length} images`);
});

// Write to file
const tsCode = `// Generated from cloudinary_urls.txt
import { CountryAlbum } from './data';

export const CLOUDINARY_ALBUMS: CountryAlbum[] = ${JSON.stringify(albumsArray, null, 2)};
`;

fs.writeFileSync('src/lib/cloudinaryAlbums.ts', tsCode);
console.log('\n✓ Generated src/lib/cloudinaryAlbums.ts');
console.log(`Total: ${albumsArray.length} countries, ${urls.length} images`);
