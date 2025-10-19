import { Link } from "react-router-dom";

interface LogoProps {
  variant?: "black" | "white" | "auto";
  className?: string;
}

// Local logo assets from public directory
const LOGO_BLACK = "/Website beloveful.com/Logo/Beloveful black transparent.png";
const LOGO_WHITE = "/Website beloveful.com/Logo/belovefullogowhite.png";

export function Logo({ variant = "auto", className = "" }: LogoProps) {
  if (variant === "auto") {
    return (
      <Link to="/" className={`logo ${className}`}>
        <div className="inline-block logo-size">
          {/* Light mode: black logo */}
          <img
            src={LOGO_BLACK}
            alt="Beloveful Photography"
            className="block dark:hidden select-none"
            style={{ width: "auto", height: "auto", maxWidth: "100%" }}
            draggable={false}
          />
          {/* Dark mode: white logo */}
          <img
            src={LOGO_WHITE}
            alt="Beloveful Photography"
            className="hidden dark:block select-none"
            style={{ width: "auto", height: "auto", maxWidth: "100%" }}
            draggable={false}
          />
        </div>
      </Link>
    );
  }

  const src = variant === "white" ? LOGO_WHITE : LOGO_BLACK;
  return (
    <Link to="/" className={`logo ${className}`}>
      <div className="inline-block logo-size">
        <img
          src={src}
          alt="Beloveful Photography"
          className="block select-none"
          style={{ width: "auto", height: "auto", maxWidth: "100%" }}
          draggable={false}
        />
      </div>
    </Link>
  );
}
