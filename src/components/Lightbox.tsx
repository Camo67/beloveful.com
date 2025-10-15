import { useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { SlideshowImage } from "@/lib/data";
import { createProxiedImageUrl, getImageAltText, buildProxiedSrcSet } from "@/lib/images";
import { useImageProtection } from "@/hooks/use-image-protection";
import { Link } from "react-router-dom";

interface LightboxProps {
  images: SlideshowImage[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
  country: string;
  /**
   * Optional CTA href generator. If provided, a CTA link will be rendered in the caption
   * that navigates to the returned href for the current image.
   */
  getCtaHref?: (image: SlideshowImage) => string;
  /**
   * Optional CTA label. Defaults to "Would you like this as a print?".
   */
  ctaLabel?: string;
}

export function Lightbox({ images, currentIndex, onClose, onNavigate, country, getCtaHref, ctaLabel = "Would you like this as a print?" }: LightboxProps) {
  const currentImage = images[currentIndex];
  
  // Enable comprehensive image protection
  const { protectElement } = useImageProtection();

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          if (currentIndex > 0) {
            onNavigate(currentIndex - 1);
          }
          break;
        case "ArrowRight":
          if (currentIndex < images.length - 1) {
            onNavigate(currentIndex + 1);
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
      document.body.style.overflow = "auto";
    };
  }, [currentIndex, images.length, onClose, onNavigate]);

  const extractFilename = (url: string) => {
    const parts = url.split('/');
    const filename = parts[parts.length - 1];
    return filename.split('.')[0];
  };

  return (
    <div 
      className="lightbox-overlay no-screenshot" 
      onClick={onClose}
      onContextMenu={(e) => {
        e.preventDefault();
        return false;
      }}
    >
      <div 
        className="lightbox-content protected-container" 
        onClick={(e) => e.stopPropagation()}
        onContextMenu={(e) => {
          e.preventDefault();
          return false;
        }}
        ref={(el) => {
          if (el) {
            protectElement(el);
          }
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-white bg-black bg-opacity-50 rounded-full transition-opacity duration-300 hover:bg-opacity-70"
          aria-label="Close lightbox"
        >
          <X size={24} />
        </button>

        {/* Navigation arrows */}
        {currentIndex > 0 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNavigate(currentIndex - 1);
            }}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-2 text-white bg-black bg-opacity-50 rounded-full transition-opacity duration-300 hover:bg-opacity-70"
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </button>
        )}

        {currentIndex < images.length - 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNavigate(currentIndex + 1);
            }}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-2 text-white bg-black bg-opacity-50 rounded-full transition-opacity duration-300 hover:bg-opacity-70"
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </button>
        )}

        {/* Image */}
        <div className="relative max-w-full max-h-full protected-container">
          <img
            src={createProxiedImageUrl(currentImage.desktop)}
            srcSet={buildProxiedSrcSet(currentImage.desktop)}
            sizes="100vw"
            alt={getImageAltText(currentImage.desktop, country)}
            className="max-w-full max-h-screen object-contain image-protected"
            draggable={false}
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
            onSelectStart={(e) => {
              e.preventDefault();
              return false;
            }}
            onMouseDown={(e) => {
              e.preventDefault();
            }}
            onTouchStart={(e) => {
              if (e.touches.length > 1) {
                e.preventDefault();
              }
            }}
            onTouchEnd={(e) => {
              e.preventDefault();
            }}
            style={{
              WebkitUserSelect: 'none',
              WebkitTouchCallout: 'none',
              WebkitUserDrag: 'none',
              userSelect: 'none'
            }}
            ref={(el) => {
              if (el) {
                protectElement(el);
              }
            }}
          />
          
          {/* Invisible overlay to catch any interaction attempts */}
          <div 
            className="absolute inset-0 z-10"
            style={{
              background: 'transparent',
              pointerEvents: 'none',
              WebkitUserSelect: 'none',
              userSelect: 'none'
            }}
          />
          
          {/* Caption */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-70 text-white z-20">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <p className="text-sm text-center md:text-left">
                {country} – {extractFilename(currentImage.desktop)}
              </p>
              {getCtaHref && (
                <div className="text-center md:text-right">
                  <Link
                    to={getCtaHref(currentImage)}
                    className="inline-block text-xs md:text-sm underline underline-offset-2 hover:no-underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {ctaLabel}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
