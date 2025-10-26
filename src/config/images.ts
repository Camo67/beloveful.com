/**
 * Image system configuration
 */

export const IMAGE_CONFIG = {
  // Set to 'simple' to use the simple image system
  // Set to 'cloudinary' to use the Cloudinary-based system
  system: 'simple' as 'simple' | 'cloudinary',
  
  // When using the simple system, you can still load images from Cloudinary
  // But they won't be processed through the proxy or optimized
  allowCloudinaryUrls: true,
  
  // Default number of columns for image grids
  defaultGridColumns: 3,
  
  // Default gap between images in pixels
  defaultGridGap: 12,
  
  // Whether to use lazy loading for images
  lazyLoad: true,
  
  // Whether to prevent right-click on images
  preventRightClick: false,
};