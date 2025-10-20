var cloudinary = require('cloudinary');

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: 'dvwdoezk1',
  api_key: '677574118368433',
  api_secret: 'e82ozhF6xSU28rT-PI1oa-qsLZs',
  secure: true
});

const images = [
  './CHI-Beloveful6_n0hlne.jpg',
  './Beloveful_black_transparent_hscezu.png',
  './beloveful_logo_inverted_75__opacity_t8dpdk.jpg',
];

// Wait function
function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

(async function run() {
  console.log('🔄 Starting batch upload of', images.length, 'images...\n');
  
  const uploadedIds = [];
  
  // Step 1: Upload all images
  for (let i = 0; i < images.length; i++) {
    const image = images[i];
    try {
      console.log(`📤 Uploading ${i + 1}/${images.length}: ${image}`);
      
      const result = await cloudinary.v2.uploader.upload(image, {
        public_id: `final-batch-${Date.now()}-${i}`,
        overwrite: true,
        resource_type: 'image',
        eager: [{ width: 1000, height: 1000, crop: 'limit' }] // Force immediate processing
      });
      
      console.log(`📋 Upload status: ${result.status}`);
      
      if (result.status === 'pending') {
        console.log(`⏳ Upload queued with batch_id: ${result.batch_id}`);
        uploadedIds.push(result.public_id);
      } else {
        console.log(`✅ Direct URL: ${result.secure_url || result.url}`);
      }
      
    } catch (error) {
      console.error(`❌ Failed to upload ${image}:`, error.message);
    }
    
    console.log('');
  }
  
  // Step 2: Check status of pending uploads
  if (uploadedIds.length > 0) {
    console.log('⏳ Checking status of pending uploads...\n');
    
    for (const publicId of uploadedIds) {
      let attempts = 0;
      const maxAttempts = 10;
      
      while (attempts < maxAttempts) {
        try {
          console.log(`🔍 Checking ${publicId} (attempt ${attempts + 1}/${maxAttempts})`);
          
          const resource = await cloudinary.v2.api.resource(publicId);
          
          if (resource.secure_url) {
            console.log(`✅ Ready: ${resource.secure_url}`);
            break;
          } else {
            console.log(`⏳ Still processing...`);
            await wait(2000); // Wait 2 seconds
          }
          
        } catch (error) {
          if (error.message && error.message.includes('not found')) {
            console.log(`⏳ Still processing... (${error.message})`);
            await wait(2000);
          } else {
            console.error(`❌ Error checking ${publicId}:`, error.message);
            break;
          }
        }
        
        attempts++;
      }
      
      if (attempts >= maxAttempts) {
        console.log(`⚠️ Timeout waiting for ${publicId} to process`);
      }
      
      console.log('');
    }
  }
  
  console.log('🎉 Batch upload process complete!');
})();