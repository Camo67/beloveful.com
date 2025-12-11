import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Header } from "@/components/Header";
import FooterStrip from "@/components/FooterStrip";
import PageContainer from "@/components/PageContainer";
import { getAllAlbumsSorted, REGIONS, type Region } from "@/lib/data";
import { useAlbums } from "@/hooks/use-albums";
import { Gallery } from "@/components/Gallery";
import { CloudImage } from "@/components/CloudImage";
import LeafletWorldMap from "@/components/LeafletWorldMap";
import { generateMapMarkers } from "@/lib/map-markers";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "react-day-picker";

export default function Portfolio() {
  const { data: allAlbums, isLoading, isError } = useAlbums();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [showMap, setShowMap] = useState(true);

  // Derive the active region directly from the URL, making it the source of truth.
  const activeRegion = useMemo(() => {
    const region = searchParams.get("region");
    return region && REGIONS.includes(region as Region) ? (region as Region) : "All";
  }, [searchParams]);

  // This state is now just a reflection of the URL.
  const [selectedRegion, setSelectedRegion] = useState<Region | "All">(activeRegion);

  const mapMarkers = useMemo(() => {
    if (!allAlbums) return [];
    return generateMapMarkers(allAlbums);
  }, [allAlbums]);

  useEffect(() => {
    setSelectedRegion(activeRegion);
  }, [activeRegion]);

  const allSortedAlbums = useMemo(() => {
    return allAlbums ? getAllAlbumsSorted().filter((a) => a.region !== "Logo") : [];
  }, [allAlbums]);

  const filteredAlbums = useMemo(() => {
    if (selectedRegion === "All") {
      // Exclude Erasing Borders and any non-travel photos
      return allSortedAlbums.filter(a => 
        a.slug !== 'erasing-borders' && 
        a.region !== 'Erasing Borders'
      );
    }
    return allSortedAlbums.filter(a => a.region === selectedRegion);
  }, [allSortedAlbums, selectedRegion]);

  const handleTabChange = (region: Region | "All") => {
    setSelectedRegion(region);
    if (region === "All") {
      setSearchParams({});
    } else {
      setSearchParams({ region });
    }
    navigate(`/portfolio${region === "All" ? "" : `?region=${encodeURIComponent(region)}`}`);
  };

  // Normalize region names for URLs (e.g. "North America" -> "northamerica")
  const normalizeRegion = (r: string) => r.toLowerCase().replace(/[^a-z]/g, "");

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Header variant="default" />
        <PageContainer>
          <div className="space-y-4">
            <div className="space-y-2">
              <Skeleton className="h-8 w-64" />
              <Skeleton className="h-4 w-96" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="aspect-[4/3] rounded-lg" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </PageContainer>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen">
        <Header variant="default" />
        <PageContainer>
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Error Loading Portfolio</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              There was an error loading the portfolio data. Please try again later.
            </p>
            <Button onClick={() => window.location.reload()}>
              Reload Page
            </Button>
          </div>
        </PageContainer>
      </div>
    );
  }

  const totalCountries = filteredAlbums.length;
  const totalImages = filteredAlbums.reduce((sum, album) => sum + album.images.length, 0);

  return (
    <div className="min-h-screen">
      <Header variant="default" />

      <a href="#main-content" className="skip-link">Skip to main content</a>

      <PageContainer>
        <main id="main-content" role="main">
          <div className="text-center mb-6 md:mb-8">
            <h1 className="heading-1 mb-4">Travel Portfolio</h1>
            <div className="sr-only" aria-live="polite">
              Portfolio contains {totalCountries} countries with {totalImages} total photographs
            </div>
          </div>

          {/* World Map Section */}
          <div className="mb-8">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <CardTitle>World Map</CardTitle>
                    <CardDescription>
                      Explore our photography collection around the globe
                    </CardDescription>
                  </div>
                  <button
                    onClick={() => setShowMap(!showMap)}
                    className="px-4 py-2 text-sm font-medium rounded-md bg-accent hover:bg-accent/90 transition-colors"
                  >
                    {showMap ? 'Hide Map' : 'Show Map'}
                  </button>
                </div>
              </CardHeader>
              {showMap && (
                <CardContent>
                  <div className="h-[500px] rounded-lg overflow-hidden">
                    <LeafletWorldMap markers={mapMarkers} />
                  </div>
                </CardContent>
              )}
            </Card>
          </div>

          {/* Navigation Dropdown - Full Width Responsive */}
          <div className="flex justify-center mb-8 w-full px-4">
            <NavigationMenu className="max-w-full">
              <NavigationMenuList className="flex-wrap justify-center gap-2">
                <NavigationMenuItem>
                  <NavigationMenuTrigger 
                    className="bg-accent-neutral text-white hover:bg-accent-neutral/90 
                               data-[state=open]:bg-accent-neutral/90 transition-all duration-200
                               px-6 py-2.5 text-sm md:text-base font-medium shadow-sm
                               touch-manipulation active:scale-95"
                  >
                    Travel Portfolio
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="w-screen max-w-[95vw] md:max-w-[700px] lg:max-w-[800px]">
                    <div className="grid gap-4 p-4 md:p-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr]">
                      {/* All Countries - Featured Item */}
                      <div className="md:col-span-2 lg:col-span-3">
                        <NavigationMenuLink asChild>
                          <button
                            onClick={() => handleTabChange("All")}
                            className="block w-full text-left select-none space-y-1.5 rounded-lg p-4 
                                     leading-none no-underline outline-none transition-all duration-200
                                     bg-gradient-to-r from-accent-neutral/10 to-transparent
                                     hover:from-accent-neutral/20 hover:to-accent-neutral/5
                                     hover:shadow-md hover:scale-[1.02]
                                     focus:from-accent-neutral/20 focus:to-accent-neutral/5 focus:shadow-md
                                     active:scale-[0.98] touch-manipulation"
                          >
                            <div className="text-base md:text-lg font-semibold leading-none text-foreground">
                              All Countries
                            </div>
                            <p className="text-sm leading-snug text-muted-foreground">
                              View the complete collection from all regions
                            </p>
                          </button>
                        </NavigationMenuLink>
                      </div>

                      {/* Continents/Regions Column */}
                      <div className="space-y-2">
                        <h3 className="mb-3 text-xs md:text-sm font-semibold tracking-wide uppercase text-muted-foreground">
                          By Continent
                        </h3>
                        <ul className="grid gap-1.5">
                        {REGIONS.filter(region => region !== "Erasing Borders" && region !== "Logo").map((region) => (
                            <li key={region}>
                              <NavigationMenuLink asChild>
                                <button
                                  onClick={() => handleTabChange(region)}
                                  className="block w-full text-left select-none rounded-md px-3 py-2.5
                                           leading-none no-underline outline-none transition-all duration-150
                                           hover:bg-accent hover:text-accent-foreground hover:shadow-sm hover:translate-x-1
                                           focus:bg-accent focus:text-accent-foreground focus:shadow-sm
                                           active:scale-95 touch-manipulation
                                           text-sm md:text-base font-medium"
                                >
                                  {region}
                                </button>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Countries Column - Scrollable on Mobile */}
                      <div className="md:col-span-1 lg:col-span-2 space-y-2">
                        <h3 className="mb-3 text-xs md:text-sm font-semibold tracking-wide uppercase text-muted-foreground">
                          Featured Countries
                        </h3>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 max-h-[280px] md:max-h-[320px] overflow-y-auto 
                                       overscroll-contain scroll-smooth pr-2
                                       [&::-webkit-scrollbar]:w-2
                                       [&::-webkit-scrollbar-track]:bg-transparent
                                       [&::-webkit-scrollbar-thumb]:bg-muted-foreground/20
                                       [&::-webkit-scrollbar-thumb]:rounded-full
                                       [&::-webkit-scrollbar-thumb]:hover:bg-muted-foreground/30">
                          {allSortedAlbums
                            .filter(album => 
                              album.slug !== 'erasing-borders' && 
                              album.region !== 'Erasing Borders' && 
                              album.region !== 'Logo'
                            )
                            .slice(0, 20)
                            .map((album) => (
                            <li key={album.slug}>
                              <NavigationMenuLink asChild>
                                <Link
                                  to={`/${normalizeRegion(album.region)}/${album.slug}`}
                                  className="block select-none space-y-1 rounded-md px-3 py-2.5
                                           leading-none no-underline outline-none transition-all duration-150
                                           hover:bg-accent hover:text-accent-foreground hover:shadow-sm hover:translate-x-1
                                           focus:bg-accent focus:text-accent-foreground focus:shadow-sm
                                           active:scale-95 touch-manipulation"
                                >
                                  <div className="text-sm md:text-base font-medium leading-tight">{album.country}</div>
                                  <p className="text-xs text-muted-foreground">{album.region}</p>
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      to="/projects"
                      className="group inline-flex h-10 w-max items-center justify-center rounded-md 
                               bg-background px-6 py-2.5 text-sm md:text-base font-medium 
                               transition-all duration-200 shadow-sm
                               hover:bg-accent hover:text-accent-foreground hover:shadow-md
                               focus:bg-accent focus:text-accent-foreground focus:outline-none focus:shadow-md
                               active:scale-95 touch-manipulation"
                    >
                      Projects
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
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

              {REGIONS.filter(region => region !== "Erasing Borders").map((region) => (
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
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 transition-opacity duration-500">
                {filteredAlbums.map((album, index) => (
                  <Link
                    key={album.slug}
                    to={`/${normalizeRegion(album.region)}/${album.slug}`}
                    className="group clickable-area"
                    aria-label={`View ${album.country} photography collection with ${album.images.length} photographs`}
                  >
                    <article className="content-card">
                      <div className="relative overflow-hidden bg-transparent aspect-[4/3]">
                        <CloudImage
                          url={album.images[0]?.desktop}
                          alt={`Representative image from ${album.country} collection`}
                          className="img-responsive transition-transform duration-300 group-hover:scale-[1.03]"
                          loading={index < 6 ? "eager" : "lazy"}
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
