import React, { useState, useEffect } from 'react';
import { createProxiedImageUrl } from '@/lib/images';
import { getWorkingImageUrl } from '@/lib/image-utils';

interface CloudImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  url: string;
}

/**
 * Simple image component that displays images as-is without any transformations.
 * Just fetches the original image from Cloudinary (or other sources) via proxy.
 * Provides fallback handling for broken images.
 */
export const CloudImage: React.FC<CloudImageProps> = ({ url, alt = '', className, loading, decoding = 'async', ...rest }) => {
  const [imageSrc, setImageSrc] = useState<string>('');
  const [hasError, setHasError] = useState<boolean>(false);

  // Initialize and update image source when URL changes
  useEffect(() => {
    // Handle empty or invalid URLs
    if (!url || typeof url !== 'string' || url.trim() === '') {
      setImageSrc(getFallbackImage());
      setHasError(true);
      return;
    }

    const updateImageSrc = async () => {
      try {
        const trimmedUrl = url.trim();
        
        // For Shopify CDN URLs, use them directly without proxy
        if (trimmedUrl.includes('cdn.shopify.com')) {
          // Check if URL is accessible
          const workingUrl = await getWorkingImageUrl(trimmedUrl);
          setImageSrc(workingUrl);
        } else {
          // Create proxied URL immediately for faster initial display
          const proxiedUrl = createProxiedImageUrl(trimmedUrl);
          setImageSrc(proxiedUrl);
          
          // Check if URL is accessible and get a working URL or fallback
          // But don't block the initial image display
          const workingUrl = await getWorkingImageUrl(trimmedUrl);
          if (workingUrl !== trimmedUrl) {
            // Only update if we got a different URL (fallback)
            const newProxiedUrl = createProxiedImageUrl(workingUrl);
            setImageSrc(newProxiedUrl);
          }
        }
      } catch (error) {
        console.error('Error processing image URL in CloudImage:', url, error);
        // Keep the original URL, but mark as error for tracking
        setHasError(true);
      }
    };

    updateImageSrc();
    
    // Reset error state when URL changes
    setHasError(false);
  }, [url]);

  const getFallbackImage = (): string => {
    return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBhdmFpbGFibGU8L3RleHQ+Cjwvc3ZnPg==';
  };

  const handleError = () => {
    // If we haven't already tried the fallback, try it now
    if (!hasError) {
      setHasError(true);
      // Use a placeholder image as final fallback
      setImageSrc(getFallbackImage());
    }
  };

  const handleLoad = () => {
    // Reset error state if image loads successfully
    setHasError(false);
  };

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      loading={loading}
      decoding={decoding}
      onError={handleError}
      onLoad={handleLoad}
      {...rest}
    />
  );
};