import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Create __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to collect all workshop image data
function collectWorkshopImages(baseDir) {
  const allImages = [];
  
  // Function to recursively walk through directories
  function walkDir(dir) {
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        // Check if this directory contains a urls.json file
        const urlsJsonPath = path.join(fullPath, 'urls.json');
        if (fs.existsSync(urlsJsonPath)) {
          try {
            const imageData = JSON.parse(fs.readFileSync(urlsJsonPath, 'utf8'));
            allImages.push(...imageData);
          } catch (error) {
            console.error(`Error reading ${urlsJsonPath}:`, error);
          }
        }
        
        // Recursively walk subdirectories
        walkDir(fullPath);
      } else if (item === 'workshopurls.json') {
        // Handle the workshopurls.json file specifically
        try {
          const imageData = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
          allImages.push(...imageData);
        } catch (error) {
          console.error(`Error reading ${fullPath}:`, error);
        }
      }
    }
  }
  
  walkDir(baseDir);
  return allImages;
}

// Main execution
const workshopDir = path.join(__dirname, '..', 'src', 'lib', 'cloudinary-assets', 'Workshop Photos');
const allWorkshopImages = collectWorkshopImages(workshopDir);

// Write to a JSON file
const outputPath = path.join(__dirname, '..', 'src', 'lib', 'cloudinary-assets', 'all-workshop-images.json');
fs.writeFileSync(outputPath, JSON.stringify(allWorkshopImages, null, 2));

console.log(`Collected ${allWorkshopImages.length} workshop images`);
console.log(`Data written to ${outputPath}`);