import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { SocialIcons } from "./SocialIcons";
import { MobileDrawer } from "./MobileDrawer";

interface HeaderProps {
  variant: "home" | "default";
}

export function Header({ variant }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigationLinks = [
    { name: "Home", path: "/" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Print Shop", path: "/print-shop" },
    { name: "Workshops", path: "/workshops" },
    { name: "About", path: "/about" }
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
        <header className="hidden md:block fixed inset-x-0 top-0 z-40 p-8">
          {/* Logo centered at top */}
          <div className="flex justify-center mb-8">
            <Logo variant="white" />
          </div>
          
          {/* Left side navigation */}
          <nav className="fixed left-8 top-32 z-40">
            <ul className="space-y-4">
              {navigationLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.name === "Print Shop" ? "https://www.printinnovationlab.com/collections/beloveful" : link.path}
                    target={link.name === "Print Shop" ? "_blank" : undefined}
                    rel={link.name === "Print Shop" ? "noopener noreferrer" : undefined}
                    className={`nav-link text-white ${isActive(link.path) ? "active" : ""}`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          {/* Top-right social icons */}
          <div className="fixed right-8 top-8 z-40">
            <SocialIcons iconSize={18} />
          </div>
        </header>

        {/* Mobile Header */}
        <header className="md:hidden fixed inset-x-0 top-0 z-50 bg-black bg-opacity-50 p-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="text-white p-2"
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
            <Logo variant="white" />
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
      <header className="hidden md:block sticky top-0 z-40 bg-white border-b border-gray-100 px-8 py-4">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between">
          {/* Logo top-left */}
          <Logo variant="black" />
          
          {/* Centered navigation */}
          <nav className="flex-1 flex justify-center">
            <ul className="flex items-center space-x-8">
              {navigationLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.name === "Print Shop" ? "https://www.printinnovationlab.com/collections/beloveful" : link.path}
                    target={link.name === "Print Shop" ? "_blank" : undefined}
                    rel={link.name === "Print Shop" ? "noopener noreferrer" : undefined}
                    className={`nav-link ${isActive(link.path) ? "active" : ""}`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          {/* Top-right social icons */}
          <SocialIcons />
        </div>
      </header>

      {/* Mobile Header */}
      <header className="md:hidden sticky top-0 z-50 bg-white border-b border-gray-100 p-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="text-black p-2"
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
          <Logo variant="black" />
        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileDrawer isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
}