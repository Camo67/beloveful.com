/**
 * R2 CDN Integration utilities for Beloveful
 * Handles file uploads and optimized image serving
 */

export interface UploadResponse {
  success: boolean;
  filename: string;
  url: string;
  size: number;
  type: string;
  error?: string;
}

export interface SignedUrlResponse {
  signedUrl: string;
  filename: string;
  publicUrl: string;
  error?: string;
}

export interface ImageOptimizationOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'auto' | 'webp' | 'avif' | 'jpg' | 'png';
}

const CDN_BASE_URL = 'https://cdn.beloveful.com';
const API_BASE_URL = 'https://cdn.beloveful.com/api';

/**
 * Upload a file directly to R2 via the CDN Worker
 */
export async function uploadToR2(
  file: File, 
  path: string = 'uploads'
): Promise<UploadResponse> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('path', path);

  try {
    const response = await fetch(`${API_BASE_URL}/upload`, {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.error || 'Upload failed');
    }

    return result;
  } catch (error) {
    console.error('R2 upload error:', error);
    return {
      success: false,
      filename: '',
      url: '',
      size: 0,
      type: '',
      error: error instanceof Error ? error.message : 'Upload failed'
    };
  }
}

/**
 * Generate a signed URL for direct upload
 */
export async function getSignedUploadUrl(
  filename: string,
  contentType: string
): Promise<SignedUrlResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/signed-url`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        filename,
        contentType
      })
    });

    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.error || 'Failed to get signed URL');
    }

    return result;
  } catch (error) {
    console.error('Signed URL error:', error);
    throw error;
  }
}

/**
 * Upload using signed URL (for larger files or better control)
 */
export async function uploadWithSignedUrl(
  file: File,
  filename: string
): Promise<string> {
  try {
    // Get signed URL
    const { signedUrl, publicUrl } = await getSignedUploadUrl(filename, file.type);
    
    // Upload directly to R2
    const uploadResponse = await fetch(signedUrl, {
      method: 'PUT',
      body: file,
      headers: {
        'Content-Type': file.type,
      },
    });

    if (!uploadResponse.ok) {
      throw new Error('Upload failed');
    }

    return publicUrl;
  } catch (error) {
    console.error('Signed URL upload error:', error);
    throw error;
  }
}

/**
 * Generate optimized image URL with parameters
 */
export function getOptimizedImageUrl(
  path: string, 
  options: ImageOptimizationOptions = {}
): string {
  const url = new URL(`${CDN_BASE_URL}/${path.replace(/^\//, '')}`);
  
  if (options.width) {
    url.searchParams.set('w', options.width.toString());
  }
  
  if (options.height) {
    url.searchParams.set('h', options.height.toString());
  }
  
  if (options.quality) {
    url.searchParams.set('q', options.quality.toString());
  }
  
  if (options.format) {
    url.searchParams.set('f', options.format);
  }

  return url.toString();
}

/**
 * Generate responsive image URLs for different screen sizes
 */
export function getResponsiveImageUrls(
  path: string,
  options: ImageOptimizationOptions = {}
): {
  mobile: string;
  tablet: string;
  desktop: string;
  large: string;
} {
  const basePath = path.replace(/^\//, '');
  
  return {
    mobile: getOptimizedImageUrl(basePath, { ...options, width: 640 }),
    tablet: getOptimizedImageUrl(basePath, { ...options, width: 1024 }),
    desktop: getOptimizedImageUrl(basePath, { ...options, width: 1440 }),
    large: getOptimizedImageUrl(basePath, { ...options, width: 1920 }),
  };
}

/**
 * Batch upload multiple files
 */
export async function batchUpload(
  files: File[],
  path: string = 'uploads',
  onProgress?: (completed: number, total: number) => void
): Promise<UploadResponse[]> {
  const results: UploadResponse[] = [];
  
  for (let i = 0; i < files.length; i++) {
    const result = await uploadToR2(files[i], path);
    results.push(result);
    
    if (onProgress) {
      onProgress(i + 1, files.length);
    }
  }
  
  return results;
}

/**
 * Check if R2 CDN is available
 */
export async function checkR2Health(): Promise<boolean> {
  try {
    const response = await fetch(`${CDN_BASE_URL}/health`, {
      method: 'HEAD',
      cache: 'no-cache'
    });
    return response.ok;
  } catch {
    return false;
  }
}

/**
 * Migrate from Cloudinary URLs to R2 URLs
 * Useful for gradually moving assets
 */
export function migrateCloudinaryToR2(
  cloudinaryUrl: string,
  r2Path?: string
): string {
  // Extract filename from Cloudinary URL
  const matches = cloudinaryUrl.match(/\/([^/]+)\.([^/]+)$/);
  if (!matches) {
    return cloudinaryUrl; // Return original if can't parse
  }
  
  const [, filename, extension] = matches;
  const r2Filename = r2Path || `migrated/${filename}.${extension}`;
  
  return `${CDN_BASE_URL}/${r2Filename}`;
}

/**
 * Helper function to generate image paths following your naming convention
 */
export function generateImagePath(
  countryCode: string,
  imageNumber: number | string,
  category: string = 'portfolio'
): string {
  return `images/${category}/${countryCode.toUpperCase()}-${imageNumber}.jpg`;
}

// Export constants for use in other modules
export const R2_CONFIG = {
  CDN_BASE_URL,
  API_BASE_URL,
  MAX_FILE_SIZE: 50 * 1024 * 1024, // 50MB
  SUPPORTED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp', 'image/avif'],
  SUPPORTED_VIDEO_TYPES: ['video/mp4', 'video/webm', 'video/quicktime'],
} as const;