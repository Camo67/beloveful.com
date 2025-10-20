#!/usr/bin/env node

import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3';
import fs from 'fs';

const CLOUDINARY_CLOUD_NAME = process.env.VITE_CLOUDINARY_CLOUD_NAME || 'YOUR_CLOUD_NAME';
const R2_PUBLIC_URL = process.env.R2_PUBLIC_URL || 'https://pub-YOUR_ID.r2.dev';

// R2 configuration
const r2Client = new S3Client({
  region: 'auto',
  endpoint: process.env.R2_ENDPOINT || 'https://YOUR_ACCOUNT_ID.r2.cloudflarestorage.com',
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
  },
});

const BUCKET_NAME = 'beloveful';

async function listR2Objects() {
  const objects = [];
  let continuationToken;

  do {
    const command = new ListObjectsV2Command({
      Bucket: BUCKET_NAME,
      ContinuationToken: continuationToken,
    });

    const response = await r2Client.send(command);
    
    if (response.Contents) {
      objects.push(...response.Contents);
    }

    continuationToken = response.NextContinuationToken;
  } while (continuationToken);

  return objects;
}

function generateCloudinaryFetchUrl(r2Key) {
  // R2 public URL for the image
  const r2Url = `${R2_PUBLIC_URL}/${r2Key}`;
  
  // Cloudinary fetch URL
  const cloudinaryFetchUrl = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/fetch/${r2Url}`;
  
  // With transformations (optional - examples)
  const thumbnailUrl = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/fetch/w_400,h_300,c_fill/${r2Url}`;
  const optimizedUrl = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/fetch/f_auto,q_auto/${r2Url}`;
  
  return {
    r2Url,
    cloudinaryFetchUrl,
    thumbnailUrl,
    optimizedUrl,
  };
}

async function main() {
  console.log('🔍 Fetching R2 objects...\n');
  
  const objects = await listR2Objects();
  console.log(`✅ Found ${objects.length} objects in R2\n`);

  const fetchUrls = objects.map(obj => ({
    key: obj.Key,
    size: obj.Size,
    lastModified: obj.LastModified,
    ...generateCloudinaryFetchUrl(obj.Key),
  }));

  // Save to JSON file
  fs.writeFileSync(
    'cloudinary-fetch-urls.json',
    JSON.stringify(fetchUrls, null, 2)
  );

  console.log('📄 Generated URLs saved to: cloudinary-fetch-urls.json');
  console.log('\n📝 Example URLs:\n');
  
  if (fetchUrls.length > 0) {
    const example = fetchUrls[0];
    console.log(`Original R2:     ${example.r2Url}`);
    console.log(`Cloudinary Fetch: ${example.cloudinaryFetchUrl}`);
    console.log(`With Transform:   ${example.optimizedUrl}`);
  }

  // Group by country prefix
  const byCountry = {};
  fetchUrls.forEach(item => {
    const match = item.key.match(/^([A-Z]{3})-/);
    const country = match ? match[1] : 'OTHER';
    if (!byCountry[country]) byCountry[country] = [];
    byCountry[country].push(item);
  });

  console.log('\n📊 Breakdown by country:');
  Object.entries(byCountry)
    .sort(([a], [b]) => b.localeCompare(a))
    .forEach(([country, items]) => {
      console.log(`  ${country}: ${items.length} images`);
    });
}

main().catch(console.error);
