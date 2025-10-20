#!/usr/bin/env node

/**
 * Upload Workshop Photos to Cloudflare R2
 * 
 * Prerequisites:
 * 1. Install AWS SDK: npm install @aws-sdk/client-s3
 * 2. Set environment variables:
 *    - R2_ACCOUNT_ID
 *    - R2_ACCESS_KEY_ID
 *    - R2_SECRET_ACCESS_KEY
 *    - R2_BUCKET_NAME
 * 
 * Usage: node scripts/upload-workshop-photos.js
 */

const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const fs = require('fs');
const path = require('path');

// Cloudflare R2 configuration
const r2Client = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

const BUCKET_NAME = process.env.R2_BUCKET_NAME;
const WORKSHOP_PHOTOS_DIR = path.join(__dirname, '../public/Website beloveful.com/Workshop Photos');

// Image organization
const workshopImages = {
  'chicagoPrivate': [
    'Copy of CHI-0871.jpg',
    'Copy of CHI-09-19-DSCF5133.jpg',
    'Copy of CHI-2084-Website-2.jpg',
    'Copy of CHI-359.jpg'
  ],
  'chicagoGroup': [
    'Copy of CHI-3.jpg',
    'Copy of CHI-5041.jpg',
    'Copy of CHI-5652.jpg',
    'Copy of CHI-65.jpg'
  ],
  'online': [
    'Copy of CHI-8649.jpg',
    'Copy of CHI-8789.jpg',
    'Copy of CHI-9867.jpg',
    'Copy of CHI-9872-Website-2.jpg'
  ],
  'mentorship': [
    'Copy of CHI-Cafe-.jpg',
    'Copy of DSCF1980.jpg',
    'Copy of DSCF8938.jpg',
    'Copy of Fountain Fairy.jpg',
    'Copy of Tony_Menias 1.jpg'
  ]
};

async function uploadFile(filePath, key) {
  const fileContent = fs.readFileSync(filePath);
  const contentType = 'image/jpeg';
  
  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
    Body: fileContent,
    ContentType: contentType,
    // Make public if needed
    // ACL: 'public-read', // R2 doesn't use ACLs, configure via dashboard
  });

  try {
    await r2Client.send(command);
    console.log(`✓ Uploaded: ${key}`);
    return true;
  } catch (error) {
    console.error(`✗ Failed to upload ${key}:`, error.message);
    return false;
  }
}

async function main() {
  console.log('Starting workshop photos upload to Cloudflare R2...\n');

  if (!process.env.R2_ACCOUNT_ID || !process.env.R2_ACCESS_KEY_ID || 
      !process.env.R2_SECRET_ACCESS_KEY || !process.env.R2_BUCKET_NAME) {
    console.error('Error: Missing required environment variables');
    console.error('Please set: R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME');
    process.exit(1);
  }

  let successCount = 0;
  let failCount = 0;

  for (const [category, files] of Object.entries(workshopImages)) {
    console.log(`\nUploading ${category} images...`);
    
    for (const filename of files) {
      const filePath = path.join(WORKSHOP_PHOTOS_DIR, filename);
      
      if (!fs.existsSync(filePath)) {
        console.error(`✗ File not found: ${filename}`);
        failCount++;
        continue;
      }

      // Upload with organized path: workshops/{category}/{filename}
      const key = `workshops/${category}/${filename}`;
      const success = await uploadFile(filePath, key);
      
      if (success) {
        successCount++;
        // Print the R2 public URL (adjust domain as needed)
        console.log(`   URL: https://your-r2-domain.com/${key}`);
      } else {
        failCount++;
      }
    }
  }

  console.log(`\n${'='.repeat(50)}`);
  console.log(`Upload complete: ${successCount} succeeded, ${failCount} failed`);
  console.log(`\nNext steps:`);
  console.log(`1. Configure R2 public access in Cloudflare dashboard`);
  console.log(`2. Update src/lib/workshop-data.ts with your R2 URLs`);
  console.log(`3. Replace 'your-r2-domain.com' with your actual R2 public URL`);
}

main().catch(console.error);
