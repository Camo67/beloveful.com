import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
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
    <div className="min-h-screen bg-white">
      <Header variant="default" />
      
      <main className="max-w-screen-xl mx-auto px-4 py-12">
        {/* Navigation */}
        <div className="mb-8">
          <Link 
            to="/portfolio"
            className="inline-flex items-center text-gray-600 hover:text-black transition-colors duration-300"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Portfolio
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-light mb-4">{album.country}</h1>
          <p className="text-lg text-gray-600">
            {album.region} • {album.images.length} photographs
          </p>
        </div>

        {/* Gallery */}
        <Gallery images={album.images} country={album.country} />
      </main>

      <Footer />
    </div>
  );
}