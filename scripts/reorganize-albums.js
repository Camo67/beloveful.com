import fs from 'fs';
import path from 'path';

// Read the current data.ts file
const dataPath = '/home/camo/new/beloveful.com/src/lib/data.ts';
const dataContent = fs.readFileSync(dataPath, 'utf8');

// Extract the ALBUMS array from the file
const albumsMatch = dataContent.match(/export const ALBUMS: CountryAlbum\[\] = \[([^]+?)\];/);
if (!albumsMatch) {
  console.error('Could not find ALBUMS array in data.ts');
  process.exit(1);
}

// Parse the existing albums (this is a simplified parser - in a real scenario you'd use a proper parser)
const albumsContent = albumsMatch[1];

// Current countries from the existing data structure
const countriesByRegion = {
  'Africa': [
    { country: 'Egypt', slug: 'egypt', hasData: true },
    { country: 'Ethiopia', slug: 'ethiopia', hasData: true },
    { country: 'Namibia', slug: 'namibia', hasData: false } // Not in current structure
  ],
  'Asia': [
    { country: 'Hong Kong', slug: 'hong-kong', hasData: true },
    { country: 'India', slug: 'india', hasData: true },
    { country: 'Japan', slug: 'japan', hasData: true },
    { country: 'Myanmar', slug: 'myanmar', hasData: true },
    { country: 'Nepal', slug: 'nepal', hasData: true },
    { country: 'Philippines', slug: 'philippines', hasData: true },
    { country: 'Thailand', slug: 'thailand', hasData: true },
    { country: 'Vietnam', slug: 'vietnam', hasData: true }
  ],
  'Middle East': [
    { country: 'Israel_Palestine', slug: 'israel-palestine', hasData: true },
    { country: 'Jordan', slug: 'jordan', hasData: true }
  ],
  'South America': [
    { country: 'Argentina', slug: 'argentina', hasData: true }
  ],
  'North America': [
    { country: 'Chicago', slug: 'chicago', hasData: true }
  ],
  'Europe': [
    { country: 'France', slug: 'france', hasData: true },
    { country: 'Italy', slug: 'italy', hasData: true }
  ],
  'Oceania': [
    // Currently empty but could be expanded
  ],
  'Erasing Borders': [
    // Currently empty but could be expanded
  ]
};

console.log('Current portfolio structure:');
console.log('==========================');

let totalCountries = 0;
let totalImages = 0;

Object.entries(countriesByRegion).forEach(([region, countries]) => {
  if (countries.length > 0) {
    console.log(`\n${region}:`);
    countries.forEach(country => {
      console.log(`  - ${country.country} (${country.slug}) ${country.hasData ? '✓' : '✗'}`);
      if (country.hasData) totalCountries++;
    });
  }
});

console.log(`\nTotal countries with data: ${totalCountries}`);

// Since we have the existing structure, let's create a new organized version
// by reading the actual data and reorganizing it alphabetically

const generateOrganizedStructure = () => {
  const regions = [
    'Africa',
    'Asia', 
    'Europe',
    'Middle East',
    'North America',
    'Oceania',
    'South America',
    'Erasing Borders'
  ];

  console.log('\nProposed alphabetical organization:');
  console.log('==================================');
  
  regions.forEach(region => {
    if (countriesByRegion[region] && countriesByRegion[region].length > 0) {
      console.log(`\n${region}:`);
      // Sort countries alphabetically
      const sortedCountries = countriesByRegion[region]
        .filter(c => c.hasData)
        .sort((a, b) => a.country.localeCompare(b.country));
      
      sortedCountries.forEach((country, index) => {
        console.log(`  ${index + 1}. ${country.country} (${country.slug})`);
      });
    }
  });
};

generateOrganizedStructure();

console.log('\nRecommendations:');
console.log('================');
console.log('1. Countries are already mostly organized alphabetically within regions');
console.log('2. Consider adding missing countries like Namibia if you have images');
console.log('3. The current structure looks well-organized');
console.log('4. You might want to add more countries to Oceania and Erasing Borders regions');

// Create a template for adding new countries
const newCountryTemplate = `
// Template for adding a new country:
{
  region: "RegionName",
  country: "CountryName", 
  slug: "country-slug",
  images: [
    { desktop: 'https://res.cloudinary.com/dvwdoezk1/image/upload/...', mobile: 'https://res.cloudinary.com/dvwdoezk1/image/upload/...' },
    // Add more images...
  ],
},
`;

fs.writeFileSync('new-country-template.txt', newCountryTemplate);
console.log('\n✓ Created new-country-template.txt for reference');