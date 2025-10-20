#!/usr/bin/env node

/**
 * Folder-Based Assignment - Use local directory structure to assign countries
 * 
 * This script analyzes your local folder structure to help assign unassigned
 * images to countries based on their directory paths.
 */

import { promises as fs } from 'fs';
import path from 'path';
import { findLocalImages } from './cross-reference-local.mjs';
import { extractCountryInfo, COUNTRY_MAPPINGS } from './fetch-cloudinary-portfolio.mjs';

const CONFIG = {
  publicDir: 'public',
  outputFile: 'folder-assignments.json',
  logFile: 'folder-assignment.log'
};

/**
 * Create folder-to-country mappings based on directory structure
 */
function createFolderMappings() {
  const folderMappings = new Map();
  
  // Add explicit folder name mappings
  const explicitMappings = {
    // Africa
    'egypt': { region: 'Africa', country: 'Egypt', slug: 'egypt' },
    'ethiopia': { region: 'Africa', country: 'Ethiopia', slug: 'ethiopia' },
    'namibia': { region: 'Africa', country: 'Namibia', slug: 'namibia' },
    'south africa': { region: 'Africa', country: 'South Africa', slug: 'south-africa' },
    'kenya': { region: 'Africa', country: 'Kenya', slug: 'kenya' },
    'tanzania': { region: 'Africa', country: 'Tanzania', slug: 'tanzania' },
    'morocco': { region: 'Africa', country: 'Morocco', slug: 'morocco' },
    'ghana': { region: 'Africa', country: 'Ghana', slug: 'ghana' },
    'rwanda': { region: 'Africa', country: 'Rwanda', slug: 'rwanda' },
    
    // Asia
    'china': { region: 'Asia', country: 'China', slug: 'china' },
    'hong kong': { region: 'Asia', country: 'Hong Kong', slug: 'hong-kong' },
    'india': { region: 'Asia', country: 'India', slug: 'india' },
    'japan': { region: 'Asia', country: 'Japan', slug: 'japan' },
    'myanmar': { region: 'Asia', country: 'Myanmar', slug: 'myanmar' },
    'burma': { region: 'Asia', country: 'Myanmar', slug: 'myanmar' },
    'nepal': { region: 'Asia', country: 'Nepal', slug: 'nepal' },
    'philippines': { region: 'Asia', country: 'Philippines', slug: 'philippines' },
    'thailand': { region: 'Asia', country: 'Thailand', slug: 'thailand' },
    'vietnam': { region: 'Asia', country: 'Vietnam', slug: 'vietnam' },
    'south korea': { region: 'Asia', country: 'South Korea', slug: 'south-korea' },
    'korea': { region: 'Asia', country: 'South Korea', slug: 'south-korea' },
    'malaysia': { region: 'Asia', country: 'Malaysia', slug: 'malaysia' },
    'singapore': { region: 'Asia', country: 'Singapore', slug: 'singapore' },
    'laos': { region: 'Asia', country: 'Laos', slug: 'laos' },
    'cambodia': { region: 'Asia', country: 'Cambodia', slug: 'cambodia' },
    'indonesia': { region: 'Asia', country: 'Indonesia', slug: 'indonesia' },
    'sri lanka': { region: 'Asia', country: 'Sri Lanka', slug: 'sri-lanka' },
    
    // Middle East
    'israel': { region: 'Middle East', country: 'Israel | Palestine', slug: 'israel-palestine' },
    'palestine': { region: 'Middle East', country: 'Israel | Palestine', slug: 'israel-palestine' },
    'jordan': { region: 'Middle East', country: 'Jordan', slug: 'jordan' },
    'uae': { region: 'Middle East', country: 'UAE', slug: 'uae' },
    'dubai': { region: 'Middle East', country: 'UAE', slug: 'uae' },
    'turkey': { region: 'Middle East', country: 'Turkey', slug: 'turkey' },
    'lebanon': { region: 'Middle East', country: 'Lebanon', slug: 'lebanon' },
    'iran': { region: 'Middle East', country: 'Iran', slug: 'iran' },
    'iraq': { region: 'Middle East', country: 'Iraq', slug: 'iraq' },
    'syria': { region: 'Middle East', country: 'Syria', slug: 'syria' },
    
    // South America
    'argentina': { region: 'South America', country: 'Argentina', slug: 'argentina' },
    'brazil': { region: 'South America', country: 'Brazil', slug: 'brazil' },
    'bolivia': { region: 'South America', country: 'Bolivia', slug: 'bolivia' },
    'chile': { region: 'South America', country: 'Chile', slug: 'chile' },
    'colombia': { region: 'South America', country: 'Colombia', slug: 'colombia' },
    'ecuador': { region: 'South America', country: 'Ecuador', slug: 'ecuador' },
    'peru': { region: 'South America', country: 'Peru', slug: 'peru' },
    'uruguay': { region: 'South America', country: 'Uruguay', slug: 'uruguay' },
    'venezuela': { region: 'South America', country: 'Venezuela', slug: 'venezuela' },
    'paraguay': { region: 'South America', country: 'Paraguay', slug: 'paraguay' },
    
    // North America
    'usa': { region: 'North America', country: 'United States', slug: 'usa' },
    'united states': { region: 'North America', country: 'United States', slug: 'usa' },
    'canada': { region: 'North America', country: 'Canada', slug: 'canada' },
    'mexico': { region: 'North America', country: 'Mexico', slug: 'mexico' },
    'chicago': { region: 'North America', country: 'Chicago', slug: 'chicago' },
    'new york': { region: 'North America', country: 'New York', slug: 'new-york' },
    'california': { region: 'North America', country: 'California', slug: 'california' },
    'guatemala': { region: 'North America', country: 'Guatemala', slug: 'guatemala' },
    'costa rica': { region: 'North America', country: 'Costa Rica', slug: 'costa-rica' },
    'panama': { region: 'North America', country: 'Panama', slug: 'panama' },
    'nicaragua': { region: 'North America', country: 'Nicaragua', slug: 'nicaragua' },
    'cuba': { region: 'North America', country: 'Cuba', slug: 'cuba' },
    'caribbean': { region: 'North America', country: 'Caribbean', slug: 'caribbean' },
    
    // Europe
    'italy': { region: 'Europe', country: 'Italy', slug: 'italy' },
    'france': { region: 'Europe', country: 'France', slug: 'france' },
    'greece': { region: 'Europe', country: 'Greece', slug: 'greece' },
    'spain': { region: 'Europe', country: 'Spain', slug: 'spain' },
    'portugal': { region: 'Europe', country: 'Portugal', slug: 'portugal' },
    'germany': { region: 'Europe', country: 'Germany', slug: 'germany' },
    'austria': { region: 'Europe', country: 'Austria', slug: 'austria' },
    'switzerland': { region: 'Europe', country: 'Switzerland', slug: 'switzerland' },
    'netherlands': { region: 'Europe', country: 'Netherlands', slug: 'netherlands' },
    'belgium': { region: 'Europe', country: 'Belgium', slug: 'belgium' },
    'uk': { region: 'Europe', country: 'United Kingdom', slug: 'uk' },
    'united kingdom': { region: 'Europe', country: 'United Kingdom', slug: 'uk' },
    'england': { region: 'Europe', country: 'United Kingdom', slug: 'uk' },
    'ireland': { region: 'Europe', country: 'Ireland', slug: 'ireland' },
    'iceland': { region: 'Europe', country: 'Iceland', slug: 'iceland' },
    'norway': { region: 'Europe', country: 'Norway', slug: 'norway' },
    'sweden': { region: 'Europe', country: 'Sweden', slug: 'sweden' },
    'denmark': { region: 'Europe', country: 'Denmark', slug: 'denmark' },
    'finland': { region: 'Europe', country: 'Finland', slug: 'finland' },
    'poland': { region: 'Europe', country: 'Poland', slug: 'poland' },
    'czech republic': { region: 'Europe', country: 'Czech Republic', slug: 'czech-republic' },
    'hungary': { region: 'Europe', country: 'Hungary', slug: 'hungary' },
    'romania': { region: 'Europe', country: 'Romania', slug: 'romania' },
    'bulgaria': { region: 'Europe', country: 'Bulgaria', slug: 'bulgaria' },
    'croatia': { region: 'Europe', country: 'Croatia', slug: 'croatia' },
    'slovenia': { region: 'Europe', country: 'Slovenia', slug: 'slovenia' },
    
    // Oceania
    'australia': { region: 'Oceania', country: 'Australia', slug: 'australia' },
    'new zealand': { region: 'Oceania', country: 'New Zealand', slug: 'new-zealand' },
    'fiji': { region: 'Oceania', country: 'Fiji', slug: 'fiji' },
    'papua new guinea': { region: 'Oceania', country: 'Papua New Guinea', slug: 'papua-new-guinea' },
    
    // Regional categories
    'central america': { region: 'North America', country: 'Central America', slug: 'central-america' },
    'scandinavia': { region: 'Europe', country: 'Scandinavia', slug: 'scandinavia' }
  };
  
  // Convert to map with normalized keys
  Object.entries(explicitMappings).forEach(([folder, info]) => {
    const normalizedKey = folder.toLowerCase().replace(/[^a-z0-9]/g, '');
    folderMappings.set(normalizedKey, info);
  });
  
  return folderMappings;
}

