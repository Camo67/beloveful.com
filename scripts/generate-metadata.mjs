import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');
const publicRoot = path.join(repoRoot, 'public');
const libraryDir = 'Website beloveful.com';
const fullLibraryPath = path.join(publicRoot, libraryDir);

const REGIONS = [
  "Africa",
  "Asia",
  "Central America & Caribbean",
  "Middle East",
  "South America",
  "North America",
  "Europe & Scandinavia",
  "Europe",
  "Oceania",
  "Erasing Borders"
];

async function generate() {
  console.log('🔍 Generating metadata from:', fullLibraryPath);
  
  const albums = [];
  const slideshowImages = [];

  try {
    const regionDirs = await fs.readdir(fullLibraryPath);
    
    for (const region of regionDirs) {
      if (!REGIONS.includes(region)) continue;
      
      const regionPath = path.join(fullLibraryPath, region);
      const stat = await fs.stat(regionPath);
      if (!stat.isDirectory()) continue;

      const countryDirs = await fs.readdir(regionPath);
      for (const country of countryDirs) {
        const countryPath = path.join(regionPath, country);
        const countryStat = await fs.stat(countryPath);
        if (!countryStat.isDirectory()) continue;

        const images = [];
        const files = await fs.readdir(countryPath);
        
        for (const file of files) {
          if (!/\.(jpg|jpeg|png|webp)$/i.test(file)) continue;
          
          const relativePath = `/${libraryDir}/${region}/${country}/${file}`;
          images.push({
            desktop: relativePath,
            mobile: relativePath
          });
        }

        if (images.length > 0) {
          albums.push({
            region,
            country,
            slug: country.toLowerCase().replace(/[^a-z0-9]/g, '-'),
            images
          });
        }
      }
    }

    // Generate Home Slideshow (mocked or extracted from a specific folder)
    // For now, let's look for a 'Slideshow' folder in the root of the library
    const slideshowPath = path.join(fullLibraryPath, 'Slideshow');
    try {
      const slideshowFiles = await fs.readdir(slideshowPath);
      for (const file of slideshowFiles) {
        if (!/\.(jpg|jpeg|png|webp)$/i.test(file)) continue;
        slideshowImages.push({
          desktop: `/${libraryDir}/Slideshow/${file}`,
          mobile: `/${libraryDir}/Slideshow/${file}`
        });
      }
    } catch {
      // No slideshow folder, fallback to first few images of featured albums
      console.log('⚠️ No Slideshow folder found, using fallback.');
    }

    const content = `// AUTO-GENERATED FILE. Do not edit by hand.
// Generated from ${libraryDir}
import type { CountryAlbum, SlideshowImage } from './data';

export const GENERATED_ALBUMS: CountryAlbum[] = ${JSON.stringify(albums, null, 2)};

export const GENERATED_HOME_SLIDESHOW: SlideshowImage[] = ${JSON.stringify(slideshowImages, null, 2)};
`;

    const outputPath = path.join(repoRoot, 'src', 'lib', 'generatedAlbums.ts');
    await fs.writeFile(outputPath, content);
    console.log('✅ Metadata generated successfully at:', outputPath);

  } catch (err) {
    console.error('❌ Metadata generation failed:', err);
  }
}

generate();
