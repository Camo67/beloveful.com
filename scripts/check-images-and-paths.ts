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

/**
 * Check if a file exists on the server
 */
async function checkFileExistsOnServer(imagePath: string): Promise<boolean> {
  if (!imagePath) return false;
  
  // Convert web path to server path based on the project configuration
  const serverPath = path.join('/home2/belovefu/public_html/beloveful.com/public_html', imagePath);
  
  try {
    await fs.access(serverPath);
    return true;
  } catch {
    return false;
  }
}

/**
 * Check if a URL is accessible
 */
async function isUrlAccessible(url: string): Promise<boolean> {
  if (!url) return false;
  
  // Skip if it's a relative path (we'll check server path instead)
  if (url.startsWith('/')) {
    return checkFileExistsOnServer(url);
  }
  
  try {
    const response = await fetch(url, { 
      method: 'HEAD',
      signal: AbortSignal.timeout(5000) // 5 second timeout
    });
    return response.ok;
  } catch {
    return false;
  }
}

/**
 * Verify image paths against server structure and check accessibility
 */
async function verifyImagesAndPaths() {
  console.log('🔍 Verifying image paths and accessibility...\n');

  try {
    // Read the local-albums.json
    const albumsDataPath = path.join(__dirname, '..', 'src', 'lib', 'local-albums.json');
    const albumsData = await fs.readFile(albumsDataPath, 'utf8');
    const albums: Album[] = JSON.parse(albumsData);

    console.log(`📋 Found ${albums.length} albums to verify\n`);

    let totalImages = 0;
    let accessibleImages = 0;
    let inaccessibleImages = 0;
    let missingPaths = 0;
    
    const problematicAlbums: {
      region: string;
      country: string;
      slug: string;
      errors: { desktop: string; mobile: string; desktopPath: string; mobilePath: string }[];
    }[] = [];

    for (const album of albums) {
      const albumErrors = {
        region: album.region,
        country: album.country,
        slug: album.slug,
        errors: [] as { desktop: string; mobile: string; desktopPath: string; mobilePath: string }[]
      };

      for (const img of album.images) {
        totalImages++;

        const desktopAccessible = await isUrlAccessible(img.desktop);
        const mobileAccessible = await isUrlAccessible(img.mobile);

        if (!desktopAccessible) {
          inaccessibleImages++;
          
          // Check if it's a path issue specifically
          if (img.desktop.startsWith('/')) {
            const existsOnServer = await checkFileExistsOnServer(img.desktop);
            if (!existsOnServer) {
              missingPaths++;
              albumErrors.errors.push({
                desktop: 'MISSING_PATH',
                mobile: mobileAccessible ? 'OK' : 'INACCESSIBLE',
                desktopPath: img.desktop,
                mobilePath: img.mobile
              });
            } else {
              // Exists on server but still inaccessible - might be a permissions issue
              albumErrors.errors.push({
                desktop: 'SERVER_ACCESS_ERROR',
                mobile: mobileAccessible ? 'OK' : 'INACCESSIBLE',
                desktopPath: img.desktop,
                mobilePath: img.mobile
              });
            }
          } else {
            // Remote URL is inaccessible
            albumErrors.errors.push({
              desktop: 'REMOTE_URL_ERROR',
              mobile: mobileAccessible ? 'OK' : 'INACCESSIBLE',
              desktopPath: img.desktop,
              mobilePath: img.mobile
            });
          }
        } else {
          accessibleImages++;
        }

        if (!mobileAccessible && img.mobile !== img.desktop) {
          inaccessibleImages++;
          
          if (img.mobile.startsWith('/')) {
            const existsOnServer = await checkFileExistsOnServer(img.mobile);
            if (!existsOnServer) {
              missingPaths++;
              // Add to errors if not already added due to desktop issue
              if (desktopAccessible) {
                albumErrors.errors.push({
                  desktop: 'OK',
                  mobile: 'MISSING_PATH',
                  desktopPath: img.desktop,
                  mobilePath: img.mobile
                });
              }
            } else {
              if (desktopAccessible) {
                albumErrors.errors.push({
                  desktop: 'OK',
                  mobile: 'SERVER_ACCESS_ERROR',
                  desktopPath: img.desktop,
                  mobilePath: img.mobile
                });
              }
            }
          } else {
            if (desktopAccessible) {
              albumErrors.errors.push({
                desktop: 'OK',
                mobile: 'REMOTE_URL_ERROR',
                desktopPath: img.desktop,
                mobilePath: img.mobile
              });
            }
          }
        } else if (mobileAccessible && !desktopAccessible) {
          accessibleImages++; // Count this as accessible since mobile is accessible
        }
      }

      if (albumErrors.errors.length > 0) {
        problematicAlbums.push(albumErrors);
      }
    }

    // Print summary
    console.log('📈 Verification Summary:');
    console.log(`   Total images checked: ${totalImages}`);
    console.log(`   Accessible images: ${accessibleImages}`);
    console.log(`   Inaccessible images: ${inaccessibleImages}`);
    console.log(`   Missing paths: ${missingPaths}`);
    console.log(`   Problematic albums: ${problematicAlbums.length}`);
    console.log('');

    // Print problematic albums
    if (problematicAlbums.length > 0) {
      console.log('🚨 Problematic Albums:');
      for (const album of problematicAlbums) {
        console.log(`   📁 ${album.country} (${album.region}) - ${album.errors.length} issue(s)`);
        
        // Show first few issues for this album
        for (let i = 0; i < Math.min(3, album.errors.length); i++) {
          const err = album.errors[i];
          console.log(`      Desktop: ${err.desktop} - ${err.desktopPath}`);
          console.log(`      Mobile: ${err.mobile} - ${err.mobilePath}`);
        }
        
        if (album.errors.length > 3) {
          console.log(`      ... and ${album.errors.length - 3} more issues`);
        }
        console.log('');
      }
    } else {
      console.log('✅ All albums have accessible images!');
    }

    // Check for common path structure issues
    await checkCommonPathIssues(albums);

  } catch (error) {
    console.error('❌ Error verifying images and paths:', error);
  }
}

