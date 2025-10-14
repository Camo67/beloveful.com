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
