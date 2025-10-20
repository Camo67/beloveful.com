import { Header } from "@/components/Header";
import FooterStrip from "@/components/FooterStrip";
import PageContainer from "@/components/PageContainer";
import { Button } from "@/components/ui/button";

export default function WorkshopChicagoPrivate() {
  const heroImage = {
    src: "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218565/Website%20beloveful.com/Erasing%20Borders/NyC-DSCF8922_copy_2_lswqmq.jpg",
    alt: "1:1 Street Photography Workshop Chicago"
  };

  return (
    <div className="min-h-screen">
      <Header variant="default" />

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
              1:1 Street Photography Workshop — Chicago
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
            <div className="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-8">
              Planning a trip to Chicago? Already live here?
            </div>
            
            <p className="text-lg leading-relaxed mb-6">
              If you love street photography and want to take your craft to the next level, you've come to the right place.
            </p>
            
            <p className="text-lg leading-relaxed mb-8">
              This private workshop is designed not only to help you capture incredible images, but to deepen your understanding of composition, light, and human connection. Together, we'll wander the streets of Chicago—its rhythm, its chaos, its quiet poetry—and I'll help you discover your personal style while learning to tell visual stories that move people.
            </p>

            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-8 mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                What you'll learn:
              </h2>
              <ul className="space-y-3 text-lg text-gray-700 dark:text-gray-300">
                <li>• Make the most of your camera (any type of camera)</li>
                <li>• Visualize a scene before it unfolds</li>
                <li>• Anticipate and find meaningful moments</li>
                <li>• Approach and connect with strangers for authentic portraits</li>
                <li>• Work with composition, light, and shadow to shape emotion</li>
                <li>• Capture decisive, story-rich moments</li>
                <li>• Use negative space, silhouettes, and leading lines intentionally</li>
                <li>• Strengthen your visual storytelling</li>
                <li>• Develop your editing and curation process</li>
                <li>• Receive a professional critique after our session</li>
              </ul>
            </div>

            <p className="text-lg leading-relaxed font-medium text-gray-900 dark:text-white mb-8">
              This experience is about slowing down, seeing deeply, and rediscovering the beauty in the ordinary—one frame at a time.
            </p>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-8 border border-gray-200 dark:border-gray-700">
              <div className="text-xl font-semibold text-gray-900 dark:text-white">
                Duration: 3 hours
              </div>
            </div>

            <div className="text-center">
              <Button asChild size="lg" className="text-lg px-12 py-6">
                <a
                  href="https://lb.benchmarkemail.com//listbuilder/signupnew?IkfHTmyPVq92wBnn4lX%252FTf5pwVnAjsSIeL8KRSOgMpXtO5iNRn8gS049TyW7spdJ"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Book Your Private Workshop
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