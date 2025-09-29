import { Header } from "@/components/Header";
import { Slideshow } from "@/components/Slideshow";

const Index = () => {
  return (
    <div className="relative min-h-screen">
      <Header variant="home" />
      <main>
        <Slideshow />
      </main>
    </div>
  );
};

export default Index;
