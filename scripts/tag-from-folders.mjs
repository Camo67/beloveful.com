#!/usr/bin/env node

/**
 * Tag From Folders - Cross-reference Cloudinary images with local folder structure
 * 
 * This script matches existing Cloudinary images with your local folder structure
 * to generate country tagging commands for images that are already uploaded.
 */

import { v2 as cloudinary } from 'cloudinary';
import { promises as fs } from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { findLocalImages } from './cross-reference-local.mjs';

dotenv.config();

const CONFIG = {
  cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  apiKey: process.env.CLOUDINARY_API_KEY,
  apiSecret: process.env.CLOUDINARY_API_SECRET,
  publicDir: 'public',
  outputScript: 'tag-cloudinary-images.sh',
  logFile: 'cloudinary-tagging.log'
};

/**
 * Configure Cloudinary
 */
function configureCloudinary() {
  if (!CONFIG.cloudName || !CONFIG.apiKey || !CONFIG.apiSecret) {
    throw new Error('Cloudinary credentials not found in environment variables');
  }

  cloudinary.config({
    cloud_name: CONFIG.cloudName,
    api_key: CONFIG.apiKey,
    api_secret: CONFIG.apiSecret
  });

  console.log(`✓ Cloudinary configured for: ${CONFIG.cloudName}`);
}

/**
 * Country mappings for folder-based detection
 */
