#!/usr/bin/env node
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary with alternative credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

console.log(`Using credentials: ${process.env.CLOUDINARY_API_KEY}@${process.env.CLOUDINARY_CLOUD_NAME}`);

async function fetchAllImages() {
  try {
    console.log('🔍 Fetching images from Cloudinary...\n');

    const result = await cloudinary.api.resources({
      type: 'upload',
      resource_type: 'image',
      max_results: 30
    });

    console.log(`✅ Found ${result.resources.length} images\n`);
    
    result.resources.forEach((image, index) => {
      console.log(`${index + 1}. ${image.public_id}`);
      console.log(`   URL: ${image.secure_url}`);
      console.log(`   Size: ${image.width}x${image.height} ${image.format.toUpperCase()}`);
      console.log('');
    });

    // Save to file
    const outputData = {
      total_images: result.resources.length,
      fetch_date: new Date().toISOString(),
      images: result.resources.map(img => ({
        public_id: img.public_id,
        url: img.secure_url,
        width: img.width,
        height: img.height,
        format: img.format
      }))
    };

    await import('fs').then(fs => {
      fs.writeFileSync('cloudinary-images-alt.json', JSON.stringify(outputData, null, 2));
      console.log('💾 Results saved to cloudinary-images-alt.json');
    });

    return outputData;

  } catch (error) {
    console.error('❌ Error fetching images:', error.message);
    if (error.http_code) {
      console.error(`   HTTP Status: ${error.http_code}`);
    }
    console.error('Full error:', error);
    throw error;
  }
}

fetchAllImages().catch(console.error);