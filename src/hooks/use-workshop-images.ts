import { useQuery } from '@tanstack/react-query';
import { workshopImages as rawWorkshopImages, WorkshopImage as RawWorkshopImage } from '@/lib/workshopImages';
import { getWorkingImageUrl } from '@/lib/image-utils';

export interface WorkshopImage {
  src: string;
  alt: string; 
  desktop: string;
  mobile: string;
}

export interface WorkshopImagesResponse {
  success: boolean;
  chicagoPrivate: WorkshopImage[];
  chicagoGroup: WorkshopImage[];
  online: WorkshopImage[];
  mentorship: WorkshopImage[];
}

// Helper function to transform RawWorkshopImage to WorkshopImage
const transformRawWorkshopImage = async (rawImage: RawWorkshopImage): Promise<WorkshopImage> => {
  // Ensure the image URL is accessible, if not use a fallback
  const workingUrl = await getWorkingImageUrl(rawImage.url);
  
  return {
    src: workingUrl,
    alt: rawImage.filename, // Assuming filename can be used as alt text
    desktop: workingUrl, // Assuming desktop uses the same URL for now
    mobile: workingUrl, // Assuming mobile uses the same URL for now
  };
};

export function useWorkshopImages() {
  return useQuery<WorkshopImagesResponse>({
    queryKey: ['workshop-images'],
    queryFn: async () => {
      // Transform the raw workshop images data into the desired format
      const transformedImagePromises = rawWorkshopImages.map(transformRawWorkshopImage);
      const transformedImages = await Promise.all(transformedImagePromises);

      // For now, we'll just return all images in each category.
      // In a real scenario, you would filter these based on actual categories.
      return {
        success: true,
        chicagoPrivate: transformedImages,
        chicagoGroup: transformedImages,
        online: transformedImages,
        mentorship: transformedImages,
      };
    },
    staleTime: Infinity, // Data is static
    retry: 0,
  });
}