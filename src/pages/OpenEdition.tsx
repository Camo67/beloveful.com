import { useState, useEffect, useRef } from "react";
import { Header } from "@/components/Header";
import FooterStrip from "@/components/FooterStrip";
import PageContainer from "@/components/PageContainer";
import { SlideshowImage } from "@/lib/data";
import { createProxiedImageUrl } from "@/lib/images";
import { useNavigate } from "react-router-dom";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

// Curated selection of images for Open Edition
const OPEN_EDITION_IMAGES: SlideshowImage[] = [
  // Egypt - Pyramids and desert scenes
  { desktop: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621040/EGY-68_y6bkd2.jpg', mobile: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621040/EGY-68_y6bkd2.jpg' },
  { desktop: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621037/EGY-565-Website-3_ojuwmi.jpg', mobile: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621037/EGY-565-Website-3_ojuwmi.jpg' },
  { desktop: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620954/EGY-61_nxpg46.jpg', mobile: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620954/EGY-61_nxpg46.jpg' },

  // Hong Kong - Urban landscapes
  { desktop: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620680/HK-Unexpected_perspective-6919_zzi74r.jpg', mobile: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620680/HK-Unexpected_perspective-6919_zzi74r.jpg' },
  { desktop: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620678/HK-Pastel_Playground_3-6617_ayxssd.jpg', mobile: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620678/HK-Pastel_Playground_3-6617_ayxssd.jpg' },
  { desktop: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620676/_DSF6933_b9ihxi.jpg', mobile: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620676/_DSF6933_b9ihxi.jpg' },

  // Japan - Traditional and modern
  { desktop: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620805/JAP-03-17-_DSF2819_awss97.jpg', mobile: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620805/JAP-03-17-_DSF2819_awss97.jpg' },
  { desktop: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620804/JAP-3636-03-24-17_m2s1dz.jpg', mobile: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620804/JAP-3636-03-24-17_m2s1dz.jpg' },
  { desktop: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620801/WanderingPaths_x2mcir.jpg', mobile: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620801/WanderingPaths_x2mcir.jpg' },

  // Myanmar - Cultural and landscape
  { desktop: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620829/MYA-9925-04-25-17_edkog3.jpg', mobile: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620829/MYA-9925-04-25-17_edkog3.jpg' },
  { desktop: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620827/MYA-Morning_Catch_gddpsa.jpg', mobile: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620827/MYA-Morning_Catch_gddpsa.jpg' },
  { desktop: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620824/Serendipity_wxoipu.jpg', mobile: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620824/Serendipity_wxoipu.jpg' },

  // India - Vibrant culture
  { desktop: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620711/MadameJodhpur_kxinxc.jpg', mobile: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620711/MadameJodhpur_kxinxc.jpg' },
  { desktop: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620710/DSCF9689-Website-2_pkowsx.jpg', mobile: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620710/DSCF9689-Website-2_pkowsx.jpg' },
  { desktop: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620702/INDTAJ-_eoyvuq.jpg', mobile: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620702/INDTAJ-_eoyvuq.jpg' },

  // Jordan - Desert landscapes
  { desktop: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620598/JOR-10-19-DSCF4604_rv8ibh.jpg', mobile: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620598/JOR-10-19-DSCF4604_rv8ibh.jpg' },
  { desktop: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620597/JOR-10-19-DSCF4602_vkmhxu.jpg', mobile: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620597/JOR-10-19-DSCF4602_vkmhxu.jpg' },

  // Argentina - Patagonia
  { desktop: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620954/_DSF6993_copy_ez4ele.jpg', mobile: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620954/_DSF6993_copy_ez4ele.jpg' },
  { desktop: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620953/ARG-_DSF6915_x7lhsa.jpg', mobile: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620953/ARG-_DSF6915_x7lhsa.jpg' },

  // Italy - Architecture and landscapes
  { desktop: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395887/ITA-06-19-DSCF7678_fx2ick.jpg', mobile: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395887/ITA-06-19-DSCF7678_fx2ick.jpg' },
  { desktop: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395880/ITA-06-19-DSCF6993_iebkie.jpg', mobile: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395880/ITA-06-19-DSCF6993_iebkie.jpg' },
  { desktop: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395877/ITA-06-19-DSCF5753_jtqvpi.jpg', mobile: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395877/ITA-06-19-DSCF5753_jtqvpi.jpg' },

  // Philippines - Tropical paradise
  { desktop: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620861/DSCF1066_dlp2l5.jpg', mobile: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620861/DSCF1066_dlp2l5.jpg' },
  { desktop: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620860/DSCF0146_i2balz.jpg', mobile: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620860/DSCF0146_i2balz.jpg' },

  // Vietnam - Street life and culture
  { desktop: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620878/VIET-04-17-DSCF9132_xehdbe.jpg', mobile: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620878/VIET-04-17-DSCF9132_xehdbe.jpg' },
  { desktop: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620878/VIET-Chaos_dklvgp.jpg', mobile: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620878/VIET-Chaos_dklvgp.jpg' },

  // Thailand - Temples and culture
  { desktop: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620843/THAI-12-19-DSCF2334_jk2cwl.jpg', mobile: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620843/THAI-12-19-DSCF2334_jk2cwl.jpg' },
  { desktop: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620842/THAI-12-19-DSCF2314_fv0p7m.jpg', mobile: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620842/THAI-12-19-DSCF2314_fv0p7m.jpg' },

  // Nepal - Mountains
  { desktop: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620832/NEP-8794_gv7u6z.jpg', mobile: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620832/NEP-8794_gv7u6z.jpg' },
  { desktop: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620828/NEP-Silent_Stare_zde6db.jpg', mobile: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620828/NEP-Silent_Stare_zde6db.jpg' },
];

