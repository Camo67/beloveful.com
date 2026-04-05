#!/usr/bin/env node

// Try to fetch images using public/unsigned methods
async function fetchPublicImages() {
  console.log('🔍 Trying to fetch images using public methods...\n');
  
  // Method 1: Try the search API (if enabled)
  try {
    const searchUrl = 'https://res.cloudinary.com/dvwdoezk1/image/list/sample.json';
    
    console.log('📡 Trying search API...');
    const response = await fetch(searchUrl);
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Search API response:', data);
      return data;
    } else {
      console.log(`❌ Search API failed: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    console.log('❌ Search API error:', error.message);
  }
  
  // Method 2: Try common image URLs to see what exists
  console.log('\n📸 Testing common image patterns...');
  
  const commonPatterns = [
    'sample',
    'beloveful-website/Homepage/Desktop/JOR-4604',
    'beloveful-website/Homepage/Mobile/JOR-4604',
    'v1234567890/sample.jpg'
  ];
  
  for (const pattern of commonPatterns) {
    try {
      const imageUrl = `https://res.cloudinary.com/dvwdoezk1/image/upload/${pattern}.jpg`;
      console.log(`🔗 Testing: ${imageUrl}`);
      
      const response = await fetch(imageUrl, { method: 'HEAD' });
      if (response.ok) {
        console.log(`✅ Found image: ${pattern}`);
        console.log(`   Size: ${response.headers.get('content-length')} bytes`);
        console.log(`   Type: ${response.headers.get('content-type')}`);
      } else {
        console.log(`❌ Not found: ${pattern} (${response.status})`);
      }
    } catch (error) {
      console.log(`❌ Error testing ${pattern}:`, error.message);
    }
  }
  
  console.log('\n💡 To access your images, you need to either:');
  console.log('   1. Whitelist your IP address in Cloudinary Security settings');
  console.log('   2. Use a different API key without IP restrictions');
  console.log('   3. Access images directly if you know their public_ids');
}

fetchPublicImages().catch(console.error);