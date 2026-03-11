import { useEffect, useMemo, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/Header";
import FooterStrip from "@/components/FooterStrip";
import PageContainer from "@/components/PageContainer";
import { Gallery } from "@/components/Gallery";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAlbum, useAlbums } from "@/hooks/use-albums";
import { Skeleton } from "@/components/ui/skeleton";

const COUNTRY_FLAGS: Record<string, string> = {
  Argentina: "🇦🇷",
  Caribbean: "🏝️",
  Chicago: "🇺🇸",
  Cuba: "🇨🇺",
  Egypt: "🇪🇬",
  Ethiopia: "🇪🇹",
  "Hong Kong": "🇭🇰",
  Italy: "🇮🇹",
  Japan: "🇯🇵",
  Jordan: "🇯🇴",
  Mexico: "🇲🇽",
  Morocco: "🇲🇦",
  Myanmar: "🇲🇲",
  Namibia: "🇳🇦",
  Nepal: "🇳🇵",
  "New York": "🇺🇸",
  "Puerto Rico": "🇵🇷",
  "South Africa": "🇿🇦",
  Thailand: "🇹🇭",
  Vietnam: "🇻🇳",
};

const getCountryFlag = (country: string) => COUNTRY_FLAGS[country] ?? "🌍";

export default function CountryGallery() {
  const [hideTopFolderNav, setHideTopFolderNav] = useState(false);
  const params = useParams<{ region: string; country: string }>();
  const regionSlug = params.region;
  const countrySlug = params.country;

  const { data: album, isLoading, isError } = useAlbum(regionSlug || '', countrySlug || '');
  const { data: allAlbums } = useAlbums();

  const albums = (allAlbums || []).filter((a) => a.region !== "Erasing Borders");
  const countriesInRegion = useMemo(() => {
    const region = album?.region ?? "";
    return albums
      .filter((a) => a.region === region)
      .sort((a, b) => a.country.localeCompare(b.country));
  }, [albums, album?.region]);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const onScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 72) {
        setHideTopFolderNav(false);
      } else if (currentScrollY > lastScrollY + 2) {
        setHideTopFolderNav(true);
      } else if (currentScrollY < lastScrollY - 2) {
        setHideTopFolderNav(false);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!regionSlug || !countrySlug) {
    return <Navigate to="/portfolio" replace />;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Header variant="default" />
        <PageContainer>
          <div className="space-y-4">
            <Skeleton className="h-10 w-32" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-64 w-full" />
              ))}
            </div>
          </div>
        </PageContainer>
      </div>
    );
  }

  if (isError || !album) {
    return <Navigate to="/portfolio" replace />;
  }

  return (
    <div className="min-h-screen">
      <Header variant="default" />
      
      <PageContainer>
        {/* Persistent Region Tabs - minimalist flat design */}
        <div
          className={`sticky top-[48px] md:top-[52px] z-30 -mx-4 px-4 md:mx-0 md:px-0 bg-white/95 dark:bg-neutral-950/95 backdrop-blur-md border-b border-border shadow-sm overflow-hidden transition-[max-height,opacity,transform,margin] duration-300 ease-in-out ${
            hideTopFolderNav
              ? "max-h-0 opacity-0 -translate-y-2 pointer-events-none mb-0 border-transparent shadow-none"
              : "max-h-[320px] opacity-100 translate-y-0 mb-6"
          }`}
        >
          <Tabs value={album.region}>
            <TabsList className="minimalist-tabs-container">
              {/* Link back to All Regions */}
              <TabsTrigger asChild value="All" className="minimalist-tab-trigger">
                <Link to="/portfolio">All</Link>
              </TabsTrigger>
              {Array.from(new Set(albums.map((a) => a.region))).filter((region) => region !== "Erasing Borders").map((region) => (
                <TabsTrigger key={region} asChild value={region} className="minimalist-tab-trigger">
                  <Link to={`/${region.toLowerCase().replace(/[^a-z]/g, "")}`}>{region}</Link>
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Mobile country selector */}
            <div className="lg:hidden overflow-x-auto no-scrollbar whitespace-nowrap px-2 pb-2 md:px-4">
              {countriesInRegion.map((c) => (
                <Link
                  key={c.slug}
                  to={`/${c.region.toLowerCase().replace(/[^a-z]/g, "")}/${c.slug}`}
                  className={`inline-block mr-2 mb-2 px-3 py-1.5 rounded-full text-sm border transition-colors ${
                    c.slug === album.slug ? "bg-accent-neutral text-white border-accent-neutral" : "bg-white dark:bg-neutral-900 text-foreground border-border hover:border-accent-neutral"
                  }`}
                >
                  {c.country}
                </Link>
              ))}
            </div>
          </Tabs>
        </div>

        {/* Desktop edge selector */}
        <aside
          className={`hidden lg:block transition-opacity duration-300 ${
            hideTopFolderNav ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
          aria-label="Country quick selector"
        >
          <div className="fixed left-0 top-28 z-20 max-h-[72vh] overflow-y-auto border-r border-border/70 pr-2 pl-1 py-2">
            <div className="grid grid-cols-1 gap-2">
              <Link
                to="/portfolio"
                className="flex flex-col items-center justify-center rounded-md px-2 py-1.5 border border-transparent bg-transparent text-foreground hover:border-border hover:bg-white/35 dark:hover:bg-neutral-900/45 hover:backdrop-blur-md transition-all duration-200"
              >
                <span className="text-xl leading-none">🌍</span>
                <span className="mt-1 text-[10px] text-center leading-tight">All Countries</span>
              </Link>
              {countriesInRegion.map((c) => {
                const isCurrent = c.slug === album.slug;
                return (
                  <Link
                    key={c.slug}
                    to={`/${c.region.toLowerCase().replace(/[^a-z]/g, "")}/${c.slug}`}
                    className={`flex flex-col items-center justify-center rounded-md px-2 py-1.5 border bg-transparent hover:bg-white/35 dark:hover:bg-neutral-900/45 hover:backdrop-blur-md transition-all duration-200 ${
                      isCurrent
                        ? "text-accent-neutral dark:text-white border-accent-neutral/60"
                        : "text-foreground border-transparent hover:border-border"
                    }`}
                  >
                    <span className="text-xl leading-none">{getCountryFlag(c.country)}</span>
                    <span className="mt-1 text-[10px] text-center leading-tight">{c.country}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </aside>

        <div>
            {/* Back link */}
            <div className="mb-6">
              <Link 
                to={`/${album.region.toLowerCase().replace(/[^a-z]/g, "")}`}
                className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-300"
              >
                <ArrowLeft size={20} className="mr-2" />
                Back to {album.region}
              </Link>
            </div>

            {/* Header */}
            <div className="text-center mb-10">
              <h1 className="text-4xl md:text-5xl font-light mb-4 text-black dark:text-white">{album.country}</h1>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                {album.region} • {album.images.length} photographs
              </p>
            </div>

            {/* Landscape-first masonry gallery with micro-spacing and subtle hover */}
            <Gallery 
              images={album.images} 
              country={album.country} 
              region={album.region}
              enablePrintCta
            />
        </div>
      </PageContainer>

      <FooterStrip />
    </div>
  );
}