interface OpenEditionLightboxProps {
  images: SlideshowImage[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

function OpenEditionLightbox({ images, currentIndex, onClose, onNavigate }: OpenEditionLightboxProps) {
  const currentImage = images[currentIndex];

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          if (currentIndex > 0) {
            onNavigate(currentIndex - 1);
          }
          break;
        case "ArrowRight":
          if (currentIndex < images.length - 1) {
            onNavigate(currentIndex + 1);
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
      document.body.style.overflow = "auto";
    };
  }, [currentIndex, images.length, onClose, onNavigate]);

  const extractImageNumber = (url: string) => {
    const parts = url.split('/');
    const filename = parts[parts.length - 1];
    const nameWithoutExtension = filename.split('.')[0];
    
    // Try to extract country prefix and number (e.g., "EGY-68" -> "Egypt-1")
    const match = nameWithoutExtension.match(/^([A-Z]{2,4})-(.+)$/);
    if (match) {
      const [, countryCode, number] = match;
      const countryMap: { [key: string]: string } = {
        'EGY': 'Egypt',
        'HK': 'Hong Kong',
        'JAP': 'Japan',
        'MYA': 'Myanmar',
        'IND': 'India',
        'JOR': 'Jordan',
        'ARG': 'Argentina',
        'ITA': 'Italy',
        'PHI': 'Philippines',
        'VIET': 'Vietnam',
        'THAI': 'Thailand',
        'NEP': 'Nepal'
      };
      
      const country = countryMap[countryCode] || countryCode;
      return `${country}-${currentIndex + 1}`;
    }
    
    // Fallback to just the image index
    return `Open Edition-${currentIndex + 1}`;
  };

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        {/* Close button */}
        <button
          onClick={onClose}
          className="fixed top-4 right-4 z-50 p-2 text-white bg-black bg-opacity-50 rounded-full transition-opacity duration-300 hover:bg-opacity-70"
          aria-label="Close lightbox"
        >
          <X size={24} />
        </button>

        {/* Fixed navigation arrows */}
        {currentIndex > 0 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNavigate(currentIndex - 1);
            }}
            className="fixed left-4 top-1/2 transform -translate-y-1/2 z-50 p-2 text-white bg-black bg-opacity-50 rounded-full transition-opacity duration-300 hover:bg-opacity-70"
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </button>
        )}

        {currentIndex < images.length - 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNavigate(currentIndex + 1);
            }}
            className="fixed right-4 top-1/2 transform -translate-y-1/2 z-50 p-2 text-white bg-black bg-opacity-50 rounded-full transition-opacity duration-300 hover:bg-opacity-70"
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </button>
        )}

        {/* Image */}
        <div className="relative max-w-full max-h-full">
          <img
            src={createProxiedImageUrl(currentImage.desktop)}
            alt={`Open Edition print ${currentIndex + 1}`}
            className="max-w-full max-h-screen object-contain image-protected"
            draggable={false}
            onContextMenu={(e) => e.preventDefault()}
          />
          
          {/* Image identifier in corner */}
          <div className="absolute bottom-4 left-4 p-2 bg-black bg-opacity-70 text-white text-sm rounded">
            {extractImageNumber(currentImage.desktop)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OpenEdition() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [visibleImages, setVisibleImages] = useState<Set<number>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleImages(prev => new Set(prev).add(index));
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  const handleImageLoad = (index: number, element: HTMLDivElement) => {
    if (observerRef.current) {
      observerRef.current.observe(element);
    }
  };

  const handlePrintRequest = (index: number) => {
    const image = OPEN_EDITION_IMAGES[index];
    const imageNumber = index + 1;
    
    // Navigate to contact with image parameters
    const params = new URLSearchParams({
      image: encodeURIComponent(image.desktop),
      source: 'open-edition',
      variant: `open-edition-${imageNumber}`
    });
    
    navigate(`/contact?${params.toString()}`);
  };

  const extractImageNumber = (index: number) => {
    return index + 1;
  };

  return (
    <div className="min-h-screen">
      <Header variant="default" />
      
      <PageContainer>
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-light mb-4 text-black dark:text-white">Open Edition</h1>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl">
            A carefully curated selection of travel photography prints available for purchase. 
            Each image captures a unique moment from my journeys around the world.
          </p>
        </div>

        <div className="gallery-grid">
          {OPEN_EDITION_IMAGES.map((image, index) => (
            <div key={index} className="group relative">
              {/* Image number - hidden on small screens, small on md+ */}
              <div className="hidden md:block absolute -top-6 left-0 text-xs text-neutral-500 dark:text-neutral-400 z-10">
                #{extractImageNumber(index)}
              </div>
              
              <div
                className="relative cursor-pointer bg-gray-100 dark:bg-neutral-800"
                style={{ aspectRatio: '4/3' }}
                data-index={index}
                ref={(el) => el && handleImageLoad(index, el)}
                onClick={() => setLightboxIndex(index)}
                onContextMenu={(e) => e.preventDefault()}
              >
                {visibleImages.has(index) && (
                  <>
                    <img
                      src={createProxiedImageUrl(image.desktop)}
                      alt={`Open Edition print ${index + 1}`}
                      className="w-full h-full object-cover image-protected transition-transform duration-500 group-hover:scale-105"
                      draggable={false}
                      loading="lazy"
                    />
                    <div className="image-overlay" />
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                  </>
                )}
              </div>

              {/* CTA Button */}
              <div className="mt-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrintRequest(index);
                  }}
                  className="w-full px-4 py-2 text-sm border border-neutral-300 dark:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors duration-200 rounded"
                >
                  Would you like this image as a print?
                </button>
              </div>
            </div>
          ))}
        </div>

        {lightboxIndex !== null && (
          <OpenEditionLightbox
            images={OPEN_EDITION_IMAGES}
            currentIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onNavigate={setLightboxIndex}
          />
        )}
      </PageContainer>

      <FooterStrip />
    </div>
  );
}
