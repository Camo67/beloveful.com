const fs = require('fs');

// Read cloudinary_urls.txt
const data = fs.readFileSync('cloudinary_urls.txt', 'utf8');
const lines = data.split('\n');

// Country code mapping
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

const albums = {};

// Parse each line
for (const line of lines) {
  const trimmed = line.trim();
  if (!trimmed || !trimmed.startsWith('https://res.cloudinary.com')) continue;
  
  // Extract clean URL (remove trailing characters)
  const url = trimmed.split("'")[0].trim();
  if (!url.includes('/upload/')) continue;
  
  // Extract filename
  const parts = url.split('/');
  const filename = parts[parts.length - 1];
  
  // Find country code (look for known prefixes)
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
  
  // Add image if not duplicate
  if (!albums[key].images.find(img => img.desktop === url)) {
    albums[key].images.push({
      desktop: url,
      mobile: url
    });
  }
}

// Generate TypeScript output
let output = `// Generated from cloudinary_urls.txt\nimport { CountryAlbum } from './data';\n\nexport const CLOUDINARY_ALBUMS: CountryAlbum[] = [\n`;

const sortedKeys = Object.keys(albums).sort();
for (const key of sortedKeys) {
  const album = albums[key];
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

output += `];\n`;

// Write to file
fs.writeFileSync('src/lib/cloudinaryAlbums-generated.ts', output);

// Generate summary
console.log('\n=== Import Summary ===\n');
for (const key of sortedKeys) {
  const album = albums[key];
  console.log(`${album.country} (${album.region}): ${album.images.length} images`);
}

console.log(`\nTotal countries: ${sortedKeys.length}`);
console.log(`Total images: ${Object.values(albums).reduce((sum, a) => sum + a.images.length, 0)}`);
console.log('\nGenerated file: src/lib/cloudinaryAlbums-generated.ts');
