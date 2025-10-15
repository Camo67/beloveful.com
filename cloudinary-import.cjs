#!/usr/bin/env node

const { v2: cloudinary } = require('cloudinary');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

// Region mapping based on your existing structure
const REGION_MAPPING = {
  // Africa
  'EGY': 'Africa', // Egypt
  'MOR': 'Africa', // Morocco
  'TUN': 'Africa', // Tunisia
  
  // Asia  
  'CHI': 'Asia', // China
  'HK': 'Asia', // Hong Kong
  'IND': 'Asia', // India
  'JPN': 'Asia', // Japan
  'NPL': 'Asia', // Nepal
  'SGP': 'Asia', // Singapore
  'THA': 'Asia', // Thailand
  'VNM': 'Asia', // Vietnam
  
  // Middle East
  'ARE': 'Middle East', // UAE
  'JOR': 'Middle East', // Jordan
  'ISR': 'Middle East', // Israel
  'TUR': 'Middle East', // Turkey
  
  // South America
  'ARG': 'South America', // Argentina
  'BOL': 'South America', // Bolivia
  'BRA': 'South America', // Brazil
  'CHL': 'South America', // Chile
  'COL': 'South America', // Colombia
  'ECU': 'South America', // Ecuador
  'PER': 'South America', // Peru
  'URY': 'South America', // Uruguay
  
  // North America
  'CAN': 'North America', // Canada
  'USA': 'North America', // United States
  'MEX': 'North America', // Mexico
  
  // Europe
  'AUT': 'Europe', // Austria
  'BEL': 'Europe', // Belgium
  'CZE': 'Europe', // Czech Republic
  'DNK': 'Europe', // Denmark
  'FRA': 'Europe', // France
  'DEU': 'Europe', // Germany
  'GRC': 'Europe', // Greece
  'HUN': 'Europe', // Hungary
  'ITA': 'Europe', // Italy
  'NLD': 'Europe', // Netherlands
  'NOR': 'Europe', // Norway
  'POL': 'Europe', // Poland
  'PRT': 'Europe', // Portugal
  'ROU': 'Europe', // Romania
  'ESP': 'Europe', // Spain
  'SWE': 'Europe', // Sweden
  'CHE': 'Europe', // Switzerland
  'GBR': 'Europe', // United Kingdom
  
  // Oceania
  'AUS': 'Oceania', // Australia
  'NZL': 'Oceania', // New Zealand
  
  // Erasing Borders (special category)
  'BORDERS': 'Erasing Borders'
};

// Country name mapping
const COUNTRY_NAMES = {
  'EGY': 'Egypt',
  'MOR': 'Morocco', 
  'TUN': 'Tunisia',
  'CHI': 'China',
  'HK': 'Hong Kong',
  'IND': 'India',
  'JPN': 'Japan',
  'NPL': 'Nepal',
  'SGP': 'Singapore',
  'THA': 'Thailand',
  'VNM': 'Vietnam',
  'ARE': 'UAE',
  'JOR': 'Jordan',
  'ISR': 'Israel',
  'TUR': 'Turkey',
  'ARG': 'Argentina',
  'BOL': 'Bolivia',
  'BRA': 'Brazil',
  'CHL': 'Chile',
  'COL': 'Colombia',
  'ECU': 'Ecuador',
  'PER': 'Peru',
  'URY': 'Uruguay',
  'CAN': 'Canada',
  'USA': 'United States',
  'MEX': 'Mexico',
  'AUT': 'Austria',
  'BEL': 'Belgium',
  'CZE': 'Czech Republic',
  'DNK': 'Denmark',
  'FRA': 'France',
  'DEU': 'Germany',
  'GRC': 'Greece',
  'HUN': 'Hungary',
  'ITA': 'Italy',
  'NLD': 'Netherlands',
  'NOR': 'Norway',
  'POL': 'Poland',
  'PRT': 'Portugal',
  'ROU': 'Romania',
  'ESP': 'Spain',
  'SWE': 'Sweden',
  'CHE': 'Switzerland',
  'GBR': 'United Kingdom',
  'AUS': 'Australia',
  'NZL': 'New Zealand',
  'BORDERS': 'Erasing Borders'
};

async function getAllImages() {
  console.log('🔍 Fetching all images from Cloudinary...');
  
  try {
    const result = await cloudinary.api.resources({
      type: 'upload',
      max_results: 500, // Cloudinary limit per request
      resource_type: 'image'
    });

    console.log(`📸 Found ${result.resources.length} images`);
    
    return result.resources;
  } catch (error) {
    console.error('❌ Error fetching images:', error);
    throw error;
  }
}

function extractCountryCode(publicId) {
  // Extract country code from filename like "EGY-001", "CHI-005", etc.
  const match = publicId.match(/^([A-Z]+)-/);
  return match ? match[1] : null;
}

