import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/Header";
import FooterStrip from "@/components/FooterStrip";
import PageContainer from "@/components/PageContainer";
import { Gallery } from "@/components/Gallery";
import { getAlbumBySlug } from "@/lib/data";

export default function CountryGallery() {
  const { country } = useParams<{ country: string }>();
  
  if (!country) {
    return <Navigate to="/portfolio" replace />;
  }

  const album = getAlbumBySlug(country);
  
  if (!album) {
    return <Navigate to="/portfolio" replace />;
  }

  return (
    <div className="min-h-screen">
      <Header variant="default" />
      
      <PageContainer>
        {/* Navigation */}
        <div className="mb-8">
          <Link 
            to="/portfolio"
            className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-300"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Portfolio
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-light mb-4 text-black dark:text-white">{album.country}</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {album.region} • {album.images.length} photographs
          </p>
        </div>

        {/* Erasing Borders Hero Text */}
        {album.slug === "erasing-borders" && (
          <div className="max-w-4xl mx-auto mb-16 px-4">
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

        {/* Gallery */}
        <Gallery images={album.images} country={album.country} />
      </PageContainer>

      <FooterStrip />
    </div>
  );
}
