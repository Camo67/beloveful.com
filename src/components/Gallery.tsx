import { useMemo, useState } from "react";
import { SlideshowImage } from "@/lib/data";
import { createProxiedImageUrl, getImageAltText, buildProxiedSrcSet, DEFAULT_SIZES } from "@/lib/images";
import { useImageProtection } from "@/hooks/use-image-protection";
import { Lightbox } from "./Lightbox";

interface GalleryProps {
  images: SlideshowImage[];
  country: string;
  region?: string;
  enablePrintCta?: boolean;
  ctaLabel?: string;
}

export function Gallery({ images, country, region, enablePrintCta = false, ctaLabel = "Would you like this as a print?" }: GalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  // Enable comprehensive image protection
  const { protectElement } = useImageProtection();

  // Landscape-first ordering (best-effort): prefer desktop orientation
  const orderedImages = useMemo(() => {
    // Heuristic: when URLs include known portrait indicators (rare), push to end
    const portraits: SlideshowImage[] = [];
    const landscapes: SlideshowImage[] = [];
    for (const img of images) {
      const name = img.desktop.toLowerCase();
      if (name.includes("_portrait") || name.includes("-vertical") || name.includes("/vertical/")) {
        portraits.push(img);
      } else {
        landscapes.push(img);
      }
    }
    return [...landscapes, ...portraits];
  }, [images]);

  return (
    <>
      {/* Masonry: columns with micro-spacing; preserves aspect ratio and avoids cropping */}
      <div
        className="no-screenshot columns-1 xs:columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-4 2xl:columns-5 gap-[4px]"
        aria-live="polite"
      >
        {orderedImages.map((image, index) => (
          <figure
            key={index}
            className="mb-[4px] break-inside-avoid rounded-sm overflow-hidden group shadow-sm hover:shadow-md transition-shadow duration-500"
            ref={(el) => {
              if (el) protectElement(el);
            }}
          >
            <button
              type="button"
              onClick={() => setLightboxIndex(index)}
              className="block w-full text-left outline-none"
              aria-label={`View ${getImageAltText(image.desktop, country)} in lightbox`}
            >
              <picture>
                <source media="(max-width: 768px)" srcSet={createProxiedImageUrl(image.mobile)} />
                <img
                  src={createProxiedImageUrl(image.desktop)}
                  srcSet={buildProxiedSrcSet(image.desktop)}
                  sizes={DEFAULT_SIZES}
                  alt={getImageAltText(image.desktop, country)}
                  className="w-full h-auto max-w-full transform-gpu transition-transform duration-500 will-change-transform group-hover:scale-[1.02]"
                  draggable={false}
                  loading="lazy"
                  decoding="async"
                  fetchPriority={("auto" as any)}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                  }}
                  onDragStart={(e) => {
                    e.preventDefault();
                    return false;
                  }}
                  style={{ maxWidth: "100%", height: "auto" }}
                />
              </picture>
            </button>
          </figure>
        ))}
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
