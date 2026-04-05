import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

// Debug: Check environment variables
console.log('Environment variables:');
console.log('CLOUDINARY_CLOUD_NAME:', process.env.CLOUDINARY_CLOUD_NAME);
console.log('CLOUDINARY_API_KEY:', process.env.CLOUDINARY_API_KEY ? 'Set' : 'Not set');
console.log('CLOUDINARY_API_SECRET:', process.env.CLOUDINARY_API_SECRET ? 'Set' : 'Not set');

// Configure Cloudinary using environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Country prefixes to region mapping
const COUNTRY_REGIONS = {
  'EGY': { region: 'Africa', country: 'Egypt', slug: 'egypt' },
  'ETH': { region: 'Africa', country: 'Ethiopia', slug: 'ethiopia' },
  'HK': { region: 'Asia', country: 'Hong Kong', slug: 'hong-kong' },
  'IND': { region: 'Asia', country: 'India', slug: 'india' },
  'JAP': { region: 'Asia', country: 'Japan', slug: 'japan' },
  'MYA': { region: 'Asia', country: 'Myanmar', slug: 'myanmar' },
  'NEP': { region: 'Asia', country: 'Nepal', slug: 'nepal' },
  'NPL': { region: 'Asia', country: 'Nepal', slug: 'nepal' }, // Alternative prefix
  'PHI': { region: 'Asia', country: 'Philippines', slug: 'philippines' },
  'THAI': { region: 'Asia', country: 'Thailand', slug: 'thailand' },
  'VIET': { region: 'Asia', country: 'Vietnam', slug: 'vietnam' },
  'PAL': { region: 'Middle East', country: 'Israel_Palestine', slug: 'israel-palestine' },
  'JOR': { region: 'Middle East', country: 'Jordan', slug: 'jordan' },
  'ARG': { region: 'South America', country: 'Argentina', slug: 'argentina' },
  'CHI': { region: 'North America', country: 'Chicago', slug: 'chicago' },
  'ITA': { region: 'Europe', country: 'Italy', slug: 'italy' },
  'FRA': { region: 'Europe', country: 'France', slug: 'france' },
  'NAM': { region: 'Africa', country: 'Namibia', slug: 'namibia' }
};

// Function to get country info from filename
function getCountryFromFilename(filename) {
  // Extract country prefix from filename
  const prefixes = Object.keys(COUNTRY_REGIONS);
  for (const prefix of prefixes) {
    if (filename.startsWith(prefix + '-') || filename.startsWith(prefix + '_')) {
      return COUNTRY_REGIONS[prefix];
    }
  }
  
  // Handle special cases
  if (filename.startsWith('IMG_') && filename.includes('ETH')) {
    return COUNTRY_REGIONS['ETH'];
  }
  
  // If no prefix matches, try to determine from context
  return null;
}

