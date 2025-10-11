import { Link } from "react-router-dom";

interface LogoProps {
  variant?: "black" | "white" | "auto";
  className?: string;
}

export function Logo({ variant = "black", className = "" }: LogoProps) {
  const logoSrc = variant === "white" 
    ? "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620507/beloveful-logo-white_q5prnb.png"
    : "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620506/beloveful-logo-black_rwsx2j.png";

  // For auto variant, we'll use CSS to show/hide different logo images
  if (variant === "auto") {
    return (
      <Link to="/" className={`logo ${className}`}>
        {/* Black logo for light mode */}
        <img 
          src="https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620506/beloveful-logo-black_rwsx2j.png" 
          alt="BELOVEFUL Photography" 
          className="h-10 md:h-16 w-auto block dark:hidden"
          draggable={false}
        />
        {/* White logo for dark mode */}
        <img 
          src="https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620507/beloveful-logo-white_q5prnb.png" 
          alt="BELOVEFUL Photography" 
          className="h-10 md:h-16 w-auto hidden dark:block"
          draggable={false}
        />
      </Link>
    );
  }

  return (
    <Link to="/" className={`logo ${className}`}>
      <img 
        src={logoSrc} 
        alt="BELOVEFUL Photography" 
        className="h-10 md:h-16 w-auto"
        draggable={false}
      />
    </Link>
  );
}