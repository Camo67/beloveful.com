import { Header } from "@/components/Header";
import FooterStrip from "@/components/FooterStrip";
import { CLIENT_LOGOS_SOURCE, CLIENT_NAMES, getClientLinkForIndex } from "@/lib/clients";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useCloudinaryImages } from '@/hooks/use-cloudinary-images';
import { createProxiedImageUrl } from '@/lib/images';

const BIO_PARAGRAPHS = [
  "Motivated by curiosity and forever fascinated by what this world has to offer, Tony's love of capturing life around him began the day his father handed him his first camera at the age seven.",
  "From medical school to missions across the globe serving impoverished communities, his photography remained a constant guiding light in finding love and beauty in the simplest things. Witnessing the purity of souls who could laugh and move fearlessly even in devastating conditions, motivated a life-change where Tony left medicine to pursue his craft.",
  "This decision was met with immediate affirmation. Within his first year, Tony earned recognition from National Geographic, held multiple exhibitions, and received an Award of Excellence from the Conception Global Art Collective. From then on, it became clear: photography wasn't just a hobby, it was a true calling.",
  "Tony's passion for capturing the raw and unfiltered aspects of life led him on a profound journey of self-discovery. With a keen eye for detail and an unwavering commitment to authenticity, he sought to portray the beauty and chaos of life in equal measure. Whether it be the buzzing energy of crowded markets, the quiet majesty of remote landscapes or the intimate moments of daily life. Through each frame, he reveals a fundamental truth that despite our differences, we are unified by a common rhythm. The rhythm of life itself.",
  "He believes photography transcends documentation; it is a catalyst for empathy, and a mirror reflecting our shared humanity, and a bridge between souls. His images invite viewers to pause and to see with our hearts, not just with our eyes to witness the divine thread connecting all beings.",
  "Tony's shows how everyday moments  become visual poetry when we slow down and look closer. In a fractured world, he remains dedicated to using his art as an instrument to promote unity and compassion revealing not just what separates us, but the sacred connection that makes us whole.",
  "For in embracing our differences, we find our commonality; in understanding one another, we find our unity."
];

const PUBLICATIONS_AND_AWARDS = [
  { title: "TEDx Chicago Speaker", context: "TEDxChicago 2025", year: "2025" },
  { title: "Photographer of the Year", context: "University Club — Chicago", year: "2024" },
  { title: "Old Town Art Fair", context: "Invitational Exhibition — Chicago", year: "2024" },
  { title: "Adobe Artist in Residence", context: "Creative Residency", year: "2022" },
  { title: "TIME Magazine pieces Gallery", context: "Black Dove Gallery — Miami", year: "2022" },
  { title: "Best in Show", context: "Fujifilm Printlife Exhibition — Birmingham", year: "2022" },
  { title: "Featured Pick", context: "LensCulture Editorial Showcase", year: "2020" },
  { title: "Editor's Showcase Winner", context: "National Geographic", year: "2021" },
  { title: "Editor's Showcase Winner", context: "National Geographic", year: "2018" },
  { title: "Award of Excellence", context: "Conception Global Art Collective", year: "2018" },
  { title: "'Capturing Japan'", context: "ANNE Magazine", year: "2018" }
];

