var cloudinary = require('cloudinary');

// Configure Cloudinary with your credentials
cloudinary.v2.config({
  cloud_name: 'dvwdoezk1',
  api_key: '677574118368433',
  api_secret: 'e82ozhF6xSU28rT-PI1oa-qsLZs',
  secure: true
});

console.log('Testing Cloudinary sample resource...\n');

cloudinary.v2.api
  .resource('sample')
  .then(result => {
    console.log('✅ Success! Sample resource found:');
    console.log(JSON.stringify(result, null, 2));
  })
  .catch(error => {
    console.error('❌ Error fetching sample resource:');
    console.error(error.message || error);
    
    // If sample doesn't exist, try to get any resource
    console.log('\n🔍 Trying to get first available resource...');
    return cloudinary.v2.api.resources({
      type: 'upload',
      max_results: 1
    });
  })
  .then(result => {
    if (result && result.resources && result.resources.length > 0) {
      console.log('✅ Found first available resource:');
      const resource = result.resources[0];
      console.log(`Public ID: ${resource.public_id}`);
      console.log(`URL: ${resource.secure_url}`);
      console.log(`Size: ${resource.width}x${resource.height}`);
      console.log(`Format: ${resource.format}`);
    }
  })
  .catch(error => {
    console.error('❌ Final error:', error.message || error);
  });