// Function to fetch all images from Cloudinary
async function fetchAllImages() {
  try {
    console.log('Fetching images from Cloudinary...');
    
    let allImages = [];
    let nextCursor = null;
    
    do {
      const result = await cloudinary.api.resources({
        type: 'upload',
        resource_type: 'image',
        max_results: 500,
        next_cursor: nextCursor
      });
      
      allImages = allImages.concat(result.resources);
      nextCursor = result.next_cursor;
      console.log(`Fetched ${allImages.length} images so far...`);
      
    } while (nextCursor);
    
    console.log(`Total images found: ${allImages.length}`);
    
    // Group images by country
    const imagesByCountry = {};
    const unassignedImages = [];
    
    allImages.forEach(image => {
      const countryInfo = getCountryFromFilename(image.public_id);
      
      if (countryInfo) {
        const key = `${countryInfo.region}|${countryInfo.country}`;
        if (!imagesByCountry[key]) {
          imagesByCountry[key] = {
            ...countryInfo,
            images: []
          };
        }
        
        imagesByCountry[key].images.push({
          desktop: image.secure_url,
          mobile: image.secure_url,
          filename: image.public_id,
          width: image.width,
          height: image.height
        });
      } else {
        unassignedImages.push({
          filename: image.public_id,
          url: image.secure_url
        });
      }
    });
    
    // Sort countries alphabetically within regions
    const sortedCountries = Object.values(imagesByCountry).sort((a, b) => {
      if (a.region !== b.region) {
        return a.region.localeCompare(b.region);
      }
      return a.country.localeCompare(b.country);
    });
    
    // Sort images within each country by filename
    sortedCountries.forEach(country => {
      country.images.sort((a, b) => a.filename.localeCompare(b.filename));
    });
    
    // Generate the TypeScript structure
    const albumsData = generateAlbumsData(sortedCountries);
    
    // Save results
    fs.writeFileSync('cloudinary-images.json', JSON.stringify({
      countries: sortedCountries,
      unassigned: unassignedImages,
      totalImages: allImages.length,
      assignedImages: allImages.length - unassignedImages.length
    }, null, 2));
    
    fs.writeFileSync('generated-albums.ts', albumsData);
    
    console.log(`\nResults saved to:`);
    console.log(`- cloudinary-images.json (${sortedCountries.length} countries, ${unassignedImages.length} unassigned)`);
    console.log(`- generated-albums.ts (TypeScript data structure)`);
    
    // Print summary
    console.log(`\nSummary by region:`);
    const regionSummary = {};
    sortedCountries.forEach(country => {
      if (!regionSummary[country.region]) {
        regionSummary[country.region] = { countries: 0, images: 0 };
      }
      regionSummary[country.region].countries++;
      regionSummary[country.region].images += country.images.length;
    });
    
    Object.entries(regionSummary).forEach(([region, data]) => {
      console.log(`${region}: ${data.countries} countries, ${data.images} images`);
    });
    
    if (unassignedImages.length > 0) {
      console.log(`\nUnassigned images (${unassignedImages.length}):`);
      unassignedImages.slice(0, 10).forEach(img => {
        console.log(`- ${img.filename}`);
      });
      if (unassignedImages.length > 10) {
        console.log(`... and ${unassignedImages.length - 10} more`);
      }
    }
    
  } catch (error) {
    console.error('Error fetching images:', error);
  }
}

// Function to generate TypeScript data structure
function generateAlbumsData(countries) {
  let output = `// Auto-generated from Cloudinary API\n// Generated on: ${new Date().toISOString()}\n\n`;
  output += `import type { CountryAlbum } from './data';\n\n`;
  output += `export const GENERATED_ALBUMS: CountryAlbum[] = [\n`;
  
  countries.forEach((country, index) => {
    output += `  {\n`;
    output += `    region: "${country.region}",\n`;
    output += `    country: "${country.country}",\n`;
    output += `    slug: "${country.slug}",\n`;
    output += `    images: [\n`;
    
    country.images.forEach((image, imgIndex) => {
      output += `      { desktop: '${image.desktop}', mobile: '${image.mobile}' }`;
      if (imgIndex < country.images.length - 1) output += ',';
      output += `\n`;
    });
    
    output += `    ],\n`;
    output += `  }`;
    if (index < countries.length - 1) output += ',';
    output += `\n`;
  });
  
  output += `];\n\n`;
  
  // Also generate slideshow data from the first few images of each country
  output += `export const GENERATED_HOME_SLIDESHOW = [\n`;
  const slideshowImages = [];
  
  countries.forEach(country => {
    if (country.images.length > 0) {
      // Take first 2 images from each country for variety
      slideshowImages.push(...country.images.slice(0, 2));
    }
  });
  
  // Shuffle and take first 15 for slideshow
  const shuffled = slideshowImages.sort(() => 0.5 - Math.random()).slice(0, 15);
  
  shuffled.forEach((image, index) => {
    output += `  {\n`;
    output += `    desktop: "${image.desktop}",\n`;
    output += `    mobile: "${image.mobile}",\n`;
    output += `  }`;
    if (index < shuffled.length - 1) output += ',';
    output += `\n`;
  });
  
  output += `];\n`;
  
  return output;
}

// Run the script
fetchAllImages().catch(console.error);