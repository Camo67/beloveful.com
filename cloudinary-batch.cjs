var cloudinary = require('cloudinary');

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
  console.log('🚀 Batch uploading', images.length, 'images...\n');
  
  for (const image of images) {
    try {
      const result = await cloudinary.v2.uploader.upload(image, {
        public_id: `batch-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        overwrite: true
      });
      
      if (result.secure_url) {
        console.log(`✅ ${image} → ${result.secure_url}`);
      } else if (result.status === 'pending') {
        console.log(`⏳ ${image} → Upload queued (processing...)`);
        // The image will be available at: 
        // https://res.cloudinary.com/dvwdoezk1/image/upload/${result.public_id}
        console.log(`   URL will be: https://res.cloudinary.com/${cloudinary.v2.config().cloud_name}/image/upload/${result.public_id}`);
      }
      
    } catch (error) {
      console.error(`❌ Failed: ${image} → ${error.message}`);
    }
  }
  
  console.log('\n🎉 Batch upload initiated!');
  console.log('📝 Note: Images with "pending" status are being processed and will be available shortly.');
})();