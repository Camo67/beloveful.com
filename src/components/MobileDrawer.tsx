import { X, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { SocialIcons } from "./SocialIcons";
import { useMemo, useState } from "react";
import { getAllAlbumsSorted } from "@/lib/data";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  const [shopOpen, setShopOpen] = useState(false);
  const [portfolioOpen, setPortfolioOpen] = useState(false);
  
  // Navigation order: Home, Projects, Workshops, Events, About, Contact
  const navigationLinks = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "Workshops", path: "/workshops" },
    { name: "Events", path: "/events" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];
  
  const albums = getAllAlbumsSorted();
  
  // Desired region order and grouping
  const orderedRegions = useMemo(
    () => [
      "Africa",
      "Asia",
      "Middle East",
      "South America",
      "North America",
      "Europe",
      "Oceania",
    ],
    []
  );

  // Group albums by region and sort countries within each region
  const albumsByRegion = useMemo(() => {
    const filtered = albums.filter(album => album.region !== "Erasing Borders");
    const grouped = filtered.reduce((acc, album) => {
      if (!acc[album.region]) acc[album.region] = [] as typeof albums;
      acc[album.region].push(album);
      return acc;
    }, {} as Record<string, typeof albums>);

    for (const key of Object.keys(grouped)) {
      grouped[key] = grouped[key].slice().sort((a, b) => a.country.localeCompare(b.country));
    }
    return grouped;
  }, [albums]);


  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50"
          onClick={onClose}
        />
      )}
      
      {/* Drawer */}
      <div className={`mobile-drawer ${isOpen ? "open" : "closed"}`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-neutral-800">
            <span className="text-lg font-medium text-black dark:text-white">Menu</span>
            <button
              onClick={onClose}
              className="p-2 text-black dark:text-white"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 px-4 py-6">
            <ul className="space-y-6">
              {navigationLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-xl text-black dark:text-white hover:underline hover:underline-offset-4 hover:decoration-white focus-visible:underline focus-visible:decoration-white transition-opacity duration-300"
                    onClick={onClose}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              
              <li>
                <button
                  onClick={() => setPortfolioOpen(!portfolioOpen)}
                  className="flex items-center gap-2 text-xl text-black dark:text-white hover:underline hover:underline-offset-4 hover:decoration-white transition-opacity duration-300"
                >
                  Travel Portfolio
                  <ChevronDown
                    size={20}
                    className={`transition-transform ${portfolioOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {portfolioOpen && (
                  <ul className="mt-3 ml-4 space-y-3 max-h-64 overflow-y-auto" role="listbox" aria-label="Portfolio Countries">
                    <li>
                      <Link
                        to="/portfolio"
                        className="text-lg text-gray-600 dark:text-gray-400 hover:underline hover:underline-offset-4 hover:decoration-white transition-opacity font-medium"
                        onClick={onClose}
                      >
                        All Regions
                      </Link>
                    </li>
                    {orderedRegions.map((region) => (
                      <li key={region}>
                        <div className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                          {region}
                        </div>
                        <ul className="space-y-2 ml-2">
                          {(albumsByRegion[region] || []).map((album) => (
                            <li key={album.slug}>
                              <Link
                                to={`/${album.region.toLowerCase().replace(/[^a-z]/g, "")}/${album.slug}`}
                                className="text-base text-gray-600 dark:text-gray-400 hover:underline hover:underline-offset-4 hover:decoration-white transition-opacity"
                                onClick={onClose}
                              >
                                {album.country}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul>
                )}
              </li>

              <li>
                <button
                  onClick={() => setShopOpen(!shopOpen)}
                  className="flex items-center gap-2 text-xl text-black dark:text-white hover:underline hover:underline-offset-4 hover:decoration-white transition-opacity duration-300"
                >
                  Shop
                  <ChevronDown
                    size={20}
                    className={`transition-transform ${shopOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {shopOpen && (
                  <ul className="mt-3 ml-4 space-y-3">
                    <li>
                      <Link
                        to="/open-edition"
                        className="text-lg text-gray-600 dark:text-gray-400 hover:underline hover:underline-offset-4 hover:decoration-white transition-opacity"
                        onClick={onClose}
                      >
                        Open Edition
                      </Link>
                    </li>
                    <li>
                      <a
                        href="https://www.printinnovationlab.com/collections/beloveful"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg text-gray-600 dark:text-gray-400 hover:underline hover:underline-offset-4 hover:decoration-white transition-opacity"
                        onClick={onClose}
                      >
                        Limited Collection
                      </a>
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          </nav>
          
          {/* Footer */}
          <div className="p-4 border-t border-gray-100 dark:border-neutral-800">
            <div className="flex items-center justify-between">
              <SocialIcons />
              <a
                href="https://lb.benchmarkemail.com//listbuilder/signupnew?IkfHTmyPVq92wBnn4lX%252FTf5pwVnAjsSIeL8KRSOgMpXtO5iNRn8gS049TyW7spdJ"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-sm px-4 py-2"
                onClick={onClose}
              >
                Join Newsletter
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
