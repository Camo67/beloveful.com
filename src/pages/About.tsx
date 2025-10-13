import { Header } from "@/components/Header";
import FooterStrip from "@/components/FooterStrip";
import PageContainer from "@/components/PageContainer";
import { CLIENT_LOGOS_SOURCE, CLIENT_NAMES } from "@/lib/clients";

export default function About() {
  return (
    <div className="min-h-screen">
      <Header variant="default" />
      
      <PageContainer className="max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-light mb-8 text-black dark:text-white">About</h1>
        </div>

        {/* YouTube Video */}
        <div className="mb-12">
          <div className="relative w-full aspect-video">
            <iframe
              src="https://www.youtube.com/embed/jNBE_RQECeA"
              title="BELOVEFUL Photography Documentary"
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        {/* Biography and Portrait */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          <div className="lg:col-span-2">
            <div className="prose prose-lg max-w-none">
              <p className="text-lg leading-relaxed mb-6 text-gray-800 dark:text-gray-200">
              Motivated by curiosity and forever fascinated by what this world has to offer, Tony’s love of capturing life around him started the day his father handed him his first camera at age seven. From medical school, to missions all across the globe for the impoverished, his photography was always a guiding light in finding love and beauty in the simplest things. Witnessing the purity of the souls he treated, those who could laugh and fearlessly move forward even in awful conditions, motivated a life-change where Tony left medicine to pursue his craft. Within his first year as a full-time photographer, Tony was recognized by National Geographic, held multiple exhibitions, and won an Award for Excellence from the Conception Global Art Collective. From then on, it became clear: photography wasn’t just a hobby, it was a true calling.
              </p>
              
              <p className="text-lg leading-relaxed mb-6 text-gray-800 dark:text-gray-200">
               Tony's passion for capturing the raw and unfiltered aspects of life led him on a profound journey of self-discovery. With a keen eye for detail and an unwavering commitment to authenticity, he sought to portray the beauty and chaos of life in equal measure. Whether it be the bustling energy of a crowded market, the serene beauty of a remote landscape, or the intimate moments of daily life; He strives to convey a sense of connection and commonality among people, highlighting the rhythm that binds us together. The rhythm of life. Tony believes that photography is a powerful tool in promoting empathy and understanding between people. He hopes to inspire others to explore the world and embrace different cultures; which can help foster greater empathy and understanding between people.
              </p>
              
              <p className="text-lg leading-relaxed mb-6 text-gray-800 dark:text-gray-200">
               He sees his photography as a powerful tool for building bridges and breaking down barriers, and he remains dedicated to using his art to promote unity and compassion in the world.
              </p>  
              
              <p className="text-lg leading-relaxed text-gray-800 dark:text-gray-200">
                There’s an unseen connection between everything on this earth and the Divine. His aim is to bring this connection into focus.
              </p>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="relative">
              <img
                src="https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620507/tony-hero-new_mtx9wk.jpg"
                alt="Tony Menias Portrait"
                className="w-full h-auto"
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
              />
            </div>
          </div>
        </div>

        {/* Publications, Exhibitions, Awards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-xl font-medium mb-6 text-black dark:text-white">Publications</h3>
            <ul className="space-y-3 text-gray-700 dark:text-gray-300">
              <li className="flex justify-between">
                <span>'Burning Man Tunes' Magnetic Magazine</span>
                <span className="text-sm">2023</span>
              </li>
              <li className="flex justify-between">
                <span>'Chicago' Bump Books</span>
                <span className="text-sm">2023</span>
              </li>
              <li className="flex justify-between">
                <span>'Story Behind the Still' Digital Photographers Magazine</span>
                <span className="text-sm">2022</span>
              </li>
              <li className="flex justify-between">
                <span>'Sunset Sails' Editors Showcase National Geographic</span>
                <span className="text-sm">2021</span>
              </li>
              <li className="flex justify-between">
                <span>'Into The Rabbit Hole' Editors Showcase National Geographic</span>
                <span className="text-sm">2018</span>
              </li>
              <li className="flex justify-between">
                <span>'Capturing Japan' ANNE Magazine</span>
                <span className="text-sm">2018</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-medium mb-6 text-black dark:text-white">Exhibitions</h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
              <li className="flex justify-between">
                <span>'Invitational' Wilmette Art Fair Wilmette IL</span>
                <span className="text-xs">2025</span>
              </li>
              <li className="flex justify-between">
                <span>'Invitational' Old Town Art Fair Chicago IL</span>
                <span className="text-xs">2025</span>
              </li>
              <li className="flex justify-between">
                <span>'Invitational' Old Town Art Fair Chicago IL</span>
                <span className="text-xs">2024</span>
              </li>
              <li className="flex justify-between">
                <span>'Invitational' Saatchi The Other Art Fair Brooklyn, NY</span>
                <span className="text-xs">2024</span>
              </li>
              <li className="flex justify-between">
                <span>'Group' Titan Walls Chicago IL</span>
                <span className="text-xs">2023</span>
              </li>
              <li className="flex justify-between">
                <span>'Invitational' Moments that we Missed Compstomp Studios</span>
                <span className="text-xs">2023</span>
              </li>
              <li className="flex justify-between">
                <span>'Invitational' Saatchi The Other Art Fair Chicago, IL</span>
                <span className="text-xs">2023</span>
              </li>
              <li className="flex justify-between">
                <span>'Invitational' TIME Magazine pieces Gallery, Black Dove Gallery Miami, FL</span>
                <span className="text-xs">2022</span>
              </li>
              <li className="flex justify-between">
                <span>The Photography Show, Fujifilm Printlife Exhibition, Birmingham, UK</span>
                <span className="text-xs">2022</span>
              </li>
              <li className="flex justify-between">
                <span>'Group' SuperChief Gallery, Los Angeles, CA</span>
                <span className="text-xs">2022</span>
              </li>
              <li className="flex justify-between">
                <span>'Invitational' Coinbase NFT Gallery</span>
                <span className="text-xs">2022</span>
              </li>
              <li className="flex justify-between">
                <span>'Invitational' Saatchi The Other Art Fair Chicago, IL</span>
                <span className="text-xs">2022</span>
              </li>
              <li className="flex justify-between">
                <span>'Invitational' Superchief Gallery Art Basel Miami, FL</span>
                <span className="text-xs">2021</span>
              </li>
              <li className="flex justify-between">
                <span>'Invitational' Saatchi The Other Art Fair Brooklyn, NY</span>
                <span className="text-xs">2021</span>
              </li>
              <li className="flex justify-between">
                <span>'Invitational' Saatchi The Other Art Fair Chicago, IL</span>
                <span className="text-xs">2021</span>
              </li>
              <li className="flex justify-between">
                <span>'Invitational' HUMANITY J07 Gallery Metaverse</span>
                <span className="text-xs">2021</span>
              </li>
              <li className="flex justify-between">
                <span>'Solo' In the Shadows ImnotArt Gallery, Chicago, IL</span>
                <span className="text-xs">2021</span>
              </li>
              <li className="flex justify-between">
                <span>'Solo' Erasing Borders, Gallery Cafe. Chicago, IL</span>
                <span className="text-xs">2019</span>
              </li>
              <li className="flex justify-between">
                <span>'Group' Conception Global Art Collective Chicago, IL</span>
                <span className="text-xs">2018</span>
              </li>
              <li className="flex justify-between">
                <span>'Group' P&B Art Show Chicago, IL</span>
                <span className="text-xs">2018</span>
              </li>
              <li className="flex justify-between">
                <span>'Group' RAW Artists Chicago, IL</span>
                <span className="text-xs">2018</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-medium mb-6 text-black dark:text-white">Honors & Awards</h3>
            <ul className="space-y-3 text-gray-700 dark:text-gray-300">
              <li className="flex justify-between">
                <span>Photographer of the Year University Club, Chicago</span>
                <span className="text-sm">2024</span>
              </li>
              <li className="flex justify-between">
                <span>Adobe Artist in Residence</span>
                <span className="text-sm">2022</span>
              </li>
              <li className="flex justify-between">
                <span>Best in Show Fujifilm Printlife Exhibition</span>
                <span className="text-sm">2022</span>
              </li>
              <li className="flex justify-between">
                <span>Winner Editor's Showcase National Geographic</span>
                <span className="text-sm">2021</span>
              </li>
              <li className="flex justify-between">
                <span>Featured Pick Lensculture</span>
                <span className="text-sm">2020</span>
              </li>
              <li className="flex justify-between">
                <span>Winner Editor's Showcase National Geographic</span>
                <span className="text-sm">2018</span>
              </li>
              <li className="flex justify-between">
                <span>Award Of Excellence Conception Global Art Collective</span>
                <span className="text-sm">2018</span>
              </li>
            </ul>
          </div>
        </div>
        {/* Clients & Partners */}
        <section className="mt-20">
          <h2 className="text-2xl md:text-3xl font-light mb-6 text-center text-black dark:text-white">Clients & Partners</h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
            A selection of organizations and collaborators that have supported and showcased the work.
          </p>
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

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 items-center">
      {clientLogos.map((src: string, i: number) => {
        // Use the cleaned client name from CLIENT_NAMES array
        const clientName = CLIENT_NAMES[i] || `Partner ${i + 1}`;
        
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
          </div>
        );
      })}
    </div>
  );
}
