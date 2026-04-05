import prefixMappedData from './cloudinary-assets/prefix-mapped.json';
import homepageDesktopData from './cloudinary-assets/Homepage/Desktop Landscape/urls.json';
import homepageMobileData from './cloudinary-assets/Homepage/Mobile Portrait/urls.json';
import localAlbums from './local-albums.json';
import { GENERATED_ALBUMS, GENERATED_HOME_SLIDESHOW } from './generatedAlbums';
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

// Local-only fallback for Erasing Borders (ensures live mirrors dev by using bundled images)
const ERASING_BORDERS_LOCAL_IMAGES = [
  "/images/Erasing Borders/CHI-Beloveful6.jpg",
  "/images/Erasing Borders/CHI-DSCF9471.jpg",
  "/images/Erasing Borders/CHI-MeniasTony_12.jpg",
  "/images/Erasing Borders/DSCF3088 copy.jpg",
  "/images/Erasing Borders/FRA-DSCF0103 copy.jpg",
  "/images/Erasing Borders/Greece-DSCF3935 copy 3.jpg",
  "/images/Erasing Borders/IND-MeniasTony_14.jpg",
  "/images/Erasing Borders/IND-MeniasTony_16.jpg",
  "/images/Erasing Borders/IND-MeniasTony_8.jpg",
  "/images/Erasing Borders/JAP-3265.jpg",
  "/images/Erasing Borders/JOR-4461.jpg",
  "/images/Erasing Borders/MOR-IMG_5248 copy.jpg",
  "/images/Erasing Borders/MOR-IMG_5277.jpg",
  "/images/Erasing Borders/MYA-DSCF0783 copy.jpg",
  "/images/Erasing Borders/MYA-DSCF9634 copy.jpg",
  "/images/Erasing Borders/NEP-DSCF8737 copy.jpg",
  "/images/Erasing Borders/NEP-Silent Stare copy.jpg",
  "/images/Erasing Borders/NatureVSNurture copy.jpg",
  "/images/Erasing Borders/NyC-DSCF8922 copy 2.jpg",
  "/images/Erasing Borders/PAL-DSCF3675 copy.jpg",
  "/images/Erasing Borders/PAL-MeniasTony_13.jpg",
  "/images/Erasing Borders/PHI-1662 copy.jpg",
  "/images/Erasing Borders/THAI-DSCF3890 copy.jpg",
  "/images/Erasing Borders/Tony Menias - Two Girls in Window.jpg",
  "/images/Erasing Borders/TonyMeniasAMansLegacy.jpg",
  "/images/Erasing Borders/Vietnam-DSCF8153 copy.jpg",
];

const ERASING_BORDERS_LOCAL_PROJECT: Work = {
  title: "Erasing Borders",
  slug: "erasing-borders",
  description: "A humanist photography project connecting experiences across borders.",
  region: "Erasing Borders" as Region,
  featured: true,
  images: ERASING_BORDERS_LOCAL_IMAGES.map((url) => ({
    desktop: validateAndFixImageUrl(url),
    mobile: validateAndFixImageUrl(url),
  })),
};

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
    const cleanUrl = (url: string) => {
      const fixed = validateAndFixImageUrl(url);
      return mapToCdnUrl(fixed) ?? fixed;
    };

    return parsed
      .map((album) => {
        const regionName = album.region as Region;
        if (!regionSet.has(regionName)) {
          return null;
        }
        const images = Array.isArray(album.images)
          ? album.images
              .map((img: any) => ({
                desktop: cleanUrl(img.desktop),
                mobile: cleanUrl(img.mobile),
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
const PREFIX_ALBUMS = groupPrefixMappedData();

function mergeAlbums(...albumLists: CountryAlbum[][]): CountryAlbum[] {
  const albumMap = new Map<string, CountryAlbum>();
  const slugify = (album: CountryAlbum) =>
    album.slug?.trim() ||
    album.country.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");

  for (const list of albumLists) {
    for (const album of list) {
      const key = slugify(album);
      if (!key) continue;
      const existing = albumMap.get(key);
      // Prefer earlier lists (local > generated > prefix) or ones with images
      if (!existing || existing.images.length === 0) {
        albumMap.set(key, { ...album, slug: key });
      }
    }
  }

  return Array.from(albumMap.values());
}

export const ALBUMS: CountryAlbum[] = mergeAlbums(
  LOCAL_ALBUMS,
  GENERATED_ALBUMS,
  PREFIX_ALBUMS
).filter(album => album.slug !== "st-martin" && album.country !== "St. Martin");

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

const PROJECTS_BASE: Work[] =
  LOCAL_PROJECTS.length > 0 ? LOCAL_PROJECTS : createProjectsFromPrefixMapped();

export const PROJECTS: Work[] = (() => {
  const list = PROJECTS_BASE.filter((p) => p.slug !== "erasing-borders");
  // Always prefer the bundled Erasing Borders set to avoid bad remote mappings.
  if (ERASING_BORDERS_LOCAL_PROJECT.images.length > 0) {
    list.unshift(ERASING_BORDERS_LOCAL_PROJECT);
  }
  return list;
})();

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

// Slideshow images from curated homepage assets with fallback to generated/prefix data
export const HOME_SLIDESHOW: SlideshowImage[] =
  curatedHomepageSlideshow.length > 0
    ? curatedHomepageSlideshow
    : (GENERATED_HOME_SLIDESHOW.length > 0
        ? GENERATED_HOME_SLIDESHOW
        : transformPrefixMappedToSlideshow());

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
