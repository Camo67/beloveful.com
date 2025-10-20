import { useState, useEffect } from "react";
import { createProxiedImageUrl, buildProxiedSrcSet } from "@/lib/images";
import { useImageProtection } from "@/hooks/use-image-protection";
import { useSlideshow } from "@/hooks/use-slideshow";
import { HOME_SLIDESHOW } from "@/lib/data";

export function Slideshow() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { data: slideshowImages, isLoading } = useSlideshow();
  
  // Enable comprehensive image protection
  const { protectElement } = useImageProtection();

  // Don't show loading state - render immediately with fallback
  const images = slideshowImages || HOME_SLIDESHOW;
  
  useEffect(() => {
    if (!images || images.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 8000); // 8 seconds per slide

    return () => clearInterval(interval);
  }, [images]);
  
  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className="slideshow-container homepage-slideshow no-screenshot" style={{"--slideshow-duration":"14s"} as any}>
      {images.map((slide, index) => (
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
              srcSet={buildProxiedSrcSet(slide.mobile)}
              sizes="100vw"
            />
            <img
              src={createProxiedImageUrl(slide.desktop)}
              srcSet={buildProxiedSrcSet(slide.desktop)}
              sizes="100vw"
              alt={`BELOVEFUL Photography Slide ${index + 1}`}
              className="slideshow-image image-protected"
              draggable={false}
              loading={index < 3 ? "eager" : "lazy"}
              decoding="async"
              fetchPriority={index === 0 ? ("high" as any) : index < 3 ? ("auto" as any) : ("low" as any)}
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
                // allow normal single-finger taps; only block multi-touch
                if (e.touches.length > 1) {
                  e.preventDefault();
                }
              }}
              onTouchEnd={(e) => {
                // don't prevent default here — letting the browser handle tap/click
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
          </picture>
        </div>
      ))}
    </div>
  );
}
