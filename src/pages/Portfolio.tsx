import { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import FooterStrip from "@/components/FooterStrip";
import PageContainer from "@/components/PageContainer";
import { REGIONS } from "@/lib/data";
import { useAlbums } from "@/hooks/use-albums";

export default function Portfolio() {
  const [activeRegion, setActiveRegion] = useState<string>("Africa");
  const { data: allAlbums, isLoading } = useAlbums();

  const albums = allAlbums?.filter(album => album.region === activeRegion) || [];

  return (
    <div className="min-h-screen">
      <Header variant="default" />
      
      <PageContainer>
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-light mb-4 text-black dark:text-white">Portfolio</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
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
                  ? "text-black dark:text-white border-b-2 border-black dark:border-white"
                  : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
              }`}
            >
              {region}
            </button>
          ))}
        </div>

        {/* Country Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 dark:bg-gray-700 aspect-[4/3] mb-4 rounded"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {albums.map((album) => (
            <Link
              key={album.slug}
              to={`/portfolio/${album.region.toLowerCase().replace(' ', '-')}/${album.slug}`}
              className="group"
            >
              <div className="relative overflow-hidden bg-gray-100 dark:bg-gray-800 aspect-[4/3]">
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
                <h3 className="text-xl font-medium text-black dark:text-white">{album.country}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{album.images.length} photographs</p>
              </div>
            </Link>
          ))}
        </div>
        )}
      </PageContainer>

      <FooterStrip />
    </div>
  );
}
