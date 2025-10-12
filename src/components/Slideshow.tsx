import { useState, useEffect } from "react";
import { HOME_SLIDESHOW_SOURCE as HOME_SLIDESHOW } from "@/lib/data";
import { createProxiedImageUrl } from "@/lib/images";
import { useImageProtection } from "@/hooks/use-image-protection";

export function Slideshow() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Enable comprehensive image protection
  const { protectElement } = useImageProtection();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HOME_SLIDESHOW.length);
    }, 8000); // 8 seconds per slide

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="slideshow-container no-screenshot">
      {HOME_SLIDESHOW.map((slide, index) => (
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
