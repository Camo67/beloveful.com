import { Header } from "@/components/Header";
import FooterStrip from "@/components/FooterStrip";
import PageContainer from "@/components/PageContainer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useWorkshopImages } from "@/hooks/use-workshop-images";
import { CORE_WORKSHOP_TOPICS } from "@/lib/workshop-content";
import { CloudImage } from "@/components/CloudImage";

export default function WorkshopChicagoPrivate() {
  const heroImage = {
    src: "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760979008/home/camo/new/beloveful.com/public/Website%20beloveful.com/Workshop%20Photos/Copy%20of%20CHI-359.jpg",
    alt: "1:1 Street Photography Workshop Chicago"
  };

  const { data } = useWorkshopImages();

  return (
    <div className="min-h-screen">
      <Header variant="default" />
      
      <PageContainer className="max-w-5xl pt-8">
        <Link to="/workshops">
          <Button variant="ghost" className="mb-4 -ml-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Workshops
          </Button>
        </Link>
      </PageContainer>

      {/* Hero Section */}
      <section className="relative h-96 md:h-[500px] overflow-hidden">
        <CloudImage
          url={heroImage.src}
          alt={heroImage.alt}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-6 max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Private Chicago Workshop
            </h1>
            <p className="text-xl md:text-2xl opacity-95 leading-relaxed">
              Slow down, observe, and rediscover the beauty in everyday life.
            </p>
          </div>
        </div>
      </section>

      <PageContainer className="max-w-4xl">
        <section className="py-20">
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p className="text-lg leading-relaxed mb-6">
              Planning a trip to Chicago? Already live here? This private workshop is tailored to your pace and curiosity. We map a route through neighborhoods that inspire you and focus on the way you anticipate, compose, and tell stories in the streets.
            </p>

            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-8 mb-8 border border-gray-100 dark:border-gray-800">
              <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-4">The workshop will include:</h2>
              <ul className="space-y-3 text-lg text-gray-700 dark:text-gray-300">
                {CORE_WORKSHOP_TOPICS.map((topic) => (
                  <li key={topic}>• {topic}</li>
                ))}
              </ul>
            </div>

            <p className="text-lg leading-relaxed font-medium text-gray-900 dark:text-white mb-8">
              Expect in-the-field coaching, workflow and editing guidance, and a professional critique after shooting so you can apply every insight immediately.
            </p>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-8 border border-gray-200 dark:border-gray-700">
              <div className="text-xl font-semibold text-gray-900 dark:text-white">
                Duration: 3 hours (extendable)
              </div>
            </div>

            {/* Workshop Images Gallery */}
            {data?.chicagoPrivate && data.chicagoPrivate.length > 1 && (
              <div className="my-16">
                <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-8 text-center">
                  Workshop Gallery
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {data.chicagoPrivate.slice(0, 4).map((image, index) => (
                    <div key={index} className="rounded-lg overflow-hidden shadow-lg">
                      <CloudImage
                        url={image.src}
                        alt={image.alt}
                        className="w-full h-64 object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-8 border border-blue-100 dark:border-blue-900/50">
              <h2 className="text-2xl font-semibold text-blue-900 dark:text-blue-100 mb-4">
                Customized for You
              </h2>
              <p className="text-lg text-blue-800 dark:text-blue-200 leading-relaxed">
                This private session adapts to your skill level and interests. Whether you're working on a personal project or want to improve specific techniques, we'll focus on what matters most to your growth as a photographer.
              </p>
            </div>

            <div className="text-center">
              <Button asChild size="lg" className="text-lg px-12 py-6">
                <a
                  href="https://lb.benchmarkemail.com//listbuilder/signupnew?IkfHTmyPVq92wBnn4lX%252FTf5pwVnAjsSIeL8KRSOgMpXtO5iNRn8gS049TyW7spdJ"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Enroll Now
                </a>
              </Button>
            </div>
          </div>
        </section>
      </PageContainer>

      <FooterStrip />
    </div>
  );
}