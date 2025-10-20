import { useState, useEffect } from "react";
import { createProxiedImageUrl, buildProxiedSrcSet } from "@/lib/images";
import { useImageProtection } from "@/hooks/use-image-protection";
import { useSlideshow } from "@/hooks/use-slideshow";
import { HOME_SLIDESHOW } from "@/lib/data";
import { raceImageSources } from "@/lib/dualImageLoader";

export function Slideshow() {
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
              src={fastestUrls.get(index) || createProxiedImageUrl(slide.desktop)}
              srcSet={buildProxiedSrcSet(slide.desktop)}
              sizes="100vw"
              alt={`BELOVEFUL Photography Slide ${index + 1}`}
              className="slideshow-image image-protected"
              draggable={false}
              loading={index === 0 ? "eager" : "lazy"}
              decoding={index === 0 ? "sync" : "async"}
              fetchPriority={index === 0 ? "high" : "low"}
              onLoad={() => { 
                if (index === 0 && !firstImageLoaded) {
                  console.log('✅ First image loaded successfully');
                  setFirstImageLoaded(true); 
                }
              }}
              onError={(e) => { 
                if (index === 0) {
                  console.error('❌ First image failed to load from:', (e.target as HTMLImageElement).src);
                  // Try Cloudinary fallback on error
                  if (slide.desktopCloudinary && (e.target as HTMLImageElement).src !== slide.desktopCloudinary) {
                    console.log('🔄 Switching to Cloudinary fallback...');
                    (e.target as HTMLImageElement).src = slide.desktopCloudinary;
                  }
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
