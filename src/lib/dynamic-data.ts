import { Region } from './data';

// Enhanced image interface for B2 integration
export interface DynamicImage {
  id: string; // Unique identifier
  filename: string;
  filepath: string; // B2 file path
  url: string; // Full B2 URL
  alt: string;
  
  // Image metadata
  width?: number;
  height?: number;
  size?: number; // File size in bytes
  format?: string; // jpg, png, webp, etc.
  uploadDate?: string;
  
  // Responsive variants (if generated)
  variants?: {
    thumbnail?: string; // Small preview (150x150)
    small?: string;     // Mobile (600w)
    medium?: string;    // Tablet (1200w)
    large?: string;     // Desktop (1920w)
    original?: string;  // Full resolution
  };
  
  // Loading states
  loaded?: boolean;
  loading?: boolean;
  error?: boolean;
}

// Enhanced album interface
export interface DynamicCountryAlbum {
  id: string;
  region: Region;
  country: string;
  slug: string;
  
  // Album metadata
  title?: string;
  description?: string;
  coverImage?: string; // Featured image ID
  totalImages?: number;
  lastUpdated?: string;
  
  // Images with lazy loading support
  images: DynamicImage[];
  
  // Loading state for the entire album
  loaded?: boolean;
  loading?: boolean;
}

// Enhanced slideshow interface
export interface DynamicSlideshowImage extends DynamicImage {
  // Additional slideshow-specific properties
  order?: number;
  transition?: 'fade' | 'slide' | 'zoom';
  displayDuration?: number; // in milliseconds
  caption?: string;
}

// Image collection manager
export class ImageManager {
  private static instance: ImageManager;
  private albums: Map<string, DynamicCountryAlbum> = new Map();
  private slideshowImages: DynamicSlideshowImage[] = [];
  private loadedImages: Set<string> = new Set();

  static getInstance(): ImageManager {
    if (!ImageManager.instance) {
      ImageManager.instance = new ImageManager();
    }
    return ImageManager.instance;
  }

  /**
   * Load album images with lazy loading
   */
  async loadAlbum(region: Region, country: string, options: {
    limit?: number;
    offset?: number;
    loadThumbnails?: boolean;
  } = {}): Promise<DynamicCountryAlbum | null> {
    const albumId = this.generateAlbumId(region, country);
    
    // Check if already loaded
    if (this.albums.has(albumId)) {
      return this.albums.get(albumId)!;
    }

    try {
      // Create album structure
      const album: DynamicCountryAlbum = {
        id: albumId,
        region,
        country,
        slug: country.toLowerCase().replace(/[^a-z0-9]/g, '-'),
        images: [],
        loading: true
      };

      this.albums.set(albumId, album);

      // Load images from B2 (would need to implement B2 listing)
      const images = await this.loadImagesFromB2(region, country, options);
      
      album.images = images;
      album.totalImages = images.length;
      album.loaded = true;
      album.loading = false;
      album.lastUpdated = new Date().toISOString();

      // Set cover image to first image if not specified
      if (images.length > 0 && !album.coverImage) {
        album.coverImage = images[0].id;
      }

      return album;

    } catch (error) {
      console.error(`Failed to load album ${albumId}:`, error);
      
      // Mark as error state
      const album = this.albums.get(albumId);
      if (album) {
        album.loading = false;
        album.error = true;
      }
      
      return null;
    }
  }

  /**
   * Load slideshow images
   */
  async loadSlideshowImages(): Promise<DynamicSlideshowImage[]> {
    if (this.slideshowImages.length > 0) {
      return this.slideshowImages;
    }

    try {
      // Load from B2 slideshow folder
      const images = await this.loadSlideshowFromB2();
      this.slideshowImages = images;
      return images;

    } catch (error) {
      console.error('Failed to load slideshow images:', error);
      return [];
    }
  }

