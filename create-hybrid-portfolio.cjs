const fs = require('fs');

// Read R2 mapping data
console.log('🔍 Reading R2 image mapping...');
const r2Data = JSON.parse(fs.readFileSync('r2-url-mapping.json', 'utf8'));

// Country mapping
const countryMap = {
  'PAL': { region: 'Middle East', country: 'Israel | Palestine', slug: 'israel-palestine' },
  'JOR': { region: 'Middle East', country: 'Jordan', slug: 'jordan' },
  'CHI': { region: 'Asia', country: 'China', slug: 'china' },
  'JAP': { region: 'Asia', country: 'Japan', slug: 'japan' },
  'HK': { region: 'Asia', country: 'Hong Kong', slug: 'hong-kong' },
  'IND': { region: 'Asia', country: 'India', slug: 'india' },
  'MYA': { region: 'Asia', country: 'Myanmar', slug: 'myanmar' },
  'NEP': { region: 'Asia', country: 'Nepal', slug: 'nepal' },
  'THAI': { region: 'Asia', country: 'Thailand', slug: 'thailand' },
  'PHI': { region: 'Asia', country: 'Philippines', slug: 'philippines' },
  'VIET': { region: 'Asia', country: 'Vietnam', slug: 'vietnam' },
  'EGY': { region: 'Africa', country: 'Egypt', slug: 'egypt' },
  'NAM': { region: 'Africa', country: 'Namibia', slug: 'namibia' },
  'ETH': { region: 'Africa', country: 'Ethiopia', slug: 'ethiopia' },
  'MOR': { region: 'Africa', country: 'Morocco', slug: 'morocco' },
  'ARG': { region: 'South America', country: 'Argentina', slug: 'argentina' },
  'ITA': { region: 'Europe', country: 'Italy', slug: 'italy' },
  'GRC': { region: 'Europe', country: 'Greece', slug: 'greece' },
  'GRE': { region: 'Europe', country: 'Greece', slug: 'greece' },
  'FRA': { region: 'Europe', country: 'France', slug: 'france' },
  'PORT': { region: 'Europe', country: 'Portugal', slug: 'portugal' },
  'IRL': { region: 'Europe', country: 'Ireland', slug: 'ireland' },
  'UK': { region: 'Europe', country: 'United Kingdom', slug: 'united-kingdom' },
  'ESP': { region: 'Europe', country: 'Spain', slug: 'spain' },
  'SPA': { region: 'Europe', country: 'Spain', slug: 'spain' },
  'USA': { region: 'North America', country: 'United States', slug: 'united-states' },
  'NYC': { region: 'North America', country: 'New York City', slug: 'new-york-city' },
  'MEX': { region: 'North America', country: 'Mexico', slug: 'mexico' },
};

console.log('📁 Processing R2 images by country...\n');

const albums = {};
const uploadQueue = []; // Images that need to be uploaded to Cloudinary

// Process R2 images
for (const [localPath, r2Url] of Object.entries(r2Data)) {
  const filename = localPath.split('/').pop();
  if (!filename || !filename.includes('.jpg')) continue;
  
  // Extract country code from filename
  let countryCode = null;
  for (const code of Object.keys(countryMap)) {
    if (filename.startsWith(code + '-') || 
        filename.startsWith(code + '_') || 
        localPath.includes(`/${code}/`) ||
        localPath.includes(`/${countryMap[code].country}/`)) {
      countryCode = code;
      break;
    }
  }
  
  // Special cases for path-based detection
  if (!countryCode) {
    if (localPath.includes('/Egypt/')) countryCode = 'EGY';
    else if (localPath.includes('/Ethiopia/')) countryCode = 'ETH';
    else if (localPath.includes('/Morocco/')) countryCode = 'MOR';
    else if (localPath.includes('/Namibia/')) countryCode = 'NAM';
    else if (localPath.includes('/Jordan/')) countryCode = 'JOR';
    else if (localPath.includes('/China/')) countryCode = 'CHI';
    else if (localPath.includes('/Japan/')) countryCode = 'JAP';
    else if (localPath.includes('/India/')) countryCode = 'IND';
    else if (localPath.includes('/Italy/')) countryCode = 'ITA';
    else if (localPath.includes('/France/')) countryCode = 'FRA';
    else if (localPath.includes('/Greece/')) countryCode = 'GRC';
    else if (localPath.includes('/Spain/')) countryCode = 'ESP';
    else if (localPath.includes('/Portugal/')) countryCode = 'PORT';
    else if (localPath.includes('/Ireland/')) countryCode = 'IRL';
    else if (localPath.includes('/Myanmar/')) countryCode = 'MYA';
    else if (localPath.includes('/Nepal/')) countryCode = 'NEP';
    else if (localPath.includes('/Thailand/')) countryCode = 'THAI';
    else if (localPath.includes('/Philippines/')) countryCode = 'PHI';
    else if (localPath.includes('/Vietnam/')) countryCode = 'VIET';
    else if (localPath.includes('/Argentina/')) countryCode = 'ARG';
    else continue; // Skip unknown countries
  }
  
  const countryInfo = countryMap[countryCode];
  if (!countryInfo) continue;
  
  const key = countryInfo.slug;
  
  if (!albums[key]) {
    albums[key] = {
      ...countryInfo,
      images: []
    };
  }
  
  // Add image with R2 as primary, Cloudinary as backup (to be filled)
  albums[key].images.push({
    desktop: r2Url,
    mobile: r2Url,
    cloudinaryDesktop: null, // Will be filled after upload
    cloudinaryMobile: null,
    localPath: localPath,
    filename: filename
  });
  
  // Add to upload queue for Cloudinary
  uploadQueue.push({
    localPath: localPath,
    r2Url: r2Url,
    filename: filename,
    countryCode: countryCode,
    albumKey: key
  });
}

