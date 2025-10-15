const BASE_ASSET_URL = (import.meta as any)?.env?.VITE_ASSET_BASE_URL?.replace(/\/$/, "") || "";

// Domains we consider as Cloudinary
const CLOUDINARY_HOSTS = new Set([
  'res.cloudinary.com',
]);

export function createProxiedImageUrl(originalUrl: string): string {
  if (!originalUrl) return originalUrl;

  // If absolute URL
  if (/^https?:\/\//i.test(originalUrl)) {
    try {
      const url = new URL(originalUrl);
      // If it's a Cloudinary URL and we have a CDN base, route through our worker as read-through cache
      if (BASE_ASSET_URL && CLOUDINARY_HOSTS.has(url.hostname)) {
        const proxied = `${BASE_ASSET_URL}/images?src=${encodeURIComponent(originalUrl)}`;
        return proxied;
      }
      // Otherwise, serve as-is
      return originalUrl;
    } catch {
      // If URL parsing fails, fall through to return as-is
      return originalUrl;
    }
  }

  // If it's root-relative and we have a CDN base, prefix it
  if (originalUrl.startsWith("/") && BASE_ASSET_URL) {
    return `${BASE_ASSET_URL}${originalUrl}`;
  }

  return originalUrl;
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
  if (!originalUrl || !isCloudinaryUrl(originalUrl)) return originalUrl;
  return originalUrl.replace(/\/upload\//, `/upload/${transform}/`);
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
