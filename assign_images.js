import fs from 'fs';

// Read the existing data
const data = JSON.parse(fs.readFileSync('./cloudinary-images.json', 'utf8'));
const uniqueImages = JSON.parse(fs.readFileSync('./unique_unassigned_images.json', 'utf8'));

console.log('=== AUTOMATIC IMAGE ASSIGNMENT ===\n');

// Define country/region mapping rules
const assignmentRules = {
  // Country code patterns (first priority)
  countryCodeRules: {
    'EGY': { region: 'Africa', country: 'Egypt', slug: 'egypt' },
    'ETH': { region: 'Africa', country: 'Ethiopia', slug: 'ethiopia' },
    'NAM': { region: 'Africa', country: 'Namibia', slug: 'namibia' },
    'HK': { region: 'Asia', country: 'Hong Kong', slug: 'hong-kong' },
    'IND': { region: 'Asia', country: 'India', slug: 'india' },
    'JAP': { region: 'Asia', country: 'Japan', slug: 'japan' },
    'MYA': { region: 'Asia', country: 'Myanmar', slug: 'myanmar' },
    'NEP': { region: 'Asia', country: 'Nepal', slug: 'nepal' },
    'PHI': { region: 'Asia', country: 'Philippines', slug: 'philippines' },
    'THAI': { region: 'Asia', country: 'Thailand', slug: 'thailand' },
    'THA': { region: 'Asia', country: 'Thailand', slug: 'thailand' },
    'VIET': { region: 'Asia', country: 'Vietnam', slug: 'vietnam' },
    'PAL': { region: 'Middle East', country: 'Israel_Palestine', slug: 'israel-palestine' },
    'ISR': { region: 'Middle East', country: 'Israel_Palestine', slug: 'israel-palestine' },
    'JOR': { region: 'Middle East', country: 'Jordan', slug: 'jordan' },
    'JDN': { region: 'Middle East', country: 'Jordan', slug: 'jordan' },
    'ARG': { region: 'South America', country: 'Argentina', slug: 'argentina' },
    'CHI': { region: 'North America', country: 'Chicago', slug: 'chicago' },
    'ITA': { region: 'Europe', country: 'Italy', slug: 'italy' },
    'FRA': { region: 'Europe', country: 'France', slug: 'france' },
    'MEX': { region: 'North America', country: 'Mexico', slug: 'mexico' },
    'SA': { region: 'Middle East', country: 'Saudi Arabia', slug: 'saudi-arabia' },
    'CAR': { region: 'North America', country: 'Caribbean', slug: 'caribbean' },
    'PR': { region: 'North America', country: 'Puerto Rico', slug: 'puerto-rico' },
    'MOR': { region: 'Africa', country: 'Morocco', slug: 'morocco' },
    'STM': { region: 'North America', country: 'St. Martin', slug: 'st-martin' }
  },
  
  // Folder path rules (second priority)
  folderRules: {
    'Website beloveful.com/Middle East/Jordan': { region: 'Middle East', country: 'Jordan', slug: 'jordan' },
    'Website beloveful.com/Middle East/Israel | Palestine': { region: 'Middle East', country: 'Israel_Palestine', slug: 'israel-palestine' },
    'Website beloveful.com/Asia/India': { region: 'Asia', country: 'India', slug: 'india' },
    'Website beloveful.com/Asia/Thailand': { region: 'Asia', country: 'Thailand', slug: 'thailand' },
    'Website beloveful.com/Asia/Vietnam': { region: 'Asia', country: 'Vietnam', slug: 'vietnam' },
    'Website beloveful.com/Asia/Hong Kong': { region: 'Asia', country: 'Hong Kong', slug: 'hong-kong' },
    'Website beloveful.com/Asia/Japan': { region: 'Asia', country: 'Japan', slug: 'japan' },
    'Website beloveful.com/Asia/Myanmar': { region: 'Asia', country: 'Myanmar', slug: 'myanmar' },
    'Website beloveful.com/Asia/Nepal': { region: 'Asia', country: 'Nepal', slug: 'nepal' },
    'Website beloveful.com/Asia/Philippines': { region: 'Asia', country: 'Philippines', slug: 'philippines' },
    'Website beloveful.com/Africa/Egypt': { region: 'Africa', country: 'Egypt', slug: 'egypt' },
    'Website beloveful.com/Africa/Ethiopia': { region: 'Africa', country: 'Ethiopia', slug: 'ethiopia' },
    'Website beloveful.com/Africa/Namibia': { region: 'Africa', country: 'Namibia', slug: 'namibia' },
    'Website beloveful.com/Africa/Morocco': { region: 'Africa', country: 'Morocco', slug: 'morocco' },
    'Website beloveful.com/Europe/Italy': { region: 'Europe', country: 'Italy', slug: 'italy' },
    'Website beloveful.com/Europe/France': { region: 'Europe', country: 'France', slug: 'france' },
    'Website beloveful.com/North America/Chicago': { region: 'North America', country: 'Chicago', slug: 'chicago' },
    'Website beloveful.com/North America/Mexico': { region: 'North America', country: 'Mexico', slug: 'mexico' },
    'Website beloveful.com/South America/Argentina': { region: 'South America', country: 'Argentina', slug: 'argentina' }
  },
  
  // Content pattern rules (third priority)
  contentRules: {
    'Vietnam-': { region: 'Asia', country: 'Vietnam', slug: 'vietnam' },
    'NyC-': { region: 'North America', country: 'New York', slug: 'new-york' },
    'NYC-': { region: 'North America', country: 'New York', slug: 'new-york' },
    'India-': { region: 'Asia', country: 'India', slug: 'india' },
    'Thailand-': { region: 'Asia', country: 'Thailand', slug: 'thailand' },
    'Jordan-': { region: 'Middle East', country: 'Jordan', slug: 'jordan' },
    'Egypt-': { region: 'Africa', country: 'Egypt', slug: 'egypt' },
    'Japan-': { region: 'Asia', country: 'Japan', slug: 'japan' },
    'Italy-': { region: 'Europe', country: 'Italy', slug: 'italy' },
    'France-': { region: 'Europe', country: 'France', slug: 'france' },
    'Argentina-': { region: 'South America', country: 'Argentina', slug: 'argentina' },
    'Chicago-': { region: 'North America', country: 'Chicago', slug: 'chicago' }
  }
};

