import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ORGANIZED_IMAGE_DATA } from '@/lib/comprehensive-image-data';

const RegionPage = () => {
  const { region } = useParams<{ region: string }>();
  const decodedRegion = region ? decodeURIComponent(region) : '';
  
  const regionData = ORGANIZED_IMAGE_DATA.regions[decodedRegion];
  
  if (!regionData) {
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Region not found</h1>
        <p className="text-gray-600">The region "{decodedRegion}" does not exist.</p>
        <Link to="/gallery" className="text-blue-500 hover:underline mt-4 inline-block">
          ← Back to all galleries
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">{regionData.name}</h1>
        <Link to="/gallery" className="text-blue-500 hover:underline">
          ← Back to all galleries
        </Link>
      </div>
      
      <div className="mb-6">
        <p className="text-gray-600">
          {Object.keys(regionData.countries).length} countries with {regionData.images.length} images
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(regionData.countries).map(([countryName, countryData]) => (
          <Link 
            to={`/gallery/${encodeURIComponent(decodedRegion)}/${encodeURIComponent(countryName)}`}
            key={countryName}
            className="border rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">{countryName}</h2>
            <p className="text-gray-600 mb-3">{countryData.images.length} images</p>
            {countryData.images.length > 0 && (
              <div className="aspect-video bg-gray-200 rounded overflow-hidden">
                <img 
                  src={countryData.images[0].url} 
                  alt={countryName} 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RegionPage;