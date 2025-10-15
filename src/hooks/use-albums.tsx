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
      // Use static Cloudinary data directly
      console.log('🎭 Loading albums from static Cloudinary data');
      return ALBUMS;
    },
    staleTime: Infinity, // Cache forever since static data doesn't change
    retry: false, // No need to retry static data
  });
};

export const useAlbum = (region: string, country: string) => {
  return useQuery({
    queryKey: ['album', region, country],
    queryFn: async () => {
      // Use static Cloudinary data directly
      console.log(`🌍 Loading album for ${region}/${country} from static data`);
      return ALBUMS.find(album => 
        album.region.toLowerCase().replace(/\s+/g, '-') === region && 
        album.slug === country
      );
    },
    staleTime: Infinity, // Cache forever since static data doesn't change
    retry: false, // No need to retry static data
  });
};
