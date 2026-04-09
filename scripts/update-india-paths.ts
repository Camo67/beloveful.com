import fs from 'fs/promises';

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

async function updateIndiaPaths() {
  console.log('🔧 Updating India image paths to use the exact path you specified...');

  try {
    // Read the local-albums.json file
    const albumsData = await fs.readFile('src/lib/local-albums.json', 'utf8');
    const albums: Album[] = JSON.parse(albumsData);

    // Find India album specifically
    const indiaAlbumIndex = albums.findIndex(album => album.slug === 'india');
    
    if (indiaAlbumIndex !== -1) {
      console.log(`🇮🇳 Found India album with ${albums[indiaAlbumIndex].images.length} images`);
      
      // Update all India image paths to use the exact path provided
      for (const img of albums[indiaAlbumIndex].images) {
        // Replace any existing path with the user-provided path structure
        if (img.desktop.includes('/images/Asia/india/') || img.desktop.includes('/Website beloveful.com/Asia/india/')) {
          img.desktop = img.desktop.replace(
            /(\/images\/Asia\/india\/|\/Website beloveful.com\/Asia\/india\/)/, 
            '/public_html/beloveful.com/public_html/images/Asia/India/'
          );
        }
        
        if (img.mobile.includes('/images/Asia/india/') || img.mobile.includes('/Website beloveful.com/Asia/india/')) {
          img.mobile = img.mobile.replace(
            /(\/images\/Asia\/india\/|\/Website beloveful.com\/Asia\/india\/)/, 
            '/public_html/beloveful.com/public_html/images/Asia/India/'
          );
        }
      }
      
      // Update the country name to match "India" as well
      albums[indiaAlbumIndex].country = 'India';
      albums[indiaAlbumIndex].title = 'India';
      
      console.log('✅ Updated India album paths to use the exact path you specified');
    } else {
      console.log('❌ India album not found in local-albums.json');
    }

    // Write the updated data back to the file
    await fs.writeFile('src/lib/local-albums.json', JSON.stringify(albums, null, 2), 'utf8');
    console.log('💾 Successfully updated local-albums.json with the specified path structure');
    
  } catch (error) {
    console.error('❌ Error updating India image paths:', error);
    throw error;
  }
}

updateIndiaPaths().catch(console.error);