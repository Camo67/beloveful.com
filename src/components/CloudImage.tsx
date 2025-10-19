import React from 'react';
import { createProxiedImageUrl } from '@/lib/images';

interface CloudImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  url: string;
}

/**
 * Simple image component that displays images as-is without any transformations.
 * Just fetches the original image from Cloudinary (or other sources) via proxy.
 */
export const CloudImage: React.FC<CloudImageProps> = ({ url, alt = '', className, loading, decoding = 'async', ...rest }) => {
  return (
    <img
      src={createProxiedImageUrl(url)}
      alt={alt}
      className={className}
      loading={loading}
      decoding={decoding}
      {...rest}
    />
  );
};
