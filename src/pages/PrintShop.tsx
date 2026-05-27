import { Header } from "@/components/Header";
import FooterStrip from "@/components/FooterStrip";
import PageContainer from "@/components/PageContainer";
import { debugImageProcessing } from "@/lib/images";
import printlabData from "@/lib/printlab.json";
import { CmsImage } from "@/components/CmsImage.tsx";
import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import StripeCheckout from "@/components/StripeCheckout";
import { createMailtoHref } from "@/lib/contact";

type PrintVariant = {
  id: number | string;
  title: string;
  price: number;
  available?: boolean;
  checkoutUrl: string;
};

type PrintProduct = {
  id: number | string;
  title: string;
  handle: string;
  description: string;
  image: string;
  images?: string[];
  minPrice: number;
  vendor?: string;
  tags?: string[];
  variants?: PrintVariant[];
  buyUrl: string;
  updatedAt?: string | null;
};

type PrintCatalogueResponse = {
  count: number;
  syncedAt: string;
  products: PrintProduct[];
};

const fallbackLimitedProducts = (printlabData.products || []) as PrintProduct[];
const OPEN_EDITION_SHOP_URL = "https://belovefulshop.square.site/";

function money(value?: number) {
  if (!Number.isFinite(value)) return "$0";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: value % 1 === 0 ? 0 : 2,
  }).format(value);
}

