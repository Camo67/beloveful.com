import { Header } from "@/components/Header";
import FooterStrip from "@/components/FooterStrip";
import PageContainer from "@/components/PageContainer";
import { useErasingBorders } from "@/hooks/use-erasing-borders";
import ImageGrid from '@/components/ImageGrid';
import { Link } from "react-router-dom";

export default function Projects() {
  // Standalone Projects page focused on the "Erasing Borders" project
  const { data: erasingImages, isLoading: ebLoading } = useErasingBorders();

  return (
    <div className="min-h-screen">
      <Header variant="default" />
      <a href="#main-content" className="skip-link">Skip to main content</a>

      <PageContainer>
        <main id="main-content" role="main">
          {/* Hero */}
          <section className="text-center py-20">
            <h1 className="heading-1 mb-4">Erasing Borders</h1>
            <p className="max-w-3xl mx-auto text-lg text-muted-foreground leading-relaxed">
              Roughly 8 billion human beings are roaming the earth this very moment. I aim to bring this connection into focus through the images in this collection, celebrating the shared humanity that transcends geographical and cultural boundaries.
            </p>
            <div className="mt-6">
              <Link
                to="/projects/erasing-borders"
                className="inline-flex items-center px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-medium rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
              >
                View Full Project →
              </Link>
            </div>
          </section>

          {/* Featured images preview */}
          <section className="mb-12">
            <div className="max-w-6xl mx-auto">
              {ebLoading ? (
                <div className="text-center py-8">Loading images...</div>
              ) : erasingImages && erasingImages.length > 0 ? (
                <>
                  <ImageGrid images={erasingImages.slice(0, 12)} maxColumns={4} gap={16} />
                  {erasingImages.length > 12 && (
                    <div className="text-center mt-4 text-muted-foreground">
                      Showing 12 of {erasingImages.length} images
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No images available for this project
                </div>
              )}
            </div>
          </section>

        </main>
      </PageContainer>

      <FooterStrip />
    </div>
  );
}