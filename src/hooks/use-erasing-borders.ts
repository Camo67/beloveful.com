import { useQuery } from '@tanstack/react-query';
import { CLOUDINARY_ALBUMS } from '@/lib/cloudinaryAlbums';

export type GalleryImage = { desktop: string; mobile: string };

interface ApiResponse {
  success: boolean;
  count: number;
  images: Array<{ desktop: string; mobile: string }>;
}

export function useErasingBorders() {
  return useQuery<GalleryImage[]>({
    queryKey: ['erasing-borders'],
    queryFn: async () => {
      try {
        // Try the API route first (if configured)
        const res = await fetch('/api/collections/erasing-borders');
        if (res.ok) {
          const data: ApiResponse = await res.json();
          if (data?.success && Array.isArray(data.images)) {
            return data.images.map((i) => ({ desktop: i.desktop, mobile: i.mobile }));
          }
        }
      } catch (err) {
        // ignore and fall back
      }

      // Fallback to local generated Cloudinary dataset
      const album = CLOUDINARY_ALBUMS.find((a) => a.slug === 'erasing-borders');
      if (!album || !Array.isArray(album.images)) return [];

      return album.images.map((i) => ({ desktop: i.desktop, mobile: i.mobile }));
    },
    staleTime: 1000 * 60 * 60, // 1 hour
    retry: 1,
  });
}
