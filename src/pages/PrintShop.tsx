import { Header } from "@/components/Header";
import FooterStrip from "@/components/FooterStrip";
import PageContainer from "@/components/PageContainer";
import { createProxiedImageUrl, debugImageProcessing } from "@/lib/images";
import printlabData from "@/lib/printlab.json";
import { CmsImage } from "@/components/CmsImage";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import StripeCheckout from "@/components/StripeCheckout";
import { createMailtoHref } from "@/lib/contact";

export default function PrintShop() {
  const products = printlabData.products || [];
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<'open' | 'limited'>('open');

  useEffect(() => {
    if (location.hash === '#limited') {
      setActiveTab('limited');
    } else if (location.hash === '#open' || location.hash === '#open-edition') {
      setActiveTab('open');
    }
  }, [location.hash]);

  // Function to extract key details from product description
  const extractProductDetails = (description: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(description, 'text/html');

    // Get the table with product details
    const table = doc.querySelector('table');
    const details = {
      paperSize: '',
      imageSize: '',
      editionCopies: '',
      paperType: '',
      paperWeight: '',
      printing: ''
    };

    if (table) {
      const rows = table.querySelectorAll('tr');
      if (rows.length >= 2) {
        // Extract data from the first data row
        const dataCells = rows[1].querySelectorAll('td');
        if (dataCells.length >= 3) {
          details.paperSize = dataCells[0]?.textContent?.trim() || '';
          details.imageSize = dataCells[1]?.textContent?.trim() || '';
          details.editionCopies = dataCells[2]?.textContent?.trim() || '';
        }
      }
    }

    // Extract other details from paragraphs
    const paragraphs = doc.querySelectorAll('p');
    paragraphs.forEach(p => {
      const text = p.textContent || '';
      if (text.includes('Paper type:')) {
        details.paperType = text.replace('Paper type:', '').trim();
      } else if (text.includes('Paper Weight:')) {
        details.paperWeight = text.replace('Paper Weight:', '').trim();
      } else if (text.includes('Printing:')) {
        details.printing = text.replace('Printing:', '').trim();
      }
    });

    return details;
  };

  return (
    <div className="min-h-screen bg-[#0d0f0a] text-white selection:bg-[#7ec832] selection:text-black">
      <Header variant="default" />

      <PageContainer className="space-y-16">
        <div className="text-center space-y-4">
          <p className="text-[10px] uppercase tracking-[0.5em] text-[#7ec832] font-mono">Mission // Prints</p>
          <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter text-white" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
            Print <span className="text-[#7ec832]">Shop</span>
          </h1>
          <p className="text-neutral-400 max-w-2xl mx-auto font-['Barlow_Condensed'] text-lg">
            Tactical precision in every frame. Choose between museum-quality limited editions 
            or high-fidelity open edition prints.
          </p>
          <div className="flex items-center justify-center gap-4 text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
            <span>Synced: {new Date().toLocaleDateString()}</span>
            <span className="w-1 h-1 bg-[#7ec832] rounded-full"></span>
            <span>Inventory: {products.length} active</span>
          </div>
        </div>

        {/* Tactical Tab Navigation */}
        <div className="flex border-b border-white/5 font-mono">
          <button
            className={`py-4 px-8 text-xs uppercase tracking-[0.3em] transition-all duration-300 relative ${activeTab === 'open'
                ? 'text-[#7ec832] border-b-2 border-[#7ec832]'
                : 'text-neutral-500 hover:text-neutral-300'
              }`}
            onClick={() => setActiveTab('open')}
          >
            01 // Open Edition
          </button>
          <button
            className={`py-4 px-8 text-xs uppercase tracking-[0.3em] transition-all duration-300 relative ${activeTab === 'limited'
                ? 'text-[#7ec832] border-b-2 border-[#7ec832]'
                : 'text-neutral-500 hover:text-neutral-300'
              }`}
            onClick={() => setActiveTab('limited')}
          >
            02 // Limited Edition
          </button>
        </div>

        {/* Open Edition Section */}
        {activeTab === 'open' && (
          <section id="open-edition" className="space-y-6">
            <div className="space-y-1 text-center">
              <h2 className="text-2xl font-light text-black dark:text-white">Open Edition • 5 × 7</h2>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                Affordable 5×7" prints on archival paper. Each request is handled directly.
              </p>
            </div>
            <div className="mt-8">
              {/* Display the same images from limited edition but without pricing */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product) => {
                  const details = extractProductDetails(product.description);
                  return (
                    <div key={product.handle} className="group overflow-hidden border border-white/5 bg-white/[0.02] hover:border-[#7ec832]/30 transition-all duration-500">
                      <div className="aspect-[4/3] relative overflow-hidden">
                        <CmsImage
                          url={product.image}
                          alt={product.title}
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                          onLoad={() => {
                            console.debug('PrintShop: Image loaded successfully', product.image);
                          }}
                          onError={() => {
                            console.warn('PrintShop: Image failed to load', product.image);
                            debugImageProcessing(product.image, 'PrintShop');
                          }}
                        />
                        <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-sm text-[#7ec832] px-2 py-1 text-[10px] font-mono uppercase tracking-widest border border-[#7ec832]/20">
                          Unit // {product.handle.slice(0, 4)}
                        </div>
                      </div>
                      <div className="p-6 space-y-4">
                        <div>
                          <h3 className="font-bold text-xl uppercase tracking-tight text-white mb-1" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>{product.title}</h3>
                          <div className="text-neutral-500 text-[10px] font-mono uppercase tracking-wider flex flex-col gap-1">
                            {details.imageSize && (
                              <span className="flex items-center gap-2">
                                <span className="w-1 h-1 bg-white/20"></span>
                                Size: {details.imageSize}
                              </span>
                            )}
                            {details.paperType && (
                              <span className="flex items-center gap-2">
                                <span className="w-1 h-1 bg-white/20"></span>
                                Material: {details.paperType}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex justify-between items-center pt-2 border-t border-white/5">
                          <span className="font-mono text-[#7ec832] text-lg font-bold">${product.minPrice || 10}</span>
                          <a
                            href={activeTab === 'open' ? createMailtoHref({
                              subject: `Open Edition Request: ${product.title}`,
                              body: `I would like to request an open edition 5x7 print of ${product.title}.`,
                            }) : product.buyUrl}
                            target={activeTab === 'open' ? undefined : "_blank"}
                            rel={activeTab === 'open' ? undefined : "noopener noreferrer"}
                            className="text-[10px] font-mono uppercase tracking-[0.2em] px-5 py-2.5 bg-[#7ec832] text-black font-bold hover:bg-white transition-colors duration-300"
                          >
                            Execute // Acquisition
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-16 max-w-3xl mx-auto text-center">
                <h2 className="text-2xl font-medium mb-4">Open Edition Pricing</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  Affordable 5×7" prints on archival paper with a selection of works from across the portfolio.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-4">
                    <div className="font-medium">1 Print</div>
                    <div className="text-lg font-medium my-1">$10</div>
                    <StripeCheckout
                      priceId="price_open_edition_1"
                      quantity={1}
                      productName="Open Edition Print"
                    />
                  </div>
                  <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-4">
                    <div className="font-medium">4 Prints</div>
                    <div className="text-lg font-medium my-1">$35</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Save $5</div>
                    <StripeCheckout
                      priceId="price_open_edition_4"
                      quantity={4}
                      productName="Open Edition Prints"
                    />
                  </div>
                  <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-4">
                    <div className="font-medium">8 Prints</div>
                    <div className="text-lg font-medium my-1">$70</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Save $10</div>
                    <StripeCheckout
                      priceId="price_open_edition_8"
                      quantity={8}
                      productName="Open Edition Prints"
                    />
                  </div>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400 mt-6">
                  After payment, you'll receive an email with instructions for your print order.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Limited Edition Section */}
        {activeTab === 'limited' && (
          <section className="space-y-6">
            <div className="space-y-1 text-center">
              <h2 className="text-2xl font-light text-black dark:text-white">Limited Edition • Print Innovation Lab</h2>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">Signed, numbered, and shipped flat.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => {
                const details = extractProductDetails(product.description);
                return (
                  <div key={product.handle} className="group rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 hover:shadow-lg transition">
                    <div className="aspect-[4/3] relative overflow-hidden">
                      <CmsImage
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
                      <div className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
                        {details.imageSize && (
                          <span className="block">Size: {details.imageSize}</span>
                        )}
                        {details.editionCopies && (
                          <span className="block">Edition of {details.editionCopies}</span>
                        )}
                        {details.paperType && (
                          <span className="block">{details.paperType}</span>
                        )}
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">${product.minPrice}</span>
                        <a
                          href={product.buyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm px-3 py-1.5 rounded-md bg-black text-white dark:bg-white dark:text-black hover:opacity-80 transition"
                        >
                          Order Print
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="text-center mt-8">
              <a
                href="https://www.printinnovationlab.com/collections/beloveful"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 rounded-md bg-black text-white dark:bg-white dark:text-black hover:opacity-80 transition"
              >
                View All Limited Edition Prints
              </a>
            </div>
          </section>
        )}
      </PageContainer>

      <FooterStrip />
    </div>
  );
}
