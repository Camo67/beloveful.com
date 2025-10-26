import { Header } from "@/components/Header";
import FooterStrip from "@/components/FooterStrip";
import PageContainer from "@/components/PageContainer";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { workshopImages } from "@/lib/workshop-data";
import { CloudImage } from "@/components/CloudImage";

export default function Workshops() {
  const workshopData = [
    {
      id: "mentorship",
      title: "One-on-One Mentorship",
      image: workshopImages.mentorship[0],
      summary: "Personal guidance for photographers at any stage.",
      description:
        "Strengthen your craft, explore your voice, and build a consistent practice through tailored sessions focused on your goals, challenges, and creative questions.",
      buttonText: "Explore Mentorship",
      buttonHref: "/workshops/mentorship",
    },
    {
      id: "private-chicago",
      title: "Private Chicago Workshop",
      image: workshopImages.chicagoPrivate[0],
      summary: "A custom 1:1 immersion through Chicago’s streets.",
      description:
        "Walk the city together, slow down, and learn how to anticipate light, gesture, and emotion while refining workflow, editing, and storytelling with direct feedback.",
      buttonText: "View Details",
      buttonHref: "/workshops/private-chicago",
    },
    {
      id: "group-chicago",
      title: "Group Chicago Workshop",
      image: workshopImages.chicagoGroup[0],
      summary: "Collaborative learning in an intimate group setting.",
      description:
        "Shoot alongside fellow photographers, learn to visualize scenes before they unfold, and exchange critique that helps everyone level up together.",
      buttonText: "View Details",
      buttonHref: "/workshops/group-chicago",
    },
    {
      id: "online-group",
      title: "Online Group Workshops",
      image: workshopImages.online[0],
      summary: "Live virtual sessions, assignments, and critique.",
      description:
        "Wherever you are, join a guided series that blends instruction, homework, and feedback so you can keep your practice alive between travels.",
      buttonText: "View Details",
      buttonHref: "/workshops/online-group",
    },
  ];

  return (
    <div className="min-h-screen">
      <Header variant="default" />
      <a href="#main-content" className="skip-link">Skip to main content</a>

      <PageContainer>
        <main id="main-content" role="main">
          <section className="text-center py-16 md:py-20">
            <h1 className="heading-1 mb-6">Workshops & Mentorship</h1>
            <p className="max-w-3xl mx-auto text-lg text-gray-700">
              Whether you're starting out or evolving your craft, these workshops and mentorship 
              opportunities are designed to meet you where you are and help you grow.
            </p>
          </section>

          <section className="py-12 md:py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {workshopData.map((workshop) => (
                <Card key={workshop.id} className="overflow-hidden">
                  <div className="relative h-64">
                    {workshop.image && (
                      <CloudImage
                        url={workshop.image.src}
                        alt={workshop.image.alt || workshop.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <CardHeader>
                    <h2 className="heading-2">{workshop.title}</h2>
                  </CardHeader>
                  <CardContent>
                    <p className="font-medium text-gray-700 mb-3">{workshop.summary}</p>
                    <p className="text-gray-600">{workshop.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button asChild variant="default" className="w-full">
                      <Link to={workshop.buttonHref}>{workshop.buttonText}</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </section>
        </main>
      </PageContainer>

      <FooterStrip />
    </div>
  );
}