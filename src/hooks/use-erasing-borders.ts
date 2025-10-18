import { useQuery } from '@tanstack/react-query';

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
      let res = await fetch('/api/collections/erasing-borders', { credentials: 'include' });
      if (!res.ok) {
        res = await fetch('https://www.beloveful.com/api/collections/erasing-borders');
      }
      if (!res.ok) throw new Error('Failed to load Erasing Borders images');
      const data: ApiResponse = await res.json();
      if (!data.success) throw new Error('API error');
      return data.images;
    },
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
}