const COUNTRY_MAPPINGS = {
  // Africa
  'egypt': { region: 'Africa', country: 'Egypt', slug: 'egypt', tag: 'egypt' },
  'ethiopia': { region: 'Africa', country: 'Ethiopia', slug: 'ethiopia', tag: 'ethiopia' },
  'namibia': { region: 'Africa', country: 'Namibia', slug: 'namibia', tag: 'namibia' },
  'morocco': { region: 'Africa', country: 'Morocco', slug: 'morocco', tag: 'morocco' },
  'kenya': { region: 'Africa', country: 'Kenya', slug: 'kenya', tag: 'kenya' },
  'tanzania': { region: 'Africa', country: 'Tanzania', slug: 'tanzania', tag: 'tanzania' },
  'south africa': { region: 'Africa', country: 'South Africa', slug: 'south-africa', tag: 'southafrica' },
  'southafrica': { region: 'Africa', country: 'South Africa', slug: 'south-africa', tag: 'southafrica' },
  
  // Asia
  'china': { region: 'Asia', country: 'China', slug: 'china', tag: 'china' },
  'hongkong': { region: 'Asia', country: 'Hong Kong', slug: 'hong-kong', tag: 'hongkong' },
  'hong kong': { region: 'Asia', country: 'Hong Kong', slug: 'hong-kong', tag: 'hongkong' },
  'india': { region: 'Asia', country: 'India', slug: 'india', tag: 'india' },
  'japan': { region: 'Asia', country: 'Japan', slug: 'japan', tag: 'japan' },
  'myanmar': { region: 'Asia', country: 'Myanmar', slug: 'myanmar', tag: 'myanmar' },
  'nepal': { region: 'Asia', country: 'Nepal', slug: 'nepal', tag: 'nepal' },
  'philippines': { region: 'Asia', country: 'Philippines', slug: 'philippines', tag: 'philippines' },
  'thailand': { region: 'Asia', country: 'Thailand', slug: 'thailand', tag: 'thailand' },
  'vietnam': { region: 'Asia', country: 'Vietnam', slug: 'vietnam', tag: 'vietnam' },
  'cambodia': { region: 'Asia', country: 'Cambodia', slug: 'cambodia', tag: 'cambodia' },
  'laos': { region: 'Asia', country: 'Laos', slug: 'laos', tag: 'laos' },
  'singapore': { region: 'Asia', country: 'Singapore', slug: 'singapore', tag: 'singapore' },
  'malaysia': { region: 'Asia', country: 'Malaysia', slug: 'malaysia', tag: 'malaysia' },
  'indonesia': { region: 'Asia', country: 'Indonesia', slug: 'indonesia', tag: 'indonesia' },
  'southkorea': { region: 'Asia', country: 'South Korea', slug: 'south-korea', tag: 'southkorea' },
  'south korea': { region: 'Asia', country: 'South Korea', slug: 'south-korea', tag: 'southkorea' },
  
  // Middle East
  'jordan': { region: 'Middle East', country: 'Jordan', slug: 'jordan', tag: 'jordan' },
  'israel': { region: 'Middle East', country: 'Israel | Palestine', slug: 'israel-palestine', tag: 'israel' },
  'palestine': { region: 'Middle East', country: 'Israel | Palestine', slug: 'israel-palestine', tag: 'palestine' },
  'turkey': { region: 'Middle East', country: 'Turkey', slug: 'turkey', tag: 'turkey' },
  'iran': { region: 'Middle East', country: 'Iran', slug: 'iran', tag: 'iran' },
  'lebanon': { region: 'Middle East', country: 'Lebanon', slug: 'lebanon', tag: 'lebanon' },
  'uae': { region: 'Middle East', country: 'UAE', slug: 'uae', tag: 'uae' },
  'dubai': { region: 'Middle East', country: 'UAE', slug: 'uae', tag: 'uae' },
  
  // South America
  'argentina': { region: 'South America', country: 'Argentina', slug: 'argentina', tag: 'argentina' },
  'brazil': { region: 'South America', country: 'Brazil', slug: 'brazil', tag: 'brazil' },
  'chile': { region: 'South America', country: 'Chile', slug: 'chile', tag: 'chile' },
  'colombia': { region: 'South America', country: 'Colombia', slug: 'colombia', tag: 'colombia' },
  'peru': { region: 'South America', country: 'Peru', slug: 'peru', tag: 'peru' },
  'ecuador': { region: 'South America', country: 'Ecuador', slug: 'ecuador', tag: 'ecuador' },
  'bolivia': { region: 'South America', country: 'Bolivia', slug: 'bolivia', tag: 'bolivia' },
  'venezuela': { region: 'South America', country: 'Venezuela', slug: 'venezuela', tag: 'venezuela' },
  
  // North America
  'usa': { region: 'North America', country: 'United States', slug: 'usa', tag: 'usa' },
  'unitedstates': { region: 'North America', country: 'United States', slug: 'usa', tag: 'usa' },
  'canada': { region: 'North America', country: 'Canada', slug: 'canada', tag: 'canada' },
  'mexico': { region: 'North America', country: 'Mexico', slug: 'mexico', tag: 'mexico' },
  'chicago': { region: 'North America', country: 'Chicago', slug: 'chicago', tag: 'chicago' },
  'cuba': { region: 'North America', country: 'Cuba', slug: 'cuba', tag: 'cuba' },
  'caribbean': { region: 'North America', country: 'Caribbean', slug: 'caribbean', tag: 'caribbean' },
  'guatemala': { region: 'North America', country: 'Guatemala', slug: 'guatemala', tag: 'guatemala' },
  'costarica': { region: 'North America', country: 'Costa Rica', slug: 'costa-rica', tag: 'costarica' },
  'costa rica': { region: 'North America', country: 'Costa Rica', slug: 'costa-rica', tag: 'costarica' },
  'panama': { region: 'North America', country: 'Panama', slug: 'panama', tag: 'panama' },
  'belize': { region: 'North America', country: 'Belize', slug: 'belize', tag: 'belize' },
  'jamaica': { region: 'North America', country: 'Jamaica', slug: 'jamaica', tag: 'jamaica' },
  
  // Europe
  'italy': { region: 'Europe', country: 'Italy', slug: 'italy', tag: 'italy' },
  'france': { region: 'Europe', country: 'France', slug: 'france', tag: 'france' },
  'greece': { region: 'Europe', country: 'Greece', slug: 'greece', tag: 'greece' },
  'spain': { region: 'Europe', country: 'Spain', slug: 'spain', tag: 'spain' },
  'portugal': { region: 'Europe', country: 'Portugal', slug: 'portugal', tag: 'portugal' },
  'germany': { region: 'Europe', country: 'Germany', slug: 'germany', tag: 'germany' },
  'ireland': { region: 'Europe', country: 'Ireland', slug: 'ireland', tag: 'ireland' },
  'uk': { region: 'Europe', country: 'United Kingdom', slug: 'uk', tag: 'uk' },
  'unitedkingdom': { region: 'Europe', country: 'United Kingdom', slug: 'uk', tag: 'uk' },
  'england': { region: 'Europe', country: 'United Kingdom', slug: 'uk', tag: 'uk' },
  'scotland': { region: 'Europe', country: 'United Kingdom', slug: 'uk', tag: 'uk' },
  'wales': { region: 'Europe', country: 'United Kingdom', slug: 'uk', tag: 'uk' },
  'netherlands': { region: 'Europe', country: 'Netherlands', slug: 'netherlands', tag: 'netherlands' },
  'belgium': { region: 'Europe', country: 'Belgium', slug: 'belgium', tag: 'belgium' },
  'switzerland': { region: 'Europe', country: 'Switzerland', slug: 'switzerland', tag: 'switzerland' },
  'austria': { region: 'Europe', country: 'Austria', slug: 'austria', tag: 'austria' },
  'norway': { region: 'Europe', country: 'Norway', slug: 'norway', tag: 'norway' },
  'sweden': { region: 'Europe', country: 'Sweden', slug: 'sweden', tag: 'sweden' },
  'denmark': { region: 'Europe', country: 'Denmark', slug: 'denmark', tag: 'denmark' },
  'finland': { region: 'Europe', country: 'Finland', slug: 'finland', tag: 'finland' },
  'iceland': { region: 'Europe', country: 'Iceland', slug: 'iceland', tag: 'iceland' },
  'poland': { region: 'Europe', country: 'Poland', slug: 'poland', tag: 'poland' },
  'czechrepublic': { region: 'Europe', country: 'Czech Republic', slug: 'czech-republic', tag: 'czechrepublic' },
  'hungary': { region: 'Europe', country: 'Hungary', slug: 'hungary', tag: 'hungary' },
  'croatia': { region: 'Europe', country: 'Croatia', slug: 'croatia', tag: 'croatia' },
  
  // Oceania
  'australia': { region: 'Oceania', country: 'Australia', slug: 'australia', tag: 'australia' },
  'newzealand': { region: 'Oceania', country: 'New Zealand', slug: 'new-zealand', tag: 'newzealand' },
  'new zealand': { region: 'Oceania', country: 'New Zealand', slug: 'new-zealand', tag: 'newzealand' },
  'fiji': { region: 'Oceania', country: 'Fiji', slug: 'fiji', tag: 'fiji' }
};

