import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { SlideshowImage } from "@/lib/data";
import { getImageAltText } from "@/lib/images";
import { useImageProtection } from "@/hooks/use-image-protection";
import { Lightbox } from "./Lightbox";
import { CloudImage } from "@/components/CloudImage";

interface GalleryProps {
  images: SlideshowImage[];
  country: string;
  region?: string;
  enablePrintCta?: boolean;
  ctaLabel?: string;
}

const GRID_GAP = 2;
const REST_SCALE = 1;
const HOVER_SCALE = 1.3;
const SURROUNDING_SCALE = 0.9;
const SURROUNDING_OVERLAY_OPACITY = 1;
const MOBILE_BREAKPOINT = 767;
const MOBILE_GAP = 2;
const MOBILE_HOVER_SCALE = 1;
const MOBILE_REST_SCALE = 1;
const MIN_COMFORT_HOVER_SCALE = 1.08;
const FLOW_DURATION = "520ms";
const FLOW_FADE = "320ms";
const FLOW_EASING = "cubic-bezier(0.22, 0.61, 0.36, 1)";
const VIEWPORT_EDGE_PADDING = 8;
const VIEWPORT_TOP_PADDING = 72;
const CENTER_PULL_STRENGTH = 0.12;
const MAX_CENTER_PULL = 84;

type ActiveTransform = {
  x: number;
  y: number;
  scale: number;
};

