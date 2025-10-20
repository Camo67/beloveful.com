#!/usr/bin/env node
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

console.log('Testing buffer/stream upload...\n');

const filePath = 'public/Website beloveful.com/Homepage/Desktop Landscape/JOR-4604.jpg';
const fileBuffer = fs.readFileSync(filePath);
const base64Data = `data:image/jpeg;base64,${fileBuffer.toString('base64')}`;

try {
  const result = await cloudinary.uploader.upload(base64Data, {
    folder: 'beloveful-website/Homepage/Desktop',
    public_id: 'JOR-4604',
    overwrite: true,
    resource_type: 'image'
  });
  
  console.log('Success!');
  console.log('Public ID:', result.public_id);
  console.log('URL:', result.secure_url);
  console.log('Status:', result.status || 'complete');
} catch (error) {
  console.error('Error:', error.message);
}
