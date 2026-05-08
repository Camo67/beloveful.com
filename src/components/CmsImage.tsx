import React, { useState, useEffect, useRef, useMemo } from 'react';
import { mapToCdnUrl, validateAndFixImageUrl } from '@/lib/image-utils';
import { createProxiedImageUrl } from '@/lib/images';

const FALLBACK_SRC = '/Website%20beloveful.com/Logo/IMG_1052.JPG';

interface CmsImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  url: string;
  fallbackSrc?: string | null;
  onImageError?: (url: string) => void;
  onImageLoadSuccess?: (url: string) => void;
}

/**
 * Image component that displays images served from the Bluehost cPanel.
 * Provides fallback handling for broken images and lazy loading.
 */
export const CmsImage: React.FC<CmsImageProps> = ({
  url,
  alt = '',
  className,
  loading,
  decoding = 'async',
  fallbackSrc,
  onImageError,
  onImageLoadSuccess,
  onError,
  onLoad,
  ...rest
}) => {
  const fallbackImage = useMemo(() => {
    if (fallbackSrc === null) {
      return null;
    }

    if (typeof fallbackSrc === 'string') {
      const trimmed = fallbackSrc.trim();
      return trimmed || null;
    }

    return FALLBACK_SRC;
  }, [fallbackSrc]);

  const [imageSrc, setImageSrc] = useState<string | null>(null);
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
      setImageSrc(createProxiedImageUrl(fallbackImage || ''));
      setHasError(true);
      onImageError?.(url);
      return;
    }

    try {
      const trimmedUrl = url.trim();
      const cleaned = validateAndFixImageUrl(trimmedUrl);
      const cdnUrl = mapToCdnUrl(cleaned) ?? cleaned;
      
      const processedUrl = createProxiedImageUrl(cdnUrl);
      
      setImageSrc(processedUrl);
      setHasError(false);
    } catch (error) {
      console.error('Error processing image URL in CmsImage:', url, error);
      setHasError(true);
      setImageSrc(createProxiedImageUrl(fallbackImage || ''));
      onImageError?.(url);
    }
  }, [url, isInView, fallbackImage, onImageError]);

  const handleError: React.ReactEventHandler<HTMLImageElement> = (event) => {
    if (!hasError) {
      setHasError(true);
      setImageSrc(createProxiedImageUrl(fallbackImage || ''));
      onImageError?.(url);
    }

    onError?.(event);
  };

  const handleLoad: React.ReactEventHandler<HTMLImageElement> = (event) => {
    setHasError(false);
    onImageLoadSuccess?.(url);
    onLoad?.(event);
  };

  return (
    <img
      ref={imgRef}
      src={imageSrc ?? undefined}
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

// Re-export as CloudImage for backward compatibility during transition if needed,
// but prefer using CmsImage directly.
export const CloudImage = CmsImage;
