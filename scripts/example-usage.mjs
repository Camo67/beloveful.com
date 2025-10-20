#!/usr/bin/env node

/**
 * Example Usage - Portfolio Management System Demo
 * 
 * This script demonstrates how to use the portfolio management system
 * and shows what output to expect.
 */

import { analyzePortfolio } from './portfolio-manager.mjs';
import { extractCountryInfo, COUNTRY_MAPPINGS } from './fetch-cloudinary-portfolio.mjs';

console.log('🎬 Portfolio Management System - Example Usage\n');

// Example 1: Show how filename extraction works
console.log('🔍 Example 1: Filename Pattern Recognition\n');

const exampleFilenames = [
  'EGY-1234-pyramids.jpg',
  'JAP-cherry-blossoms.jpg', 
  'ITA-venice-sunset.jpg',
  'JOR-4604-petra.jpg',
  'DSCF9350-unknown.jpg',
  'IMG_1234.jpg'
];

exampleFilenames.forEach(filename => {
  const countryInfo = extractCountryInfo(filename);
  if (countryInfo) {
    console.log(`✅ ${filename} → ${countryInfo.country} (${countryInfo.region})`);
  } else {
    console.log(`❓ ${filename} → Unassigned (needs tags or better filename)`);
  }
});

// Example 2: Show available country mappings by region
console.log('\n🌍 Example 2: Available Country Mappings by Region\n');

const mappingsByRegion = {};
Object.entries(COUNTRY_MAPPINGS).forEach(([prefix, info]) => {
  if (!mappingsByRegion[info.region]) {
    mappingsByRegion[info.region] = [];
  }
  mappingsByRegion[info.region].push({ prefix, country: info.country });
});

Object.entries(mappingsByRegion).forEach(([region, countries]) => {
  console.log(`${region}:`);
  countries.slice(0, 5).forEach(({ prefix, country }) => {
    console.log(`  ${prefix} → ${country}`);
  });
  if (countries.length > 5) {
    console.log(`  ... and ${countries.length - 5} more`);
  }
  console.log('');
});

// Example 3: Demonstrate tagging suggestions
console.log('🏷️  Example 3: Tagging Strategies\n');

const tagExamples = [
  { filename: 'DSCF1234.jpg', tags: ['egypt', 'travel'], expected: 'Egypt' },
  { filename: '03-15-sunset.jpg', tags: ['jordan', 'petra'], expected: 'Jordan' },
  { filename: 'IMG_5678.jpg', tags: ['italy', 'rome'], expected: 'Italy' },
  { filename: 'random-name.jpg', tags: ['untagged'], expected: 'Unassigned' }
];

tagExamples.forEach(({ filename, tags, expected }) => {
  const countryInfo = extractCountryInfo(filename, tags);
  const result = countryInfo ? countryInfo.country : 'Unassigned';
  const status = result === expected ? '✅' : '❌';
  console.log(`${status} ${filename} + [${tags.join(', ')}] → ${result}`);
});

// Example 4: Show what the generated data looks like
console.log('\n📁 Example 4: Generated Data Structure\n');

const exampleAlbumData = {
  region: "Asia",
  country: "Japan",
  slug: "japan",
  images: [
    {
      desktop: "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620619/JAP-3265.jpg",
      mobile: "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620619/JAP-3265.jpg"
    },
    {
      desktop: "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620800/JAP-cherry-blossoms.jpg", 
      mobile: "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620800/JAP-cherry-blossoms.jpg"
    }
  ]
};

console.log('Sample album structure:');
console.log(JSON.stringify(exampleAlbumData, null, 2));

// Example 5: Command usage examples
console.log('\n⚡ Example 5: Common Command Workflows\n');

console.log('📋 Typical workflow for new setup:');
console.log('1. npm run portfolio:fetch     # Initial fetch from Cloudinary');
console.log('2. npm run portfolio:analyze   # Review what was found');
console.log('3. npm run portfolio:audit     # Check for issues');
console.log('4. npm run portfolio:tag       # Get tagging suggestions');
console.log('5. [Fix issues in Cloudinary]');
console.log('6. npm run portfolio:fetch     # Re-fetch after fixes\n');

console.log('📋 Typical workflow for maintenance:');
console.log('1. npm run portfolio:update    # Add new images');
console.log('2. npm run portfolio:analyze   # Check updated stats'); 
console.log('3. npm run build              # Build website with new data\n');

// Example 6: Show expected file outputs
console.log('📄 Example 6: Generated Files\n');

console.log('Files created by the system:');
console.log('├── src/lib/cloudinaryAlbums.ts        # Main portfolio data');
console.log('├── cloudinary-fetch-report.json       # Debug information');
console.log('└── PORTFOLIO_MANAGEMENT.md           # Documentation\n');

console.log('TypeScript interface compatibility:');
console.log('- Matches existing CountryAlbum interface');
console.log('- Compatible with current Gallery components');
console.log('- Maintains URL structure for images\n');

console.log('🚀 Ready to get started? Run: npm run portfolio:fetch\n');

console.log('💡 Pro Tips:');
console.log('- Set up your .env file with Cloudinary credentials first');
console.log('- Use consistent filename prefixes for best results');
console.log('- Tag images in Cloudinary for better organization');
console.log('- Run audit regularly to maintain portfolio health');
console.log('- Check unassigned images and improve mappings over time\n');

// Example of analyzing current portfolio if it exists
console.log('📊 Current Portfolio Analysis:\n');
try {
  await analyzePortfolio();
} catch (error) {
  console.log('ℹ️  No existing portfolio found. Run npm run portfolio:fetch to create one.\n');
}

console.log('✅ Example complete! Check PORTFOLIO_MANAGEMENT.md for full documentation.');