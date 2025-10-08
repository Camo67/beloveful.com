import { Header } from "@/components/Header";
import FooterStrip from "@/components/FooterStrip";

export default function Workshops() {
  return (
    <div className="min-h-screen bg-white">
      <Header variant="default" />
      
      {/* Hero Section */}
      <section className="relative h-96 md:h-[500px] overflow-hidden">
        <img
          src="https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621036/EGY-946_v5ldvm.jpg"
          alt="Street Photography Workshop"
          className="w-full h-full object-cover"
          draggable={false}
          onContextMenu={(e) => e.preventDefault()}
        />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-6xl font-light mb-4">
              BELOVEFUL Photography
            </h1>
            <p className="text-xl md:text-2xl font-light">
              Street Photography Workshop (Chicago)
            </p>
            <p className="text-lg mt-4 opacity-90">
              "Walk the streets, see differently."
            </p>
          </div>
        </div>
      </section>

      <main className="max-w-4xl mx-auto px-4 py-16">
        {/* Introduction */}
        <section className="mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-light mb-6">
            Discover the Art of Street Photography
          </h2>
          <p className="text-lg leading-relaxed max-w-3xl mx-auto">
            Join Tony Menias for an immersive street photography workshop in the heart of Chicago. 
            Learn to capture authentic moments, master composition, and develop your unique photographic 
            voice while exploring the city's vibrant neighborhoods.
          </p>
        </section>

        {/* What You'll Learn */}
        <section className="mb-16">
          <h3 className="text-2xl font-medium mb-8 text-center">What You'll Learn</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-black rounded-full mt-3 mr-4 flex-shrink-0" />
                <span>Street photography ethics and approach</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-black rounded-full mt-3 mr-4 flex-shrink-0" />
                <span>Composition techniques for urban environments</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-black rounded-full mt-3 mr-4 flex-shrink-0" />
                <span>Working with natural light in the city</span>
              </li>
            </ul>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-black rounded-full mt-3 mr-4 flex-shrink-0" />
                <span>Capturing candid moments and emotions</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-black rounded-full mt-3 mr-4 flex-shrink-0" />
                <span>Post-processing for street photography</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Workshop Details */}
        <section className="mb-16">
          <h3 className="text-2xl font-medium mb-8 text-center">Workshop Details</h3>
          <div className="bg-gray-50 p-8 rounded-none">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="font-medium">Duration:</span>
                  <span>Full Day (8 hours)</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Location:</span>
                  <span>Chicago, IL</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Group Size:</span>
                  <span>Max 8 participants</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="font-medium">Level:</span>
                  <span>All skill levels welcome</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Equipment:</span>
                  <span>Camera required (DSLR/Mirrorless preferred)</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <div className="max-w-md mx-auto space-y-4">
            <a
              href="https://lb.benchmarkemail.com//listbuilder/signupnew?IkfHTmyPVq92wBnn4lX%252FTf5pwVnAjsSIeL8KRSOgMpXtO5iNRn8gS049TyW7spdJ"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full block py-4 text-center"
            >
              Book / Notify Me
            </a>
            <p className="text-sm text-gray-600">
              Join our newsletter to be notified when new workshop dates are announced
            </p>
          </div>
        </section>
      </main>

      <FooterStrip />
    </div>
  );
}