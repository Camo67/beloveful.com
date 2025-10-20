#!/usr/bin/env node

/**
 * Fetch Travel Portfolio Country Albums from Cloudinary
 * 
 * This script fetches all images from your Cloudinary account and organizes them
 * into country-based albums for your travel photography portfolio.
 */

import { v2 as cloudinary } from 'cloudinary';
import { promises as fs } from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Configuration
const CONFIG = {
  cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  apiKey: process.env.CLOUDINARY_API_KEY,
  apiSecret: process.env.CLOUDINARY_API_SECRET,
  maxResults: 500, // Maximum results per API call
  outputFile: 'src/lib/cloudinaryAlbums.ts'
};

// Enhanced country mapping with more comprehensive prefixes and metadata
const COUNTRY_MAPPINGS = {
  // Africa
  'EGY': { region: 'Africa', country: 'Egypt', slug: 'egypt' },
  'ETH': { region: 'Africa', country: 'Ethiopia', slug: 'ethiopia' },
  'NAM': { region: 'Africa', country: 'Namibia', slug: 'namibia' },
  'RSA': { region: 'Africa', country: 'South Africa', slug: 'south-africa' },
  'KEN': { region: 'Africa', country: 'Kenya', slug: 'kenya' },
  'TAN': { region: 'Africa', country: 'Tanzania', slug: 'tanzania' },
  'MAR': { region: 'Africa', country: 'Morocco', slug: 'morocco' },
  'GHA': { region: 'Africa', country: 'Ghana', slug: 'ghana' },
  'RWA': { region: 'Africa', country: 'Rwanda', slug: 'rwanda' },

  // Asia
  'CHI': { region: 'Asia', country: 'China', slug: 'china' },
  'HK': { region: 'Asia', country: 'Hong Kong', slug: 'hong-kong' },
  'IND': { region: 'Asia', country: 'India', slug: 'india' },
  'JAP': { region: 'Asia', country: 'Japan', slug: 'japan' },
  'MYA': { region: 'Asia', country: 'Myanmar', slug: 'myanmar' },
  'NEP': { region: 'Asia', country: 'Nepal', slug: 'nepal' },
  'NPL': { region: 'Asia', country: 'Nepal', slug: 'nepal' },
  'PHI': { region: 'Asia', country: 'Philippines', slug: 'philippines' },
  'THAI': { region: 'Asia', country: 'Thailand', slug: 'thailand' },
  'THA': { region: 'Asia', country: 'Thailand', slug: 'thailand' },
  'VIET': { region: 'Asia', country: 'Vietnam', slug: 'vietnam' },
  'VIE': { region: 'Asia', country: 'Vietnam', slug: 'vietnam' },
  'KOR': { region: 'Asia', country: 'South Korea', slug: 'south-korea' },
  'MAL': { region: 'Asia', country: 'Malaysia', slug: 'malaysia' },
  'SIN': { region: 'Asia', country: 'Singapore', slug: 'singapore' },
  'LAO': { region: 'Asia', country: 'Laos', slug: 'laos' },
  'CAM': { region: 'Asia', country: 'Cambodia', slug: 'cambodia' },
  'INO': { region: 'Asia', country: 'Indonesia', slug: 'indonesia' },
  'SRI': { region: 'Asia', country: 'Sri Lanka', slug: 'sri-lanka' },

  // Middle East
  'PAL': { region: 'Middle East', country: 'Israel | Palestine', slug: 'israel-palestine' },
  'JOR': { region: 'Middle East', country: 'Jordan', slug: 'jordan' },
  'ISR': { region: 'Middle East', country: 'Israel | Palestine', slug: 'israel-palestine' },
  'UAE': { region: 'Middle East', country: 'UAE', slug: 'uae' },
  'TUR': { region: 'Middle East', country: 'Turkey', slug: 'turkey' },
  'LEB': { region: 'Middle East', country: 'Lebanon', slug: 'lebanon' },
  'IRQ': { region: 'Middle East', country: 'Iraq', slug: 'iraq' },
  'IRN': { region: 'Middle East', country: 'Iran', slug: 'iran' },
  'SYR': { region: 'Middle East', country: 'Syria', slug: 'syria' },

  // South America
  'ARG': { region: 'South America', country: 'Argentina', slug: 'argentina' },
  'BRA': { region: 'South America', country: 'Brazil', slug: 'brazil' },
  'BOL': { region: 'South America', country: 'Bolivia', slug: 'bolivia' },
  'CHI_SA': { region: 'South America', country: 'Chile', slug: 'chile' },
  'COL': { region: 'South America', country: 'Colombia', slug: 'colombia' },
  'ECU': { region: 'South America', country: 'Ecuador', slug: 'ecuador' },
  'PER': { region: 'South America', country: 'Peru', slug: 'peru' },
  'URU': { region: 'South America', country: 'Uruguay', slug: 'uruguay' },
  'VEN': { region: 'South America', country: 'Venezuela', slug: 'venezuela' },
  'PAR': { region: 'South America', country: 'Paraguay', slug: 'paraguay' },

  // North America  
  'USA': { region: 'North America', country: 'United States', slug: 'usa' },
  'CAN': { region: 'North America', country: 'Canada', slug: 'canada' },
  'MEX': { region: 'North America', country: 'Mexico', slug: 'mexico' },
  'CHI': { region: 'North America', country: 'Chicago', slug: 'chicago' }, // Assuming this is Chicago, US
  'NYC': { region: 'North America', country: 'New York', slug: 'new-york' },
  'CAL': { region: 'North America', country: 'California', slug: 'california' },
  'GUA': { region: 'North America', country: 'Guatemala', slug: 'guatemala' },
  'COS': { region: 'North America', country: 'Costa Rica', slug: 'costa-rica' },
  'PAN': { region: 'North America', country: 'Panama', slug: 'panama' },
  'NIC': { region: 'North America', country: 'Nicaragua', slug: 'nicaragua' },

  // Europe
  'ITA': { region: 'Europe', country: 'Italy', slug: 'italy' },
  'FRA': { region: 'Europe', country: 'France', slug: 'france' },
  'GRC': { region: 'Europe', country: 'Greece', slug: 'greece' },
  'GRE': { region: 'Europe', country: 'Greece', slug: 'greece' },
  'SPA': { region: 'Europe', country: 'Spain', slug: 'spain' },
  'POR': { region: 'Europe', country: 'Portugal', slug: 'portugal' },
  'GER': { region: 'Europe', country: 'Germany', slug: 'germany' },
  'AUT': { region: 'Europe', country: 'Austria', slug: 'austria' },
  'SWI': { region: 'Europe', country: 'Switzerland', slug: 'switzerland' },
  'NET': { region: 'Europe', country: 'Netherlands', slug: 'netherlands' },
  'BEL': { region: 'Europe', country: 'Belgium', slug: 'belgium' },
  'UK': { region: 'Europe', country: 'United Kingdom', slug: 'uk' },
  'IRL': { region: 'Europe', country: 'Ireland', slug: 'ireland' },
  'ICE': { region: 'Europe', country: 'Iceland', slug: 'iceland' },
  'NOR': { region: 'Europe', country: 'Norway', slug: 'norway' },
  'SWE': { region: 'Europe', country: 'Sweden', slug: 'sweden' },
  'DEN': { region: 'Europe', country: 'Denmark', slug: 'denmark' },
  'FIN': { region: 'Europe', country: 'Finland', slug: 'finland' },
  'POL': { region: 'Europe', country: 'Poland', slug: 'poland' },
  'CZE': { region: 'Europe', country: 'Czech Republic', slug: 'czech-republic' },
  'HUN': { region: 'Europe', country: 'Hungary', slug: 'hungary' },
  'ROU': { region: 'Europe', country: 'Romania', slug: 'romania' },
  'BUL': { region: 'Europe', country: 'Bulgaria', slug: 'bulgaria' },
  'CRO': { region: 'Europe', country: 'Croatia', slug: 'croatia' },
  'SLO': { region: 'Europe', country: 'Slovenia', slug: 'slovenia' },

  // Oceania
  'AUS': { region: 'Oceania', country: 'Australia', slug: 'australia' },
  'NZ': { region: 'Oceania', country: 'New Zealand', slug: 'new-zealand' },
  'NZL': { region: 'Oceania', country: 'New Zealand', slug: 'new-zealand' },
  'FIJ': { region: 'Oceania', country: 'Fiji', slug: 'fiji' },
  'PNG': { region: 'Oceania', country: 'Papua New Guinea', slug: 'papua-new-guinea' },
  'SOL': { region: 'Oceania', country: 'Solomon Islands', slug: 'solomon-islands' },

  // Erasing Borders (Special category)
  'BORDER': { region: 'Erasing Borders', country: 'Border Stories', slug: 'border-stories' },
  'REFUGEE': { region: 'Erasing Borders', country: 'Refugee Stories', slug: 'refugee-stories' },
  'MIGRANT': { region: 'Erasing Borders', country: 'Migration Stories', slug: 'migration-stories' }
};

