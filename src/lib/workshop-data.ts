// Workshop Images Data
import { GENERATED_WORKSHOP_PHOTOS } from "./generated/generatedWorkshopPhotos";

export interface WorkshopImage {
  title: any;
  images: any;
  src: string;
  alt: string;
  caption?: string;
}

export const workshopImages = {
  chicagoPrivate: GENERATED_WORKSHOP_PHOTOS.slice(0, 5).map(photo => ({
    src: photo.images.desktop,
    alt: photo.title
  })) as WorkshopImage[],

  chicagoGroup: GENERATED_WORKSHOP_PHOTOS.slice(5, 10).map(photo => ({
    src: photo.images.desktop,
    alt: photo.title
  })) as WorkshopImage[],

  online: GENERATED_WORKSHOP_PHOTOS.slice(10, 15).map(photo => ({
    src: photo.images.desktop,
    alt: photo.title
  })) as WorkshopImage[],

  mentorship: GENERATED_WORKSHOP_PHOTOS.slice(15, 20).map(photo => ({
    src: photo.images.desktop,
    alt: photo.title
  })) as WorkshopImage[]
};
