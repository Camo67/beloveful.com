/**
 * Simple image handling system
 */

/**
 * Creates a direct image URL without any proxy or transformation
 */
export function createImageUrl(originalUrl: string): string {
  if (!originalUrl) return originalUrl;
  
  // If it's already a full URL, return as is
  if (/^https?:\/\//i.test(originalUrl)) {
    return originalUrl;
  }
  
  // If it's a relative path, return as is
  return originalUrl;
}

/**
 * Get alt text for an image
 */
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

/**
 * Simple responsive image attributes
 */
export function buildSimpleSrcSet(originalUrl: string): string {
  // For now, just return the original URL
  // In a more advanced system, you could generate different sizes
  return `${originalUrl} 1x, ${originalUrl} 2x`;
}