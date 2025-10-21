import { useQuery } from '@tanstack/react-query';
import { WORKSHOP_IMAGES } from '@/lib/workshopImages';

export interface WorkshopImage { 
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
      // Return the static workshop images data
      return WORKSHOP_IMAGES;
    },
    staleTime: Infinity, // Data is static
    retry: 0,
  });
}