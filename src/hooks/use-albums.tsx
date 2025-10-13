import { useQuery } from '@tanstack/react-query';
import { ALBUMS } from '@/lib/data'; // Fallback data

// Interface for album data from API
interface APIAlbum {
  id: number;
  region: string;
  country: string;
  slug: string;
  description?: string;
  images: Array<{
    id: number;
    desktop: string;
    mobile: string;
    title?: string;
    description?: string;
    altText?: string;
  }>;
}

interface APIAlbumsResponse {
  success: boolean;
  albums: APIAlbum[];
}

// Transform API data to match existing interface
const transformAlbum = (album: APIAlbum) => ({
  region: album.region as any, // Type assertion for Region type
  country: album.country,
  slug: album.slug,
  images: album.images.map(img => ({
    desktop: img.desktop,
    mobile: img.mobile
  }))
});

export const useAlbums = () => {
  return useQuery({
    queryKey: ['albums'],
    queryFn: async (): Promise<any[]> => {
      try {
        const response = await fetch('/api/albums');
        
        if (!response.ok) {
          throw new Error('Failed to fetch albums');
        }
        
        const data: APIAlbumsResponse = await response.json();
        
        if (data.success && data.albums) {
          return data.albums.map(transformAlbum);
        }
        
        throw new Error('Invalid response format');
      } catch (error) {
        console.warn('Failed to fetch albums from API, using fallback data:', error);
        // Return static data as fallback
        return ALBUMS;
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1, // Only retry once before falling back to static data
  });
};

export const useAlbum = (region: string, country: string) => {
  return useQuery({
    queryKey: ['album', region, country],
    queryFn: async () => {
      try {
        const response = await fetch(`/api/albums/${region}/${country}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch album');
        }
        
        const data = await response.json();
        
        if (data.success && data.album) {
          return transformAlbum(data.album);
        }
        
        throw new Error('Invalid response format');
      } catch (error) {
        console.warn('Failed to fetch album from API, using fallback data:', error);
        // Return static data as fallback
        return ALBUMS.find(album => 
          album.region.toLowerCase().replace(/\s+/g, '-') === region && 
          album.slug === country
        );
      }
    },
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};