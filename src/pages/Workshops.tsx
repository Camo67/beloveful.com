import { Header } from "@/components/Header";
import FooterStrip from "@/components/FooterStrip";
import PageContainer from "@/components/PageContainer";
import { Button } from "@/components/ui/button";

export default function Workshops() {
  const heroImage = {
    src: "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218570/Website%20beloveful.com/Erasing%20Borders/Tony_Menias_-_Two_Girls_in_Window_rgthwg.jpg",
    alt: "Erasing Borders - Two Girls in Window"
  };

  const workshopImage = {
    src: "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218565/Website%20beloveful.com/Erasing%20Borders/NyC-DSCF8922_copy_2_lswqmq.jpg",
    alt: "Erasing Borders - New York City"
  };


  return (
    <div className="min-h-screen">
      <Header variant="default" />

      {/* Hero Section */}
      <section className="relative h-72 md:h-[420px] overflow-hidden">
        <img
          src={heroImage.src}
          alt={heroImage.alt}
          className="w-full h-full object-cover"
          draggable={false}
          onContextMenu={(e) => e.preventDefault()}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4 max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-light mb-6">Workshop</h1>
            <p className="text-lg md:text-xl opacity-95 leading-relaxed">
              When we spend time together, my goal is to give you confidence and to create a space where you can be open about what you are struggling with. If you find yourself comparing your work to others, avoiding the subjects that inspire you, or losing balance between work and life, I want this to be a place where you can talk about it honestly.
            </p>
          </div>
        </div>
      </section>

      <PageContainer className="max-w-4xl">
        {/* Main Content */}
        <section className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            {/* Text Content */}
            <div className="space-y-6">
              <div className="text-gray-800 dark:text-gray-200 space-y-6 leading-relaxed text-lg">
                <p>
                  On the technical side, we can cover whatever you need: workflow, editing, portfolio reviews, understanding light, social media, building relationships, or simply pushing your creativity further.
                </p>
                
                <p>
                  Street photography, at its heart, is about being open to possibility. It is the arguments between strangers, the rhythm of people moving through the streets, or the strange alignments of subjects that do not seem to belong together. It is about spontaneity. It is about recognizing an emotional spark in the milliseconds it takes to press the shutter. That is the magic of it, and it is something you can learn to see.
                </p>
              </div>

              <div className="pt-4">
                <Button asChild size="lg">
                  <a
                    href="https://lb.benchmarkemail.com//listbuilder/signupnew?IkfHTmyPVq92wBnn4lX%252FTf5pwVnAjsSIeL8KRSOgMpXtO5iNRn8gS049TyW7spdJ"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Join workshop"
                  >
                    Join Workshop
                  </a>
                </Button>
              </div>
            </div>

            {/* Image */}
            <div className="flex justify-center">
              <img
                src={workshopImage.src}
                alt={workshopImage.alt}
                className="w-full max-w-lg h-auto object-cover rounded-lg shadow-lg"
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
              />
            </div>
          </div>
        </section>
      </PageContainer>

      <FooterStrip />
    </div>
  );
}