export default function About() {
  useEffect(() => {
    document.title = "Bio";
  }, []);

  const spotifyEmbedUrl =
    "https://open.spotify.com/embed/playlist/6Gy5nsKnrYir1tOx9pBuxW?utm_source=generator&theme=0";

  return (
    <div className="min-h-screen">
      <Header variant="default" fullWidth />

      <div className="w-full px-6 md:px-12 lg:px-20 py-12 space-y-16">
        <header className="text-center space-y-4">
          <p className="text-sm uppercase tracking-[0.35em] text-muted-foreground">About Tony Menias</p>
          <h1 className="text-4xl md:text-5xl font-light text-black dark:text-white">Bio</h1>
        </header>

        <section className="max-w-4xl mx-auto">
          <div className="relative w-full aspect-video overflow-hidden rounded-lg shadow-lg">
            <iframe
              src="https://www.youtube.com/embed/jNBE_RQECeA?si=YP-eEfwLWxWL1RLe"
              title="BELOVEFUL Photography Documentary"
              className="absolute inset-0 w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </section>

        <section className="max-w-4xl mx-auto space-y-6">
          {BIO_PARAGRAPHS.map((paragraph, index) => (
            <p key={index} className="text-lg leading-relaxed text-black dark:text-white">
              {paragraph}
            </p>
          ))}
          <div className="w-full flex justify-center pt-4">
            <img
              src="/TonyMenias-monkey.jpg"
              alt="Tony Menias portrait"
              className="w-full max-w-2xl rounded-lg shadow-md object-cover"
              draggable={false}
            />
          </div>
        </section>

        {/* Added container with the specified text */}
        <section className="max-w-4xl mx-auto py-8">
          <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8 text-center">
            <p className="text-xl md:text-2xl font-light italic text-black dark:text-white">
              "For in embracing our differences, we find our commonality; in understanding one another, we find our unity."
            </p>
          </div>
        </section>

        <section className="max-w-5xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <p className="text-sm uppercase tracking-[0.35em] text-muted-foreground">Interviews</p>
            <h2 className="text-3xl font-light text-black dark:text-white">Listen & Learn</h2>
            <p className="text-base text-muted-foreground max-w-3xl mx-auto">
              A curated playlist of conversations about process, purpose, and street photography.
            </p>
          </div>
          <div className="relative w-full overflow-hidden rounded-2xl shadow-lg">
            <iframe
              src={spotifyEmbedUrl}
              width="100%"
              height="352"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              title="Spotify interviews playlist"
            />
          </div>
        </section>

        <section className="max-w-5xl mx-auto">
          <div className="text-center space-y-2 mb-8">
            <p className="text-sm uppercase tracking-[0.35em] text-muted-foreground">Publications & Awards</p>
            <h2 className="text-3xl font-light text-black dark:text-white">Selected Highlights</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {PUBLICATIONS_AND_AWARDS.map((item) => (
              <div
                key={`${item.title}-${item.year}`}
                className="border border-gray-200 dark:border-gray-800 rounded-2xl p-6 bg-white/70 dark:bg-neutral-950/40"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">{item.year}</p>
                {item.title === "TEDx Chicago Speaker" ? (
                  <a 
                    href="https://www.tedxchicago.com/tonymenias-tedxchicago2025?fbclid=IwZXh0bgNhZW0CMTEAYnJpZBExaHViYUV6NGwyVXBKZnRsNAEe8yleX7fmOS-9lxtffGJPM3RtZsYYH04MVaDjiytl6pGY1G-aPTcmpWUn5rE_aem_qCQYQA_XIHWqptohqXo14w&brid=IvAmrFWqcArz4WBlMFbjhQ" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xl font-semibold text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
                  >
                    {item.title}
                  </a>
                ) : (
                  <>
                    <h3 className="text-xl font-semibold text-black dark:text-white">{item.title}</h3>
                    <p className="text-muted-foreground">{item.context}</p>
                  </>
                )}
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-medium text-black dark:text-white mb-4">Clients & Partners</h2>
          </div>
          <div className="max-w-6xl mx-auto">
            <ClientsPartnersGrid />
          </div>
        </section>

        <section className="text-center max-w-4xl mx-auto space-y-6">
          <p className="text-sm uppercase tracking-[0.35em] text-muted-foreground">Final Journey</p>
          <p className="text-lg leading-relaxed text-black dark:text-white">
            Today, my work is as much about teaching and community as it is about making images. Workshops, mentorships, and collaborative projects keep the conversation alive.
          </p>
          <div className="pt-2">
            <Button asChild size="lg">
              <Link to="/workshops" aria-label="Explore workshops and mentorship">
                Join the Journey
              </Link>
            </Button>
          </div>
        </section>
      </div>

      <FooterStrip />
    </div>
  );
}

function ClientsPartnersGrid() {
  const { data: dynamicLogos = [] } = useCloudinaryImages('logos');
  const clientLogos = dynamicLogos.length > 0 ? dynamicLogos.map((i) => createProxiedImageUrl(i.desktop)) : CLIENT_LOGOS_SOURCE;

  if (!clientLogos || clientLogos.length === 0) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400">
        Client logos will be displayed here.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-12 items-center">
      {clientLogos.map((src: string, i: number) => {
        const clientName = CLIENT_NAMES[i] || `Partner ${i + 1}`;
        const href: string | null = getClientLinkForIndex(i);
        const content = (
          <img
            src={src}
            alt={`${clientName} logo`}
            className="
              relative z-10
              max-h-20 sm:max-h-24 md:max-h-32 lg:max-h-36 max-w-full w-auto object-contain image-protected 
              md:filter md:grayscale transition-all duration-300 transform
              md:hover:grayscale-0 md:hover:scale-105 md:hover:translate-y-[-4px] md:hover:[filter:grayscale(0%)_drop-shadow(0_4px_12px_rgba(0,0,0,0.25))] dark:md:hover:[filter:grayscale(0%)_drop-shadow(0_4px_12px_rgba(255,255,255,0.25))]
            "
            loading="lazy"
            draggable={false}
            onContextMenu={(e) => e.preventDefault()}
            onError={(e) => {
              console.warn(`Failed to load ${clientName} logo:`, src);
              const target = e.currentTarget as HTMLImageElement;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                parent.style.display = 'none';
              }
            }}
          />
        );

        return (
          <div
            key={i}
            className="relative flex items-center justify-center p-4 md:p-6 group cursor-pointer"
            title={clientName}
          >
            <div className="absolute inset-0 hidden md:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0">
              <div className="absolute top-2 right-2">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-gray-600 dark:text-gray-300"
                >
                  <path
                    d="M7 17L17 7M17 7H7M17 7V17"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            {href ? (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${clientName} website`}
                className="inline-flex relative z-10"
              >
                {content}
              </a>
            ) : (
              content
            )}
          </div>
        );
      })}
    </div>
  );
}