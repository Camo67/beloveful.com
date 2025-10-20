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

console.log('Testing Cloudinary connection...\n');

// Test 1: Upload a simple test
console.log('1. Uploading test file...');
try {
  const result = await cloudinary.uploader.upload('public/Website beloveful.com/Homepage/Desktop Landscape/JOR-4604.jpg', {
    public_id: 'test-upload-sync',
    overwrite: true,
    resource_type: 'image'
  });
  console.log('Upload result:', {
    status: result.status,
    public_id: result.public_id,
    secure_url: result.secure_url || 'NO URL',
    url: result.url || 'NO URL'
  });
} catch (error) {
  console.error('Upload error:', error.message);
}

// Test 2: List existing resources
console.log('\n2. Listing resources...');
try {
  const list = await cloudinary.api.resources({
    type: 'upload',
    max_results: 5
  });
  console.log(`Found ${list.resources.length} resources:`);
  list.resources.forEach(r => console.log(`  - ${r.public_id}: ${r.secure_url}`));
} catch (error) {
  console.error('List error:', error.message);
}
