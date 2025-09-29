import { X } from "lucide-react";
import { Link } from "react-router-dom";
import { SocialIcons } from "./SocialIcons";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  const navigationLinks = [
    { name: "Home", path: "/" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Print Shop", path: "/print-shop" },
    { name: "Workshops", path: "/workshops" },
    { name: "About", path: "/about" }
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
                    to={link.name === "Print Shop" ? "https://www.printinnovationlab.com/collections/beloveful" : link.path}
                    target={link.name === "Print Shop" ? "_blank" : undefined}
                    rel={link.name === "Print Shop" ? "noopener noreferrer" : undefined}
                    className="text-xl text-black transition-opacity duration-300 hover:opacity-60"
                    onClick={onClose}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
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