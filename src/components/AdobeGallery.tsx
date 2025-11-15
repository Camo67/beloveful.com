import { useMemo } from "react";
import adobeImages from "../../data/adobe-images.json";

type AdobeImage = {
  src: string;
  alt: string;
  category?: string;
};

interface AdobeGalleryProps {
  className?: string;
  groupByCategory?: boolean;
  limitPerCategory?: number;
}

const images: AdobeImage[] = adobeImages as AdobeImage[];

function normalizeCategory(category?: string) {
  return category?.trim() || "Uncategorized";
}

export function AdobeGallery({
  className = "",
  groupByCategory = false,
  limitPerCategory,
}: AdobeGalleryProps) {
  const grouped = useMemo(() => {
    if (!groupByCategory) return null;
    return images.reduce<Record<string, AdobeImage[]>>((acc, img) => {
      const key = normalizeCategory(img.category);
      const list = acc[key] ?? [];
      list.push(img);
      acc[key] = list;
      return acc;
    }, {});
  }, [groupByCategory]);

  if (groupByCategory && grouped) {
    return (
      <section className={`space-y-8 ${className}`}>
        {Object.entries(grouped)
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([category, imgs]) => {
            const limited = limitPerCategory
              ? imgs.slice(0, limitPerCategory)
              : imgs;
            return (
              <div key={category}>
                <div className="mb-4">
                  <h3 className="text-lg font-semibold tracking-wide uppercase text-muted-foreground">
                    {category}
                  </h3>
                  <p className="text-sm text-muted-foreground/80">
                    {imgs.length.toLocaleString()} image
                    {imgs.length === 1 ? "" : "s"}
                  </p>
                </div>
                <ImageGrid images={limited} />
              </div>
            );
          })}
      </section>
    );
  }

  const limited = limitPerCategory ? images.slice(0, limitPerCategory) : images;
  return (
    <section className={className}>
      <ImageGrid images={limited} />
    </section>
  );
}

function ImageGrid({ images }: { images: AdobeImage[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {images.map((img) => (
        <figure
          key={img.src}
          className="flex flex-col items-center rounded-lg border border-border/60 bg-background/80 p-3 text-center shadow-sm transition hover:shadow"
        >
          <img
            src={img.src}
            alt={img.alt}
            loading="lazy"
            decoding="async"
            className="h-32 w-full object-contain mix-blend-normal"
          />
          <figcaption className="mt-2 text-xs font-medium text-muted-foreground line-clamp-2">
            {img.alt}
          </figcaption>
          {img.category && (
            <span className="mt-1 text-[10px] uppercase tracking-widest text-muted-foreground/70">
              {img.category}
            </span>
          )}
        </figure>
      ))}
    </div>
  );
}
