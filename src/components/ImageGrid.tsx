import React, { useState } from 'react';
import { createProxiedImageUrl } from '@/lib/images';
import { IMAGE_CONFIG } from '@/config/images';

export type GridImage = { desktop: string; mobile?: string };

interface Props {
  images: GridImage[];
  maxColumns?: number;
  gap?: number;
  style?: React.CSSProperties;
}

export default function ImageGrid({ 
  images = [], 
  maxColumns = IMAGE_CONFIG.defaultGridColumns, 
  gap = IMAGE_CONFIG.defaultGridGap, 
  style, 
}: Props) {
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
        const src = createProxiedImageUrl(img.desktop);

        return (
          <div key={i} className="relative overflow-hidden rounded-lg bg-muted" style={{ aspectRatio: '4/3' }}>
            <img
              src={src}
              alt=""
              loading={IMAGE_CONFIG.lazyLoad ? "lazy" : undefined}
              className={`w-full h-full object-cover transition-opacity duration-500 ${loaded[i] ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setLoaded((s) => ({ ...s, [i]: true }))}
              draggable={false}
              {...(IMAGE_CONFIG.preventRightClick && { onContextMenu: (e) => e.preventDefault() })}
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        );
      })}
    </div>
  );
}