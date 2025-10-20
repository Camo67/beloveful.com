import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'dvwdoezk1',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

async function getAllResources() {
  let allResources = [];
  let nextCursor = null;
  
  console.log('Fetching resources from Cloudinary...\n');
  
  do {
    try {
      const result = await cloudinary.api.resources({
        type: 'upload',
        max_results: 500,
        next_cursor: nextCursor
      });
      
      allResources = allResources.concat(result.resources);
      nextCursor = result.next_cursor;
      
      console.log(`Fetched ${result.resources.length} resources (Total: ${allResources.length})`);
    } catch (error) {
      console.error('Error fetching resources:', error.message);
      break;
    }
  } while (nextCursor);
  
  console.log(`\n✅ Total resources fetched: ${allResources.length}`);
  
  // Save to file
  const output = {
    total: allResources.length,
    fetched_at: new Date().toISOString(),
    resources: allResources.map(r => ({
      public_id: r.public_id,
      format: r.format,
      url: r.secure_url,
      width: r.width,
      height: r.height,
      bytes: r.bytes,
      created_at: r.created_at
    }))
  };
  
  fs.writeFileSync('cloudinary-resources.json', JSON.stringify(output, null, 2));
  console.log('\n📝 Saved to cloudinary-resources.json');
  
  // Group by folder
  const byFolder = {};
  allResources.forEach(r => {
    const folder = r.public_id.split('/').slice(0, -1).join('/') || 'root';
    if (!byFolder[folder]) byFolder[folder] = [];
    byFolder[folder].push(r.public_id);
  });
  
  console.log('\n📁 Folders:');
  Object.keys(byFolder).sort().forEach(folder => {
    console.log(`  ${folder}: ${byFolder[folder].length} files`);
  });
}

getAllResources();
