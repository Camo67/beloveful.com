#!/usr/bin/env node

/**
 * Portfolio Manager - Utility script for managing travel portfolio data
 * 
 * Commands:
 * - fetch: Fetch albums from Cloudinary
 * - update: Update existing albums with new images
 * - analyze: Analyze current portfolio structure
 * - audit: Audit missing countries or regions
 * - tag: Help with tagging Cloudinary images
 */

import { promises as fs } from 'fs';
import path from 'path';
import { main as fetchCloudinary, extractCountryInfo, COUNTRY_MAPPINGS } from './fetch-cloudinary-portfolio.mjs';

const COMMANDS = {
  fetch: 'Fetch all albums from Cloudinary and regenerate data',
  update: 'Update existing albums with new images from Cloudinary', 
  analyze: 'Analyze current portfolio structure and stats',
  audit: 'Audit for missing countries or unassigned images',
  tag: 'Generate tagging suggestions for Cloudinary images',
  help: 'Show this help message'
};

/**
 * Show help message
 */
function showHelp() {
  console.log('📸 Portfolio Manager - Beloveful Travel Photography\n');
  console.log('Usage: node scripts/portfolio-manager.mjs <command>\n');
  console.log('Commands:');
  
  Object.entries(COMMANDS).forEach(([cmd, desc]) => {
    console.log(`  ${cmd.padEnd(10)} ${desc}`);
  });
  
  console.log('\nExamples:');
  console.log('  node scripts/portfolio-manager.mjs fetch');
  console.log('  node scripts/portfolio-manager.mjs analyze');
  console.log('  node scripts/portfolio-manager.mjs audit');
}

/**
 * Read current portfolio data
 */
async function readCurrentPortfolio() {
  try {
    const filePath = path.join(process.cwd(), 'src/lib/cloudinaryAlbums.ts');
    const content = await fs.readFile(filePath, 'utf8');
    
    // Parse the TypeScript export to extract data
    const albumsMatch = content.match(/export const CLOUDINARY_ALBUMS: CountryAlbum\[\] = (\[[\s\S]*?\]);/);
    if (!albumsMatch) {
      throw new Error('Could not parse CLOUDINARY_ALBUMS from file');
    }
    
    // Simple JSON parsing (assumes clean format)
    const albumsData = JSON.parse(albumsMatch[1]);
    return albumsData;
    
  } catch (error) {
    console.log('⚠️  No existing portfolio data found or failed to read:', error.message);
    return [];
  }
}

/**
 * Analyze current portfolio structure
 */
async function analyzePortfolio() {
  console.log('🔍 Analyzing current portfolio structure...\n');
  
  const albums = await readCurrentPortfolio();
  
  if (albums.length === 0) {
    console.log('❌ No portfolio data found. Run "fetch" command first.');
    return;
  }
  
  // Regional analysis
  const regionStats = {};
  const countryList = [];
  let totalImages = 0;
  
  albums.forEach(album => {
    if (!regionStats[album.region]) {
      regionStats[album.region] = {
        countries: 0,
        images: 0,
        albumList: []
      };
    }
    
    regionStats[album.region].countries++;
    regionStats[album.region].images += album.images.length;
    regionStats[album.region].albumList.push({
      country: album.country,
      slug: album.slug,
      images: album.images.length
    });
    
    countryList.push({
      region: album.region,
      country: album.country,
      slug: album.slug,
      images: album.images.length
    });
    
    totalImages += album.images.length;
  });
  
  // Summary
  console.log('📊 Portfolio Summary:');
  console.log(`   Total Albums: ${albums.length}`);
  console.log(`   Total Images: ${totalImages}`);
  console.log(`   Average Images per Album: ${(totalImages / albums.length).toFixed(1)}`);
  console.log(`   Regions Covered: ${Object.keys(regionStats).length}\n`);
  
  // Regional breakdown
  console.log('🌍 Regional Breakdown:');
  Object.entries(regionStats)
    .sort(([,a], [,b]) => b.images - a.images)
    .forEach(([region, stats]) => {
      console.log(`   ${region}:`);
      console.log(`     Countries: ${stats.countries}`);
      console.log(`     Images: ${stats.images} (${((stats.images / totalImages) * 100).toFixed(1)}%)`);
      console.log(`     Avg per country: ${(stats.images / stats.countries).toFixed(1)}`);
      console.log('');
    });
  
  // Top countries by image count
  console.log('🏆 Top Countries by Image Count:');
  countryList
    .sort((a, b) => b.images - a.images)
    .slice(0, 10)
    .forEach((country, index) => {
      console.log(`   ${(index + 1).toString().padStart(2)}. ${country.country} (${country.region}) - ${country.images} images`);
    });
  
  // Countries with few images (potential for expansion)
  console.log('\n📈 Countries with Potential for More Content:');
  countryList
    .filter(c => c.images < 10)
    .sort((a, b) => a.images - b.images)
    .slice(0, 10)
    .forEach(country => {
      console.log(`   ${country.country} (${country.region}) - ${country.images} images`);
    });
}

