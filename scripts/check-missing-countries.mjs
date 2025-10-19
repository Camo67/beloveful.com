#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_PATH = path.join(__dirname, '../src/lib/data.ts');
const PUBLIC_PATH = path.join(__dirname, '../public/Website beloveful.com');

// Read data.ts and extract countries
const content = fs.readFileSync(DATA_PATH, 'utf8');
const albumPattern = /\{\s*"region":\s*"([^"]+)",\s*"country":\s*"([^"]+)",\s*"slug":\s*"([^"]+)"/g;

const portfolioCountries = new Map();
let match;

while ((match = albumPattern.exec(content)) !== null) {
  const [, region, country, slug] = match;
  portfolioCountries.set(country, { region, slug });
}

console.log(`📊 Portfolio currently has ${portfolioCountries.size} countries/albums\n`);

// Map public folder names to expected regions
const publicFolders = {
  'Africa': [
    'Egypt',
    'Ethiopia', 
    'Morocco',
    'Namibia',
    'South Africa'
  ],
  'Asia': [
    'Hong Kong',
    'India',
    'Japan',
    'Myanmar',
    'Nepal',
    'Phil', // Philippines?
    'Thailand',
    'Vietnam'
  ],
  'Europe': [
    'France',
    'Greece',
    'Italy',
    'Portugal',
    'Spain',
    'UK & Ireland'
  ],
  'Middle East': [
    'Israel | Palestine',
    'Jordan'
  ],
  'North America': [
    'California',
    'Chicago',
    'New York',
    'Texas'
  ],
  'Oceania': [
    'Australia',
    'New Zealand'
  ],
  'South America': [
    'Argentina',
    'Brazil'
  ],
  'Central America & Caribbean': [
    'Caribbean',
    'Cuba',
    'Mexico',
    'Puerto Rico'
  ]
};

// Check for missing countries
const missing = [];
const present = [];

Object.entries(publicFolders).forEach(([region, countries]) => {
  countries.forEach(country => {
    if (portfolioCountries.has(country)) {
      present.push({ region, country });
    } else {
      missing.push({ region, country });
    }
  });
});

if (missing.length === 0) {
  console.log('✅ All countries from public folder are in the portfolio!\n');
} else {
  console.log(`❌ Missing ${missing.length} countries from portfolio:\n`);
  
  const byRegion = {};
  missing.forEach(({ region, country }) => {
    if (!byRegion[region]) byRegion[region] = [];
    byRegion[region].push(country);
  });
  
  Object.entries(byRegion).forEach(([region, countries]) => {
    console.log(`  ${region}:`);
    countries.forEach(country => {
      const folderPath = path.join(PUBLIC_PATH, 
        region === 'Europe' ? 'Europe & Scandinavia' : 
        region === 'Central America & Caribbean' ? 'Central America & Caribbean' : 
        region, country);
      const exists = fs.existsSync(folderPath);
      const hasImages = exists ? fs.readdirSync(folderPath).filter(f => /\.(jpg|png|jpeg)$/i.test(f)).length : 0;
      console.log(`    - ${country} ${exists ? `(${hasImages} images)` : '(folder not found)'}`);
    });
  });
}

console.log(`\n📈 Summary:`);
console.log(`   In portfolio: ${present.length}`);
console.log(`   Missing: ${missing.length}`);
console.log(`   Total expected: ${present.length + missing.length}`);

// Check for extra items in portfolio not in public
console.log(`\n🔍 Checking for portfolio items not in public folder...\n`);
const allPublicCountries = new Set(
  Object.values(publicFolders).flat()
);

const extras = [];
portfolioCountries.forEach((data, country) => {
  if (!allPublicCountries.has(country) && data.region !== 'Logo' && data.region !== 'Erasing Borders') {
    extras.push(country);
  }
});

if (extras.length > 0) {
  console.log(`⚠️  Found ${extras.length} countries in portfolio but not in public folder:`);
  extras.forEach(country => {
    console.log(`   - ${country}`);
  });
} else {
  console.log('✅ No extra countries in portfolio');
}
