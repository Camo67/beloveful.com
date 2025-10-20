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

// Slideshow images with dual sources (R2 primary, Cloudinary fallback)
export const HOME_SLIDESHOW: SlideshowImage[] = [
  {
    desktop: "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Homepage/Desktop Landscape/JOR-4604.jpg",
    mobile: "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Homepage/Mobile Portrait/DSCF0103.jpg",
    desktopCloudinary: "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620570/JOR-4604_weouv8.jpg",
    mobileCloudinary: "https://res.cloudinary.com/dvwdoezk1/image/upload/w_800/v1758620570/JOR-4604_weouv8.jpg"
  },
  {
    desktop: "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Homepage/Desktop Landscape/CHI-2084-Website-2.jpg",
    mobile: "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Homepage/Mobile Portrait/CHI-65.jpg",
    desktopCloudinary: "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218565/Website%20beloveful.com/Erasing%20Borders/NyC-DSCF8922_copy_2_lswqmq.jpg",
    mobileCloudinary: "https://res.cloudinary.com/dvwdoezk1/image/upload/w_800/v1760218565/Website%20beloveful.com/Erasing%20Borders/NyC-DSCF8922_copy_2_lswqmq.jpg"
  },
  {
    desktop: "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Homepage/Desktop Landscape/CHI-770.jpg",
    mobile: "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Homepage/Mobile Portrait/DSCF8938.jpg",
    desktopCloudinary: "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218570/Website%20beloveful.com/Erasing%20Borders/Tony_Menias_-_Two_Girls_in_Window_rgthwg.jpg",
    mobileCloudinary: "https://res.cloudinary.com/dvwdoezk1/image/upload/w_800/v1760218570/Website%20beloveful.com/Erasing%20Borders/Tony_Menias_-_Two_Girls_in_Window_rgthwg.jpg"
  },
  {
    desktop: "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Homepage/Desktop Landscape/Simpler Times.jpg",
    mobile: "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Homepage/Mobile Portrait/Into the Rabbit Hole.jpg",
    desktopCloudinary: "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218565/Website%20beloveful.com/Erasing%20Borders/NyC-DSCF8922_copy_2_lswqmq.jpg",
    mobileCloudinary: "https://res.cloudinary.com/dvwdoezk1/image/upload/w_800/v1760218565/Website%20beloveful.com/Erasing%20Borders/NyC-DSCF8922_copy_2_lswqmq.jpg"
  },
  {
    desktop: "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Homepage/Desktop Landscape/Snack Time.jpg",
    mobile: "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Homepage/Mobile Portrait/NAM-11-22-DSCF8088.jpg",
    desktopCloudinary: "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218565/Website%20beloveful.com/Erasing%20Borders/NyC-DSCF8922_copy_2_lswqmq.jpg",
    mobileCloudinary: "https://res.cloudinary.com/dvwdoezk1/image/upload/w_800/v1760218565/Website%20beloveful.com/Erasing%20Borders/NyC-DSCF8922_copy_2_lswqmq.jpg"
  },
  {
    desktop: "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Homepage/Desktop Landscape/NAM-03-18-DSCF3974-2.jpg",
    mobile: "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Homepage/Mobile Portrait/Sense of Scale.jpg",
    desktopCloudinary: "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218565/Website%20beloveful.com/Erasing%20Borders/NyC-DSCF8922_copy_2_lswqmq.jpg",
    mobileCloudinary: "https://res.cloudinary.com/dvwdoezk1/image/upload/w_800/v1760218565/Website%20beloveful.com/Erasing%20Borders/NyC-DSCF8922_copy_2_lswqmq.jpg"
  },
  {
    desktop: "https://cdn.shopify.com/s/files/1/1602/8723/files/The-Headless-Horseman-PiL-Beloveful-Tony-Menias.jpg?v=1758731834",
    mobile: "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Homepage/Mobile Portrait/WanderingPaths.jpg",
    desktopCloudinary: "https://cdn.shopify.com/s/files/1/1602/8723/files/The-Headless-Horseman-PiL-Beloveful-Tony-Menias.jpg?v=1758731834",
    mobileCloudinary: "https://res.cloudinary.com/dvwdoezk1/image/upload/w_800/v1760218565/Website%20beloveful.com/Erasing%20Borders/NyC-DSCF8922_copy_2_lswqmq.jpg"
  },
  {
    desktop: "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Homepage/Desktop Landscape/Tony Menias-Fly.jpg",
    mobile: "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Homepage/Mobile Portrait/Enlightened.jpg",
    desktopCloudinary: "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218570/Website%20beloveful.com/Erasing%20Borders/Tony_Menias_-_Two_Girls_in_Window_rgthwg.jpg",
    mobileCloudinary: "https://res.cloudinary.com/dvwdoezk1/image/upload/w_800/v1760218570/Website%20beloveful.com/Erasing%20Borders/Tony_Menias_-_Two_Girls_in_Window_rgthwg.jpg"
  },
  {
    desktop: "https://cdn.shopify.com/s/files/1/1602/8723/products/CalmBeforeTheStorm-Tony-Menias-photoinnovationlab.jpg?v=1652377339",
    mobile: "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Homepage/Mobile Portrait/Pastel Playground.jpg",
    desktopCloudinary: "https://cdn.shopify.com/s/files/1/1602/8723/products/CalmBeforeTheStorm-Tony-Menias-photoinnovationlab.jpg?v=1652377339",
    mobileCloudinary: "https://res.cloudinary.com/dvwdoezk1/image/upload/w_800/v1760218565/Website%20beloveful.com/Erasing%20Borders/NyC-DSCF8922_copy_2_lswqmq.jpg"
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