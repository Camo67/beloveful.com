import React, { useState } from 'react';
import { 
  ORGANIZED_IMAGE_DATA,
  getRegionData,
  getCountryData,
  getCategoryData,
  getAllRegions,
  getAllCountriesInRegion,
  getAllCategories,
  getTopImages,
  searchImages
} from '@/lib/comprehensive-image-data';

const ComprehensiveImageDemo = () => {
  const [activeTab, setActiveTab] = useState<'regions' | 'categories' | 'search'>('regions');
  const [selectedRegion, setSelectedRegion] = useState<string>('');
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Get data for display
  const regions = getAllRegions();
  const categories = getAllCategories();
  const regionData = selectedRegion ? getRegionData(selectedRegion) : null;
  const countryData = selectedRegion && selectedCountry ? getCountryData(selectedRegion, selectedCountry) : null;
  const categoryData = selectedCategory ? getCategoryData(selectedCategory) : null;
  const searchResults = searchQuery ? searchImages(searchQuery) : [];

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Comprehensive Image Data Demo</h1>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-100 p-4 rounded">
          <h3 className="font-semibold">Total Images</h3>
          <p className="text-2xl">{ORGANIZED_IMAGE_DATA.allImages.length}</p>
        </div>
        <div className="bg-green-100 p-4 rounded">
          <h3 className="font-semibold">Regions</h3>
          <p className="text-2xl">{regions.length}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded">
          <h3 className="font-semibold">Categories</h3>
          <p className="text-2xl">{categories.length}</p>
        </div>
        <div className="bg-purple-100 p-4 rounded">
          <h3 className="font-semibold">Countries</h3>
          <p className="text-2xl">
            {regions.reduce((total, region) => {
              const regionData = getRegionData(region);
              return total + (regionData ? Object.keys(regionData.countries).length : 0);
            }, 0)}
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b mb-6">
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'regions' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('regions')}
        >
          Regions & Countries
        </button>
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'categories' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('categories')}
        >
          Categories
        </button>
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'search' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('search')}
        >
          Search
        </button>
      </div>

      {/* Regions & Countries Tab */}
      {activeTab === 'regions' && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Regions & Countries</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Region Selector */}
            <div>
              <h3 className="text-xl font-medium mb-3">Select Region</h3>
              <div className="grid grid-cols-2 gap-2">
                {regions.map(region => (
                  <button
                    key={region}
                    className={`p-3 rounded text-left ${selectedRegion === region ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                    onClick={() => {
                      setSelectedRegion(region);
                      setSelectedCountry('');
                    }}
                  >
                    {region}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Country Selector */}
            {selectedRegion && (
              <div>
                <h3 className="text-xl font-medium mb-3">Countries in {selectedRegion}</h3>
                <div className="grid grid-cols-2 gap-2">
                  {getAllCountriesInRegion(selectedRegion).map(country => (
                    <button
                      key={country}
                      className={`p-3 rounded text-left ${selectedCountry === country ? 'bg-green-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                      onClick={() => setSelectedCountry(country)}
                    >
                      {country}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Region Images */}
          {regionData && (
            <div className="mt-8">
              <h3 className="text-xl font-medium mb-3">
                {selectedRegion} Images ({regionData.images.length} total)
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {regionData.images.slice(0, 8).map((image, index) => (
                  <div key={index} className="border rounded overflow-hidden">
                    <img 
                      src={image.url} 
                      alt={image.filename} 
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-2 text-sm truncate">{image.filename}</div>
                  </div>
                ))}
              </div>
              {regionData.images.length > 8 && (
                <div className="mt-2 text-gray-500">
                  Showing 8 of {regionData.images.length} images
                </div>
              )}
            </div>
          )}
          
          {/* Country Images */}
          {countryData && (
            <div className="mt-8">
              <h3 className="text-xl font-medium mb-3">
                {selectedCountry} Images ({countryData.images.length} total)
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {countryData.images.slice(0, 8).map((image, index) => (
                  <div key={index} className="border rounded overflow-hidden">
                    <img 
                      src={image.url} 
                      alt={image.filename} 
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-2 text-sm truncate">{image.filename}</div>
                  </div>
                ))}
              </div>
              {countryData.images.length > 8 && (
                <div className="mt-2 text-gray-500">
                  Showing 8 of {countryData.images.length} images
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Categories Tab */}
      {activeTab === 'categories' && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Categories</h2>
          
          <div className="mb-6">
            <h3 className="text-xl font-medium mb-3">Select Category</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  className={`p-3 rounded text-left ${selectedCategory === category ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category} ({getCategoryData(category)?.images.length || 0})
                </button>
              ))}
            </div>
          </div>
          
          {/* Category Images */}
          {categoryData && (
            <div>
              <h3 className="text-xl font-medium mb-3">
                {selectedCategory} Images ({categoryData.images.length} total)
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {categoryData.images.slice(0, 12).map((image, index) => (
                  <div key={index} className="border rounded overflow-hidden">
                    <img 
                      src={image.url} 
                      alt={image.filename} 
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-2 text-sm truncate">{image.filename}</div>
                  </div>
                ))}
              </div>
              {categoryData.images.length > 12 && (
                <div className="mt-2 text-gray-500">
                  Showing 12 of {categoryData.images.length} images
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Search Tab */}
      {activeTab === 'search' && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Search Images</h2>
          
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search by filename..."
              className="w-full p-3 border rounded"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {searchQuery && (
            <div>
              <h3 className="text-xl font-medium mb-3">
                Search Results ({searchResults.length} found)
              </h3>
              {searchResults.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {searchResults.slice(0, 12).map((image, index) => (
                    <div key={index} className="border rounded overflow-hidden">
                      <img 
                        src={image.url} 
                        alt={image.filename} 
                        className="w-full h-40 object-cover"
                      />
                      <div className="p-2 text-sm truncate">{image.filename}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No images found matching "{searchQuery}"
                </div>
              )}
              {searchResults.length > 12 && (
                <div className="mt-2 text-gray-500">
                  Showing 12 of {searchResults.length} results
                </div>
              )}
            </div>
          )}
          
          {!searchQuery && (
            <div>
              <h3 className="text-xl font-medium mb-3">Top Images</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {getTopImages(12).map((image, index) => (
                  <div key={index} className="border rounded overflow-hidden">
                    <img 
                      src={image.url} 
                      alt={image.filename} 
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-2 text-sm truncate">{image.filename}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ComprehensiveImageDemo;