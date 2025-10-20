import { useState, useEffect, useRef } from "react";
import { Header } from "@/components/Header";
import FooterStrip from "@/components/FooterStrip";
import PageContainer from "@/components/PageContainer";
import { SlideshowImage } from "@/lib/data";
import { createProxiedImageUrl } from "@/lib/images";
import { useNavigate } from "react-router-dom";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

// Open Edition 5x7 prints from local directory
const OPEN_EDITION_IMAGES: SlideshowImage[] = [
  {
    desktop: "/Website beloveful.com/Open Edition size 5x7/Open Edition 5x7/5x7-Caretaker.jpg",
    mobile: "/Website beloveful.com/Open Edition size 5x7/Open Edition 5x7/5x7-Caretaker.jpg"
  },
  {
    desktop: "/Website beloveful.com/Open Edition size 5x7/Open Edition 5x7/5x7s-03.jpg",
    mobile: "/Website beloveful.com/Open Edition size 5x7/Open Edition 5x7/5x7s-03.jpg"
  },
  {
    desktop: "/Website beloveful.com/Open Edition size 5x7/Open Edition 5x7/5x7s-07.jpg",
    mobile: "/Website beloveful.com/Open Edition size 5x7/Open Edition 5x7/5x7s-07.jpg"
  },
  {
    desktop: "/Website beloveful.com/Open Edition size 5x7/Open Edition 5x7/5x7s-19.jpg",
    mobile: "/Website beloveful.com/Open Edition size 5x7/Open Edition 5x7/5x7s-19.jpg"
  },
  {
    desktop: "/Website beloveful.com/Open Edition size 5x7/Open Edition 5x7/5x7s-26.jpg",
    mobile: "/Website beloveful.com/Open Edition size 5x7/Open Edition 5x7/5x7s-26.jpg"
  },
  {
    desktop: "/Website beloveful.com/Open Edition size 5x7/Open Edition 5x7/5x7s-27.jpg",
    mobile: "/Website beloveful.com/Open Edition size 5x7/Open Edition 5x7/5x7s-27.jpg"
  },
  {
    desktop: "/Website beloveful.com/Open Edition size 5x7/Open Edition 5x7/5x7s-29.jpg",
    mobile: "/Website beloveful.com/Open Edition size 5x7/Open Edition 5x7/5x7s-29.jpg"
  },
  {
    desktop: "/Website beloveful.com/Open Edition size 5x7/Open Edition 5x7/5x7s-Ascension.jpg",
    mobile: "/Website beloveful.com/Open Edition size 5x7/Open Edition 5x7/5x7s-Ascension.jpg"
  },
  {
    desktop: "/Website beloveful.com/Open Edition size 5x7/Open Edition 5x7/5x7s-Family Meal.jpg",
    mobile: "/Website beloveful.com/Open Edition size 5x7/Open Edition 5x7/5x7s-Family Meal.jpg"
  },
  {
    desktop: "/Website beloveful.com/Open Edition size 5x7/Open Edition 5x7/5x7s-Hide N Seek.jpg",
    mobile: "/Website beloveful.com/Open Edition size 5x7/Open Edition 5x7/5x7s-Hide N Seek.jpg"
  },
  {
    desktop: "/Website beloveful.com/Open Edition size 5x7/Open Edition 5x7/5x7s-Into the Rabbit Hole.jpg",
    mobile: "/Website beloveful.com/Open Edition size 5x7/Open Edition 5x7/5x7s-Into the Rabbit Hole.jpg"
  },
  {
    desktop: "/Website beloveful.com/Open Edition size 5x7/Open Edition 5x7/5x7s Life_s a Highway.jpg",
    mobile: "/Website beloveful.com/Open Edition size 5x7/Open Edition 5x7/5x7s Life_s a Highway.jpg"
  },
  {
    desktop: "/Website beloveful.com/Open Edition size 5x7/Open Edition 5x7/5x7s-Long Day.jpg",
    mobile: "/Website beloveful.com/Open Edition size 5x7/Open Edition 5x7/5x7s-Long Day.jpg"
  },
  {
    desktop: "/Website beloveful.com/Open Edition size 5x7/Open Edition 5x7/5x7s-Mag Mile.jpg",
    mobile: "/Website beloveful.com/Open Edition size 5x7/Open Edition 5x7/5x7s-Mag Mile.jpg"
  },
  {
    desktop: "/Website beloveful.com/Open Edition size 5x7/Open Edition 5x7/5x7s-Serendipity.jpg",
    mobile: "/Website beloveful.com/Open Edition size 5x7/Open Edition 5x7/5x7s-Serendipity.jpg"
  },
  {
    desktop: "/Website beloveful.com/Open Edition size 5x7/Open Edition 5x7/5x7s-Shapes & Shadows.jpg",
    mobile: "/Website beloveful.com/Open Edition size 5x7/Open Edition 5x7/5x7s-Shapes & Shadows.jpg"
  },
  {
    desktop: "/Website beloveful.com/Open Edition size 5x7/Open Edition 5x7/5x7s-Textures.jpg",
    mobile: "/Website beloveful.com/Open Edition size 5x7/Open Edition 5x7/5x7s-Textures.jpg"
  },
  {
    desktop: "/Website beloveful.com/Open Edition size 5x7/Open Edition 5x7/5x7s-Tranquility.jpg",
    mobile: "/Website beloveful.com/Open Edition size 5x7/Open Edition 5x7/5x7s-Tranquility.jpg"
  },
  {
    desktop: "/Website beloveful.com/Open Edition size 5x7/Open Edition 5x7/5x7s-Ville de Lamour.jpg",
    mobile: "/Website beloveful.com/Open Edition size 5x7/Open Edition 5x7/5x7s-Ville de Lamour.jpg"
  },
  {
    desktop: "/Website beloveful.com/Open Edition size 5x7/Open Edition 5x7/Between The Lines 5x7.jpg",
    mobile: "/Website beloveful.com/Open Edition size 5x7/Open Edition 5x7/Between The Lines 5x7.jpg"
  },
  {
    desktop: "/Website beloveful.com/Open Edition size 5x7/Open Edition 5x7/NY Slice 5x7.jpg",
    mobile: "/Website beloveful.com/Open Edition size 5x7/Open Edition 5x7/NY Slice 5x7.jpg"
  },
  {
    desktop: "/Website beloveful.com/Open Edition size 5x7/Open Edition 5x7/Pressed 5x7.jpg",
    mobile: "/Website beloveful.com/Open Edition size 5x7/Open Edition 5x7/Pressed 5x7.jpg"
  },
  {
    desktop: "/Website beloveful.com/Open Edition size 5x7/Open Edition 5x7/She Waited 5x7.jpg",
    mobile: "/Website beloveful.com/Open Edition size 5x7/Open Edition 5x7/She Waited 5x7.jpg"
  },
  {
    desktop: "/Website beloveful.com/Open Edition size 5x7/Open Edition 5x7/Shy or Shame 5x7.jpg",
    mobile: "/Website beloveful.com/Open Edition size 5x7/Open Edition 5x7/Shy or Shame 5x7.jpg"
  },
  {
    desktop: "/Website beloveful.com/Open Edition size 5x7/Open Edition 5x7/snack time 5x7.jpg",
    mobile: "/Website beloveful.com/Open Edition size 5x7/Open Edition 5x7/snack time 5x7.jpg"
  },
  {
    desktop: "/Website beloveful.com/Open Edition size 5x7/Open Edition 5x7/Sun Maiden 5x7.jpg",
    mobile: "/Website beloveful.com/Open Edition size 5x7/Open Edition 5x7/Sun Maiden 5x7.jpg"
  },
  {
    desktop: "/Website beloveful.com/Open Edition size 5x7/Open Edition 5x7/Towel-Head 5x7.jpg",
    mobile: "/Website beloveful.com/Open Edition size 5x7/Open Edition 5x7/Towel-Head 5x7.jpg"
  },
  {
    desktop: "/Website beloveful.com/Open Edition size 5x7/Open Edition 5x7/Violet Canine 5x7.jpg",
    mobile: "/Website beloveful.com/Open Edition size 5x7/Open Edition 5x7/Violet Canine 5x7.jpg"
  }
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
        <div className="flex flex-col items-center justify-center mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-light mb-4 text-black dark:text-white">Open Edition</h1>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mb-6">
            A carefully curated selection of travel photography prints available for purchase. 
            Each image captures a unique moment from my journeys around the world.
          </p>
          
          {/* Pricing Section */}
          <div className="bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4 text-black dark:text-white text-center">5x7 Print Pricing</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-neutral-700 dark:text-neutral-300">1 Print</span>
                <span className="font-semibold text-black dark:text-white">$10</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-neutral-700 dark:text-neutral-300">4 Prints</span>
                <span className="font-semibold text-black dark:text-white">$35 <span className="text-sm text-neutral-500 dark:text-neutral-400">(Save $5)</span></span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-neutral-700 dark:text-neutral-300">8 Prints</span>
                <span className="font-semibold text-black dark:text-white">$70 <span className="text-sm text-neutral-500 dark:text-neutral-400">(Save $10)</span></span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-full px-4">
          {OPEN_EDITION_IMAGES.map((image, index) => (
            <div key={index} className="group relative">
              {/* Image number - hidden on small screens, small on md+ */}
              <div className="hidden md:block absolute -top-6 left-0 text-xs text-neutral-500 dark:text-neutral-400 z-10">
                #{extractImageNumber(index)}
              </div>
              
              <div
                className="relative cursor-pointer bg-gray-100 dark:bg-neutral-800"
                style={{ aspectRatio: '5/7' }}
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
              <div className="mt-3 text-center">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrintRequest(index);
                  }}
                  className="w-full px-3 py-2 text-xs border border-neutral-300 dark:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors duration-200 rounded"
                >
                  Order this print →
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
