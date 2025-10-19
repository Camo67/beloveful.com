import { Cloudinary } from '@cloudinary/url-gen';

// Central Cloudinary instance for the app
export const cld = new Cloudinary({
  cloud: {
    cloudName: (import.meta as any)?.env?.VITE_CLOUDINARY_CLOUD_NAME || 'dvwdoezk1',
  },
});

// Check if a URL is a Cloudinary delivery URL
export function isCloudinaryUrl(url: string): boolean {
  try {
    const u = new URL(url);
    return u.hostname === 'res.cloudinary.com' && /\/image\/upload\//.test(u.pathname);
  } catch {
    return false;
  }
}

// Extract publicId (including folder path) from a full Cloudinary URL
// Example: https://res.cloudinary.com/<cloud>/image/upload/v123/folder/name.jpg -> folder/name
export function publicIdFromUrl(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname !== 'res.cloudinary.com') return null;
    const match = u.pathname.match(/\/image\/upload\/(?:v\d+\/)?([^?#]+)$/);
    if (!match) return null;
    const withExt = decodeURIComponent(match[1]);
    return withExt.replace(/\.[^./]+$/, '');
  } catch {
    return null;
  }
}