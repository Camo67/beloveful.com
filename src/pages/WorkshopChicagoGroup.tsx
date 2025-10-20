import { Header } from "@/components/Header";
import FooterStrip from "@/components/FooterStrip";
import PageContainer from "@/components/PageContainer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { workshopImages } from "@/lib/workshop-data";

export default function WorkshopChicagoGroup() {
  const heroImage = {
    src: "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218570/Website%20beloveful.com/Erasing%20Borders/Tony_Menias_-_Two_Girls_in_Window_rgthwg.jpg",
    alt: "Group Street Photography Workshop Chicago"
  };

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
              Group Street Photography Workshop — Chicago
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
              This small-group workshop combines hands-on street shooting with guided instruction. Learn to notice, connect, and capture meaningful stories while refining your eye and creative voice in a collaborative setting.
            </p>

            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-8 mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                What to Expect:
              </h2>
              <ul className="space-y-3 text-lg text-gray-700 dark:text-gray-300">
                <li>• Small group experience (maximum 6 participants)</li>
                <li>• Collaborative learning with fellow photographers</li>
                <li>• Hands-on street shooting in Chicago's diverse neighborhoods</li>
                <li>• Real-time feedback and guidance</li>
                <li>• Learn from observing others' approaches</li>
                <li>• Share techniques and creative insights</li>
                <li>• Group critique and discussion</li>
                <li>• Build connections with like-minded photographers</li>
              </ul>
            </div>

            <p className="text-lg leading-relaxed font-medium text-gray-900 dark:text-white mb-8">
              Experience the energy of collaborative creativity while developing your individual voice as a street photographer.
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
            {workshopImages.chicagoGroup.length > 1 && (
              <div className="my-16">
                <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">
                  Workshop Experience
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {workshopImages.chicagoGroup.slice(1).map((img, idx) => (
                    <div key={idx} className="aspect-[4/3] overflow-hidden rounded-lg">
                      <img
                        src={img.src}
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
                  Join Group Workshop
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