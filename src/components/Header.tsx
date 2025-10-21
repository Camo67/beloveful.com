import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import { Logo } from "./Logo";
import { SocialIcons } from "./SocialIcons";
import { MobileDrawer } from "./MobileDrawer";
import ShopDropdown from "./ShopDropdown";
import { TravelPortfolioDropdown } from "./TravelPortfolioDropdown";
import ProjectsDropdown from "./ProjectsDropdown";

interface HeaderProps {
  variant: "home" | "default";
  fullWidth?: boolean; // allow full-width header container on desktop default variant
}

export function Header({ variant, fullWidth = false }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Top-level links (dropdowns rendered explicitly to control order)
  const navigation = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
  { name: "Workshops", path: "/workshops" },
    { name: "About", path: "/about" },
    { name: "Mentorship", path: "/mentorship" },
    { name: "FAQ", path: "/faq" },
    { name: "Print Shop", path: "/print-shop" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  if (variant === "home") {
    return (
      <>
        {/* Desktop Home Header */}
        <header className="hidden md:block fixed inset-x-0 top-0 z-40 p-6">
          {/* Logo centered at top without background */}
          <div className="flex justify-center mb-6">
            <div className="text-white">
              <Logo variant="white" />
            </div>
          </div>
          
          {/* Left side navigation without background */}
          <nav className="fixed left-6 top-28 z-40 p-0">
            <ul className="space-y-3">
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
              {/* Travel Portfolio */}
              <li>
                <TravelPortfolioDropdown variant="white" />
              </li>
              {/* Projects */}
              <li>
                <ProjectsDropdown variant="white" />
              </li>
              {/* Workshops */}
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
              {/* Shop */}
              <li>
                <ShopDropdown variant="white" />
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
          
          {/* Top-right social icons */}
          <div className="fixed right-6 top-6 z-40">
            <SocialIcons iconSize={18} variant="auto" />
          </div>
        </header>

        {/* Mobile Header */}
        <header className="md:hidden fixed inset-x-0 top-0 z-50 p-3">
          <div className="flex items-center justify-between">
            <div className="flex-1 flex justify-center text-white" style={{ textShadow: '1px 1px 0 black' }}>
              <Logo variant="white" />
            </div>
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="text-white p-2 absolute right-4"
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </header>

        {/* Mobile Drawer */}
        <MobileDrawer isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      </>
    );
  }

  return (
    <>
      {/* Desktop Default Header */}
      <header className="hidden md:block sticky top-0 z-40 nav-bar px-6 py-3">
        <div className={`${fullWidth ? "max-w-none w-full" : "max-w-screen-xl mx-auto"} flex items-center justify-between`}>
          {/* Logo in top-left */}
          <div className="flex-shrink-0">
            <Logo variant="auto" />
          </div>
          
          {/* Centered navigation */}
          <nav className="flex justify-center flex-1">
            <ul className="flex items-center space-x-6">
              {/* Home */}
              <li>
                <Link to="/" className="nav-link text-black dark:text-white hover:opacity-70 transition-opacity text-lg">Home</Link>
              </li>
              {/* Travel Portfolio */}
              <li>
                <TravelPortfolioDropdown />
              </li>
              {/* Projects */}
              <li>
                <ProjectsDropdown />
              </li>
              {/* Workshops (simple dropdown with Mentorship) */}
              <li className="relative">
                <div className="group inline-block">
                  <Link to="/workshops" className="nav-link text-black dark:text-white hover:opacity-70 transition-opacity text-lg">Workshops</Link>
                  <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-neutral-950 border border-border rounded-md shadow-md opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto">
                    <ul className="p-2">
                      <li>
                        <Link to="/workshops" className="block px-3 py-2 text-sm text-black dark:text-white hover:bg-muted rounded" >All Workshops</Link>
                      </li>
                      <li>
                        <Link to="/mentorship" className="block px-3 py-2 text-sm text-black dark:text-white hover:bg-muted rounded">Mentorship</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
              {/* Events */}
              <li>
                <Link to="/events" className="nav-link text-black dark:text-white hover:opacity-70 transition-opacity text-lg">Events</Link>
              </li>
              {/* Map */}
              <li>
                <Link to="/map" className="nav-link text-black dark:text-white hover:opacity-70 transition-opacity text-lg">Map</Link>
              </li>
              {/* Mentorship moved into Workshops dropdown */}
              {/* FAQ */}
              <li>
                <Link to="/faq" className="nav-link text-black dark:text-white hover:opacity-70 transition-opacity text-lg">FAQ</Link>
              </li>
              {/* Print Shop */}
              <li>
                <Link to="/print-shop" className="nav-link text-black dark:text-white hover:opacity-70 transition-opacity text-lg">Print Shop</Link>
              </li>
              {/* Shop */}
              <li>
                <ShopDropdown />
              </li>
              {/* About */}
              <li>
                <Link to="/about" className="nav-link text-black dark:text-white hover:opacity-70 transition-opacity text-lg">About</Link>
              </li>
              {/* Contact */}
              <li>
                <Link to="/contact" className="nav-link text-black dark:text-white hover:opacity-70 transition-opacity text-lg">Contact</Link>
              </li>
            </ul>
          </nav>
          
          {/* Social icons in top-right */}
          <div className="flex-shrink-0">
            <SocialIcons iconSize={18} variant="auto" />
          </div>
        </div>
      </header>

      {/* Mobile Header */}
      <header className="md:hidden sticky top-0 z-50 nav-bar p-3">
        <div className="flex items-center justify-between">
          <div className="flex-1 flex justify-center">
            <Logo variant="auto" />
          </div>
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="text-black dark:text-white p-2 absolute right-4"
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileDrawer isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
}