/**
 * Extract country info from folder path
 */
function extractCountryFromPath(filePath, folderMappings) {
  const pathParts = filePath.toLowerCase().split(path.sep);
  
  // Check each part of the path
  for (const part of pathParts) {
    // Clean the part for comparison
    const cleanPart = part.replace(/[^a-z0-9]/g, '');
    
    // Direct match
    if (folderMappings.has(cleanPart)) {
      return folderMappings.get(cleanPart);
    }
    
    // Partial matches for multi-word names
    for (const [key, info] of folderMappings.entries()) {
      if (cleanPart.includes(key) || key.includes(cleanPart)) {
        return info;
      }
    }
    
    // Check if the original part contains known country names
    const originalPart = part.toLowerCase();
    for (const [key, info] of folderMappings.entries()) {
      const originalKey = Object.keys(explicitMappings).find(k => 
        k.toLowerCase().replace(/[^a-z0-9]/g, '') === key
      );
      if (originalKey && originalPart.includes(originalKey.toLowerCase())) {
        return info;
      }
    }
  }
  
  return null;
}

/**
 * Analyze unassigned images and suggest folder-based assignments
 */
function analyzeUnassignedImages(localImages, folderMappings) {
  console.log('🔍 Analyzing unassigned images using folder structure...\n');
  
  const assignments = [];
  const stillUnassigned = [];
  const folderStats = new Map();
  
  localImages.forEach(image => {
    // First check if already assigned by filename
    const filenameCountry = extractCountryInfo(image.filename);
    
    if (!filenameCountry) {
      // Try to assign based on folder path
      const folderCountry = extractCountryFromPath(image.path, folderMappings);
      
      if (folderCountry) {
        assignments.push({
          filename: image.filename,
          path: image.path,
          assignedCountry: folderCountry,
          confidence: 'folder-based'
        });
        
        // Track folder assignments
        const key = `${folderCountry.region}|${folderCountry.country}`;
        folderStats.set(key, (folderStats.get(key) || 0) + 1);
      } else {
        stillUnassigned.push({
          filename: image.filename,
          path: image.path,
          pathParts: image.path.split(path.sep)
        });
      }
    }
  });
  
  return { assignments, stillUnassigned, folderStats };
}

