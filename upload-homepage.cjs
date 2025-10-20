var cloudinary = require('cloudinary');
var fs = require('fs');
var path = require('path');

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: 'dvwdoezk1',
  api_key: '677574118368433',
  api_secret: 'e82ozhF6xSU28rT-PI1oa-qsLZs',
  secure: true
});

// Function to get all image files recursively
function getImageFiles(dir) {
  const files = [];
  
  function scanDir(currentDir) {
    const items = fs.readdirSync(currentDir);
    
    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        scanDir(fullPath);
      } else if (/\.(jpg|jpeg|png)$/i.test(item)) {
        files.push(fullPath);
      }
    }
  }
  
  scanDir(dir);
  return files;
}

(async function uploadHomepage() {
  const homepageDir = '/home/camo/new/beloveful.com/public/Website beloveful.com/Homepage';
  
  console.log('🔍 Scanning Homepage directory for images...\n');
  
  const imageFiles = getImageFiles(homepageDir);
  console.log(`📸 Found ${imageFiles.length} images to upload\n`);
  
  const results = {
    desktop: [],
    mobile: [],
    failed: []
  };
  
  for (let i = 0; i < imageFiles.length; i++) {
    const imagePath = imageFiles[i];
    const relativePath = path.relative(homepageDir, imagePath);
    const filename = path.basename(imagePath, path.extname(imagePath));
    
    // Determine if it's desktop or mobile based on folder
    const isDesktop = relativePath.includes('Desktop Landscape');
    const isMobile = relativePath.includes('Mobile Portrait');
    
    try {
      console.log(`📤 Uploading ${i + 1}/${imageFiles.length}: ${filename}`);
      console.log(`   Source: ${relativePath}`);
      
      // Create organized public_id
      let publicId;
      if (isDesktop) {
        publicId = `beloveful-website/Homepage/Desktop/${filename}`;
      } else if (isMobile) {
        publicId = `beloveful-website/Homepage/Mobile/${filename}`;
      } else {
        publicId = `beloveful-website/Homepage/${filename}`;
      }
      
      const result = await cloudinary.v2.uploader.upload(imagePath, {
        public_id: publicId,
        overwrite: true,
        resource_type: 'image',
        quality: 'auto',
        format: 'auto'
      });
      
      const uploadResult = {
        filename: filename,
        source_path: relativePath,
        public_id: result.public_id || publicId,
        status: result.status || 'uploaded',
        batch_id: result.batch_id
      };
      
      if (result.secure_url) {
        uploadResult.url = result.secure_url;
        console.log(`✅ Success: ${result.secure_url}`);
      } else if (result.status === 'pending') {
        uploadResult.url = `https://res.cloudinary.com/dvwdoezk1/image/upload/${publicId}`;
        console.log(`⏳ Queued: ${uploadResult.url}`);
      }
      
      // Categorize result
      if (isDesktop) {
        results.desktop.push(uploadResult);
      } else if (isMobile) {
        results.mobile.push(uploadResult);
      } else {
        results.desktop.push(uploadResult); // Default to desktop
      }
      
    } catch (error) {
      console.error(`❌ Failed: ${filename} → ${error.message}`);
      results.failed.push({
        filename: filename,
        source_path: relativePath,
        error: error.message
      });
    }
    
    console.log('');
  }
  
  // Summary
  console.log('📊 Upload Summary:');
  console.log('==================');
  console.log(`✅ Desktop images: ${results.desktop.length}`);
  console.log(`📱 Mobile images: ${results.mobile.length}`);
  console.log(`❌ Failed uploads: ${results.failed.length}`);
  
  if (results.desktop.length > 0) {
    console.log('\n🖥️ Desktop Images:');
    results.desktop.forEach((img, i) => {
      console.log(`  ${i + 1}. ${img.filename}`);
      console.log(`     URL: ${img.url}`);
    });
  }
  
  if (results.mobile.length > 0) {
    console.log('\n📱 Mobile Images:');
    results.mobile.forEach((img, i) => {
      console.log(`  ${i + 1}. ${img.filename}`);
      console.log(`     URL: ${img.url}`);
    });
  }
  
  if (results.failed.length > 0) {
    console.log('\n❌ Failed Uploads:');
    results.failed.forEach(fail => {
      console.log(`  • ${fail.filename}: ${fail.error}`);
    });
  }
  
  // Save results to JSON
  fs.writeFileSync('homepage-upload-results.json', JSON.stringify(results, null, 2));
  console.log('\n💾 Results saved to homepage-upload-results.json');
  
  console.log('\n🎉 Homepage upload complete!');
})();