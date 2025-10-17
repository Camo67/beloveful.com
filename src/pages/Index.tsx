import { Header } from "@/components/Header";
import { Slideshow } from "@/components/Slideshow";
import { useTheme } from "next-themes";
import { useEffect, useRef } from "react";

const Index = () => {
  const { theme, setTheme } = useTheme();
  const previousTheme = useRef<string | undefined>();

  useEffect(() => {
    // Store the current theme and force dark mode for homepage
    previousTheme.current = theme;
    setTheme('dark');

    // Restore previous theme when leaving homepage
    return () => {
      if (previousTheme.current && previousTheme.current !== 'dark') {
        setTheme(previousTheme.current);
      }
    };
  }, [theme, setTheme]);

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
