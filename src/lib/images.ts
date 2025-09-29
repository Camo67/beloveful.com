export function createProxiedImageUrl(originalUrl: string): string {
  // For development/demo, return original URL
  // In production, this would go through an image proxy
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