function organizeImagesByCountry(images) {
  const albums = {};
  
  images.forEach(image => {
    const countryCode = extractCountryCode(image.public_id);
    
    if (!countryCode || !REGION_MAPPING[countryCode]) {
      console.log(`⚠️  Skipping image with unknown country code: ${image.public_id}`);
      return;
    }
    
    if (!albums[countryCode]) {
      albums[countryCode] = {
        region: REGION_MAPPING[countryCode],
        country: COUNTRY_NAMES[countryCode],
        images: []
      };
    }
    
    albums[countryCode].images.push({
      desktop: image.secure_url,
      mobile: image.secure_url.replace('/upload/', '/upload/c_scale,w_800/'), // Mobile version
      public_id: image.public_id,
      width: image.width,
      height: image.height
    });
  });
  
  // Sort images within each album by public_id
  Object.keys(albums).forEach(countryCode => {
    albums[countryCode].images.sort((a, b) => a.public_id.localeCompare(b.public_id));
  });
  
  return albums;
}

function generateDataFile(albums) {
  console.log('📝 Generating updated data.ts file...');
  
  // Create backup of existing data.ts
  const dataPath = path.join(__dirname, 'src/lib/data.ts');
  const backupPath = path.join(__dirname, 'src/lib/data.ts.backup');
  
  if (fs.existsSync(dataPath)) {
    fs.copyFileSync(dataPath, backupPath);
    console.log('💾 Backup created: data.ts.backup');
  }
  
  // Generate the albums array
  const albumEntries = Object.keys(albums)
    .sort() // Sort by country code
    .map(countryCode => {
      const album = albums[countryCode];
      const imageEntries = album.images.map((img, index) => 
        `    { desktop: "${img.desktop}", mobile: "${img.mobile}" }`
      ).join(',\n');
      
      return `  {
    region: "${album.region}" as Region,
    country: "${album.country}",
    images: [
${imageEntries}
    ]
  }`;
    }).join(',\n');
  
  // Generate slideshow images (use first image from each country)
  const slideshowImages = Object.keys(albums)
    .filter(countryCode => albums[countryCode].images.length > 0)
    .slice(0, 10) // Limit to 10 slideshow images
    .map(countryCode => {
      const firstImage = albums[countryCode].images[0];
      return `  {
    desktop: "${firstImage.desktop}",
    mobile: "${firstImage.mobile}",
    country: "${albums[countryCode].country}"
  }`;
    }).join(',\n');
  
  // Generate the complete data.ts content
  const dataContent = `// Generated on ${new Date().toISOString()}
// Total albums: ${Object.keys(albums).length}
// Total images: ${Object.values(albums).reduce((sum, album) => sum + album.images.length, 0)}

export type Region = 
  | "Africa"
  | "Asia"
  | "Middle East"
  | "South America"
  | "North America"
  | "Europe"
  | "Oceania"
  | "Erasing Borders";

export interface CountryAlbum {
  region: Region;
  country: string;
  images: Array<{
    desktop: string;
    mobile: string;
  }>;
}

export interface SlideshowImage {
  desktop: string;
  mobile: string;
  country: string;
}

export const ALBUMS: CountryAlbum[] = [
${albumEntries}
];

export const SLIDESHOW_IMAGES: SlideshowImage[] = [
${slideshowImages}
];
`;
  
  fs.writeFileSync(dataPath, dataContent);
  console.log('✅ Updated data.ts successfully!');
  
  // Print summary
  console.log('\n📊 Import Summary:');
  console.log(`  • Total countries: ${Object.keys(albums).length}`);
  console.log(`  • Total images: ${Object.values(albums).reduce((sum, album) => sum + album.images.length, 0)}`);
  console.log('  • Albums by region:');
  
  const regionStats = {};
  Object.values(albums).forEach(album => {
    regionStats[album.region] = (regionStats[album.region] || 0) + 1;
  });
  
  Object.entries(regionStats).forEach(([region, count]) => {
    console.log(`    - ${region}: ${count} countries`);
  });
}

async function main() {
  try {
    console.log('🚀 Starting Cloudinary import process...');
    
    // Verify configuration
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      throw new Error('Missing Cloudinary configuration. Please check your .env file.');
    }
    
    console.log(`☁️  Connected to Cloudinary: ${process.env.CLOUDINARY_CLOUD_NAME}`);
    
    // Fetch all images
    const images = await getAllImages();
    
    // Organize by country
    const albums = organizeImagesByCountry(images);
    
    // Generate updated data.ts
    generateDataFile(albums);
    
    console.log('\n🎉 Import completed successfully!');
    console.log('📁 Files updated:');
    console.log('  • src/lib/data.ts (updated with all Cloudinary images)');
    console.log('  • src/lib/data.ts.backup (backup of previous version)');
    
  } catch (error) {
    console.error('\n❌ Import failed:', error.message);
    process.exit(1);
  }
}

// Run the import
if (require.main === module) {
  main();
}