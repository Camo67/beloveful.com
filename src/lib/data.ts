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

/**
 * Defines the structure for a single album, representing a country/location.
 */
export interface CountryAlbum {
  region: Region
  country: string
  slug: string
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
  title: string;
  slug: string;
  description?: string;
  coverImage: {
    desktop: string;
    mobile: string;
  };
  images: {
    desktop: string;
    mobile: string;
  }[];
}

// Derived Projects (non-country works)
export const PROJECTS: Work[] = (() => {
  const projectsFromAlbums = (CLOUDINARY_ALBUMS || [])
    .filter(a => a.slug === 'erasing-borders' || a.region === 'Erasing Borders')
    .map(a => ({
      title: a.country || 'Erasing Borders',
      slug: a.slug,
      description: 'A humanist photography project connecting experiences across borders.',
      coverImage: a.images[0] || { desktop: '', mobile: '' },
      images: a.images
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

// Portfolio albums using Cloudinary images
export const ALBUMS: CountryAlbum[] = CLOUDINARY_ALBUMS;

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

export const REGIONS: Region[] = ["Africa", "Asia", "Middle East", "South America", "North America", "Europe", "Oceania", "Erasing Borders"];