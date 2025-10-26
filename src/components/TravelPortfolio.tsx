import React, { useState, useEffect } from 'react';

// Inline JSON data declaration at the top of the file
const indexData = {
  "summary": {
    "considered": 2228,
    "skipped_already_foldered": 0,
    "matched_regions": 5,
    "unknown_count": 5
  },
  "totals": {
    "folders": 92,
    "assets": 2228
  },
  "folders": [
    {
      "folder": "Africa/Egypt",
      "path": "cloudinary-assets/Africa/Egypt",
      "type": "country",
      "count": 189,
      "assetsPath": "cloudinary-assets/Africa/Egypt/urls.json",
      "region": "Africa",
      "country": "Egypt",
      "assets": [
        {"url": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760966468/home/camo/new/beloveful.com/public/Website%20beloveful.com/Africa/Egypt/11-16-EGY-1107.jpg"},
        {"url": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760966474/home/camo/new/beloveful.com/public/Website%20beloveful.com/Africa/Egypt/11-16-EGY-1128.jpg"},
        {"url": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760966481/home/camo/new/beloveful.com/public/Website%20beloveful.com/Africa/Egypt/11-17-EGY-172.jpg"}
      ]
    },
    {
      "folder": "Africa/Morocco",
      "path": "cloudinary-assets/Africa/Morocco",
      "type": "country",
      "count": 14,
      "assetsPath": "cloudinary-assets/Africa/Morocco/urls.json",
      "region": "Africa",
      "country": "Morocco",
      "assets": [
        {"url": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760967188/home/camo/new/beloveful.com/public/Website%20beloveful.com/Africa/Morocco/Morocco%201.jpg"},
        {"url": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760967192/home/camo/new/beloveful.com/public/Website%20beloveful.com/Africa/Morocco/Morocco%202.jpg"}
      ]
    },
    {
      "folder": "Africa/Tanzania",
      "path": "cloudinary-assets/Africa/Tanzania",
      "type": "country",
      "count": 1,
      "assetsPath": "cloudinary-assets/Africa/Tanzania/urls.json",
      "region": "Africa",
      "country": "Tanzania",
      "assets": [
        {"url": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760967240/home/camo/new/beloveful.com/public/Website%20beloveful.com/Africa/Tanzania/Tanzania%201.jpg"}
      ]
    },
    {
      "folder": "Asia/Japan",
      "path": "cloudinary-assets/Asia/Japan",
      "type": "country",
      "count": 20,
      "assetsPath": "cloudinary-assets/Asia/Japan/urls.json",
      "region": "Asia",
      "country": "Japan",
      "assets": [
        {"url": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760967744/home/camo/new/beloveful.com/public/Website%20beloveful.com/Asia/Japan/Japan%201.jpg"},
        {"url": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760967747/home/camo/new/beloveful.com/public/Website%20beloveful.com/Asia/Japan/Japan%202.jpg"}
      ]
    },
    {
      "folder": "North America/Chicago",
      "path": "cloudinary-assets/North America/Chicago",
      "type": "city",
      "count": 65,
      "assetsPath": "cloudinary-assets/North America/Chicago/urls.json",
      "region": "North America",
      "country": "United States",
      "category": "city",
      "assets": [
        {"url": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760968556/home/camo/new/beloveful.com/public/Website%20beloveful.com/CHI-770.jpg"},
        {"url": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760968668/home/camo/new/beloveful.com/public/Website%20beloveful.com/CHI-65.jpg"},
        {"url": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760968867/home/camo/new/beloveful.com/public/Website%20beloveful.com/CHI-2084-Website-2.jpg"}
      ]
    }
  ]
};

interface Folder {
  folder: string;
  path: string;
  type: string;
  count: number;
  assetsPath: string;
  region?: string;
  country?: string;
  category?: string;
  assets?: { url: string }[];
}

const TravelPortfolio = () => {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [assets, setAssets] = useState<{ url: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Filter and group country folders by region
  const regions = indexData.folders
    .filter(folder => folder.type === 'country')
    .reduce((acc, folder) => {
      if (!acc[folder.region]) {
        acc[folder.region] = [];
      }
      acc[folder.region].push(folder);
      return acc;
    }, {} as Record<string, Folder[]>);

  const handleCountryClick = (folder: Folder) => {
    setSelectedCountry(folder.country);
    setAssets(folder.assets || []);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Travel Portfolio</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Region/Country Navigation */}
        <div className="md:col-span-1 h-[calc(100vh-8rem)]">
          <div className="bg-white rounded-lg shadow overflow-hidden sticky top-0 h-full overflow-y-auto">
            {Object.entries(regions).map(([region, countries]) => (
              <div key={region} className="border-b last:border-0">
                <h2 className="font-semibold p-4 bg-gray-50 border-b">
                  {region}
                </h2>
                <ul className="divide-y">
                  {countries.map(country => (
                    <li 
                      key={country.folder}
                      className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => handleCountryClick(country)}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">{country.country}</span>
                        <span className="text-sm text-gray-500">{country.count} images</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Image Gallery */}
        <div className="md:col-span-3">
          {selectedCountry ? (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">{selectedCountry}</h2>
                <button
                  onClick={() => setSelectedCountry(null)}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  ← Back to all regions
                </button>
              </div>

              {error && (
                <div className="bg-red-50 text-red-700 p-4 rounded-md mb-6">
                  {error}
                </div>
              )}

              {loading ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="bg-gray-200 rounded-lg h-48 animate-pulse" />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {assets.map((asset, index) => (
                    <div key={index} className="rounded-lg overflow-hidden shadow-md">
                      <img
                        src={asset.url}
                        alt={`${selectedCountry} travel photo ${index + 1}`}
                        className="w-full h-48 object-cover"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-700">
                Select a region and country to view travel photos
              </h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TravelPortfolio;