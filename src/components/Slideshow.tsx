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

export default function Slideshow(): JSX.Element | null {
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
                if (e.touches.length > 1) e.preventDefault();
              }}
              style={{ WebkitUserSelect: "none", WebkitTouchCallout: "none", WebkitUserDrag: "none", userSelect: "none" }}
              ref={(el: HTMLImageElement | null) => el && protectElement(el)}
            />
          </picture>
        </div>
      ))}
    </div>
  );
}
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

interface UseSlideshowResult {
  data?: SlideImage[] | undefined;
}

interface ImageProtection {
  protectElement: (el: HTMLElement | null) => void;
}

export function Slideshow(): JSX.Element | null {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [firstImageLoaded, setFirstImageLoaded] = useState(false);
  const [fastestUrls, setFastestUrls] = useState<Map<number, string>>(new Map());
  const { data: slideshowImages } = useSlideshow();
  
  // Enable comprehensive image protection
  const { protectElement } = useImageProtection();

  // Always use data immediately - no loading state
  const images = slideshowImages || HOME_SLIDESHOW;
  
  // Race R2 vs Cloudinary for first image immediately
  useEffect(() => {
    if (!images || images.length === 0) return;
    
    const firstImage = images[0];
    if (firstImage.desktopCloudinary) {
      console.log('🏁 Racing first image: R2 vs Cloudinary');
      raceImageSources(
        createProxiedImageUrl(firstImage.desktop),
        firstImage.desktopCloudinary
      ).then(result => {
        setFastestUrls(prev => new Map(prev).set(0, result.url));
        setFirstImageLoaded(true);
      }).catch(() => {
        // Fallback to R2 if race fails
        setFastestUrls(prev => new Map(prev).set(0, createProxiedImageUrl(firstImage.desktop)));
        setFirstImageLoaded(true);
      });
    } else {
      // No Cloudinary fallback, just use R2
      setFastestUrls(prev => new Map(prev).set(0, createProxiedImageUrl(firstImage.desktop)));
      setFirstImageLoaded(true);
    }
  }, [images]);
  
  // Preload remaining images in background with dual-source racing
  useEffect(() => {
    if (!images || images.length === 0 || !firstImageLoaded) return;
    
    const preloadRemainingImages = async () => {
      for (let i = 1; i < images.length; i++) {
        const slide = images[i];
        if (slide.desktopCloudinary) {
          try {
            const result = await raceImageSources(
              createProxiedImageUrl(slide.desktop),
              slide.desktopCloudinary
            );
            setFastestUrls(prev => new Map(prev).set(i, result.url));
          } catch {
            setFastestUrls(prev => new Map(prev).set(i, createProxiedImageUrl(slide.desktop)));
          }
        } else {
          setFastestUrls(prev => new Map(prev).set(i, createProxiedImageUrl(slide.desktop)));
        }
      }
    };
    
    // Start preloading after a short delay
    setTimeout(preloadRemainingImages, 200);
  }, [images, firstImageLoaded]);
  
  // Start slideshow immediately
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
    <div className="slideshow-container homepage-slideshow no-screenshot" style={{"--slideshow-duration":"14s", backgroundColor: "#000000"} as any}>
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
          onPointerDown={(e) => {
            // prevent text selection / drag initiation on pointer events
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
                // prevent text selection / drag initiation on pointer events
                e.preventDefault();
                return false;
              }}
              onMouseDown={(e) => {
                e.preventDefault();
              interface SlideImage {
                desktop: string;
                mobile: string;
                desktopCloudinary?: string;
              }

              interface UseSlideshowResult {
                data?: SlideImage[] | undefined;
              }

              interface ImageProtection {
                protectElement: (el: HTMLElement | null) => void;
              }

              export function Slideshow(): JSX.Element | null {
                const [currentSlide, setCurrentSlide] = useState<number>(0);
                const [firstImageLoaded, setFirstImageLoaded] = useState<boolean>(false);
                const [fastestUrls, setFastestUrls] = useState<Map<number, string>>(new Map());
                const { data: slideshowImages } = useSlideshow() as UseSlideshowResult;
                
                // Enable comprehensive image protection
                const { protectElement } = useImageProtection() as ImageProtection;

                // Always use data immediately - no loading state
                const images: SlideImage[] = (slideshowImages ?? HOME_SLIDESHOW) as SlideImage[];
                
                // Race R2 vs Cloudinary for first image immediately
                useEffect(() => {
                  if (!images || images.length === 0) return;
                  
                  const firstImage = images[0];
                  if (firstImage.desktopCloudinary) {
                    console.log('🏁 Racing first image: R2 vs Cloudinary');
                    raceImageSources(
                      createProxiedImageUrl(firstImage.desktop),
                      firstImage.desktopCloudinary
                    ).then(result => {
                      setFastestUrls(prev => new Map(prev).set(0, result.url));
                      setFirstImageLoaded(true);
                    }).catch(() => {
                      // Fallback to R2 if race fails
                      setFastestUrls(prev => new Map(prev).set(0, createProxiedImageUrl(firstImage.desktop)));
                      setFirstImageLoaded(true);
                    });
                  } else {
                    // No Cloudinary fallback, just use R2
                    setFastestUrls(prev => new Map(prev).set(0, createProxiedImageUrl(firstImage.desktop)));
                    setFirstImageLoaded(true);
                  }
                }, [images]);
                
                // Preload remaining images in background with dual-source racing
                useEffect(() => {
                  if (!images || images.length === 0 || !firstImageLoaded) return;
                  
                  const preloadRemainingImages = async () => {
                    for (let i = 1; i < images.length; i++) {
                      const slide = images[i];
                      if (slide.desktopCloudinary) {
                        try {
                          const result = await raceImageSources(
                            createProxiedImageUrl(slide.desktop),
                            slide.desktopCloudinary
                          );
                          setFastestUrls(prev => new Map(prev).set(i, result.url));
                        } catch {
                          setFastestUrls(prev => new Map(prev).set(i, createProxiedImageUrl(slide.desktop)));
                        }
                      } else {
                        setFastestUrls(prev => new Map(prev).set(i, createProxiedImageUrl(slide.desktop)));
                      }
                    }
                  };
                  
                  // Start preloading after a short delay
                  setTimeout(preloadRemainingImages, 200);
                }, [images, firstImageLoaded]);
                
                // Start slideshow immediately
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
                  <div className="slideshow-container homepage-slideshow no-screenshot" style={{"--slideshow-duration":"14s", backgroundColor: "#000000"} as any}>
                    {images.map((slide, index) => (
                      <div
                        key={index}
                        className={`slideshow-slide protected-container ${index === currentSlide ? "active" : ""}`}
                        ref={(el: HTMLDivElement | null) => {
                          if (el) {
                            protectElement(el);
                          }
                        }}
                        onContextMenu={(e: React.MouseEvent<HTMLDivElement>) => {
                          e.preventDefault();
                          return false;
                        }}
                        onDragStart={(e: React.DragEvent<HTMLDivElement>) => {
                          e.preventDefault();
                          return false;
                        }}
                        onPointerDown={(e: React.PointerEvent<HTMLDivElement>) => {
                          // prevent text selection / drag initiation on pointer events
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
                            src={fastestUrls.get(index) || createProxiedImageUrl(slide.desktop)}
                            srcSet={buildProxiedSrcSet(slide.desktop)}
                            sizes="100vw"
                            alt={`BELOVEFUL Photography Slide ${index + 1}`}
                            className="slideshow-image image-protected"
                            draggable={false}
                            loading="eager"
                            decoding="async"
                            onContextMenu={(e: React.MouseEvent<HTMLImageElement>) => {
                              e.preventDefault();
                              e.stopPropagation();
                              return false;
                            }}
                            onDragStart={(e: React.DragEvent<HTMLImageElement>) => {
                              e.preventDefault();
                              return false;
                            }}
                            onPointerDown={(e: React.PointerEvent<HTMLImageElement>) => {
                              // prevent text selection / drag initiation on pointer events
                              e.preventDefault();
                              return false;
                            }}
                            onMouseDown={(e: React.MouseEvent<HTMLImageElement>) => {
                              e.preventDefault();
                            }}
                            onTouchStart={(e: React.TouchEvent<HTMLImageElement>) => {
                              // allow normal single-finger taps; only block multi-touch
                              if (e.touches.length > 1) {
                                e.preventDefault();
                              }
                            }}
                            onTouchEnd={(e: React.TouchEvent<HTMLImageElement>) => {
                              // no-op placeholder to mirror previous behavior
                            }}
                            style={{
                              WebkitUserSelect: 'none',
                              WebkitTouchCallout: 'none',
                              WebkitUserDrag: 'none',
                              userSelect: 'none'
                            }}
                            ref={(el: HTMLImageElement | null) => {
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
                // don't prevent default here — letting the browser handle tap/click
              }}
              style={{
                WebkitUserSelect: 'none',
                WebkitTouchCallout: 'none',
                WebkitUserDrag: 'none' as any,
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
