import {
  useEffect,
  useMemo,
  useState,
  type CSSProperties,
  type FocusEvent,
  type PointerEvent,
} from "react";
import { SlideshowImage } from "@/lib/data";
import { getAlbumImageStableKey } from "@/lib/album-image-utils";
import { getImageAltText } from "@/lib/images";
import { useImageProtection } from "@/hooks/use-image-protection";
import { Lightbox } from "./Lightbox";
import { CmsImage } from "@/components/CmsImage.tsx";

interface GalleryProps {
  images: SlideshowImage[];
  country: string;
  region?: string;
  enablePrintCta?: boolean;
  ctaLabel?: string;
  galleryId?: string;
  onVisibleImagesChange?: (images: SlideshowImage[]) => void;
}

const GRID_GAP = 2;
const DESKTOP_HOVER_QUERY = "(min-width: 768px) and (hover: hover) and (pointer: fine)";

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function Gallery({
  images,
  country,
  region,
  enablePrintCta = false,
  ctaLabel = "Would you like this as a print?",
  galleryId,
  onVisibleImagesChange,
}: GalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [failedImageKeys, setFailedImageKeys] = useState<string[]>([]);
  const [hoveredTile, setHoveredTile] = useState<{
    key: string;
    x: number;
    y: number;
  } | null>(null);
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

  const visibleImages = useMemo(() => {
    if (failedImageKeys.length === 0) {
      return orderedImages;
    }

    const failedKeySet = new Set(failedImageKeys);
    return orderedImages.filter((image) => !failedKeySet.has(getAlbumImageStableKey(image)));
  }, [failedImageKeys, orderedImages]);

  const updateHoveredTile = (key: string, element: HTMLElement) => {
    if (
      typeof window === "undefined" ||
      typeof window.matchMedia !== "function" ||
      !window.matchMedia(DESKTOP_HOVER_QUERY).matches
    ) {
      return;
    }

    const rect = element.getBoundingClientRect();
    const viewportCenterX = window.innerWidth / 2;
    const viewportCenterY = window.innerHeight / 2;
    const tileCenterX = rect.left + rect.width / 2;
    const tileCenterY = rect.top + rect.height / 2;

    const x = clamp(((viewportCenterX - tileCenterX) / window.innerWidth) * 72, -48, 48);
    const y = clamp(((viewportCenterY - tileCenterY) / window.innerHeight) * 56, -32, 32);

    setHoveredTile({ key, x, y });
  };

  const handleDesktopHoverStart = (
    imageKey: string,
    event: PointerEvent<HTMLElement> | FocusEvent<HTMLElement>,
  ) => {
    updateHoveredTile(imageKey, event.currentTarget);
  };

  useEffect(() => {
    setFailedImageKeys([]);
  }, [orderedImages]);

  useEffect(() => {
    setHoveredTile(null);
  }, [orderedImages]);

  useEffect(() => {
    if (lightboxIndex === null) {
      return;
    }

    if (visibleImages.length === 0) {
      setLightboxIndex(null);
      return;
    }

    if (lightboxIndex >= visibleImages.length) {
      setLightboxIndex(visibleImages.length - 1);
    }
  }, [lightboxIndex, visibleImages.length]);

  useEffect(() => {
    onVisibleImagesChange?.(visibleImages);
  }, [onVisibleImagesChange, visibleImages]);

  useEffect(() => {
    if (!import.meta.env.DEV) {
      return;
    }

    const resolvedGalleryId = galleryId ?? (region ? `${region}/${country}` : country);
    console.debug("[Gallery] renderable images", {
      gallery: resolvedGalleryId,
      input: images.length,
      ordered: orderedImages.length,
      visible: visibleImages.length,
      failed: failedImageKeys.length,
    });
  }, [country, failedImageKeys.length, galleryId, images.length, orderedImages.length, region, visibleImages.length]);

  const masonryStyle: CSSProperties = {
    columnGap: GRID_GAP,
  };

  return (
    <>
      <div
        className="no-screenshot columns-1 min-[540px]:columns-2 lg:columns-3 xl:columns-4"
        aria-live="polite"
        style={masonryStyle}
      >
        {visibleImages.map((image, index) => {
          const imageKey = getAlbumImageStableKey(image);
          const isHovered = hoveredTile?.key === imageKey;
          const figureStyle: CSSProperties = {
            margin: `0 0 ${GRID_GAP}px 0`,
            padding: 0,
            border: "none",
            outline: "none",
            background: "transparent",
            boxShadow: "none",
            borderRadius: 0,
            breakInside: "avoid",
            position: "relative",
            isolation: "isolate",
            transform: isHovered
              ? `translate3d(${hoveredTile.x}px, ${hoveredTile.y}px, 0) scale(1.16)`
              : "translate3d(0, 0, 0) scale(1)",
            transformOrigin: "center center",
            zIndex: isHovered ? 20 : "auto",
            willChange: isHovered ? "transform" : "auto",
            transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
          };
          const altText = getImageAltText(image.desktop, country);

          return (
            <figure
              key={imageKey}
              className="relative md:transition-transform md:duration-300 motion-reduce:transform-none motion-reduce:transition-none"
              style={figureStyle}
              ref={(element) => {
                if (element) protectElement(element);
              }}
              onPointerEnter={(event) => handleDesktopHoverStart(imageKey, event)}
              onPointerMove={(event) => handleDesktopHoverStart(imageKey, event)}
              onPointerLeave={() => {
                setHoveredTile((current) => (current?.key === imageKey ? null : current));
              }}
              onFocus={(event) => handleDesktopHoverStart(imageKey, event)}
              onBlur={() => {
                setHoveredTile((current) => (current?.key === imageKey ? null : current));
              }}
            >
              <button
                type="button"
                onClick={() => setLightboxIndex(index)}
                className="block w-full cursor-zoom-in border-0 bg-transparent p-0 text-left focus-visible:outline-none"
                style={{
                  border: "none",
                  outline: "none",
                  background: "transparent",
                  boxShadow: "none",
                  borderRadius: 0,
                  position: "relative",
                }}
                aria-label={`View ${altText} in lightbox`}
              >
                <CmsImage
                  url={image.desktop}
                  alt={altText}
                  className="w-full select-none"
                  fallbackSrc={null}
                  draggable={false}
                  loading="lazy"
                  decoding="async"
                  onImageError={() => {
                    setFailedImageKeys((currentKeys) =>
                      currentKeys.includes(imageKey)
                        ? currentKeys
                        : [...currentKeys, imageKey],
                    );
                  }}
                  onImageLoadSuccess={() => {
                    setFailedImageKeys((currentKeys) =>
                      currentKeys.includes(imageKey)
                        ? currentKeys.filter((key) => key !== imageKey)
                        : currentKeys,
                    );
                  }}
                  onContextMenu={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    return false;
                  }}
                  onDragStart={(event) => {
                    event.preventDefault();
                    return false;
                  }}
                />
              </button>
            </figure>
          );
        })}
      </div>

      {lightboxIndex !== null && visibleImages[lightboxIndex] && (
        <Lightbox
          images={visibleImages}
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
