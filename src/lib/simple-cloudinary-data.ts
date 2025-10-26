import prefixMappedData from './cloudinary-assets/prefix-mapped.json';
import { SimpleCountryAlbum, SimpleWork, SimpleSlideshowImage, Region } from './simple-data';
import { fixImageUrl, createFallbackImage } from './simple-image-utils';

/**
 * Load and transform data from prefix-mapped.json for use with the simple image system
 */

// Function to group prefix-mapped data by region and country for simple system
function loadSimpleAlbumsFromPrefixMapped(): SimpleCountryAlbum[] {
  console.log('📂 Loading simple albums from prefix-mapped data');
  const albums: SimpleCountryAlbum[] = [];
  
  // Process matched regions
  if (prefixMappedData && (prefixMappedData as any).matched) {
    console.log('📂 Matched data found');
    Object.entries((prefixMappedData as any).matched).forEach(([regionName, regionData]) => {
      console.log('📂 Processing region:', regionName);
      Object.entries(regionData as any).forEach(([countryName, countryImages]) => {
        console.log('📂 Processing country:', countryName, 'with', (countryImages as any[]).length, 'images');
        const slug = countryName.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
        
        const album: SimpleCountryAlbum = {
          region: regionName as Region,
          country: countryName,
          slug,
          title: countryName,
          images: (countryImages as any[]).map((image: any) => ({
            desktop: fixImageUrl(image.url),
            mobile: fixImageUrl(image.url)
          })).filter(image => image.desktop && image.mobile) // Filter out any invalid URLs
        };
        
        // Only add album if it has images
        if (album.images.length > 0) {
          albums.push(album);
        } else {
          console.warn(`⚠️ Skipping album ${countryName} - no valid images`);
        }
      });
    });
  }
  
  console.log('📂 Total simple albums created:', albums.length);
  return albums;
}

// Function to create projects from prefix-mapped data for simple system
function loadSimpleProjectsFromPrefixMapped(): SimpleWork[] {
  console.log('📄 Creating simple projects from prefix-mapped data');
  const projects: SimpleWork[] = [];
  
  // Create a project for Erasing Borders from matched data
  if (prefixMappedData && (prefixMappedData as any).matched) {
    console.log('📄 Matched data found for projects');
    const erasingBordersImages: any[] = [];
    
    // Collect images that might belong to Erasing Borders project
    Object.values((prefixMappedData as any).matched).forEach((region: any) => {
      Object.values(region).forEach((cityImages: any) => {
        (cityImages as any[]).forEach((image: any) => {
          // Include images that might be part of the Erasing Borders project
          if (image.filename && (
            image.filename.includes('CHI-') || 
            image.filename.includes('DSCF') ||
            image.filename.includes('beloveful')
          )) {
            const fixedUrl = fixImageUrl(image.url);
            if (fixedUrl) {
              erasingBordersImages.push({
                desktop: fixedUrl,
                mobile: fixedUrl
              });
            }
          }
        });
      });
    });
    
    console.log('📄 Erasing Borders images found:', erasingBordersImages.length);
    
    if (erasingBordersImages.length > 0) {
      projects.push({
        title: "Erasing Borders",
        slug: "erasing-borders",
        description: "A humanist photography project connecting experiences across borders.",
        region: "Erasing Borders" as Region,
        featured: true,
        images: erasingBordersImages
      });
    } else {
      console.warn('⚠️ No images found for Erasing Borders project');
      // Add fallback image
      projects.push({
        title: "Erasing Borders",
        slug: "erasing-borders",
        description: "A humanist photography project connecting experiences across borders.",
        region: "Erasing Borders" as Region,
        featured: true,
        images: [createFallbackImage()]
      });
    }
  }
  
  console.log('📄 Total simple projects created:', projects.length);
  return projects;
}

// Transform prefix-mapped data to slideshow images for simple system
const loadSimpleSlideshowFromPrefixMapped = (): SimpleSlideshowImage[] => {
  console.log('🖼️ Transforming prefix-mapped data to simple slideshow images');
  const images: SimpleSlideshowImage[] = [];
  
  // Get images from matched regions
  if (prefixMappedData && (prefixMappedData as any).matched) {
    console.log('🖼️ Matched data found for slideshow');
    Object.values((prefixMappedData as any).matched).forEach((region: any) => {
      Object.values(region).forEach((cityImages: any) => {
        (cityImages as any[]).slice(0, 5).forEach((image: any) => { // Take first 5 images from each city
          const fixedUrl = fixImageUrl(image.url);
          if (fixedUrl) {
            images.push({
              desktop: fixedUrl,
              mobile: fixedUrl
            });
          }
        });
      });
    });
  }
  
  console.log('🖼️ Images from matched regions:', images.length);
  
  // Add some images from unknown if we don't have enough
  if (prefixMappedData && (prefixMappedData as any).unknown && images.length < 20) {
    console.log('🖼️ Adding images from unknown section');
    (prefixMappedData as any).unknown.slice(0, 20 - images.length).forEach((image: any) => {
      const fixedUrl = fixImageUrl(image.url);
      if (fixedUrl) {
        images.push({
          desktop: fixedUrl,
          mobile: fixedUrl
        });
      }
    });
  }
  
  // Add fallback images if we don't have enough
  while (images.length < 5) {
    console.warn(`⚠️ Adding fallback image. Current count: ${images.length}`);
    images.push(createFallbackImage());
  }
  
  console.log('🖼️ Total simple slideshow images:', images.length);
  return images;
};

// Export the loaded data
export const SIMPLE_ALBUMS_FROM_CLOUDINARY: SimpleCountryAlbum[] = loadSimpleAlbumsFromPrefixMapped();
export const SIMPLE_PROJECTS_FROM_CLOUDINARY: SimpleWork[] = loadSimpleProjectsFromPrefixMapped();
export const SIMPLE_SLIDESHOW_FROM_CLOUDINARY: SimpleSlideshowImage[] = loadSimpleSlideshowFromPrefixMapped();

// Export utility functions
export const getSimpleAlbumBySlugFromCloudinary = (slug: string): SimpleCountryAlbum | undefined => {
  return SIMPLE_ALBUMS_FROM_CLOUDINARY.find(album => album.slug === slug);
};

export const getSimpleAlbumsByRegionFromCloudinary = (region: Region): SimpleCountryAlbum[] => {
  return SIMPLE_ALBUMS_FROM_CLOUDINARY.filter(album => album.region === region);
};

export const getAllSimpleAlbumsSortedFromCloudinary = (): SimpleCountryAlbum[] => {
  return [...SIMPLE_ALBUMS_FROM_CLOUDINARY].sort((a, b) => a.country.localeCompare(b.country));
};

export const getSimpleProjectBySlugFromCloudinary = (slug: string): SimpleWork | undefined => {
  return SIMPLE_PROJECTS_FROM_CLOUDINARY.find(project => project.slug === slug);
};