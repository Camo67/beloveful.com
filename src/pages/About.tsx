import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

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
                Tony Menias is a street photographer whose work captures the raw humanity found in everyday moments across the globe. Born with an innate curiosity about human connection, Tony has dedicated his career to documenting life as it unfolds naturally on the streets of diverse cultures and communities.
              </p>
              
              <p className="text-lg leading-relaxed mb-6">
                His photography philosophy centers on the concept of "BELOVEFUL" – finding beauty, love, and meaning in the unguarded moments that define our shared human experience. Through his lens, ordinary interactions become extraordinary stories, revealing the universal threads that connect us all regardless of geography, culture, or circumstance.
              </p>
              
              <p className="text-lg leading-relaxed mb-6">
                Over the past decade, Tony has traveled extensively across Africa, Asia, the Middle East, and South America, creating an extensive body of work that serves as a visual anthology of contemporary global street life. His approach is characterized by patience, respect, and an ability to become nearly invisible while documenting authentic moments of joy, struggle, contemplation, and connection.
              </p>
              
              <p className="text-lg leading-relaxed">
                Tony's work has been featured in numerous exhibitions and publications, and he regularly conducts street photography workshops to share his techniques and philosophy with emerging photographers. He believes that street photography has the power to foster empathy and understanding across cultural divides, making the world feel both infinitely diverse and intimately connected.
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

      <Footer />
    </div>
  );
}