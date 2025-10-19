import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Header } from "@/components/Header";
import FooterStrip from "@/components/FooterStrip";
import PageContainer from "@/components/PageContainer";
import { getAllAlbumsSorted, REGIONS, type Region } from "@/lib/data";
import { useAlbums } from "@/hooks/use-albums";
import { Gallery } from "@/components/Gallery";
import { useErasingBorders } from "@/hooks/use-erasing-borders";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CloudImage } from "@/components/CloudImage";

export default function Portfolio() {
  const { data: allAlbums, isLoading } = useAlbums();
  const { data: erasingImages, isLoading: ebLoading } = useErasingBorders();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Derive the active region directly from the URL, making it the source of truth.
  const activeRegion = useMemo(() => {
    const region = searchParams.get("region");
    return region && REGIONS.includes(region as Region) ? (region as Region) : "All";
  }, [searchParams]);

  // This state is now just a reflection of the URL.
  const [selectedRegion, setSelectedRegion] = useState<Region | "All">(activeRegion);

  useEffect(() => {
    setSelectedRegion(activeRegion);
  }, [activeRegion]);

  const allSortedAlbums = useMemo(() => {
    return allAlbums ? getAllAlbumsSorted().filter((a) => a.region !== "Logo") : [];
  }, [allAlbums]);

  const filteredAlbums = useMemo(() => {
    if (selectedRegion === "All") {
      // Exclude "Erasing Borders" from the main "All" grid.
      return allSortedAlbums.filter(a => a.slug !== 'erasing-borders');
    } 
    return allSortedAlbums.filter((a) => a.region === selectedRegion);
  }, [allSortedAlbums, selectedRegion]);
  
  const normalizeRegion = (r: string) => r.toLowerCase().replace(/[^a-z]/g, "");

  const handleTabChange = (value: string) => {
    const next = value as Region | "All";
    if (next === "All") {
      navigate("/portfolio", { replace: true });
      return;
    }
    navigate(`/${normalizeRegion(next)}`, { replace: true });
  };

  const totalCountries = filteredAlbums.length;
  const totalImages = filteredAlbums.reduce((sum, album) => sum + album.images.length, 0);

  return (
    <div className="min-h-screen">
      <Header variant="default" />

      <a href="#main-content" className="skip-link">Skip to main content</a>

      <PageContainer>
        <main id="main-content" role="main">
          <div className="text-center mb-6 md:mb-8">
            <h1 className="heading-1 mb-4">Portfolio</h1>
            <div className="sr-only" aria-live="polite">
              Portfolio contains {totalCountries} countries with {totalImages} total photographs
            </div>
          </div>

          {/* Sticky Region Tabs */}
          <div className="sticky top-[56px] md:top-[64px] z-30 bg-white/90 dark:bg-neutral-950/95
                backdrop-blur supports-[backdrop-filter]:bg-white/60
                dark:supports-[backdrop-filter]:bg-neutral-950/70
                border-b border-border">

            {/* Tabs Container */}
            <div
              role="tablist"
              className="w-full flex justify-center gap-1 px-2 py-2 md:px-4 md:py-3 
                         overflow-x-auto md:overflow-x-visible whitespace-nowrap"
              data-orientation="horizontal"
            >
              {/* AI Prompt: Keep horizontal scroll only on mobile. Do NOT add scroll on desktop. */}

              <button
                type="button"
                role="tab"
                aria-selected={selectedRegion === "All"}
                onClick={() => handleTabChange("All")}
                className={`inline-flex items-center justify-center px-3 md:px-4 py-1.5
                           rounded-md text-xs md:text-sm font-medium transition-colors
                           ${selectedRegion === "All" 
                             ? 'bg-accent-neutral text-white' 
                             : 'text-black dark:text-white hover:bg-muted'}`}
              >
                All
              </button>

              {REGIONS.map((region) => (
                <button
                  key={region}
                  type="button"
                  role="tab"
                  aria-selected={selectedRegion === region}
                  onClick={() => handleTabChange(region)}
                  className={`inline-flex items-center justify-center px-3 md:px-4 py-1.5
                             rounded-md text-xs md:text-sm font-medium transition-colors
                             ${selectedRegion === region 
                               ? 'bg-accent-neutral text-white' 
                               : 'text-black dark:text-white hover:bg-muted'}`}
                >
                  {region}
                </button>
              ))}
            </div>

            {/* Sub-links below Tabs */}
            {selectedRegion !== "All" && selectedRegion !== "Erasing Borders" && filteredAlbums.length > 0 && (
              <div className="px-2 md:px-4 py-2 border-t border-border overflow-x-auto md:overflow-x-visible whitespace-nowrap">
                {filteredAlbums.map((album) => (
                  <Link
                    key={album.slug}
                    to={`/${normalizeRegion(album.region)}/${album.slug}`}
                    className="inline-block mr-3 px-3 py-1 rounded-full text-sm border border-transparent
                               hover:border-border hover:bg-muted transition-colors"
                  >
                    {album.country}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Content Area */}
          <section aria-label="Photography collections by region" id="portfolio-grid" role="tabpanel" className="pt-8">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8" role="status" aria-label="Loading portfolio">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-muted aspect-[4/3] mb-4 rounded-lg"></div>
                    <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-muted rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : selectedRegion === "Erasing Borders" ? (
              (() => {
                const erasingBordersAlbum = allSortedAlbums.find((a) => a.slug === 'erasing-borders');
                if (!erasingBordersAlbum) return null;
                return (
                  <>
                    <div className="mb-12">
                      <div className="text-center text-gray-800 dark:text-gray-200 leading-relaxed">
                        <p className="text-lg md:text-xl font-light mb-6">
                          Roughly 8 billion human beings are roaming the earth this very moment. Each one of us living varied experiences in different climates, cultures, and environments. Driven by insatiable curiosity & forever fascination with the world; I left being a physician to pursue my passion of travel & photography. Each trip expanded my mind, opened my heart, & I began seeing the world in a different light; becoming part of an ever smaller & more connected world.
                        </p>
                        <p className="text-lg md:text-xl font-light">
                          I aim to bring this connection into focus through the images in this collection. Even though we come from different nations & cultures, we all share one thing: The human condition. Our innate ability to empathize & feel each other's plights & joys is what unites us; Erasing the borders & restrictions of ego, time, & space.
                        </p>
                      </div>
                    </div>
                    {ebLoading ? (
                      <div className="text-center text-gray-600 dark:text-gray-300">Loading collection…</div>
                    ) : (
                      <Gallery images={(erasingImages && erasingImages.length) ? erasingImages : erasingBordersAlbum.images} country={erasingBordersAlbum.country} region={erasingBordersAlbum.region} enablePrintCta />
                    )}
                  </>
                );
              })()
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 transition-opacity duration-500">
                {filteredAlbums.map((album, index) => (
                  <Link
                    key={album.slug}
                    to={`/${normalizeRegion(album.region)}/${album.slug}`}
                    className="group clickable-area focus-enhanced"
                    aria-label={`View ${album.country} photography collection with ${album.images.length} photographs`}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        e.currentTarget.click();
                      }
                    }}
                  >
                    <article className="content-card">
                      <div className="relative overflow-hidden bg-muted aspect-[4/3] rounded-sm">
                        <CloudImage
                          url={album.images[0]?.desktop}
                          alt={`Representative image from ${album.country} collection`}
                          className="img-responsive transition-transform duration-300 group-hover:scale-[1.03]"
                          draggable={false}
                          loading={index < 6 ? "eager" : "lazy"}
                          onContextMenu={(e) => e.preventDefault()}
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="heading-3 mb-2">{album.country}</h3>
                        <p className="text-caption text-text-tertiary">
                          {album.region} • {album.images.length} photograph{album.images.length !== 1 ? "s" : ""}
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
