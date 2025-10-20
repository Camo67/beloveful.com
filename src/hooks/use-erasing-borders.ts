import { useQuery } from '@tanstack/react-query';

export type GalleryImage = { desktop: string; mobile: string };

interface ApiResponse {
  success: boolean;
  count: number;
  images: Array<{ desktop: string; mobile: string }>;
}

export function useErasingBorders() {
  // Source disabled intentionally to prevent duplicate images; returns empty list.
  return useQuery<GalleryImage[]>({
    queryKey: ['erasing-borders'],
    queryFn: async () => [],
    staleTime: Infinity,
    retry: false,
  });
}
