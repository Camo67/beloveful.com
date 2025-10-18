import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import { Logo } from "./Logo";
import { SocialIcons } from "./SocialIcons";
import { MobileDrawer } from "./MobileDrawer";
import ShopDropdown from "./ShopDropdown";
import { PortfolioDropdown } from "./PortfolioDropdown";

interface HeaderProps {
  variant: "home" | "default";
}

export function Header({ variant }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Navigation order requested: Home, Portfolio, Shop, Workshops, About, Events, Contact
  const navigationPrimary = [
    { name: "Home", path: "/" },
  ];
  const navigationSecondary = [
    { name: "Workshops", path: "/workshops" },
    { name: "About", path: "/about" },
    { name: "Events", path: "/events" },
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
          {/* Logo centered at top with localized tint */}
          <div className="flex justify-center mb-6">
            <div className="bg-black/10 backdrop-blur-sm rounded-sm px-3 py-2 text-black dark:text-white">
              <Logo variant="auto" />
            </div>
          </div>
          
          {/* Left side navigation with localized tint */}
          <nav className="fixed left-6 top-28 z-40 bg-black/10 backdrop-blur-sm rounded-md p-4">
            <ul className="space-y-3">
              {/* Home first */}
              {navigationPrimary.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="nav-link text-black dark:text-white hover:underline hover:underline-offset-4 hover:decoration-white text-lg"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              {/* Portfolio second */}
              <li>
                <PortfolioDropdown variant="white" />
              </li>
              {/* Shop third */}
              <li className="text-black dark:text-white">
                <ShopDropdown variant="white" />
              </li>
              {/* Then the rest */}
              {navigationSecondary.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="nav-link text-black dark:text-white hover:underline hover:underline-offset-4 hover:decoration-white text-lg"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          {/* Top-right social icons */}
          <div className="fixed right-6 top-6 z-40">
            <SocialIcons iconSize={18} variant="auto" />
          </div>
        </header>

        {/* Mobile Header */}
        <header className="md:hidden fixed inset-x-0 top-0 z-50 bg-black/10 p-3">
          <div className="flex items-center justify-between">
          <div className="flex-1 flex justify-center text-black dark:text-white">
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

  return (
    <>
      {/* Desktop Default Header */}
      <header className="hidden md:block sticky top-0 z-40 nav-bar px-6 py-3">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between">
          {/* Logo top-left */}
          <Logo variant="auto" />
          
          {/* Centered navigation */}
          <nav className="flex-1 flex justify-center">
            <ul className="flex items-center space-x-6">
              {/* Home first */}
              {navigationPrimary.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="nav-link text-black dark:text-white hover:opacity-70 transition-opacity text-lg"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              {/* Portfolio second */}
              <li>
                <PortfolioDropdown />
              </li>
              {/* Shop third */}
              <li>
                <ShopDropdown />
              </li>
              {/* Then the rest */}
              {navigationSecondary.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="nav-link text-black dark:text-white hover:opacity-70 transition-opacity text-lg"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          {/* Top-right social icons */}
          <div className="flex items-center gap-4">
            <SocialIcons />
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
