import { useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { SlideshowImage } from "@/lib/data";
import { getImageAltText } from "@/lib/images";
import { useImageProtection } from "@/hooks/use-image-protection";
import { Link } from "react-router-dom";
import { CloudImage } from "@/components/CloudImage";

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
  const currentCtaHref = getCtaHref?.(currentImage);
  
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

        {/* Image */}
        <div className="relative flex max-w-full items-center justify-center protected-container">
          {/* Navigation arrows */}
          {currentIndex > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNavigate(currentIndex - 1);
              }}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 p-2 text-white bg-black bg-opacity-50 rounded-full transition-opacity duration-300 hover:bg-opacity-70"
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
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 p-2 text-white bg-black bg-opacity-50 rounded-full transition-opacity duration-300 hover:bg-opacity-70"
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </button>
          )}

          <CloudImage
            url={currentImage.desktop}
            alt={getImageAltText(currentImage.desktop, country)}
            className="max-w-full object-contain image-protected"
            draggable={false}
            decoding="async"
            sizes="100vw"
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
              if ((e as any).touches && (e as any).touches.length > 1) {
                e.preventDefault();
              }
            }}
            onTouchEnd={(e) => {
              e.preventDefault();
            }}
            style={{
              maxHeight: currentCtaHref ? "calc(100vh - 10rem)" : "calc(100vh - 6rem)",
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
        </div>

        {currentCtaHref && (
          <div className="mt-4 text-center text-white">
            <Link
              to={currentCtaHref}
              className="inline-block text-sm underline underline-offset-2 hover:no-underline"
              onClick={(e) => e.stopPropagation()}
            >
              {ctaLabel}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
