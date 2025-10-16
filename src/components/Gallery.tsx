import { useState } from "react";
import { SlideshowImage } from "@/lib/data";
import { createProxiedImageUrl, getImageAltText, buildProxiedSrcSet, DEFAULT_SIZES } from "@/lib/images";
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
  
  // Enable comprehensive image protection
  const { protectElement } = useImageProtection();

  return (
    <>
      <div className="gallery-grid no-screenshot" aria-live="polite">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative group clickable-area bg-muted rounded-lg overflow-hidden shadow-sm hover:shadow-md"
            ref={(el) => {
              if (el) {
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
            <picture>
              <source media="(max-width: 768px)" srcSet={createProxiedImageUrl(image.mobile)} />
              <img
                src={createProxiedImageUrl(image.desktop)}
                srcSet={buildProxiedSrcSet(image.desktop)}
                sizes={DEFAULT_SIZES}
                alt={getImageAltText(image.desktop, country)}
                className="w-full h-auto max-w-full transition-all duration-300"
                draggable={false}
                loading="lazy"
                decoding="async"
                fetchPriority={("auto" as any)}
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
                  height: 'auto'
                }}
              />
            </picture>
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
