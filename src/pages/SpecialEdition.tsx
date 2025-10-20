import { Header } from "@/components/Header";
import FooterStrip from "@/components/FooterStrip";
import PageContainer from "@/components/PageContainer";
import { REGIONS, getAlbumsByRegion } from "@/lib/data";
import { createProxiedImageUrl } from "@/lib/images";
import { Link } from "react-router-dom";

function selectCards(limit = 36) {
  const cards: { src: string; region: string; country: string }[] = [];
  for (const region of REGIONS) {
    const albums = getAlbumsByRegion(region as any);
    for (const album of albums) {
      for (const img of album.images) {
        cards.push({ src: img.desktop, region: album.region, country: album.country });
        if (cards.length >= limit) break;
      }
      if (cards.length >= limit) break;
    }
    if (cards.length >= limit) break;
  }
  return cards;
}

export default function SpecialEdition() {
  const cards = selectCards(36);

  return (
    <div className="min-h-screen">
      <Header variant="default" />
      
      <PageContainer>
        <header className="mb-12 max-w-screen-xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-light mb-4">Open Edition</h1>
          <p className="text-lg text-gray-800 dark:text-gray-200 mb-6">
            5×7 Prints Available On-Site
          </p>
          <div className="bg-gray-50 dark:bg-neutral-900 p-6 rounded-lg">
            <h2 className="text-xl font-medium mb-4 text-black dark:text-white">Pricing</h2>
            <div className="space-y-2 text-black dark:text-white">
              <div className="flex justify-between items-center">
                <span>1 Print (5×7)</span>
                <span className="font-medium">$10</span>
              </div>
              <div className="flex justify-between items-center">
                <span>4 Prints (5×7)</span>
                <span className="font-medium">$35</span>
              </div>
              <div className="flex justify-between items-center">
                <span>8 Prints (5×7)</span>
                <span className="font-medium">$70</span>
              </div>
            </div>
          </div>
        </header>

        <section
          className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-screen-xl mx-auto"
          onContextMenu={(e) => e.preventDefault()}
        >
          {cards.map((c, i) => {
            const proxied = createProxiedImageUrl(c.src);
            const toContact =
              `/contact?source=shop&variant=open-edition` +
              `&region=${encodeURIComponent(c.region)}` +
              `&country=${encodeURIComponent(c.country)}` +
              `&image=${encodeURIComponent(proxied)}`;

            return (
              <article
                key={i}
                className="group overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 shadow-sm hover:shadow-md transition-shadow"
                draggable={false}
              >
                <div className="aspect-square select-none">
                  <img
                    src={proxied}
                    alt="5x7 Open edition print"
                    className="w-full h-full object-contain image-protected"
                    draggable={false}
                    onContextMenu={(e) => e.preventDefault()}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="p-4 flex items-center justify-between">
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    5×7 Open Edition Print
                  </span>
                  <Link
                    to={toContact}
                    className="text-xs underline underline-offset-4 hover:opacity-75 transition-opacity"
                  >
                    Order this print →
                  </Link>
                </div>
              </article>
            );
          })}
        </section>
      </PageContainer>

      <FooterStrip />
    </div>
  );
}
