import { useState, useEffect, useRef } from "react";
import { SlideshowImage } from "@/lib/data";
import { createProxiedImageUrl, getImageAltText } from "@/lib/images";
import { Lightbox } from "./Lightbox";

interface GalleryProps {
  images: SlideshowImage[];
  country: string;
}

export function Gallery({ images, country }: GalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [visibleImages, setVisibleImages] = useState<Set<number>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
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
  }, []);

  const handleImageLoad = (index: number, element: HTMLDivElement) => {
    if (observerRef.current) {
      observerRef.current.observe(element);
    }
  };

  return (
    <>
      <div className="gallery-grid">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative group cursor-pointer bg-gray-100"
            style={{ aspectRatio: '4/3' }}
            data-index={index}
            ref={(el) => el && handleImageLoad(index, el)}
            onClick={() => setLightboxIndex(index)}
            onContextMenu={(e) => e.preventDefault()}
          >
            {visibleImages.has(index) && (
              <>
                <img
                  src={createProxiedImageUrl(image.desktop)}
                  alt={getImageAltText(image.desktop, country)}
                  className="w-full h-full object-cover image-protected transition-transform duration-500 group-hover:scale-105"
                  draggable={false}
                  loading="lazy"
                />
                <div className="image-overlay" />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
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