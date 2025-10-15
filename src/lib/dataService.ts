// Data service that fetches from API with static fallback
import { ALBUMS, HOME_SLIDESHOW, type CountryAlbum, type SlideshowImage, type Region } from './data';

interface ApiAlbum {
  id: number;
  region: string;
  country: string;
  slug: string;
  description?: string;
  image_count: number;
  images?: {
    id: number;
    title?: string;
    description?: string;
    desktop_url: string;
    mobile_url: string;
  }[];
}

interface ApiSlideshowImage {
  id: number;
  title?: string;
  desktop_url: string;
  mobile_url: string;
  sort_order: number;
}

class DataService {
  private cache = new Map<string, { data: any; timestamp: number }>();
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  private isExpired(timestamp: number): boolean {
    return Date.now() - timestamp > this.CACHE_DURATION;
  }

  private async fetchWithFallback<T>(url: string, fallback: T): Promise<T> {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        console.warn(`API request failed: ${url}`, response.status);
        return fallback;
      }
      
      const data = await response.json();
      if (!data.success) {
        console.warn(`API returned error: ${url}`, data.error);
        return fallback;
      }
      
      return data;
    } catch (error) {
      console.warn(`API request error: ${url}`, error);
      return fallback;
    }
  }

  async getAlbums(): Promise<CountryAlbum[]> {
    // Use static Cloudinary data directly
    console.log('🗂️ DataService: Using static Cloudinary albums data');
    return ALBUMS;
  }

  async getAlbumBySlug(slug: string): Promise<CountryAlbum | undefined> {
    // Use static Cloudinary data directly
    console.log(`🗾 DataService: Getting album ${slug} from static data`);
    return ALBUMS.find(album => album.slug === slug);
  }

  async getSlideshow(): Promise<SlideshowImage[]> {
    // Use static Cloudinary data directly  
    console.log('🎠 DataService: Using static Cloudinary slideshow data');
    return HOME_SLIDESHOW;
  }

  getAlbumsByRegion(region: Region): CountryAlbum[] {
    return this.getAlbums().then(albums => 
      albums.filter(album => album.region === region)
    ) as any; // TypeScript workaround for async in sync interface
  }

  clearCache(): void {
    this.cache.clear();
  }
}

// Export singleton instance
export const dataService = new DataService();

// Export the functions that match the existing API
export const getAlbumsByRegion = async (region: Region): Promise<CountryAlbum[]> => {
  const albums = await dataService.getAlbums();
  return albums.filter(album => album.region === region);
};

export const getAlbumBySlug = async (slug: string): Promise<CountryAlbum | undefined> => {
  return dataService.getAlbumBySlug(slug);
};

export const getSlideshow = async (): Promise<SlideshowImage[]> => {
  return dataService.getSlideshow();
};

export const getAllAlbums = async (): Promise<CountryAlbum[]> => {
  return dataService.getAlbums();
};