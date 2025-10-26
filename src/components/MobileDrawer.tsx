import { X, ChevronDown, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { SocialIcons } from "./SocialIcons";
import { useState } from "react";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  const [shopOpen, setShopOpen] = useState(false);
  const [portfolioOpen, setPortfolioOpen] = useState(false);
  
  // Navigation order matching desktop: Home, Portfolio, Shop, Workshops, Events, About, Contact
  const navigationLinks = [
    { name: "Home", path: "/" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Shop", path: "/shop" },
    { name: "Workshops", path: "/workshops" },
    { name: "Events", path: "/events" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1050] md:hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[1000]"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 w-4/5 max-w-sm bg-white dark:bg-black border-l border-gray-200 dark:border-gray-800 z-[1050] overflow-y-auto">
        <div className="flex flex-col h-full">
          {/* Navigation Links */}
          <nav className="flex-1 p-4 pt-8">
            <ul className="space-y-6">
              {/* Home */}
              <li>
                <Link
                  to="/"
                  className="text-xl text-black dark:text-white hover:underline hover:underline-offset-4 hover:decoration-white transition-opacity duration-300"
                  onClick={onClose}
                >
                  Home
                </Link>
              </li>
              
              {/* Portfolio */}
              <li>
                <button
                  onClick={() => setPortfolioOpen(!portfolioOpen)}
                  className="flex items-center gap-2 text-xl text-black dark:text-white hover:underline hover:underline-offset-4 hover:decoration-white transition-opacity duration-300"
                >
                  Portfolio
                  <ChevronDown
                    size={20}
                    className={`transition-transform ${portfolioOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {portfolioOpen && (
                  <ul className="mt-3 ml-4 space-y-3" role="listbox" aria-label="Portfolio options">
                    <li>
                      <Link
                        to="/portfolio"
                        className="text-lg text-gray-600 dark:text-gray-400 hover:underline hover:underline-offset-4 hover:decoration-white transition-opacity font-medium"
                        onClick={onClose}
                      >
                        Travel
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/projects"
                        className="text-lg text-gray-600 dark:text-gray-400 hover:underline hover:underline-offset-4 hover:decoration-white transition-opacity font-medium"
                        onClick={onClose}
                      >
                        Projects
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
              
              {/* Shop */}
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
                        Limited Edition
                      </a>
                    </li>
                  </ul>
                )}
              </li>
              
              {/* Workshops */}
              <li>
                <Link
                  to="/workshops"
                  className="text-xl text-black dark:text-white hover:underline hover:underline-offset-4 hover:decoration-white transition-opacity duration-300"
                  onClick={onClose}
                >
                  Workshops
                </Link>
              </li>
              
              {/* Events */}
              <li>
                <Link
                  to="/events"
                  className="text-xl text-black dark:text-white hover:underline hover:underline-offset-4 hover:decoration-white transition-opacity duration-300"
                  onClick={onClose}
                >
                  Events
                </Link>
              </li>
              
              {/* About */}
              <li>
                <Link
                  to="/about"
                  className="text-xl text-black dark:text-white hover:underline hover:underline-offset-4 hover:decoration-white transition-opacity duration-300"
                  onClick={onClose}
                >
                  About
                </Link>
              </li>
              
              {/* Contact */}
              <li>
                <Link
                  to="/contact"
                  className="text-xl text-black dark:text-white hover:underline hover:underline-offset-4 hover:decoration-white transition-opacity duration-300"
                  onClick={onClose}
                >
                  Contact
                </Link>
              </li>
              
              {/* Basket and Checkout */}
              <li>
                <Link
                  to="/cart"
                  className="flex items-center gap-2 text-xl text-black dark:text-white hover:underline hover:underline-offset-4 hover:decoration-white transition-opacity duration-300"
                  onClick={onClose}
                >
                  <ShoppingCart size={20} />
                  Cart
                </Link>
              </li>
              <li>
                <Link
                  to="/checkout"
                  className="flex items-center gap-2 text-xl text-black dark:text-white hover:underline hover:underline-offset-4 hover:decoration-white transition-opacity duration-300"
                  onClick={onClose}
                >
                  Checkout
                </Link>
              </li>
            </ul>
          </nav>

          {/* Footer - Removed SocialIcons */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-800">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} Beloveful. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}