/**
 * Extract country from folder name in path
 */
function extractCountryFromFolderPath(localPath) {
  // Split path and clean folder names
  const pathParts = localPath.toLowerCase()
    .split(path.sep)
    .map(part => part.trim())
    .filter(part => part.length > 0);
  
  // Create a priority list: specific countries first, then regions
  const specificCountries = [];
  const regionMatches = [];
  const regionNames = ['africa', 'asia', 'europe', 'scandinavia', 'north america', 'south america', 
                       'central america', 'caribbean', 'middle east', 'oceania'];
  
  // Check each folder name for country matches
  for (const folderName of pathParts) {
    // Remove common prefixes/suffixes and clean the folder name
    const cleanFolder = folderName
      .replace(/^(photos?|images?|pics?)[-_\s]*/i, '') // Remove photo prefixes
      .replace(/[-_\s]*(photos?|images?|pics?)$/i, '') // Remove photo suffixes
      .replace(/[^a-z\s]/g, '') // Remove special chars except spaces
      .trim();
    
    // Skip empty or very short folder names
    if (cleanFolder.length < 2) continue;
    
    // Direct match
    if (COUNTRY_MAPPINGS[cleanFolder]) {
      const match = COUNTRY_MAPPINGS[cleanFolder];
      if (regionNames.includes(cleanFolder)) {
        regionMatches.push(match);
      } else {
        specificCountries.push(match);
      }
      continue;
    }
    
    // Try without spaces
    const noSpaces = cleanFolder.replace(/\s+/g, '');
    if (COUNTRY_MAPPINGS[noSpaces]) {
      const match = COUNTRY_MAPPINGS[noSpaces];
      if (regionNames.includes(noSpaces)) {
        regionMatches.push(match);
      } else {
        specificCountries.push(match);
      }
      continue;
    }
    
    // Partial matches for compound names (be more careful here)
    for (const [countryKey, info] of Object.entries(COUNTRY_MAPPINGS)) {
      if (countryKey.length > 3) { // Avoid short false matches
        // Exact substring match
        if (cleanFolder === countryKey || noSpaces === countryKey.replace(/\s+/g, '')) {
          if (regionNames.includes(countryKey)) {
            regionMatches.push(info);
          } else {
            specificCountries.push(info);
          }
          break;
        }
        
        // More careful partial matching - only if the folder name contains the country name
        if (cleanFolder.includes(countryKey) && countryKey.length >= 4) {
          if (regionNames.includes(countryKey)) {
            regionMatches.push(info);
          } else {
            specificCountries.push(info);
          }
          break;
        }
      }
    }
  }
  
  // Return the most specific match: prefer specific countries over regions
  if (specificCountries.length > 0) {
    // If multiple specific countries, return the last one (deepest in folder structure)
    return specificCountries[specificCountries.length - 1];
  }
  
  if (regionMatches.length > 0) {
    // As fallback, return the last region match
    return regionMatches[regionMatches.length - 1];
  }
  
  return null;
}

/**
 * Normalize filename for matching (remove extension, normalize case)
 */
