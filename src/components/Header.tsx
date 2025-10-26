import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import { Logo } from "./Logo";
import { SocialIcons } from "./SocialIcons";
import { MobileDrawer } from "./MobileDrawer";
import MobileMap from "./MobileMap";
import ShopDropdown from "./ShopDropdown";
import { PortfolioDropdown } from "./PortfolioDropdown";

interface HeaderProps {
  variant: "home" | "default";
  fullWidth?: boolean; // allow full-width header container on desktop default variant
}

export function Header({ variant, fullWidth = false }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  if (variant === "home") {
    return (
      <>
        {/* Mobile Map - Behind the drawer */}
        <MobileMap isVisible={mobileMenuOpen} />
        
        {/* Desktop Home Header */}
        <header className="hidden md:block fixed inset-x-0 top-0 z-40 p-4 bg-transparent">
          {/* Centered logo */}
          <div className="flex justify-center mb-3">
            <div className="text-white">
              <Logo variant="white" />
            </div>
          </div>
          
          {/* Top bar with social icons in the top-right corner */}
          <div className="flex justify-between items-center mb-3">
            <div></div> {/* Empty spacer for alignment */}
            
            {/* Social icons in the top-right corner */}
            <div className="z-40">
              <SocialIcons variant="white" />
            </div>
          </div>
          
          {/* Centered navigation */}
          <nav className="flex justify-center z-40 p-0">
            <ul className="flex space-x-6 items-center">
              {/* Home */}
              <li>
                <Link
                  to="/"
                  className="nav-link text-white font-bold hover:underline hover:underline-offset-4 hover:decoration-white text-lg"
                  style={{ textShadow: '1px 1px 0 black' }}
                >
                  Home
                </Link>
              </li>
              {/* Portfolio */}
              <li>
                <PortfolioDropdown variant="white" />
              </li>
              {/* Shop */}
              <li>
                <ShopDropdown variant="white" />
              </li>
              {/* Workshops */}
              <li>
                <Link
                  to="/workshops"
                  className="nav-link text-white font-bold hover:underline hover:underline-offset-4 hover:decoration-white text-lg"
                  style={{ textShadow: '1px 1px 0 black' }}
                >
                  Workshops
                </Link>
              </li>
              {/* Events */}
              <li>
                <Link
                  to="/events"
                  className="nav-link text-white font-bold hover:underline hover:underline-offset-4 hover:decoration-white text-lg"
                  style={{ textShadow: '1px 1px 0 black' }}
                >
                  Events
                </Link>
              </li>
              {/* About */}
              <li>
                <Link
                  to="/about"
                  className="nav-link text-white font-bold hover:underline hover:underline-offset-4 hover:decoration-white text-lg"
                  style={{ textShadow: '1px 1px 0 black' }}
                >
                  About
                </Link>
              </li>
              {/* Contact */}
              <li>
                <Link
                  to="/contact"
                  className="nav-link text-white font-bold hover:underline hover:underline-offset-4 hover:decoration-white text-lg"
                  style={{ textShadow: '1px 1px 0 black' }}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </header>

        {/* Mobile Home Header */}
        <header className="md:hidden relative z-50 bg-transparent backdrop-blur-md">
          <div className="flex items-center justify-between h-16 px-4">
            <div className="flex items-center">
              <Link to="/" className="text-white">
                <Logo variant="white" size="small" />
              </Link>
            </div>
            
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 text-white"
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </header>

        {/* Mobile Drawer */}
        <MobileDrawer isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      </>
    );
  }

  // Default variant (for all other pages)
  return (
    <>
      <header className="sticky top-0 z-50 bg-transparent backdrop-blur-md border-b-0">
        {/* Desktop Navigation */}
        <div className="hidden md:block px-4">
          {/* Centered logo */}
          <div className="flex justify-center mb-3">
            <div className="text-black dark:text-white">
              <Logo variant="auto" />
            </div>
          </div>
          
          {/* Centered navigation */}
          <nav className="flex justify-center z-40 p-0">
            <ul className="flex space-x-6 items-center">
              {/* Home */}
              <li>
                <Link
                  to="/"
                  className={`nav-link font-medium hover:underline hover:underline-offset-4 ${
                    isActive("/") 
                      ? "text-black dark:text-white underline" 
                      : "text-gray-600 dark:text-gray-400"
                  }`}
                >
                  Home
                </Link>
              </li>
              
              {/* Portfolio */}
              <li>
                <PortfolioDropdown variant="auto" />
              </li>
              
              {/* Shop */}
              <li>
                <ShopDropdown variant="auto" />
              </li>
              
              {/* Workshops */}
              <li>
                <Link
                  to="/workshops"
                  className={`nav-link font-medium hover:underline hover:underline-offset-4 ${
                    isActive("/workshops") 
                      ? "text-black dark:text-white underline" 
                      : "text-gray-600 dark:text-gray-400"
                  }`}
                >
                  Workshops
                </Link>
              </li>
              
              {/* Events */}
              <li>
                <Link
                  to="/events"
                  className={`nav-link font-medium hover:underline hover:underline-offset-4 ${
                    isActive("/events") 
                      ? "text-black dark:text-white underline" 
                      : "text-gray-600 dark:text-gray-400"
                  }`}
                >
                  Events
                </Link>
              </li>
              
              {/* About */}
              <li>
                <Link
                  to="/about"
                  className={`nav-link font-medium hover:underline hover:underline-offset-4 ${
                    isActive("/about") 
                      ? "text-black dark:text-white underline" 
                      : "text-gray-600 dark:text-gray-400"
                  }`}
                >
                  About
                </Link>
              </li>
              
              {/* Contact */}
              <li>
                <Link
                  to="/contact"
                  className={`nav-link font-medium hover:underline hover:underline-offset-4 ${
                    isActive("/contact") 
                      ? "text-black dark:text-white underline" 
                      : "text-gray-600 dark:text-gray-400"
                  }`}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        
        <div className="px-4 md:hidden bg-transparent">
          {/* Mobile header with menu button and logo */}
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="text-black dark:text-white">
                <Logo variant="auto" size="small" />
              </Link>
            </div>
            
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 text-gray-600 dark:text-gray-400"
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileDrawer isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
}