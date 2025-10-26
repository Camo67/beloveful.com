import { useQuery } from '@tanstack/react-query';
import prefixMappedData from '@/lib/cloudinary-assets/prefix-mapped.json';
import { SlideshowImage } from '@/lib/data';
import { getWorkingImageUrl } from '@/lib/image-utils';

// Transform prefix-mapped data to match slideshow interface
const transformPrefixMappedData = async (): Promise<SlideshowImage[]> => {
  console.log('🔍 Transforming prefix-mapped data:', prefixMappedData);
  const images: SlideshowImage[] = [];
  
  // Get images from matched regions (North America, etc.)
  if (prefixMappedData && (prefixMappedData as any).matched) {
    console.log('🔍 Matched data found');
    const matchedRegions = Object.values((prefixMappedData as any).matched);
    
    for (const region of matchedRegions) {
      const cityImages = Object.values(region);
      for (const cityImage of cityImages) {
        for (const image of cityImage as any[]) {
          // Ensure the image URL is accessible
          const workingUrl = await getWorkingImageUrl(image.url);
          images.push({
            desktop: workingUrl,
            mobile: workingUrl
          });
        }
      }
    }
  }
  
  console.log('🔍 Images from matched regions:', images.length);
  
  // Get images from unknown (if needed)
  if (prefixMappedData && (prefixMappedData as any).unknown && images.length < 20) { // Increase limit to ensure we have enough images
    console.log('🔍 Adding images from unknown section');
    const unknownImages = (prefixMappedData as any).unknown.slice(0, 20 - images.length);
    for (const image of unknownImages) {
      // Ensure the image URL is accessible
      const workingUrl = await getWorkingImageUrl(image.url);
      images.push({
        desktop: workingUrl,
        mobile: workingUrl
      });
    }
  }
  
  console.log('🔍 Total images:', images.length);
  return images;
};

export const useSlideshow = () => {
  return useQuery<SlideshowImage[]>({
    queryKey: ['slideshow'],
    queryFn: async () => {
      try {
        console.log('🖼️ Loading slideshow from prefix-mapped data');
        const images = await transformPrefixMappedData();
        console.log('🖼️ Loaded', images.length, 'images');
        return images.length > 0 ? images : [];
      } catch (error) {
        console.error('Failed to load slideshow data:', error);
        return [];
      }
    },
    staleTime: 1000 * 60 * 60, // 1 hour
    retry: 1,
  });
};