/**
 * Extract all image URLs from Cloudinary API response
 * Usage: node extract-cloudinary-urls.js response.json
 */

const fs = require('fs');

// Read response from file or stdin
const inputFile = process.argv[2];

if (!inputFile) {
  console.log('Usage: node extract-cloudinary-urls.js <response.json>');
  console.log('Or paste JSON response and press Ctrl+D');
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(inputFile, 'utf8'));

console.log('\n📸 Extracting Cloudinary Image URLs...\n');

if (data.resources) {
  console.log(`Found ${data.resources.length} images\n`);
  
  // Extract URLs in different formats
  const urls = {
    secure: [],
    original: [],
    optimized: [],
    thumbnail: []
  };
  
  data.resources.forEach((resource, index) => {
    const publicId = resource.public_id;
    const format = resource.format;
    const version = resource.version;
    
    // Secure URL (HTTPS)
    urls.secure.push(resource.secure_url);
    
    // Original URL
    urls.original.push(resource.url);
    
    // Optimized URL (auto quality, auto format)
    urls.optimized.push(
      `https://res.cloudinary.com/${resource.secure_url.split('/')[3]}/image/upload/q_auto,f_auto/${publicId}.${format}`
    );
    
    // Thumbnail URL (800px wide)
    urls.thumbnail.push(
      `https://res.cloudinary.com/${resource.secure_url.split('/')[3]}/image/upload/w_800/${publicId}.${format}`
    );
  });
  
  // Output as TypeScript/JavaScript array
  console.log('=== SECURE URLs (HTTPS) ===');
  console.log(JSON.stringify(urls.secure, null, 2));
  
  console.log('\n=== OPTIMIZED URLs (auto quality & format) ===');
  console.log(JSON.stringify(urls.optimized, null, 2));
  
  console.log('\n=== THUMBNAIL URLs (800px wide) ===');
  console.log(JSON.stringify(urls.thumbnail, null, 2));
  
  // Output as TypeScript interface
  console.log('\n=== TypeScript Interface Format ===');
  urls.secure.forEach((url, index) => {
    const filename = url.split('/').pop();
    console.log(`{`);
    console.log(`  desktop: "${url}",`);
    console.log(`  mobile: "${urls.thumbnail[index]}"`);
    console.log(`},`);
  });
  
  // Save to file
  const output = {
    count: data.resources.length,
    urls: urls,
    timestamp: new Date().toISOString()
  };
  
  fs.writeFileSync('cloudinary-urls.json', JSON.stringify(output, null, 2));
  console.log('\n✅ URLs saved to cloudinary-urls.json');
  
} else {
  console.error('❌ No resources found in response');
  console.log('Response:', JSON.stringify(data, null, 2));
}
