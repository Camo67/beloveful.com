import workshopImagesData from './cloudinary-assets/all-workshop-images.json';

export interface WorkshopImage {
  filename: string;
  url: string;
  format: string;
  width: string;
  height: string;
  bytes: string;
}

export const workshopImages: WorkshopImage[] = workshopImagesData as WorkshopImage[];

export function getWorkshopImageByName(filename: string): WorkshopImage | undefined {
  return workshopImages.find(image => image.filename === filename);
}

export function getWorkshopImagesByFormat(format: string): WorkshopImage[] {
  return workshopImages.filter(image => image.format === format);
}

export default workshopImages;