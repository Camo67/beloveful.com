#!/usr/bin/env node

/**
 * Smart Filename Cleanup - Targeted fixes with conflict resolution
 * 
 * This script focuses on the highest-impact filename fixes while safely
 * handling conflicts and preserving important distinctions.
 */

import { promises as fs } from 'fs';
import path from 'path';
import { findLocalImages } from './cross-reference-local.mjs';
import { extractCountryInfo, COUNTRY_MAPPINGS } from './fetch-cloudinary-portfolio.mjs';

const CONFIG = {
  publicDir: 'public',
  dryRun: true, // Set to false to actually rename files
  logFile: 'smart-cleanup.log',
  // Focus on high-impact fixes that improve country detection
  priorityFixes: [
    'date_prefix',    // Highest priority - directly prevents country detection
    'spaces',         // High priority - affects URL generation
    'special_characters' // Medium priority - causes issues
  ]
};

/**
 * Smart filename generation with conflict resolution
 */
function generateSmartFilename(originalFilename, filePath, existingNames) {
  let cleanName = originalFilename;
  const ext = path.extname(cleanName);
  let baseName = path.basename(cleanName, ext);
  
  // Only apply high-priority fixes to reduce conflicts
  
  // 1. Remove date prefixes (HIGHEST PRIORITY for country detection)
  const datePrefix = baseName.match(/^(\d{2}-\d{2}-)/);
  if (datePrefix) {
    baseName = baseName.replace(/^(\d{2}-\d{2}-)/, '');
  }
  
  // 2. Handle spaces more intelligently
  if (baseName.includes(' ')) {
    // Don't just replace with hyphens - be smarter about it
    baseName = baseName
      .replace(/\s+copy\s*\d*$/i, '-copy') // "file copy" → "file-copy"
      .replace(/\s+/g, '-')                // Other spaces → hyphens
      .replace(/--+/g, '-');              // Multiple hyphens → single
  }
  
  // 3. Remove problematic special characters
  baseName = baseName.replace(/[()&@#$%^*+=\[\]{}|\\:";'<>?]/g, '');
  
  // 4. Clean up the result
  baseName = baseName
    .replace(/--+/g, '-')     // Multiple hyphens
    .replace(/^-+|-+$/g, ''); // Leading/trailing hyphens
  
  // 5. Ensure we have a valid basename
  if (!baseName) {
    baseName = 'image';
  }
  
  let finalName = baseName + ext.toLowerCase();
  
  // 6. Handle conflicts by adding directory context
  if (existingNames.has(finalName.toLowerCase())) {
    // Try to add directory context to make it unique
    const pathParts = filePath.split(path.sep);
    for (let i = pathParts.length - 2; i >= 0; i--) {
      const contextPart = pathParts[i]
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '')
        .substring(0, 8); // Keep it short
      
      const contextualName = `${baseName}-${contextPart}${ext.toLowerCase()}`;
      if (!existingNames.has(contextualName.toLowerCase())) {
        finalName = contextualName;
        break;
      }
    }
    
    // If still conflicts, add a number
    if (existingNames.has(finalName.toLowerCase())) {
      let counter = 1;
      let numberedName;
      do {
        numberedName = `${baseName}-${counter}${ext.toLowerCase()}`;
        counter++;
      } while (existingNames.has(numberedName.toLowerCase()));
      finalName = numberedName;
    }
  }
  
  return finalName;
}

/**
 * Analyze and prioritize files for cleanup
 */
function analyzeAndPrioritize(localImages) {
  const operations = [];
  const existingNames = new Set();
  
  // First, catalog all existing filenames
  localImages.forEach(img => {
    existingNames.add(img.filename.toLowerCase());
  });
  
  // Analyze each file and score by impact
  localImages.forEach(image => {
    const issues = [];
    let impact = 0;
    
    // Check for date prefix (HIGHEST IMPACT)
    if (image.filename.match(/^\d{2}-\d{2}-/)) {
      issues.push('date_prefix');
      impact += 10; // High impact - prevents country detection
    }
    
    // Check for spaces
    if (image.filename.includes(' ')) {
      issues.push('spaces');
      impact += 5; // Medium impact - affects URLs
    }
    
    // Check for special characters
    if (image.filename.match(/[()&@#$%^*+=\[\]{}|\\:";'<>?]/)) {
      issues.push('special_characters');
      impact += 3; // Lower impact but still problematic
    }
    
    // Only process files with priority issues
    const hasPriorityIssues = issues.some(issue => CONFIG.priorityFixes.includes(issue));
    
    if (hasPriorityIssues) {
      const newFilename = generateSmartFilename(image.filename, image.path, existingNames);
      
      // Check if this would improve country detection
      const originalCountry = extractCountryInfo(image.filename);
      const newCountry = extractCountryInfo(newFilename);
      const improvesDetection = !originalCountry && newCountry;
      
      if (improvesDetection) {
        impact += 15; // BONUS for improving country detection
      }
      
      operations.push({
        currentPath: image.fullPath,
        newPath: path.join(path.dirname(image.fullPath), newFilename),
        currentFilename: image.filename,
        newFilename: newFilename,
        relativePath: image.path,
        issues: issues,
        impact: impact,
        improvesDetection: improvesDetection,
        countryBefore: originalCountry?.country || 'Unassigned',
        countryAfter: newCountry?.country || 'Unassigned'
      });
      
      // Add new filename to existing set to prevent conflicts
      existingNames.add(newFilename.toLowerCase());
    }
  });
  
  // Sort by impact (highest first)
  operations.sort((a, b) => b.impact - a.impact);
  
  return operations;
}

/**
 * Main function
 */
async function main() {
  console.log('🎯 Smart filename cleanup - targeting high-impact fixes...\n');
  
  // Find all local images
  const publicDir = path.join(process.cwd(), CONFIG.publicDir);
  const localImages = await findLocalImages(publicDir);
  
  if (localImages.length === 0) {
    console.log('❌ No local images found.');
    return;
  }
  
  console.log(`📁 Found ${localImages.length} local images`);
  
  // Analyze and prioritize operations
  const operations = analyzeAndPrioritize(localImages);
  
  console.log(`\n📊 Smart Cleanup Analysis:`);
  console.log(`   🎯 High-impact operations identified: ${operations.length}`);
  
  if (operations.length === 0) {
    console.log('\n🎉 No high-impact cleanup needed!');
    return;
  }
  
  // Show impact breakdown
  const detectionImprovements = operations.filter(op => op.improvesDetection);
  const datePrefixFixes = operations.filter(op => op.issues.includes('date_prefix'));
  const spaceFixes = operations.filter(op => op.issues.includes('spaces'));
  
  console.log(`\n🎯 Impact Summary:`);
  console.log(`   🔥 Will improve country detection: ${detectionImprovements.length} files`);
  console.log(`   📅 Date prefix fixes: ${datePrefixFixes.length} files`);
  console.log(`   🔤 Space fixes: ${spaceFixes.length} files`);
  
  // Show top improvements
  console.log(`\n🚀 Top Country Detection Improvements:`);
  detectionImprovements.slice(0, 10).forEach((op, index) => {
    console.log(`   ${index + 1}. ${op.currentFilename} → ${op.newFilename}`);
    console.log(`      ${op.countryBefore} → ${op.countryAfter} (Impact: ${op.impact})`);
  });
  
  if (detectionImprovements.length > 10) {
    console.log(`   ... and ${detectionImprovements.length - 10} more detection improvements`);
  }
  
  // Show sample of other operations
  const otherOps = operations.filter(op => !op.improvesDetection);
  if (otherOps.length > 0) {
    console.log(`\n🧹 Other Cleanup Operations:`);
    otherOps.slice(0, 10).forEach(op => {
      console.log(`   🔧 ${op.currentFilename} → ${op.newFilename}`);
      console.log(`      Issues: ${op.issues.join(', ')} (Impact: ${op.impact})`);
    });
    if (otherOps.length > 10) {
      console.log(`   ... and ${otherOps.length - 10} more cleanup operations`);
    }
  }
  
  // Execute or generate script
  if (CONFIG.dryRun) {
    console.log('\n🔍 DRY RUN MODE - No files will be renamed');
    
    // Generate focused cleanup script
    let script = '#!/bin/bash\n\n';
    script += '# Smart Filename Cleanup Script\n';
    script += '# Focuses on high-impact fixes for country detection\n\n';
    script += 'echo "Starting smart filename cleanup..."\n\n';
    
    // Process highest-impact operations first
    operations.forEach(op => {
      script += `echo "${op.improvesDetection ? '🎯' : '🧹'} ${op.currentFilename} → ${op.newFilename}"\n`;
      script += `mv "${op.currentPath}" "${op.newPath}"\n`;
    });
    
    script += '\necho "Smart cleanup complete!"\n';
    script += 'echo "Run npm run portfolio:sync to see improvements"\n';
    
    await fs.writeFile('smart-cleanup.sh', script);
    console.log('\n📜 Smart cleanup script generated: smart-cleanup.sh');
    console.log('   Review and run: chmod +x smart-cleanup.sh && ./smart-cleanup.sh');
    
    console.log('\n💡 This script prioritizes:');
    console.log('   1. Removing date prefixes (enables country detection)');
    console.log('   2. Fixing spaces in filenames (improves URLs)');
    console.log('   3. Intelligent conflict resolution');
    console.log('   4. Preserving important file distinctions');
    
  } else {
    console.log(`\n🔄 Executing ${operations.length} smart rename operations...`);
    
    let successCount = 0;
    let failureCount = 0;
    
    for (const operation of operations) {
      try {
        await fs.rename(operation.currentPath, operation.newPath);
        successCount++;
        const icon = operation.improvesDetection ? '🎯' : '🧹';
        console.log(`${icon} ${operation.currentFilename} → ${operation.newFilename}`);
        if (operation.improvesDetection) {
          console.log(`    ${operation.countryBefore} → ${operation.countryAfter}`);
        }
      } catch (error) {
        failureCount++;
        console.error(`❌ Failed to rename ${operation.currentFilename}: ${error.message}`);
      }
    }
    
    console.log(`\n📊 Smart Cleanup Results:`);
    console.log(`   ✅ Successful: ${successCount}`);
    console.log(`   ❌ Failed: ${failureCount}`);
    console.log(`   🎯 Country detection improved: ${detectionImprovements.length}`);
  }
  
  // Save log
  const logData = {
    timestamp: new Date().toISOString(),
    mode: CONFIG.dryRun ? 'dry_run' : 'execute',
    summary: {
      total_operations: operations.length,
      detection_improvements: detectionImprovements.length,
      date_prefix_fixes: datePrefixFixes.length,
      space_fixes: spaceFixes.length
    },
    operations: operations
  };
  
  await fs.writeFile(CONFIG.logFile, JSON.stringify(logData, null, 2));
  console.log(`\n📋 Detailed log saved to: ${CONFIG.logFile}`);
  
  console.log('\n🎉 Smart cleanup analysis complete!');
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  });
}

export { main };