console.log('📊 R2 Portfolio Summary:\n');
let totalImages = 0;
const sortedKeys = Object.keys(albums).sort();

for (const key of sortedKeys) {
  const album = albums[key];
  totalImages += album.images.length;
  console.log(`✅ ${album.country} (${album.region}): ${album.images.length} images`);
}

console.log(`\n📈 Total: ${sortedKeys.length} countries, ${totalImages} images`);
console.log(`📤 Images to upload to Cloudinary: ${uploadQueue.length}\n`);

// Generate TypeScript output with R2 primary, Cloudinary fallback
let output = `// Generated hybrid R2 + Cloudinary portfolio (${totalImages} images)
// R2 URLs as primary, Cloudinary as fallback
import { CountryAlbum } from './data';

export interface HybridImage {
  desktop: string;
  mobile: string;
  desktopCloudinary?: string; // Cloudinary fallback
  mobileCloudinary?: string; // Cloudinary fallback
}

export interface HybridCountryAlbum extends Omit<CountryAlbum, 'images'> {
  images: HybridImage[];
}

export const CLOUDINARY_ALBUMS: HybridCountryAlbum[] = [
`;

for (const key of sortedKeys) {
  const album = albums[key];
  
  output += `  {
    "region": "${album.region}",
    "country": "${album.country}",
    "slug": "${album.slug}",
    "images": [
`;
  
  for (const img of album.images) {
    output += `      {
        "desktop": "${img.desktop}",
        "mobile": "${img.mobile}",
        "desktopCloudinary": null,
        "mobileCloudinary": null
      },
`;
  }
  
  output += `    ]
  },
`;
}

// Add Erasing Borders
output += `  {
    "region": "Erasing Borders",
    "country": "Erasing Borders", 
    "slug": "erasing-borders",
    "images": [
      {
        "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Erasing Borders/CHI-Beloveful6.jpg",
        "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Erasing Borders/CHI-Beloveful6.jpg"
      },
      {
        "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Erasing Borders/CHI-DSCF9471.jpg",
        "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Erasing Borders/CHI-DSCF9471.jpg"
      },
      {
        "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Erasing Borders/JAP-3265.jpg",
        "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Erasing Borders/JAP-3265.jpg"
      },
      {
        "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Erasing Borders/Tony%20Menias%20-%20Two%20Girls%20in%20Window.jpg",
        "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Erasing Borders/Tony%20Menias%20-%20Two%20Girls%20in%20Window.jpg"
      }
    ]
  }
];
`;

// Write the portfolio file
fs.writeFileSync('src/lib/cloudinaryAlbums.ts', output);

// Write upload queue
fs.writeFileSync('cloudinary-upload-queue.json', JSON.stringify(uploadQueue, null, 2));

console.log('✅ Generated hybrid R2 + Cloudinary portfolio!');
console.log('📁 Updated: src/lib/cloudinaryAlbums.ts');
console.log('📤 Upload queue: cloudinary-upload-queue.json');
console.log('\n🚀 Your portfolio now uses R2 images immediately!');
console.log('📋 Next steps:');
console.log('1. Restart dev server to see R2 images working');
console.log('2. Run Cloudinary upload script to add fallbacks');
console.log(`3. Update URLs after ${uploadQueue.length} images upload to Cloudinary`);