/**
 * Asset Loader Utility
 * 
 * This module provides utilities for loading assets with fallback mechanisms
 * to prevent 404 errors in the application.
 */

// Utility functions to load JSON assets from cloudinary-assets and portolio directories

/**
 * Load a JSON file from the cloudinary-assets directory
 * @param path - Path to the JSON file relative to cloudinary-assets directory
 * @returns Parsed JSON data
 */
export async function loadCloudinaryAsset(path: string): Promise<any> {
  try {
    const response = await fetch(`/api/content/assets/cloudinary-assets/${path}`);
    
    if (!response.ok) {
      throw new Error(`Failed to load cloudinary asset: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error loading cloudinary asset at ${path}:`, error);
    throw error;
  }
}

/**
 * Load a JSON file from the portolio directory
 * @param path - Path to the JSON file relative to portolio directory
 * @returns Parsed JSON data
 */
export async function loadPortfolioAsset(path: string): Promise<any> {
  try {
    const response = await fetch(`/api/content/assets/portolio/${path}`);
    
    if (!response.ok) {
      throw new Error(`Failed to load portfolio asset: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error loading portfolio asset at ${path}:`, error);
    throw error;
  }
}

/**
 * Load the main cloudinary-assets index.json file
 * @returns Parsed JSON data
 */
export async function loadCloudinaryIndex(): Promise<any> {
  try {
    const response = await fetch('/api/content/assets/cloudinary-assets.json');
    
    if (!response.ok) {
      throw new Error(`Failed to load cloudinary index: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error loading cloudinary index:', error);
    throw error;
  }
}

// Cache for loaded assets
const assetCache = new Map<string, string>();

/**
 * Load an asset with fallback mechanism
 * @param primaryUrl - Primary URL to attempt loading
 * @param fallbackUrl - Fallback URL if primary fails
 * @returns Promise resolving to the working URL
 */
export async function loadAssetWithFallback(
  primaryUrl: string,
  fallbackUrl: string
): Promise<string> {
  // Check cache first
  if (assetCache.has(primaryUrl)) {
    return assetCache.get(primaryUrl)!;
  }

  try {
    // Try primary URL
    const response = await fetch(primaryUrl, { method: 'HEAD' });
    if (response.ok) {
      assetCache.set(primaryUrl, primaryUrl);
      return primaryUrl;
    }
  } catch (error) {
    console.warn(`Failed to load asset from ${primaryUrl}:`, error);
  }

  try {
    // Try fallback URL
    const response = await fetch(fallbackUrl, { method: 'HEAD' });
    if (response.ok) {
      assetCache.set(primaryUrl, fallbackUrl);
      return fallbackUrl;
    }
  } catch (error) {
    console.warn(`Failed to load asset from fallback ${fallbackUrl}:`, error);
  }

  // If both fail, return primary URL as last resort
  console.error(`Failed to load asset from both ${primaryUrl} and ${fallbackUrl}`);
  return primaryUrl;
}

/**
 * Preload critical assets to prevent 404 errors
 */
export async function preloadCriticalAssets(): Promise<void> {
  const criticalAssets = [
    // Leaflet marker icons
    {
      primary: '/node_modules/leaflet/dist/images/marker-icon.png',
      fallback: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png'
    },
    {
      primary: '/node_modules/leaflet/dist/images/marker-icon-2x.png',
      fallback: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png'
    },
    {
      primary: '/node_modules/leaflet/dist/images/marker-shadow.png',
      fallback: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png'
    }
  ];

  // Load all critical assets
  await Promise.all(
    criticalAssets.map(asset => loadAssetWithFallback(asset.primary, asset.fallback))
  );
}