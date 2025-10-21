// /home/camo/new/beloveful.com/src/hooks/use-cloudinary-images.ts
import { useEffect, useRef, useState, useCallback } from 'react';
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
  return useQuery<GalleryImage[]>({
    queryKey: ['cloudinary', folderSlug],
    queryFn: async () => {
      try {
        // Find the album by slug
        const album = CLOUDINARY_ALBUMS.find((a) => a.slug === folderSlug);
        if (!album || !Array.isArray(album.images)) return [];

        // Sort images by desktop url alphabetical
        const images = [...album.images].sort((a, b) => 
          a.desktop.localeCompare(b.desktop)
        );

        return images.map((i) => ({ desktop: i.desktop, mobile: i.mobile }));
      } catch (err) {
        // In a real implementation, you might want to log this error
        // console.error('Error fetching Cloudinary images:', err);
        return [];
      }
    },
    staleTime: 1000 * 60 * 60,
    retry: 1,
  });
}
