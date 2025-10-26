import { validateAndFixImageUrl, fixImageUrl } from './image-utils';

const BASE_ASSET_URL = (import.meta as any)?.env?.VITE_ASSET_BASE_URL?.replace(/\/$/, "") || "";

// Domains we consider as Cloudinary
const CLOUDINARY_HOSTS = new Set([
  'res.cloudinary.com',
]);

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

  // Fix common URL encoding issues, particularly double encoding
  try {
    trimmedUrl = fixImageUrl(trimmedUrl);
  } catch (error) {
    console.warn('Error fixing URL encoding:', trimmedUrl, error);
  }

  // If absolute URL
  if (/^https?:\/\//i.test(trimmedUrl)) {
    try {
      const url = new URL(trimmedUrl);
      // If it's a Cloudinary URL and we have a CDN base, route through our worker as read-through cache
      if (BASE_ASSET_URL && CLOUDINARY_HOSTS.has(url.hostname)) {
        // For Cloudinary URLs, we need to be careful with encoding
        // The src parameter should be encoded, but we need to avoid double encoding
        const proxied = `${BASE_ASSET_URL}/images?src=${encodeURIComponent(trimmedUrl)}`;
        console.debug('Creating proxied Cloudinary URL:', { original: trimmedUrl, proxied });
        return proxied;
      }
      // For other absolute URLs, return as-is since they should already be properly encoded
      console.debug('Using absolute URL as-is:', { original: trimmedUrl });
      return trimmedUrl;
    } catch (error) {
      console.warn('Error processing absolute URL in createProxiedImageUrl:', trimmedUrl, error);
      // If URL parsing fails, return as-is
      return trimmedUrl;
    }
  }

  // If it's root-relative, optionally prefix with CDN base
  if (trimmedUrl.startsWith("/")) {
    const combined = BASE_ASSET_URL ? `${BASE_ASSET_URL}${trimmedUrl}` : trimmedUrl;
    console.debug('Creating root-relative URL:', { original: trimmedUrl, base: BASE_ASSET_URL, combined });
    return combined;
  }

  // For any other cases, return as-is
  console.debug('Using URL as-is:', { original: trimmedUrl });
  return trimmedUrl;
}

function createFallbackImageUrl(): string {
  // Return a data URL as fallback to avoid 404s
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

// --- Cloudinary optimization helpers ---

function isCloudinaryUrl(url: string): boolean {
  try {
    const u = new URL(url);
    return CLOUDINARY_HOSTS.has(u.hostname) && /\/upload\//.test(u.pathname);
  } catch {
    return false;
  }
}

/**
 * Inserts a Cloudinary transformation string immediately after the `/upload/` segment.
 * Keeps versioning (e.g. v123) and public id intact.
 */
export function withCloudinaryTransform(originalUrl: string, transform: string): string {
  // Validate and fix the original URL first
  const validatedUrl = validateAndFixImageUrl(originalUrl);
  
  if (!validatedUrl || !isCloudinaryUrl(validatedUrl)) return validatedUrl;
  return validatedUrl.replace(/\/upload\//, `/upload/${transform}/`);
}

export const DEFAULT_WIDTHS = [360, 480, 640, 768, 1024, 1280, 1536, 1920, 2048, 2560] as const;
export const DEFAULT_SIZES = "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw";

/**
 * Builds a proxied srcset for a Cloudinary image with sensible defaults:
 * - f_auto,q_auto for best format/quality
 * - dpr_auto for HiDPI screens
 * - c_limit to avoid upscaling
 */
export function buildProxiedSrcSet(originalUrl: string, widths: readonly number[] = DEFAULT_WIDTHS): string {
  const baseTransform = "f_auto,q_auto,dpr_auto,c_limit";
  return widths
    .map((w) => {
      const t = `${baseTransform},w_${w}`;
      const transformed = withCloudinaryTransform(originalUrl, t);
      return `${createProxiedImageUrl(transformed)} ${w}w`;
    })
    .join(", ");
}

/**
 * Debug utility to help trace image URL processing issues
 * @param originalUrl - The original URL to debug
 * @param componentName - Optional component name for logging context
 */
export function debugImageProcessing(originalUrl: string, componentName?: string): void {
  const context = componentName ? `[${componentName}] ` : '';
  console.group(`${context}Debugging image URL processing`);
  console.log('Original URL:', originalUrl);
  console.log('Type of URL:', typeof originalUrl);
  
  if (!originalUrl) {
    console.warn('URL is falsy');
    console.groupEnd();
    return;
  }
  
  if (typeof originalUrl !== 'string') {
    console.warn('URL is not a string');
    console.groupEnd();
    return;
  }
  
  const trimmed = originalUrl.trim();
  console.log('Trimmed URL:', trimmed);
  
  if (!trimmed) {
    console.warn('URL is empty after trimming');
    console.groupEnd();
    return;
  }
  
  try {
    const processed = createProxiedImageUrl(trimmed);
    console.log('Processed URL:', processed);
    
    // Try to create a URL object to check if it's valid
    try {
      new URL(processed);
      console.log('Processed URL is valid');
    } catch (urlError) {
      console.warn('Processed URL is invalid:', urlError);
    }
  } catch (processError) {
    console.error('Error processing URL:', processError);
  }
  
  console.groupEnd();
}