/**
 * Check for common path structure issues
 */
async function checkCommonPathIssues(albums: Album[]) {
  console.log('🔍 Checking for common path structure issues...\n');
  
  const issues: { album: string; issue: string; path: string }[] = [];
  
  for (const album of albums) {
    for (const img of album.images) {
      // Check for old path format
      if (img.desktop.includes('/Website beloveful.com/')) {
        issues.push({
          album: `${album.country} (${album.region})`,
          issue: 'Uses old path format',
          path: img.desktop
        });
      }
      
      if (img.mobile.includes('/Website beloveful.com/')) {
        issues.push({
          album: `${album.country} (${album.region})`,
          issue: 'Uses old path format',
          path: img.mobile
        });
      }
      
      // Check for mixed casing
      if (img.desktop.includes('/images/Asia/India/') || img.desktop.includes('/images/Europe/')) {
        issues.push({
          album: `${album.country} (${album.region})`,
          issue: 'Incorrect case in path',
          path: img.desktop
        });
      }
      
      if (img.mobile.includes('/images/Asia/India/') || img.mobile.includes('/images/Europe/')) {
        issues.push({
          album: `${album.country} (${album.region})`,
          issue: 'Incorrect case in path',
          path: img.mobile
        });
      }
    }
  }
  
  if (issues.length > 0) {
    console.log(`⚠️  Found ${issues.length} path structure issues:`);
    for (const issue of issues) {
      console.log(`   📁 ${issue.album}: ${issue.issue} - ${issue.path}`);
    }
  } else {
    console.log('✅ No common path structure issues found');
  }
  
  console.log('');
}

/**
 * Check specific album by name
 */
async function checkSpecificAlbum(albumSlug: string) {
  console.log(`🔍 Checking specific album: ${albumSlug}\n`);
  
  try {
    const albumsDataPath = path.join(__dirname, '..', 'src', 'lib', 'local-albums.json');
    const albumsData = await fs.readFile(albumsDataPath, 'utf8');
    const albums: Album[] = JSON.parse(albumsData);
    
    const album = albums.find(a => a.slug === albumSlug);
    
    if (!album) {
      console.log(`❌ Album with slug "${albumSlug}" not found`);
      return;
    }
    
    console.log(`📁 Album: ${album.country} (${album.region})`);
    console.log(`   Images: ${album.images.length}\n`);
    
    let accessibleCount = 0;
    
    for (let i = 0; i < Math.min(10, album.images.length); i++) {
      const img = album.images[i];
      
      const desktopAccessible = await isUrlAccessible(img.desktop);
      const mobileAccessible = await isUrlAccessible(img.mobile);
      
      const status = desktopAccessible || mobileAccessible ? '✅' : '❌';
      console.log(`${status} ${i+1}. Desktop: ${desktopAccessible ? 'OK' : 'FAIL'} | Mobile: ${mobileAccessible ? 'OK' : 'FAIL'}`);
      console.log(`      Desktop: ${img.desktop.substring(0, 80)}${img.desktop.length > 80 ? '...' : ''}`);
      console.log(`      Mobile: ${img.mobile.substring(0, 80)}${img.mobile.length > 80 ? '...' : ''}`);
      console.log('');
      
      if (desktopAccessible || mobileAccessible) accessibleCount++;
    }
    
    if (album.images.length > 10) {
      console.log(`... and ${album.images.length - 10} more images`);
    }
    
    console.log(`\n📊 Accessibility: ${accessibleCount}/${Math.min(10, album.images.length)} of first 10 images accessible`);
    
  } catch (error) {
    console.error(`❌ Error checking album ${albumSlug}:`, error);
  }
}

// Run verification based on command line arguments
const args = process.argv.slice(2);

if (args.includes('--album') || args.includes('-a')) {
  const albumIndex = args.findIndex(arg => arg === '--album' || arg === '-a');
  if (albumIndex !== -1 && args[albumIndex + 1]) {
    checkSpecificAlbum(args[albumIndex + 1]);
  } else {
    console.log('Please specify an album slug: --album <slug>');
  }
} else {
  verifyImagesAndPaths();
}