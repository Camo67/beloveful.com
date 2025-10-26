import { useState, useEffect } from 'react';

/**
 * Simple hook for loading images
 */
export function useSimpleImages(imageUrls: string[]) {
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (imageUrls.length === 0) {
      setLoading(false);
      return;
    }

    let loadedCount = 0;
    const totalImages = imageUrls.length;
    const newLoadedImages: Record<string, boolean> = {};

    const handleImageLoad = (url: string) => {
      loadedCount++;
      newLoadedImages[url] = true;
      
      if (loadedCount === totalImages) {
        setLoadedImages(newLoadedImages);
        setLoading(false);
      }
    };

    imageUrls.forEach(url => {
      const img = new Image();
      img.onload = () => handleImageLoad(url);
      img.onerror = () => handleImageLoad(url); // Still mark as loaded even if there's an error
      img.src = url;
    });

    // Cleanup
    return () => {
      setLoadedImages({});
      setLoading(true);
    };
  }, [imageUrls]);

  return { loadedImages, loading };
}