// Function to assign image based on rules
function assignImage(image) {
  const filename = image.filename;
  
  // Check country code rules first
  const countryCodeMatch = filename.match(/^([A-Z]{2,4})-/);
  if (countryCodeMatch) {
    const code = countryCodeMatch[1];
    if (assignmentRules.countryCodeRules[code]) {
      return assignmentRules.countryCodeRules[code];
    }
  }
  
  // Check folder path rules
  for (const [folderPath, assignment] of Object.entries(assignmentRules.folderRules)) {
    if (filename.startsWith(folderPath)) {
      return assignment;
    }
  }
  
  // Check content pattern rules
  for (const [pattern, assignment] of Object.entries(assignmentRules.contentRules)) {
    if (filename.includes(pattern)) {
      return assignment;
    }
  }
  
  return null; // No assignment found
}

// Process all unique images
const assignments = new Map();
const nonPhotographyImages = [];
let assignedCount = 0;
let unassignedCount = 0;

uniqueImages.forEach(image => {
  const filename = image.filename;
  
  // Skip non-photography content
  if (filename.includes('Logo/') || 
      filename.includes('Netflix_') || 
      filename.includes('Hard_Rock_') ||
      filename.includes('mediakit_') ||
      filename.includes('favicon') ||
      filename.includes('beloveful-logo') ||
      filename.includes('about-hero') ||
      filename.includes('workshop-hero') ||
      filename.includes('tony-hero')) {
    nonPhotographyImages.push(image);
    return;
  }
  
  const assignment = assignImage(image);
  
  if (assignment) {
    const key = `${assignment.region}|${assignment.country}|${assignment.slug}`;
    
    if (!assignments.has(key)) {
      assignments.set(key, {
        region: assignment.region,
        country: assignment.country,
        slug: assignment.slug,
        images: []
      });
    }
    
    // Convert to the expected format with metadata
    const assignedImage = {
      desktop: image.url,
      mobile: image.url,
      filename: image.filename,
      width: 1440, // Default width, will need proper metadata later
      height: 960  // Default height, will need proper metadata later
    };
    
    assignments.get(key).images.push(assignedImage);
    assignedCount++;
  } else {
    unassignedCount++;
  }
});

console.log(`Processed ${uniqueImages.length} unique images:`);
console.log(`- Successfully assigned: ${assignedCount}`);
console.log(`- Non-photography (logos, etc.): ${nonPhotographyImages.length}`);
console.log(`- Still unassigned: ${unassignedCount}\n`);

// Create updated data structure
const updatedData = { ...data };

// Add assigned images to existing countries or create new ones
assignments.forEach((assignment, key) => {
  const existingCountryIndex = updatedData.countries.findIndex(
    country => country.region === assignment.region && 
               country.country === assignment.country
  );
  
  if (existingCountryIndex !== -1) {
    // Add to existing country
    console.log(`Adding ${assignment.images.length} images to existing ${assignment.country}`);
    updatedData.countries[existingCountryIndex].images.push(...assignment.images);
  } else {
    // Create new country entry
    console.log(`Creating new country: ${assignment.country} with ${assignment.images.length} images`);
    updatedData.countries.push({
      region: assignment.region,
      country: assignment.country,
      slug: assignment.slug,
      images: assignment.images
    });
  }
});

// Update the unassigned list (remove assigned images and keep truly unassigned ones)
const stillUnassigned = uniqueImages.filter(image => {
  const assignment = assignImage(image);
  const isNonPhotography = nonPhotographyImages.some(np => np.filename === image.filename);
  return !assignment && !isNonPhotography;
});

updatedData.unassigned = stillUnassigned;
updatedData.assignedImages = data.assignedImages + assignedCount;

console.log(`\n=== ASSIGNMENT SUMMARY ===`);
console.log(`Total countries/regions: ${updatedData.countries.length}`);
console.log(`Total assigned images: ${updatedData.assignedImages}`);
console.log(`Remaining unassigned: ${stillUnassigned.length}`);

// Show assignment breakdown
console.log(`\n=== NEW ASSIGNMENTS ===`);
const sortedAssignments = Array.from(assignments.entries()).sort((a, b) => b[1].images.length - a[1].images.length);
sortedAssignments.forEach(([key, assignment]) => {
  console.log(`${assignment.region} > ${assignment.country}: +${assignment.images.length} images`);
});

// Save updated data
fs.writeFileSync('./cloudinary-images-updated.json', JSON.stringify(updatedData, null, 2));
console.log(`\nSaved updated data to cloudinary-images-updated.json`);

// Save assignment summary
const summary = {
  totalProcessed: uniqueImages.length,
  assigned: assignedCount,
  nonPhotography: nonPhotographyImages.length,
  stillUnassigned: unassignedCount,
  assignments: Object.fromEntries(
    Array.from(assignments.entries()).map(([key, value]) => [
      key, { ...value, imageCount: value.images.length, images: undefined }
    ])
  )
};

fs.writeFileSync('./assignment_summary.json', JSON.stringify(summary, null, 2));
console.log(`Saved assignment summary to assignment_summary.json`);