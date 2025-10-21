#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read the cloudinary URLs JSON
const urls = JSON.parse(
  readFileSync(join(__dirname, '..', 'src', 'lib', 'cloudinary-urls.json'), 'utf-8')
);

// Filter for Workshop Photos
const workshopPhotos = urls.filter(url => 
  url.includes('/Workshop%20Photos/') || url.includes('/Workshop Photos/')
);

console.log(`Found ${workshopPhotos.length} workshop photos`);

// Create workshop images data with both desktop and mobile (same URL for now)
const workshopImages = workshopPhotos.map(url => ({
  desktop: url,
  mobile: url
}));

// Create the output object
const output = {
  success: true,
  chicagoPrivate: workshopImages.slice(0, Math.ceil(workshopImages.length / 4)),
  chicagoGroup: workshopImages.slice(Math.ceil(workshopImages.length / 4), Math.ceil(workshopImages.length / 2)),
  online: workshopImages.slice(Math.ceil(workshopImages.length / 2), Math.ceil(workshopImages.length * 3 / 4)),
  mentorship: workshopImages.slice(Math.ceil(workshopImages.length * 3 / 4))
};

// Write to TypeScript file
const tsContent = `// Auto-generated workshop images from Cloudinary
// Generated on ${new Date().toISOString()}

export interface WorkshopImage {
  desktop: string;
  mobile: string;
}

export interface WorkshopImagesData {
  success: boolean;
  chicagoPrivate: WorkshopImage[];
  chicagoGroup: WorkshopImage[];
  online: WorkshopImage[];
  mentorship: WorkshopImage[];
}

export const WORKSHOP_IMAGES: WorkshopImagesData = ${JSON.stringify(output, null, 2)};
`;

writeFileSync(join(__dirname, '..', 'src', 'lib', 'workshopImages.ts'), tsContent);

console.log('✅ Generated workshop images data file');
console.log(`   - Chicago Private: ${output.chicagoPrivate.length} images`);
console.log(`   - Chicago Group: ${output.chicagoGroup.length} images`);
console.log(`   - Online: ${output.online.length} images`);
console.log(`   - Mentorship: ${output.mentorship.length} images`);
