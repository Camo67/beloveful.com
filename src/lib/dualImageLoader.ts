/**
 * Dual-source image loader - races R2 vs Cloudinary and uses whichever loads first
 */

interface ImageSource {
  url: string;
  source: 'r2' | 'cloudinary';
}

interface LoadImageResult {
  url: string;
  source: 'r2' | 'cloudinary';
  loadTime: number;
}

/**
 * Race two image sources and return whichever loads first
 */
export const raceImageSources = async (
  r2Url: string,
  cloudinaryUrl: string,
  timeout: number = 5000
): Promise<LoadImageResult> => {
  const startTime = performance.now();

  const loadFromSource = (url: string, source: 'r2' | 'cloudinary'): Promise<LoadImageResult> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const sourceStartTime = performance.now();
      
      img.onload = () => {
        const loadTime = performance.now() - sourceStartTime;
        console.log(`✅ ${source.toUpperCase()} loaded in ${loadTime.toFixed(0)}ms`);
        resolve({ url, source, loadTime });
      };
      
      img.onerror = () => {
        const loadTime = performance.now() - sourceStartTime;
        console.error(`❌ ${source.toUpperCase()} failed after ${loadTime.toFixed(0)}ms`);
        reject(new Error(`${source} failed to load`));
      };
      
      img.src = url;
      
      // Timeout fallback
      setTimeout(() => {
        reject(new Error(`${source} timed out after ${timeout}ms`));
      }, timeout);
    });
  };

  try {
    // Race both sources
    const result = await Promise.race([
      loadFromSource(r2Url, 'r2'),
      loadFromSource(cloudinaryUrl, 'cloudinary')
    ]);
    
    console.log(`🏆 Winner: ${result.source.toUpperCase()} (${result.loadTime.toFixed(0)}ms)`);
    return result;
  } catch (error) {
    // If race fails, try the other source as fallback
    console.warn('⚠️ First source failed, trying fallback...');
    try {
      return await loadFromSource(cloudinaryUrl, 'cloudinary');
    } catch (fallbackError) {
      console.error('❌ Both sources failed');
      throw new Error('Both image sources failed to load');
    }
  }
};

/**
 * Preload multiple images with dual sources
 */
export const preloadDualSourceImages = async (
  images: Array<{ r2: string; cloudinary: string }>
): Promise<LoadImageResult[]> => {
  const results = await Promise.all(
    images.map(({ r2, cloudinary }) => raceImageSources(r2, cloudinary))
  );
  
  return results;
};

/**
 * Get the faster URL for an image by testing both sources
 */
export const getFasterImageUrl = async (
  r2Url: string,
  cloudinaryUrl: string
): Promise<string> => {
  try {
    const result = await raceImageSources(r2Url, cloudinaryUrl);
    return result.url;
  } catch {
    // If both fail, return R2 as default
    return r2Url;
  }
};
