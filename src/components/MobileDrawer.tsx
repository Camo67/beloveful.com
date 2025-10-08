import { X, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { SocialIcons } from "./SocialIcons";
import { useState } from "react";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  const [shopOpen, setShopOpen] = useState(false);
  
  const navigationLinks = [
    { name: "Home", path: "/" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Workshops", path: "/workshops" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" }
  ];

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
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <span className="text-lg font-medium">Menu</span>
            <button
              onClick={onClose}
              className="p-2 text-black"
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
              
              {/* Shop Dropdown */}
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
                      <a
                        href="https://www.printinnovationlab.com/collections/beloveful"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg text-gray-600 dark:text-gray-400 hover:underline hover:underline-offset-4 hover:decoration-white transition-opacity"
                        onClick={onClose}
                      >
                        Limited Edition (External)
                      </a>
                    </li>
                    <li>
                      <Link
                        to="/shop/special"
                        className="text-lg text-gray-600 dark:text-gray-400 hover:underline hover:underline-offset-4 hover:decoration-white transition-opacity"
                        onClick={onClose}
                      >
                        Special Edition (On-Site)
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          </nav>
          
          {/* Footer */}
          <div className="p-4 border-t border-gray-100">
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