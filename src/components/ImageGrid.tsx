import React, { useState } from 'react';
import { createProxiedImageUrl, withCloudinaryTransform, buildProxiedSrcSet } from '@/lib/images';

export type GridImage = { desktop: string; mobile?: string };

interface Props {
  images: GridImage[];
  maxColumns?: number;
  gap?: number;
  style?: React.CSSProperties;
}

export default function ImageGrid({ images = [], maxColumns = 3, gap = 12, style }: Props) {
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
        const isCloud = img.desktop ? img.desktop.includes('res.cloudinary.com') : false;
        // Apply Cloudinary transforms when applicable
        const transformed = isCloud
          ? withCloudinaryTransform(img.desktop, 'f_auto,q_auto,c_limit')
          : img.desktop;
        const src = createProxiedImageUrl(transformed);
        const srcSet = isCloud ? buildProxiedSrcSet(img.desktop) : undefined;

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
              onContextMenu={(e) => e.preventDefault()}
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        );
      })}
    </div>
  );
}