/**
 * Generate tagging suggestions for Cloudinary
 */
function generateCloudinaryTags(assignments) {
  const tagSuggestions = new Map();
  
  assignments.forEach(assignment => {
    const country = assignment.assignedCountry.country.toLowerCase().replace(/[^a-z]/g, '');
    const region = assignment.assignedCountry.region.toLowerCase().replace(/[^a-z]/g, '');
    
    if (!tagSuggestions.has(country)) {
      tagSuggestions.set(country, {
        tag: country,
        region: assignment.assignedCountry.region,
        country: assignment.assignedCountry.country,
        files: []
      });
    }
    
    tagSuggestions.get(country).files.push(assignment.filename);
  });
  
  return tagSuggestions;
}

/**
 * Generate filename suggestions based on folder assignments
 */
function generateFilenameSuggestions(assignments) {
  const suggestions = [];
  
  // Try to map country to filename prefix
  const countryToPrefixMap = {};
  Object.entries(COUNTRY_MAPPINGS).forEach(([prefix, info]) => {
    const key = `${info.region}|${info.country}`;
    countryToPrefixMap[key] = prefix;
  });
  
  assignments.forEach(assignment => {
    const key = `${assignment.assignedCountry.region}|${assignment.assignedCountry.country}`;
    const prefix = countryToPrefixMap[key];
    
    if (prefix) {
      const currentFilename = assignment.filename;
      const ext = path.extname(currentFilename);
      const basename = path.basename(currentFilename, ext);
      
      // Generate suggested filename with country prefix
      let suggestedName;
      if (basename.match(/^\d+$/)) {
        // Pure number - add prefix
        suggestedName = `${prefix}-${basename}${ext}`;
      } else if (!basename.toUpperCase().startsWith(prefix)) {
        // Doesn't start with prefix - add it
        suggestedName = `${prefix}-${basename}${ext}`;
      } else {
        // Already has prefix or similar
        suggestedName = currentFilename;
      }
      
      if (suggestedName !== currentFilename) {
        suggestions.push({
          original: currentFilename,
          suggested: suggestedName,
          path: assignment.path,
          country: assignment.assignedCountry.country,
          prefix: prefix
        });
      }
    }
  });
  
  return suggestions;
}

