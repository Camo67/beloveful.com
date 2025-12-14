/**
 * Utility functions for handling image URLs and preventing broken images
 */
import cdnMapping from './cdn-url-mapping.json';
import { getSecureImageUrlByFilename } from './secure-images';

const runtimeEnv = (() => {
  try {
    // Vite during build/runtime exposes import.meta.env
    if (typeof import.meta !== 'undefined' && (import.meta as any)?.env) {
      return (import.meta as any).env as Record<string, string>;
    }
  } catch {
    // ignore when import.meta is unavailable (CommonJS)
  }
  if (typeof process !== 'undefined' && process.env) {
    return process.env as Record<string, string>;
  }
  return {};
})();

const CDN_LOOKUP: Record<string, string> = cdnMapping as Record<string, string>;
const LOCAL_LIBRARY_PREFIX = '/Website beloveful.com/';
const DEFAULT_SITE_ORIGIN =
  runtimeEnv.VITE_PUBLIC_SITE_URL ||
  'https://beloveful.com';
const DEFAULT_CDN_FALLBACK = DEFAULT_SITE_ORIGIN;

export const CDN_BASE_URL = (() => {
  const envOverride =
    runtimeEnv.VITE_SECURE_CDN_BASE_URL ||
    runtimeEnv.VITE_CDN_BASE_URL ||
    runtimeEnv.VITE_APP_CDN_BASE;
  if (envOverride && typeof envOverride === 'string') {
    return envOverride.replace(/\/+$/, '');
  }
  const mappedUrl = Object.values(CDN_LOOKUP).find((value) => typeof value === 'string');
  if (mappedUrl) {
    try {
      return new URL(mappedUrl).origin;
    } catch {
      // fall through to default
    }
  }
  return DEFAULT_CDN_FALLBACK.replace(/\/+$/, '');
})();

const CDN_PATH_PREFIX = '/images/';

/**
 * Validates if a URL is accessible with a timeout
 * @param url - The URL to validate
 * @returns Promise that resolves to true if URL is accessible, false otherwise
 */
export async function isUrlAccessible(url: string): Promise<boolean> {
  try {
    // Create a timeout promise
    const timeoutPromise = new Promise<boolean>((_, reject) => {
      setTimeout(() => reject(new Error('Request timeout')), 3000); // 3 second timeout
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

const RELATIVE_URL_REGEX = /^\/(?!\/)/;

function encodeSpaces(input: string): string {
  return input.replace(/ /g, '%20');
}

/**
 * Validates image URL and provides a fallback if invalid
 * @param url - The URL to validate
 * @param fallbackUrl - Optional fallback URL
 * @returns Valid URL or fallback
 */
export function validateAndFixImageUrl(url?: string | null, fallbackUrl?: string): string {
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

  if (RELATIVE_URL_REGEX.test(trimmedUrl)) {
    return encodeSpaces(trimmedUrl);
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
export async function getWorkingImageUrl(url?: string | null, fallbackUrl?: string): Promise<string> {
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

  if (RELATIVE_URL_REGEX.test(trimmedUrl)) {
    return encodeSpaces(trimmedUrl);
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

function normalizeRelativePath(relative: string): string {
  return relative.replace(/^[\\/]+/, '').replace(/\\/g, '/');
}

function buildCdnFallbackUrl(relative: string): string {
  const normalized = normalizeRelativePath(relative);
  const withoutImagesPrefix = normalized.replace(/^images[\\/]+/i, '');
  const encodedPath = withoutImagesPrefix
    .split('/')
    .map(segment => encodeURIComponent(segment))
    .join('/');
  return `${CDN_BASE_URL}${CDN_PATH_PREFIX}${encodedPath}`;
}

function buildLocalLibraryUrl(relative: string): string {
  const normalized = normalizeRelativePath(relative);
  const localPath = `${LOCAL_LIBRARY_PREFIX}${normalized}`;
  return encodeSpaces(localPath);
}

function buildSiteImagesUrl(relative: string): string {
  const normalized = normalizeRelativePath(relative);
  const prefixed = normalized.startsWith('images/') ? normalized : `images/${normalized}`;
  const encodedPath = prefixed
    .split('/')
    .map(segment => encodeURIComponent(segment))
    .join('/');
  return `/${encodedPath}`;
}

function lookupCdnUrl(relative: string): string | undefined {
  const normalized = normalizeRelativePath(relative);
  const key = normalized.startsWith(LOCAL_LIBRARY_PREFIX.slice(1))
    ? `/${normalized}`
    : `${LOCAL_LIBRARY_PREFIX}${normalized}`;
  const spaceKey = key;
  const encodedKey = key.replace(/ /g, '%20');
  return CDN_LOOKUP[spaceKey] || CDN_LOOKUP[encodedKey];
}

function deriveRelativeFromUrl(url: string): string | null {
  if (!url) return null;

  try {
    const parsed = new URL(url);
    const pathname = decodeURIComponent(parsed.pathname);

    if (pathname.startsWith(CDN_PATH_PREFIX)) {
      return pathname.slice(CDN_PATH_PREFIX.length);
    }

    const marker = LOCAL_LIBRARY_PREFIX;
    const idx = pathname.indexOf(marker);
    if (idx !== -1) {
      return pathname.slice(idx + marker.length);
    }
  } catch {
    if (url.startsWith(CDN_PATH_PREFIX)) {
      return decodeURIComponent(url.slice(CDN_PATH_PREFIX.length));
    }
    if (url.startsWith(LOCAL_LIBRARY_PREFIX) || url.startsWith(LOCAL_LIBRARY_PREFIX.replace(/ /g, '%20'))) {
      const cleaned = url.replace(/^\/+/, '');
      const decoded = decodeURIComponent(cleaned);
      return decoded.slice(LOCAL_LIBRARY_PREFIX.length);
    }
  }

  return null;
}

export function mapToCdnUrl(originalUrl?: string | null): string | null {
  if (!originalUrl || typeof originalUrl !== 'string') {
    return null;
  }

  const hasExplicitCdn = !!(
    runtimeEnv.VITE_SECURE_CDN_BASE_URL ||
    runtimeEnv.VITE_CDN_BASE_URL ||
    runtimeEnv.VITE_APP_CDN_BASE
  );

  const trimmed = originalUrl.trim();
  if (RELATIVE_URL_REGEX.test(trimmed)) {
    return encodeSpaces(trimmed);
  }

  const filename = (() => {
    try {
      const parsed = new URL(trimmed);
      return parsed.pathname.split('/').pop() ?? '';
    } catch {
      const parts = trimmed.split('/');
      return parts[parts.length - 1] ?? '';
    }
  })();

  const secureUrl = getSecureImageUrlByFilename(filename);
  if (secureUrl) {
    return secureUrl;
  }

  const relative = deriveRelativeFromUrl(originalUrl);
  if (!relative) {
    return validateAndFixImageUrl(trimmed);
  }
  const mappedUrl = lookupCdnUrl(relative);
  if (mappedUrl) {
    return mappedUrl;
  }

  if (hasExplicitCdn) {
    return buildCdnFallbackUrl(relative);
  }

  return buildLocalLibraryUrl(relative);
}

export default {
  isUrlAccessible,
  fixImageUrl,
  createFallbackImageUrl,
  validateAndFixImageUrl,
  getWorkingImageUrl,
  debugImageUrl,
  mapToCdnUrl
};