// Alternative pattern matching for complex filenames
const ALTERNATIVE_PATTERNS = [
  // Date-based patterns
  { pattern: /^(\d{2}-\d{2})-/, extract: (match, filename) => null }, // Skip date prefixes
  
  // IMG patterns with country context
  { pattern: /^IMG_.*ETH/, extract: () => COUNTRY_MAPPINGS['ETH'] },
  { pattern: /^IMG_.*EGY/, extract: () => COUNTRY_MAPPINGS['EGY'] },
  { pattern: /^IMG_.*IND/, extract: () => COUNTRY_MAPPINGS['IND'] },
  
  // DSCF patterns (Fujifilm) with context clues
  { pattern: /^DSCF.*/, extract: (match, filename) => {
    // Try to extract context from folder tags or metadata
    return null; // Will be handled by Cloudinary tags if available
  }},
  
  // Location-specific patterns
  { pattern: /petra|jordan/i, extract: () => COUNTRY_MAPPINGS['JOR'] },
  { pattern: /pyramids|sphinx|cairo/i, extract: () => COUNTRY_MAPPINGS['EGY'] },
  { pattern: /tibet|himalayas/i, extract: () => COUNTRY_MAPPINGS['NEP'] },
  { pattern: /tokyo|osaka|kyoto/i, extract: () => COUNTRY_MAPPINGS['JAP'] },
  { pattern: /rome|venice|florence/i, extract: () => COUNTRY_MAPPINGS['ITA'] },
  { pattern: /paris|lyon|nice/i, extract: () => COUNTRY_MAPPINGS['FRA'] },
  { pattern: /mumbai|delhi|kerala|rajasthan/i, extract: () => COUNTRY_MAPPINGS['IND'] },
  { pattern: /beijing|shanghai|guangzhou/i, extract: () => COUNTRY_MAPPINGS['CHI'] },
];

