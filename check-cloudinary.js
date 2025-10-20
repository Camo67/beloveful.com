#!/usr/bin/env node
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

// Try to get resource info for JOR-4604
try {
  const result = await cloudinary.api.resource('beloveful-website/Homepage/Desktop/JOR-4604', {
    resource_type: 'image'
  });
  console.log('Found resource:', JSON.stringify(result, null, 2));
} catch (error) {
  console.error('Error fetching resource:', error.message);
  
  // Try listing resources in the folder
  console.log('\nListing resources in beloveful-website/Homepage/Desktop:');
  try {
    const list = await cloudinary.api.resources({
      type: 'upload',
      prefix: 'beloveful-website/Homepage/Desktop',
      max_results: 5
    });
    console.log('Found resources:', list.resources.map(r => ({ public_id: r.public_id, url: r.secure_url })));
  } catch (e) {
    console.error('Error listing:', e.message);
  }
}
