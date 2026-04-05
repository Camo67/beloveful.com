import React, { useState, useEffect, useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { DynamicImage } from '@/lib/dynamic-data';

interface LazyImageProps {
  image: DynamicImage;
  variant?: keyof DynamicImage['variants'];
  fallbackVariant?: keyof DynamicImage['variants'];
  className?: string;
  alt?: string;
  
  // Loading behavior
  rootMargin?: string; // For intersection observer
  threshold?: number;
  eager?: boolean; // Skip lazy loading
  
  // Visual states
  showSpinner?: boolean;
  placeholderColor?: string;
  blurDataURL?: string;
  
  // Event handlers
  onLoad?: () => void;
  onError?: (error: Error) => void;
  onClick?: () => void;
}

export const LazyImage: React.FC<LazyImageProps> = ({
  image,
  variant = 'medium',
  fallbackVariant = 'small',
  className = '',
  alt,
  rootMargin = '50px',
  threshold = 0.1,
  eager = false,
  showSpinner = true,
  placeholderColor = 'bg-gray-200 dark:bg-gray-800',
  blurDataURL,
  onLoad,
  onError,
  onClick
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(eager);
  
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Get the appropriate image URL
  const getImageUrl = useCallback(() => {
    const primaryUrl = image.variants?.[variant];
    const fallbackUrl = image.variants?.[fallbackVariant];
    return primaryUrl || fallbackUrl || image.url;
  }, [image, variant, fallbackVariant]);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (eager || isIntersecting) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.disconnect();
        }
      },
      {
        rootMargin,
        threshold
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [rootMargin, threshold, eager, isIntersecting]);

  // Load image when intersecting
  useEffect(() => {
    if (!isIntersecting || isLoaded || isLoading) return;

    const loadImage = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const imageUrl = getImageUrl();
        
        // Create a new image to preload
        const img = new Image();
        
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
          img.src = imageUrl;
        });

        // Set the src on the actual img element
        if (imgRef.current) {
          imgRef.current.src = imageUrl;
          setIsLoaded(true);
          onLoad?.();
        }

      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to load image');
        setError(error);
        onError?.(error);
        
        // Try fallback variant if primary failed
        if (variant !== fallbackVariant) {
          try {
            const fallbackUrl = image.variants?.[fallbackVariant] || image.url;
            if (imgRef.current) {
              imgRef.current.src = fallbackUrl;
              setIsLoaded(true);
            }
          } catch (fallbackErr) {
            console.error('Failed to load fallback image:', fallbackErr);
          }
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadImage();
  }, [isIntersecting, isLoaded, isLoading, getImageUrl, variant, fallbackVariant, image.url, onLoad, onError]);

  // Generate responsive srcSet for better quality
  const generateSrcSet = useCallback(() => {
    const variants = image.variants;
    if (!variants) return undefined;

    const srcSet: string[] = [];
    
    if (variants.small) srcSet.push(`${variants.small} 600w`);
    if (variants.medium) srcSet.push(`${variants.medium} 1200w`);
    if (variants.large) srcSet.push(`${variants.large} 1920w`);
    
    return srcSet.length > 0 ? srcSet.join(', ') : undefined;
  }, [image.variants]);

  const imageAlt = alt || image.alt || 'Photography by Beloveful Visions';

  return (
    <div 
      ref={containerRef}
      className={cn(
        'relative overflow-hidden transition-all duration-300',
        className
      )}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {/* Placeholder/Loading State */}
      {(!isLoaded || isLoading) && (
        <div 
          className={cn(
            'absolute inset-0 flex items-center justify-center',
            placeholderColor
          )}
        >
          {showSpinner && isLoading && (
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-300 border-t-gray-900 dark:border-gray-600 dark:border-t-gray-100" />
          )}
          
          {/* Blur placeholder */}
          {blurDataURL && (
            <img
              src={blurDataURL}
              alt=""
              className="absolute inset-0 w-full h-full object-cover opacity-50 blur-sm"
              aria-hidden="true"
            />
          )}
        </div>
      )}

      {/* Error State */}
      {error && !isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-900">
          <div className="text-center p-4">
            <div className="text-gray-400 mb-2">
              <svg className="w-12 h-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Failed to load image</p>
          </div>
        </div>
      )}

      {/* Main Image */}
      <img
        ref={imgRef}
        alt={imageAlt}
        className={cn(
          'transition-opacity duration-300 w-full h-full object-cover',
          isLoaded ? 'opacity-100' : 'opacity-0'
        )}
        srcSet={generateSrcSet()}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        onError={(e) => {
          const error = new Error(`Failed to load image: ${image.filename}`);
          setError(error);
          onError?.(error);
        }}
      />

      {/* Loading overlay fade out */}
      <div 
        className={cn(
          'absolute inset-0 transition-opacity duration-500',
          isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100',
          placeholderColor
        )}
      />
    </div>
  );
};

// Higher-order component for easy integration with existing components
export const withLazyLoading = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  return React.forwardRef<HTMLDivElement, P & { lazy?: boolean }>((props, ref) => {
    const { lazy = true, ...restProps } = props;
    
    if (!lazy) {
      return <WrappedComponent {...restProps as P} />;
    }
    
    return (
      <div ref={ref}>
        <WrappedComponent {...restProps as P} />
      </div>
    );
  });
};

// Utility component for image grids with masonry layout
export const LazyImageGrid: React.FC<{
  images: DynamicImage[];
  columns?: number;
  gap?: string;
  variant?: keyof DynamicImage['variants'];
  onImageClick?: (image: DynamicImage) => void;
  className?: string;
}> = ({
  images,
  columns = 3,
  gap = 'gap-4',
  variant = 'medium',
  onImageClick,
  className = ''
}) => {
  return (
    <div 
      className={cn(
        'grid auto-rows-max',
        gap,
        {
          'grid-cols-1': columns === 1,
          'grid-cols-2': columns === 2,
          'grid-cols-3': columns === 3,
          'grid-cols-4': columns === 4,
        },
        className
      )}
    >
      {images.map((image) => (
        <LazyImage
          key={image.id}
          image={image}
          variant={variant}
          className="aspect-square rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
          onClick={() => onImageClick?.(image)}
        />
      ))}
    </div>
  );
};