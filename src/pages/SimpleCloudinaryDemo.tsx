import React, { useState, useEffect } from 'react';
import SimpleImageGrid from '@/components/SimpleImageGrid';
import { 
  SIMPLE_ALBUMS_FROM_CLOUDINARY,
  SIMPLE_PROJECTS_FROM_CLOUDINARY,
  SIMPLE_SLIDESHOW_FROM_CLOUDINARY,
  getSimpleAlbumsByRegionFromCloudinary
} from '@/lib/simple-cloudinary-data';
import { Region } from '@/lib/simple-data';
import { isUrlAccessible } from '@/lib/simple-image-utils';
import { title } from 'node:process';

const SimpleCloudinaryDemo = () => {
  const [selectedRegion, setSelectedRegion] = useState<Region | 'all'>('all');
  const [accessibleImages, setAccessibleImages] = useState<{ desktop: string; mobile: string }[]>([]);
  
  // Get images based on selected region
  const filteredAlbums = selectedRegion === 'all' 
    ? SIMPLE_ALBUMS_FROM_CLOUDINARY 
    : getSimpleAlbumsByRegionFromCloudinary(selectedRegion);
  
  // Flatten images from all albums for display
  const allImages = filteredAlbums.flatMap(album => album.images);
  
  // Get first 12 images for slideshow preview
  const slideshowPreview = SIMPLE_SLIDESHOW_FROM_CLOUDINARY.slice(0, 12);
  
  // Get featured project images
  const featuredProject = SIMPLE_PROJECTS_FROM_CLOUDINARY.find(p => p.featured);
  const featuredProjectImages = featuredProject ? featuredProject.images : [];

  // Check image accessibility
  useEffect(() => {
    const checkAccessibility = async () => {
      const accessible = [];
      for (const image of allImages.slice(0, 20)) { // Check first 20 images
        if (await isUrlAccessible(image.desktop)) {
          accessible.push(image);
        } else {
          console.warn('Inaccessible image URL:', image.desktop);
        }
      }
      setAccessibleImages(accessible);
    };

    checkAccessibility();
  }, [allImages]);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Simple Cloudinary Image Demo</h1>
      
      {/* Stats */}
      <div className="mb-6 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Data Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-3 rounded shadow">
            <p className="text-lg font-bold">{SIMPLE_ALBUMS_FROM_CLOUDINARY.length}</p>
            <p className="text-gray-600">Albums</p>
          </div>
          <div className="bg-white p-3 rounded shadow">
            <p className="text-lg font-bold">{allImages.length}</p>
            <p className="text-gray-600">Total Images</p>
          </div>
          <div className="bg-white p-3 rounded shadow">
            <p className="text-lg font-bold">{accessibleImages.length}/{Math.min(allImages.length, 20)}</p>
            <p className="text-gray-600">Accessible Images (sample)</p>
          </div>
        </div>
      </div>
      
      {/* Region Filter */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Filter by Region</h2>
        <div className="flex flex-wrap gap-2">
          <button
            className={`px-4 py-2 rounded ${selectedRegion === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setSelectedRegion('all')}
          >
            All Regions
          </button>
          {Array.from(new Set(SIMPLE_ALBUMS_FROM_CLOUDINARY.map(album => album.region))).map(region => (
            <button
              key={region}
              className={`px-4 py-2 rounded ${selectedRegion === region ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              onClick={() => setSelectedRegion(region as Region)}
            >
              {region}
            </button>
          ))}
        </div>
      </div>
      
      {/* Featured Project */}
      {featuredProject && (
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">{featuredProject.title}</h2>
          <p className="mb-4 text-gray-700">{featuredProject.description}</p>
          <SimpleImageGrid 
            images={featuredProjectImages} 
            maxImages={12}
          />
        </div>
      )}
      
      {/* Slideshow Preview */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Homepage Slideshow Preview</h2>
        <SimpleImageGrid 
          images={slideshowPreview}
        />
      </div>
      
      {/* Albums by Region */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">
          {selectedRegion === 'all' ? 'All Albums' : `${selectedRegion} Albums`}
        </h2>
        {filteredAlbums.length === 0 ? (
          <p className="text-gray-500 italic">No albums found for the selected region.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAlbums.map((album) => (
              <div key={album.slug} className="border rounded-lg overflow-hidden shadow-md">
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-2">{album.country}</h3>
                  <p className="text-gray-600 mb-2">{album.region}</p>
                  <p className="text-sm text-gray-500 mb-3">{album.images.length} images</p>
                  {album.images.length > 0 && (
                    <img 
                      src={album.images[0].desktop} 
                      alt={album.title} 
                      className="w-full h-48 object-cover rounded"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://placehold.co/600x400?text=Image+Not+Found';
                      }}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* All Images Grid */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">All Images</h2>
        <p className="mb-4 text-gray-700">
          Showing {Math.min(allImages.length, 24)} of {allImages.length} images
        </p>
        <SimpleImageGrid 
          images={allImages}
          maxImages={24}
        />
      </div>
    </div>
  );
};

export default SimpleCloudinaryDemo;