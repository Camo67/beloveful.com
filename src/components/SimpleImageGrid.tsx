import React, { useState } from 'react';
import { createImageUrl, buildSimpleSrcSet } from '@/lib/simple-images';

export type SimpleGridImage = { desktop: string; mobile?: string };

interface Props {
  images: SimpleGridImage[];
  maxColumns?: number;
  gap?: number;
  style?: React.CSSProperties;
}

export default function SimpleImageGrid({ images = [], maxColumns = 3, gap = 12, style }: Props) {
  const [loaded, setLoaded] = useState<Record<number, boolean>>({});

  return (
    <div
      className={`grid`}
      style={{
        gridTemplateColumns: `repeat(auto-fill, minmax(${Math.floor(100 / maxColumns)}%, 1fr))`,
        gap: gap,
        ...style,
      }}
    >
      {images.map((img, i) => {
        const src = createImageUrl(img.desktop);
        const srcSet = buildSimpleSrcSet(img.desktop);

        return (
          <div key={i} className="relative overflow-hidden rounded-lg bg-muted" style={{ aspectRatio: '4/3' }}>
            <img
              src={src}
              srcSet={srcSet}
              sizes={srcSet ? '100vw' : undefined}
              alt=""
              loading="lazy"
              className={`w-full h-full object-cover transition-opacity duration-500 ${loaded[i] ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setLoaded((s) => ({ ...s, [i]: true }))}
              draggable={false}
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        );
      })}
    </div>
  );
}