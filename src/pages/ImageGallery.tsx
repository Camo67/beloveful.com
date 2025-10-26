import React from 'react';
import { useParams } from 'react-router-dom';
import { ORGANIZED_IMAGE_DATA } from '@/lib/comprehensive-image-data';
import SimpleImageGrid from '@/components/SimpleImageGrid';

const ImageGallery = () => {
  const { region, country } = useParams<{ region: string; country: string }>();

  // Get region data
  const regionData = region ? ORGANIZED_IMAGE_DATA.regions[decodeURIComponent(region)] : null;
  
  // Get country data
  const countryData = region && country 
    ? ORGANIZED_IMAGE_DATA.regions[decodeURIComponent(region)]?.countries[decodeURIComponent(country)] 
    : null;

  // Determine which images to display
  let imagesToDisplay = [];
  let title = '';
  
  if (countryData) {
    // Display country-specific images
    imagesToDisplay = countryData.images;
    title = `${countryData.name}, ${countryData.region}`;
  } else if (regionData) {
    // Display region-specific images
    imagesToDisplay = regionData.images;
    title = regionData.name;
  } else {
    // Display all images
    imagesToDisplay = ORGANIZED_IMAGE_DATA.allImages;
    title = 'All Images';
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">{title}</h1>
      
      {imagesToDisplay.length > 0 ? (
        <SimpleImageGrid 
          images={imagesToDisplay.map(img => ({ desktop: img.url, mobile: img.url }))}
          maxColumns={3}
          gap={16}
        />
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">No images found for this selection.</p>
        </div>
      )}
      
      <div className="mt-4 text-sm text-gray-500">
        Showing {imagesToDisplay.length} images
      </div>
    </div>
  );
};

export default ImageGallery;