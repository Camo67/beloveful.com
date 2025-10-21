// Workshop images data
// Run `node scripts/generate-workshop-images.mjs` to populate this file

export interface WorkshopImage {
  desktop: string;
  mobile: string;
}

export interface WorkshopImagesData {
  success: boolean;
  chicagoPrivate: WorkshopImage[];
  chicagoGroup: WorkshopImage[];
  online: WorkshopImage[];
  mentorship: WorkshopImage[];
}

export const WORKSHOP_IMAGES: WorkshopImagesData = {
  success: true,
  chicagoPrivate: [],
  chicagoGroup: [],
  online: [],
  mentorship: []
};