function normalizeFilename(filename) {
  return path.basename(filename, path.extname(filename)).toLowerCase()
    .replace(/[^a-z0-9]/g, ''); // Remove all non-alphanumeric
}

/**
 * Fetch all images from Cloudinary
 */
async function fetchCloudinaryImages() {
  console.log('🔄 Fetching images from Cloudinary...');
  
  let allImages = [];
  let nextCursor = null;
  let page = 0;
  
  do {
    page++;
    console.log(`   Page ${page}...`);
    
    const result = await cloudinary.api.resources({
      type: 'upload',
      resource_type: 'image',
      max_results: 500,
      next_cursor: nextCursor,
      tags: true // Include existing tags
    });
    
    allImages = allImages.concat(result.resources);
    nextCursor = result.next_cursor;
    
    // Rate limiting
    if (nextCursor) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
  } while (nextCursor);
  
  console.log(`✅ Fetched ${allImages.length} images from Cloudinary`);
  return allImages;
}

/**
 * Cross-reference Cloudinary images with local folder structure
 */
function crossReferenceWithFolders(localImages, cloudinaryImages) {
  console.log('🔍 Cross-referencing Cloudinary images with local folders...');
  
  const matches = [];
  const unmatched = [];
  
  // Create lookup map for local images by normalized filename
  const localMap = new Map();
  localImages.forEach(img => {
    const normalized = normalizeFilename(img.filename);
    if (!localMap.has(normalized)) {
      localMap.set(normalized, []);
    }
    localMap.get(normalized).push(img);
  });
  
  // Process each Cloudinary image
  cloudinaryImages.forEach(cloudinaryImg => {
    const normalized = normalizeFilename(cloudinaryImg.public_id);
    const localMatches = localMap.get(normalized);
    
    if (localMatches && localMatches.length > 0) {
      // Found local match(es) - use the first one or best match
      const localImg = localMatches[0];
      const countryFromFolder = extractCountryFromFolderPath(localImg.path);
      
      if (countryFromFolder) {
        // Check if already has the country tag
        const existingTags = cloudinaryImg.tags || [];
        const hasCountryTag = existingTags.some(tag => 
          tag.toLowerCase() === countryFromFolder.tag ||
          tag.toLowerCase() === countryFromFolder.country.toLowerCase().replace(/[^a-z]/g, '')
        );
        
        matches.push({
          cloudinary_id: cloudinaryImg.public_id,
          local_path: localImg.path,
          filename: cloudinaryImg.public_id,
          country_info: countryFromFolder,
          existing_tags: existingTags,
          needs_tagging: !hasCountryTag,
          suggested_tags: [countryFromFolder.tag, countryFromFolder.region.toLowerCase().replace(/\s+/g, '')]
        });
      } else {
        unmatched.push({
          cloudinary_id: cloudinaryImg.public_id,
          local_path: localImg.path,
          reason: 'no_country_detected_from_path'
        });
      }
    } else {
      unmatched.push({
        cloudinary_id: cloudinaryImg.public_id,
        reason: 'no_local_match_found'
      });
    }
  });
  
  return { matches, unmatched };
}

/**
 * Generate tagging script
 */
function generateTaggingScript(matches) {
  const needsTagging = matches.filter(m => m.needs_tagging);
  
  if (needsTagging.length === 0) {
    return null;
  }
  
  let script = '#!/bin/bash\n\n';
  script += '# Auto-generated Cloudinary tagging script\n';
  script += '# Based on local folder structure analysis\n\n';
  script += 'echo "Starting Cloudinary image tagging..."\n\n';
  
  // Group by country for more efficient tagging
  const byCountry = new Map();
  needsTagging.forEach(match => {
    const key = match.country_info.tag;
    if (!byCountry.has(key)) {
      byCountry.set(key, {
        country: match.country_info.country,
        tag: match.country_info.tag,
        region_tag: match.country_info.region.toLowerCase().replace(/\s+/g, ''),
        images: []
      });
    }
    byCountry.get(key).images.push(match.cloudinary_id);
  });
  
  // Generate batch tagging commands
  byCountry.forEach((data, countryTag) => {
    script += `echo "Tagging ${data.images.length} images for ${data.country}..."\n`;
    
    // Split into batches of 100 (Cloudinary API limit)
    const batchSize = 100;
    for (let i = 0; i < data.images.length; i += batchSize) {
      const batch = data.images.slice(i, i + batchSize);
      const publicIds = batch.join(',');
      
      // Add country tag
      script += `cld uploader add_tag ${data.tag} --public_ids="${publicIds}"\n`;
      // Add region tag
      script += `cld uploader add_tag ${data.region_tag} --public_ids="${publicIds}"\n`;
      
      if (batch.length === batchSize) {
        script += 'sleep 1  # Rate limiting\n';
      }
    }
    script += '\n';
  });
  
  script += 'echo "Tagging complete!"\n';
  script += 'echo "Run npm run portfolio:fetch to regenerate portfolio with new tags"\n';
  
  return script;
}

