import { Header } from "@/components/Header";
import FooterStrip from "@/components/FooterStrip";

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <Header variant="default" />
      
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-light mb-8">About</h1>
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
              <p className="text-lg leading-relaxed mb-6">
              Motivated by curiosity and forever fascinated by what this world has to offer, Tony’s love of capturing life around him started the day his father handed him his first camera at age seven. From medical school, to missions all across the globe for the impoverished, his photography was always a guiding light in finding love and beauty in the simplest things. Witnessing the purity of the souls he treated, those who could laugh and fearlessly move forward even in awful conditions, motivated a life-change where Tony left medicine to pursue his craft. Within his first year as a full-time photographer, Tony was recognized by National Geographic, held multiple exhibitions, and won an Award for Excellence from the Conception Global Art Collective. From then on, it became clear: photography wasn’t just a hobby, it was a true calling.
              </p>
              
              <p className="text-lg leading-relaxed mb-6">
               Tony's passion for capturing the raw and unfiltered aspects of life led him on a profound journey of self-discovery. With a keen eye for detail and an unwavering commitment to authenticity, he sought to portray the beauty and chaos of life in equal measure. Whether it be the bustling energy of a crowded market, the serene beauty of a remote landscape, or the intimate moments of daily life; He strives to convey a sense of connection and commonality among people, highlighting the rhythm that binds us together. The rhythm of life. Tony believes that photography is a powerful tool in promoting empathy and understanding between people. He hopes to inspire others to explore the world and embrace different cultures; which can help foster greater empathy and understanding between people.
              </p>
              
              <p className="text-lg leading-relaxed mb-6">
               He sees his photography as a powerful tool for building bridges and breaking down barriers, and he remains dedicated to using his art to promote unity and compassion in the world.
              </p>  
              
              <p className="text-lg leading-relaxed">
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
            <h3 className="text-xl font-medium mb-6">Publications</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex justify-between">
                <span>Street Photography Annual</span>
                <span className="text-sm">2023</span>
              </li>
              <li className="flex justify-between">
                <span>Global Lens Magazine</span>
                <span className="text-sm">2022</span>
              </li>
              <li className="flex justify-between">
                <span>Humanity in Focus</span>
                <span className="text-sm">2021</span>
              </li>
              <li className="flex justify-between">
                <span>Cultural Crossroads</span>
                <span className="text-sm">2020</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-medium mb-6">Exhibitions</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex justify-between">
                <span>Chicago Gallery Walk</span>
                <span className="text-sm">2024</span>
              </li>
              <li className="flex justify-between">
                <span>International Street Photo Festival</span>
                <span className="text-sm">2023</span>
              </li>
              <li className="flex justify-between">
                <span>Midwest Photography Collective</span>
                <span className="text-sm">2022</span>
              </li>
              <li className="flex justify-between">
                <span>Urban Stories Exhibition</span>
                <span className="text-sm">2021</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-medium mb-6">Honors & Awards</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex justify-between">
                <span>Street Photography Excellence Award</span>
                <span className="text-sm">2023</span>
              </li>
              <li className="flex justify-between">
                <span>Documentary Photography Honor</span>
                <span className="text-sm">2022</span>
              </li>
              <li className="flex justify-between">
                <span>Cultural Documentation Prize</span>
                <span className="text-sm">2021</span>
              </li>
              <li className="flex justify-between">
                <span>Emerging Artist Recognition</span>
                <span className="text-sm">2020</span>
              </li>
            </ul>
          </div>
        </div>
      </main>

      <FooterStrip />
    </div>
  );
}
