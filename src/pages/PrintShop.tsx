import { Header } from "@/components/Header";
import FooterStrip from "@/components/FooterStrip";
import PageContainer from "@/components/PageContainer";
import { createProxiedImageUrl, debugImageProcessing } from "@/lib/images";
import printlabData from "@/lib/printlab.json";
import { CloudImage } from "@/components/CloudImage";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import StripeCheckout from "@/components/StripeCheckout";

export default function PrintShop() {
  const products = printlabData.products || [];
  const [activeTab, setActiveTab] = useState<'open' | 'limited'>('open');

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
    <div className="min-h-screen">
      <Header variant="default" />

      <PageContainer className="space-y-16">
        <div className="text-center space-y-3">
          <p className="text-sm uppercase tracking-[0.35em] text-muted-foreground">Prints</p>
          <h1 className="text-4xl md:text-5xl font-light text-black dark:text-white">Print Shop</h1>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Choose between open edition prints and limited edition collections.
          </p>
          <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-500">
            Synced {new Date().toLocaleDateString()} · {products.length} limited editions
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 dark:border-gray-800">
          <button
            className={`py-2 px-4 font-medium text-sm ${
              activeTab === 'open'
                ? 'border-b-2 border-black dark:border-white text-black dark:text-white'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('open')}
          >
            Open Edition (5 × 7)
          </button>
          <button
            className={`py-2 px-4 font-medium text-sm ${
              activeTab === 'limited'
                ? 'border-b-2 border-black dark:border-white text-black dark:text-white'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('limited')}
          >
            Limited Edition
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
                        <div className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
                          {details.imageSize && (
                            <span className="block">Size: {details.imageSize}</span>
                          )}
                          {details.paperType && (
                            <span className="block">{details.paperType}</span>
                          )}
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-medium">From $10</span>
                          <a
                            href={`mailto:prints@beloveful.com?subject=Open Edition Request: ${product.title}&body=I would like to request an open edition 5x7 print of ${product.title}.`}
                            className="text-sm px-3 py-1.5 rounded-md bg-black text-white dark:bg-white dark:text-black hover:opacity-80 transition"
                          >
                            Request Print
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