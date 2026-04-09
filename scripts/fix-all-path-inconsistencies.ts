import fs from 'fs/promises';
import path from 'path';

interface ImagePath {
  desktop: string;
  mobile: string;
}

interface Album {
  region: string;
  country: string;
  slug: string;
  title: string;
  images: ImagePath[];
}

// Define the mapping from old base paths to new base paths
const basePathCorrections: { [key: string]: string } = {
  '/Website beloveful.com/': '/images/',
  // Add other corrections as needed
};

async function fixAllPathInconsistencies() {
  console.log('🔧 Starting path inconsistency fix...\n');

  try {
    // Read the local-albums.json file
    const albumsData = await fs.readFile('src/lib/local-albums.json', 'utf8');
    let albums: Album[] = JSON.parse(albumsData);

    console.log(`📋 Loaded ${albums.length} albums from local-albums.json\n`);

    let totalChanges = 0;
    const fixedAlbums: string[] = [];

    // Process each album
    for (const album of albums) {
      let albumChanges = 0;

      for (const img of album.images) {
        const originalDesktop = img.desktop;
        const originalMobile = img.mobile;

        // Apply base path corrections to desktop
        for (const [oldPath, newPath] of Object.entries(basePathCorrections)) {
          if (img.desktop.includes(oldPath)) {
            img.desktop = img.desktop.replace(oldPath, newPath);
            albumChanges++;
          }
          if (img.mobile.includes(oldPath)) {
            img.mobile = img.mobile.replace(oldPath, newPath);
            albumChanges++;
          }
        }
      }

      if (albumChanges > 0) {
        totalChanges += albumChanges;
        fixedAlbums.push(`${album.country} (${albumChanges} changes)`);
        console.log(`✅ Fixed ${albumChanges} paths in ${album.country}`);
      }
    }

    if (totalChanges > 0) {
      // Write the updated data back to the file
      await fs.writeFile('src/lib/local-albums.json', JSON.stringify(albums, null, 2), 'utf8');
      
      console.log(`\n💾 Successfully updated local-albums.json`);
      console.log(`📋 Albums updated: ${fixedAlbums.join(', ')}`);
      console.log(`📊 Total path corrections: ${totalChanges}\n`);
      
      console.log('💡 Remember to verify the server directory structure matches these paths!');
      console.log('   For example, ensure directories are lowercase: "india" not "India"');
    } else {
      console.log('✅ No path inconsistencies found - all paths are already correct!\n');
    }

    // Summary report
    console.log('📋 Summary:');
    console.log(`   Total albums processed: ${albums.length}`);
    console.log(`   Albums with fixes: ${fixedAlbums.length}`);
    console.log(`   Total paths corrected: ${totalChanges}`);
    
  } catch (error) {
    console.error('❌ Error fixing path inconsistencies:', error);
    throw error;
  }
}

// Helper function to preview changes without applying them
async function previewPathChanges() {
  console.log('🔍 Previewing path changes without applying...\n');

  try {
    const albumsData = await fs.readFile('src/lib/local-albums.json', 'utf8');
    const albums: Album[] = JSON.parse(albumsData);

    let totalChanges = 0;

    for (const album of albums) {
      let albumChanges = 0;
      const sampleChanges: { from: string; to: string }[] = [];

      for (const img of album.images) {
        let currentDesktop = img.desktop;
        let currentMobile = img.mobile;
        let originalDesktop = img.desktop;
        let originalMobile = img.mobile;

        // Apply base path corrections to desktop
        for (const [oldPath, newPath] of Object.entries(basePathCorrections)) {
          if (currentDesktop.includes(oldPath)) {
            currentDesktop = currentDesktop.replace(oldPath, newPath);
            albumChanges++;
            if (sampleChanges.length < 2) { // Limit samples
              sampleChanges.push({ from: originalDesktop, to: currentDesktop });
            }
          }
          if (currentMobile.includes(oldPath)) {
            currentMobile = currentMobile.replace(oldPath, newPath);
            albumChanges++;
            if (sampleChanges.length < 2) { // Limit samples
              sampleChanges.push({ from: originalMobile, to: currentMobile });
            }
          }
        }
      }

      if (albumChanges > 0) {
        totalChanges += albumChanges;
        console.log(`📋 ${album.country} (${album.region}): ${albumChanges} paths would be updated`);
        sampleChanges.forEach(change => {
          console.log(`   "${change.from}" → "${change.to}"`);
        });
        if (sampleChanges.length > 0) console.log(''); // Extra line for readability
      }
    }

    console.log(`\n📊 Total paths that would be changed: ${totalChanges}\n`);
    
  } catch (error) {
    console.error('❌ Error previewing path changes:', error);
    throw error;
  }
}

// Run the script based on command line argument
const action = process.argv[2]; // Accept 'preview' or 'apply' as arguments

if (action === 'preview') {
  previewPathChanges()
    .catch(error => {
      console.error('Preview failed:', error);
    });
} else {
  fixAllPathInconsistencies()
    .catch(error => {
      console.error('Fix script failed:', error);
    });
}