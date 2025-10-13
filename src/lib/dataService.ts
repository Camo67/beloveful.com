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
    const cacheKey = 'albums';
    const cached = this.cache.get(cacheKey);
    
    if (cached && !this.isExpired(cached.timestamp)) {
      return cached.data;
    }

    try {
      const data = await this.fetchWithFallback('/api/public/albums', { success: false });
      
      if (data.success && data.albums) {
        // Convert API format to static format
        const albums: CountryAlbum[] = data.albums.map((album: ApiAlbum) => ({
          region: album.region as Region,
          country: album.country,
          slug: album.slug,
          images: album.images?.map(img => ({
            desktop: img.desktop_url,
            mobile: img.mobile_url
          })) || []
        }));
        
        this.cache.set(cacheKey, { data: albums, timestamp: Date.now() });
        return albums;
      }
    } catch (error) {
      console.warn('Failed to fetch dynamic albums, using static data', error);
    }

    // Fallback to static data
    return ALBUMS;
  }

  async getAlbumBySlug(slug: string): Promise<CountryAlbum | undefined> {
    try {
      const data = await this.fetchWithFallback(`/api/public/albums/${slug}`, { success: false });
      
      if (data.success && data.album) {
        const album: ApiAlbum = data.album;
        return {
          region: album.region as Region,
          country: album.country,
          slug: album.slug,
          images: album.images?.map(img => ({
            desktop: img.desktop_url,
            mobile: img.mobile_url
          })) || []
        };
      }
    } catch (error) {
      console.warn('Failed to fetch dynamic album, using static data', error);
    }

    // Fallback to static data
    return ALBUMS.find(album => album.slug === slug);
  }

  async getSlideshow(): Promise<SlideshowImage[]> {
    const cacheKey = 'slideshow';
    const cached = this.cache.get(cacheKey);
    
    if (cached && !this.isExpired(cached.timestamp)) {
      return cached.data;
    }

    try {
      const data = await this.fetchWithFallback('/api/public/slideshow', { success: false });
      
      if (data.success && data.images) {
        const slideshow: SlideshowImage[] = data.images.map((img: ApiSlideshowImage) => ({
          desktop: img.desktop_url,
          mobile: img.mobile_url
        }));
        
        this.cache.set(cacheKey, { data: slideshow, timestamp: Date.now() });
        return slideshow;
      }
    } catch (error) {
      console.warn('Failed to fetch dynamic slideshow, using static data', error);
    }

    // Fallback to static data
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