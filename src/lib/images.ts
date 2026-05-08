import { validateAndFixImageUrl, fixImageUrl } from './image-utils';

const SECURE_ROOT_BASE =
  (import.meta as any)?.env?.VITE_SECURE_CDN_BASE_URL?.replace(/\/+$/, "") || "";
const BASE_ASSET_URL =
  (import.meta as any)?.env?.VITE_ASSET_BASE_URL?.replace(/\/$/, "") || "";

/**
 * Creates a proxied image URL or returns the original if it's already absolute.
 * Since Cloudinary is removed, this now primarily handles root-relative paths
 * and ensures they point to the correct asset base (Bluehost).
 */
export function createProxiedImageUrl(originalUrl: string): string {
  // Handle empty or invalid URLs
  if (!originalUrl || typeof originalUrl !== 'string') {
    console.warn('Invalid URL provided to createProxiedImageUrl:', originalUrl);
    return createFallbackImageUrl();
  }
  
  // Trim whitespace
  let trimmedUrl = originalUrl.trim();
  
  if (!trimmedUrl) {
    console.warn('Empty URL provided to createProxiedImageUrl');
    return createFallbackImageUrl();
  }

  // Fix common URL encoding issues
  try {
    trimmedUrl = fixImageUrl(trimmedUrl);
  } catch (error) {
    console.warn('Error fixing URL encoding:', trimmedUrl, error);
  }

  // If absolute URL, return as-is
  if (/^https?:\/\//i.test(trimmedUrl)) {
    return trimmedUrl;
  }

  // If it's root-relative, prefix with SECURE_ROOT_BASE or BASE_ASSET_URL
  if (trimmedUrl.startsWith("/")) {
    if (SECURE_ROOT_BASE) {
      return `${SECURE_ROOT_BASE}${trimmedUrl}`;
    }
    if (BASE_ASSET_URL) {
      return `${BASE_ASSET_URL}${trimmedUrl}`;
    }
    return trimmedUrl;
  }

  // For any other cases, return as-is
  return trimmedUrl;
}

function createFallbackImageUrl(): string {
  return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBhdmFpbGFibGU8L3RleHQ+Cjwvc3ZnPg==';
}

export function getImageAltText(filename: string, country?: string): string {
  if (country) {
    return `${country} – ${filename}`;
  }
  
  // Extract filename from URL
  const urlParts = filename.split('/');
  const filenameWithExt = urlParts[urlParts.length - 1];
  const nameOnly = filenameWithExt.split('.')[0];
  
  return `Photography by Tony Menias – ${nameOnly}`;
}

export const DEFAULT_WIDTHS = [360, 480, 640, 768, 1024, 1280, 1536, 1920, 2048, 2560] as const;
export const DEFAULT_SIZES = "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw";

/**
 * Debug utility to help trace image URL processing issues
 */
export function debugImageProcessing(originalUrl: string, componentName?: string): void {
  const context = componentName ? `[${componentName}] ` : '';
  console.group(`${context}Debugging image URL processing`);
  console.log('Original URL:', originalUrl);
  
  if (!originalUrl) {
    console.warn('URL is falsy');
    console.groupEnd();
    return;
  }
  
  try {
    const processed = createProxiedImageUrl(originalUrl);
    console.log('Processed URL:', processed);
  } catch (processError) {
    console.error('Error processing URL:', processError);
  }
  
  console.groupEnd();
}
