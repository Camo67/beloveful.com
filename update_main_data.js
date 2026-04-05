import fs from 'fs';

console.log('=== UPDATING MAIN DATA FILES ===\n');

// Read the updated data
const updatedData = JSON.parse(fs.readFileSync('./cloudinary-images-updated.json', 'utf8'));

// Generate new generatedAlbums.ts file
const generateAlbumsContent = `// Auto-generated from Cloudinary API
// Generated on: ${new Date().toISOString()}

import type { CountryAlbum } from './data';

export const GENERATED_ALBUMS: CountryAlbum[] = [
${updatedData.countries.map(country => {
  const images = country.images.map(img => 
    `      { desktop: '${img.desktop}', mobile: '${img.mobile}' }`
  ).join(',\n');
  
  return `  {
    region: "${country.region}",
    country: "${country.country}",
    slug: "${country.slug}",
    images: [
${images}
    ],
  }`;
}).join(',\n')}
];`;

fs.writeFileSync('./src/lib/generatedAlbums-new.ts', generateAlbumsContent);

// Update the main data.ts file to include new countries
const originalDataContent = fs.readFileSync('./src/lib/data.ts', 'utf8');

// Extract the existing HOME_SLIDESHOW and other content
const slideshowMatch = originalDataContent.match(/export const HOME_SLIDESHOW[\s\S]*?(?=export const ALBUMS)/);
const homeSlideshow = slideshowMatch ? slideshowMatch[0] : '';

// Generate updated ALBUMS array using GENERATED_ALBUMS
const newDataContent = `import { GENERATED_ALBUMS } from "./generatedAlbums";

export type Region =
  | "Africa"
  | "Asia"
  | "Middle East"
  | "South America"
  | "North America"
  | "Europe"
  | "Oceania"
  | "Erasing Borders"

/**
 * Defines the structure for a single album, representing a country/location.
 */
export interface CountryAlbum {
  region: Region
  country: string
  slug: string
  images: {
    desktop: string // URL for landscape image
    mobile: string // URL for portrait image
  }[];
}

export interface SlideshowImage {
  desktop: string;
  mobile: string;
}

${homeSlideshow}

// Use generated albums from Cloudinary
export const ALBUMS: CountryAlbum[] = GENERATED_ALBUMS;
`;

fs.writeFileSync('./src/lib/data-new.ts', newDataContent);

// Generate statistics
const stats = {
  totalCountries: updatedData.countries.length,
  totalImages: updatedData.assignedImages,
  remainingUnassigned: updatedData.unassigned.length,
  newlyAssigned: 240,
  countriesByRegion: {}
};

updatedData.countries.forEach(country => {
  if (!stats.countriesByRegion[country.region]) {
    stats.countriesByRegion[country.region] = [];
  }
  stats.countriesByRegion[country.region].push({
    country: country.country,
    slug: country.slug,
    imageCount: country.images.length
  });
});

// Sort regions and countries
Object.keys(stats.countriesByRegion).forEach(region => {
  stats.countriesByRegion[region].sort((a, b) => b.imageCount - a.imageCount);
});

console.log('=== UPDATE SUMMARY ===');
console.log(`Total Countries/Regions: ${stats.totalCountries}`);
console.log(`Total Assigned Images: ${stats.totalImages} (was 654, +${stats.newlyAssigned})`);
console.log(`Remaining Unassigned: ${stats.remainingUnassigned}`);
console.log('');

console.log('=== COUNTRIES BY REGION ===');
Object.entries(stats.countriesByRegion).forEach(([region, countries]) => {
  console.log(`\\n${region}:`);
  countries.forEach(country => {
    console.log(`  ${country.country} (${country.slug}): ${country.imageCount} images`);
  });
});

console.log('\\n=== FILES CREATED ===');
console.log('- src/lib/generatedAlbums-new.ts (updated generated albums)');
console.log('- src/lib/data-new.ts (updated main data file)');
console.log('- cloudinary-images-updated.json (complete updated dataset)');

console.log('\\n=== NEXT STEPS ===');
console.log('1. Review the new files');
console.log('2. Backup your current files if needed');
console.log('3. Replace the old files:');
console.log('   mv src/lib/generatedAlbums-new.ts src/lib/generatedAlbums.ts');
console.log('   mv src/lib/data-new.ts src/lib/data.ts');
console.log('4. Test your website to ensure everything works');

fs.writeFileSync('./update_stats.json', JSON.stringify(stats, null, 2));
console.log('\\nSaved detailed stats to update_stats.json');