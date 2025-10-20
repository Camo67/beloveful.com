import { Link, Navigate, useParams } from "react-router-dom";
import { Header } from "@/components/Header";
import FooterStrip from "@/components/FooterStrip";
import PageContainer from "@/components/PageContainer";
import { Gallery } from "@/components/Gallery";
import { getProjectBySlug } from "@/lib/data";
import { useErasingBorders } from "@/hooks/use-erasing-borders";

export default function ProjectGallery() {
  const params = useParams<{ project: string }>();
  const projectSlug = params.project;
  const project = projectSlug ? getProjectBySlug(projectSlug) : undefined;

  // Special loader for Erasing Borders (dynamic source)
  const { data: erasingImages, isLoading } = useErasingBorders();

  if (!projectSlug) return <Navigate to="/projects" replace />;
  if (!project) return <Navigate to="/projects" replace />;

  const images = project.slug === 'erasing-borders' && erasingImages && erasingImages.length
    ? erasingImages
    : project.images;

  return (
    <div className="min-h-screen">
      <Header variant="default" />
      <PageContainer>
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-light mb-4 text-black dark:text-white">{project.title}</h1>
          {project.description && (
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">{project.description}</p>
          )}
        </div>

        {isLoading && project.slug === 'erasing-borders' ? (
          <div className="text-center text-gray-600 dark:text-gray-300">Loading project…</div>
        ) : (
          <Gallery images={images} country={project.title} region={"Projects" as any} enablePrintCta />
        )}

        <div className="mt-8 text-center">
          <Link to="/projects" className="underline text-sm text-gray-600 dark:text-gray-300">Back to Projects</Link>
        </div>
      </PageContainer>
      <FooterStrip />
    </div>
  );
}