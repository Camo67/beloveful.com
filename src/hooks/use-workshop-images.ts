import { useQuery } from '@tanstack/react-query';

export interface WorkshopImage { src: string; alt: string; }
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
      const res = await fetch('/api/public/workshops');
      if (!res.ok) throw new Error('Failed to load workshop images');
      return res.json();
    },
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
}