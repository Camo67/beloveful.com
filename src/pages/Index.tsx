import { Header } from "@/components/Header";
import { Slideshow } from "@/components/Slideshow";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePageContent } from "@/hooks/use-page-content";
import { useTheme } from "next-themes";
import { useEffect, useRef } from "react";

const CURATED_STAY_GROUPS = [
  {
    title: "Everyday Getaway Stay",
    description: "Design-forward stays that feel easy, central, and budget-aware.",
    stays: [
      "Radisson Red",
      "Hugo's Sea Point",
      "Pepperclub",
      "15 On Orange",
      "The President",
    ],
  },
  {
    title: "Boutique & Luxury",
    description: "Elevated boutique addresses with character, privacy, and polish.",
    stays: [
      "The Pod Camps Bay",
      "Morea House",
      "The Marly",
      "Winchester Hotel",
      "Cloud Nine",
    ],
  },
  {
    title: "VVIP Ultra Lux",
    description: "Signature Cape Town stays for the most refined and private experience.",
    stays: [
      "Ellerman House",
      "Cape Grace",
      "Silo Hotel",
      "One&Only",
      "12 Apostles",
      "Cape Cadogan Boutique Hotel",
      "Collection of Villas via Steadfast Group",
    ],
  },
] as const;

const HOME_CONTENT_DEFAULTS = {
  curated_stays_eyebrow: "The IFé Selection",
  curated_stays_title: "Curated places to stay in Cape Town",
  curated_stays_intro:
    "A handpicked stay guide organized by budget, from effortless city getaways to ultra-luxury Cape Town addresses.",
  curated_stays_footer_title: "Our Winelands curated selection",
  curated_stays_footer_body:
    "For guests extending beyond the city, we also curate a separate Winelands stay list tailored to the same aesthetic and hospitality standard.",
};

const Index = () => {
  const { theme, setTheme } = useTheme();
  const previousTheme = useRef<string | undefined>();
  const { data: content } = usePageContent("home", HOME_CONTENT_DEFAULTS);

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
    <div className="relative min-h-screen" style={{ backgroundColor: 'transparent' }}>
      <Header variant="home" />
      <main style={{ backgroundColor: 'transparent' }}>
        <Slideshow />
        <section
          aria-labelledby="ife-selection-title"
          className="relative overflow-hidden bg-black text-white"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(217,119,6,0.18),_transparent_35%),linear-gradient(180deg,_rgba(0,0,0,1)_0%,_rgba(10,10,10,0.98)_35%,_rgba(0,0,0,1)_100%)]" />

          <div className="relative mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-24">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs uppercase tracking-[0.45em] text-amber-300/80">
                {content.curated_stays_eyebrow}
              </p>
              <h1
                id="ife-selection-title"
                className="mt-4 font-serif text-4xl leading-tight text-white md:text-5xl"
              >
                {content.curated_stays_title}
              </h1>
              <p className="mt-5 text-base leading-7 text-neutral-300 md:text-lg">
                {content.curated_stays_intro}
              </p>
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {CURATED_STAY_GROUPS.map((group) => (
                <Card
                  key={group.title}
                  className="border-white/10 bg-neutral-950 shadow-[0_20px_80px_rgba(0,0,0,0.35)]"
                >
                  <CardHeader className="space-y-3">
                    <p className="text-xs uppercase tracking-[0.3em] text-amber-300/70">
                      Curated Tier
                    </p>
                    <CardTitle className="font-serif text-3xl font-medium text-white">
                      {group.title}
                    </CardTitle>
                    <p className="text-sm leading-6 text-neutral-300">
                      {group.description}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <ol className="space-y-3">
                      {group.stays.map((stay, index) => (
                        <li
                          key={stay}
                          className="flex items-start gap-3 border-t border-white/10 pt-3 first:border-t-0 first:pt-0"
                        >
                          <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-amber-300/30 bg-amber-300/10 text-xs font-medium text-amber-100">
                            {index + 1}
                          </span>
                          <span className="text-base leading-6 text-neutral-100">
                            {stay}
                          </span>
                        </li>
                      ))}
                    </ol>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8 rounded-[2rem] border border-white/10 bg-neutral-950 px-6 py-8 shadow-[0_20px_80px_rgba(0,0,0,0.25)] md:px-8">
              <p className="text-xs uppercase tracking-[0.38em] text-amber-300/80">
                Extended Curation
              </p>
              <h2 className="mt-3 font-serif text-3xl text-white">
                {content.curated_stays_footer_title}
              </h2>
              <p className="mt-3 max-w-3xl text-base leading-7 text-neutral-300">
                {content.curated_stays_footer_body}
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
