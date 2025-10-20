#!/usr/bin/env node

/**
 * Cleanup Filenames - Fix naming patterns for better country detection
 * 
 * This script identifies and fixes problematic filename patterns that prevent
 * proper country detection, such as date prefixes and special characters.
 */

import { promises as fs } from 'fs';
import path from 'path';
import { findLocalImages } from './cross-reference-local.mjs';
import { extractCountryInfo, COUNTRY_MAPPINGS } from './fetch-cloudinary-portfolio.mjs';

const CONFIG = {
  publicDir: 'public',
  dryRun: true, // Set to false to actually rename files
  backupDir: 'filename_cleanup_backup',
  logFile: 'filename-cleanup.log'
};

/**
 * Analyze filename patterns to identify issues
 */
function analyzeFilename(filename) {
  const issues = [];
  const suggestions = [];
  
  // Check for date prefixes (MM-DD- or DD-MM- patterns)
  const datePrefix = filename.match(/^(\d{2}-\d{2}-)/);
  if (datePrefix) {
    issues.push('date_prefix');
    suggestions.push(`Remove date prefix: ${datePrefix[1]}`);
  }
  
  // Check for spaces (should be hyphens or underscores)
  if (filename.includes(' ')) {
    issues.push('spaces');
    suggestions.push('Replace spaces with hyphens');
  }
  
  // Check for multiple extensions or unusual patterns
  if (filename.match(/\.\w+\.\w+$/)) {
    issues.push('double_extension');
    suggestions.push('Fix double extension');
  }
  
  // Check for special characters that might cause issues
  if (filename.match(/[()&@#$%^*+=\[\]{}|\\:";'<>?,]/)) {
    issues.push('special_characters');
    suggestions.push('Remove/replace special characters');
  }
  
  // Check if filename is too generic
  if (filename.match(/^(IMG_|DSC|DSCF)\d+/i) && !filename.includes('-')) {
    issues.push('generic_filename');
    suggestions.push('Add location context');
  }
  
  return { issues, suggestions };
}

/**
 * Generate a cleaned filename
 */
function generateCleanFilename(originalFilename, filePath) {
  let cleanName = originalFilename;
  const ext = path.extname(cleanName);
  let baseName = path.basename(cleanName, ext);
  
  // Remove date prefixes (MM-DD- or DD-MM-)
  baseName = baseName.replace(/^(\d{2}-\d{2}-)/, '');
  
  // Replace spaces with hyphens
  baseName = baseName.replace(/\s+/g, '-');
  
  // Remove special characters, keep only alphanumeric, hyphens, underscores
  baseName = baseName.replace(/[^a-zA-Z0-9\-_]/g, '');
  
  // Remove double hyphens
  baseName = baseName.replace(/--+/g, '-');
  
  // Remove leading/trailing hyphens
  baseName = baseName.replace(/^-+|-+$/g, '');
  
  // If we can extract country info from the path, try to add it
  if (!extractCountryInfo(baseName)) {
    // Try to extract country from directory structure
    const pathParts = filePath.split(path.sep);
    for (const part of pathParts) {
      for (const [prefix, info] of Object.entries(COUNTRY_MAPPINGS)) {
        if (part.toLowerCase().includes(info.country.toLowerCase().replace(/[^a-z]/g, ''))) {
          // If the basename doesn't start with a country code, try adding it
          if (!baseName.toUpperCase().startsWith(prefix)) {
            baseName = `${prefix}-${baseName}`;
            break;
          }
        }
      }
      if (extractCountryInfo(baseName)) break;
    }
  }
  
  // Ensure we don't have an empty basename
  if (!baseName) {
    baseName = 'unknown';
  }
  
  return baseName + ext.toLowerCase();
}

/**
 * Create backup of original files
 */
async function createBackup(filesToRename) {
  if (filesToRename.length === 0) return;
  
  const backupPath = path.join(process.cwd(), CONFIG.backupDir);
  
  try {
    await fs.mkdir(backupPath, { recursive: true });
    
    const backupList = filesToRename.map(file => ({
      original: file.currentPath,
      relativePath: file.relativePath,
      newName: file.newFilename
    }));
    
    await fs.writeFile(
      path.join(backupPath, 'renamed-files.json'), 
      JSON.stringify(backupList, null, 2)
    );
    
    console.log(`📋 Backup information saved to: ${CONFIG.backupDir}/renamed-files.json`);
  } catch (error) {
    console.error(`⚠️  Could not create backup: ${error.message}`);
  }
}

/**
 * Rename a single file
 */
async function renameFile(oldPath, newPath) {
  try {
    await fs.rename(oldPath, newPath);
    return true;
  } catch (error) {
    console.error(`❌ Failed to rename ${oldPath}: ${error.message}`);
    return false;
  }
}

/**
 * Main cleanup function
 */
async function main() {
  console.log('🧹 Analyzing filenames for cleanup...\n');
  
  // Find all local images
  const publicDir = path.join(process.cwd(), CONFIG.publicDir);
  const localImages = await findLocalImages(publicDir);
  
  if (localImages.length === 0) {
    console.log('❌ No local images found.');
    return;
  }
  
  console.log(`📁 Found ${localImages.length} local images`);
  
  // Analyze each filename
  const problematicFiles = [];
  const cleanFiles = [];
  const renameOperations = [];
  
  for (const image of localImages) {
    const analysis = analyzeFilename(image.filename);
    
    if (analysis.issues.length > 0) {
      problematicFiles.push({
        ...image,
        issues: analysis.issues,
        suggestions: analysis.suggestions
      });
      
      // Generate clean filename
      const cleanFilename = generateCleanFilename(image.filename, image.path);
      const newPath = path.join(path.dirname(image.fullPath), cleanFilename);
      
      // Check if the new name would help with country detection
      const originalCountry = extractCountryInfo(image.filename);
      const cleanCountry = extractCountryInfo(cleanFilename);
      const improvesDetection = !originalCountry && cleanCountry;
      
      renameOperations.push({
        currentPath: image.fullPath,
        newPath: newPath,
        currentFilename: image.filename,
        newFilename: cleanFilename,
        relativePath: image.path,
        issues: analysis.issues,
        improvesDetection,
        countryBefore: originalCountry?.country || 'Unassigned',
        countryAfter: cleanCountry?.country || 'Unassigned'
      });
    } else {
      cleanFiles.push(image);
    }
  }
  
  // Show analysis results
  console.log('\n📊 Filename Analysis Results:');
  console.log(`   ✅ Clean filenames: ${cleanFiles.length}`);
  console.log(`   🔧 Need cleanup: ${problematicFiles.length}`);
  
  if (problematicFiles.length === 0) {
    console.log('\n🎉 All filenames are already clean!');
    return;
  }
  
  // Show issue breakdown
  const issueStats = {};
  problematicFiles.forEach(file => {
    file.issues.forEach(issue => {
      issueStats[issue] = (issueStats[issue] || 0) + 1;
    });
  });
  
  console.log('\n🔍 Common Issues Found:');
  Object.entries(issueStats).forEach(([issue, count]) => {
    const description = {
      'date_prefix': 'Date prefixes (MM-DD-)',
      'spaces': 'Spaces in filenames',
      'double_extension': 'Double file extensions',
      'special_characters': 'Special characters',
      'generic_filename': 'Generic camera filenames'
    }[issue] || issue;
    
    console.log(`   ${issue}: ${count} files - ${description}`);
  });
  
  // Show country detection improvements
  const detectionImprovements = renameOperations.filter(op => op.improvesDetection);
  console.log(`\n🎯 Country Detection Improvements: ${detectionImprovements.length} files`);
  
  if (detectionImprovements.length > 0) {
    console.log('\n📈 Files that will improve country detection:');
    detectionImprovements.slice(0, 10).forEach(op => {
      console.log(`   ${op.currentFilename} → ${op.newFilename}`);
      console.log(`     ${op.countryBefore} → ${op.countryAfter}`);
    });
    if (detectionImprovements.length > 10) {
      console.log(`   ... and ${detectionImprovements.length - 10} more`);
    }
  }
  
  // Show sample renames
  console.log('\n🔄 Sample Rename Operations:');
  renameOperations.slice(0, 15).forEach(op => {
    const status = op.improvesDetection ? '🎯' : '🧹';
    console.log(`   ${status} ${op.currentFilename} → ${op.newFilename}`);
    if (op.issues.length > 0) {
      console.log(`     Issues: ${op.issues.join(', ')}`);
    }
  });
  
  if (renameOperations.length > 15) {
    console.log(`   ... and ${renameOperations.length - 15} more files to rename`);
  }
  
  // Check for potential conflicts
  const newFilenames = renameOperations.map(op => op.newFilename.toLowerCase());
  const duplicates = newFilenames.filter((name, index) => newFilenames.indexOf(name) !== index);
  
  if (duplicates.length > 0) {
    console.log(`\n⚠️  Warning: ${duplicates.length} filename conflicts detected`);
    console.log('   These files would have the same name after cleanup:');
    [...new Set(duplicates)].forEach(duplicate => {
      const conflicts = renameOperations.filter(op => op.newFilename.toLowerCase() === duplicate);
      console.log(`   "${duplicate}":`);
      conflicts.forEach(conflict => {
        console.log(`     - ${conflict.currentFilename} (${conflict.relativePath})`);
      });
    });
  }
  
  // Execute or preview
  if (CONFIG.dryRun) {
    console.log('\n🔍 DRY RUN MODE - No files will be renamed');
    console.log('   To actually rename files, edit the script and set CONFIG.dryRun = false');
    
    // Generate rename script
    let script = '#!/bin/bash\n\n';
    script += '# Generated filename cleanup script\n';
    script += '# Review carefully before running!\n\n';
    
    renameOperations.forEach(op => {
      script += `echo "Renaming: ${op.currentFilename} → ${op.newFilename}"\n`;
      script += `mv "${op.currentPath}" "${op.newPath}"\n`;
    });
    
    await fs.writeFile('cleanup-filenames.sh', script);
    console.log('📜 Rename script generated: cleanup-filenames.sh');
    console.log('   Review and run: chmod +x cleanup-filenames.sh && ./cleanup-filenames.sh');
  } else {
    console.log(`\n🔄 Renaming ${renameOperations.length} files...`);
    
    // Create backup first
    await createBackup(renameOperations);
    
    let successCount = 0;
    let failureCount = 0;
    
    for (const operation of renameOperations) {
      const success = await renameFile(operation.currentPath, operation.newPath);
      if (success) {
        successCount++;
        console.log(`✅ ${operation.currentFilename} → ${operation.newFilename}`);
      } else {
        failureCount++;
      }
    }
    
    console.log(`\n📊 Rename Results:`);
    console.log(`   ✅ Successful: ${successCount}`);
    console.log(`   ❌ Failed: ${failureCount}`);
  }
  
  // Save detailed log
  const logData = {
    timestamp: new Date().toISOString(),
    mode: CONFIG.dryRun ? 'dry_run' : 'execute',
    summary: {
      total_files: localImages.length,
      clean_files: cleanFiles.length,
      problematic_files: problematicFiles.length,
      detection_improvements: detectionImprovements.length,
      conflicts: duplicates.length
    },
    issue_stats: issueStats,
    rename_operations: renameOperations,
    problematic_files: problematicFiles.map(f => ({
      filename: f.filename,
      path: f.path,
      issues: f.issues,
      suggestions: f.suggestions
    }))
  };
  
  await fs.writeFile(CONFIG.logFile, JSON.stringify(logData, null, 2));
  console.log(`\n📋 Detailed log saved to: ${CONFIG.logFile}`);
  
  console.log('\n🎉 Filename analysis complete!');
  
  if (CONFIG.dryRun) {
    console.log('\n💡 Next steps:');
    console.log('1. Review the generated cleanup-filenames.sh script');
    console.log('2. Set CONFIG.dryRun = false in this script to perform actual renames');
    console.log('3. Run npm run portfolio:sync again to see improvements');
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  });
}

export { main, analyzeFilename, generateCleanFilename };