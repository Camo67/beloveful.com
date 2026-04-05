var cloudinary = require('cloudinary');

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: 'dvwdoezk1',
  api_key: '677574118368433',
  api_secret: 'e82ozhF6xSU28rT-PI1oa-qsLZs',
  secure: true
});

const image = './CHI-Beloveful6_n0hlne.jpg';

(async function run() {
  try {
    console.log(`🔄 Uploading image: ${image}...`);
    
    const result = await cloudinary.v2.uploader.upload(image, {
      public_id: 'test-upload-' + Date.now(),
      overwrite: true,
      resource_type: 'image'
    });
    
    console.log('✅ Upload successful!');
    console.log({
      public_id: result.public_id,
      secure_url: result.secure_url,
      width: result.width,
      height: result.height,
      format: result.format,
      bytes: result.bytes,
      created_at: result.created_at
    });
    
  } catch (error) {
    console.error('❌ Upload failed:');
    console.error(error.message || error);
  }
})();