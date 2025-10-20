import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Header } from "@/components/Header";
import FooterStrip from "@/components/FooterStrip";
import PageContainer from "@/components/PageContainer";
import { getAllAlbumsSorted, REGIONS, type Region } from "@/lib/data";
import { useAlbums } from "@/hooks/use-albums";
import { Gallery } from "@/components/Gallery";
import { useErasingBorders } from "@/hooks/use-erasing-borders";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";

export default function Projects() {
  // Reuse the old portfolio layout here per request
  const { data: allAlbums, isLoading } = useAlbums();
  const { data: erasingImages, isLoading: ebLoading } = useErasingBorders();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const activeRegion = useMemo(() => {
    const r = searchParams.get("region");
    return r && REGIONS.includes(r as Region) ? (r as Region) : "All";
  }, [searchParams]);
  const [selectedRegion, setSelectedRegion] = useState<Region | "All">(activeRegion);
  useEffect(() => setSelectedRegion(activeRegion), [activeRegion]);

  const allSortedAlbums = useMemo(() => (allAlbums ? getAllAlbumsSorted().filter(a => a.region !== "Logo") : []), [allAlbums]);

  const filteredAlbums = useMemo(() => {
    if (selectedRegion === "All") return allSortedAlbums.filter(a => a.slug !== 'erasing-borders');
    return allSortedAlbums.filter(a => a.region === selectedRegion);
  }, [allSortedAlbums, selectedRegion]);

  const normalizeRegion = (r: string) => r.toLowerCase().replace(/[^a-z]/g, "");
  const handleTabChange = (value: string) => {
    const next = value as Region | "All";
    if (next === "All") { navigate("/projects", { replace: true }); return; }
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
            <h1 className="heading-1 mb-4">Projects</h1>
            <div className="sr-only" aria-live="polite">
              Includes {totalCountries} countries with {totalImages} total photographs
            </div>
          </div>

          {/* Featured Project: Erasing Borders */}
          <section className="mb-12 bg-gray-50 dark:bg-gray-900 rounded-lg p-6 md:p-8">
            <div className="flex flex-col lg:flex-row gap-6 items-center">
              <div className="lg:w-1/2">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-black dark:text-white">
                  Erasing Borders
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  Roughly 8 billion human beings are roaming the earth this very moment. I aim to bring this connection into focus through the images in this collection, celebrating the shared humanity that transcends geographical and cultural boundaries.
                </p>
                <Link 
                  to="/projects/erasing-borders"
                  className="inline-flex items-center px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-medium rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
                >
                  View Project →
                </Link>
              </div>
              <div className="lg:w-1/2">
                {erasingImages && erasingImages.length > 0 && (
                  <div className="grid grid-cols-2 gap-3">
                    {erasingImages.slice(0, 4).map((img, i) => (
                      <div key={i} className="relative aspect-[4/3] overflow-hidden rounded-lg bg-muted">
                        <img
                          src={encodeURI(img.desktop)}
                          alt={`Erasing Borders preview ${i + 1}`}
                          className="w-full h-full object-cover"
                          draggable={false}
                          onContextMenu={(e) => e.preventDefault()}
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Travel Portfolio Section */}
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-black dark:text-white">
              Travel Portfolio
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Explore photography collections from around the world, organized by regions and countries.
            </p>
          </div>

          <div className="flex justify-center mb-8 w-full px-4">
            <NavigationMenu className="max-w-full">
              <NavigationMenuList className="flex-wrap justify-center gap-2">
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-accent-neutral text-white hover:bg-accent-neutral/90 px-6 py-2.5 text-sm md:text-base font-medium">
                    All Countries
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="w-screen max-w-[95vw] md:max-w-[700px] lg:max-w-[800px]">
                    <div className="grid gap-4 p-4 md:p-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr]">
                      <div className="md:col-span-2 lg:col-span-3">
                        <NavigationMenuLink asChild>
                          <Link to="/portfolio" className="block w-full text-left rounded-lg p-4">
                            <div className="text-base md:text-lg font-semibold">All Countries</div>
                            <p className="text-sm text-muted-foreground">View the complete collection from all regions</p>
                          </Link>
                        </NavigationMenuLink>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Sticky Region Tabs (copied) */}
          <div className="sticky top-[56px] md:top-[64px] z-30 bg-white/90 dark:bg-neutral-950/95 border-b border-border">
            <div role="tablist" className="w-full flex justify-center gap-1 px-2 py-2 md:px-4 md:py-3 overflow-x-auto md:overflow-x-visible whitespace-nowrap" data-orientation="horizontal">
              <button type="button" role="tab" aria-selected={selectedRegion === "All"} onClick={() => handleTabChange("All")} className={`inline-flex items-center justify-center px-3 md:px-4 py-1.5 rounded-md text-xs md:text-sm font-medium ${selectedRegion === "All" ? 'bg-accent-neutral text-white' : 'text-black dark:text-white hover:bg-muted'}`}>
                All
              </button>
              {REGIONS.map((region) => (
                <button key={region} type="button" role="tab" aria-selected={selectedRegion === region} onClick={() => handleTabChange(region)} className={`inline-flex items-center justify-center px-3 md:px-4 py-1.5 rounded-md text-xs md:text-sm font-medium ${selectedRegion === region ? 'bg-accent-neutral text-white' : 'text-black dark:text-white hover:bg-muted'}`}>
                  {region}
                </button>
              ))}
            </div>
          </div>

          {/* Content Area */}
          <section aria-label="Photography collections by region" id="projects-grid" role="tabpanel" className="pt-8">
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
                  <Link key={album.slug} to={`/${normalizeRegion(album.region)}/${album.slug}`} className="group clickable-area focus-enhanced">
                    <article className="content-card">
                      <div className="relative overflow-hidden bg-muted aspect-[4/3] rounded-sm">
                        <img src={encodeURI(album.images[0]?.desktop)} alt={`Representative image from ${album.country} collection`} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]" draggable={false} loading={index < 6 ? "eager" : "lazy"} onContextMenu={(e) => e.preventDefault()} />
                      </div>
                      <div className="p-4">
                        <h3 className="heading-3 mb-2">{album.country}</h3>
                        <p className="text-caption text-text-tertiary">{album.region} • {album.images.length} photograph{album.images.length !== 1 ? "s" : ""}</p>
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
