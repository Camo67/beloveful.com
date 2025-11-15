import { Header } from "@/components/Header";
import FooterStrip from "@/components/FooterStrip";
import PageContainer from "@/components/PageContainer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useWorkshopImages } from "@/hooks/use-workshop-images";
import { CORE_WORKSHOP_TOPICS } from "@/lib/workshop-content";
import { CloudImage } from "@/components/CloudImage";

export default function WorkshopChicagoGroup() {
  const heroImage = {
    src: "/Website%20beloveful.com/Erasing%20Borders/Tony%20Menias%20-%20Two%20Girls%20in%20Window.jpg",
    alt: "Group Street Photography Workshop Chicago"
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
              Group Chicago Workshop
            </h1>
            <p className="text-xl md:text-2xl opacity-95 leading-relaxed">
              See Chicago differently alongside other photographers.
            </p>
          </div>
        </div>
      </section>

      <PageContainer className="max-w-4xl">
        <section className="py-20">
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p className="text-lg leading-relaxed mb-8">
              This small-group experience blends hands-on street shooting with guided critiques. Learn from the energy of Chicago, the observations of your peers, and the coaching you receive in real time.
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
              We close with a collaborative critique so you can see how others interpret the same city blocks—and sharpen your own visual instincts in the process.
            </p>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-8 border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Workshop Details
              </h3>
              <div className="grid md:grid-cols-2 gap-4 text-gray-700 dark:text-gray-300">
                <div><strong>Duration:</strong> 4 hours</div>
                <div><strong>Group Size:</strong> Maximum 6 participants</div>
                <div><strong>Location:</strong> Chicago</div>
                <div><strong>Skill Level:</strong> All levels welcome</div>
              </div>
            </div>

            {/* Workshop Images Gallery */}
            {data?.chicagoGroup && data.chicagoGroup.length > 1 && (
              <div className="my-16">
                <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-8 text-center">
                  Workshop Gallery
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {data.chicagoGroup.slice(0, 4).map((image, index) => (
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

            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-8 border border-green-100 dark:border-green-900/50">
              <h2 className="text-2xl font-semibold text-green-900 dark:text-green-100 mb-4">
                Why Group Learning Works
              </h2>
              <p className="text-lg text-green-800 dark:text-green-200 leading-relaxed">
                In a small group, you'll not only receive direct feedback but also learn from how others approach the same scenes. This collaborative environment often leads to breakthrough moments that wouldn't happen in isolation.
              </p>
            </div>

            <div className="text-center">
              <Button asChild size="lg" className="text-lg px-12 py-6">
                <a
                  href="https://lb.benchmarkemail.com//listbuilder/signupnew?IkfHTmyPVq92wBnn4lX%252FTf5pwVnAjsSIeL8KRSOgMpXtO5iNRn8gS049TyW7spdJ"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Enroll in Group Workshop
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
