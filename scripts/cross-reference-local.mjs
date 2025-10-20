#!/usr/bin/env node

/**
 * Cross-Reference Local Files with Cloudinary
 * 
 * This script compares your local image files with what's in Cloudinary
 * and provides insights on what's missing, what's extra, and sync status.
 */

import { v2 as cloudinary } from 'cloudinary';
import { promises as fs } from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { extractCountryInfo, COUNTRY_MAPPINGS } from './fetch-cloudinary-portfolio.mjs';

dotenv.config();

// Configuration
const CONFIG = {
  cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  apiKey: process.env.CLOUDINARY_API_KEY,
  apiSecret: process.env.CLOUDINARY_API_SECRET,
  localPublicDir: 'public',
  imageExtensions: ['.jpg', '.jpeg', '.png', '.webp', '.avif'],
  outputFile: 'local-cloudinary-sync-report.json'
};

/**
 * Configure Cloudinary
 */
function configureCloudinary() {
  if (!CONFIG.cloudName || !CONFIG.apiKey || !CONFIG.apiSecret) {
    console.log('⚠️  Cloudinary credentials not found. Will only analyze local files.');
    return false;
  }

  cloudinary.config({
    cloud_name: CONFIG.cloudName,
    api_key: CONFIG.apiKey,
    api_secret: CONFIG.apiSecret
  });

  console.log(`✓ Cloudinary configured for: ${CONFIG.cloudName}`);
  return true;
}

/**
 * Recursively find all image files in a directory
 */
async function findLocalImages(dir, baseDir = dir) {
  const images = [];
  
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const relativePath = path.relative(baseDir, fullPath);
      
      if (entry.isDirectory()) {
        // Skip node_modules, .git, etc.
        if (!entry.name.startsWith('.') && entry.name !== 'node_modules') {
          const subImages = await findLocalImages(fullPath, baseDir);
          images.push(...subImages);
        }
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name).toLowerCase();
        if (CONFIG.imageExtensions.includes(ext)) {
          const stats = await fs.stat(fullPath);
          images.push({
            filename: entry.name,
            path: relativePath,
            fullPath: fullPath,
            size: stats.size,
            modified: stats.mtime
          });
        }
      }
    }
  } catch (error) {
    console.log(`⚠️  Could not read directory ${dir}: ${error.message}`);
  }
  
  return images;
}

/**
 * Fetch all images from Cloudinary
 */