/**
 * Configure Cloudinary with environment variables
 */
function configureCloudinary() {
  if (!CONFIG.cloudName || !CONFIG.apiKey || !CONFIG.apiSecret) {
    throw new Error(`
Missing Cloudinary configuration. Please set:
- CLOUDINARY_CLOUD_NAME
- CLOUDINARY_API_KEY  
- CLOUDINARY_API_SECRET

in your .env file or environment variables.
    `);
  }

  cloudinary.config({
    cloud_name: CONFIG.cloudName,
    api_key: CONFIG.apiKey,
    api_secret: CONFIG.apiSecret
  });

  console.log(`✓ Cloudinary configured for: ${CONFIG.cloudName}`);
}

/**
 * Extract country information from filename using various strategies
 */
function extractCountryInfo(filename, tags = [], context = {}) {
  const upperFilename = filename.toUpperCase();
  
  // Strategy 1: Direct prefix matching
  const prefixes = Object.keys(COUNTRY_MAPPINGS);
  for (const prefix of prefixes) {
    if (upperFilename.startsWith(prefix + '-') || upperFilename.startsWith(prefix + '_')) {
      return COUNTRY_MAPPINGS[prefix];
    }
  }
  
  // Strategy 2: Check Cloudinary tags
  for (const tag of tags) {
    const upperTag = tag.toUpperCase();
    if (COUNTRY_MAPPINGS[upperTag]) {
      return COUNTRY_MAPPINGS[upperTag];
    }
    
    // Check if tag matches any country name
    for (const [prefix, info] of Object.entries(COUNTRY_MAPPINGS)) {
      if (upperTag.includes(info.country.toUpperCase().replace(/[^A-Z]/g, ''))) {
        return info;
      }
    }
  }
  
  // Strategy 3: Alternative pattern matching
  for (const { pattern, extract } of ALTERNATIVE_PATTERNS) {
    const match = filename.match(pattern);
    if (match) {
      const result = extract(match, filename);
      if (result) return result;
    }
  }
  
  // Strategy 4: Context-based detection from folder structure
  if (context.folder) {
    const folderUpper = context.folder.toUpperCase();
    for (const [prefix, info] of Object.entries(COUNTRY_MAPPINGS)) {
      if (folderUpper.includes(info.country.toUpperCase().replace(/[^A-Z]/g, ''))) {
        return info;
      }
    }
  }
  
  return null;
}

/**
 * Fetch all images from Cloudinary with pagination
 */
