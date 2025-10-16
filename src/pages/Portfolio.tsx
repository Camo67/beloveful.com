import { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import FooterStrip from "@/components/FooterStrip";
import PageContainer from "@/components/PageContainer";
import { getAllAlbumsSorted, REGIONS, type Region } from "@/lib/data";
import { useAlbums } from "@/hooks/use-albums";
import { Lightbox } from "@/components/Lightbox";

export default function Portfolio() {
  const [chicagoLightboxIndex, setChicagoLightboxIndex] = useState<number | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<Region | "All">("All");
  const { data: allAlbums, isLoading } = useAlbums();

  // Get all albums sorted alphabetically by country name (exclude Logo content)
  const allSortedAlbums = allAlbums ? getAllAlbumsSorted().filter(a => a.region !== "Logo") : [];
  
  // Filter albums based on selected region
  const sortedAlbums = selectedRegion === "All" 
    ? allSortedAlbums 
    : allSortedAlbums.filter(a => a.region === selectedRegion);
  
  const chicagoAlbum = allAlbums?.find(a => a.region === "North America" && a.slug === "chicago");
  
  // Announce page content changes for screen readers
  const totalCountries = sortedAlbums.length;
  const totalImages = sortedAlbums.reduce((sum, album) => sum + album.images.length, 0);

  return (
    <div className="min-h-screen">
      <Header variant="default" />
      
      {/* Skip to main content link */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      
      <PageContainer>
        <main id="main-content" role="main">
        <div className="text-center mb-12">
          <h1 className="heading-1 mb-6">Portfolio</h1>
          <p className="text-body text-text-secondary max-w-2xl mx-auto">
            Documenting humanity across continents through street photography — all countries listed alphabetically
          </p>
          <div className="sr-only" aria-live="polite">
            Portfolio contains {totalCountries} countries with {totalImages} total photographs
          </div>
        </div>

        {/* Region Filter Tabs - Desktop Only */}
        <div className="hidden md:flex flex-wrap justify-center gap-2 mb-12" role="tablist" aria-label="Filter portfolio by region">
          <button
            onClick={() => setSelectedRegion("All")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              selectedRegion === "All"
                ? "bg-accent-neutral text-white shadow-md"
                : "bg-white dark:bg-neutral-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 hover:border-accent-neutral hover:text-accent-neutral dark:hover:border-accent-warm dark:hover:text-accent-warm"
            }`}
            role="tab"
            aria-selected={selectedRegion === "All"}
            aria-controls="portfolio-grid"
          >
            All Regions
          </button>
          {REGIONS.map((region) => (
            <button
              key={region}
              onClick={() => setSelectedRegion(region)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                selectedRegion === region
                  ? "bg-accent-neutral text-white shadow-md"
                  : "bg-white dark:bg-neutral-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 hover:border-accent-neutral hover:text-accent-neutral dark:hover:border-accent-warm dark:hover:text-accent-warm"
              }`}
              role="tab"
              aria-selected={selectedRegion === region}
              aria-controls="portfolio-grid"
            >
              {region}
            </button>
          ))}
        </div>

        {/* Section 1: Chicago (origin point) */}
        {chicagoAlbum && (
          <section className="mb-16">
            <div className="mb-6">
              <h2 className="text-2xl md:text-3xl font-light text-black dark:text-white">Chicago</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Origin point — images from home</p>
            </div>
            {/* Masonry-like responsive columns preserving intrinsic aspect ratios */}
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:_balance]">
              {chicagoAlbum.images.map((img, idx) => (
                <figure key={idx} className="mb-4 break-inside-avoid rounded">
                  <img
                    src={img.desktop}
                    alt="Chicago"
                    className="w-full h-auto select-none rounded-md cursor-zoom-in"
                    draggable={false}
                    onContextMenu={(e) => e.preventDefault()}
                    onClick={() => setChicagoLightboxIndex(idx)}
                  />
                </figure>
              ))}
            </div>

            {chicagoLightboxIndex !== null && (
              <Lightbox
                images={chicagoAlbum.images}
                currentIndex={chicagoLightboxIndex}
                onClose={() => setChicagoLightboxIndex(null)}
                onNavigate={setChicagoLightboxIndex}
                country="Chicago"
                getCtaHref={(image) => {
                  const params = new URLSearchParams({
                    image: image.desktop,
                    source: "portfolio",
                    region: "North America",
                    country: "Chicago",
                    variant: "print",
                  });
                  return `/contact?${params.toString()}`;
                }}
                ctaLabel="Would you like this as a print?"
              />
            )}
          </section>
        )}


        {/* Country Grid */}
        <section aria-label="Photography collections by country" id="portfolio-grid" role="tabpanel">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" role="status" aria-label="Loading portfolio">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-muted aspect-[4/3] mb-4 rounded-lg"></div>
                  <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-muted rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedAlbums.map((album, index) => (
              <Link
                key={album.slug}
                to={`/portfolio/${album.region.toLowerCase().replace(' ', '-')}/${album.slug}`}
                className="group clickable-area focus-enhanced"
                aria-label={`View ${album.country} photography collection with ${album.images.length} photographs`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    e.currentTarget.click();
                  }
                }}
              >
                <article className="content-card border-none p-0 shadow-sm hover:shadow-md">
                  <div className="relative overflow-hidden bg-muted aspect-[4/3] rounded-t-lg">
                    <img
                      src={album.images[0]?.desktop}
                      alt={`Representative image from ${album.country} collection`}
                      className="img-responsive transition-all duration-300 group-hover:scale-105"
                      draggable={false}
                      loading={index < 6 ? "eager" : "lazy"}
                      onContextMenu={(e) => e.preventDefault()}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                  </div>
                  <div className="p-4">
                    <h3 className="heading-3 mb-2">{album.country}</h3>
                    <p className="text-caption text-text-tertiary">
                      {album.region} • {album.images.length} photograph{album.images.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
          )}
        </section>
        </main>
      </PageContainer>

      <FooterStrip />
    </div>
  );
}
