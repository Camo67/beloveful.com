import { Header } from "@/components/Header";
import FooterStrip from "@/components/FooterStrip";
import PageContainer from "@/components/PageContainer";

export default function Workshops() {
  const heroImage = {
    src: "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218570/Website%20beloveful.com/Erasing%20Borders/Tony_Menias_-_Two_Girls_in_Window_rgthwg.jpg",
    alt: "Chicago Street Photography Workshop"
  };

  const workshops = [
    {
      id: "private-chicago",
      title: "1:1 Street Photography Workshop — Chicago",
      image: {
        src: "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218565/Website%20beloveful.com/Erasing%20Borders/NyC-DSCF8922_copy_2_lswqmq.jpg",
        alt: "Chicago Street Photography"
      },
      shortDescription: "Slow down, observe, and rediscover the beauty in everyday life.",
      description: "This private workshop blends technique with intuition, helping you see deeper and create with intention. Explore Chicago's streets and capture moments that tell compelling stories while receiving personalized guidance.",
      buttonText: "Learn More",
buttonHref: "/workshop-chicago-private"
    },
    {
      id: "group-chicago",
      title: "Group Street Photography Workshop — Chicago",
      image: {
        src: "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218570/Website%20beloveful.com/Erasing%20Borders/Tony_Menias_-_Two_Girls_in_Window_rgthwg.jpg",
        alt: "Group Photography Workshop"
      },
      shortDescription: "See Chicago differently alongside other photographers.",
      description: "This small-group workshop combines hands-on street shooting with guided instruction. Learn to notice, connect, and capture meaningful stories while refining your eye and creative voice in a collaborative setting.",
      buttonText: "Learn More",
buttonHref: "/workshop-chicago-group"
    },
    {
      id: "online",
      title: "Online Street Photography Workshop",
      image: {
        src: "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218565/Website%20beloveful.com/Erasing%20Borders/NyC-DSCF8922_copy_2_lswqmq.jpg",
        alt: "Online Photography Workshop"
      },
      shortDescription: "Learn to see the world differently from wherever you are.",
      description: "Through live sessions, creative assignments, and personalized feedback, this online workshop teaches you how to notice, compose, and tell visual stories that resonate. Build a consistent practice and strengthen your craft without leaving home.",
      buttonText: "Learn More",
buttonHref: "/workshop-online"
    },
    {
      id: "mentorship",
      title: "Photography Mentorship",
      image: {
        src: "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218570/Website%20beloveful.com/Erasing%20Borders/Tony_Menias_-_Two_Girls_in_Window_rgthwg.jpg",
        alt: "Photography Mentorship"
      },
      shortDescription: "Develop your vision and grow as a photographer with personalized guidance.",
      description: "This mentorship is for photographers at any stage who want to strengthen their craft, explore their creative voice, and develop a consistent practice. One-on-one sessions, personalized critiques, and ongoing guidance will help you refine your skills, overcome challenges, and expand your understanding of photography as both an art and a practice.",
      buttonText: "Learn More",
buttonHref: "/mentorship"
    }
  ];

  const scrollToWorkshops = () => {
    const element = document.getElementById('workshops-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen">
      <Header variant="default" />

      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <img
          src={heroImage.src}
          alt={heroImage.alt}
          className="w-full h-full object-cover"
          draggable={false}
          onContextMenu={(e) => e.preventDefault()}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4 sm:px-6 md:px-8 max-w-5xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 sm:mb-8 tracking-tight">
              Discover the Art of Street Photography
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl opacity-95 leading-relaxed mb-8 sm:mb-10 md:mb-12">
              Street photography is more than capturing moments. It is about seeing the extraordinary in the everyday, noticing the rhythm of life, and telling stories through light, shadow, and human connection. Whether you are exploring Chicago's streets or observing the world from your own neighborhood, it invites you to slow down, look closer, and create images that speak.
            </p>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl opacity-90 leading-relaxed mb-8 sm:mb-10 md:mb-12">
              It is about openness to possibility: a heated argument between strangers, the balletic movement of pedestrians, or witty juxtapositions of seemingly unrelated subjects. It is about spontaneity—the choreography of an emotional or cerebral response, realized in the milliseconds it takes to capture the decisive moment.
            </p>
            <button 
              onClick={scrollToWorkshops}
              className="inline-flex items-center justify-center rounded-md text-lg px-8 py-4 bg-white text-black hover:bg-gray-100 transition-colors font-medium shadow-lg hover:shadow-xl"
            >
              Explore Workshops →
            </button>
          </div>
        </div>
      </section>

      <PageContainer className="max-w-6xl">
        {/* Workshops Section */}
        <section id="workshops-section" className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Workshops & Mentorship
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Choose the learning experience that fits your needs and goals
            </p>
          </div>

          {/* Horizontal Overview Blocks */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {workshops.map((workshop) => (
              <a
                key={workshop.id}
                href={workshop.buttonHref}
                className="group block bg-white dark:bg-neutral-900 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
              >
                {/* Small Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={workshop.image.src}
                    alt={workshop.image.alt}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    draggable={false}
                    onContextMenu={(e) => e.preventDefault()}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>

                {/* Compact Content */}
                <div className="p-6 space-y-3">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white group-hover:text-accent-neutral transition-colors">
                    {workshop.title}
                  </h3>
                  <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed line-clamp-3">
                    {workshop.shortDescription}
                  </p>
                  <div className="pt-2 flex items-center text-accent-neutral font-medium group-hover:translate-x-2 transition-transform">
                    {workshop.buttonText}
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

      </PageContainer>

      <FooterStrip />
    </div>
  );
}