async function fetchAllCloudinaryImages() {
  console.log('🔄 Fetching images from Cloudinary...');
  
  let allImages = [];
  let nextCursor = null;
  let page = 0;
  
  do {
    page++;
    console.log(`   Page ${page}${nextCursor ? ` (cursor: ${nextCursor.substring(0, 20)}...)` : ''}`);
    
    try {
      const result = await cloudinary.api.resources({
        type: 'upload',
        resource_type: 'image',
        max_results: CONFIG.maxResults,
        next_cursor: nextCursor,
        tags: true, // Include tags in response
        context: true, // Include context metadata
        metadata: true // Include custom metadata
      });
      
      allImages = allImages.concat(result.resources);
      nextCursor = result.next_cursor;
      
      console.log(`   ✓ Fetched ${result.resources.length} images (${allImages.length} total)`);
      
      // Rate limiting - be respectful to Cloudinary API
      if (nextCursor) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      
    } catch (error) {
      console.error(`❌ Error fetching page ${page}:`, error.message);
      break;
    }
    
  } while (nextCursor);
  
  console.log(`✅ Total images fetched: ${allImages.length}`);
  return allImages;
}

/**
 * Process and group images by country
 */
function processAndGroupImages(images) {
  console.log('🔄 Processing and grouping images by country...');
  
  const imagesByCountry = new Map();
  const unassignedImages = [];
  const stats = {
    total: images.length,
    assigned: 0,
    unassigned: 0,
    duplicates: 0
  };
  
  for (const image of images) {
    const countryInfo = extractCountryInfo(
      image.public_id, 
      image.tags || [], 
      { 
        folder: image.folder,
        context: image.context,
        metadata: image.metadata
      }
    );
    
    if (countryInfo) {
      const key = `${countryInfo.region}|${countryInfo.country}|${countryInfo.slug}`;
      
      if (!imagesByCountry.has(key)) {
        imagesByCountry.set(key, {
          ...countryInfo,
          images: []
        });
      }
      
      // Check for duplicates based on public_id
      const country = imagesByCountry.get(key);
      const existingImage = country.images.find(img => img.filename === image.public_id);
      
      if (existingImage) {
        stats.duplicates++;
        console.log(`⚠️  Duplicate found: ${image.public_id}`);
        continue;
      }
      
      country.images.push({
        desktop: image.secure_url,
        mobile: image.secure_url, // Using same URL for both as per your current structure
        filename: image.public_id,
        width: image.width,
        height: image.height,
        format: image.format,
        bytes: image.bytes,
        created_at: image.created_at,
        tags: image.tags || []
      });
      
      stats.assigned++;
    } else {
      unassignedImages.push({
        filename: image.public_id,
        url: image.secure_url,
        tags: image.tags || [],
        folder: image.folder,
        width: image.width,
        height: image.height
      });
      stats.unassigned++;
    }
  }
  
  console.log(`✅ Processing complete:`);
  console.log(`   📊 Assigned: ${stats.assigned}`);
  console.log(`   ❓ Unassigned: ${stats.unassigned}`);
  console.log(`   🔄 Duplicates: ${stats.duplicates}`);
  console.log(`   🌍 Countries: ${imagesByCountry.size}`);
  
  return {
    imagesByCountry,
    unassignedImages,
    stats
  };
}

/**
 * Sort and organize albums
 */
function sortAndOrganizeAlbums(imagesByCountry) {
  console.log('🔄 Sorting and organizing albums...');
  
  // Convert to array and sort
  const sortedCountries = Array.from(imagesByCountry.values()).sort((a, b) => {
    // Sort by region first, then by country
    if (a.region !== b.region) {
      const regionOrder = ['Africa', 'Asia', 'Middle East', 'South America', 'North America', 'Europe', 'Oceania', 'Erasing Borders'];
      return regionOrder.indexOf(a.region) - regionOrder.indexOf(b.region);
    }
    return a.country.localeCompare(b.country);
  });
  
  // Sort images within each country by filename for consistency
  sortedCountries.forEach(country => {
    country.images.sort((a, b) => a.filename.localeCompare(b.filename));
  });
  
  console.log(`✅ Albums organized:`);
  const regionStats = {};
  sortedCountries.forEach(country => {
    if (!regionStats[country.region]) {
      regionStats[country.region] = { countries: 0, images: 0 };
    }
    regionStats[country.region].countries++;
    regionStats[country.region].images += country.images.length;
  });
  
  Object.entries(regionStats).forEach(([region, data]) => {
    console.log(`   ${region}: ${data.countries} countries, ${data.images} images`);
  });
  
  return sortedCountries;
}

/**
 * Generate TypeScript output file
 */
