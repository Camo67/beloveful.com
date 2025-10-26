import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { Header } from "@/components/Header";
import FooterStrip from "@/components/FooterStrip";
import PageContainer from "@/components/PageContainer";
import { Gallery } from "@/components/Gallery";
import { getProjectBySlug } from "@/lib/data";
import { useErasingBorders } from "@/hooks/use-erasing-borders";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";

export default function ProjectGallery() {
  const { project: projectSlug } = useParams<{ project: string }>();
  const { data: erasingImages, isLoading } = useErasingBorders();

  const project = projectSlug ? getProjectBySlug(projectSlug) : undefined;

  // If it's not the erasing-borders project, redirect to projects page
  const isValidProject = projectSlug === "erasing-borders";

  const galleryImages = useMemo(() => {
    if (projectSlug === "erasing-borders" && erasingImages) {
      return erasingImages.map(img => ({
        desktop: img.desktop,
        mobile: img.mobile
      }));
    }
    return [];
  }, [projectSlug, erasingImages]);

  if (!isValidProject) {
    // Redirect to projects page if not a valid project
    window.location.href = "/projects";
    return null;
  }

  return (
    <div className="min-h-screen">
      <Header variant="default" />
      
      <PageContainer>
        {/* Navigation */}
        <div className="sticky top-[48px] md:top-[52px] z-30 -mx-4 px-4 md:mx-0 md:px-0 bg-white/95 dark:bg-neutral-950/95 backdrop-blur-md border-b border-border shadow-sm mb-6 transition-all duration-200">
          <Tabs value="erasing-borders">
            <TabsList className="minimalist-tabs-container">
              <TabsTrigger asChild value="projects" className="minimalist-tab-trigger">
                <Link to="/projects">All Projects</Link>
              </TabsTrigger>
              <TabsTrigger value="erasing-borders" className="minimalist-tab-trigger" disabled>
                Erasing Borders
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-light mb-4 text-black dark:text-white">Erasing Borders</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A humanist photography project connecting experiences across borders. 
            {galleryImages.length > 0 && ` ${galleryImages.length} photographs.`}
          </p>
          <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Roughly 8 billion human beings are roaming the earth this very moment. I aim to bring this connection into focus through the images in this collection, celebrating the shared humanity that transcends geographical and cultural boundaries.
          </p>
        </div>

        {/* Gallery */}
        {isLoading ? (
          <div className="text-center py-12">
            <p>Loading images...</p>
          </div>
        ) : galleryImages.length > 0 ? (
          <Gallery 
            images={galleryImages} 
            country="Erasing Borders" 
            enablePrintCta
          />
        ) : (
          <div className="text-center py-12 text-gray-500">
            <p>No images available for this project.</p>
          </div>
        )}
      </PageContainer>

      <FooterStrip />
    </div>
  );
}