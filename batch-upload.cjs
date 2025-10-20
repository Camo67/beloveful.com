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
  './belovefullogowhite_ho0tiz.jpg',
  './Beloveful_white_transparent_audwbh.png',
];

(async function run() {
  console.log('🔄 Starting batch upload of', images.length, 'images...\n');
  
  const results = [];
  
  for (let i = 0; i < images.length; i++) {
    const image = images[i];
    try {
      console.log(`📤 Uploading ${i + 1}/${images.length}: ${image}`);
      
      const result = await cloudinary.v2.uploader.upload(image, {
        public_id: `batch-upload-${Date.now()}-${i}`,
        overwrite: true,
        resource_type: 'image'
      });
      
      console.log(`✅ Success: ${result.secure_url}`);
      results.push({
        file: image,
        url: result.secure_url,
        public_id: result.public_id,
        width: result.width,
        height: result.height,
        bytes: result.bytes
      });
      
    } catch (error) {
      console.error(`❌ Failed to upload ${image}:`, error.message);
      results.push({
        file: image,
        error: error.message
      });
    }
    
    console.log(''); // Empty line for readability
  }
  
  // Summary
  console.log('📊 Upload Summary:');
  console.log('================');
  const successful = results.filter(r => r.url);
  const failed = results.filter(r => r.error);
  
  console.log(`✅ Successful uploads: ${successful.length}`);
  console.log(`❌ Failed uploads: ${failed.length}`);
  
  if (successful.length > 0) {
    console.log('\n🔗 URLs:');
    successful.forEach((result, index) => {
      console.log(`${index + 1}. ${result.url}`);
    });
  }
  
  if (failed.length > 0) {
    console.log('\n❌ Failed files:');
    failed.forEach(result => {
      console.log(`- ${result.file}: ${result.error}`);
    });
  }
})();