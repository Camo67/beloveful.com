import fs from 'fs';

const uniqueImages = JSON.parse(fs.readFileSync('./unique_unassigned_images.json', 'utf8'));

console.log('=== ANALYZING UNKNOWN CATEGORY IMAGES ===\n');

const unknownImages = uniqueImages.filter(img => !img.filename.match(/^([A-Z]{2,4})-/));

console.log(`Total unknown images: ${unknownImages.length}\n`);

// Analyze patterns in unknown filenames
const patterns = new Map();

unknownImages.forEach(img => {
  const filename = img.filename;
  
  // Check for common patterns
  if (filename.startsWith('Website beloveful.com/')) {
    const pathParts = filename.split('/');
    if (pathParts.length >= 4) {
      const region = pathParts[1];
      const country = pathParts[2];
      const key = `${region}/${country}`;
      
      if (!patterns.has(key)) {
        patterns.set(key, []);
      }
      patterns.get(key).push(img);
    } else {
      if (!patterns.has('Website Root')) {
        patterns.set('Website Root', []);
      }
      patterns.get('Website Root').push(img);
    }
  } else {
    // Check for other patterns
    let foundPattern = false;
    
    if (filename.includes('DSCF') || filename.includes('DSC_')) {
      if (!patterns.has('Camera Files (DSCF/DSC)')) {
        patterns.set('Camera Files (DSCF/DSC)', []);
      }
      patterns.get('Camera Files (DSCF/DSC)').push(img);
      foundPattern = true;
    }
    
    if (filename.includes('IMG_')) {
      if (!patterns.has('Phone/Generic (IMG)')) {
        patterns.set('Phone/Generic (IMG)', []);
      }
      patterns.get('Phone/Generic (IMG)').push(img);
      foundPattern = true;
    }
    
    if (!foundPattern) {
      if (!patterns.has('Other Patterns')) {
        patterns.set('Other Patterns', []);
      }
      patterns.get('Other Patterns').push(img);
    }
  }
});

// Sort by count
const sortedPatterns = Array.from(patterns.entries()).sort((a, b) => b[1].length - a[1].length);

console.log('=== BREAKDOWN BY PATTERN ===\n');
sortedPatterns.forEach(([pattern, images]) => {
  console.log(`${pattern}: ${images.length} images`);
  
  // Show a few samples
  if (images.length > 0) {
    console.log('  Samples:');
    images.slice(0, 3).forEach(img => {
      console.log(`    ${img.filename}`);
    });
    if (images.length > 3) {
      console.log(`    ... and ${images.length - 3} more`);
    }
    console.log('');
  }
});

// Save breakdown
const breakdown = {};
sortedPatterns.forEach(([pattern, images]) => {
  breakdown[pattern] = {
    count: images.length,
    samples: images.slice(0, 5).map(img => ({
      filename: img.filename,
      url: img.url
    }))
  };
});

fs.writeFileSync('./unassigned_breakdown.json', JSON.stringify(breakdown, null, 2));
console.log(`Saved breakdown to unassigned_breakdown.json`);