import localAlbums from './local-albums.json';
import { normalizeAlbumSlug, sameAlbumSlug } from './album-slugs';
import { GENERATED_ALBUMS, GENERATED_HOME_SLIDESHOW } from './generatedAlbums';
import { validateAndFixImageUrl, mapToCdnUrl } from './image-utils';

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

// Local-only fallback for Erasing Borders (ensures live mirrors dev by using bundled images)
const ERASING_BORDERS_LOCAL_IMAGES = [
  "/Website beloveful.com/Erasing Borders/CHI-Beloveful6.jpg",
  "/Website beloveful.com/Erasing Borders/CHI-DSCF9471.jpg",
  "/Website beloveful.com/Erasing Borders/CHI-MeniasTony_12.jpg",
  "/Website beloveful.com/Erasing Borders/DSCF3088 copy.jpg",
  "/Website beloveful.com/Erasing Borders/FRA-DSCF0103 copy.jpg",
  "/Website beloveful.com/Erasing Borders/Greece-DSCF3935 copy 3.jpg",
  "/Website beloveful.com/Erasing Borders/IND-MeniasTony_14.jpg",
  "/Website beloveful.com/Erasing Borders/IND-MeniasTony_16.jpg",
  "/Website beloveful.com/Erasing Borders/IND-MeniasTony_8.jpg",
  "/Website beloveful.com/Erasing Borders/JAP-3265.jpg",
  "/Website beloveful.com/Erasing Borders/JOR-4461.jpg",
  "/Website beloveful.com/Erasing Borders/MOR-IMG_5248 copy.jpg",
  "/Website beloveful.com/Erasing Borders/MOR-IMG_5277.jpg",
  "/Website beloveful.com/Erasing Borders/MYA-DSCF0783 copy.jpg",
  "/Website beloveful.com/Erasing Borders/MYA-DSCF9634 copy.jpg",
  "/Website beloveful.com/Erasing Borders/NEP-DSCF8737 copy.jpg",
  "/Website beloveful.com/Erasing Borders/NEP-Silent Stare copy.jpg",
  "/Website beloveful.com/Erasing Borders/NatureVSNurture copy.jpg",
  "/Website beloveful.com/Erasing Borders/NyC-DSCF8922 copy 2.jpg",
  "/Website beloveful.com/Erasing Borders/PAL-DSCF3675 copy.jpg",
  "/Website beloveful.com/Erasing Borders/PAL-MeniasTony_13.jpg",
  "/Website beloveful.com/Erasing Borders/PHI-1662 copy.jpg",
  "/Website beloveful.com/Erasing Borders/THAI-DSCF3890 copy.jpg",
  "/Website beloveful.com/Erasing Borders/Tony Menias - Two Girls in Window.jpg",
  "/Website beloveful.com/Erasing Borders/TonyMeniasAMansLegacy.jpg",
  "/Website beloveful.com/Erasing Borders/Vietnam-DSCF8153 copy.jpg",
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
          slug: normalizeAlbumSlug(album.slug ?? album.country),
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

function deduplicateAlbumImages(images: { desktop: string; mobile: string }[]): { desktop: string; mobile: string }[] {
  const seen = new Set<string>();
  return images.filter((img) => {
    const key = img.desktop;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function mergeAlbums(...albumLists: CountryAlbum[][]): CountryAlbum[] {
  const albumMap = new Map<string, CountryAlbum>();
  const slugify = (album: CountryAlbum) => normalizeAlbumSlug(album.slug || album.country);

  for (const list of albumLists) {
    for (const album of list) {
      const key = slugify(album);
      if (!key) continue;
      const existing = albumMap.get(key);
      
      // If we already have this album, merge images and deduplicate
      if (existing) {
        albumMap.set(key, {
          ...existing,
          images: deduplicateAlbumImages([...existing.images, ...album.images])
        });
      } else if (album.images.length > 0) {
        albumMap.set(key, { 
          ...album, 
          slug: key,
          images: deduplicateAlbumImages(album.images)
        });
      }
    }
  }

  return Array.from(albumMap.values());
}

function replaceAlbumBySlug(
  albums: CountryAlbum[],
  replacement: CountryAlbum | undefined,
): CountryAlbum[] {
  if (!replacement || replacement.images.length === 0) {
    return albums;
  }

  let replaced = false;
  const nextAlbums = albums.map((album) => {
    if (!sameAlbumSlug(album.slug, replacement.slug)) {
      return album;
    }

    replaced = true;
    return {
      ...replacement,
      slug: normalizeAlbumSlug(replacement.slug || replacement.country),
    };
  });

  return replaced
    ? nextAlbums
    : [
        {
          ...replacement,
          slug: normalizeAlbumSlug(replacement.slug || replacement.country),
        },
        ...nextAlbums,
      ];
}

function replaceAlbumsBySlug(
  albums: CountryAlbum[],
  replacements: Array<CountryAlbum | undefined>,
): CountryAlbum[] {
  return replacements.reduce(
    (currentAlbums, replacement) => replaceAlbumBySlug(currentAlbums, replacement),
    albums,
  );
}

const CANONICAL_PUBLIC_HTML_ALBUM_SLUGS = ["india", "australia"] as const;

const CANONICAL_PUBLIC_HTML_ALBUMS = CANONICAL_PUBLIC_HTML_ALBUM_SLUGS.map((slug) =>
  GENERATED_ALBUMS.find((album) => sameAlbumSlug(album.slug, slug)),
);

const BASE_ALBUMS: CountryAlbum[] = mergeAlbums(
  LOCAL_ALBUMS,
  GENERATED_ALBUMS
);

export const ALBUMS: CountryAlbum[] = replaceAlbumsBySlug(
  BASE_ALBUMS,
  CANONICAL_PUBLIC_HTML_ALBUMS,
).filter(album => album.slug !== "st-martin" && album.country !== "St. Martin");

// Projects from local data
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

const PROJECTS_BASE: Work[] = LOCAL_PROJECTS;

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
  return ALBUMS.find(album => sameAlbumSlug(album.slug, slug));
};

/**
 * Return a copy of all albums sorted alphabetically by country title.
 */
export const getAllAlbumsSorted = (): CountryAlbum[] => {
  return [...ALBUMS].sort((a, b) => a.country.localeCompare(b.country));
};

export const HOME_SLIDESHOW: SlideshowImage[] = [
  {
    desktop: "/Website beloveful.com/Homepage/Desktop Landscape/CHI-2084-Website-2.jpg",
    mobile: "/Website beloveful.com/Homepage/Mobile Portrait/CHI-65.jpg"
  },
  {
    desktop: "/Website beloveful.com/Homepage/Desktop Landscape/CHI-770.jpg",
    mobile: "/Website beloveful.com/Homepage/Mobile Portrait/CHI-MeniasTony_12_zhmfdu.jpg"
  },
  {
    desktop: "/Website beloveful.com/Homepage/Desktop Landscape/CHI-DSCF9471_omluyg.jpg",
    mobile: "/Website beloveful.com/Homepage/Mobile Portrait/DSCF0103.jpg"
  },
  {
    desktop: "/Website beloveful.com/Homepage/Desktop Landscape/Calm Before The Storm.jpg",
    mobile: "/Website beloveful.com/Homepage/Mobile Portrait/DSCF8938.jpg"
  },
  {
    desktop: "/Website beloveful.com/Homepage/Desktop Landscape/Headless Horseman-11-21-DSCF1337.jpg",
    mobile: "/Website beloveful.com/Homepage/Mobile Portrait/Enlightened.jpg"
  },
  {
    desktop: "/Website beloveful.com/Homepage/Desktop Landscape/JOR-4604.jpg",
    mobile: "/Website beloveful.com/Homepage/Mobile Portrait/Into the Rabbit Hole.jpg"
  },
  {
    desktop: "/Website beloveful.com/Homepage/Desktop Landscape/NAM-03-18-DSCF3974-2.jpg",
    mobile: "/Website beloveful.com/Homepage/Mobile Portrait/Madame Jodhpur-03-19-DSCF7654.jpg"
  },
  {
    desktop: "/Website beloveful.com/Homepage/Desktop Landscape/Simpler Times.jpg",
    mobile: "/Website beloveful.com/Homepage/Mobile Portrait/NAM-11-22-DSCF8088.jpg"
  },
  {
    desktop: "/Website beloveful.com/Homepage/Desktop Landscape/Snack Time.jpg",
    mobile: "/Website beloveful.com/Homepage/Mobile Portrait/Pastel Playground.jpg"
  },
  {
    desktop: "/Website beloveful.com/Homepage/Desktop Landscape/Tony Menias-Fly.jpg",
    mobile: "/Website beloveful.com/Homepage/Mobile Portrait/Sense of Scale.jpg"
  }
];

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
