const fs = require('fs');
const https = require('https');
const http = require('http');
const { URL } = require('url');

// Cloudinary config - make sure you have these env vars
const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME || 'dvwdoezk1';
const API_KEY = process.env.CLOUDINARY_API_KEY;
const API_SECRET = process.env.CLOUDINARY_API_SECRET;

if (!API_KEY || !API_SECRET) {
  console.error('❌ Please set CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET environment variables');
  process.exit(1);
}

// Read upload queue
const uploadQueue = JSON.parse(fs.readFileSync('cloudinary-upload-queue.json', 'utf8'));

console.log(`🚀 Starting upload of ${uploadQueue.length} images to Cloudinary...`);
console.log('⏰ This will take some time - please be patient!\n');

let completed = 0;
let failed = 0;
const results = [];

// Upload function using Cloudinary Upload API
async function uploadImageFromUrl(item) {
  return new Promise((resolve) => {
    const { r2Url, filename, countryCode, albumKey } = item;
    
    // Create public_id for organization
    const publicId = `beloveful-website/portfolio/${countryCode}/${filename.replace(/\.[^/.]+$/, '')}`;
    
    // Prepare form data for Cloudinary upload
    const timestamp = Math.round(Date.now() / 1000);
    const crypto = require('crypto');
    
    // Create signature
    const signatureString = `file=${r2Url}&public_id=${publicId}&timestamp=${timestamp}${API_SECRET}`;
    const signature = crypto.createHash('sha1').update(signatureString).digest('hex');
    
    const formData = {
      file: r2Url,
      public_id: publicId,
      api_key: API_KEY,
      timestamp: timestamp,
      signature: signature,
      folder: 'beloveful-website/portfolio',
      quality: 'auto',
      format: 'auto'
    };
    
    // Convert form data to POST body
    const boundary = '----formdata-boundary-' + Math.random().toString(36);
    let postData = '';
    
    for (const [key, value] of Object.entries(formData)) {
      postData += `--${boundary}\r\n`;
      postData += `Content-Disposition: form-data; name="${key}"\r\n\r\n`;
      postData += `${value}\r\n`;
    }
    postData += `--${boundary}--\r\n`;
    
    const options = {
      hostname: 'api.cloudinary.com',
      port: 443,
      path: `/v1_1/${CLOUD_NAME}/image/upload`,
      method: 'POST',
      headers: {
        'Content-Type': `multipart/form-data; boundary=${boundary}`,
        'Content-Length': Buffer.byteLength(postData)
      }
    };
    
    const req = https.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          if (result.secure_url) {
            completed++;
            console.log(`✅ ${completed}/${uploadQueue.length} - ${filename} → ${result.secure_url}`);
            results.push({
              ...item,
              cloudinaryUrl: result.secure_url,
              publicId: publicId,
              success: true
            });
          } else {
            failed++;
            console.log(`❌ ${failed} failed - ${filename}: ${result.error?.message || 'Unknown error'}`);
            results.push({
              ...item,
              error: result.error?.message || 'Unknown error',
              success: false
            });
          }
        } catch (e) {
          failed++;
          console.log(`❌ ${failed} failed - ${filename}: Parse error`);
          results.push({
            ...item,
            error: 'Parse error',
            success: false
          });
        }
        resolve();
      });
    });
    
    req.on('error', (e) => {
      failed++;
      console.log(`❌ ${failed} failed - ${filename}: ${e.message}`);
      results.push({
        ...item,
        error: e.message,
        success: false
      });
      resolve();
    });
    
    req.write(postData);
    req.end();
  });
}

// Process uploads in batches to avoid overwhelming Cloudinary
async function processBatch(batch, batchNum) {
  console.log(`\n📦 Processing batch ${batchNum} (${batch.length} images)...`);
  
  const promises = batch.map(item => uploadImageFromUrl(item));
  await Promise.all(promises);
  
  console.log(`✅ Batch ${batchNum} completed - ${completed} success, ${failed} failed`);
  
  // Save progress after each batch
  fs.writeFileSync('cloudinary-upload-results.json', JSON.stringify({
    completed,
    failed,
    total: uploadQueue.length,
    results: results
  }, null, 2));
}

// Main upload process
async function uploadAll() {
  const BATCH_SIZE = 10; // Upload 10 images at a time
  const batches = [];
  
  for (let i = 0; i < uploadQueue.length; i += BATCH_SIZE) {
    batches.push(uploadQueue.slice(i, i + BATCH_SIZE));
  }
  
  console.log(`📊 Processing ${batches.length} batches of ${BATCH_SIZE} images each\n`);
  
  for (let i = 0; i < batches.length; i++) {
    await processBatch(batches[i], i + 1);
    
    // Small delay between batches
    if (i < batches.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
  
  console.log('\n🎉 Upload process completed!');
  console.log(`📈 Final stats: ${completed} successful, ${failed} failed`);
  console.log('📁 Results saved to: cloudinary-upload-results.json');
  
  if (completed > 0) {
    console.log('\n🔄 Next: Update portfolio with Cloudinary URLs');
    console.log('Run: node update-portfolio-with-cloudinary.cjs');
  }
}

// Start the upload process
uploadAll().catch(console.error);