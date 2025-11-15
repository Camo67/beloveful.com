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
  navStyle?: "standard" | "caps";
}

export function Header({ variant, fullWidth = false, navStyle = "standard" }: HeaderProps) {
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
        <header className="hidden md:block fixed inset-x-0 top-0 z-50 p-4 bg-transparent">
          <div className="relative">
            {/* Centered logo */}
            <div className="flex justify-center mb-3">
              <div className="text-white">
                <Logo variant="white" />
              </div>
            </div>

            {/* Social icons pinned to the top-right corner */}
            <div className="absolute top-2 right-4 z-50">
              <SocialIcons variant="white" />
            </div>
          </div>

          {/* Centered navigation */}
          <nav className="flex justify-center z-50 p-0">
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
        <header className="md:hidden fixed z-50 bg-transparent backdrop-blur-md inset-x-0 top-0">
          <div className="flex items-center justify-between h-16 px-4">
            <div className="flex items-center">
              <Link to="/" className="text-white">
                <Logo variant="white" />
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
  const navTextVariantClass =
    navStyle === "caps"
      ? "uppercase tracking-[0.45em] text-xs font-semibold font-serif"
      : "font-medium";

  const navSpacingClass = navStyle === "caps" ? "-mt-10 md:-mt-12" : "";

  const getNavLinkClass = (path: string) => {
    const colorClass = isActive(path)
      ? "text-black dark:text-white underline"
      : "text-gray-600 dark:text-gray-400";
    return `nav-link hover:underline hover:underline-offset-4 ${navTextVariantClass} ${colorClass}`;
  };
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
          <nav className={`flex justify-center z-50 p-0 ${navSpacingClass}`}>
            <ul className="flex space-x-6 items-center">
              {/* Home */}
              <li>
                <Link
                  to="/"
                  className={getNavLinkClass("/")}
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
                  className={getNavLinkClass("/workshops")}
                >
                  Workshops
                </Link>
              </li>
              
              {/* Events */}
              <li>
                <Link
                  to="/events"
                  className={getNavLinkClass("/events")}
                >
                  Events
                </Link>
              </li>
              
              {/* About */}
              <li>
                <Link
                  to="/about"
                  className={getNavLinkClass("/about")}
                >
                  About
                </Link>
              </li>
              
              {/* Contact */}
              <li>
                <Link
                  to="/contact"
                  className={getNavLinkClass("/contact")}
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
                <Logo variant="auto" />
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
