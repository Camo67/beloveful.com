import { useState, useEffect, useRef } from "react";
import { SlideshowImage } from "@/lib/data";
import { createProxiedImageUrl, getImageAltText } from "@/lib/images";
import { useImageProtection } from "@/hooks/use-image-protection";
import { Lightbox } from "./Lightbox";

interface GalleryProps {
  images: SlideshowImage[];
  country: string;
}

export function Gallery({ images, country }: GalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [visibleImages, setVisibleImages] = useState<Set<number>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);
  
  // Enable comprehensive image protection
  const { protectElement } = useImageProtection();

  useEffect(() => {
    // Use regex to check if the country indicates 'other' countries (e.g., 'Other', 'Others', 'Other Countries')
    if (/\bother(s)?\b/i.test(country)) {
      setVisibleImages(new Set(images.map((_, index) => index)));
      return;
    }
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleImages(prev => new Set(prev).add(index));
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
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
            className="relative group cursor-pointer bg-gray-100 protected-container"
            style={{ aspectRatio: '4/3' }}
            data-index={index}
            data-protection-hint="🔒"
            ref={(el) => {
              if (el) {
                handleImageLoad(index, el);
                protectElement(el);
              }
            }}
            onClick={() => setLightboxIndex(index)}
            onContextMenu={(e) => {
              e.preventDefault();
              e.stopPropagation();
              return false;
            }}
            onDragStart={(e) => {
              e.preventDefault();
              return false;
            }}
            onTouchStart={(e) => {
              // Prevent long press context menu on mobile
              if (e.touches.length > 1) {
                e.preventDefault();
              }
            }}
            onTouchEnd={(e) => {
              e.preventDefault();
            }}
          >
            {visibleImages.has(index) && (
              <>
                <img
                  src={createProxiedImageUrl(image.desktop)}
                  alt={getImageAltText(image.desktop, country)}
                  className="w-full h-full object-cover image-protected transition-transform duration-500 group-hover:scale-105"
                  draggable={false}
                  loading="lazy"
                  onContextMenu={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                  }}
                  onDragStart={(e) => {
                    e.preventDefault();
                    return false;
                  }}
                  onMouseDown={(e) => {
                    // avoid interfering with click/tap behavior
                  }}
                />
                <div 
                  className="image-overlay" 
                  onContextMenu={(e) => {
                    e.preventDefault();
                    return false;
                  }}
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none" />
              </>
            )}
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
        />
      )}
    </>
  );
}