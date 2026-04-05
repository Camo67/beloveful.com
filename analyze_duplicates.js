import fs from 'fs';

// Read the JSON file
const data = JSON.parse(fs.readFileSync('./cloudinary-images.json', 'utf8'));

console.log('=== CLOUDINARY IMAGES ANALYSIS ===\n');

// Get all assigned images
const assignedImages = [];
data.countries.forEach(country => {
  country.images.forEach(img => {
    assignedImages.push({
      filename: img.filename,
      url: img.url || img.desktop,
      country: country.country,
      region: country.region
    });
  });
});

// Get all unassigned images
const unassignedImages = data.unassigned || [];

console.log(`Total Images: ${data.totalImages}`);
console.log(`Assigned Images: ${assignedImages.length}`);
console.log(`Unassigned Images: ${unassignedImages.length}\n`);

// Analyze unassigned images for duplicates
console.log('=== ANALYZING UNASSIGNED IMAGES ===\n');

// Group by base filename (without Cloudinary suffix)
const baseNames = new Map();
const thumbnails = [];
const uniqueImages = [];

unassignedImages.forEach(img => {
  const filename = img.filename;
  
  // Check if it's a thumbnail (has ngg0dyn in name or small dimensions like 120x90, 180x0)
  if (filename.includes('ngg0dyn') || filename.includes('-120x90-') || filename.includes('-180x0-')) {
    thumbnails.push(img);
    return;
  }
  
  // Extract base name (remove Cloudinary ID suffix like _abc123)
  const baseName = filename.replace(/_[a-z0-9]{6,}$/, '');
  
  if (!baseNames.has(baseName)) {
    baseNames.set(baseName, []);
  }
  baseNames.get(baseName).push(img);
});

// Find truly unique images (no duplicates by base name)
baseNames.forEach((images, baseName) => {
  if (images.length === 1) {
    uniqueImages.push(images[0]);
  }
});

console.log(`Thumbnails/Resized versions: ${thumbnails.length}`);
console.log(`Duplicate base names: ${Array.from(baseNames.values()).filter(arr => arr.length > 1).length}`);
console.log(`Unique unassigned images: ${uniqueImages.length}\n`);

// Check if any unassigned images are already in assigned list
const assignedFilenames = new Set(assignedImages.map(img => img.filename));
const assignedBaseNames = new Set(assignedImages.map(img => img.filename.replace(/_[a-z0-9]{6,}$/, '')));

let alreadyAssignedCount = 0;
let newUniqueImages = [];

uniqueImages.forEach(img => {
  const baseName = img.filename.replace(/_[a-z0-9]{6,}$/, '');
  
  if (assignedFilenames.has(img.filename) || assignedBaseNames.has(baseName)) {
    alreadyAssignedCount++;
  } else {
    newUniqueImages.push(img);
  }
});

console.log(`Already assigned (different version): ${alreadyAssignedCount}`);
console.log(`Truly new unique images: ${newUniqueImages.length}\n`);

// Analyze by country/region codes
console.log('=== BREAKDOWN BY COUNTRY CODES ===\n');
const countryCodes = new Map();

newUniqueImages.forEach(img => {
  // Extract country code from filename (first 3 letters usually)
  const match = img.filename.match(/^([A-Z]{2,4})-/);
  const countryCode = match ? match[1] : 'UNKNOWN';
  
  if (!countryCodes.has(countryCode)) {
    countryCodes.set(countryCode, []);
  }
  countryCodes.get(countryCode).push(img);
});

// Sort by count
const sortedCodes = Array.from(countryCodes.entries()).sort((a, b) => b[1].length - a[1].length);

sortedCodes.forEach(([code, images]) => {
  console.log(`${code}: ${images.length} images`);
});

console.log('\n=== SAMPLE NEW UNIQUE IMAGES ===\n');
newUniqueImages.slice(0, 20).forEach(img => {
  console.log(`${img.filename}`);
});

if (newUniqueImages.length > 20) {
  console.log(`... and ${newUniqueImages.length - 20} more`);
}

// Save results
fs.writeFileSync('./unique_unassigned_images.json', JSON.stringify(newUniqueImages, null, 2));
console.log(`\nSaved ${newUniqueImages.length} unique unassigned images to unique_unassigned_images.json`);