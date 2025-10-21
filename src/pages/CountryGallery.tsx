import { useMemo } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/Header";
import FooterStrip from "@/components/FooterStrip";
import PageContainer from "@/components/PageContainer";
import { Gallery } from "@/components/Gallery";
import { getAlbumBySlug, getAllAlbumsSorted } from "@/lib/data";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function CountryGallery() {
  const params = useParams<{ country: string }>();
  const countrySlug = params.country;

  const album = countrySlug ? getAlbumBySlug(countrySlug) : undefined;

  const albums = getAllAlbumsSorted().filter((a) => a.region !== "Erasing Borders");
  const countriesInRegion = useMemo(() => {
    const region = album?.region ?? "";
    return albums
      .filter((a) => a.region === region)
      .sort((a, b) => a.country.localeCompare(b.country));
  }, [albums, album?.region]);

  if (!countrySlug) {
    return <Navigate to="/portfolio" replace />;
  }

  if (!album) {
    return <Navigate to="/portfolio" replace />;
  }

  return (
    <div className="min-h-screen">
      <Header variant="default" />
      
      <PageContainer>
        {/* Persistent Region Tabs - minimalist flat design */}
        <div className="sticky top-[48px] md:top-[52px] z-30 -mx-4 px-4 md:mx-0 md:px-0 bg-white/95 dark:bg-neutral-950/95 backdrop-blur-md border-b border-border shadow-sm mb-6 transition-all duration-200">
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
          </Tabs>

          {/* Country pills for current region */}
          <div className="overflow-x-auto no-scrollbar whitespace-nowrap px-2 pb-2 md:px-4">
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
        </div>

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
      </PageContainer>

      <FooterStrip />
    </div>
  );
}
