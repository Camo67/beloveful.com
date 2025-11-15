import { Header } from "@/components/Header";
import FooterStrip from "@/components/FooterStrip";
import PageContainer from "@/components/PageContainer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useWorkshopImages } from "@/hooks/use-workshop-images";
import { CORE_WORKSHOP_TOPICS } from "@/lib/workshop-content";

export default function WorkshopOnline() {
  const heroImage = {
    src: "/Website%20beloveful.com/Erasing%20Borders/NyC-DSCF8922%20copy%202.jpg",
    alt: "Online Street Photography Workshop"
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
        <img
          src={heroImage.src}
          alt={heroImage.alt}
          className="w-full h-full object-cover"
          draggable={false}
          onContextMenu={(e) => e.preventDefault()}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-6 max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Online Group Workshops
            </h1>
            <p className="text-xl md:text-2xl opacity-95 leading-relaxed">
              Learn to see the world differently from wherever you are.
            </p>
          </div>
        </div>
      </section>

      <PageContainer className="max-w-4xl">
        <section className="py-20">
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p className="text-lg leading-relaxed mb-6">
              This online workshop brings the experience of street photography directly to you, wherever you are. Through live video sessions, assignments, and personalized feedback, you'll learn how to notice more deeply, compose intentionally, and tell visual stories that resonate.
            </p>
            
            <p className="text-lg leading-relaxed font-medium text-gray-900 dark:text-white mb-8">
              The goal isn't just to take better photos; it's to strengthen your awareness, your eye, and your connection to the world around you.
            </p>

            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-8 mb-8 border border-gray-100 dark:border-gray-800">
              <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-4">The workshop will include:</h2>
              <ul className="space-y-3 text-lg text-gray-700 dark:text-gray-300">
                {CORE_WORKSHOP_TOPICS.map((topic) => (
                  <li key={topic}>• {topic}</li>
                ))}
              </ul>
            </div>

            <p className="text-lg leading-relaxed mb-8">
              This course is perfect for anyone who wants to refine their craft and develop a consistent creative practice—without needing to travel.
            </p>

            <p className="text-lg leading-relaxed font-medium text-gray-900 dark:text-white mb-8">
              Learn from anywhere. Create with intention. See the extraordinary in the everyday.
            </p>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-8 border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Workshop Details
              </h3>
              <div className="grid md:grid-cols-2 gap-4 text-gray-700 dark:text-gray-300">
                <div><strong>Format:</strong> Live virtual sessions</div>
                <div><strong>Duration:</strong> 4-6 weeks</div>
                <div><strong>Schedule:</strong> Flexible timing</div>
                <div><strong>Skill Level:</strong> All levels welcome</div>
              </div>
            </div>

            {/* Workshop Images Gallery */}
            {data?.online && data.online.length > 1 && (
              <div className="my-16">
                <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">
                  Workshop Experience
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {data.online.slice(1, 5).map((img, idx) => (
                    <div key={idx} className="aspect-[4/3] overflow-hidden rounded-lg">
                      <img
                        src={img.desktop}
                        alt={img.alt}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        draggable={false}
                        onContextMenu={(e) => e.preventDefault()}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="text-center">
              <Button asChild size="lg" className="text-lg px-12 py-6">
                <a
                  href="https://lb.benchmarkemail.com//listbuilder/signupnew?IkfHTmyPVq92wBnn4lX%252FTf5pwVnAjsSIeL8KRSOgMpXtO5iNRn8gS049TyW7spdJ"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Join Now
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