/**
 * Main function
 */
async function main() {
  console.log('📁 Analyzing unassigned images using local folder structure...\n');
  
  // Find all local images
  const publicDir = path.join(process.cwd(), CONFIG.publicDir);
  const localImages = await findLocalImages(publicDir);
  
  if (localImages.length === 0) {
    console.log('❌ No local images found.');
    return;
  }
  
  console.log(`📸 Found ${localImages.length} local images`);
  
  // Create folder mappings
  const folderMappings = createFolderMappings();
  console.log(`🗺️  Created ${folderMappings.size} folder-to-country mappings`);
  
  // Analyze assignments
  const { assignments, stillUnassigned, folderStats } = analyzeUnassignedImages(localImages, folderMappings);
  
  console.log(`\n📊 Folder-Based Assignment Results:`);
  console.log(`   ✅ Successfully assigned: ${assignments.length} images`);
  console.log(`   ❓ Still unassigned: ${stillUnassigned.length} images`);
  
  if (assignments.length > 0) {
    console.log(`\n🌍 Countries Identified from Folders:`);
    Array.from(folderStats.entries())
      .sort(([,a], [,b]) => b - a)
      .slice(0, 15)
      .forEach(([key, count]) => {
        const [region, country] = key.split('|');
        console.log(`   ${country} (${region}): ${count} images`);
      });
    
    console.log(`\n📋 Sample Folder-Based Assignments:`);
    assignments.slice(0, 15).forEach(assignment => {
      console.log(`   📁 ${assignment.filename}`);
      console.log(`      Path: ${assignment.path}`);
      console.log(`      → ${assignment.assignedCountry.country} (${assignment.assignedCountry.region})`);
    });
    
    if (assignments.length > 15) {
      console.log(`   ... and ${assignments.length - 15} more assignments`);
    }
  }
  
  if (stillUnassigned.length > 0) {
    console.log(`\n❓ Still Unassigned Images (${stillUnassigned.length}):`);
    
    // Group by path patterns
    const pathPatterns = new Map();
    stillUnassigned.forEach(item => {
      const pathKey = item.pathParts.slice(0, 3).join('/'); // First 3 path parts
      if (!pathPatterns.has(pathKey)) {
        pathPatterns.set(pathKey, []);
      }
      pathPatterns.get(pathKey).push(item);
    });
    
    Array.from(pathPatterns.entries())
      .sort(([,a], [,b]) => b.length - a.length)
      .slice(0, 10)
      .forEach(([pathKey, items]) => {
        console.log(`   📂 ${pathKey}/ (${items.length} files)`);
        items.slice(0, 3).forEach(item => {
          console.log(`      - ${item.filename}`);
        });
        if (items.length > 3) {
          console.log(`      ... and ${items.length - 3} more`);
        }
      });
  }
  
  // Generate Cloudinary tagging suggestions
  const tagSuggestions = generateCloudinaryTags(assignments);
  if (tagSuggestions.size > 0) {
    console.log(`\n🏷️  Cloudinary Tagging Suggestions:`);
    console.log('   Use these commands to tag your images in Cloudinary:\n');
    
    Array.from(tagSuggestions.values()).slice(0, 10).forEach(suggestion => {
      const fileList = suggestion.files.slice(0, 10).join(',');
      console.log(`   # Tag ${suggestion.country} images:`);
      console.log(`   cld uploader add_tag ${suggestion.tag} --public_ids="${fileList}"`);
      if (suggestion.files.length > 10) {
        console.log(`   # ... and ${suggestion.files.length - 10} more files for ${suggestion.country}`);
      }
      console.log('');
    });
  }
  
  // Generate filename suggestions
  const filenameSuggestions = generateFilenameSuggestions(assignments);
  if (filenameSuggestions.length > 0) {
    console.log(`\n📝 Filename Improvement Suggestions (${filenameSuggestions.length}):`);
    filenameSuggestions.slice(0, 10).forEach(suggestion => {
      console.log(`   ${suggestion.original} → ${suggestion.suggested}`);
      console.log(`     ${suggestion.country} (${suggestion.prefix})`);
    });
    
    if (filenameSuggestions.length > 10) {
      console.log(`   ... and ${filenameSuggestions.length - 10} more suggestions`);
    }
    
    // Generate rename script
    let renameScript = '#!/bin/bash\n\n';
    renameScript += '# Filename suggestions based on folder analysis\n';
    renameScript += '# Review carefully before running!\n\n';
    
    filenameSuggestions.forEach(suggestion => {
      const oldPath = path.join(CONFIG.publicDir, suggestion.path);
      const newPath = path.join(path.dirname(oldPath), suggestion.suggested);
      renameScript += `echo "Renaming: ${suggestion.original} → ${suggestion.suggested}"\n`;
      renameScript += `# mv "${oldPath}" "${newPath}"\n`;
    });
    
    await fs.writeFile('folder-based-renames.sh', renameScript);
    console.log(`\n📜 Rename script generated: folder-based-renames.sh`);
    console.log('   (Commands are commented out - review and uncomment to execute)');
  }
  
  // Save detailed results
  const results = {
    timestamp: new Date().toISOString(),
    summary: {
      total_images: localImages.length,
      assigned_by_folders: assignments.length,
      still_unassigned: stillUnassigned.length,
      countries_found: folderStats.size
    },
    assignments: assignments,
    still_unassigned: stillUnassigned,
    folder_stats: Object.fromEntries(folderStats),
    tagging_suggestions: Object.fromEntries(tagSuggestions),
    filename_suggestions: filenameSuggestions
  };
  
  await fs.writeFile(CONFIG.outputFile, JSON.stringify(results, null, 2));
  console.log(`\n💾 Detailed results saved to: ${CONFIG.outputFile}`);
  
  await fs.writeFile(CONFIG.logFile, JSON.stringify(results, null, 2));
  console.log(`📋 Log saved to: ${CONFIG.logFile}`);
  
  console.log('\n🎉 Folder-based analysis complete!');
  
  if (assignments.length > 0) {
    console.log('\n💡 Next steps:');
    console.log('1. Use the Cloudinary tagging suggestions to tag your images');
    console.log('2. Consider the filename suggestions for better organization');
    console.log('3. Run npm run portfolio:fetch to regenerate with new assignments');
  }
}

// Export the explicitMappings for use in the main function
const explicitMappings = {
  'egypt': { region: 'Africa', country: 'Egypt', slug: 'egypt' },
  'china': { region: 'Asia', country: 'China', slug: 'china' },
  // ... (keeping reference for the function)
};

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  });
}

export { main, createFolderMappings, extractCountryFromPath };