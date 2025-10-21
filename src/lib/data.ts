import { GENERATED_ALBUMS, GENERATED_HOME_SLIDESHOW } from "./generatedAlbums";
import { CLOUDINARY_ALBUMS } from "./cloudinaryAlbums";

export type Region =
  | "Africa"
  | "Asia"
  | "Middle East"
  | "South America"
  | "North America"
  | "Europe"
  | "Oceania"
  | "Erasing Borders"
  | "Shop"
  | "Logo"

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

// Derived Projects (non-country works)
export const PROJECTS: Work[] = (() => {
  const projectsFromAlbums = (CLOUDINARY_ALBUMS || [])
    .filter(a => a.slug === 'erasing-borders' || a.region === 'Erasing Borders')
    .map(a => ({
      images: a.images || [],
      title: a.country || 'Erasing Borders',
      slug: a.slug,
      description: 'A humanist photography project connecting experiences across borders.',
      region: "Erasing Borders" as Region,
      featured: true
    }));
  return projectsFromAlbums;
})();

export const getProjectBySlug = (slug: string): Work | undefined => {
  return PROJECTS.find(p => p.slug === slug);
};

// Local slideshow images served from /public
export const HOME_SLIDESHOW: SlideshowImage[] = [
  {
    desktop: "/Website beloveful.com/Homepage/Desktop Landscape/JOR-4604.jpg",
    mobile: "/Website beloveful.com/Homepage/Mobile Portrait/DSCF0103.jpg"
  },
  {
    desktop: "/Website beloveful.com/Homepage/Desktop Landscape/CHI-2084-Website-2.jpg",
    mobile: "/Website beloveful.com/Homepage/Mobile Portrait/CHI-65.jpg"
  },
  {
    desktop: "/Website beloveful.com/Homepage/Desktop Landscape/CHI-770.jpg",
    mobile: "/Website beloveful.com/Homepage/Mobile Portrait/DSCF8938.jpg"
  },
  {
    desktop: "/Website beloveful.com/Homepage/Desktop Landscape/Simpler Times.jpg",
    mobile: "/Website beloveful.com/Homepage/Mobile Portrait/Into the Rabbit Hole.jpg"
  },
  {
    desktop: "/Website beloveful.com/Homepage/Desktop Landscape/Snack Time.jpg",
    mobile: "/Website beloveful.com/Homepage/Mobile Portrait/NAM-11-22-DSCF8088.jpg"
  },
  {
    desktop: "/Website beloveful.com/Homepage/Desktop Landscape/NAM-03-18-DSCF3974-2.jpg",
    mobile: "/Website beloveful.com/Homepage/Mobile Portrait/Sense of Scale.jpg"
  },
  {
    desktop: "/Website beloveful.com/Homepage/Desktop Landscape/Tony Menias-Fly.jpg",
    mobile: "/Website beloveful.com/Homepage/Mobile Portrait/WanderingPaths.jpg"
  },
  {
    desktop: "/Website beloveful.com/Homepage/Desktop Landscape/Tony Menias-Fly.jpg",
    mobile: "/Website beloveful.com/Homepage/Mobile Portrait/Enlightened.jpg"
  },
  {
    desktop: "/Website beloveful.com/Homepage/Desktop Landscape/Simpler Times.jpg",
    mobile: "/Website beloveful.com/Homepage/Mobile Portrait/Pastel Playground.jpg"
  }
];

// Portfolio albums: merge generated albums, Cloudinary albums, and manual entries.
const normalize = (a: Partial<CountryAlbum>): CountryAlbum => ({
  slug: a.slug || 'unknown',
  region: (a.region as Region) || 'North America',
  country: a.country || 'Unknown',
  title: a.title || a.country || a.slug || 'Untitled',
  description: a.description || '',
  price: a.price,
  featured: a.featured || false,
  images: a.images || [{ desktop: '', mobile: '' }]
});

const mappedGenerated = (GENERATED_ALBUMS || []).map((a) => normalize(a as Partial<CountryAlbum>));
const mappedCloudinary = (CLOUDINARY_ALBUMS || []).map((a) => normalize(a as Partial<CountryAlbum>));

// Manual overrides / extra albums
const manualAlbums: CountryAlbum[] = [
  {
    slug: "beloveful-abandoned-beauty",
    region: "North America",
    country: "United States",
    title: "Abandoned Beauty",
    description: "Urban exploration revealing hidden beauty in decay",
    price: 35,
    featured: true,
    images: [{
      desktop: "/images/abandoned-beauty-desktop.jpg",
      mobile: "/images/abandoned-beauty-mobile.jpg"
    }]
  },
  {
    slug: "beloveful-afternoon-drink",
    region: "Asia",
    country: "Vietnam",
    title: "Afternoon Drink",
    description: "Street life moments in Hanoi",
    price: 35,
    featured: false,
    images: [{
      desktop: "/images/afternoon-drink-desktop.jpg",
      mobile: "/images/afternoon-drink-mobile.jpg"
    }]
  },
  {
    slug: "beloveful-almost-home",
    region: "North America",
    country: "United States",
    title: "Almost Home",
    description: "Urban landscapes of Chicago",
    price: 35,
    featured: false,
    images: [{
      desktop: "/images/almost-home-desktop.jpg",
      mobile: "/images/almost-home-mobile.jpg"
    }]
  },
  {
    slug: "beloveful-amalfi",
    region: "Europe",
    country: "Italy",
    title: "Amalfi",
    description: "Coastal beauty of the Amalfi Coast",
    price: 35,
    featured: true,
    images: [{
      desktop: "/images/amalfi-desktop.jpg",
      mobile: "/images/amalfi-mobile.jpg"
    }]
  },
  {
    slug: "beloveful-ascension",
    region: "Asia",
    country: "Thailand",
    title: "Ascension",
    description: "Spiritual journey through Thai temples",
    price: 35,
    featured: false,
    images: [{
      desktop: "/images/ascension-desktop.jpg",
      mobile: "/images/ascension-mobile.jpg"
    }]
  },
  {
    slug: "beloveful-between-the-lines",
    region: "North America",
    country: "United States",
    title: "Between The Lines",
    description: "Abstract urban compositions",
    price: 35,
    featured: true,
    images: [{
      desktop: "/images/between-the-lines-desktop.jpg",
      mobile: "/images/between-the-lines-mobile.jpg"
    }]
  },
  {
    slug: "beloveful-bountifully-barren",
    region: "Middle East",
    country: "Jordan",
    title: "Bountifully Barren",
    description: "Desert landscapes of Wadi Rum",
    price: 35,
    featured: true,
    images: [{
      desktop: "/images/bountifully-barren-desktop.jpg",
      mobile: "/images/bountifully-barren-mobile.jpg"
    }]
  }
];

export const ALBUMS: CountryAlbum[] = [
  ...mappedGenerated,
  ...mappedCloudinary,
  ...manualAlbums
];

// Helper functions
export const getAllAlbumsSorted = (): CountryAlbum[] => {
  return [...ALBUMS].sort((a, b) => a.country.localeCompare(b.country));
};

export const getAlbumsByRegion = (region: Region): CountryAlbum[] => {
  return ALBUMS.filter((album): album is CountryAlbum => album.region === region);
};

export const getAlbumBySlug = (slug: string): CountryAlbum | undefined => {
  return ALBUMS.find(album => album.slug === slug);
};

export const REGIONS: Region[] = [
  "Africa",
  "Asia",
  "Middle East",
  "South America",
  "North America",
  "Europe",
  "Oceania",
  "Erasing Borders",
  "Shop",
  "Logo"
];