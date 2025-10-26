import { useQuery } from '@tanstack/react-query';
import { PROJECTS } from '@/lib/data';

export type GalleryImage = { desktop: string; mobile: string };

export function useErasingBorders() {
  return useQuery<GalleryImage[]>({
    queryKey: ['erasing-borders'],
    queryFn: async () => {
      // Use local data from prefix-mapped.json directly
      const project = PROJECTS.find((p) => p.slug === 'erasing-borders');
      if (!project || !Array.isArray(project.images)) return [];

      // Return more images for the Erasing Borders project
      // Limit to a reasonable number for performance but more than before
      return project.images
        .map((i) => ({ desktop: i.desktop, mobile: i.mobile }))
        .slice(0, 50); // Increased from no limit to 50 images
    },
    staleTime: 1000 * 60 * 60, // 1 hour
    retry: 1,
  });
}