function generateTypeScriptOutput(sortedCountries, stats) {
  console.log('🔄 Generating TypeScript output...');
  
  const timestamp = new Date().toISOString();
  const totalImages = sortedCountries.reduce((sum, country) => sum + country.images.length, 0);
  
  let output = '';
  
  // Header with metadata
  output += `// Generated from cloudinary_urls.txt fallback (${totalImages} images)\n`;
  output += `// Auto-generated from Cloudinary API on ${timestamp}\n`;
  output += `// Total countries: ${sortedCountries.length}\n`;
  output += `// Total images: ${totalImages}\n`;
  output += `import { CountryAlbum } from './data';\n\n`;
  
  // Main albums export
  output += `export const CLOUDINARY_ALBUMS: CountryAlbum[] = [\n`;
  
  sortedCountries.forEach((country, countryIndex) => {
    output += `  {\n`;
    output += `    "region": "${country.region}",\n`;
    output += `    "country": "${country.country}",\n`;
    output += `    "slug": "${country.slug}",\n`;
    output += `    "images": [\n`;
    
    country.images.forEach((image, imageIndex) => {
      output += `      {\n`;
      output += `        "desktop": "${image.desktop}",\n`;
      output += `        "mobile": "${image.mobile}"\n`;
      output += `      }`;
      
      if (imageIndex < country.images.length - 1) {
        output += ',';
      }
      output += '\n';
    });
    
    output += `    ]\n`;
    output += `  }`;
    
    if (countryIndex < sortedCountries.length - 1) {
      output += ',';
    }
    output += '\n';
  });
  
  output += `];\n`;
  
  return output;
}

/**
 * Save results to files
 */
async function saveResults(output, sortedCountries, unassignedImages, stats) {
  console.log('🔄 Saving results...');
  
  // Save TypeScript file
  const outputPath = path.join(process.cwd(), CONFIG.outputFile);
  await fs.writeFile(outputPath, output, 'utf8');
  console.log(`✅ Saved TypeScript data to: ${CONFIG.outputFile}`);
  
  // Save JSON report for debugging
  const reportPath = path.join(process.cwd(), 'cloudinary-fetch-report.json');
  const report = {
    timestamp: new Date().toISOString(),
    stats,
    countries: sortedCountries.map(c => ({
      region: c.region,
      country: c.country,
      slug: c.slug,
      imageCount: c.images.length,
      firstImage: c.images[0]?.filename,
      lastImage: c.images[c.images.length - 1]?.filename
    })),
    unassigned: unassignedImages.slice(0, 50) // Limit to first 50 for file size
  };
  
  await fs.writeFile(reportPath, JSON.stringify(report, null, 2));
  console.log(`✅ Saved debug report to: cloudinary-fetch-report.json`);
  
  // Log unassigned images
  if (unassignedImages.length > 0) {
    console.log(`\n⚠️  Unassigned images (${unassignedImages.length}):`);
    unassignedImages.slice(0, 20).forEach(img => {
      console.log(`   - ${img.filename} ${img.tags.length ? `[${img.tags.join(', ')}]` : ''}`);
    });
    if (unassignedImages.length > 20) {
      console.log(`   ... and ${unassignedImages.length - 20} more`);
    }
    console.log(`\n💡 Consider adding country tags or updating the COUNTRY_MAPPINGS for better recognition.`);
  }
}

/**
 * Main execution function
 */
async function main() {
  try {
    console.log('🚀 Starting Cloudinary portfolio fetch...\n');
    
    // Configure Cloudinary
    configureCloudinary();
    
    // Fetch all images
    const images = await fetchAllCloudinaryImages();
    
    if (images.length === 0) {
      console.log('❌ No images found in Cloudinary account.');
      return;
    }
    
    // Process and group images
    const { imagesByCountry, unassignedImages, stats } = processAndGroupImages(images);
    
    if (imagesByCountry.size === 0) {
      console.log('❌ No images could be assigned to countries. Check your filename patterns.');
      return;
    }
    
    // Sort and organize
    const sortedCountries = sortAndOrganizeAlbums(imagesByCountry);
    
    // Generate output
    const output = generateTypeScriptOutput(sortedCountries, stats);
    
    // Save results
    await saveResults(output, sortedCountries, unassignedImages, stats);
    
    console.log(`\n🎉 Successfully generated portfolio data!`);
    console.log(`   📁 Output: ${CONFIG.outputFile}`);
    console.log(`   🌍 Countries: ${sortedCountries.length}`);
    console.log(`   🖼️  Images: ${stats.assigned}`);
    console.log(`   ❓ Unassigned: ${stats.unassigned}`);
    
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { main, extractCountryInfo, COUNTRY_MAPPINGS };