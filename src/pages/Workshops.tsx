import { Header } from "@/components/Header";
import FooterStrip from "@/components/FooterStrip";
import PageContainer from "@/components/PageContainer";

export default function Workshops() {
  return (
    <div className="min-h-screen">
      <Header variant="default" />
      
      {/* Hero Section */}
      <section className="relative h-96 md:h-[500px] overflow-hidden">
        <img
          src="https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620617/CHI-DSCF9471_vukjxy.jpg"
          alt="Street Photography Workshop Chicago"
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

      <PageContainer className="max-w-4xl">
        {/* Introduction */}
        <section className="mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-light mb-6 text-black dark:text-white">
            Photography Mentorship
          </h2>
          <div className="text-lg leading-relaxed max-w-4xl mx-auto space-y-6 text-left text-gray-800 dark:text-gray-200">
            <p>
              When I first picked up a camera, I had no idea what I was stepping into. Photography did not just challenge me; it transformed my life. As I grew into the craft and eventually built a business, I faced plenty of obstacles. Some lessons were spiritual, some were emotional, and others were financial and technical. Each one shaped me, and I want to share them with you.
            </p>
            <p>
              When we spend time together, my goal is to give you confidence and to create a space where you can be open about what you are struggling with. If you find yourself comparing your work to others, avoiding the subjects that inspire you, or losing balance between work and life, I want this to be a place where you can talk about it honestly.
            </p>
            <p>
              On the technical side, we can cover whatever you need: workflow, editing, portfolio reviews, understanding light, social media, building relationships, or simply pushing your creativity further.
            </p>
            <p>
              Street photography, at its heart, is about being open to possibility. It is the arguments between strangers, the rhythm of people moving through the streets, or the strange alignments of subjects that do not seem to belong together. It is about spontaneity. It is about recognizing an emotional spark in the milliseconds it takes to press the shutter. That is the magic of it, and it is something you can learn to see.
            </p>
          </div>
        </section>

        {/* What You'll Learn */}
        <section className="mb-16">
          <h3 className="text-2xl font-medium mb-8 text-center text-black dark:text-white">The workshop will include:</h3>
          <div className="max-w-4xl mx-auto">
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-black dark:bg-white rounded-full mt-3 mr-4 flex-shrink-0" />
                <span className="text-gray-800 dark:text-gray-200">Learning techniques on taking the best street shot</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-black dark:bg-white rounded-full mt-3 mr-4 flex-shrink-0" />
                <span className="text-gray-800 dark:text-gray-200">Visualizing a scene before it happens</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-black dark:bg-white rounded-full mt-3 mr-4 flex-shrink-0" />
                <span className="text-gray-800 dark:text-gray-200">Lessons on composition, best use of light and capturing the moment with your camera (whatever camera you have)</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-black dark:bg-white rounded-full mt-3 mr-4 flex-shrink-0" />
                <span className="text-gray-800 dark:text-gray-200">Capturing compositions in the city</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-black dark:bg-white rounded-full mt-3 mr-4 flex-shrink-0" />
                <span className="text-gray-800 dark:text-gray-200">Guidance on using negative space, silhouettes, reflections, and leading lines</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-black dark:bg-white rounded-full mt-3 mr-4 flex-shrink-0" />
                <span className="text-gray-800 dark:text-gray-200">Advice on social media platforms and editing</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-black dark:bg-white rounded-full mt-3 mr-4 flex-shrink-0" />
                <span className="text-gray-800 dark:text-gray-200">Professional critique of photos after shooting</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Workshop Details */}
        <section className="mb-16">
          <h3 className="text-2xl font-medium mb-8 text-center text-black dark:text-white">Workshop Details</h3>
          <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-none">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-800 dark:text-gray-200">
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
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Join our newsletter to be notified when new workshop dates are announced
            </p>
          </div>
        </section>
      </PageContainer>

      <FooterStrip />
    </div>
  );
}
