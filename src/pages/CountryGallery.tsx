import { useMemo } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/Header";
import FooterStrip from "@/components/FooterStrip";
import PageContainer from "@/components/PageContainer";
import { Gallery } from "@/components/Gallery";
import { getAlbumBySlug, getAllAlbumsSorted } from "@/lib/data";
import { useErasingBorders } from "@/hooks/use-erasing-borders";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function CountryGallery() {
  const params = useParams<{ country: string }>();
  const countrySlug = params.country;

  const album = countrySlug ? getAlbumBySlug(countrySlug) : undefined;
  const { data: erasingImages } = useErasingBorders();

  const albums = getAllAlbumsSorted().filter((a) => a.region !== "Logo");
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
        <div className="sticky top-[56px] md:top-[64px] z-30 -mx-4 px-4 md:mx-0 md:px-0 bg-white/90 dark:bg-neutral-950/95 backdrop-blur border-b border-border mb-6">
          <Tabs value={album.region}>
            <TabsList className="minimalist-tabs-container">
              {/* Link back to All on Portfolio */}
              <TabsTrigger asChild value="All" className="minimalist-tab-trigger">
                <Link to="/portfolio">All</Link>
              </TabsTrigger>
              {Array.from(new Set(albums.map((a) => a.region))).map((region) => (
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
            to="/portfolio"
            className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-300"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Portfolio
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-light mb-4 text-black dark:text-white">{album.country}</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {album.region} • {(album.slug === 'erasing-borders' ? (erasingImages?.length || 0) : album.images.length)} photographs
          </p>
        </div>

        {/* Erasing Borders Hero Text */}
        {album.slug === "erasing-borders" && (
          <div className="max-w-4xl mx-auto mb-12 px-4">
            <div className="text-center text-gray-800 dark:text-gray-200 leading-relaxed">
              <p className="text-lg md:text-xl font-light mb-6">
                Roughly 8 billion human beings are roaming the earth this very moment. Each one of us living varied experiences in different climates, cultures, and environments. Driven by insatiable curiosity & forever fascination with the world; I left being a physician to pursue my passion of travel & photography. Each trip expanded my mind, opened my heart, & I began seeing the world in a different light; becoming part of an ever smaller & more connected world.
              </p>
              <p className="text-lg md:text-xl font-light">
                I aim to bring this connection into focus through the images in this collection. Even though we come from different nations & cultures, we all share one thing: The human condition. Our innate ability to empathize & feel each other's plights & joys is what unites us; Erasing the borders & restrictions of ego, time, & space.
              </p>
            </div>
          </div>
        )}

        {/* Landscape-first masonry gallery with micro-spacing and subtle hover */}
        <Gallery 
          images={album.slug === 'erasing-borders' && erasingImages ? erasingImages : album.images} 
          country={album.country} 
          region={album.region}
          enablePrintCta
        />
      </PageContainer>

      <FooterStrip />
    </div>
  );
}
