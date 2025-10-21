import React, { useState, useEffect } from "react";
import { createProxiedImageUrl, buildProxiedSrcSet } from "@/lib/images";
import { useImageProtection } from "@/hooks/use-image-protection";
import { useSlideshow } from "@/hooks/use-slideshow";
import { HOME_SLIDESHOW } from "@/lib/data";
import { raceImageSources } from "@/lib/dualImageLoader";

interface SlideImage {
  desktop: string;
  mobile: string;
  desktopCloudinary?: string;
}

export function Slideshow(): JSX.Element | null {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [firstImageLoaded, setFirstImageLoaded] = useState<boolean>(false);
  const [fastestUrls, setFastestUrls] = useState<Map<number, string>>(new Map());
  const { data: slideshowImages } = useSlideshow() as { data?: SlideImage[] };
  const { protectElement } = useImageProtection();

  const images: SlideImage[] = slideshowImages ?? (HOME_SLIDESHOW as any);

  useEffect(() => {
    if (!images || images.length === 0) return;
    const first = images[0];
    if (first.desktopCloudinary) {
      raceImageSources(createProxiedImageUrl(first.desktop), first.desktopCloudinary)
        .then((r) => {
          setFastestUrls((p) => new Map(p).set(0, r.url));
          setFirstImageLoaded(true);
        })
        .catch(() => {
          setFastestUrls((p) => new Map(p).set(0, createProxiedImageUrl(first.desktop)));
          setFirstImageLoaded(true);
        });
    } else {
      setFastestUrls((p) => new Map(p).set(0, createProxiedImageUrl(first.desktop)));
      setFirstImageLoaded(true);
    }
  }, [images]);

  useEffect(() => {
    if (!images || images.length === 0 || !firstImageLoaded) return;
    let cancelled = false;
    const preload = async () => {
      for (let i = 1; i < images.length; i++) {
        if (cancelled) return;
        const slide = images[i];
        if (slide.desktopCloudinary) {
          try {
            const res = await raceImageSources(createProxiedImageUrl(slide.desktop), slide.desktopCloudinary);
            setFastestUrls((p) => new Map(p).set(i, res.url));
          } catch {
            setFastestUrls((p) => new Map(p).set(i, createProxiedImageUrl(slide.desktop)));
          }
        } else {
          setFastestUrls((p) => new Map(p).set(i, createProxiedImageUrl(slide.desktop)));
        }
      }
    };
    const id = setTimeout(preload, 200);
    return () => {
      cancelled = true;
      clearTimeout(id);
    };
  }, [images, firstImageLoaded]);

  useEffect(() => {
    if (!images || images.length === 0) return;
    const interval = setInterval(() => setCurrentSlide((s) => (s + 1) % images.length), 8000);
    return () => clearInterval(interval);
  }, [images]);

  if (!images || images.length === 0) return null;

  return (
    <div className="slideshow-container homepage-slideshow no-screenshot" style={{ "--slideshow-duration": "14s", backgroundColor: "#000000" } as any}>
      {images.map((slide, index) => (
        <div
          key={index}
          className={`slideshow-slide protected-container ${index === currentSlide ? "active" : ""}`}
          ref={(el: HTMLDivElement | null) => el && protectElement(el)}
          onContextMenu={(e) => {
            e.preventDefault();
            return false;
          }}
          onDragStart={(e) => {
            e.preventDefault();
            return false;
          }}
          onPointerDown={(e) => {
            e.preventDefault();
            return false;
          }}
        >
          <picture>
            <source media="(max-width: 768px)" srcSet={buildProxiedSrcSet(slide.mobile)} sizes="100vw" />
            <img
              src={fastestUrls.get(index) || createProxiedImageUrl(slide.desktop)}
              srcSet={buildProxiedSrcSet(slide.desktop)}
              sizes="100vw"
              alt={`BELOVEFUL Photography Slide ${index + 1}`}
              className="slideshow-image image-protected"
              draggable={false}
              loading="eager"
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
              onPointerDown={(e) => {
                e.preventDefault();
                return false;
              }}
              onMouseDown={(e) => e.preventDefault()}
              onTouchStart={(e) => {
                const ev: any = e;
                if (ev.touches && ev.touches.length > 1) ev.preventDefault();
              }}
              style={{ WebkitUserSelect: "none", WebkitTouchCallout: "none", WebkitUserDrag: "none", userSelect: "none" } as any}
              ref={(el: HTMLImageElement | null) => el && protectElement(el)}
            />
          </picture>
        </div>
      ))}
    </div>
  );
}

// keep a default export for consumers that import the default
export default Slideshow;