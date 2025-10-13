import { useState, useEffect } from "react";
import { createProxiedImageUrl } from "@/lib/images";
import { useImageProtection } from "@/hooks/use-image-protection";
import { useSlideshow } from "@/hooks/use-slideshow";

export function Slideshow() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { data: slideshowImages, isLoading } = useSlideshow();
  
  // Enable comprehensive image protection
  const { protectElement } = useImageProtection();

  useEffect(() => {
    if (!slideshowImages || slideshowImages.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideshowImages.length);
    }, 8000); // 8 seconds per slide

    return () => clearInterval(interval);
  }, [slideshowImages]);

  if (isLoading || !slideshowImages) {
    return (
      <div className="slideshow-container no-screenshot">
        <div className="slideshow-slide active">
          <div className="w-full h-screen bg-gray-200 dark:bg-gray-800 animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="slideshow-container no-screenshot">
      {slideshowImages.map((slide, index) => (
        <div
          key={index}
          className={`slideshow-slide protected-container ${index === currentSlide ? "active" : ""}`}
          ref={(el) => {
            if (el) {
              protectElement(el);
            }
          }}
          onContextMenu={(e) => {
            e.preventDefault();
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
        >
          <picture>
            <source 
              media="(max-width: 768px)" 
              srcSet={createProxiedImageUrl(slide.mobile)}
              style={{
                WebkitUserSelect: 'none',
                userSelect: 'none'
              }}
            />
            <img
              src={createProxiedImageUrl(slide.desktop)}
              alt={`BELOVEFUL Photography Slide ${index + 1}`}
              className="slideshow-image image-protected"
              draggable={false}
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
                userSelect: 'none',
                touchAction: 'none'
              }}
              ref={(el) => {
                if (el) {
                  protectElement(el);
                }
              }}
            />
          </picture>
          <div 
            className="image-overlay"
            onContextMenu={(e) => {
              e.preventDefault();
              return false;
            }}
          />
        </div>
      ))}
    </div>
  );
}
