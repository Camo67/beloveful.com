import { Header } from "@/components/Header";
import FooterStrip from "@/components/FooterStrip";
import PageContainer from "@/components/PageContainer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useWorkshopImages } from "@/hooks/use-workshop-images";

export default function Mentorship() {
  const heroImage = {
    src: "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760979008/home/camo/new/beloveful.com/public/Website%20beloveful.com/Workshop%20Photos/Copy%20of%20CHI-359.jpg",
    alt: "Photography Mentorship"
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
              Photography Mentorship
            </h1>
            <p className="text-xl md:text-2xl opacity-95 leading-relaxed">
              Develop your vision and grow as a photographer with personalized guidance.
            </p>
          </div>
        </div>
      </section>

      <PageContainer className="max-w-4xl">
        <section className="py-20 space-y-12">
          <article className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-800">
            <p className="text-sm uppercase tracking-[0.25em] text-muted-foreground mb-4">Section 01</p>
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 dark:text-white mb-6">Why I Teach</h2>
            <div className="space-y-6 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
              <p>
                When I first picked up a camera, I had no idea what I was stepping into. Photography did not just challenge me; it transformed my life. As I grew into the craft and eventually built a business, I faced many obstacles. Some lessons were spiritual, some were emotional, and others were financial and technical. Each one shaped me, and I want to share them with you.
              </p>
              <p>
                This mentorship is for photographers at any stage who want to strengthen their craft, explore their creative voice, and develop a consistent practice. My goal is to give you confidence and create a space where you can be open about what you are struggling with. If you find yourself comparing your work to others, avoiding the subjects that inspire you, or losing balance between work and life, this is a place where you can speak honestly.
              </p>
            </div>
          </article>

          <article className="rounded-2xl border border-gray-100 dark:border-gray-800 p-8">
            <p className="text-sm uppercase tracking-[0.25em] text-muted-foreground mb-4">Section 02</p>
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 dark:text-white mb-6">Mentorship Details</h2>
            <div className="space-y-6 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
              <p>
                We will work together to refine your technical skills, build your visual storytelling abilities, and help you discover the style and perspective that make your photography uniquely yours. On the technical side, we can cover whatever you need: workflow, editing, portfolio reviews, understanding light, social media, building relationships, or simply pushing your creativity further.
              </p>
              <p>
                Through one-on-one sessions, personalized critiques, and ongoing guidance, I will support you in overcoming challenges, exploring new techniques, and expanding your understanding of photography as both an art and a practice. This mentorship is about more than taking better photos—it is about seeing more deeply, creating with intention, and connecting more profoundly with the world around you. 
              </p>
            </div>
          </article>

            {/* Workshop Images Gallery */}
            {data?.mentorship && data.mentorship.length > 1 && (
              <div className="my-16">
                <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">
                  Mentorship Experience
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {data.mentorship.slice(1, 5).map((img, idx) => (
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

          <article className="rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-8">
            <p className="text-sm uppercase tracking-[0.25em] text-muted-foreground mb-4">Section 03</p>
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 dark:text-white mb-6">Packages</h2>
            <div className="space-y-4 text-lg text-gray-700 dark:text-gray-300">
              <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-b border-gray-200 dark:border-gray-700">
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">One Session</p>
                  <p className="text-sm text-muted-foreground">1–2 hours</p>
                </div>
                <span className="text-xl font-semibold text-gray-900 dark:text-white">$350–$600</span>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-b border-gray-200 dark:border-gray-700">
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">Three Sessions</p>
                  <p className="text-sm text-muted-foreground">1 hour each</p>
                </div>
                <span className="text-xl font-semibold text-gray-900 dark:text-white">$1,000</span>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-4 py-4">
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">Six Sessions</p>
                  <p className="text-sm text-muted-foreground">1 hour each</p>
                </div>
                <span className="text-xl font-semibold text-gray-900 dark:text-white">$2,000</span>
              </div>
            </div>
          </article>

          <div className="text-center pt-6">
            <Button asChild size="lg" className="text-lg px-12 py-6">
              <a
                href="https://lb.benchmarkemail.com//listbuilder/signupnew?IkfHTmyPVq92wBnn4lX%252FTf5pwVnAjsSIeL8KRSOgMpXtO5iNRn8gS049TyW7spdJ"
                target="_blank"
                rel="noopener noreferrer"
              >
                Book Your Session
              </a>
            </Button>
          </div>
        </section>
      </PageContainer>

      <FooterStrip />
    </div>
  );
}
