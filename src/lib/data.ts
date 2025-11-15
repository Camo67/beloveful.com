import prefixMappedData from './cloudinary-assets/prefix-mapped.json';
import homepageDesktopData from './cloudinary-assets/Homepage/Desktop Landscape/urls.json';
import homepageMobileData from './cloudinary-assets/Homepage/Mobile Portrait/urls.json';
import localAlbums from './local-albums.json';
import { validateAndFixImageUrl, mapToCdnUrl } from './image-utils';

console.log('📦 Loading prefix-mapped data:', prefixMappedData);

export type Region =
  | "Africa"
  | "Asia"
  | "Central America & Caribbean"
  | "Middle East"
  | "South America"
  | "North America"
  | "Europe & Scandinavia"
  | "Europe"
  | "Oceania"
  | "Erasing Borders"
  | "Shop"
  | "Logo"

export const REGIONS: Region[] = [
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

/**
 * Defines the structure for a single album, representing a country/location.
 */
export interface CountryAlbum {
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

export interface SlideshowImage {
  desktop: string;
  mobile: string;
  desktopCloudinary?: string; // Cloudinary fallback for desktop
  mobileCloudinary?: string; // Cloudinary fallback for mobile
}

/**
 * Defines the structure for a featured work/project
 */
export interface Work {
  images: any;
  title: string;
  slug: string;
  description?: string;
  region: Region;
  featured?: boolean;
}

interface HomepageAsset {
  filename?: string;
  url?: string;
  width?: string;
  height?: string;
  bytes?: string;
}

// Function to group prefix-mapped data by region and country
function groupPrefixMappedData(): CountryAlbum[] {
  console.log('📂 Grouping prefix-mapped data');
  const albums: CountryAlbum[] = [];
  
  // Process matched regions
  if (prefixMappedData && (prefixMappedData as any).matched) {
    console.log('📂 Matched data found');
    for (const [regionName, regionData] of Object.entries((prefixMappedData as any).matched)) {
      console.log('📂 Processing region:', regionName);
      for (const [countryName, countryImages] of Object.entries(regionData as any)) {
        console.log('📂 Processing country:', countryName, 'with', (countryImages as any[]).length, 'images');
        const slug = countryName.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
        
        // Process images to ensure they are accessible
        const processedImages = [];
        for (const image of (countryImages as any[]).filter((image: any) => image && image.url)) {
          const workingUrl = validateAndFixImageUrl(image.url);
          if (workingUrl) {
            const cdnUrl = mapToCdnUrl(workingUrl) ?? workingUrl;
            processedImages.push({
              desktop: cdnUrl,
              mobile: cdnUrl
            });
          }
        }
        
        const album: CountryAlbum = {
          region: regionName as Region,
          country: countryName,
          slug,
          title: countryName,
          images: processedImages
        };
        
        albums.push(album);
      }
    }
  }
  
  console.log('📂 Total albums created:', albums.length);
  return albums;
}

// Function to create projects from prefix-mapped data
function createProjectsFromPrefixMapped(): Work[] {
  console.log('📄 Creating projects from prefix-mapped data');
  const projects: Work[] = [];
  
  // Create a project for Erasing Borders from matched data
  if (prefixMappedData && (prefixMappedData as any).matched) {
    console.log('📄 Matched data found for projects');
    const erasingBordersImages: any[] = [];
    
    // Collect images that might belong to Erasing Borders project
    Object.values((prefixMappedData as any).matched).forEach((region: any) => {
      Object.values(region).forEach((cityImages: any) => {
        const validImages = (cityImages as any[]).filter((image: any) => image && image.url);
        validImages.forEach((image: any) => {
          const workingUrl = validateAndFixImageUrl(image.url);
          const cdnUrl = mapToCdnUrl(workingUrl) ?? workingUrl;
          // Include a broader range of images for the Erasing Borders project
          // This will include more images to make the project more substantial
          erasingBordersImages.push({
            desktop: cdnUrl,
            mobile: cdnUrl
          });
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
    }
  }
  
  console.log('📄 Total projects created:', projects.length);
  return projects;
}

// Cloudinary albums from prefix-mapped data
function normalizeLocalAlbums(): CountryAlbum[] {
  try {
    const parsed = (localAlbums as any[]) ?? [];
    const regionSet = new Set<Region>(REGIONS);
    return parsed
      .map((album) => {
        const regionName = album.region as Region;
        if (!regionSet.has(regionName)) {
          return null;
        }
        const images = Array.isArray(album.images)
          ? album.images
              .map((img: any) => ({
                desktop: validateAndFixImageUrl(img.desktop),
                mobile: validateAndFixImageUrl(img.mobile),
              }))
              .filter((img) => !!img.desktop)
          : [];
        if (!images.length) return null;
        return {
          region: album.region as Region,
          country: album.country as string,
          slug: album.slug as string,
          title: album.title ?? album.country,
          images,
        } satisfies CountryAlbum;
      })
      .filter(Boolean) as CountryAlbum[];
  } catch {
    return [];
  }
}

const LOCAL_ALBUMS = normalizeLocalAlbums();

export const ALBUMS: CountryAlbum[] =
  LOCAL_ALBUMS.length > 0 ? LOCAL_ALBUMS : groupPrefixMappedData();

// Projects from prefix-mapped data
function createLocalProjects(): Work[] {
  const erasingBorders = LOCAL_ALBUMS.filter(
    (album) => album.region === "Erasing Borders",
  );
  if (!erasingBorders.length) return [];
  return erasingBorders.map((album) => ({
    title: album.title,
    slug: album.slug,
    description: album.description ?? album.title,
    region: album.region as Region,
    featured: true,
    images: album.images,
  }));
}

const LOCAL_PROJECTS = createLocalProjects();

export const PROJECTS: Work[] =
  LOCAL_PROJECTS.length > 0 ? LOCAL_PROJECTS : createProjectsFromPrefixMapped();

export const getProjectBySlug = (slug: string): Work | undefined => {
  return PROJECTS.find(p => p.slug === slug);
};

/**
 * Get all albums for a given region.
 */
export const getAlbumsByRegion = (region: Region): CountryAlbum[] => {
  return ALBUMS.filter(album => album.region === region);
};

/**
 * Look up a single album by its slug.
 */
export const getAlbumBySlug = (slug: string): CountryAlbum | undefined => {
  return ALBUMS.find(album => album.slug === slug);
};

/**
 * Return a copy of all albums sorted alphabetically by country title.
 */
export const getAllAlbumsSorted = (): CountryAlbum[] => {
  return [...ALBUMS].sort((a, b) => a.country.localeCompare(b.country));
};

// Transform prefix-mapped data to slideshow images
const transformPrefixMappedToSlideshow = (): SlideshowImage[] => {
  console.log('🖼️ Transforming prefix-mapped data to slideshow images');
  const images: SlideshowImage[] = [];
  
  // Get images from matched regions
  if (prefixMappedData && (prefixMappedData as any).matched) {
    console.log('🖼️ Matched data found for slideshow');
    Object.values((prefixMappedData as any).matched).forEach((region: any) => {
      Object.values(region).forEach((cityImages: any) => {
        // Take more images from each city for a richer slideshow
        const validImages = (cityImages as any[]).slice(0, 10).filter((image: any) => image && image.url);
        validImages.forEach((image: any) => {
          const workingUrl = validateAndFixImageUrl(image.url);
          const cdnUrl = mapToCdnUrl(workingUrl) ?? workingUrl;
          images.push({
            desktop: cdnUrl,
            mobile: cdnUrl
          });
        });
      });
    });
  }
  
  console.log('🖼️ Images from matched regions:', images.length);
  
  // Add more images from unknown if we don't have enough
  if (prefixMappedData && (prefixMappedData as any).unknown && images.length < 50) { // Increased from 20 to 50
    console.log('🖼️ Adding images from unknown section');
    const unknownImages = (prefixMappedData as any).unknown.slice(0, 50 - images.length);
    const validUnknownImages = unknownImages.filter((image: any) => image && image.url);
    validUnknownImages.forEach((image: any) => {
      const workingUrl = validateAndFixImageUrl(image.url);
      const cdnUrl = mapToCdnUrl(workingUrl) ?? workingUrl;
      images.push({
        desktop: cdnUrl,
        mobile: cdnUrl
      });
    });
  }
  
  console.log('🖼️ Total slideshow images:', images.length);
  return images;
}

function buildHomepageSlideshowFromCuratedAssets(): SlideshowImage[] {
  const desktopAssets = (homepageDesktopData as HomepageAsset[]).filter(
    (asset) => asset && typeof asset.url === 'string' && asset.url.trim().length > 0
  );
  const mobileAssets = (homepageMobileData as HomepageAsset[]).filter(
    (asset) => asset && typeof asset.url === 'string' && asset.url.trim().length > 0
  );

  const maxSlides = Math.max(desktopAssets.length, mobileAssets.length);
  if (maxSlides === 0) {
    return [];
  }

  const slides: SlideshowImage[] = [];
  for (let i = 0; i < maxSlides; i++) {
    const desktopAsset = desktopAssets.length ? desktopAssets[i % desktopAssets.length] : null;
    const mobileAsset = mobileAssets.length ? mobileAssets[i % mobileAssets.length] : null;

    const rawDesktop = desktopAsset?.url || mobileAsset?.url || '';
    const rawMobile = mobileAsset?.url || desktopAsset?.url || '';
    const desktopWorking = rawDesktop ? validateAndFixImageUrl(rawDesktop) : '';
    const mobileWorking = rawMobile ? validateAndFixImageUrl(rawMobile) : '';
    const desktopUrl = desktopWorking ? mapToCdnUrl(desktopWorking) ?? desktopWorking : '';
    const mobileUrl = mobileWorking ? mapToCdnUrl(mobileWorking) ?? mobileWorking : '';

    if (!desktopUrl && !mobileUrl) continue;

    slides.push({
      desktop: desktopUrl,
      mobile: mobileUrl,
      desktopCloudinary: desktopAsset?.url,
      mobileCloudinary: mobileAsset?.url,
    });
  }

  return slides;
}

const curatedHomepageSlideshow = buildHomepageSlideshowFromCuratedAssets();

// Slideshow images from curated homepage assets with fallback to prefix-mapped data
export const HOME_SLIDESHOW: SlideshowImage[] =
  curatedHomepageSlideshow.length > 0 ? curatedHomepageSlideshow : transformPrefixMappedToSlideshow();

// Simple data structures for when we want to use a simpler system
export { 
  type Region as SimpleRegion,
  type SimpleCountryAlbum as SimpleCountryAlbum,
  type SimpleWork as SimpleWork,
  type SimpleSlideshowImage as SimpleSlideshowImage
} from './simple-data';

// Export simple data
export { 
  SIMPLE_ALBUMS,
  SIMPLE_PROJECTS,
  SIMPLE_HOME_SLIDESHOW,
  getSimpleProjectBySlug,
  getSimpleAlbumsByRegion,
  getSimpleAlbumBySlug,
  getAllSimpleAlbumsSorted
} from './simple-data';
