/**
 * Utility functions for handling simple image data and preventing broken URLs
 */

/**
 * Validates if a URL is accessible
 * @param url - The URL to validate
 * @returns Promise that resolves to true if URL is accessible, false otherwise
 */
export async function isUrlAccessible(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch (error) {
    console.warn(`Failed to access URL: ${url}`, error);
    return false;
  }
}

/**
 * Fixes common URL encoding issues
 * @param url - The URL to fix
 * @returns Fixed URL
 */
export function fixImageUrl(url: string): string {
  // Fix double encoding issues
  let fixedUrl = url.replace(/%2520/g, '%20');
  
  // Ensure proper encoding
  try {
    const urlObj = new URL(url);
    urlObj.pathname = decodeURIComponent(urlObj.pathname);
    fixedUrl = urlObj.href;
  } catch (error) {
    console.warn('Failed to parse URL for fixing:', url, error);
  }
  
  return fixedUrl;
}

/**
 * Validates and fixes image URLs in batch
 * @param images - Array of image objects with desktop and mobile URLs
 * @param validate - Whether to validate URLs are accessible (default: false)
 * @returns Promise that resolves to array of fixed image objects
 */
export async function validateAndFixImageUrls(
  images: { desktop: string; mobile: string }[],
  validate = false
): Promise<{ desktop: string; mobile: string }[]> {
  const fixedImages = images.map(image => ({
    desktop: fixImageUrl(image.desktop),
    mobile: fixImageUrl(image.mobile)
  }));
  
  if (validate) {
    const validationResults = await Promise.all(
      fixedImages.map(async (image, index) => ({
        index,
        desktopAccessible: await isUrlAccessible(image.desktop),
        mobileAccessible: await isUrlAccessible(image.mobile)
      }))
    );
    
    // Log any inaccessible URLs
    validationResults.forEach(result => {
      if (!result.desktopAccessible) {
        console.warn(`Desktop image URL inaccessible: ${fixedImages[result.index].desktop}`);
      }
      if (!result.mobileAccessible) {
        console.warn(`Mobile image URL inaccessible: ${fixedImages[result.index].mobile}`);
      }
    });
  }
  
  return fixedImages;
}

/**
 * Creates a fallback image object with placeholder URLs
 * @param placeholderUrl - URL to use as fallback
 * @returns Image object with fallback URLs
 */
export function createFallbackImage(placeholderUrl: string = 'https://placehold.co/600x400?text=Image+Not+Found'): { 
  desktop: string; 
  mobile: string 
} {
  return {
    desktop: placeholderUrl,
    mobile: placeholderUrl
  };
}

export default {
  isUrlAccessible,
  fixImageUrl,
  validateAndFixImageUrls,
  createFallbackImage
};