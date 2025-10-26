import React from 'react';
import { Link } from 'react-router-dom';
import { ORGANIZED_IMAGE_DATA } from '@/lib/comprehensive-image-data';

const GalleryPage = () => {
  const regions = Object.entries(ORGANIZED_IMAGE_DATA.regions);
  
  // Calculate total images
  const totalImages = Object.values(ORGANIZED_IMAGE_DATA.regions).reduce(
    (total, region) => total + region.images.length, 
    0
  );
  
  // Calculate total countries
  const totalCountries = Object.values(ORGANIZED_IMAGE_DATA.regions).reduce(
    (total, region) => total + Object.keys(region.countries).length, 
    0
  );

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-2">Image Gallery</h1>
      <p className="text-gray-600 mb-6">
        {totalImages} images across {totalCountries} countries in {regions.length} regions
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {regions.map(([regionName, regionData]) => (
          <Link 
            to={`/gallery/${encodeURIComponent(regionName)}`}
            key={regionName}
            className="border rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">{regionName}</h2>
            <p className="text-gray-600 mb-3">
              {Object.keys(regionData.countries).length} countries, {regionData.images.length} images
            </p>
            {regionData.images.length > 0 && (
              <div className="aspect-video bg-gray-200 rounded overflow-hidden">
                <img 
                  src={regionData.images[0].url} 
                  alt={regionName} 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </Link>
        ))}
      </div>
      
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(ORGANIZED_IMAGE_DATA.categories).map(([categoryName, categoryData]) => (
            <div key={categoryName} className="border rounded-lg p-4">
              <h3 className="font-semibold">{categoryName}</h3>
              <p className="text-gray-600">{categoryData.images.length} images</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GalleryPage;