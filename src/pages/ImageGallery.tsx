import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { ORGANIZED_IMAGE_DATA } from '@/lib/comprehensive-image-data';
import { Gallery } from '@/components/Gallery';
import { dedupeAlbumImages } from '@/lib/album-image-utils';

const ImageGallery = () => {
  const { region, country } = useParams<{ region: string; country: string }>();

  // Get region data
  const regionData = region ? ORGANIZED_IMAGE_DATA.regions[decodeURIComponent(region)] : null;
  
  // Get country data
  const countryData = region && country 
    ? ORGANIZED_IMAGE_DATA.regions[decodeURIComponent(region)]?.countries[decodeURIComponent(country)] 
    : null;

  const { imagesToDisplay, title } = useMemo(() => {
    if (countryData) {
      return {
        imagesToDisplay: countryData.images,
        title: `${countryData.name}, ${countryData.region}`,
      };
    }

    if (regionData) {
      return {
        imagesToDisplay: regionData.images,
        title: regionData.name,
      };
    }

    return {
      imagesToDisplay: ORGANIZED_IMAGE_DATA.allImages,
      title: 'All Images',
    };
  }, [countryData, regionData]);

  const galleryImages = useMemo(
    () =>
      dedupeAlbumImages(
        imagesToDisplay.map((img) => ({ desktop: img.url, mobile: img.url })),
      ),
    [imagesToDisplay],
  );

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">{title}</h1>
      
      {galleryImages.length > 0 ? (
        <Gallery
          images={galleryImages}
          country={countryData?.name || country || "Gallery"}
          region={regionData?.name}
        />
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">No images found for this selection.</p>
        </div>
      )}
      
      <div className="mt-4 text-sm text-gray-500">
        Showing {galleryImages.length} images
      </div>
    </div>
  );
};

export default ImageGallery;
