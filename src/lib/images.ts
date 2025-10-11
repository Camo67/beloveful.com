const BASE_ASSET_URL = (import.meta as any)?.env?.VITE_ASSET_BASE_URL?.replace(/\/$/, "") || "";

export function createProxiedImageUrl(originalUrl: string): string {
  // If it's an absolute URL, leave it as-is
  if (/^https?:\/\//i.test(originalUrl)) return originalUrl;
  // If it's a root-relative path and BASE_ASSET_URL is configured, prefix it
  if (originalUrl.startsWith("/") && BASE_ASSET_URL) return `${BASE_ASSET_URL}${originalUrl}`;
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
