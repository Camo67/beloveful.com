import indexData from './cloudinary-assets/index.json';
import allUrls from './cloudinary-assets/public/Website beloveful.com/urls.json';

/**
 * Comprehensive image data system that organizes all images by folder structure
 */

// Define types for our data structures
export interface ImageAsset {
  filename: string;
  url: string;
  format: string;
  width: string;
  height: string;
  bytes: string;
}

export interface FolderInfo {
  folder: string;
  path: string;
  type: string;
  count: number;
  assetsPath: string;
  region?: string;
  country?: string;
  category?: string;
}

export interface OrganizedImageData {
  regions: Record<string, RegionData>;
  categories: Record<string, CategoryData>;
  allImages: ImageAsset[];
}

export interface RegionData {
  name: string;
  countries: Record<string, CountryData>;
  images: ImageAsset[];
}

export interface CountryData {
  name: string;
  region: string;
  images: ImageAsset[];
}

export interface CategoryData {
  name: string;
  images: ImageAsset[];
}

/**
 * Process all image data and organize it by regions, countries, and categories
 */
export function processAllImageData(): OrganizedImageData {
  console.log('📦 Processing all image data');
  
  const result: OrganizedImageData = {
    regions: {},
    categories: {},
    allImages: allUrls as ImageAsset[]
  };
  
  // Process folders from index.json
  const folders = (indexData as any).folders as FolderInfo[];
  
  // Process country folders (organized by region)
  const countryFolders = folders.filter(folder => folder.type === 'country');
  console.log(`📂 Found ${countryFolders.length} country folders`);
  
  countryFolders.forEach(folder => {
    if (folder.region && folder.country) {
      // Initialize region if not exists
      if (!result.regions[folder.region]) {
        result.regions[folder.region] = {
          name: folder.region,
          countries: {},
          images: []
        };
      }
      
      // Add country to region
      result.regions[folder.region].countries[folder.country] = {
        name: folder.country,
        region: folder.region,
        images: []
      };
    }
  });
  
  // Process category folders
  const categoryFolders = folders.filter(folder => 
    folder.type === 'project' || 
    folder.type === 'erasing-borders' || 
    folder.type === 'workshop' || 
    folder.type === 'open-edition' ||
    folder.type === 'clients'
  );
  console.log(`📂 Found ${categoryFolders.length} category folders`);
  
  categoryFolders.forEach(folder => {
    const category = folder.category || folder.type;
    if (category && !result.categories[category]) {
      result.categories[category] = {
        name: category,
        images: []
      };
    }
  });
  
  // Match images to their appropriate regions/countries/categories
  (allUrls as ImageAsset[]).forEach(image => {
    // Try to match image to a country based on filename patterns
    const countryMatch = matchImageToCountry(image);
    if (countryMatch) {
      const { region, country } = countryMatch;
      
      // Add to region images
      if (result.regions[region]) {
        result.regions[region].images.push(image);
      }
      
      // Add to country images
      if (result.regions[region] && result.regions[region].countries[country]) {
        result.regions[region].countries[country].images.push(image);
      }
    }
    
    // Try to match image to a category
    const categoryMatch = matchImageToCategory(image);
    if (categoryMatch && result.categories[categoryMatch]) {
      result.categories[categoryMatch].images.push(image);
    }
  });
  
  console.log('📦 Image data processing complete');
  return result;
}

/**
 * Match an image to a country based on filename patterns
 */
