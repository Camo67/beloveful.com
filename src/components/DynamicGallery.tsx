import { useMemo, useState, useEffect } from "react";
import { SlideshowImage } from "@/lib/data";
import { DynamicImage, imageManager } from "@/lib/dynamic-data";
import { createProxiedImageUrl, getImageAltText, buildProxiedSrcSet, DEFAULT_SIZES } from "@/lib/images";
import { useImageProtection } from "@/hooks/use-image-protection";
import { LazyImage } from "./LazyImage";
import { Lightbox } from "./Lightbox";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface DynamicGalleryProps {
  // Support both legacy and new image formats
  images?: SlideshowImage[]; // Legacy format
  dynamicImages?: DynamicImage[]; // New B2 format
  
  // Alternative: load images dynamically from B2
  region?: string;
  country?: string;
  
  enablePrintCta?: boolean;
  ctaLabel?: string;
  loadDynamically?: boolean; // Whether to load from B2 or use provided images
}

export function DynamicGallery({ 
  images = [], 
  dynamicImages = [],
  region, 
  country, 
  enablePrintCta = false, 
  ctaLabel = "Would you like this as a print?",
  loadDynamically = false
}: DynamicGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [loadedImages, setLoadedImages] = useState<DynamicImage[]>(dynamicImages);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Enable comprehensive image protection
  const { protectElement } = useImageProtection();

  // Load images dynamically from B2 if requested
  useEffect(() => {
    if (!loadDynamically || !region || !country) return;
    if (loadedImages.length > 0) return; // Already loaded

    const loadImagesFromB2 = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const album = await imageManager.loadAlbum(region as any, country);
        if (album && album.images) {
          setLoadedImages(album.images);
          
          // Preload thumbnail variants for better UX
          imageManager.preloadImages(album.images.slice(0, 10), 'thumbnail');
        } else {
          setError('No images found for this location');
        }
      } catch (err) {
        console.error('Failed to load images:', err);
        setError('Failed to load images');
        toast.error('Failed to load gallery images');
      } finally {
        setIsLoading(false);
      }
    };

    loadImagesFromB2();
  }, [loadDynamically, region, country, loadedImages.length]);

  // Convert legacy images to DynamicImage format for consistent handling
  const normalizedImages = useMemo((): DynamicImage[] => {
    if (loadedImages.length > 0) {
      return loadedImages;
    }
    
    if (images.length > 0) {
      return images.map((img, index) => ({
        id: `legacy_${index}`,
        filename: `image_${index}`,
        filepath: img.desktop,
        url: img.desktop,
        alt: getImageAltText(img.desktop, country || 'Unknown'),
        variants: {
          small: img.mobile,
          medium: img.desktop,
          large: img.desktop,
          original: img.desktop
        },
        loaded: false,
        loading: false,
        error: false
      }));
    }
    
    return [];
  }, [images, loadedImages, country]);

  // Landscape-first ordering (best-effort): prefer desktop orientation
  const orderedImages = useMemo(() => {
    const portraits: DynamicImage[] = [];
    const landscapes: DynamicImage[] = [];
    
    for (const img of normalizedImages) {
      const name = (img.filepath || img.url).toLowerCase();
      if (name.includes("_portrait") || name.includes("-vertical") || name.includes("/vertical/")) {
        portraits.push(img);
      } else {
        landscapes.push(img);
      }
    }
    
    return [...landscapes, ...portraits];
  }, [normalizedImages]);

  // Handle retry for failed loads
  const handleRetry = () => {
    if (loadDynamically && region && country) {
      setLoadedImages([]); // Clear current images to trigger reload
      setError(null);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin mb-4" />
        <p className="text-gray-600 dark:text-gray-400">Loading gallery...</p>
      </div>
    );
  }

  // Error state
  if (error && orderedImages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="text-red-500 mb-2">
          <svg className="w-12 h-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-1.732-.833-2.5 0L4.268 19.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium mb-2">Failed to load gallery</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
        <Button onClick={handleRetry} variant="outline">
          Try Again
        </Button>
      </div>
    );
  }

  // Empty state
  if (orderedImages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="text-gray-400 mb-4">
          <svg className="w-12 h-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium mb-2">No images found</h3>
        <p className="text-gray-600 dark:text-gray-400">
          {region && country ? `No images available for ${country}, ${region}` : 'This gallery is empty'}
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Masonry layout with improved spacing */}
      <div
        className="no-screenshot columns-1 xs:columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-4 2xl:columns-5 gap-[4px]"
        aria-live="polite"
      >
        {orderedImages.map((image, index) => (
          <figure
            key={image.id}
            className="mb-[4px] break-inside-avoid rounded-sm overflow-hidden group shadow-sm hover:shadow-md transition-shadow duration-500"
            ref={(el) => {
              if (el) protectElement(el);
            }}
          >
            <button
              type="button"
              onClick={() => setLightboxIndex(index)}
              className="block w-full text-left outline-none"
              aria-label={`View ${image.alt} in lightbox`}
            >
              {/* Use LazyImage for dynamic images, fallback to regular img for legacy */}
              {loadDynamically || image.variants ? (
                <LazyImage
                  image={image}
                  variant="medium"
                  fallbackVariant="small"
                  className="w-full h-auto max-w-full transform-gpu transition-transform duration-500 will-change-transform group-hover:scale-[1.02]"
                  alt={image.alt}
                  onClick={() => setLightboxIndex(index)}
                />
              ) : (
                // Legacy image handling
                <picture>
                  <source 
                    media="(max-width: 768px)" 
                    srcSet={image.variants?.small ? createProxiedImageUrl(image.variants.small) : createProxiedImageUrl(image.url)} 
                  />
                  <img
                    src={createProxiedImageUrl(image.url)}
                    srcSet={buildProxiedSrcSet(image.url)}
                    sizes={DEFAULT_SIZES}
                    alt={image.alt}
                    className="w-full h-auto max-w-full transform-gpu transition-transform duration-500 will-change-transform group-hover:scale-[1.02]"
                    draggable={false}
                    loading="lazy"
                    decoding="async"
                    onContextMenu={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      return false;
                    }}
                    onDragStart={(e) => {
                      e.preventDefault();
                      return false;
                    }}
                    style={{ maxWidth: "100%", height: "auto" }}
                  />
                </picture>
              )}
            </button>
          </figure>
        ))}
      </div>

      {/* Lightbox - Convert DynamicImage back to SlideshowImage for compatibility */}
      {lightboxIndex !== null && (
        <Lightbox
          images={orderedImages.map(img => ({
            desktop: img.variants?.large || img.url,
            mobile: img.variants?.small || img.url
          }))}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
          country={country || 'Unknown'}
          {...(enablePrintCta
            ? {
                getCtaHref: (image: SlideshowImage) => {
                  const currentImg = orderedImages[lightboxIndex];
                  const filename = currentImg?.filename || 'image';
                  const subject = `Print inquiry: ${country}${region ? ` (${region})` : ""} - ${filename}`;
                  const params = new URLSearchParams({
                    image: image.desktop,
                    source: "portfolio",
                    region: region ?? "",
                    country: country ?? "",
                    variant: "print",
                    subject,
                  });
                  return `/contact?${params.toString()}`;
                },
                ctaLabel,
              }
            : {})}
        />
      )}
    </>
  );
}