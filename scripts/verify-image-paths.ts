import fs from 'fs/promises';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

interface ImagePath {
  desktop: string;
  mobile: string;
}

interface Album {
  region: string;
  country: string;
  slug: string;
  images: ImagePath[];
}

async function checkServerPaths() {
  console.log('🔍 Verifying image paths against server structure...\n');

  try {
    // Read the updated local-albums.json
    const albumsData = await fs.readFile('src/lib/local-albums.json', 'utf8');
    const albums: Album[] = JSON.parse(albumsData);

    // Find India album specifically
    const indiaAlbum = albums.find(album => album.slug === 'india');
    
    if (indiaAlbum) {
      console.log(`🇮🇳 Checking India album (${indiaAlbum.images.length} images):`);
      
      let indiaErrors = 0;
      let indiaSuccesses = 0;
      
      for (const img of indiaAlbum.images) {
        const desktopExists = await checkFileExistsOnServer(img.desktop);
        const mobileExists = await checkFileExistsOnServer(img.mobile);
        
        if (!desktopExists || !mobileExists) {
          console.log(`❌ FAILED: ${indiaAlbum.country}`);
          console.log(`   Desktop: ${desktopExists ? '✓' : '✗'} ${img.desktop}`);
          console.log(`   Mobile:  ${mobileExists ? '✓' : '✗'} ${img.mobile}`);
          indiaErrors++;
        } else {
          indiaSuccesses++;
        }
      }
      
      console.log(`✅ India: ${indiaSuccesses} successful, ${indiaErrors} errors\n`);
    } else {
      console.log('❌ India album not found in local-albums.json\n');
    }

    // Check all other albums for path consistency
    console.log('🌍 Checking other country albums for path inconsistencies...\n');
    
    const inconsistentAlbums: string[] = [];
    const expectedBasePath = '/images/';
    
    for (const album of albums) {
      if (album.slug === 'india') continue; // Already checked
      
      if (album.images.length > 0) {
        const firstImagePath = album.images[0].desktop || album.images[0].mobile;
        
        if (!firstImagePath.startsWith(expectedBasePath)) {
          inconsistentAlbums.push(`${album.country} (${album.region}) - Path: ${firstImagePath}`);
        }
      }
    }
    
    if (inconsistentAlbums.length > 0) {
      console.log(`⚠️  Found ${inconsistentAlbums.length} albums with potential path inconsistencies:`);
      inconsistentAlbums.forEach(album => console.log(`   • ${album}`));
      console.log('');
    } else {
      console.log('✅ All other albums use the expected \'/images/\' base path.\n');
    }
    
    // Summary
    console.log('📋 Summary:');
    console.log(`   Total albums checked: ${albums.length}`);
    console.log(`   India images verified: ${indiaAlbum?.images.length || 0}`);
    if (indiaAlbum) {
      console.log(`   India success rate: ${indiaAlbum.images.length > 0 ? Math.round(((indiaAlbum.images.length - indiaErrors) / indiaAlbum.images.length) * 100) : 0}%`);
    }
    
  } catch (error) {
    console.error('❌ Error verifying image paths:', error);
  }
}

async function checkFileExistsOnServer(imagePath: string): Promise<boolean> {
  if (!imagePath) return false;
  
  // Convert web path to server path
  // Assuming the document root is /home2/belovefu/public_html/beloveful.com/public_html/
  const serverPath = `/home2/belovefu/public_html/beloveful.com/public_html${imagePath}`;
  
  try {
    await fs.access(serverPath);
    return true;
  } catch {
    return false;
  }
}

async function debug404Issues() {
  console.log('\n🔍 Debugging common 404 error causes...\n');
  
  // Check if the main images directory exists
  const imagesDir = '/home2/belovefu/public_html/beloveful.com/public_html/images/';
  try {
    await fs.access(imagesDir);
    console.log(`✅ Images directory exists: ${imagesDir}`);
  } catch {
    console.log(`❌ Images directory missing: ${imagesDir}`);
  }
  
  // Check for case sensitivity issues
  const asiaDir = '/home2/belovefu/public_html/beloveful.com/public_html/images/Asia/';
  try {
    await fs.access(asiaDir);
    console.log(`✅ Asia directory exists: ${asiaDir}`);
    
    // List contents to check for case variations
    const dirContents = await fs.readdir(asiaDir);
    const indiaVariants = dirContents.filter(item => 
      item.toLowerCase().includes('india')
    );
    
    if (indiaVariants.length > 0) {
      console.log(`📁 Found India directory variants: ${indiaVariants.join(', ')}`);
      if (!indiaVariants.includes('india')) {
        console.log(`⚠️  Directory name case mismatch! Expected 'india', found: ${indiaVariants.join(', ')}`);
      }
    } else {
      console.log('❌ No India directory found in Asia folder');
    }
  } catch {
    console.log(`❌ Asia directory missing: ${asiaDir}`);
  }
  
  // Check if .htaccess is blocking access
  const htaccessPath = '/home2/belovefu/public_html/beloveful.com/public_html/.htaccess';
  try {
    const htaccessContent = await fs.readFile(htaccessPath, 'utf8');
    if (htaccessContent.includes('RewriteRule') && 
        (htaccessContent.toLowerCase().includes('images') || 
         htaccessContent.toLowerCase().includes('assets'))) {
      console.log('📝 Found image-related rewrite rules in .htaccess, review for conflicts');
    }
  } catch {
    console.log('ℹ️  No .htaccess file found in document root');
  }
}

// Run verification
checkServerPaths()
  .then(() => debug404Issues())
  .catch(error => {
    console.error('Script execution failed:', error);
  });