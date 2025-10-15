import { GENERATED_ALBUMS } from "./generatedAlbums";

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
  "Erasing Borders",
];

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
}

export const HOME_SLIDESHOW: SlideshowImage[] = [
  {
    desktop: "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620570/JOR-4604_weouv8.jpg",
    mobile: "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396031/DSCF0103_twkdba.jpg",
  },
  {
    desktop: "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400253/CHI-2084-Website-2_wr8h5y.jpg",
    mobile: "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400269/CHI-65_fgjwby.jpg",
  },
  {
    desktop: "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620833/Simpler_Times_oj3qes.jpg",
    mobile: "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400311/DSCF8938_lowoiy.jpg",
  },
  {
    desktop: "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620819/Tony_Menias-Fly_yc61ae.jpg",
    mobile: "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621040/NAM-11-22-DSCF8088_pzgoe6.jpg",
  },
  {
    desktop: "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400267/CHI-770_h8vtwg.jpg",
    mobile: "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759402471/WanderingPaths_uoz9ea.jpg",
  },
  {
    desktop: "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620829/MYA-9925-04-25-17_edkog3.jpg",
    mobile: "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759402567/Into_the_Rabbit_Hole_taaxtc.jpg",
  },
  {
    desktop: "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621040/NAM-03-18-DSCF3946_hd7bdg.jpg",
    mobile: "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759402610/Sense_of_Scale_leennx.jpg",
  },
  {
    desktop: "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620861/DSCF1066_dlp2l5.jpg",
    mobile: "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620821/Enlightened_yoigxl.jpg",
  },
  {
    desktop: "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620843/THAI-12-19-DSCF2334_jk2cwl.jpg",
    mobile: "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620678/Pastel_Playground_sluwyy.jpg",
  },
  {
    desktop: "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620878/VIET-04-17-DSCF9132_xehdbe.jpg",
    mobile: "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620675/HK-Pastel_Playground_4-6559_yeil6k.jpg",
  },
  {
    desktop: "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620567/PAL-10-19-DSCF3283_j0zztl.jpg",
    mobile: "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620678/HK-Pastel_Playground_3-6617_ayxssd.jpg",
  },
  {
    desktop: "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620598/JOR-10-19-DSCF4604_rv8ibh.jpg",
    mobile: "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621044/NAM-11-22-DSCF8053_zbbdiv.jpg",
  },
  {
    desktop: "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620954/_DSF6993_copy_ez4ele.jpg",
    mobile: "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395206/DSCF7793_vulwdw.jpg",
  },
  {
    desktop: "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620617/CHI-DSCF9471_vukjxy.jpg",
    mobile: "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395194/DSCF5067_ilsqjy.jpg",
  },
];



// Use generated albums from Cloudinary
export const ALBUMS: CountryAlbum[] = GENERATED_ALBUMS;

/**
 * Get all albums for a specific region
 */
export const getAlbumsByRegion = (region: Region): CountryAlbum[] => {
  return ALBUMS.filter((album): album is CountryAlbum => album.region === region);
};

/**
 * Get a specific album by its slug
 */
export const getAlbumBySlug = (slug: string): CountryAlbum | undefined => {
  return ALBUMS.find((album) => album.slug === slug);
};

/**
 * Get all albums sorted alphabetically by country name
 */
export const getAllAlbumsSorted = (): CountryAlbum[] => {
  return ALBUMS.sort((a, b) => a.country.localeCompare(b.country));
};
