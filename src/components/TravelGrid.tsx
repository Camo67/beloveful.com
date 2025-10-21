import React from 'react';
import { optimizeCloudinaryUrl, CLOUDINARY_DEFAULT_OPTS } from '@/lib/imageUtils';

type Props = {
  images: string[];
  columns?: number;
};

export default function TravelGrid({ images, columns = 3 }: Props) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: 12 }}>
      {images.map((url, i) => (
        <div key={i} style={{ width: '100%', paddingTop: '66%', position: 'relative', overflow: 'hidden', borderRadius: 6 }}>
          <img
            src={optimizeCloudinaryUrl(url, CLOUDINARY_DEFAULT_OPTS)}
            alt={`Travel ${i + 1}`}
            loading="lazy"
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = '0.6'; }}
          />
        </div>
      ))}
    </div>
  );
}
