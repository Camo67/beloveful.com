/**
 * Simple data structures for images and albums
 * 
 * This module defines the core data structures used in the simple image system.
 * These structures can be populated from various sources like Cloudinary or local files.
 * 
 * Example usage:
 * ```typescript
 * const albums: SimpleCountryAlbum[] = [
 *   {
 *     region: "Asia",
 *     country: "Japan",
 *     slug: "japan",
 *     title: "Japan Collection",
 *     images: [
 *       {
 *         desktop: "https://example.com/japan-desktop.jpg",
 *         mobile: "https://example.com/japan-mobile.jpg"
 *       }
 *     ]
 *   }
 * ];
 * ```
 */

export type Region =
  | "Africa"
  | "Asia"
  | "Middle East"
  | "South America"
  | "North America"
  | "Europe"
  | "Oceania"
  | "Erasing Borders"

export const REGIONS: Region[] = [
  "Africa",
  "Asia",
  "Middle East",
  "South America",
  "North America",
  "Europe",
  "Oceania",
  "Erasing Borders"
];

/**
 * Defines the structure for a single album, representing a country/location.
 */
export interface SimpleCountryAlbum {
  region: Region
  country: string
  slug: string
  title: string
  description?: string
  price?: number
  featured?: boolean
  images: {
    desktop: string // URL for landscape image
    mobile: string // URL for portrait image
  }[];
}

export interface SimpleSlideshowImage {
  desktop: string;
  mobile: string;
}

/**
 * Defines the structure for a featured work/project
 */
export interface SimpleWork {
  title: string;
  slug: string;
  description?: string;
  region: Region;
  featured?: boolean;
  images: {
    desktop: string;
    mobile: string;
  }[];
}

// Simple albums - empty by default, can be populated from any source
export const SIMPLE_ALBUMS: SimpleCountryAlbum[] = [];

// Simple projects - empty by default, can be populated from any source
export const SIMPLE_PROJECTS: SimpleWork[] = [];

// Simple slideshow images
export const SIMPLE_HOME_SLIDESHOW: SimpleSlideshowImage[] = [];

/**
 * Look up a single project by its slug.
 * @param slug - The slug to search for
 * @returns The matching SimpleWork object or undefined if not found
 */
export const getSimpleProjectBySlug = (slug: string): SimpleWork | undefined => {
  return SIMPLE_PROJECTS.find(p => p.slug === slug);
};

/**
 * Get all albums for a given region.
 * @param region - The region to filter by
 * @returns Array of SimpleCountryAlbum objects matching the region
 */
export const getSimpleAlbumsByRegion = (region: Region): SimpleCountryAlbum[] => {
  return SIMPLE_ALBUMS.filter(album => album.region === region);
};

/**
 * Look up a single album by its slug.
 * @param slug - The slug to search for
 * @returns The matching SimpleCountryAlbum object or undefined if not found
 */
export const getSimpleAlbumBySlug = (slug: string): SimpleCountryAlbum | undefined => {
  return SIMPLE_ALBUMS.find(album => album.slug === slug);
};

/**
 * Return a copy of all albums sorted alphabetically by country title.
 * @returns Array of SimpleCountryAlbum objects sorted by country name
 */
export const getAllSimpleAlbumsSorted = (): SimpleCountryAlbum[] => {
  return [...SIMPLE_ALBUMS].sort((a, b) => a.country.localeCompare(b.country));
};

/**
 * Validate that an image URL is properly formed
 * @param url - The URL to validate
 * @returns True if the URL is valid, false otherwise
 */
export const isValidImageUrl = (url: string): boolean => {
  if (!url) return false;
  
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:';
  } catch (error) {
    return false;
  }
};

/**
 * Validate that a SimpleSlideshowImage object has valid URLs
 * @param image - The image object to validate
 * @returns True if both URLs are valid, false otherwise
 */
export const isValidSlideshowImage = (image: SimpleSlideshowImage): boolean => {
  return isValidImageUrl(image.desktop) && isValidImageUrl(image.mobile);
};

/**
 * Validate that a SimpleCountryAlbum object is properly formed
 * @param album - The album object to validate
 * @returns True if the album is valid, false otherwise
 */
export const isValidAlbum = (album: SimpleCountryAlbum): boolean => {
  // Check required fields
  if (!album.region || !album.country || !album.slug || !album.title) {
    return false;
  }
  
  // Check that region is valid
  if (!REGIONS.includes(album.region)) {
    return false;
  }
  
  // Check that at least one image has valid URLs
  if (album.images.length === 0) {
    return false;
  }
  
  // Check that all images have valid URLs
  return album.images.every(image => 
    isValidImageUrl(image.desktop) && isValidImageUrl(image.mobile)
  );
};