import { Header } from "@/components/Header";
import FooterStrip from "@/components/FooterStrip";
import { ALBUMS } from "@/lib/data";
import { createProxiedImageUrl } from "@/lib/images";
import { Link } from "react-router-dom";

function selectCards(limit = 36) {
  const cards: { src: string; region: string; country: string }[] = [];
  for (const album of ALBUMS) {
    for (const img of album.images) {
      cards.push({ src: img.desktop, region: album.region, country: album.country });
      if (cards.length >= limit) break;
    }
    if (cards.length >= limit) break;
  }
  return cards;
}

export default function SpecialEdition() {
  const cards = selectCards(36);

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950">
      <Header variant="default" />
      
      <main className="px-4 py-24 md:px-8 lg:px-12">
        <header className="mb-12 max-w-screen-xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-light mb-4">Special Edition</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Curated prints available on request. Each piece can be custom printed and framed to your specifications.
          </p>
        </header>

        <section
          className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-screen-xl mx-auto"
          onContextMenu={(e) => e.preventDefault()}
        >
          {cards.map((c, i) => {
            const proxied = createProxiedImageUrl(c.src);
            const toContact =
              `/contact?source=special&variant=special-edition` +
              `&region=${encodeURIComponent(c.region)}` +
              `&country=${encodeURIComponent(c.country)}` +
              `&image=${encodeURIComponent(proxied)}`;

            return (
              <article
                key={i}
                className="group overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 shadow-sm hover:shadow-md transition-shadow"
                draggable={false}
              >
                <div
                  className="aspect-square bg-center bg-cover select-none"
                  style={{ backgroundImage: `url("${proxied}")` }}
                  aria-label="Special edition print"
                  role="img"
                  onContextMenu={(e) => e.preventDefault()}
                />
                <div className="p-4 flex items-center justify-between">
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    Special Edition Print
                  </span>
                  <Link
                    to={toContact}
                    className="text-xs underline underline-offset-4 hover:opacity-75 transition-opacity"
                  >
                    Request this print →
                  </Link>
                </div>
              </article>
            );
          })}
        </section>
      </main>

      <FooterStrip />
    </div>
  );
}
