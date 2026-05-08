import { GENERATED_ALBUMS } from './generatedAlbums';

/**
 * Comprehensive image data system that organizes all images by folder structure
 * Rewritten to use GENERATED_ALBUMS (local assets) instead of Cloudinary.
 */

export interface ImageAsset {
  filename: string;
  url: string;
  format?: string;
  width?: string;
  height?: string;
  bytes?: string;
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

export interface OrganizedImageData {
  regions: Record<string, RegionData>;
  categories: Record<string, CategoryData>;
  allImages: ImageAsset[];
}

function processAllImageData(): OrganizedImageData {
  const result: OrganizedImageData = {
    regions: {},
    categories: {},
    allImages: []
  };

  GENERATED_ALBUMS.forEach(album => {
    const regionName = album.region;
    const countryName = album.country;

    // Initialize region if not exists
    if (!result.regions[regionName]) {
      result.regions[regionName] = {
        name: regionName,
        countries: {},
        images: []
      };
    }

    // Add country to region
    const countryData: CountryData = {
      name: countryName,
      region: regionName,
      images: album.images.map(img => ({
        filename: img.desktop.split('/').pop() || '',
        url: img.desktop,
      }))
    };
    
    result.regions[regionName].countries[countryName] = countryData;
    result.regions[regionName].images.push(...countryData.images);
    result.allImages.push(...countryData.images);
  });

  // Mock categories for now if they are used elsewhere
  // In the future, we can derive these from GENERATED_ALBUMS if we add metadata
  result.categories['All'] = {
    name: 'All',
    images: result.allImages
  };

  return result;
}

export const ORGANIZED_IMAGE_DATA: OrganizedImageData = processAllImageData();

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
