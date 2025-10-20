import { Header } from "@/components/Header";
import FooterStrip from "@/components/FooterStrip";
import PageContainer from "@/components/PageContainer";
import { createProxiedImageUrl } from "@/lib/images";
import printlabData from "@/lib/printlab.json";

export default function PrintShop() {
  const products = printlabData.products || [];

  return (
    <div className="min-h-screen">
      <Header variant="default" />
      
      <PageContainer>
        <div className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-light mb-4 text-black dark:text-white">Print Shop</h1>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Limited and open edition prints fulfilled by Print Innovation Lab. Click any image to purchase.
          </p>
          <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-500">
            Synced {new Date().toLocaleDateString()} · {products.length} items
          </p>
        </div>

        <div className="gallery-grid max-w-screen-xl mx-auto">
          {products.map((p: any) => (
            <a
              key={p.id}
              href={p.buyUrl || p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block"
            >
              <div className="relative bg-gray-100 dark:bg-neutral-800" style={{ aspectRatio: '4/3' }}>
                <img
                  src={createProxiedImageUrl(p.image)}
                  alt={p.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300" />
              </div>
              <div className="mt-3 text-center">
                <div className="text-sm text-black dark:text-white truncate" title={p.title}>{p.title}</div>
                {Number.isFinite(p.minPrice) && (
                  <div className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">from ${p.minPrice}</div>
                )}
              </div>
            </a>
          ))}
        </div>
      </PageContainer>

      <FooterStrip />
    </div>
  );
}
