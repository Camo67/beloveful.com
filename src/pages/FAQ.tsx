import { Header } from "@/components/Header";
import FooterStrip from "@/components/FooterStrip";
import PageContainer from "@/components/PageContainer";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";

export default function FAQ() {
  type QA = { q: string; a: ReactNode };
  const faqs: QA[] = [
    {
      q: "Can I purchase prints of your work?",
      a: (
        <>
          Yes. If you see an image labeled “Would you like this as a print?”, click it to inquire. You’ll be taken to the contact page, and the image title will be passed silently—no need to remember it. You can always reach us directly via the <Link to="/contact" className="underline underline-offset-4">contact page</Link>.
        </>
      ),
    },
    {
      q: "Where are you based?",
      a: (
        <>
          I’m based in Cape Town, South Africa, but my work spans cities, countries, and cultures. The portfolio begins in Chicago and moves outward—erasing borders through visual storytelling.
        </>
      ),
    },
    {
      q: "Do you offer workshops or mentorship?",
      a: (
        <div className="space-y-2">
          <p>Absolutely. I offer:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>1-on-1 mentorship (30 minutes, $300–$600)</li>
            <li>Online workshop (3.5 hours, live)</li>
            <li>Self-paced online class (learn at your own rhythm)</li>
          </ul>
          <p>Each is designed to build confidence, not comparison.</p>
          <div className="pt-1">
            <Link
              to="/workshops"
              className="underline underline-offset-4"
              aria-label="See mentorship and workshops"
            >
              See Mentorship & Workshops →
            </Link>
          </div>
        </div>
      ),
    },
    {
      q: "What kind of photography do you specialize in?",
      a: (
        <>
          Street photography is my heartbeat—capturing spontaneity, tension, and emotional sparks in everyday moments. I also work in portraiture, analog film, and travel-based storytelling.
        </>
      ),
    },
    {
      q: "What gear do I need for workshops?",
      a: (
        <>
          For digital workshops: a phone or camera is perfect. For analog (Ex-Film) workshops: bring your own camera or phone—film encouraged. No fancy gear required. Curiosity is enough.
        </>
      ),
    },
    {
      q: "Can I ask questions during workshops?",
      a: (
        <>
          Yes. Every session includes space for questions, reflection, and critique. Whether you’re stuck on editing or unsure how to approach a subject, we’ll talk about it.
        </>
      ),
    },
    {
      q: "Do you travel for exhibitions or collaborations?",
      a: (
        <>
          Yes. I’ve exhibited in multiple cities and am open to collaborations that align with my values—especially youth-led, dignity-centered projects.
        </>
      ),
    },
    {
      q: "What if I’m just starting out?",
      a: (
        <>
          You’re welcome here. Whether you’re picking up a camera for the first time or refining your voice, this space is built for growth, not perfection.
        </>
      ),
    },
  ];

  const tags = [
    "mentorship",
    "online workshop",
    "street photography",
    "creative agency",
    "emotional honesty",
  ];

  return (
    <div className="min-h-screen">
      <Header variant="default" />
      <PageContainer className="max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="heading-1 mb-6 text-black dark:text-white">FAQ</h1>
          <p className="text-body text-black dark:text-white max-w-2xl mx-auto">
            Common questions about mentorship, workshops, prints, and more.
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {tags.map((t) => (
            <Badge key={t} variant="secondary" className="px-4 py-2 text-ui font-medium bg-muted text-text-secondary hover:bg-accent-neutral hover:text-white transition-colors">
              {t}
            </Badge>
          ))}
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <Accordion type="multiple" className="w-full space-y-4">
            {faqs.map((item, idx) => (
              <AccordionItem 
                key={idx} 
                value={`faq-${idx}`}
                className="content-card border-none shadow-sm"
              >
                <AccordionTrigger className="text-left hover:no-underline focus-enhanced px-6 py-4">
                  <h2 className="heading-3 pr-4 text-black dark:text-white">{item.q}</h2>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="text-faq text-black dark:text-white space-y-3 mt-2">
                    {item.a}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Privacy Policy */}
        <section id="privacy" className="mt-20 content-card max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="heading-2 mb-4 text-black dark:text-white">Privacy Policy</h2>
            <p className="text-ui text-black dark:text-white">
              We respect your privacy and use minimal data to operate this site.
            </p>
          </div>

          <div className="prose max-w-none space-y-6 text-black dark:text-white">
            <p className="text-caption text-text-tertiary mb-6">Last updated: October 14, 2025</p>

            <h3 className="heading-3 mt-8 mb-4">Overview</h3>
            <p className="text-body mb-6">
              This website showcases photography and provides information about mentorships, workshops, and prints. We collect the minimum necessary data to run the site, answer inquiries, and improve user experience. We do not sell your personal information.
            </p>

            <h3 className="heading-3 mt-8 mb-4">What we collect</h3>
            <ul className="text-body space-y-3 ml-6 list-disc">
              <li>Contact details you submit (e.g., name, email) when you inquire or sign up.</li>
              <li>Optional image titles passed when you click "Would you like this as a print?" for context on your inquiry.</li>
              <li>Basic technical data from your browser (e.g., device type) necessary to serve the site.</li>
            </ul>

            <h3 className="heading-3 mt-8 mb-4">Cookies</h3>
            <p className="text-body mb-6">
              We use a simple cookie to remember your consent choice from the cookie banner. No tracking cookies are required to view the site.
            </p>

            <h3 className="heading-3 mt-8 mb-4">Third‑party services</h3>
            <ul className="text-body space-y-3 ml-6 list-disc">
              <li>Images are delivered via Cloudinary CDN for fast, global performance.</li>
              <li>Newsletter and booking notifications are handled via Benchmark Email (linked from booking buttons).</li>
            </ul>

            <h3 className="heading-3 mt-8 mb-4">Analytics</h3>
            <p className="text-body mb-6">
              We do not currently use analytics that track individuals across pages or sessions. If we enable privacy‑respecting analytics in the future, we will update this policy and describe what is collected and why.
            </p>

            <h3 className="heading-3 mt-8 mb-4">Your choices</h3>
            <ul className="text-body space-y-3 ml-6 list-disc">
              <li>You can accept or decline cookies in the banner; your choice is stored in your browser.</li>
              <li>You can contact us to update or delete information you've shared.</li>
              <li>You can unsubscribe from emails at any time using the link provided by the email service.</li>
            </ul>

            <h3 className="heading-3 mt-8 mb-4">Data retention</h3>
            <p className="text-body mb-6">
              We retain information only as long as needed for the purpose collected, or as required by law.
            </p>

            <h3 className="heading-3 mt-8 mb-4">Children</h3>
            <p className="text-body mb-6">
              This site is not directed at children under 13. If you believe a child has provided personal information, please contact us to remove it.
            </p>

            <h3 className="heading-3 mt-8 mb-4">Changes</h3>
            <p className="text-body mb-6">
              We may update this policy to reflect improvements or legal requirements. Material changes will be noted here with an updated date.
            </p>

            <h3 className="heading-3 mt-8 mb-4">Contact</h3>
            <p className="text-body">
              Questions about privacy? <Link to="/contact" className="underline underline-offset-4 text-accent-neutral hover:text-accent-warm transition-colors focus-enhanced">Contact us</Link> and we'll be happy to help.
            </p>
          </div>
        </section>

        <div className="mt-16 text-center">
          <Link
            to="/contact"
            className="btn-secondary inline-flex items-center gap-2 focus-enhanced"
            aria-label="Contact for more questions"
          >
            Still have a question? Contact us
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </PageContainer>
      <FooterStrip />
    </div>
  );
}