export function Gallery({ images, country, region, enablePrintCta = false, ctaLabel = "Would you like this as a print?" }: GalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [activeTransform, setActiveTransform] = useState<ActiveTransform>({ x: 0, y: 0, scale: HOVER_SCALE });
  const [isMobile, setIsMobile] = useState(false);
  const figureRefs = useRef<Array<HTMLFigureElement | null>>([]);
  const { protectElement } = useImageProtection();

  const orderedImages = useMemo(() => {
    const portraits: SlideshowImage[] = [];
    const landscapes: SlideshowImage[] = [];

    for (const image of images) {
      const name = image.desktop.toLowerCase();
      if (name.includes("_portrait") || name.includes("-vertical") || name.includes("/vertical/")) {
        portraits.push(image);
      } else {
        landscapes.push(image);
      }
    }

    return [...landscapes, ...portraits];
  }, [images]);

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`);
    const update = (event?: MediaQueryListEvent) => {
      setIsMobile(event ? event.matches : mediaQuery.matches);
    };

    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  const resolvedGap = isMobile ? MOBILE_GAP : GRID_GAP;
  const resolvedRestScale = isMobile ? MOBILE_REST_SCALE : REST_SCALE;
  const resolvedHoverScale = isMobile ? MOBILE_HOVER_SCALE : HOVER_SCALE;

  const masonryStyle: CSSProperties = {
    columnGap: resolvedGap,
  };

  const clearActive = useCallback(() => {
    setActiveIndex(null);
    setActiveTransform({ x: 0, y: 0, scale: resolvedHoverScale });
  }, [resolvedHoverScale]);

  const computeActiveTransform = useCallback(
    (index: number) => {
      if (isMobile || typeof window === "undefined") {
        return { x: 0, y: 0, scale: resolvedHoverScale };
      }

      const element = figureRefs.current[index];
      if (!element) {
        return { x: 0, y: 0, scale: resolvedHoverScale };
      }

      const rect = element.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) {
        return { x: 0, y: 0, scale: resolvedHoverScale };
      }
      const desktopSelector = document.querySelector<HTMLElement>('[aria-label="Country quick selector"]');
      const selectorStyles = desktopSelector ? window.getComputedStyle(desktopSelector) : null;
      const selectorVisible =
        !!desktopSelector &&
        !!selectorStyles &&
        selectorStyles.display !== "none" &&
        selectorStyles.visibility !== "hidden" &&
        Number.parseFloat(selectorStyles.opacity) > 0.05;
      const selectorPanel = selectorVisible
        ? desktopSelector?.querySelector<HTMLElement>(".fixed")
        : null;
      const selectorRect = selectorPanel?.getBoundingClientRect();

      const minX = Math.max(VIEWPORT_EDGE_PADDING, (selectorRect?.right ?? 0) + VIEWPORT_EDGE_PADDING);
      const maxX = window.innerWidth - VIEWPORT_EDGE_PADDING;
      const minY = VIEWPORT_TOP_PADDING;
      const maxY = window.innerHeight - VIEWPORT_EDGE_PADDING;

      const maxScaleX = (maxX - minX) / rect.width;
      const maxScaleY = (maxY - minY) / rect.height;
      const fitScale = Math.min(resolvedHoverScale, maxScaleX, maxScaleY);
      const safeScale = Number.isFinite(fitScale) && fitScale > 0
        ? fitScale < MIN_COMFORT_HOVER_SCALE
          ? Math.max(1, fitScale)
          : fitScale
        : resolvedHoverScale;
      const extraX = (rect.width * safeScale - rect.width) / 2;
      const extraY = (rect.height * safeScale - rect.height) / 2;

      const clamp = (value: number, min: number, max: number) => {
        if (min > max) {
          return (min + max) / 2;
        }
        return Math.min(max, Math.max(min, value));
      };

      const viewportCenterX = (minX + maxX) / 2;
      const viewportCenterY = (minY + maxY) / 2;
      const imageCenterX = rect.left + rect.width / 2;
      const imageCenterY = rect.top + rect.height / 2;

      const desiredX = clamp(
        (viewportCenterX - imageCenterX) * CENTER_PULL_STRENGTH,
        -MAX_CENTER_PULL,
        MAX_CENTER_PULL,
      );
      const desiredY = clamp(
        (viewportCenterY - imageCenterY) * CENTER_PULL_STRENGTH,
        -MAX_CENTER_PULL,
        MAX_CENTER_PULL,
      );

      const minShiftX = minX - (rect.left - extraX);
      const maxShiftX = maxX - (rect.right + extraX);
      const minShiftY = minY - (rect.top - extraY);
      const maxShiftY = maxY - (rect.bottom + extraY);

      const shiftX = clamp(desiredX, minShiftX, maxShiftX);
      const shiftY = clamp(desiredY, minShiftY, maxShiftY);

      return {
        x: Math.round(shiftX),
        y: Math.round(shiftY),
        scale: safeScale,
      };
    },
    [isMobile, resolvedHoverScale],
  );

  const activateImage = useCallback(
    (index: number) => {
      setActiveIndex(index);
      setActiveTransform(computeActiveTransform(index));
    },
    [computeActiveTransform],
  );

  const deactivateImage = useCallback(
    (index: number) => {
      setActiveIndex((current) => {
        if (current === index) {
          setActiveTransform({ x: 0, y: 0, scale: resolvedHoverScale });
          return null;
        }
        return current;
      });
    },
    [resolvedHoverScale],
  );

  useEffect(() => {
    if (activeIndex === null || isMobile) {
      return;
    }

    const update = () => {
      setActiveTransform(computeActiveTransform(activeIndex));
    };

    update();
    window.addEventListener("resize", update, { passive: true });
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update);
    };
  }, [activeIndex, computeActiveTransform, isMobile]);

  return (
    <>
      <div
        className="no-screenshot columns-1 min-[540px]:columns-2 lg:columns-3 xl:columns-4"
        aria-live="polite"
        style={masonryStyle}
        onMouseLeave={clearActive}
      >
        {orderedImages.map((image, index) => {
          const isActive = activeIndex === index;
          const hasActive = activeIndex !== null;
          const isSurrounding = !isMobile && activeIndex !== null && activeIndex !== index;
          const baseScale = isSurrounding ? SURROUNDING_SCALE : resolvedRestScale;
          const overlayScale = isActive ? resolvedHoverScale : isSurrounding ? SURROUNDING_SCALE : resolvedRestScale;
          const overlayOpacity = isActive ? 1 : isSurrounding ? SURROUNDING_OVERLAY_OPACITY : 0;
          const figureStyle: CSSProperties = {
            margin: `0 0 ${resolvedGap}px 0`,
            padding: 0,
            border: "none",
            outline: "none",
            background: "transparent",
            boxShadow: "none",
            borderRadius: 0,
            position: "relative",
            breakInside: "avoid",
            zIndex: isActive ? 20 : 1,
            transition: `transform ${FLOW_DURATION} ${FLOW_EASING}`,
            willChange: "transform",
          };
          const baseImageStyle: CSSProperties = {
            width: "100%",
            height: "auto",
            display: "block",
            objectFit: "contain",
            objectPosition: "center center",
            border: "none",
            outline: "none",
            background: "transparent",
            boxShadow: "none",
            transform: `scale(${hasActive ? resolvedRestScale : baseScale})`,
            transformOrigin: "center",
            opacity: 1,
            filter: "none",
            transition: `transform ${FLOW_DURATION} ${FLOW_EASING}`,
            marginInline: "auto",
            willChange: "transform",
          };
          const zoomLayerStyle: CSSProperties = {
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            display: "block",
            objectFit: "contain",
            objectPosition: "center center",
            pointerEvents: "none",
            transform: `translate3d(${isActive ? activeTransform.x : 0}px, ${isActive ? activeTransform.y : 0}px, 0) scale(${isActive ? activeTransform.scale : overlayScale})`,
            transformOrigin: "center",
            opacity: overlayOpacity,
            transition: `transform ${FLOW_DURATION} ${FLOW_EASING}, opacity ${FLOW_FADE} ${FLOW_EASING}`,
            willChange: "transform, opacity",
            border: "none",
            outline: "none",
            background: "transparent",
            boxShadow: "none",
          };

          return (
            <figure
              key={`${index}-${image.desktop}`}
              style={figureStyle}
              ref={(element) => {
                figureRefs.current[index] = element;
                if (element) protectElement(element);
              }}
            >
                <button
                  type="button"
                  onClick={() => setLightboxIndex(index)}
                  onMouseEnter={() => activateImage(index)}
                  onFocus={() => activateImage(index)}
                  onBlur={() => deactivateImage(index)}
                  onPointerDown={(event) => {
                    if (event.pointerType === "touch" && !isMobile) {
                      activateImage(index);
                    }
                  }}
                className="block w-full border-0 bg-transparent p-0 text-left"
                style={{
                  border: "none",
                  outline: "none",
                  background: "transparent",
                  boxShadow: "none",
                  borderRadius: 0,
                  position: "relative",
                }}
                aria-label={`View ${getImageAltText(image.desktop, country)} in lightbox`}
              >
                <CloudImage
                  url={image.desktop}
                  alt={getImageAltText(image.desktop, country)}
                  className="w-full select-none"
                  draggable={false}
                  loading="lazy"
                  decoding="async"
                  onContextMenu={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    return false;
                  }}
                  onDragStart={(event) => {
                    event.preventDefault();
                    return false;
                  }}
                  style={baseImageStyle}
                />

                <CloudImage
                  url={image.desktop}
                  alt=""
                  aria-hidden="true"
                  className="select-none"
                  draggable={false}
                  loading="lazy"
                  decoding="async"
                  style={zoomLayerStyle}
                />
              </button>
            </figure>
          );
        })}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={orderedImages}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
          country={country}
          {...(enablePrintCta
            ? {
                getCtaHref: (image: SlideshowImage) => {
                  const filename = (() => {
                    try {
                      const url = new URL(image.desktop);
                      const last = url.pathname.split("/").pop() ?? "";
                      return last.split(".")[0];
                    } catch {
                      const parts = image.desktop.split("/");
                      const last = parts[parts.length - 1] ?? "";
                      return last.split(".")[0];
                    }
                  })();
                  const subject = `Print inquiry: ${country}${region ? ` (${region})` : ""} - ${filename}`;
                  const params = new URLSearchParams({
                    image: image.desktop,
                    source: "portfolio",
                    region: region ?? "",
                    country,
                    variant: "print",
                    subject,
                  });
                  return `/contact?${params.toString()}`;
                },
                ctaLabel,
              }
            : {})}
        />
      )}
    </>
  );
}