/**
 * Audit portfolio for issues
 */
async function auditPortfolio() {
  console.log('🔍 Auditing portfolio for issues...\n');
  
  const albums = await readCurrentPortfolio();
  
  if (albums.length === 0) {
    console.log('❌ No portfolio data found. Run "fetch" command first.');
    return;
  }
  
  // Check for missing regions
  const expectedRegions = ['Africa', 'Asia', 'Middle East', 'South America', 'North America', 'Europe', 'Oceania'];
  const presentRegions = [...new Set(albums.map(a => a.region))];
  const missingRegions = expectedRegions.filter(r => !presentRegions.includes(r));
  
  if (missingRegions.length > 0) {
    console.log('🌍 Missing Regions:');
    missingRegions.forEach(region => {
      console.log(`   - ${region}`);
    });
    console.log('');
  }
  
  // Check for empty albums
  const emptyAlbums = albums.filter(a => a.images.length === 0);
  if (emptyAlbums.length > 0) {
    console.log('📭 Empty Albums:');
    emptyAlbums.forEach(album => {
      console.log(`   - ${album.country} (${album.region})`);
    });
    console.log('');
  }
  
  // Check for albums with very few images
  const sparseAlbums = albums.filter(a => a.images.length > 0 && a.images.length < 3);
  if (sparseAlbums.length > 0) {
    console.log('📄 Albums with Few Images (< 3):');
    sparseAlbums.forEach(album => {
      console.log(`   - ${album.country} (${album.region}) - ${album.images.length} images`);
    });
    console.log('');
  }
  
  // Check for duplicate slugs
  const slugs = albums.map(a => a.slug);
  const duplicateSlugs = slugs.filter((slug, index) => slugs.indexOf(slug) !== index);
  if (duplicateSlugs.length > 0) {
    console.log('🔄 Duplicate Slugs:');
    duplicateSlugs.forEach(slug => {
      const duplicateAlbums = albums.filter(a => a.slug === slug);
      console.log(`   - ${slug}: ${duplicateAlbums.map(a => a.country).join(', ')}`);
    });
    console.log('');
  }
  
  // Check URL patterns
  const brokenUrlPatterns = [];
  albums.forEach(album => {
    album.images.forEach(image => {
      if (!image.desktop || !image.desktop.startsWith('https://')) {
        brokenUrlPatterns.push(`${album.country}: ${image.desktop}`);
      }
    });
  });
  
  if (brokenUrlPatterns.length > 0) {
    console.log('🔗 Potential URL Issues:');
    brokenUrlPatterns.slice(0, 10).forEach(url => {
      console.log(`   - ${url}`);
    });
    if (brokenUrlPatterns.length > 10) {
      console.log(`   ... and ${brokenUrlPatterns.length - 10} more`);
    }
    console.log('');
  }
  
  console.log('✅ Audit complete!');
}

/**
 * Generate tagging suggestions for Cloudinary
 */
