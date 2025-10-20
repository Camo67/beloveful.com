import { Header } from "@/components/Header";
import FooterStrip from "@/components/FooterStrip";
import PageContainer from "@/components/PageContainer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { workshopImages } from "@/lib/workshop-data";

export default function Mentorship() {
  const heroImage = {
    src: "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218570/Website%20beloveful.com/Erasing%20Borders/Tony_Menias_-_Two_Girls_in_Window_rgthwg.jpg",
    alt: "Photography Mentorship"
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
              Photography Mentorship
            </h1>
            <p className="text-xl md:text-2xl opacity-95 leading-relaxed">
              Develop your vision and grow as a photographer with personalized guidance.
            </p>
          </div>
        </div>
      </section>

      <PageContainer className="max-w-4xl">
        <section className="py-20">
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p className="text-lg leading-relaxed mb-8">
              An online, one-on-one session with screen sharing allows us to focus entirely on your goals. The timing of classes is flexible to fit your schedule, and you come with the questions. I am happy to cover whatever you are interested in learning, from technical skills to creative approaches.
            </p>

            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-8 mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Why I Teach
              </h2>
              <div className="space-y-4 text-lg text-gray-700 dark:text-gray-300">
                <p>
                  When I first picked up a camera, I had no idea what I was stepping into. Photography did not just challenge me; it transformed my life. As I grew into the craft and eventually built a business, I faced many obstacles. Some lessons were spiritual, some were emotional, and others were financial and technical. Each one shaped me, and I want to share them with you.
                </p>
              </div>
            </div>

            <p className="text-lg leading-relaxed mb-6">
              This mentorship is for photographers at any stage who want to strengthen their craft, explore their creative voice, and develop a consistent practice. My goal is to give you confidence and create a space where you can be open about what you are struggling with. If you find yourself comparing your work to others, avoiding the subjects that inspire you, or losing balance between work and life, this is a place where you can speak honestly.
            </p>

            <p className="text-lg leading-relaxed mb-6">
              We will work together to refine your technical skills, build your visual storytelling abilities, and help you discover the style and perspective that make your photography uniquely yours. On the technical side, we can cover whatever you need: workflow, editing, portfolio reviews, understanding light, social media, building relationships, or simply pushing your creativity further.
            </p>

            <p className="text-lg leading-relaxed mb-8">
              Through one-on-one sessions, personalized critiques, and ongoing guidance, I will support you in overcoming challenges, exploring new techniques, and expanding your understanding of photography as both an art and a practice. This mentorship is about more than taking better photos—it is about seeing more deeply, creating with intention, and connecting more profoundly with the world around you.
            </p>

            {/* Workshop Images Gallery */}
            {workshopImages.mentorship.length > 1 && (
              <div className="my-16">
                <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">
                  Mentorship Experience
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {workshopImages.mentorship.slice(1).map((img, idx) => (
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

            <div className="border-t border-gray-200 dark:border-gray-700 my-12"></div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 mb-8 border border-gray-200 dark:border-gray-700">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Mentorship Packages
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                Choose the package that works best for your goals:
              </p>
              <div className="space-y-4 text-lg text-gray-700 dark:text-gray-300">
                <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
                  <span className="font-medium">One Session – 1 or 2 hour</span>
                  <span className="font-bold">$350-$600</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
                  <span className="font-medium">Three Sessions – 1 hour each, biweekly or monthly</span>
                  <span className="font-bold">$1000</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="font-medium">Six Sessions – 1 hour each, biweekly or monthly</span>
                  <span className="font-bold">$2000</span>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Button asChild size="lg" className="text-lg px-12 py-6">
                <a
                  href="https://lb.benchmarkemail.com//listbuilder/signupnew?IkfHTmyPVq92wBnn4lX%252FTf5pwVnAjsSIeL8KRSOgMpXtO5iNRn8gS049TyW7spdJ"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Start Your Mentorship Journey
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