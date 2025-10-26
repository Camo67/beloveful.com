/**
 * Utility functions for handling image URLs and preventing broken images
 */

/**
 * Validates if a URL is accessible with a timeout
 * @param url - The URL to validate
 * @returns Promise that resolves to true if URL is accessible, false otherwise
 */
export async function isUrlAccessible(url: string): Promise<boolean> {
  try {
    // Create a timeout promise
    const timeoutPromise = new Promise<Response>((_, reject) => {
      setTimeout(() => reject(new Error('Request timeout')), 5000); // 5 second timeout
    });

    // Race the fetch request against the timeout
    const response = await Promise.race([
      fetch(url, { method: 'HEAD' }),
      timeoutPromise
    ]);
    
    return (response as Response).ok;
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
  if (!url) return url;
  
  // Fix double encoding issues - %2520 should be %20 (space)
  let fixedUrl = url.replace(/%2520/g, '%20');
  
  // Fix other common double encodings
  fixedUrl = fixedUrl.replace(/%252[fF]/g, '%2F'); // Forward slash
  fixedUrl = fixedUrl.replace(/%253[aA]/g, '%3A'); // Colon
  fixedUrl = fixedUrl.replace(/%253[fF]/g, '%3F'); // Question mark
  fixedUrl = fixedUrl.replace(/%2523/g, '%23');   // Hash
  fixedUrl = fixedUrl.replace(/%255[bB]/g, '%5B'); // Left square bracket
  fixedUrl = fixedUrl.replace(/%255[dD]/g, '%5D'); // Right square bracket
  
  // Ensure proper decoding of the full URL
  try {
    // First, decode the entire URL to handle any over-encoded parts
    const decodedUrl = decodeURIComponent(fixedUrl);
    
    // Then parse it as a URL to normalize it
    const urlObj = new URL(decodedUrl);
    
    // Re-encode only the necessary parts (path, query parameters)
    // This avoids over-encoding while ensuring proper formatting
    const properlyEncodedUrl = urlObj.href;
    
    return properlyEncodedUrl;
  } catch (error) {
    console.warn('Failed to parse/fix URL, returning as-is:', url, error);
    return url; // Return original if we can't fix it
  }
}

/**
 * Creates a fallback image object with placeholder URLs
 * @param placeholderUrl - URL to use as fallback
 * @returns Image URL string
 */
export function createFallbackImageUrl(placeholderUrl: string = 'https://placehold.co/600x400?text=Image+Not+Found'): string {
  return placeholderUrl;
}

/**
 * Validates image URL and provides a fallback if invalid
 * @param url - The URL to validate
 * @param fallbackUrl - Optional fallback URL
 * @returns Valid URL or fallback
 */
export function validateAndFixImageUrl(url: string, fallbackUrl?: string): string {
  // Handle empty or invalid URLs
  if (!url || typeof url !== 'string') {
    console.warn('Invalid URL provided to validateAndFixImageUrl:', url);
    return fallbackUrl || createFallbackImageUrl();
  }
  
  // Trim whitespace
  const trimmedUrl = url.trim();
  
  if (!trimmedUrl) {
    console.warn('Empty URL provided to validateAndFixImageUrl');
    return fallbackUrl || createFallbackImageUrl();
  }

  try {
    // Fix common URL issues
    const fixedUrl = fixImageUrl(trimmedUrl);
    
    // Validate URL format
    new URL(fixedUrl);
    
    return fixedUrl;
  } catch (error) {
    console.warn(`Invalid image URL: ${url}`, error);
    return fallbackUrl || createFallbackImageUrl();
  }
}

/**
 * Checks if an image URL is accessible and returns a working URL or fallback
 * @param url - The URL to check
 * @param fallbackUrl - Optional fallback URL
 * @returns Promise that resolves to a working URL or fallback
 */
export async function getWorkingImageUrl(url: string, fallbackUrl?: string): Promise<string> {
  // Handle empty or invalid URLs
  if (!url || typeof url !== 'string') {
    console.warn('Invalid URL provided to getWorkingImageUrl:', url);
    return fallbackUrl || createFallbackImageUrl();
  }

  // Trim whitespace
  const trimmedUrl = url.trim();

  if (!trimmedUrl) {
    console.warn('Empty URL provided to getWorkingImageUrl');
    return fallbackUrl || createFallbackImageUrl();
  }

  try {
    // Fix common URL issues
    const fixedUrl = fixImageUrl(trimmedUrl);
    
    // Validate URL format
    new URL(fixedUrl);
    
    // Check if URL is accessible
    const isAccessible = await isUrlAccessible(fixedUrl);
    if (isAccessible) {
      return fixedUrl;
    } else {
      console.warn(`Image URL is not accessible: ${url}`);
      return fallbackUrl || createFallbackImageUrl();
    }
  } catch (error) {
    console.warn(`Invalid image URL: ${url}`, error);
    return fallbackUrl || createFallbackImageUrl();
  }
}

/**
 * Debug function to check image URL issues
 * @param url - The URL to debug
 * @returns Debug information about the URL
 */
export function debugImageUrl(url: string): { 
  original: string; 
  processed: string; 
  isValid: boolean; 
  errors: string[] 
} {
  const result = {
    original: url,
    processed: '',
    isValid: false,
    errors: [] as string[]
  };
  
  try {
    if (!url) {
      result.errors.push('URL is null or undefined');
      return result;
    }
    
    if (typeof url !== 'string') {
      result.errors.push('URL is not a string');
      return result;
    }
    
    const trimmed = url.trim();
    if (!trimmed) {
      result.errors.push('URL is empty or whitespace only');
      return result;
    }
    
    result.processed = validateAndFixImageUrl(trimmed);
    
    try {
      new URL(result.processed);
      result.isValid = true;
    } catch (error) {
      result.errors.push(`Processed URL is invalid: ${error}`);
    }
  } catch (error) {
    result.errors.push(`Error processing URL: ${error}`);
  }
  
  return result;
}

export default {
  isUrlAccessible,
  fixImageUrl,
  createFallbackImageUrl,
  validateAndFixImageUrl,
  getWorkingImageUrl,
  debugImageUrl
};