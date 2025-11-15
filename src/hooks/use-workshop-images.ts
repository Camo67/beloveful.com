import { useQuery } from '@tanstack/react-query';
import { workshopImages as localWorkshopImages } from '@/lib/workshop-data';
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

export function useWorkshopImages() {
  return useQuery<WorkshopImagesResponse>({
    queryKey: ['workshop-images'],
    queryFn: async () => {
      const transformGroup = async (group: { src: string; alt: string }[]) => {
        return Promise.all(
          group.map(async (image) => {
            const workingUrl = await getWorkingImageUrl(image.src, image.src);
            return {
              src: workingUrl,
              alt: image.alt,
              desktop: workingUrl,
              mobile: workingUrl,
            };
          }),
        );
      };

      const [chicagoPrivate, chicagoGroup, online, mentorship] = await Promise.all([
        transformGroup(localWorkshopImages.chicagoPrivate),
        transformGroup(localWorkshopImages.chicagoGroup),
        transformGroup(localWorkshopImages.online),
        transformGroup(localWorkshopImages.mentorship),
      ]);

      return { success: true, chicagoPrivate, chicagoGroup, online, mentorship };
    },
    staleTime: Infinity, // Data is static
    retry: 0,
  });
}
