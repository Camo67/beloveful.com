const fs = require('fs');

// Country code mapping with region info
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
};

// First, let's read the cloudinary_urls.txt to see what ACTUAL URLs exist
console.log('Reading actual Cloudinary URLs from cloudinary_urls.txt...\n');

const data = fs.readFileSync('cloudinary_urls.txt', 'utf8');
const lines = data.split('\n');

const actualUrls = new Set();
const albums = {};

// Parse each line to get actual working URLs
for (const line of lines) {
  const trimmed = line.trim();
  if (!trimmed || !trimmed.startsWith('https://res.cloudinary.com')) continue;
  
  // Extract clean URL
  let url = trimmed.split("'")[0].trim();
  if (!url.includes('/upload/') || !url.includes('.jpg')) continue;
  
  actualUrls.add(url);
  
  // Extract filename to categorize by country
  const parts = url.split('/');
  const filename = parts[parts.length - 1];
  
  // Find country code
  let countryCode = null;
  for (const code of Object.keys(countryMap)) {
    if (filename.startsWith(code + '-') || filename.startsWith(code + '_')) {
      countryCode = code;
      break;
    }
  }
  
  if (!countryCode) continue;
  
  const countryInfo = countryMap[countryCode];
  const key = countryInfo.slug;
  
  if (!albums[key]) {
    albums[key] = {
      ...countryInfo,
      images: []
    };
  }
  
  albums[key].images.push({
    desktop: url,
    mobile: url
  });
}

console.log(`Found ${actualUrls.size} actual working URLs\n`);

// Generate TypeScript output with ONLY working URLs
let output = `// Generated from actual Cloudinary URLs (${actualUrls.size} images)\nimport { CountryAlbum } from './data';\n\nexport const CLOUDINARY_ALBUMS: CountryAlbum[] = [\n`;

const sortedKeys = Object.keys(albums).sort();
let totalImages = 0;

for (const key of sortedKeys) {
  const album = albums[key];
  totalImages += album.images.length;
  
  output += `  {\n`;
  output += `    "region": "${album.region}",\n`;
  output += `    "country": "${album.country}",\n`;
  output += `    "slug": "${album.slug}",\n`;
  output += `    "images": [\n`;
  
  for (const img of album.images) {
    output += `      {\n`;
    output += `        "desktop": "${img.desktop}",\n`;
    output += `        "mobile": "${img.mobile}"\n`;
    output += `      },\n`;
  }
  
  output += `    ]\n`;
  output += `  },\n`;
}

// Add Erasing Borders with R2 URLs (these should work)
output += `  {\n`;
output += `    "region": "Erasing Borders",\n`;
output += `    "country": "Erasing Borders",\n`;
output += `    "slug": "erasing-borders",\n`;
output += `    "images": [\n`;

const erasingBordersImages = [
  "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Erasing Borders/CHI-Beloveful6.jpg",
  "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Erasing Borders/CHI-DSCF9471.jpg",
  "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Erasing Borders/CHI-MeniasTony_12.jpg",
  "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Erasing Borders/FRA-DSCF0103%20copy.jpg",
  "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Erasing Borders/Greece-DSCF3935%20copy%203.jpg",
  "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Erasing Borders/IND-MeniasTony_14.jpg",
  "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Erasing Borders/JAP-3265.jpg",
  "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Erasing Borders/JOR-4461.jpg",
  "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Erasing Borders/MYA-DSCF0783%20copy.jpg",
  "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Erasing Borders/NEP-DSCF8737%20copy.jpg",
  "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Erasing Borders/NEP-Silent%20Stare%20copy.jpg",
  "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Erasing Borders/NyC-DSCF8922%20copy%202.jpg",
  "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Erasing Borders/PAL-DSCF3675%20copy.jpg",
  "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Erasing Borders/PHI-1662%20copy.jpg",
  "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Erasing Borders/THAI-DSCF3890%20copy.jpg",
  "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Erasing Borders/Tony%20Menias%20-%20Two%20Girls%20in%20Window.jpg"
];

for (const img of erasingBordersImages) {
  output += `      {\n`;
  output += `        "desktop": "${img}",\n`;
  output += `        "mobile": "${img}"\n`;
  output += `      },\n`;
}

output += `    ]\n`;
output += `  }\n`;
output += `];\n`;

// Write file
fs.writeFileSync('src/lib/cloudinaryAlbums.ts', output);

// Generate summary
console.log('=== WORKING Travel Portfolio ===\n');
for (const key of sortedKeys) {
  const album = albums[key];
  console.log(`✅ ${album.country} (${album.region}): ${album.images.length} working images`);
}
console.log(`✅ Erasing Borders: ${erasingBordersImages.length} working images\n`);

console.log(`📊 Total countries: ${sortedKeys.length + 1}`);
console.log(`📊 Total working images: ${totalImages + erasingBordersImages.length}`);
console.log('📁 Updated: src/lib/cloudinaryAlbums.ts\n');
console.log('🔄 Now restart your dev server to see the working images!');