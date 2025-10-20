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
];

(async function run() {
  console.log('🔄 Starting batch upload of', images.length, 'images...\n');
  
  for (let i = 0; i < images.length; i++) {
    const image = images[i];
    try {
      console.log(`📤 Uploading ${i + 1}/${images.length}: ${image}`);
      
      const result = await cloudinary.v2.uploader.upload(image, {
        public_id: `test-batch-${i}`,
        overwrite: true,
        resource_type: 'image'
      });
      
      // Log full result to see what we get
      console.log('📋 Full result:', JSON.stringify(result, null, 2));
      
      // Extract just the URL
      if (result.secure_url) {
        console.log(`✅ URL: ${result.secure_url}`);
      } else if (result.url) {
        console.log(`✅ URL: ${result.url}`);
      } else {
        console.log('⚠️ No URL found in result');
      }
      
    } catch (error) {
      console.error(`❌ Failed to upload ${image}:`, error.message);
      console.error('Full error:', error);
    }
    
    console.log(''); // Empty line
  }
})();