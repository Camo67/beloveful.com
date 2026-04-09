
export interface SlideshowImage {
  desktop: string;
  mobile: string;
}

export interface CountryAlbum {
  region: string;
  country: string;
  slug: string;
  images: SlideshowImage[];
}

// Google Cloud Text-to-Speech configuration
export interface GcsTtsConfig {
  apiKey: string;
}
