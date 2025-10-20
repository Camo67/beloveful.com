const fs = require('fs');

// Read the complete JSON file
const data = JSON.parse(fs.readFileSync('cloudinary-images-updated.json', 'utf8'));

// If data has countries property
const countries = data.countries || [];

// Generate TypeScript output
let output = `// Generated from cloudinary-images-updated.json\nimport { CountryAlbum } from './data';\n\nexport const CLOUDINARY_ALBUMS: CountryAlbum[] = [\n`;

for (const country of countries) {
  output += `  {\n`;
  output += `    "region": "${country.region}",\n`;
  output += `    "country": "${country.country}",\n`;
  output += `    "slug": "${country.slug}",\n`;
  output += `    "images": [\n`;
  
  for (const img of country.images) {
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
fs.writeFileSync('src/lib/cloudinaryAlbums.ts', output);

// Generate summary
console.log('\n=== Import Summary from JSON ===\n');
for (const country of countries) {
  console.log(`${country.country} (${country.region}): ${country.images.length} images`);
}

console.log(`\nTotal countries: ${countries.length}`);
console.log(`Total images: ${countries.reduce((sum, c) => sum + c.images.length, 0)}`);
console.log('\nUpdated file: src/lib/cloudinaryAlbums.ts');
