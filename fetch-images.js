#!/usr/bin/env node
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary with Media Hook credentials
cloudinary.config({
  cloud_name: 'dvwdoezk1',
  api_key: '677574118368433',
  api_secret: 'e82ozhF6xSU28rT-PI1oa-qsLZs',
  secure: true
});

async function fetchAllImages() {
  try {
    console.log('🔍 Fetching images from Cloudinary...\n');

    // Get all resources with pagination
    let allImages = [];
    let nextCursor = null;
    let page = 1;

    do {
      console.log(`📄 Fetching page ${page}...`);
      
      const options = {
        type: 'upload',
        resource_type: 'image',
        max_results: 100,
        ...(nextCursor && { next_cursor: nextCursor })
      };

      const result = await cloudinary.api.resources(options);
      
      allImages = allImages.concat(result.resources);
      nextCursor = result.next_cursor;
      
      console.log(`   Found ${result.resources.length} images on page ${page}`);
      page++;
      
    } while (nextCursor);

    console.log(`\n✅ Total images found: ${allImages.length}\n`);

    // Organize images by folder/prefix
    const imagesByFolder = {};
    
    allImages.forEach(image => {
      const folder = image.public_id.split('/').slice(0, -1).join('/') || 'root';
      if (!imagesByFolder[folder]) {
        imagesByFolder[folder] = [];
      }
      imagesByFolder[folder].push({
        public_id: image.public_id,
        url: image.secure_url,
        width: image.width,
        height: image.height,
        format: image.format,
        created_at: image.created_at
      });
    });

    // Display results
    console.log('📁 Images organized by folder:\n');
    
    Object.entries(imagesByFolder).forEach(([folder, images]) => {
      console.log(`📂 ${folder} (${images.length} images)`);
      images.slice(0, 3).forEach(img => {
        console.log(`   • ${img.public_id} - ${img.width}x${img.height} ${img.format.toUpperCase()}`);
      });
      if (images.length > 3) {
        console.log(`   ... and ${images.length - 3} more images`);
      }
      console.log();
    });

    // Save results to JSON file
    const outputData = {
      total_images: allImages.length,
      fetch_date: new Date().toISOString(),
      folders: imagesByFolder
    };

    await import('fs').then(fs => {
      fs.writeFileSync('cloudinary-images.json', JSON.stringify(outputData, null, 2));
      console.log('💾 Results saved to cloudinary-images.json');
    });

    return outputData;

  } catch (error) {
    console.error('❌ Error fetching images:', error.message);
    if (error.http_code) {
      console.error(`   HTTP Status: ${error.http_code}`);
    }
    throw error;
  }
}

// Fetch images from specific folders
async function fetchImagesByFolder(folderPrefix) {
  try {
    console.log(`🔍 Fetching images from folder: ${folderPrefix}\n`);
    
    const result = await cloudinary.api.resources({
      type: 'upload',
      resource_type: 'image',
      prefix: folderPrefix,
      max_results: 100
    });

    console.log(`✅ Found ${result.resources.length} images in ${folderPrefix}\n`);
    
    result.resources.forEach(image => {
      console.log(`📸 ${image.public_id}`);
      console.log(`   URL: ${image.secure_url}`);
      console.log(`   Size: ${image.width}x${image.height} ${image.format.toUpperCase()}`);
      console.log('');
    });

    return result.resources;

  } catch (error) {
    console.error(`❌ Error fetching images from ${folderPrefix}:`, error.message);
    throw error;
  }
}

// Main execution
async function main() {
  const args = process.argv.slice(2);
  
  if (args.length > 0 && args[0] === '--folder' && args[1]) {
    await fetchImagesByFolder(args[1]);
  } else {
    await fetchAllImages();
  }
}

// Run the script
main().catch(console.error);