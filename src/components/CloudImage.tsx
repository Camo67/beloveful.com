import React, { useState, useEffect, useRef } from 'react';
import { mapToCdnUrl, validateAndFixImageUrl } from '@/lib/image-utils';

const FALLBACK_SRC = '/images/Logo/IMG_0007%20copy.JPG';

interface CloudImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  url: string;
}

/**
 * Simple image component that displays images as-is without any transformations.
 * Just fetches the original image from Cloudinary (or other sources) via proxy.
 * Provides fallback handling for broken images.
 */
export const CloudImage: React.FC<CloudImageProps> = ({ url, alt = '', className, loading, decoding = 'async', ...rest }) => {
  function getFallbackImage(): string {
    return FALLBACK_SRC;
  }

  const [imageSrc, setImageSrc] = useState<string>(getFallbackImage());
  const [hasError, setHasError] = useState<boolean>(false);
  const [isInView, setIsInView] = useState<boolean>(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '150px' }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Initialize and update image source when URL changes
  useEffect(() => {
    if (!isInView) return;

    // Handle empty or invalid URLs
    if (!url || typeof url !== 'string' || url.trim() === '') {
      setImageSrc(getFallbackImage());
      setHasError(true);
      return;
    }

    try {
      const trimmedUrl = url.trim();
      const cleaned = validateAndFixImageUrl(trimmedUrl);
      const cdnUrl = mapToCdnUrl(cleaned) ?? cleaned;
      setImageSrc(cdnUrl);
      setHasError(false);
    } catch (error) {
      console.error('Error processing image URL in CloudImage:', url, error);
      setHasError(true);
      setImageSrc(getFallbackImage());
    }
  }, [url, isInView]);

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
      ref={imgRef}
      src={imageSrc}
      alt={alt}
      className={className}
      loading={loading ?? 'lazy'}
      decoding={decoding}
      onError={handleError}
      onLoad={handleLoad}
      {...rest}
    />
  );
};
