import { Header } from "@/components/Header";
import FooterStrip from "@/components/FooterStrip";
import PageContainer from "@/components/PageContainer";
import { createProxiedImageUrl, debugImageProcessing } from "@/lib/images";
import printlabData from "@/lib/printlab.json";
import { Link } from "react-router-dom";
import { CloudImage } from "@/components/CloudImage";

const OPEN_EDITION_PRICING = [
  { label: "1 Print", price: "$10" },
  { label: "4 Prints", price: "$35", note: "Save $5" },
  { label: "8 Prints", price: "$70", note: "Save $10" }
];

const buildContactLink = (imageUrl: string, title: string) => {
  // Ensure we're using a properly proxied image URL
  const proxiedImageUrl = createProxiedImageUrl(imageUrl);
  
  const tiers = OPEN_EDITION_PRICING.map((tier) => `${tier.label}: ${tier.price}${tier.note ? ` (${tier.note})` : ""}`).join(", ");
  const params = new URLSearchParams({
    image: proxiedImageUrl,
    subject: `Open Edition 5×7 - ${title} | ${tiers}`,
    source: "open-edition",
    variant: "5x7",
    body: `Open Edition 5×7 request for "${title}". Available quantity tiers: ${tiers}.`
  });
  return `/contact?${params.toString()}`;
};

export default function PrintShop() {
  const products = printlabData.products || [];

  return (
    <div className="min-h-screen">
      <Header variant="default" />

      <PageContainer className="space-y-16">
        <div className="text-center space-y-3">
          <p className="text-sm uppercase tracking-[0.35em] text-muted-foreground">Prints</p>
          <h1 className="text-4xl md:text-5xl font-light text-black dark:text-white">Print Shop</h1>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Limited editions are fulfilled by Print Innovation Lab. Open edition 5×7 prints are available directly—choose an image to start a request.
          </p>
          <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-500">
            Synced {new Date().toLocaleDateString()} · {products.length} limited editions
          </p>
        </div>

        <section className="space-y-6">
          <div className="space-y-1 text-center">
            <h2 className="text-2xl font-light text-black dark:text-white">Limited Edition • Print Innovation Lab</h2>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">Signed, numbered, and shipped flat.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product.handle} className="group rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 hover:shadow-lg transition">
                <div className="aspect-[4/3] relative overflow-hidden">
                  <CloudImage
                    url={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onLoad={() => {
                      // Debug successful image load
                      console.debug('PrintShop: Image loaded successfully', product.image);
                    }}
                    onError={() => {
                      // Debug image load error
                      console.warn('PrintShop: Image failed to load', product.image);
                      debugImageProcessing(product.image, 'PrintShop');
                    }}
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-medium text-lg mb-1">{product.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">${product.minPrice}</span>
                    <Link
                      to={buildContactLink(product.image, product.title)}
                      className="text-sm px-3 py-1.5 rounded-md bg-black text-white dark:bg-white dark:text-black hover:opacity-80 transition"
                    >
                      Request Print
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="open-edition" className="space-y-6">
          <div className="space-y-1 text-center">
            <h2 className="text-2xl font-light text-black dark:text-white">Open Edition • 5 × 7</h2>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              Each request is handled directly—tap an image to message me with the piece you’d like.
            </p>
          </div>
          <div className="mt-16 max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-medium mb-4">Open Edition Prints</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Affordable 5×7" prints on archival paper with a selection of works from across the portfolio.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              {OPEN_EDITION_PRICING.map((tier, index) => (
                <div key={index} className="border border-gray-200 dark:border-gray-800 rounded-lg p-4">
                  <div className="font-medium">{tier.label}</div>
                  <div className="text-lg font-medium my-1">{tier.price}</div>
                  {tier.note && <div className="text-xs text-gray-600 dark:text-gray-400">{tier.note}</div>}
                </div>
              ))}
            </div>
            
            <Link 
              to={buildContactLink(
                products[0]?.image || "", 
                "Open Edition Prints"
              )}
              className="inline-block px-6 py-3 rounded-md bg-black text-white dark:bg-white dark:text-black hover:opacity-80 transition"
            >
              Request Open Edition Prints
            </Link>
          </div>
        </section>
      </PageContainer>

      <FooterStrip />
    </div>
  );
}
