import { useState, useEffect } from "react";
import { HOME_SLIDESHOW_SOURCE as HOME_SLIDESHOW } from "@/lib/data";
import { createProxiedImageUrl } from "@/lib/images";

export function Slideshow() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HOME_SLIDESHOW.length);
    }, 8000); // 8 seconds per slide

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="slideshow-container">
      {HOME_SLIDESHOW.map((slide, index) => (
        <div
          key={index}
          className={`slideshow-slide ${index === currentSlide ? "active" : ""}`}
        >
          <picture>
            <source media="(max-width: 768px)" srcSet={createProxiedImageUrl(slide.mobile)} />
            <img
              src={createProxiedImageUrl(slide.desktop)}
              alt={`BELOVEFUL Photography Slide ${index + 1}`}
              className="slideshow-image image-protected"
              draggable={false}
              onContextMenu={(e) => e.preventDefault()}
            />
          </picture>
          <div className="image-overlay" />
        </div>
      ))}
    </div>
  );
}
