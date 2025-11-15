import { GENERATED_WORKSHOP_PHOTOS } from "./generated/generatedWorkshopPhotos";
import adobeImages from "../../data/adobe-images.json";

export interface WorkshopImage {
  src: string;
  alt: string;
  caption?: string;
}

type AdobeImageEntry = { src: string; alt?: string; category?: string };

const WORKSHOP_PATH = "/Website beloveful.com/Workshop Photos/";
const GROUP_SIZE = 5;

const localWorkshopImages: WorkshopImage[] = (adobeImages as AdobeImageEntry[])
  .map((img) => {
    const src = img.src.replace(/^\/images\//, '/Website beloveful.com/');
    return { ...img, src };
  })
  .filter((img) => typeof img.src === "string" && img.src.includes(WORKSHOP_PATH))
  .map((img) => ({
    src: img.src,
    alt: img.alt || "Workshop photo",
  }));

function buildLocalGroup(offset: number): WorkshopImage[] {
  if (!localWorkshopImages.length) return [];
  const group: WorkshopImage[] = [];
  for (let i = 0; i < GROUP_SIZE; i++) {
    const image = localWorkshopImages[(offset + i) % localWorkshopImages.length];
    group.push(image);
  }
  return group;
}

function buildFallbackGroup(offset: number): WorkshopImage[] {
  return GENERATED_WORKSHOP_PHOTOS.slice(offset, offset + GROUP_SIZE).map(
    (photo) => ({
      src: photo.images.desktop,
      alt: photo.title,
    }),
  );
}

const hasLocal = localWorkshopImages.length >= GROUP_SIZE;

export const workshopImages = {
  chicagoPrivate: hasLocal ? buildLocalGroup(0) : buildFallbackGroup(0),
  chicagoGroup: hasLocal ? buildLocalGroup(5) : buildFallbackGroup(5),
  online: hasLocal ? buildLocalGroup(10) : buildFallbackGroup(10),
  mentorship: hasLocal ? buildLocalGroup(15) : buildFallbackGroup(15),
};