export default function PrintShop() {
  const openProducts = fallbackLimitedProducts;
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<"open" | "limited">("open");
  const [limitedProducts, setLimitedProducts] = useState<PrintProduct[]>(fallbackLimitedProducts);
  const [limitedStatus, setLimitedStatus] = useState<"loading" | "ready" | "error">("loading");
  const [limitedSyncedAt, setLimitedSyncedAt] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<PrintProduct | null>(null);
  const [selectedVariantId, setSelectedVariantId] = useState<string>("");

  useEffect(() => {
    if (location.hash === "#limited") {
      setActiveTab("limited");
    } else if (location.hash === "#open" || location.hash === "#open-edition") {
      window.location.replace(OPEN_EDITION_SHOP_URL);
    }
  }, [location.hash]);

  useEffect(() => {
    let canceled = false;

    async function loadLimitedProducts() {
      setLimitedStatus("loading");
      try {
        const response = await fetch("/api/print-innovation/products", {
          headers: { Accept: "application/json" },
        });

        if (!response.ok) throw new Error(`Catalogue request failed: ${response.status}`);

        const data = (await response.json()) as PrintCatalogueResponse;
        if (!Array.isArray(data.products) || data.products.length === 0) {
          throw new Error("Catalogue returned no products");
        }

        if (!canceled) {
          setLimitedProducts(data.products);
          setLimitedSyncedAt(data.syncedAt || new Date().toISOString());
          setLimitedStatus("ready");
        }
      } catch (error) {
        console.warn("PrintShop: using bundled Print Innovations fallback", error);
        if (!canceled) {
          setLimitedProducts(fallbackLimitedProducts);
          setLimitedSyncedAt((printlabData as { lastUpdated?: string }).lastUpdated || null);
          setLimitedStatus("error");
        }
      }
    }

    loadLimitedProducts();
    return () => {
      canceled = true;
    };
  }, []);

  useEffect(() => {
    if (!selectedProduct) return;
    setSelectedVariantId(String(selectedProduct.variants?.[0]?.id || ""));
  }, [selectedProduct]);

  const selectedVariant = useMemo(() => {
    if (!selectedProduct?.variants?.length) return null;
    return (
      selectedProduct.variants.find((variant) => String(variant.id) === selectedVariantId) ||
      selectedProduct.variants[0]
    );
  }, [selectedProduct, selectedVariantId]);

  const extractProductDetails = (description: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(description || "", "text/html");
    const table = doc.querySelector("table");
    const details = {
      paperSize: "",
      imageSize: "",
      editionCopies: "",
      paperType: "",
      paperWeight: "",
      printing: "",
    };

    if (table) {
      const rows = table.querySelectorAll("tr");
      if (rows.length >= 2) {
        const dataCells = rows[1].querySelectorAll("td");
        if (dataCells.length >= 3) {
          details.paperSize = dataCells[0]?.textContent?.trim() || "";
          details.imageSize = dataCells[1]?.textContent?.trim() || "";
          details.editionCopies = dataCells[2]?.textContent?.trim() || "";
        }
      }
    }

    doc.querySelectorAll("p").forEach((p) => {
      const text = p.textContent || "";
      if (text.includes("Paper type:")) {
        details.paperType = text.replace("Paper type:", "").trim();
      } else if (text.includes("Paper Weight:")) {
        details.paperWeight = text.replace("Paper Weight:", "").trim();
      } else if (text.includes("Printing:")) {
        details.printing = text.replace("Printing:", "").trim();
      }
    });

    return details;
  };

  const limitedSyncedLabel = limitedSyncedAt
    ? new Date(limitedSyncedAt).toLocaleDateString()
    : new Date().toLocaleDateString();

  const selectedDetails = selectedProduct
    ? extractProductDetails(selectedProduct.description)
    : null;
  const selectedCheckoutUrl = selectedVariant?.checkoutUrl || selectedProduct?.buyUrl || "#";
  const isLimitedView = activeTab === "limited";

  return (
    <div
      className={`min-h-screen text-white ${
        isLimitedView
          ? "bg-black selection:bg-white selection:text-black"
          : "bg-[#0d0f0a] selection:bg-[#7ec832] selection:text-black"
      }`}
    >
      <Header variant="default" />

      <PageContainer className="space-y-16">
        <div className="text-center space-y-4">
          <p
            className={`text-sm uppercase tracking-[0.35em] ${
              isLimitedView ? "text-neutral-500" : "text-[#7ec832]"
            }`}
          >
            {isLimitedView ? "Gallery // Limited Editions" : "Mission // Prints"}
          </p>
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-white">
            {isLimitedView ? (
              <>Limited <span className="text-white">Edition</span></>
            ) : (
              <>Print <span className="text-[#7ec832]">Shop</span></>
            )}
          </h1>
          <p className="text-neutral-400 max-w-2xl mx-auto text-lg leading-relaxed">
            {isLimitedView
              ? "Museum-quality fine art prints, editioned and fulfilled through Print Innovation Lab."
              : "Tactical precision in every frame. Choose between museum-quality limited editions or high-fidelity open edition prints."}
          </p>
          <div className="flex items-center justify-center gap-4 text-xs text-neutral-500 uppercase tracking-[0.2em]">
            <span>Synced: {activeTab === "limited" ? limitedSyncedLabel : new Date().toLocaleDateString()}</span>
            <span className={`w-1 h-1 rounded-full ${isLimitedView ? "bg-neutral-500" : "bg-[#7ec832]"}`}></span>
            <span>Inventory: {activeTab === "limited" ? limitedProducts.length : openProducts.length} active</span>
          </div>
        </div>

        <div className="flex border-b border-white/5">
          <button
            className={`py-4 px-8 text-sm uppercase tracking-[0.18em] transition-all duration-300 relative ${activeTab === "open"
              ? "text-[#7ec832] border-b-2 border-[#7ec832]"
              : "text-neutral-500 hover:text-neutral-300"
              }`}
            onClick={() => setActiveTab("open")}
          >
            01 // Open Edition
          </button>
          <button
            className={`py-4 px-8 text-sm uppercase tracking-[0.18em] transition-all duration-300 relative ${activeTab === "limited"
              ? "text-white border-b-2 border-white"
              : "text-neutral-500 hover:text-neutral-300"
              }`}
            onClick={() => setActiveTab("limited")}
          >
            02 // Limited Edition
          </button>
        </div>

        {activeTab === "open" && (
          <section id="open" className="space-y-6">
            <span id="open-edition" className="sr-only" aria-hidden="true" />
            <div className="space-y-1 text-center">
              <h2 className="text-2xl font-light text-white">Open Edition - 5 x 7</h2>
              <p className="text-sm text-neutral-400">
                Affordable 5x7" prints on archival paper. Each request is handled directly.
              </p>
            </div>
            <div className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {openProducts.map((product) => {
                  const details = extractProductDetails(product.description);
                  return (
                    <div key={product.handle} className="group overflow-hidden border border-white/5 bg-white/[0.02] hover:border-[#7ec832]/30 transition-all duration-500">
                      <div className="aspect-[4/3] relative overflow-hidden">
                        <CmsImage
                          url={product.image}
                          alt={product.title}
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                          onError={() => {
                            console.warn("PrintShop: Image failed to load", product.image);
                            debugImageProcessing(product.image, "PrintShop");
                          }}
                        />
                        <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-sm text-[#7ec832] px-2 py-1 text-xs uppercase tracking-[0.18em] border border-[#7ec832]/20">
                          Unit // {product.handle.slice(0, 4)}
                        </div>
                      </div>
                      <div className="p-6 space-y-4">
                        <div>
                          <h3 className="font-semibold text-xl tracking-tight text-white mb-1">{product.title}</h3>
                          <div className="text-neutral-500 text-xs uppercase tracking-[0.12em] flex flex-col gap-1">
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
                          <span className="text-[#7ec832] text-lg font-semibold">{money(product.minPrice || 10)}</span>
                          <a
                            href={createMailtoHref({
                              subject: `Open Edition Request: ${product.title}`,
                              body: `I would like to request an open edition 5x7 print of ${product.title}.`,
                            })}
                            className="text-xs uppercase tracking-[0.16em] px-5 py-2.5 bg-[#7ec832] text-black font-semibold hover:bg-white transition-colors duration-300"
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
                <p className="text-gray-300 mb-6">
                  Affordable 5x7" prints on archival paper with a selection of works from across the portfolio.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <div className="border border-gray-800 rounded-lg p-4">
                    <div className="font-medium">1 Print</div>
                    <div className="text-lg font-medium my-1">$10</div>
                    <StripeCheckout priceId="price_open_edition_1" quantity={1} productName="Open Edition Print" />
                  </div>
                  <div className="border border-gray-800 rounded-lg p-4">
                    <div className="font-medium">4 Prints</div>
                    <div className="text-lg font-medium my-1">$35</div>
                    <div className="text-xs text-gray-400">Save $5</div>
                    <StripeCheckout priceId="price_open_edition_4" quantity={4} productName="Open Edition Prints" />
                  </div>
                  <div className="border border-gray-800 rounded-lg p-4">
                    <div className="font-medium">8 Prints</div>
                    <div className="text-lg font-medium my-1">$70</div>
                    <div className="text-xs text-gray-400">Save $10</div>
                    <StripeCheckout priceId="price_open_edition_8" quantity={8} productName="Open Edition Prints" />
                  </div>
                </div>

                <p className="text-sm text-gray-400 mt-6">
                  After payment, you will receive an email with instructions for your print order.
                </p>
              </div>
            </div>
          </section>
        )}

        {activeTab === "limited" && (
          <section id="limited" className="space-y-6">
            <div className="space-y-1 text-center">
              <h2 className="text-2xl font-light text-white">Limited Edition - Print Innovation Lab</h2>
              <p className="text-sm text-neutral-400">
                Browse the live Print Innovations catalogue here on Beloveful. Checkout opens only after a print is selected.
              </p>
              {limitedStatus === "loading" && (
                <p className="text-xs uppercase tracking-[0.18em] text-neutral-500">Syncing live catalogue...</p>
              )}
              {limitedStatus === "error" && (
                <p className="text-xs uppercase tracking-[0.18em] text-neutral-500">
                  Live sync unavailable; showing the last bundled catalogue.
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {limitedProducts.map((product) => {
                const details = extractProductDetails(product.description);
                return (
                  <article key={product.handle} className="group overflow-hidden border border-white/10 bg-[#111] hover:border-white/35 transition-all duration-500">
                    <button
                      type="button"
                      className="block w-full text-left"
                      onClick={() => setSelectedProduct(product)}
                    >
                      <div className="aspect-[4/3] relative overflow-hidden">
                        <CmsImage
                          url={product.image}
                          alt={product.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          onError={() => {
                            console.warn("PrintShop: Image failed to load", product.image);
                            debugImageProcessing(product.image, "PrintShop");
                          }}
                        />
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                          <span className="text-xs uppercase tracking-[0.16em] text-white/80">
                            View details
                          </span>
                        </div>
                      </div>
                    </button>
                    <div className="p-5 space-y-4">
                      <button type="button" className="text-left" onClick={() => setSelectedProduct(product)}>
                        <h3 className="font-semibold text-xl tracking-tight text-white mb-1">
                          {product.title}
                        </h3>
                      </button>
                      <div className="text-neutral-400 text-sm line-clamp-3">
                        {details.imageSize && <span className="block">Size: {details.imageSize}</span>}
                        {details.editionCopies && <span className="block">Edition of {details.editionCopies}</span>}
                        {details.paperType && <span className="block">{details.paperType}</span>}
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t border-white/10">
                        <span className="text-white text-lg font-medium">From {money(product.minPrice)}</span>
                        <button
                          type="button"
                          onClick={() => setSelectedProduct(product)}
                          className="text-xs uppercase tracking-[0.16em] px-4 py-2 border border-white/20 text-white hover:bg-white hover:text-black transition-colors duration-300"
                        >
                          Select Print
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        )}
      </PageContainer>

      {selectedProduct && selectedDetails && (
        <div className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-sm p-4 md:p-8 overflow-y-auto" role="dialog" aria-modal="true">
          <div className="mx-auto max-w-6xl border border-white/10 bg-[#0d0f0a]">
            <div className="grid lg:grid-cols-[1.2fr_0.8fr]">
              <div className="bg-black">
                <CmsImage
                  url={selectedProduct.images?.[0] || selectedProduct.image}
                  alt={selectedProduct.title}
                  className="w-full h-full min-h-[320px] max-h-[78vh] object-contain"
                />
              </div>
              <div className="p-6 md:p-8 space-y-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">Limited Edition</p>
                    <h2 className="mt-2 text-3xl md:text-4xl font-semibold tracking-tight text-white">
                      {selectedProduct.title}
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedProduct(null)}
                    className="h-10 w-10 border border-white/15 text-white hover:bg-white hover:text-black transition"
                    aria-label="Close product details"
                  >
                    X
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm text-neutral-300">
                  {selectedDetails.paperSize && (
                    <div className="border border-white/10 p-3">
                      <div className="text-xs uppercase tracking-[0.16em] text-neutral-500">Paper</div>
                      {selectedDetails.paperSize}
                    </div>
                  )}
                  {selectedDetails.imageSize && (
                    <div className="border border-white/10 p-3">
                      <div className="text-xs uppercase tracking-[0.16em] text-neutral-500">Image</div>
                      {selectedDetails.imageSize}
                    </div>
                  )}
                  {selectedDetails.editionCopies && (
                    <div className="border border-white/10 p-3">
                      <div className="text-xs uppercase tracking-[0.16em] text-neutral-500">Edition</div>
                      {selectedDetails.editionCopies}
                    </div>
                  )}
                  {selectedDetails.printing && (
                    <div className="border border-white/10 p-3">
                      <div className="text-xs uppercase tracking-[0.16em] text-neutral-500">Printing</div>
                      {selectedDetails.printing}
                    </div>
                  )}
                </div>

                {selectedDetails.paperType && (
                  <p className="text-sm leading-6 text-neutral-400">{selectedDetails.paperType}</p>
                )}

                {selectedProduct.variants?.length ? (
                  <div className="space-y-3">
                    <label htmlFor="limited-print-size" className="text-xs uppercase tracking-[0.16em] text-neutral-500">
                      Print Size
                    </label>
                    <select
                      id="limited-print-size"
                      value={selectedVariantId}
                      onChange={(event) => setSelectedVariantId(event.target.value)}
                      className="w-full bg-black border border-white/15 px-4 py-3 text-white focus:border-white/60 outline-none"
                    >
                      {selectedProduct.variants.map((variant) => (
                        <option key={variant.id} value={variant.id}>
                          {variant.title} - {money(variant.price)}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : null}

                <a
                  href={selectedCheckoutUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center bg-white px-6 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-black hover:bg-neutral-300 transition"
                >
                  Buy / Order Print
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      <FooterStrip />
    </div>
  );
}
