import { Header } from "@/components/Header";
import FooterStrip from "@/components/FooterStrip";
import { CLIENT_LOGOS_SOURCE, CLIENT_NAMES, getClientLinkForIndex } from "@/lib/clients";
import { Button } from "@/components/ui/button";

export default function About() {
  return (
    <div className="min-h-screen">
      <Header variant="default" fullWidth />
      
      <div className="w-full px-6 md:px-12 lg:px-20 py-12">

        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-light mb-8 text-black dark:text-white">Bio & Artist Statement</h1>
        </div>

        {/* YouTube Video */}
        <div className="mb-12 max-w-4xl mx-auto">
          <div className="relative w-full aspect-video overflow-hidden rounded-lg">
            <iframe
              src="https://www.youtube.com/embed/jNBE_RQECeA"
              title="BELOVEFUL Photography Documentary"
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        {/* Biography */}
        <div className="mb-12 max-w-4xl mx-auto">
          <div className="space-y-6">
            <p className="text-lg leading-relaxed text-black dark:text-white">
              Motivated by curiosity and forever fascinated by what this world has to offer, Tony's love of capturing life around him began the day his father handed him his first camera at age seven. That simple gesture ignited a lifelong pursuit of finding beauty in the everyday and meaning in the margins.
            </p>
            <p className="text-lg leading-relaxed text-black dark:text-white">
              From medical school to missions across the globe serving impoverished communities, his photography remained a constant a guiding light in discovering grace and resilience in the simplest moments. Witnessing the purity of souls who could laugh and move fearlessly forward even in devastating conditions, Tony experienced a revelation. These encounters illuminated a truth he could no longer ignore: his calling wasn't to heal bodies, but to reveal the sacred in the human experience.
            </p>
            <p className="text-lg leading-relaxed text-black dark:text-white">
              The decision to leave medicine and pursue photography full-time was met with immediate affirmation. Within his first year, Tony earned recognition from National Geographic, held multiple exhibitions, and received an Award for Excellence from the Conception Global Art Collective. The message was unmistakable photography wasn't merely a passion, it was his purpose.
            </p>
            <p className="text-lg leading-relaxed text-black dark:text-white">
              Tony's work captures the raw and unfiltered essence of life with an unwavering commitment to authenticity. His lens seeks both beauty and chaos in equal measure: the electric energy of crowded markets, the quiet majesty of remote landscapes, the tender intimacy of daily rituals. Through each frame, he reveals a fundamental truth that despite our differences, we are bound by a common rhythm. The rhythm of life itself.
            </p>
            <p className="text-lg leading-relaxed text-black dark:text-white">
              He believes photography transcends documentation; it is a bridge between souls, a catalyst for empathy, and a mirror reflecting our shared humanity. His images invite viewers to see beyond surface differences and recognize the divine thread connecting all beings. Whether capturing joy in the face of hardship or stillness amid turmoil, Tony's work asks us to pause, to witness, and to remember what binds us together.
            </p>
            <p className="text-lg leading-relaxed text-black dark:text-white">
              In a fractured world, he remains dedicated to using his art as an instrument of unity and compassion revealing not just what separates us, but the sacred connection that makes us whole.
            </p>
          </div>
        </div>


        {/* Tony Image */}
        <div className="w-full flex justify-center mb-12">
          <img 
            src="/TonyMenias-monkey.jpg" 
            alt="Tony Menias Portrait" 
            className="w-full max-w-2xl h-auto object-contain"
            draggable="false"
            loading="eager"
          />
        </div>

        {/* Featured Quote */}
        <div className="mb-16 text-center max-w-4xl mx-auto">
          <blockquote className="text-xl md:text-2xl font-light italic text-black dark:text-white leading-relaxed transition-all hover:[text-shadow:0_0_8px_rgba(0,0,0,0.25)] dark:hover:[text-shadow:0_0_10px_rgba(255,255,255,0.35)]">
            "There's an unseen connection between everything on this earth and the Divine. My aim is to bring this connection into focus." -Tony Menias
          </blockquote>
        </div>

        {/* Featured Podcast */}
        <section className="mb-16">
          <div className="mb-6 text-center">
            <h2 className="text-2xl md:text-3xl font-medium text-black dark:text-white transition-all hover:[text-shadow:0_0_8px_rgba(0,0,0,0.25)] dark:hover:[text-shadow:0_0_10px_rgba(255,255,255,0.35)]">Featured Podcast</h2>
          </div>
          <div className="w-full max-w-4xl mx-auto">
            <iframe data-testid="embed-iframe" style={{ borderRadius: 12 }} src="https://open.spotify.com/embed/playlist/6Gy5nsKnrYir1tOx9pBuxW?utm_source=generator&theme=0" width="100%" height="152" frameBorder="0" allowFullScreen={true} allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
          </div>
        </section>

        {/* Publications & Awards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 max-w-4xl mx-auto">
          <div>
            <h3 className="text-xl font-semibold text-black dark:text-white mb-6 transition-all hover:[text-shadow:0_0_8px_rgba(0,0,0,0.25)] dark:hover:[text-shadow:0_0_10px_rgba(255,255,255,0.35)]">Publications</h3>
            <ul className="space-y-4 text-black dark:text-white">
              <li className="flex justify-between items-start gap-4">
                <span className="flex-1">'Burning Man Tunes' Magnetic Magazine</span>
                <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">2023</span>
              </li>
              <li className="flex justify-between items-start gap-4">
                <span className="flex-1">'Chicago' Bump Books</span>
                <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">2023</span>
              </li>
              <li className="flex justify-between items-start gap-4">
                <span className="flex-1">'Story Behind the Still' Digital Photographers Magazine</span>
                <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">2022</span>
              </li>
              <li className="flex justify-between items-start gap-4">
                <span className="flex-1">'Sunset Sails' Editors Showcase National Geographic</span>
                <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">2021</span>
              </li>
              <li className="flex justify-between items-start gap-4">
                <span className="flex-1">'Into The Rabbit Hole' Editors Showcase National Geographic</span>
                <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">2018</span>
              </li>
              <li className="flex justify-between items-start gap-4">
                <span className="flex-1">'Capturing Japan' ANNE Magazine</span>
                <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">2018</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-black dark:text-white mb-6 transition-all hover:[text-shadow:0_0_8px_rgba(0,0,0,0.25)] dark:hover:[text-shadow:0_0_10px_rgba(255,255,255,0.35)]">Honors & Awards</h3>
            <ul className="space-y-4 text-black dark:text-white">
              <li className="flex justify-between items-start gap-4">
                <span className="flex-1">Photographer of the Year University Club, Chicago</span>
                <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">2024</span>
              </li>
              <li className="flex justify-between items-start gap-4">
                <span className="flex-1">Adobe Artist in Residence</span>
                <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">2022</span>
              </li>
              <li className="flex justify-between items-start gap-4">
                <span className="flex-1">Best in Show Fujifilm Printlife Exhibition</span>
                <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">2022</span>
              </li>
              <li className="flex justify-between items-start gap-4">
                <span className="flex-1">Winner Editor's Showcase National Geographic</span>
                <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">2021</span>
              </li>
              <li className="flex justify-between items-start gap-4">
                <span className="flex-1">Featured Pick Lensculture</span>
                <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">2020</span>
              </li>
              <li className="flex justify-between items-start gap-4">
                <span className="flex-1">Winner Editor's Showcase National Geographic</span>
                <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">2018</span>
              </li>
              <li className="flex justify-between items-start gap-4">
                <span className="flex-1">Award Of Excellence Conception Global Art Collective</span>
                <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">2018</span>
              </li>
            </ul>
          </div>
        </div>
        {/* Clients & Partners */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-medium text-black dark:text-white mb-4 transition-all hover:[text-shadow:0_0_8px_rgba(0,0,0,0.25)] dark:hover:[text-shadow:0_0_10px_rgba(255,255,255,0.35)]">Clients & Partners</h2>
          </div>
          <div className="max-w-6xl mx-auto">
            <ClientsPartnersGrid />
          </div>
        </section>

        {/* Final Journey Section */}
        <section className="mb-16 text-center max-w-4xl mx-auto">
          <div className="space-y-6">
            <p className="text-lg leading-relaxed text-black dark:text-white">
              Today, my journey has evolved into something larger than photography itself — it's about connection, growth, and shared vision.
            </p>
            <p className="text-lg leading-relaxed text-black dark:text-white">
              My love for learning runs as deep as my love for teaching, and I believe both are essential to truly seeing the world. I invite others into a space of openness and exploration and create a safe place where curiosity, courage, and creativity can thrive together.
            </p>
            <div className="pt-4">
              <Button asChild>
                <a href="/workshops" aria-label="Join the journey through workshops">Reach out if you'd like to join that journey.</a>
              </Button>
            </div>
          </div>
        </section>
      </div>

      <FooterStrip />
    </div>
  );
}

function ClientsPartnersGrid() {
  // Use the client logos from the imported data
  const clientLogos = CLIENT_LOGOS_SOURCE;
  
  // Don't render if no logos are available
  if (!clientLogos || clientLogos.length === 0) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400">
        Client logos will be displayed here.
      </div>
    );
  }

  // Function is imported at the top of the file

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-12 items-center">
      {clientLogos.map((src: string, i: number) => {
        // Use the cleaned client name from CLIENT_NAMES array
        const clientName = CLIENT_NAMES[i] || `Partner ${i + 1}`;
        const href: string | null = getClientLinkForIndex(i);
        const content = (
          <img
            src={src}
            alt={`${clientName} logo`}
            className="
              max-h-28 md:max-h-32 lg:max-h-36 max-w-full w-auto object-contain image-protected 
              filter grayscale transition-all duration-300 transform
              hover:grayscale-0 hover:scale-110 hover:[filter:grayscale(0%)_drop-shadow(0_0_15px_rgba(0,0,0,0.4))] dark:hover:[filter:grayscale(0%)_drop-shadow(0_0_15px_rgba(255,255,255,0.4))]
            "
            loading="lazy"
            draggable={false}
            onContextMenu={(e) => e.preventDefault()}
            onError={(e) => {
              console.warn(`Failed to load ${clientName} logo:`, src);
              // Hide the failed image gracefully
              const target = e.currentTarget as HTMLImageElement;
              target.style.display = 'none';
              // Also hide the parent container if the image fails
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
            className="relative flex items-center justify-center p-6 md:p-8 bg-gray-50 dark:bg-gray-800 rounded-lg group transition-colors duration-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
            title={clientName}
          >
            {/* Desktop-only arrow indicator */}
            <div className="absolute inset-0 hidden md:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
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
                className="inline-flex"
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
