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
      try {
        const res = await fetch('/api/collections/erasing-borders');
        if (!res.ok) return [];
        const data: ApiResponse = await res.json();
        if (data?.success && Array.isArray(data.images)) {
          return data.images.map((i) => ({ desktop: i.desktop, mobile: i.mobile }));
        }
        return [];
      } catch {
        // Fallback: no dynamic images; pages will use static album if present
        return [];
      }
    },
    staleTime: 1000 * 60 * 60, // 1 hour
    retry: 1,
  });
}
