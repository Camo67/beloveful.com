import { Header } from "@/components/Header";
import FooterStrip from "@/components/FooterStrip";
import PageContainer from "@/components/PageContainer";
import { CLIENT_LOGOS_SOURCE, CLIENT_NAMES, getClientLinkForIndex } from "@/lib/clients";
import { Button } from "@/components/ui/button";
import PodcastPlaylist from "@/components/PodcastPlaylist";

export default function About() {
  return (
    <div className="min-h-screen">
      <Header variant="default" />
      
      <PageContainer className="max-w-4xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-light mb-8 text-black dark:text-white">Bio & Artist Statement</h1>
        </div>

        {/* YouTube Video */}
        <div className="mb-12">
          <div className="relative w-full aspect-video overflow-hidden">
            <iframe
              src="https://www.youtube.com/embed/jNBE_RQECeA"
              title="BELOVEFUL Photography Documentary"
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        {/* Featured Quote */}
        <div className="mb-16 text-center">
          <blockquote className="text-xl md:text-2xl font-light italic text-black dark:text-white leading-relaxed">
            "There's an unseen connection between everything on this earth and the Divine. My aim is to bring this connection into focus."
          </blockquote>
        </div>

        {/* Biography */}
        <div className="mb-12">
          <p className="text-lg leading-relaxed text-black dark:text-white">
            Motivated by curiosity and forever fascinated by what this world has to offer, my love of capturing life around me started the day my father handed me my first camera at age seven. From medical school, to missions all across the globe for the impoverished, my photography was always a guiding light in finding love and beauty in the simplest things. Witnessing the purity of the souls I treated, those who could laugh and fearlessly move forward even in awful conditions, motivated a life-change where I left medicine to pursue my craft. Within my first year as a full-time photographer, I was recognized by National Geographic, held multiple exhibitions, and won an Award for Excellence from the Conception Global Art Collective. From then on, it became clear: photography wasn't just a hobby, it was a true calling.
          </p>
        </div>


        {/* Artist Statement */}
        <div className="mb-16">
          <p className="text-lg leading-relaxed text-black dark:text-white mb-6">
           My passion for capturing the raw and unfiltered aspects of life led me on a profound journey of self-discovery. With a keen eye for detail and an unwavering commitment to authenticity, I seek to portray the beauty and chaos of life in equal measure. Whether it be the bustling energy of a crowded market, the serene beauty of a remote landscape, or the intimate moments of daily life; I strive to convey a sense of connection and commonality among people, highlighting the rhythm that binds us together. The rhythm of life. I believe that photography is a powerful tool in promoting empathy and understanding between people. I hope to inspire others to explore the world and embrace different cultures; which can help foster greater empathy and understanding between people.
          </p>
          
          <p className="text-lg leading-relaxed text-black dark:text-white">
           I see my photography as a powerful tool for building bridges and breaking down barriers, and I remain dedicated to using my art to promote unity and compassion in the world.
          </p>
        </div>

        {/* Add this above the Approach & Teaching section */}
        <div className="w-full flex justify-center mb-6">
          <img 
            src="https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620507/tony-hero-new_mtx9wk.jpg" 
            alt="Tony Menias Portrait" 
            className="w-full max-w-md h-64 object-cover"
            draggable="false"
            loading="eager"
          />
        </div>

        {/* Approach & Teaching */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-medium text-black dark:text-white mb-6">Approach & Teaching</h2>
          <div className="space-y-6">
            <p className="text-lg leading-relaxed text-black dark:text-white">
              The work is rooted in dignity, presence, and creative agency. When teaching—whether one-on-one or with a group—youth-first learning comes first: we focus on confidence, clarity, and honest storytelling.
            </p>
            <p className="text-lg leading-relaxed text-black dark:text-white">
              If you're beginning your journey or refining your vision, there's space for you. Mentorship and workshops are designed to be practical, emotionally aware, and empowering.
            </p>
            <div className="pt-2">
              <Button asChild>
                <a href="/workshops" aria-label="Explore mentorship and workshops">Explore Mentorship & Workshops</a>
              </Button>
            </div>
          </div>
        </section>

        {/* Featured Podcast (RSS-based playlist) */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-medium text-black dark:text-white">Featured Podcast</h2>
            <Button asChild size="sm" variant="outline">
              <a
                href="https://www.beloveful.com/shoot-wisely-podcast/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open the full Shoot Wisely Podcast page"
              >
                Full podcast
              </a>
            </Button>
          </div>
          <PodcastPlaylist />
        </section>

        {/* Publications & Awards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-black dark:text-white mb-6">Publications</h3>
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
            <h3 className="text-xl font-semibold text-black dark:text-white mb-6">Honors & Awards</h3>
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
        <section className="mt-20">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-medium text-black dark:text-white mb-4">Clients & Partners</h2>
          </div>
          <ClientsPartnersGrid />
        </section>
      </PageContainer>

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
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 items-center">
      {clientLogos.map((src: string, i: number) => {
        // Use the cleaned client name from CLIENT_NAMES array
        const clientName = CLIENT_NAMES[i] || `Partner ${i + 1}`;
        const href: string | null = getClientLinkForIndex(i);
        const content = (
          <img
            src={src}
            alt={`${clientName} logo`}
            className={`
              max-h-12 max-w-full w-auto object-contain image-protected 
              filter grayscale transition-all duration-300
              md:group-hover:grayscale-0
            `}
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
            className="relative flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg group transition-colors duration-300 hover:bg-gray-100 dark:hover:bg-gray-700"
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
