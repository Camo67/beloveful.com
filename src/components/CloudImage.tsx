import React from 'react';
import { AdvancedImage, lazyload, responsive, accessibility, placeholder } from '@cloudinary/react';
import { cld, publicIdFromUrl, isCloudinaryUrl } from '@/lib/cloudinary';
import { createProxiedImageUrl, buildProxiedSrcSet, DEFAULT_SIZES } from '@/lib/images';

interface CloudImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  url: string;
}

export const CloudImage: React.FC<CloudImageProps> = ({ url, alt = '', className, sizes = DEFAULT_SIZES, loading, decoding = 'async', ...rest }) => {
  if (isCloudinaryUrl(url)) {
    const publicId = publicIdFromUrl(url);
    if (publicId) {
      const img = cld.image(publicId);
      return (
        <AdvancedImage
          cldImg={img}
          plugins={[lazyload(), responsive(), accessibility(), placeholder()]}
          alt={alt}
          className={className}
          sizes={sizes}
          loading={loading as any}
          decoding={decoding as any}
          {...rest}
        />
      );
    }
  }

  // Fallback to regular <img> with our proxy + srcset helpers
  return (
    <img
      src={createProxiedImageUrl(url)}
      srcSet={buildProxiedSrcSet(url)}
      sizes={sizes}
      alt={alt}
      className={className}
      loading={loading}
      decoding={decoding}
      {...rest}
    />
  );
};