function matchImageToCountry(image: ImageAsset): { region: string; country: string } | null {
  const filename = image.filename;
  
  // Regional patterns
  if (filename.startsWith('CHI-') || filename.includes('Chicago')) {
    return { region: 'North America', country: 'Chicago' };
  }
  
  if (filename.startsWith('NYC-') || filename.includes('New York')) {
    return { region: 'North America', country: 'New York' };
  }
  
  if (filename.startsWith('EGY-') || filename.includes('Egypt')) {
    return { region: 'Africa', country: 'Egypt' };
  }
  
  if (filename.startsWith('ETH-') || filename.includes('Ethiopia')) {
    return { region: 'Africa', country: 'Ethiopia' };
  }
  
  if (filename.startsWith('MOR-') || filename.includes('Morocco')) {
    return { region: 'Africa', country: 'Morocco' };
  }
  
  if (filename.startsWith('NAM-') || filename.includes('Namibia')) {
    return { region: 'Africa', country: 'Namibia' };
  }
  
  if (filename.startsWith('SA-') || filename.includes('South Africa')) {
    return { region: 'Africa', country: 'South Africa' };
  }
  
  if (filename.startsWith('HK-') || filename.includes('Hong Kong')) {
    return { region: 'Asia', country: 'Hong Kong' };
  }
  
  if (filename.startsWith('JAP-') || filename.includes('Japan')) {
    return { region: 'Asia', country: 'Japan' };
  }
  
  if (filename.startsWith('MYA-') || filename.includes('Myanmar')) {
    return { region: 'Asia', country: 'Myanmar' };
  }
  
  if (filename.startsWith('NEP-') || filename.includes('Nepal')) {
    return { region: 'Asia', country: 'Nepal' };
  }
  
  if (filename.startsWith('THAI-') || filename.includes('Thailand')) {
    return { region: 'Asia', country: 'Thailand' };
  }
  
  if (filename.startsWith('VIET-') || filename.includes('Vietnam')) {
    return { region: 'Asia', country: 'Vietnam' };
  }
  
  if (filename.startsWith('JOR-') || filename.includes('Jordan')) {
    return { region: 'Middle East', country: 'Jordan' };
  }
  
  if (filename.startsWith('ARG-') || filename.includes('Argentina')) {
    return { region: 'South America', country: 'Argentina' };
  }
  
  if (filename.startsWith('MEX-') || filename.includes('Mexico')) {
    return { region: 'North America', country: 'Mexico' };
  }
  
  // Check if this might be part of Erasing Borders project
  if (filename.includes('DSCF') && 
      (filename.includes('CHI-') || 
       filename.includes('NYC-') || 
       filename.includes('EGY-') || 
       filename.includes('JAP-') || 
       filename.includes('MYA-') || 
       filename.includes('NEP-') || 
       filename.includes('MOR-') || 
       filename.includes('JOR-') || 
       filename.includes('THAI-') || 
       filename.includes('VIET-'))) {
    return { region: 'Erasing Borders', country: 'International' };
  }
  
  return null;
}

/**
 * Match an image to a category based on filename or folder patterns
 */
function matchImageToCategory(image: ImageAsset): string | null {
  const filename = image.filename;
  
  // Workshop images
  if (filename.includes('Workshop') || 
      filename.includes('CHI-') && 
      (filename.includes('5652') || 
       filename.includes('0871') || 
       filename.includes('8649') || 
       filename.includes('8789') || 
       filename.includes('9867') || 
       filename.includes('9872') || 
       filename.includes('Cafe'))) {
    return 'Workshop Photos';
  }
  
  // Erasing Borders project
  if (filename.includes('Erasing Borders') || 
      filename.includes('Beloveful') ||
      filename.includes('Menias')) {
    return 'Erasing Borders';
  }
  
  // Homepage images
  if (filename.includes('Landscape') || filename.includes('Portrait')) {
    return 'Homepage';
  }
  
  // Logo images
  if (filename.includes('logo') || filename.includes('Logo') || filename.includes('Beloveful')) {
    return 'Logo';
  }
  
  // Clients
  if (filename.includes('client') || filename.includes('Client')) {
    return 'clients';
  }
  
  return null;
}

// Process and export the organized data
export const ORGANIZED_IMAGE_DATA: OrganizedImageData = processAllImageData();

// Export utility functions
export function getRegionData(region: string): RegionData | undefined {
  return ORGANIZED_IMAGE_DATA.regions[region];
}

export function getCountryData(region: string, country: string): CountryData | undefined {
  const regionData = ORGANIZED_IMAGE_DATA.regions[region];
  return regionData ? regionData.countries[country] : undefined;
}

export function getCategoryData(category: string): CategoryData | undefined {
  return ORGANIZED_IMAGE_DATA.categories[category];
}

export function getAllRegions(): string[] {
  return Object.keys(ORGANIZED_IMAGE_DATA.regions);
}

export function getAllCountriesInRegion(region: string): string[] {
  const regionData = ORGANIZED_IMAGE_DATA.regions[region];
  return regionData ? Object.keys(regionData.countries) : [];
}

export function getAllCategories(): string[] {
  return Object.keys(ORGANIZED_IMAGE_DATA.categories);
}

export function getTopImages(count: number = 20): ImageAsset[] {
  return ORGANIZED_IMAGE_DATA.allImages.slice(0, count);
}

export function searchImages(query: string): ImageAsset[] {
  return ORGANIZED_IMAGE_DATA.allImages.filter(image => 
    image.filename.toLowerCase().includes(query.toLowerCase())
  );
}