import React, { useState, useEffect } from "react";
import { createProxiedImageUrl } from "@/lib/images";
import { useImageProtection } from "@/hooks/use-image-protection";
import { useSlideshow } from "@/hooks/use-slideshow";
import { HOME_SLIDESHOW } from "@/lib/data";


interface SlideImage {
  desktop: string;
  mobile: string;
  desktopCloudinary?: string;
}

export function Slideshow(): JSX.Element | null {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [firstImageLoaded, setFirstImageLoaded] = useState<boolean>(false);
  const [fastestUrls, setFastestUrls] = useState<Map<number, string>>(new Map());
  const { data: slideshowImages, isLoading, error } = useSlideshow();
  const { protectElement } = useImageProtection();

  const images: SlideImage[] = slideshowImages ?? (HOME_SLIDESHOW as any);

  // Disable protection for homepage slideshow
  const disableProtection = true;

  useEffect(() => {
    if (!images || images.length === 0 || !firstImageLoaded) return;
    let cancelled = false;
    const preload = async () => {
      // Preload more images for better performance (but not all)
      const preloadCount = Math.min(images.length, 5); // Reduced from 10 to 5
      for (let i = 1; i < preloadCount; i++) {
        if (cancelled) return;
        const slide = images[i];
        if (slide.desktopCloudinary) {
          // Use the Cloudinary URL if available
          setFastestUrls((p) => new Map(p).set(i, createProxiedImageUrl(slide.desktopCloudinary!)));
        } else {
          setFastestUrls((p) => new Map(p).set(i, createProxiedImageUrl(slide.desktop)));
        }
      }
    };
    const id = setTimeout(preload, 500); // Increased from 200 to 500ms
    return () => {
      cancelled = true;
      clearTimeout(id);
    };
  }, [images, firstImageLoaded]);

  useEffect(() => {
    if (!images || images.length === 0) return;
    // Adjust interval based on number of images
    const intervalTime = Math.max(5000, Math.min(10000, 80000 / images.length)); // Between 5-10 seconds
    const interval = setInterval(() => setCurrentSlide((s) => (s + 1) % images.length), intervalTime);
    return () => clearInterval(interval);
  }, [images]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="slideshow-container homepage-slideshow" style={{ backgroundColor: "#000000", display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
        <p style={{ color: "white", fontSize: "1.5rem" }}>Loading slideshow...</p>
      </div>
    );
  }

  // Show error state
  if (error) {
    console.error("Error loading slideshow:", error);
    return (
      <div className="slideshow-container homepage-slideshow" style={{ backgroundColor: "#000000", display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
        <p style={{ color: "white", fontSize: "1.5rem" }}>Error loading slideshow. Please try again later.</p>
      </div>
    );
  }

  // Show fallback message if no images
  if (!images || images.length === 0) {
    return (
      <div className="slideshow-container homepage-slideshow" style={{ backgroundColor: "#000000", display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
        <p style={{ color: "white", fontSize: "1.5rem" }}>No images available for slideshow</p>
      </div>
    );
  }

  return (
    <div className="slideshow-container homepage-slideshow no-screenshot" style={{ "--slideshow-duration": "14s", backgroundColor: "#000000" } as any}>
      {images.map((slide, index) => (
        <div
          key={index}
          className={`slideshow-slide protected-container ${index === currentSlide ? "active" : ""}`}
          ref={(el: HTMLDivElement | null) => {
            if (el && !disableProtection) protectElement(el);
          }}
          onContextMenu={(e) => {
            if (disableProtection) return;
            e.preventDefault();
            return false;
          }}
          onDragStart={(e) => {
            if (disableProtection) return;
            e.preventDefault();
            return false;
          }}
          onPointerDown={(e) => {
            if (disableProtection) return;
            e.preventDefault();
            return false;
          }}
        >
          <picture>
            <source 
              media="(max-width: 768px)" 
              srcSet={createProxiedImageUrl(slide.mobile)} 
              sizes="100vw" 
            />
            <img
              src={fastestUrls.get(index) || createProxiedImageUrl(slide.desktop)}
              alt={`BELOVEFUL Photography Slide ${index + 1}`}
              className="slideshow-image image-protected"
              draggable={false}
              loading="eager"
              decoding="async"
              onContextMenu={(e) => {
                if (disableProtection) return;
                e.preventDefault();
                e.stopPropagation();
                return false;
              }}
              onDragStart={(e) => {
                if (disableProtection) return;
                e.preventDefault();
                return false;
              }}
              onPointerDown={(e) => {
                if (disableProtection) return;
                e.preventDefault();
                return false;
              }}
              onMouseDown={(e) => {
                if (disableProtection) return;
                e.preventDefault();
              }}
              onTouchStart={(e) => {
                if (disableProtection) return;
                const ev: any = e;
                if (ev.touches && ev.touches.length > 1) ev.preventDefault();
              }}
              style={{ 
                WebkitUserSelect: disableProtection ? "auto" : "none", 
                WebkitTouchCallout: disableProtection ? "auto" : "none", 
                WebkitUserDrag: disableProtection ? "auto" : "none", 
                userSelect: disableProtection ? "auto" : "none" 
              } as any}
              ref={(el: HTMLImageElement | null) => {
                if (el && !disableProtection) protectElement(el);
              }}
              onLoad={() => {
                if (index === 0) {
                  setFirstImageLoaded(true);
                }
              }}
            />
          </picture>
        </div>
      ))}
    </div>
  );
}

// keep a default export for consumers that import the default
export default Slideshow;