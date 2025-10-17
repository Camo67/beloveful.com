import { Header } from "@/components/Header";
import FooterStrip from "@/components/FooterStrip";
import PageContainer from "@/components/PageContainer";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

export default function Workshops() {
  const [includePrintInquiry, setIncludePrintInquiry] = useState(false);
  const [includePortfolioAddon, setIncludePortfolioAddon] = useState(false);

  const heroImage = {
    src: "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218570/Website%20beloveful.com/Erasing%20Borders/Tony_Menias_-_Two_Girls_in_Window_rgthwg.jpg",
    alt: "Erasing Borders - Two Girls in Window"
  };

  const workshopImages = {
    mentorship: {
      src: "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218570/Website%20beloveful.com/Erasing%20Borders/Tony_Menias_-_Two_Girls_in_Window_rgthwg.jpg",
      alt: "Erasing Borders - Two Girls in Window"
    },
    workshop: {
      src: "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218565/Website%20beloveful.com/Erasing%20Borders/NyC-DSCF8922_copy_2_lswqmq.jpg",
      alt: "Erasing Borders - New York City"
    },
    class: {
      src: "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218570/Website%20beloveful.com/Erasing%20Borders/Vietnam-DSCF8153_copy_vwsvcl.jpg",
      alt: "Erasing Borders - Vietnam"
    }
  };

  const youthTags = [
    "mentorship",
    "online workshop",
    "street photography",
    "creative agency",
    "emotional honesty",
    "youth onboarding",
    "analog-digital hybrid",
  ];


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
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-6xl font-light mb-3">Mentorship & Workshops</h1>
            <p className="text-base md:text-lg opacity-95">
              Dignity-first. Youth-forward. Photography as agency and emotional honesty.
            </p>
          </div>
        </div>
      </section>

      <PageContainer className="max-w-5xl">

        {/* Tabs: Mentorship / Workshop / Class */}
        <section className="mb-16">
          <Tabs defaultValue="mentorship" className="w-full">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <TabsList>
                <TabsTrigger value="mentorship">Mentorship</TabsTrigger>
                <TabsTrigger value="workshop">Online Workshop (3.5h)</TabsTrigger>
                <TabsTrigger value="class">Online Class (Self-Paced)</TabsTrigger>
              </TabsList>

              {/* Optional add-ons */}
              <div className="flex items-center gap-6 text-sm">
                <label className="flex items-center gap-2">
                  <Switch
                    checked={includePrintInquiry}
                    onCheckedChange={(v) => setIncludePrintInquiry(Boolean(v))}
                    aria-label="Toggle print inquiry add-on"
                  />
                  <span className="text-gray-700 dark:text-gray-300">Print inquiry add-on</span>
                </label>
                <label className="flex items-center gap-2">
                  <Switch
                    checked={includePortfolioAddon}
                    onCheckedChange={(v) => setIncludePortfolioAddon(Boolean(v))}
                    aria-label="Toggle portfolio add-on"
                  />
                  <span className="text-gray-700 dark:text-gray-300">Portfolio add-on</span>
                </label>
              </div>
            </div>

            {/* Mentorship Tab */}
            <TabsContent value="mentorship" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                <div className="space-y-6">
                  <h2 className="text-3xl md:text-4xl font-light text-black dark:text-white">1-on-1 Mentorship</h2>
                  <div className="text-gray-800 dark:text-gray-200 space-y-4 leading-relaxed">
                    <p>
                      Format: 1-on-1 (online or in-person)
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                      <li><span className="font-medium">Duration:</span> 30 minutes</li>
                      <li><span className="font-medium">Rate:</span> $300–$600</li>
                      <li className="sm:col-span-2"><span className="font-medium">Focus:</span> Confidence, creative clarity, emotional honesty</li>
                      <li className="sm:col-span-2">
                        <span className="font-medium">Topics:</span> Portfolio review, workflow, light, relationships, social media, creative blocks
                      </li>
                    </ul>
                    <blockquote className="border-l-2 pl-4 italic opacity-90">
                      “If you’re comparing your work to others, avoiding the subjects that inspire you, or losing balance between life and creativity—this is a space to talk about it.”
                    </blockquote>
                  </div>

                  <div className="flex flex-wrap gap-3 pt-2">
                    <Button asChild>
                      <a
                        href="https://lb.benchmarkemail.com//listbuilder/signupnew?IkfHTmyPVq92wBnn4lX%252FTf5pwVnAjsSIeL8KRSOgMpXtO5iNRn8gS049TyW7spdJ"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Book mentorship"
                      >
                        Book Mentorship
                      </a>
                    </Button>
                    <Button variant="outline" asChild>
                      <a
                        href="https://lb.benchmarkemail.com//listbuilder/signupnew?IkfHTmyPVq92wBnn4lX%252FTf5pwVnAjsSIeL8KRSOgMpXtO5iNRn8gS049TyW7spdJ"
                        target="_blank" rel="noopener noreferrer" aria-label="Join newsletter for updates"
                      >Notify Me</a>
                    </Button>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-900/40 p-5 space-y-4 rounded-md">
                    <h3 className="text-lg font-medium">Booking</h3>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Mentorship sessions are tailored to where you are. Share a portfolio link or a question when you book.
                    </p>
                    {includePortfolioAddon && (
                      <p className="text-xs text-gray-600 dark:text-gray-400">Portfolio add-on enabled: we'll allocate extra time to review and annotate 10–15 images.</p>
                    )}
                    {includePrintInquiry && (
                      <p className="text-xs text-gray-600 dark:text-gray-400">Print inquiry enabled: we'll discuss paper, sizing, and editions.</p>
                    )}
                  </div>
                </div>

                <div className="flex justify-center">
                  <img
                    src={workshopImages.mentorship.src}
                    alt={workshopImages.mentorship.alt}
                    className="w-full max-w-md h-auto object-cover rounded-lg shadow-lg"
                    draggable={false}
                    onContextMenu={(e) => e.preventDefault()}
                  />
                </div>
              </div>

            </TabsContent>

            {/* Workshop Tab */}
            <TabsContent value="workshop" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                <div className="space-y-6">
                  <h2 className="text-3xl md:text-4xl font-light text-black dark:text-white">Online Workshop (3.5 Hours)</h2>
                  <div className="text-gray-800 dark:text-gray-200 space-y-4 leading-relaxed">
                    <p>Format: Live, interactive</p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                      <li><span className="font-medium">Tools:</span> Phone or camera, notebook</li>
                      <li><span className="font-medium">Focus:</span> Street photography, storytelling, technical flow</li>
                      <li className="sm:col-span-2"><span className="font-medium">Includes:</span> Group critique, guided walk-throughs, Q&amp;A</li>
                    </ul>
                    <blockquote className="border-l-2 pl-4 italic opacity-90">
                      “Street photography is about spontaneity—recognizing an emotional spark in the milliseconds it takes to press the shutter.”
                    </blockquote>
                  </div>

                  <div className="flex flex-wrap gap-3 pt-2">
                    <Button asChild>
                      <a
                        href="https://lb.benchmarkemail.com//listbuilder/signupnew?IkfHTmyPVq92wBnn4lX%252FTf5pwVnAjsSIeL8KRSOgMpXtO5iNRn8gS049TyW7spdJ"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Join the online workshop"
                      >
                        Join Online Workshop
                      </a>
                    </Button>
                    <Button variant="outline" asChild>
                      <a
                        href="https://lb.benchmarkemail.com//listbuilder/signupnew?IkfHTmyPVq92wBnn4lX%252FTf5pwVnAjsSIeL8KRSOgMpXtO5iNRn8gS049TyW7spdJ"
                        target="_blank" rel="noopener noreferrer" aria-label="Get notified of next workshop"
                      >Notify Me</a>
                    </Button>
                  </div>
                </div>

                <div className="flex justify-center">
                  <img
                    src={workshopImages.workshop.src}
                    alt={workshopImages.workshop.alt}
                    className="w-full max-w-md h-auto object-cover rounded-lg shadow-lg"
                    draggable={false}
                    onContextMenu={(e) => e.preventDefault()}
                  />
                </div>
              </div>
            </TabsContent>

            {/* Class Tab */}
            <TabsContent value="class" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                <div className="space-y-6">
                  <h2 className="text-3xl md:text-4xl font-light text-black dark:text-white">Online Class (Self-Paced)</h2>
                  <div className="text-gray-800 dark:text-gray-200 space-y-4 leading-relaxed">
                    <p>Format: Pre-recorded modules</p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                      <li><span className="font-medium">Access:</span> Anytime, anywhere</li>
                      <li><span className="font-medium">Focus:</span> Photography fundamentals, editing, creative agency</li>
                      <li className="sm:col-span-2"><span className="font-medium">Extras:</span> Downloadable guides, reflection prompts, remix challenges</li>
                    </ul>
                    <blockquote className="border-l-2 pl-4 italic opacity-90">
                      “Learn at your own rhythm. Remix what you learn. Make it yours.”
                    </blockquote>
                  </div>

                  <div className="flex flex-wrap gap-3 pt-2">
                    <Button asChild>
                      <a
                        href="https://lb.benchmarkemail.com//listbuilder/signupnew?IkfHTmyPVq92wBnn4lX%252FTf5pwVnAjsSIeL8KRSOgMpXtO5iNRn8gS049TyW7spdJ"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Get class access"
                      >
                        Get Class Access
                      </a>
                    </Button>
                    <Button variant="outline" asChild>
                      <a
                        href="https://lb.benchmarkemail.com//listbuilder/signupnew?IkfHTmyPVq92wBnn4lX%252FTf5pwVnAjsSIeL8KRSOgMpXtO5iNRn8gS049TyW7spdJ"
                        target="_blank" rel="noopener noreferrer" aria-label="Get notified for class access"
                      >Notify Me</a>
                    </Button>
                  </div>
                </div>

                <div className="flex justify-center">
                  <img
                    src={workshopImages.class.src}
                    alt={workshopImages.class.alt}
                    className="w-full max-w-md h-auto object-cover rounded-lg shadow-lg"
                    draggable={false}
                    onContextMenu={(e) => e.preventDefault()}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* Youth Teaching Tags */}
        <section className="mb-20">
          <div className="flex flex-wrap gap-2">
            {youthTags.map((t) => (
              <Badge key={t} variant="secondary" className="px-3 py-1">
                {t}
              </Badge>
            ))}
          </div>
        </section>
      </PageContainer>

      <FooterStrip />
    </div>
  );
}
