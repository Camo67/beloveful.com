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
      // Use static Cloudinary data directly
      console.log('🖼️ Loading slideshow from static Cloudinary data');
      return HOME_SLIDESHOW;
    },
    staleTime: Infinity, // Cache forever since static data doesn't change
    retry: false, // No need to retry static data
  });
};
