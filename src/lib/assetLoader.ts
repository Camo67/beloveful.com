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