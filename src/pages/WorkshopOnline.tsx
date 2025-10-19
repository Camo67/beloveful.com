import { Header } from "@/components/Header";
import FooterStrip from "@/components/FooterStrip";
import PageContainer from "@/components/PageContainer";
import { Button } from "@/components/ui/button";

export default function WorkshopOnline() {
  const heroImage = {
    src: "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218565/Website%20beloveful.com/Erasing%20Borders/NyC-DSCF8922_copy_2_lswqmq.jpg",
    alt: "Online Street Photography Workshop"
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
              Online Street Photography Workshop
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

            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-8 mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                What you'll learn:
              </h2>
              <ul className="space-y-3 text-lg text-gray-700 dark:text-gray-300">
                <li>• Live virtual lessons covering the art and technique of street photography</li>
                <li>• Homework assignments to practice seeing, composing, and storytelling</li>
                <li>• Guided critiques and personalized feedback on your work</li>
                <li>• Lessons on approaching subjects, using light, and capturing emotion</li>
                <li>• Advice on editing, sequencing, and sharing your work online</li>
              </ul>
            </div>

            <p className="text-lg leading-relaxed mb-8">
              This course is perfect for anyone who wants to refine their craft and develop a consistent creative practice—without needing to travel.
            </p>

            <p className="text-lg leading-relaxed font-medium text-gray-900 dark:text-white mb-8">
              Learn from anywhere. Create with intention. See the extraordinary in the everyday.
            </p>

            <div className="text-center">
              <Button asChild size="lg" className="text-lg px-12 py-6">
                <a
                  href="https://lb.benchmarkemail.com//listbuilder/signupnew?IkfHTmyPVq92wBnn4lX%252FTf5pwVnAjsSIeL8KRSOgMpXtO5iNRn8gS049TyW7spdJ"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Enroll in Online Workshop
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