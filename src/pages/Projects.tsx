import { Header } from "@/components/Header";
import FooterStrip from "@/components/FooterStrip";
import PageContainer from "@/components/PageContainer";
import { Gallery } from "@/components/Gallery";
import { useErasingBorders } from "@/hooks/use-erasing-borders";
import { getAllAlbumsSorted } from "@/lib/data";

export default function Projects() {
  const { data: erasingImages, isLoading: ebLoading } = useErasingBorders();
  
  const allSortedAlbums = getAllAlbumsSorted();
  const erasingBordersAlbum = allSortedAlbums.find((a) => a.slug === 'erasing-borders');

  return (
    <div className="min-h-screen">
      <Header variant="default" />

      <a href="#main-content" className="skip-link">Skip to main content</a>

      <PageContainer>
        <main id="main-content" role="main">
          <div className="text-center mb-6 md:mb-8">
            <h1 className="heading-1 mb-4">Projects</h1>
          </div>

          {/* Erasing Borders Section */}
          {erasingBordersAlbum && (
            <section aria-label="Erasing Borders collection" className="pt-8">
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-light text-center mb-8 text-foreground">
                  Erasing Borders
                </h2>
                <div className="text-center text-gray-800 dark:text-gray-200 leading-relaxed max-w-4xl mx-auto">
                  <p className="text-lg md:text-xl font-light mb-6">
                    Roughly 8 billion human beings are roaming the earth this very moment. Each one of us living varied experiences in different climates, cultures, and environments. Driven by insatiable curiosity & forever fascination with the world; I left being a physician to pursue my passion of travel & photography. Each trip expanded my mind, opened my heart, & I began seeing the world in a different light; becoming part of an ever smaller & more connected world.
                  </p>
                  <p className="text-lg md:text-xl font-light">
                    I aim to bring this connection into focus through the images in this collection. Even though we come from different nations & cultures, we all share one thing: The human condition. Our innate ability to empathize & feel each other's plights & joys is what unites us; Erasing the borders & restrictions of ego, time, & space.
                  </p>
                </div>
              </div>

              {ebLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8" role="status" aria-label="Loading works">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="animate-pulse">
                      <div className="bg-muted aspect-[4/3] mb-4 rounded-lg"></div>
                      <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-muted rounded w-1/2"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <Gallery 
                  images={(erasingImages && erasingImages.length) ? erasingImages : erasingBordersAlbum.images} 
                  country={erasingBordersAlbum.country} 
                  region={erasingBordersAlbum.region} 
                  enablePrintCta 
                />
              )}
            </section>
          )}
        </main>
      </PageContainer>

      <FooterStrip />
    </div>
  );
}