/**
 * Main function
 */
async function main() {
  console.log('🏷️  Cross-referencing Cloudinary images with local folder structure...\n');
  
  // Configure Cloudinary
  configureCloudinary();
  
  // Find local images
  console.log('📁 Scanning local images...');
  const publicDir = path.join(process.cwd(), CONFIG.publicDir);
  const localImages = await findLocalImages(publicDir);
  console.log(`✅ Found ${localImages.length} local images`);
  
  // Fetch Cloudinary images
  const cloudinaryImages = await fetchCloudinaryImages();
  
  // Cross-reference
  const { matches, unmatched } = crossReferenceWithFolders(localImages, cloudinaryImages);
  
  // Analyze results
  const needsTagging = matches.filter(m => m.needs_tagging);
  const alreadyTagged = matches.filter(m => !m.needs_tagging);
  
  console.log('\n📊 Cross-Reference Results:');
  console.log(`   🔗 Total matches: ${matches.length}`);
  console.log(`   🏷️  Need tagging: ${needsTagging.length}`);
  console.log(`   ✅ Already tagged: ${alreadyTagged.length}`);
  console.log(`   ❓ Unmatched: ${unmatched.length}`);
  
  if (needsTagging.length > 0) {
    console.log('\n🌍 Countries to tag:');
    const countryStats = new Map();
    needsTagging.forEach(match => {
      const country = match.country_info.country;
      countryStats.set(country, (countryStats.get(country) || 0) + 1);
    });
    
    Array.from(countryStats.entries())
      .sort(([,a], [,b]) => b - a)
      .slice(0, 15)
      .forEach(([country, count]) => {
        console.log(`   ${country}: ${count} images`);
      });
    
    console.log('\n📋 Sample images that will be tagged:');
    needsTagging.slice(0, 10).forEach(match => {
      console.log(`   📸 ${match.cloudinary_id}`);
      console.log(`      Local: ${match.local_path}`);
      console.log(`      → Tags: ${match.suggested_tags.join(', ')}`);
    });
    
    if (needsTagging.length > 10) {
      console.log(`   ... and ${needsTagging.length - 10} more images`);
    }
  }
  
  if (alreadyTagged.length > 0) {
    console.log(`\n✅ Already properly tagged: ${alreadyTagged.length} images`);
  }
  
  if (unmatched.length > 0) {
    console.log(`\n❓ Unmatched images: ${unmatched.length}`);
    const reasons = new Map();
    unmatched.forEach(u => {
      const reason = u.reason;
      reasons.set(reason, (reasons.get(reason) || 0) + 1);
    });
    
    reasons.forEach((count, reason) => {
      console.log(`   ${reason}: ${count} images`);
    });
  }
  
  // Generate tagging script
  if (needsTagging.length > 0) {
    const script = generateTaggingScript(matches);
    if (script) {
      await fs.writeFile(CONFIG.outputScript, script);
      console.log(`\n📜 Tagging script generated: ${CONFIG.outputScript}`);
      console.log(`   Make it executable: chmod +x ${CONFIG.outputScript}`);
      console.log(`   Run it: ./${CONFIG.outputScript}`);
      
      console.log('\n💡 This script will:');
      console.log('1. Add country tags to Cloudinary images based on folder structure');
      console.log('2. Add region tags for better organization');
      console.log('3. Use batch processing for efficiency');
      console.log('4. Include rate limiting to respect API limits');
    }
  } else {
    console.log('\n🎉 All images are already properly tagged!');
  }
  
  // Save detailed log
  const logData = {
    timestamp: new Date().toISOString(),
    summary: {
      total_local: localImages.length,
      total_cloudinary: cloudinaryImages.length,
      matches: matches.length,
      needs_tagging: needsTagging.length,
      already_tagged: alreadyTagged.length,
      unmatched: unmatched.length
    },
    matches: matches,
    unmatched: unmatched.slice(0, 50) // Limit for file size
  };
  
  await fs.writeFile(CONFIG.logFile, JSON.stringify(logData, null, 2));
  console.log(`\n📋 Detailed log saved to: ${CONFIG.logFile}`);
  
  console.log('\n🎉 Analysis complete!');
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  });
}

export { main };