async function generateTaggingSuggestions() {
  console.log('🏷️  Generating tagging suggestions for Cloudinary...\n');
  
  // Read the debug report if available
  let unassignedImages = [];
  try {
    const reportPath = path.join(process.cwd(), 'cloudinary-fetch-report.json');
    const report = JSON.parse(await fs.readFile(reportPath, 'utf8'));
    unassignedImages = report.unassigned || [];
  } catch (error) {
    console.log('⚠️  No debug report found. Run "fetch" command first to get unassigned images.');
    return;
  }
  
  if (unassignedImages.length === 0) {
    console.log('🎉 All images are properly assigned! No tagging suggestions needed.');
    return;
  }
  
  console.log(`📋 Found ${unassignedImages.length} unassigned images. Here are tagging suggestions:\n`);
  
  // Analyze patterns in unassigned images
  const patternSuggestions = new Map();
  
  unassignedImages.forEach(image => {
    const filename = image.filename;
    
    // Look for potential patterns
    const patterns = [
      { regex: /^DSCF\d+/, suggestion: 'Add location tags based on EXIF data or shooting context' },
      { regex: /^\d{2}-\d{2}/, suggestion: 'Date-based filename - add country/location tags' },
      { regex: /^IMG_\d+/, suggestion: 'Generic filename - needs location context tags' },
      { regex: /[A-Z]{2,4}[-_]/, suggestion: 'Potential country code - verify and add to mapping' }
    ];
    
    for (const { regex, suggestion } of patterns) {
      if (regex.test(filename)) {
        if (!patternSuggestions.has(suggestion)) {
          patternSuggestions.set(suggestion, []);
        }
        patternSuggestions.get(suggestion).push(filename);
        break;
      }
    }
  });
  
  // Display suggestions by pattern
  patternSuggestions.forEach((files, suggestion) => {
    console.log(`💡 ${suggestion}`);
    console.log(`   Examples (${files.length} total):`);
    files.slice(0, 5).forEach(file => {
      console.log(`   - ${file}`);
    });
    if (files.length > 5) {
      console.log(`   ... and ${files.length - 5} more`);
    }
    console.log('');
  });
  
  // Generate bulk tagging commands
  console.log('🚀 Bulk Tagging Commands:');
  console.log('   Use these with Cloudinary CLI or API:\n');
  
  // Group by potential prefixes
  const prefixGroups = new Map();
  unassignedImages.forEach(image => {
    const filename = image.filename;
    const match = filename.match(/^([A-Z]{2,4})[-_]/);
    if (match) {
      const prefix = match[1];
      if (!prefixGroups.has(prefix)) {
        prefixGroups.set(prefix, []);
      }
      prefixGroups.get(prefix).push(filename);
    }
  });
  
  prefixGroups.forEach((files, prefix) => {
    if (files.length > 2) { // Only show if there are multiple files
      console.log(`   # Tag images with ${prefix} prefix:`);
      console.log(`   cld uploader add_tag ${prefix.toLowerCase()} --public_ids "${files.slice(0, 10).join(',')}"`);
      console.log('');
    }
  });
  
  // Available country codes
  console.log('📝 Available Country Codes in Mapping:');
  const codes = Object.keys(COUNTRY_MAPPINGS).sort();
  const codeGroups = [];
  for (let i = 0; i < codes.length; i += 10) {
    codeGroups.push(codes.slice(i, i + 10));
  }
  codeGroups.forEach(group => {
    console.log(`   ${group.join(', ')}`);
  });
}

/**
 * Update existing albums (incremental)
 */
async function updatePortfolio() {
  console.log('🔄 Updating portfolio with new images...\n');
  console.log('ℹ️  This will perform a full fetch to ensure all new images are included.');
  console.log('   Use "fetch" command for a complete regeneration.\n');
  
  // For now, just run the full fetch
  // In a more sophisticated version, this could:
  // 1. Get last update timestamp
  // 2. Fetch only images newer than timestamp
  // 3. Merge with existing data
  await fetchCloudinary();
}

/**
 * Main CLI handler
 */
async function main() {
  const command = process.argv[2];
  
  if (!command || command === 'help' || !COMMANDS[command]) {
    showHelp();
    return;
  }
  
  console.log(`🚀 Running command: ${command}\n`);
  
  try {
    switch (command) {
      case 'fetch':
        await fetchCloudinary();
        break;
        
      case 'update':
        await updatePortfolio();
        break;
        
      case 'analyze':
        await analyzePortfolio();
        break;
        
      case 'audit':
        await auditPortfolio();
        break;
        
      case 'tag':
        await generateTaggingSuggestions();
        break;
        
      default:
        console.log(`❌ Unknown command: ${command}`);
        showHelp();
    }
  } catch (error) {
    console.error(`\n❌ Error executing ${command}:`, error.message);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { 
  analyzePortfolio, 
  auditPortfolio, 
  generateTaggingSuggestions,
  readCurrentPortfolio 
};