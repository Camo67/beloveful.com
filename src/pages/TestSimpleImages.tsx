import React from 'react';
import SimpleImageGrid from '@/components/SimpleImageGrid';
import { useSimpleImages } from '@/hooks/useSimpleImages';

const TestSimpleImages = () => {
  // Sample images - in a real app, these would come from your data source
  const sampleImages = [
    { 
      desktop: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1760968556/home/camo/new/beloveful.com/public/Website%20beloveful.com/CHI-770.jpg',
      mobile: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1760968556/home/camo/new/beloveful.com/public/Website%20beloveful.com/CHI-770.jpg'
    },
    {
      desktop: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1760968668/home/camo/new/beloveful.com/public/Website%20beloveful.com/CHI-65.jpg',
      mobile: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1760968668/home/camo/new/beloveful.com/public/Website%20beloveful.com/CHI-65.jpg'
    },
    {
      desktop: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1760968867/home/camo/new/beloveful.com/public/Website%20beloveful.com/CHI-2084-Website-2.jpg',
      mobile: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1760968867/home/camo/new/beloveful.com/public/Website%20beloveful.com/CHI-2084-Website-2.jpg'
    }
  ];

  const imageUrls = sampleImages.map(img => img.desktop);
  const { loadedImages, loading } = useSimpleImages(imageUrls);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Simple Image System Test</h1>
      
      {loading ? (
        <div className="text-center py-8">
          <p>Loading images...</p>
        </div>
      ) : (
        <>
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Simple Image Grid</h2>
            <SimpleImageGrid 
              images={sampleImages} 
              maxColumns={3}
              gap={16}
            />
          </div>
          
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Image Loading Status</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {sampleImages.map((img, index) => (
                <div key={index} className="border p-4 rounded">
                  <p className="font-medium">Image {index + 1}</p>
                  <p>Status: {loadedImages[img.desktop] ? 'Loaded' : 'Not loaded'}</p>
                  <p className="text-sm truncate">URL: {img.desktop}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TestSimpleImages;