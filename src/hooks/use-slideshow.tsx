import { useQuery } from '@tanstack/react-query';
import { HOME_SLIDESHOW } from '@/lib/data'; // Fallback data

interface APISlideshowImage {
  id: number;
  desktop: string;
  mobile: string;
  title?: string;
  description?: string;
  altText?: string;
}

interface APISlideshowResponse {
  success: boolean;
  images: APISlideshowImage[];
}

// Transform API data to match existing interface
const transformSlideshowImage = (image: APISlideshowImage) => ({
  desktop: image.desktop,
  mobile: image.mobile
});

export const useSlideshow = () => {
  return useQuery({
    queryKey: ['slideshow'],
    queryFn: async () => {
      try {
        const response = await fetch('/api/images/slideshow');
        
        if (!response.ok) {
          throw new Error('Failed to fetch slideshow images');
        }
        
        const data: APISlideshowResponse = await response.json();
        
        if (data.success && data.images) {
          return data.images.map(transformSlideshowImage);
        }
        
        throw new Error('Invalid response format');
      } catch (error) {
        console.warn('Failed to fetch slideshow from API, using fallback data:', error);
        // Return static data as fallback
        return HOME_SLIDESHOW;
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1, // Only retry once before falling back to static data
  });
};