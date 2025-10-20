#!/usr/bin/env node
import fs from 'fs';

// Read the fetched images data
const imagesData = JSON.parse(fs.readFileSync('cloudinary-images.json', 'utf8'));

function processImagesForWebsite() {
  console.log('🔄 Processing images for website structure...\n');

  // Extract images by region/country
  const websiteStructure = {
    regions: {},
    homepage: [],
    totalImages: imagesData.total_images
  };

  // Process each folder
  Object.entries(imagesData.folders).forEach(([folder, images]) => {
    console.log(`📂 Processing: ${folder} (${images.length} images)`);

    // Skip root and samples
    if (folder === 'root' || folder === 'samples') {
      return;
    }

    // Parse folder structure
    const parts = folder.split('/');
    
    if (folder.includes('/Asia/') || folder.includes('/Africa/')) {
      // Regional images
      const regionIndex = parts.findIndex(part => part === 'Asia' || part === 'Africa');
      const region = parts[regionIndex];
      const country = parts[regionIndex + 1];

      if (!websiteStructure.regions[region]) {
        websiteStructure.regions[region] = {};
      }

      websiteStructure.regions[region][country] = {
        name: country,
        count: images.length,
        images: images.map(img => ({
          public_id: img.public_id,
          url: img.url,
          width: img.width,
          height: img.height,
          // Create responsive URLs
          desktop_url: img.url.replace('/upload/', '/upload/w_1440,h_960,c_fill,q_auto,f_auto/'),
          mobile_url: img.url.replace('/upload/', '/upload/w_800,h_600,c_fill,q_auto,f_auto/'),
          thumbnail_url: img.url.replace('/upload/', '/upload/w_400,h_300,c_fill,q_auto,f_auto/')
        }))
      };
    } else {
      // Homepage/main images
      websiteStructure.homepage = websiteStructure.homepage.concat(
        images.map(img => ({
          public_id: img.public_id,
          url: img.url,
          width: img.width,
          height: img.height,
          // Create responsive URLs
          desktop_url: img.url.replace('/upload/', '/upload/w_1920,h_1280,c_fill,q_auto,f_auto/'),
          mobile_url: img.url.replace('/upload/', '/upload/w_800,h_600,c_fill,q_auto,f_auto/')
        }))
      );
    }
  });

  // Display summary
  console.log('\n📊 Website Structure Summary:');
  console.log(`   Homepage images: ${websiteStructure.homepage.length}`);
  
  Object.entries(websiteStructure.regions).forEach(([region, countries]) => {
    console.log(`   ${region}:`);
    Object.entries(countries).forEach(([countryCode, country]) => {
      console.log(`     • ${country.name}: ${country.count} images`);
    });
  });

  // Save processed data
  fs.writeFileSync('website-images.json', JSON.stringify(websiteStructure, null, 2));
  console.log('\n💾 Website structure saved to website-images.json');

  // Generate TypeScript data file for your app
  generateTypeScriptData(websiteStructure);

  return websiteStructure;
}

function generateTypeScriptData(structure) {
  console.log('\n🔧 Generating TypeScript data file...');

  let tsContent = `// Auto-generated from Cloudinary images
// Generated on: ${new Date().toISOString()}

export interface ImageData {
  public_id: string;
  url: string;
  desktop_url: string;
  mobile_url: string;
  thumbnail_url?: string;
  width: number;
  height: number;
}

export interface CountryAlbum {
  name: string;
  count: number;
  images: ImageData[];
}

export interface RegionData {
  [countryCode: string]: CountryAlbum;
}

// Homepage slideshow images
export const HOMEPAGE_IMAGES: ImageData[] = ${JSON.stringify(structure.homepage, null, 2)};

// Regional albums
export const REGIONS: { [region: string]: RegionData } = ${JSON.stringify(structure.regions, null, 2)};

// Total image count
export const TOTAL_IMAGES = ${structure.totalImages};

// Export organized data for easy access
export const ALBUMS = {
  homepage: HOMEPAGE_IMAGES,
  regions: REGIONS,
  totalCount: TOTAL_IMAGES
};
`;

  fs.writeFileSync('src/lib/generated-albums.ts', tsContent);
  console.log('✅ TypeScript data file generated: src/lib/generated-albums.ts');
}

// Run the processing
processImagesForWebsite();