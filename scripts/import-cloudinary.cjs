#!/usr/bin/env node

/**
 * Cloudinary Image Import Script
 * 
 * This script fetches all images from your Cloudinary account and generates
 * the proper data structure for your Beloveful Photography portfolio.
 * 
 * Usage: node scripts/import-cloudinary.js
 * 
 * Make sure to set your Cloudinary credentials as environment variables (or in .env/.env.local):
 * CLOUDINARY_CLOUD_NAME=your_cloud_name
 * CLOUDINARY_API_KEY=your_api_key
 * CLOUDINARY_API_SECRET=your_api_secret
 */

const fs = require('fs');
const path = require('path');
const { v2: cloudinary } = require('cloudinary');

// Load environment variables from .env/.env.local if present (no-op if files missing)
try {
  const dotenv = require('dotenv');
  const rootDir = path.join(__dirname, '..');
  // Load .env baseline first
  dotenv.config({ path: path.join(rootDir, '.env') });
  // If .env.local exists, parse robustly (supports optional `export` and quoted values)
  const localPath = path.join(rootDir, '.env.local');
  if (fs.existsSync(localPath)) {
    const raw = fs.readFileSync(localPath, 'utf8');
    const lines = raw.split(/\r?\n/);
    const lineRE = /^(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/;
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const m = trimmed.match(lineRE);
      if (!m) continue;
      const key = m[1];
      let value = m[2];
      // Remove inline comments when not quoted
      const isQuoted = /^['"].*['"]$/.test(value);
      if (!isQuoted) {
        const hashIdx = value.indexOf('#');
        if (hashIdx !== -1) value = value.slice(0, hashIdx);
      }
      value = value.trim().replace(/^['\"]+|['\"]+$/g, '');
      if (value !== '') {
        process.env[key] = value;
      }
    }
  }
} catch (e) {
  // dotenv is optional; continue if not installed
}

// Helper to sanitize env strings (trim and strip surrounding quotes)
function cleanEnv(v) {
  if (typeof v !== 'string') return '';
  return v.trim().replace(/^['\"]+|['\"]+$/g, '');
}

// Parse CLOUDINARY_URL if provided (format: cloudinary://api_key:api_secret@cloud_name)
function parseCloudinaryUrl(urlStr) {
  try {
    const u = new URL(urlStr.replace(/^cloudinary:\/\//, 'http://'));
    return {
      cloud_name: u.hostname,
      api_key: decodeURIComponent(u.username),
      api_secret: decodeURIComponent(u.password)
    };
  } catch (_) {
    return null;
  }
}

// Build config from individual env vars, falling back to CLOUDINARY_URL if present
const envCloudName = cleanEnv(process.env.CLOUDINARY_CLOUD_NAME);
const envApiKey = cleanEnv(process.env.CLOUDINARY_API_KEY);
const envApiSecret = cleanEnv(process.env.CLOUDINARY_API_SECRET);
const urlCfg = process.env.CLOUDINARY_URL ? parseCloudinaryUrl(process.env.CLOUDINARY_URL) : null;

// Configure Cloudinary
const cloudConfig = {
  cloud_name: envCloudName || (urlCfg && urlCfg.cloud_name) || '',
  api_key: envApiKey || (urlCfg && urlCfg.api_key) || '',
  api_secret: envApiSecret || (urlCfg && urlCfg.api_secret) || '',
  secure: true
};

cloudinary.config(cloudConfig);

// Debug logging (no secrets)
console.log('🔧 Cloudinary Configuration:');
console.log('   Cloud Name:', cloudConfig.cloud_name);
console.log('   API Key set:', !!cloudConfig.api_key);
console.log('   API Secret set:', !!cloudConfig.api_secret);
console.log();

// Mapping of country/region identifiers to proper names and regions
// Note: keys are flexible identifiers that may appear in public_id prefixes OR folder paths.
const COUNTRY_MAPPING = {
  // Africa
  'EGY': { country: 'Egypt', region: 'Africa' },
  'ETH': { country: 'Ethiopia', region: 'Africa' },
  'NAM': { country: 'Namibia', region: 'Africa' },
  'MAR': { country: 'Morocco', region: 'Africa' },
  'MOR': { country: 'Morocco', region: 'Africa' },
  'ZAF': { country: 'South Africa', region: 'Africa' },
  'RSA': { country: 'South Africa', region: 'Africa' },
  'SOUTH AFRICA': { country: 'South Africa', region: 'Africa' },

  // Asia
  'HK': { country: 'Hong Kong', region: 'Asia' },
  'IND': { country: 'India', region: 'Asia' },
  'JAP': { country: 'Japan', region: 'Asia' },
  'JPN': { country: 'Japan', region: 'Asia' },
  'MYA': { country: 'Myanmar', region: 'Asia' },
  'NEP': { country: 'Nepal', region: 'Asia' },
  'PHI': { country: 'Philippines', region: 'Asia' },
  'THAI': { country: 'Thailand', region: 'Asia' },
  'THA': { country: 'Thailand', region: 'Asia' },
  'VIET': { country: 'Vietnam', region: 'Asia' },

  // Middle East
  'PAL': { country: 'Israel_Palestine', region: 'Middle East' },
  'ISR': { country: 'Israel_Palestine', region: 'Middle East' },
  'JOR': { country: 'Jordan', region: 'Middle East' },
  'SAU': { country: 'Saudi Arabia', region: 'Middle East' },
  'SAUDI': { country: 'Saudi Arabia', region: 'Middle East' },

  // Europe
  'ITA': { country: 'Italy', region: 'Europe' },
  'FRA': { country: 'France', region: 'Europe' },
  'ESP': { country: 'Spain', region: 'Europe' },
  'POR': { country: 'Portugal', region: 'Europe' },
  'GRE': { country: 'Greece', region: 'Europe' },
  'GRC': { country: 'Greece', region: 'Europe' },
  'UK': { country: 'UK & Ireland', region: 'Europe' },
  'IRL': { country: 'UK & Ireland', region: 'Europe' },

  // North America
  'CHI': { country: 'Chicago', region: 'North America' },
  'NYC': { country: 'New York', region: 'North America' },
  'PR': { country: 'Puerto Rico', region: 'North America' },
  'CAR': { country: 'Caribbean', region: 'North America' },
  'STM': { country: 'St. Martin', region: 'North America' },
  'CAL': { country: 'California', region: 'North America' },
  'TEX': { country: 'Texas', region: 'North America' },
  'MEX': { country: 'Mexico', region: 'North America' },
  'CUBA': { country: 'Cuba', region: 'North America' },
  'CUB': { country: 'Cuba', region: 'North America' },

  // South America
  'ARG': { country: 'Argentina', region: 'South America' },
  'BRA': { country: 'Brazil', region: 'South America' },

  // Oceania
  'AUS': { country: 'Australia', region: 'Oceania' },
  'AUSTRALIA': { country: 'Australia', region: 'Oceania' },
  'NZ': { country: 'New Zealand', region: 'Oceania' },
  'NZL': { country: 'New Zealand', region: 'Oceania' },
  'NEW ZEALAND': { country: 'New Zealand', region: 'Oceania' },
};

// Normalize region from folder names used in uploads
const REGION_FOLDER_MAP = {
  'Africa': 'Africa',
  'Asia': 'Asia',
  'Middle East': 'Middle East',
  'South America': 'South America',
  'North America': 'North America',
  'Oceania': 'Oceania',
  'Europe & Scandinavia': 'Europe',
  'Australia & New Zealand': 'Oceania',
  'Central America & Caribbean': 'North America',
  'Erasing Borders': 'Erasing Borders',
};

// Try to extract region/country from folder path like:
// Website beloveful.com/<Region>/<Country>/<file>
function parseRegionCountryFromPath(publicId) {
  if (typeof publicId !== 'string') return null;
  const parts = publicId.split('/');
  const idx = parts.findIndex(p => p.toLowerCase() === 'website beloveful.com');
  if (idx === -1) return null;
  const regionFolder = parts[idx + 1];
  const countryFolder = parts[idx + 2];
  if (!regionFolder) return null;
  const region = REGION_FOLDER_MAP[regionFolder] || regionFolder;
  const country = countryFolder ? countryFolder : region;
  return { region, country };
}

// Generate slug from country name
function generateSlug(countryName) {
  return countryName.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// Extract country code from image public_id
function extractCountryCode(publicId) {
  const match = publicId.match(/^([A-Z]{2,4})-/);
  return match ? match[1] : null;
}

// Get country info from public_id or folder
function getCountryInfo(publicId, folder = '') {
  // 1) Prefer parsing from full folder path if available
  const byPath = parseRegionCountryFromPath(publicId);
  if (byPath && byPath.region && byPath.country) {
    return byPath;
  }

  // 2) Try to extract from public_id code prefix
  const countryCode = extractCountryCode(publicId);
  if (countryCode && COUNTRY_MAPPING[countryCode]) {
    return COUNTRY_MAPPING[countryCode];
  }
  
  // 3) Try to match known codes or country names in Cloudinary folder name
  const folderLc = String(folder || '').toLowerCase();
  for (const [code, info] of Object.entries(COUNTRY_MAPPING)) {
    const codeLc = code.toLowerCase();
    const nameLc = info.country.toLowerCase();
    if (folderLc.includes(codeLc) || folderLc.includes(nameLc)) {
      return info;
    }
  }

  // 4) Special handling for ambiguous 'SA' prefix (South Africa vs Saudi Arabia)
  if (countryCode === 'SA') {
    if (folderLc.includes('south africa')) return { country: 'South Africa', region: 'Africa' };
    if (folderLc.includes('saudi') || folderLc.includes('middle east')) return { country: 'Saudi Arabia', region: 'Middle East' };
  }
  
  // Default fallback
  return { country: 'Mixed Countries', region: 'Oceania' };
}

// Fetch all images from Cloudinary
async function fetchAllImages() {
  console.log('🔍 Fetching all images from Cloudinary...');
  
  const allImages = [];
  let nextCursor = null;
  let pageCount = 0;
  
  do {
    try {
      console.log(`📄 Fetching page ${++pageCount}${nextCursor ? ` (cursor: ${nextCursor.substring(0, 20)}...)` : ''}`);
      
      const result = await cloudinary.api.resources({
        type: 'upload',
        resource_type: 'image',
        max_results: 500, // Maximum allowed per request
        next_cursor: nextCursor,
        context: true,
        metadata: true
      });
      
      console.log(`📸 Found ${result.resources.length} images on this page`);
      allImages.push(...result.resources);
      nextCursor = result.next_cursor;
      
      // Add a small delay to respect rate limits
      await new Promise(resolve => setTimeout(resolve, 100));
      
    } catch (error) {
      const msg = (error && (error.message || (error.error && error.error.message))) || 'Unknown error';
      console.error('❌ Error fetching images:', msg);
      break;
    }
  } while (nextCursor);
  
  console.log(`✅ Total images fetched: ${allImages.length}`);
  return allImages;
}

// Organize images by country and region
function organizeImagesByCountry(images) {
  console.log('🗂️ Organizing images by country and region...');
  
  const albumsMap = new Map();
  const slideshowImages = [];
  
  for (const image of images) {
    const countryInfo = getCountryInfo(image.public_id, image.folder || '');
    const albumKey = `${countryInfo.region}-${countryInfo.country}`;
    
    // Create image object
    const imageData = {
      desktop: image.secure_url,
      mobile: image.secure_url // Using same URL for now, can be optimized later
    };
    
    // Add to album
    if (!albumsMap.has(albumKey)) {
      albumsMap.set(albumKey, {
        region: countryInfo.region,
        country: countryInfo.country,
        slug: generateSlug(countryInfo.country),
        images: []
      });
    }
    
    albumsMap.get(albumKey).images.push(imageData);
    
    // Add some images to slideshow (first 20 diverse images)
    if (slideshowImages.length < 20 && 
        image.width >= 1200 && // Ensure good quality
        image.height >= 800) {
      slideshowImages.push(imageData);
    }
  }
  
  return {
    albums: Array.from(albumsMap.values()),
    slideshow: slideshowImages
  };
}

// Generate TypeScript data file
function generateDataFile(albums, slideshow) {
  console.log('📝 Generating updated data.ts file...');
  
  const template = `import { GENERATED_ALBUMS, GENERATED_HOME_SLIDESHOW } from "./generatedAlbums";

export type Region =
  | "Africa"
  | "Asia"
  | "Middle East"
  | "South America"
  | "North America"
  | "Europe"
  | "Oceania"
  | "Erasing Borders"

/**
 * Defines the structure for a single album, representing a country/location.
 */
export interface CountryAlbum {
  region: Region
  country: string
  slug: string
  images: {
    desktop: string // URL for landscape image
    mobile: string // URL for portrait image
  }[];
}

export interface SlideshowImage {
  desktop: string;
  mobile: string;
}

// Generated slideshow images from Cloudinary
export const HOME_SLIDESHOW: SlideshowImage[] = ${JSON.stringify(slideshow, null, 2)};

// Generated albums from Cloudinary
export const ALBUMS: CountryAlbum[] = ${JSON.stringify(albums, null, 2)};

// Merge generated albums (from public/) with static ones (Cloudinary),
// preferring static entries when slugs collide (since they have working URLs).
function mergeAlbums(staticAlbums: CountryAlbum[], generatedAlbums: CountryAlbum[]): CountryAlbum[] {
  const bySlug = new Map<string, CountryAlbum>();
  // Add generated albums first
  for (const g of generatedAlbums) bySlug.set(g.slug, g);
  // Then add static albums, which will override generated ones with same slug
  for (const a of staticAlbums) bySlug.set(a.slug, a);
  return Array.from(bySlug.values());
}

const MERGED_ALBUMS: CountryAlbum[] = mergeAlbums(ALBUMS, GENERATED_ALBUMS ?? []);

export const getAlbumsByRegion = (region: Region): CountryAlbum[] => {
  return MERGED_ALBUMS
    .filter((album): album is CountryAlbum => album.region === region);
}

export const getAlbumBySlug = (slug: string): CountryAlbum | undefined => {
  return MERGED_ALBUMS.find(album => album.slug === slug);
}

// Use static homepage slideshow (with working Cloudinary URLs)
export const HOME_SLIDESHOW_SOURCE: SlideshowImage[] = HOME_SLIDESHOW;

export const REGIONS: Region[] = ["Africa", "Asia", "Middle East", "South America", "North America", "Europe", "Oceania", "Erasing Borders"];
`;

  return template;
}

// Main execution
async function main() {
  try {
    console.log('🚀 Starting Cloudinary import process...\n');
    
    // Verify Cloudinary configuration
    if (!cloudinary.config().cloud_name || !cloudinary.config().api_key || !cloudinary.config().api_secret) {
      throw new Error('Missing Cloudinary credentials. Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET environment variables.');
    }
    
    console.log(`☁️ Connected to Cloudinary: ${cloudinary.config().cloud_name}\n`);
    
    // Fetch all images
    const images = await fetchAllImages();
    
    if (images.length === 0) {
      throw new Error('No images found in Cloudinary account');
    }
    
    // Organize images
    const { albums, slideshow } = organizeImagesByCountry(images);
    
    console.log(`\n📊 Organization Results:`);
    console.log(`   Albums: ${albums.length}`);
    console.log(`   Slideshow images: ${slideshow.length}`);
    console.log(`   Total images: ${images.length}\n`);
    
    // Show album breakdown
    console.log('🌍 Albums by region:');
    const regionCounts = {};
    albums.forEach(album => {
      regionCounts[album.region] = (regionCounts[album.region] || 0) + 1;
    });
    Object.entries(regionCounts).forEach(([region, count]) => {
      console.log(`   ${region}: ${count} albums`);
    });
    console.log();
    
    // Generate and save data file
    const dataFileContent = generateDataFile(albums, slideshow);
    const dataFilePath = path.join(__dirname, '..', 'src', 'lib', 'data.ts');
    
    // Backup existing file
    const backupPath = dataFilePath + '.backup.' + Date.now();
    if (fs.existsSync(dataFilePath)) {
      fs.copyFileSync(dataFilePath, backupPath);
      console.log(`💾 Backup created: ${path.relative(process.cwd(), backupPath)}`);
    }
    
    // Write new file
    fs.writeFileSync(dataFilePath, dataFileContent, 'utf8');
    console.log(`✅ Updated: ${path.relative(process.cwd(), dataFilePath)}`);
    
    console.log(`\n🎉 Import completed successfully!`);
    console.log(`📸 Imported ${images.length} images from Cloudinary`);
    console.log(`🗂️ Created ${albums.length} albums across ${Object.keys(regionCounts).length} regions`);
    console.log(`🎠 Generated slideshow with ${slideshow.length} images\n`);
    
  } catch (error) {
    console.error('❌ Import failed:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { main, fetchAllImages, organizeImagesByCountry, generateDataFile };