import React, { useState } from 'react';
import { createProxiedImageUrl, withCloudinaryTransform, buildProxiedSrcSet } from '@/lib/images';
import { createImageUrl, buildSimpleSrcSet } from '@/lib/simple-images';
import { IMAGE_CONFIG } from '@/config/images';

export type GridImage = { desktop: string; mobile?: string };

interface Props {
  images: GridImage[];
  maxColumns?: number;
  gap?: number;
  style?: React.CSSProperties;
  useSimpleSystem?: boolean; // New prop to toggle between systems
}

export default function ImageGrid({ 
  images = [], 
  maxColumns = IMAGE_CONFIG.defaultGridColumns, 
  gap = IMAGE_CONFIG.defaultGridGap, 
  style, 
  useSimpleSystem = IMAGE_CONFIG.system === 'simple' 
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
        if (useSimpleSystem) {
          // Use the simple system
          const src = createImageUrl(img.desktop);
          const srcSet = buildSimpleSrcSet(img.desktop);

          return (
            <div key={i} className="relative overflow-hidden rounded-lg bg-muted" style={{ aspectRatio: '4/3' }}>
              <img
                src={src}
                srcSet={srcSet}
                sizes={srcSet ? '100vw' : undefined}
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
        } else {
          // Use the existing Cloudinary system
          const isCloud = img.desktop ? img.desktop.includes('res.cloudinary.com') : false;
          // Apply Cloudinary transforms when applicable
          const transformed = isCloud
            ? withCloudinaryTransform(img.desktop, 'f_auto,q_auto,c_limit')
            : img.desktop;
          const src = createProxiedImageUrl(transformed);
          const srcSet = isCloud ? buildProxiedSrcSet(img.desktop) : undefined;

          return (
            <div key={i} className="relative overflow-hidden rounded-lg bg-muted" style={{ aspectRatio: '4/3' }}
>
              <img
                src={src}
                srcSet={srcSet}
                sizes={srcSet ? '100vw' : undefined}
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
        }
      })}
    </div>
  );
}