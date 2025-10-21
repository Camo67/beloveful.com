import React from "react";
import { useImages } from "@/hooks/useImages";
import { createProxiedImageUrl } from "@/lib/images";

// Define interface for images
interface ImageItem {
  url: string;
  ref: string;
}

// The components below fetch arrays from API endpoints so the images are
// served from server endpoints rather than embedded in client bundles.
// Each endpoint returns a JSON array of image URLs (strings).

// Render Travel Portfolio
export const TravelPortfolio: React.FC = () => {
  const { data: travel = [], loading } = useImages('/api/travel-images');
  if (loading) return <div>Loading travel images…</div>;
  return (
    <div className="travel-gallery">
      {travel.map((url: string, idx: number) => (
        <img
          key={url + idx}
          src={createProxiedImageUrl(url)}
          alt={`travel-${idx}`}
          loading="lazy"
          className="portfolio-image"
        />
      ))}
    </div>
  );
};

// Render Projects
export const ProjectsSection: React.FC = () => {
  const { data: projects = [], loading } = useImages('/api/project-images');
  if (loading) return <div>Loading projects…</div>;
  return (
    <div className="project-gallery">
      {projects.map((url: string, idx: number) => (
        <div key={url + idx} className="project-card">
          <img src={createProxiedImageUrl(url)} alt={`project-${idx}`} loading="lazy" />
          <p>{`Project ${idx + 1}`}</p>
        </div>
      ))}
    </div>
  );
};

// Render Logos
export const LogosSection: React.FC = () => {
  const { data: logos = [], loading } = useImages('/api/logos');
  if (loading) return <div>Loading logos…</div>;
  return (
    <div className="logo-grid">
      {logos.map((url: string, idx: number) => (
        <img key={url + idx} src={createProxiedImageUrl(url)} alt={`logo-${idx}`} loading="lazy" className="logo-image" />
      ))}
    </div>
  );
};

export default TravelPortfolio;
