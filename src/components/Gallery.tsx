import { useState, useEffect, useRef } from "react";
import { SlideshowImage } from "@/lib/data";
import { createProxiedImageUrl, getImageAltText } from "@/lib/images";
import { useImageProtection } from "@/hooks/use-image-protection";
import { Lightbox } from "./Lightbox";

interface GalleryProps {
  images: SlideshowImage[];
  country: string;
  region?: string;
  enablePrintCta?: boolean;
  ctaLabel?: string;
}

export function Gallery({ images, country, region, enablePrintCta = false, ctaLabel = "Would you like this as a print?" }: GalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [visibleImages, setVisibleImages] = useState<Set<number>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);
  
  // Enable comprehensive image protection
  const { protectElement } = useImageProtection();

  useEffect(() => {
    // Auto-load images immediately for better UX, with lazy loading for performance
    setVisibleImages(new Set(images.map((_, index) => index)));
    
    // Still set up intersection observer for future enhancements
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleImages(prev => new Set(prev).add(index));
          }
        });
      },
      { threshold: 0.1, rootMargin: '100px' } // Increased root margin for earlier loading
    );

    return () => {
      observerRef.current?.disconnect();
    };
  }, [country, images]);

  const handleImageLoad = (index: number, element: HTMLDivElement) => {
    if (observerRef.current) {
      observerRef.current.observe(element);
    }
  };

  return (
    <>
      <div className="gallery-grid no-screenshot">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative group clickable-area bg-muted rounded-lg overflow-hidden shadow-sm hover:shadow-md"
            style={{ aspectRatio: '4/3' }}
            data-index={index}
            ref={(el) => {
              if (el) {
                handleImageLoad(index, el);
                protectElement(el);
              }
            }}
            onClick={() => setLightboxIndex(index)}
            role="button"
            tabIndex={0}
            aria-label={`View ${getImageAltText(image.desktop, country)} in lightbox`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setLightboxIndex(index);
              }
            }}
            onContextMenu={(e) => {
              e.preventDefault();
              e.stopPropagation();
              return false;
            }}
            onDragStart={(e) => {
              e.preventDefault();
              return false;
            }}
          >
            <img
              src={createProxiedImageUrl(image.desktop)}
              alt={getImageAltText(image.desktop, country)}
              className="img-responsive transition-all duration-300 group-hover:scale-105"
              draggable={false}
              loading={index < 6 ? "eager" : "lazy"}
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              onContextMenu={(e) => {
                e.preventDefault();
                e.stopPropagation();
                return false;
              }}
              onDragStart={(e) => {
                e.preventDefault();
                return false;
              }}
              style={{
                maxWidth: '100%',
                height: 'auto',
                objectFit: 'cover',
                aspectRatio: '4/3'
              }}
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 pointer-events-none" />
          </div>
        ))}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
          country={country}
          {...(enablePrintCta
            ? {
                getCtaHref: (image: SlideshowImage) => {
                  const params = new URLSearchParams({
                    image: image.desktop,
                    source: "portfolio",
                    region: region ?? "",
                    country,
                    variant: "print",
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
