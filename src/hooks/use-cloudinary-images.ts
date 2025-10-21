// /home/camo/new/beloveful.com/src/hooks/use-cloudinary-images.ts
import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { CLOUDINARY_ALBUMS } from '@/lib/cloudinaryAlbums';

export type GalleryImage = { desktop: string; mobile: string };

/**
 * Hook to fetch images for a given Cloudinary folder/album slug.
 * This implementation prefers the local generated `CLOUDINARY_ALBUMS` dataset
 * to avoid exposing Cloudinary credentials in client bundles. It can be swapped
 * for a real API call later (server function that uses CLOUDINARY_API_KEY & SECRET).
 */
export function useCloudinaryImages(folderSlug: string) {
  const queryFn = useCallback(async () => {
    try {
      // Validate folderSlug parameter
      if (!folderSlug || typeof folderSlug !== 'string') {
        return [];
      }

      // Find the album by slug
      const album = CLOUDINARY_ALBUMS.find((a) => a.slug === folderSlug);
      if (!album || !Array.isArray(album.images)) return [];

      // Sort images by desktop url alphabetical using localeCompare for better performance
      const images = [...album.images].sort((a, b) => 
        a.desktop.localeCompare(b.desktop)
      );

      return images.map((i) => ({ desktop: i.desktop, mobile: i.mobile }));
    } catch (err) {
      console.error(`Error fetching Cloudinary images for folder: ${folderSlug}`, err);
      return [];
    }
  }, [folderSlug]);

  return useQuery<GalleryImage[]>({
    queryKey: ['cloudinary', folderSlug],
    queryFn,
    staleTime: 1000 * 60 * 60,
    retry: 1,
    enabled: !!folderSlug && typeof folderSlug === 'string', // Only run query if folderSlug is valid
  });
}
