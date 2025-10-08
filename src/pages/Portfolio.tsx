import { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import FooterStrip from "@/components/FooterStrip";
import { REGIONS, getAlbumsByRegion } from "@/lib/data";

export default function Portfolio() {
  const [activeRegion, setActiveRegion] = useState<string>("Africa");

  const albums = getAlbumsByRegion(activeRegion as any);

  return (
    <div className="min-h-screen bg-white">
      <Header variant="default" />
      
      <main className="max-w-screen-xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-light mb-4">Portfolio</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Documenting humanity across continents through street photography
          </p>
        </div>

        {/* Region Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {REGIONS.map((region) => (
            <button
              key={region}
              onClick={() => setActiveRegion(region)}
              className={`px-6 py-3 text-sm font-medium transition-colors duration-300 ${
                activeRegion === region
                  ? "text-black border-b-2 border-black"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              {region}
            </button>
          ))}
        </div>

        {/* Country Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {albums.map((album) => (
            <Link
              key={album.slug}
              to={`/portfolio/${album.region.toLowerCase().replace(' ', '-')}/${album.slug}`}
              className="group"
            >
              <div className="relative overflow-hidden bg-gray-100 aspect-[4/3]">
                <img
                  src={album.images[0]?.desktop}
                  alt={album.country}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  draggable={false}
                  onContextMenu={(e) => e.preventDefault()}
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="mt-4">
                <h3 className="text-xl font-medium">{album.country}</h3>
                <p className="text-sm text-gray-600">{album.images.length} photographs</p>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <FooterStrip />
    </div>
  );
}