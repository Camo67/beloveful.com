import { Link } from "react-router-dom";

interface LogoProps {
  variant?: "black" | "white" | "auto";
  className?: string;
}

// Original logo assets (Cloudinary) – do not stretch; keep intrinsic size
const LOGO_BLACK = "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620506/beloveful-logo-black_rwsx2j.png";
const LOGO_WHITE = "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620507/beloveful-logo-white_q5prnb.png";

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