  /**
   * Get single image with lazy loading
   */
  async loadImage(imageId: string, loadHighRes: boolean = false): Promise<DynamicImage | null> {
    // Implementation for loading a specific image
    // This would fetch from B2 or return cached version
    return null; // Placeholder
  }

  /**
   * Preload images for better UX
   */
  async preloadImages(images: DynamicImage[], variant: keyof DynamicImage['variants'] = 'small'): Promise<void> {
    const promises = images.map(async (image) => {
      if (this.loadedImages.has(`${image.id}-${variant}`)) {
        return; // Already loaded
      }

      const url = image.variants?.[variant] || image.url;
      
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          this.loadedImages.add(`${image.id}-${variant}`);
          resolve(img);
        };
        img.onerror = reject;
        img.src = url;
      });
    });

    try {
      await Promise.allSettled(promises);
    } catch (error) {
      console.warn('Some images failed to preload:', error);
    }
  }

  /**
   * Generate consistent album ID
   */
  private generateAlbumId(region: Region, country: string): string {
    return `${region.toLowerCase().replace(/\s+/g, '-')}-${country.toLowerCase().replace(/\s+/g, '-')}`;
  }

  /**
   * Load images from B2 (mock implementation)
   */
  private async loadImagesFromB2(
    region: Region, 
    country: string, 
    options: { limit?: number; offset?: number; loadThumbnails?: boolean }
  ): Promise<DynamicImage[]> {
    // This would integrate with b2Service to list files
    // For now, return empty array as placeholder
    // 
    // const prefix = `portfolio/${region.toLowerCase()}/${country.toLowerCase()}/`;
    // const files = await b2Service.listFiles(prefix, options.limit);
    // 
    // return files.map(file => this.convertToImage(file));
    
    return []; // Placeholder
  }

  /**
   * Load slideshow images from B2 (mock implementation)
   */
  private async loadSlideshowFromB2(): Promise<DynamicSlideshowImage[]> {
    // This would integrate with b2Service to list slideshow files
    // const files = await b2Service.listFiles('slideshow/');
    // return files.map(file => this.convertToSlideshowImage(file));
    
    return []; // Placeholder
  }

  /**
   * Convert B2 file metadata to DynamicImage
   */
  private convertToImage(file: any): DynamicImage {
    const id = this.generateImageId(file.filename);
    
    return {
      id,
      filename: file.filename,
      filepath: file.filepath,
      url: file.url,
      alt: this.generateAltText(file.filename),
      size: file.size,
      format: this.extractFormat(file.filename),
      uploadDate: file.uploadDate,
      variants: this.generateImageVariants(file.filepath),
      loaded: false,
      loading: false,
      error: false
    };
  }

  /**
   * Generate unique image ID
   */
  private generateImageId(filename: string): string {
    return `img_${filename.replace(/[^a-zA-Z0-9]/g, '_')}_${Date.now()}`;
  }

  /**
   * Generate alt text from filename
   */
  private generateAltText(filename: string): string {
    return filename
      .replace(/\.[^/.]+$/, '') // Remove extension
      .replace(/[_-]/g, ' ') // Replace underscores/dashes with spaces
      .replace(/\b\w/g, l => l.toUpperCase()); // Capitalize words
  }

  /**
   * Extract image format from filename
   */
  private extractFormat(filename: string): string {
    return filename.split('.').pop()?.toLowerCase() || 'unknown';
  }

  /**
   * Generate image variants URLs for different sizes
   */
  private generateImageVariants(filepath: string): DynamicImage['variants'] {
    const baseUrl = `https://f005.backblazeb2.com/file/beloveful-images/${filepath}`;
    
    return {
      thumbnail: `${baseUrl}?w=150&h=150&fit=crop`,
      small: `${baseUrl}?w=600`,
      medium: `${baseUrl}?w=1200`,
      large: `${baseUrl}?w=1920`,
      original: baseUrl
    };
  }
}

// Export singleton instance
export const imageManager = ImageManager.getInstance();