async function fetchCloudinaryImages() {
  console.log('🔄 Fetching images from Cloudinary...');
  
  let allImages = [];
  let nextCursor = null;
  let page = 0;
  
  try {
    do {
      page++;
      console.log(`   Page ${page}...`);
      
      const result = await cloudinary.api.resources({
        type: 'upload',
        resource_type: 'image',
        max_results: 500,
        next_cursor: nextCursor,
        tags: true,
        context: true
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
    
  } catch (error) {
    console.error(`❌ Error fetching from Cloudinary: ${error.message}`);
    return [];
  }
}

/**
 * Extract filename without path and extension for comparison
 */
function normalizeFilename(filename) {
  return path.basename(filename, path.extname(filename)).toLowerCase();
}

/**
 * Find potential matches between local and Cloudinary images
 */
function findMatches(localImages, cloudinaryImages) {
  console.log('🔍 Cross-referencing local and Cloudinary images...');
  
  const matches = [];
  const localOnly = [];
  const cloudinaryOnly = [];
  
  // Create lookup maps
  const localMap = new Map();
  const cloudinaryMap = new Map();
  
  localImages.forEach(img => {
    const normalizedName = normalizeFilename(img.filename);
    localMap.set(normalizedName, img);
  });
  
  cloudinaryImages.forEach(img => {
    const normalizedName = normalizeFilename(img.public_id);
    cloudinaryMap.set(normalizedName, img);
  });
  
  // Find matches
  for (const [normalizedName, localImg] of localMap) {
    if (cloudinaryMap.has(normalizedName)) {
      const cloudinaryImg = cloudinaryMap.get(normalizedName);
      matches.push({
        filename: normalizedName,
        local: localImg,
        cloudinary: cloudinaryImg,
        status: 'matched'
      });
    } else {
      localOnly.push({
        filename: normalizedName,
        local: localImg,
        status: 'local_only'
      });
    }
  }
  
  // Find Cloudinary-only images
  for (const [normalizedName, cloudinaryImg] of cloudinaryMap) {
    if (!localMap.has(normalizedName)) {
      cloudinaryOnly.push({
        filename: normalizedName,
        cloudinary: cloudinaryImg,
        status: 'cloudinary_only'
      });
    }
  }
  
  return { matches, localOnly, cloudinaryOnly };
}

/**
 * Analyze portfolio organization
 */
function analyzePortfolioOrganization(localImages, cloudinaryImages) {
  console.log('📊 Analyzing portfolio organization...');
  
  const localByCountry = new Map();
  const cloudinaryByCountry = new Map();
  const unassignedLocal = [];
  const unassignedCloudinary = [];
  
  // Analyze local images
  localImages.forEach(img => {
    const countryInfo = extractCountryInfo(img.filename);
    if (countryInfo) {
      const key = `${countryInfo.region}|${countryInfo.country}`;
      if (!localByCountry.has(key)) {
        localByCountry.set(key, { ...countryInfo, images: [] });
      }
      localByCountry.get(key).images.push(img);
    } else {
      unassignedLocal.push(img);
    }
  });
  
  // Analyze Cloudinary images
  cloudinaryImages.forEach(img => {
    const countryInfo = extractCountryInfo(img.public_id, img.tags || []);
    if (countryInfo) {
      const key = `${countryInfo.region}|${countryInfo.country}`;
      if (!cloudinaryByCountry.has(key)) {
        cloudinaryByCountry.set(key, { ...countryInfo, images: [] });
      }
      cloudinaryByCountry.get(key).images.push(img);
    } else {
      unassignedCloudinary.push(img);
    }
  });
  
  return {
    localByCountry,
    cloudinaryByCountry,
    unassignedLocal,
    unassignedCloudinary
  };
}

/**
 * Generate sync recommendations
 */
function generateSyncRecommendations(analysis) {
  const recommendations = [];
  
  const { matches, localOnly, cloudinaryOnly } = analysis;
  
  // Recommend uploading local-only images
  if (localOnly.length > 0) {
    recommendations.push({
      type: 'upload_to_cloudinary',
      priority: 'high',
      count: localOnly.length,
      description: `Upload ${localOnly.length} local images to Cloudinary`,
      items: localOnly.slice(0, 10).map(item => ({
        filename: item.local.filename,
        path: item.local.path,
        suggested_public_id: normalizeFilename(item.local.filename)
      }))
    });
  }
  
  // Recommend downloading Cloudinary-only images
  if (cloudinaryOnly.length > 0) {
    recommendations.push({
      type: 'download_from_cloudinary',
      priority: 'medium',
      count: cloudinaryOnly.length,
      description: `Download ${cloudinaryOnly.length} Cloudinary images for local backup`,
      items: cloudinaryOnly.slice(0, 10).map(item => ({
        public_id: item.cloudinary.public_id,
        url: item.cloudinary.secure_url,
        suggested_filename: `${item.cloudinary.public_id}.${item.cloudinary.format}`
      }))
    });
  }
  
  // Check for size mismatches in matched files
  const sizeMismatches = matches.filter(match => {
    return Math.abs(match.local.size - match.cloudinary.bytes) > 10000; // 10KB tolerance
  });
  
  if (sizeMismatches.length > 0) {
    recommendations.push({
      type: 'size_mismatch_check',
      priority: 'low',
      count: sizeMismatches.length,
      description: `${sizeMismatches.length} files have size mismatches - may need re-upload`,
      items: sizeMismatches.slice(0, 5).map(match => ({
        filename: match.filename,
        local_size: match.local.size,
        cloudinary_size: match.cloudinary.bytes,
        difference: Math.abs(match.local.size - match.cloudinary.bytes)
      }))
    });
  }
  
  return recommendations;
}

/**
 * Generate upload script for local-only images
 */
function generateUploadScript(localOnlyImages) {
  if (localOnlyImages.length === 0) return '';
  
  let script = '#!/bin/bash\n\n';
  script += '# Upload local images to Cloudinary\n';
  script += '# Generated automatically - review before running\n\n';
  
  localOnlyImages.forEach(item => {
    const publicId = normalizeFilename(item.local.filename);
    const filePath = item.local.fullPath;
    script += `echo "Uploading ${item.local.filename}..."\n`;
    script += `cld uploader upload "${filePath}" --public_id="${publicId}" --overwrite=false\n`;
  });
  
  script += '\necho "Upload complete!"\n';
  return script;
}

/**
 * Main execution function
 */
async function main() {
  console.log('🔄 Cross-referencing local files with Cloudinary...\n');
  
  // Configure services
  const hasCloudinary = configureCloudinary();
  
  // Find local images
  console.log('📁 Scanning local images...');
  const publicDir = path.join(process.cwd(), CONFIG.localPublicDir);
  const localImages = await findLocalImages(publicDir);
  console.log(`✅ Found ${localImages.length} local images`);
  
  if (localImages.length === 0) {
    console.log('❌ No local images found. Check your public directory structure.');
    return;
  }
  
  // Fetch Cloudinary images
  let cloudinaryImages = [];
  if (hasCloudinary) {
    cloudinaryImages = await fetchCloudinaryImages();
  }
  
  // Cross-reference
  const crossRef = findMatches(localImages, cloudinaryImages);
  const portfolioAnalysis = analyzePortfolioOrganization(localImages, cloudinaryImages);
  const recommendations = generateSyncRecommendations(crossRef);
  
  // Generate summary
  console.log('\n📊 Cross-Reference Summary:');
  console.log(`   📸 Local Images: ${localImages.length}`);
  console.log(`   ☁️  Cloudinary Images: ${cloudinaryImages.length}`);
  console.log(`   ✅ Matched: ${crossRef.matches.length}`);
  console.log(`   📁 Local Only: ${crossRef.localOnly.length}`);
  console.log(`   ☁️  Cloudinary Only: ${crossRef.cloudinaryOnly.length}`);
  
  // Show portfolio organization comparison
  console.log('\n🌍 Portfolio Organization:');
  
  console.log(`   Local Portfolio:`);
  Array.from(portfolioAnalysis.localByCountry.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(0, 10)
    .forEach(([key, data]) => {
      const [region, country] = key.split('|');
      console.log(`     ${country} (${region}): ${data.images.length} images`);
    });
  
  if (hasCloudinary) {
    console.log(`   Cloudinary Portfolio:`);
    Array.from(portfolioAnalysis.cloudinaryByCountry.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .slice(0, 10)
      .forEach(([key, data]) => {
        const [region, country] = key.split('|');
        console.log(`     ${country} (${region}): ${data.images.length} images`);
      });
  }
  
  // Show unassigned images
  if (portfolioAnalysis.unassignedLocal.length > 0) {
    console.log(`\n❓ Unassigned Local Images (${portfolioAnalysis.unassignedLocal.length}):`);
    portfolioAnalysis.unassignedLocal.slice(0, 10).forEach(img => {
      console.log(`     - ${img.filename} (${img.path})`);
    });
    if (portfolioAnalysis.unassignedLocal.length > 10) {
      console.log(`     ... and ${portfolioAnalysis.unassignedLocal.length - 10} more`);
    }
  }
  
  // Show recommendations
  if (recommendations.length > 0) {
    console.log('\n💡 Sync Recommendations:');
    recommendations.forEach(rec => {
      console.log(`   ${rec.priority === 'high' ? '🔴' : rec.priority === 'medium' ? '🟡' : '🟢'} ${rec.description}`);
      if (rec.items && rec.items.length > 0) {
        rec.items.forEach(item => {
          if (rec.type === 'upload_to_cloudinary') {
            console.log(`     - Upload: ${item.path}`);
          } else if (rec.type === 'download_from_cloudinary') {
            console.log(`     - Download: ${item.public_id}`);
          } else {
            console.log(`     - Check: ${item.filename} (${item.difference} bytes diff)`);
          }
        });
      }
    });
  }
  
  // Generate files
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      local_images: localImages.length,
      cloudinary_images: cloudinaryImages.length,
      matched: crossRef.matches.length,
      local_only: crossRef.localOnly.length,
      cloudinary_only: crossRef.cloudinaryOnly.length
    },
    cross_reference: crossRef,
    portfolio_analysis: {
      local_countries: Array.from(portfolioAnalysis.localByCountry.entries()).map(([key, data]) => {
        const [region, country] = key.split('|');
        return { region, country, count: data.images.length };
      }),
      cloudinary_countries: Array.from(portfolioAnalysis.cloudinaryByCountry.entries()).map(([key, data]) => {
        const [region, country] = key.split('|');
        return { region, country, count: data.images.length };
      }),
      unassigned_local: portfolioAnalysis.unassignedLocal.map(img => ({
        filename: img.filename,
        path: img.path,
        size: img.size
      })),
      unassigned_cloudinary: portfolioAnalysis.unassignedCloudinary.map(img => ({
        public_id: img.public_id,
        url: img.secure_url,
        tags: img.tags || []
      }))
    },
    recommendations
  };
  
  // Save report
  await fs.writeFile(CONFIG.outputFile, JSON.stringify(report, null, 2));
  console.log(`\n✅ Detailed report saved to: ${CONFIG.outputFile}`);
  
  // Generate upload script if needed
  if (crossRef.localOnly.length > 0) {
    const uploadScript = generateUploadScript(crossRef.localOnly);
    await fs.writeFile('upload-to-cloudinary.sh', uploadScript);
    console.log(`📜 Upload script saved to: upload-to-cloudinary.sh`);
    console.log(`   Run: chmod +x upload-to-cloudinary.sh && ./upload-to-cloudinary.sh`);
  }
  
  console.log('\n🎉 Cross-reference complete!');
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  });
}

export { main, findLocalImages, findMatches };