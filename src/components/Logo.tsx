import { Link } from "react-router-dom";

interface LogoProps {
  variant?: "black" | "white";
  className?: string;
}

export function Logo({ variant = "black", className = "" }: LogoProps) {
  const logoSrc = variant === "white" 
    ? "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620507/beloveful-logo-white_q5prnb.png"
    : "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620506/beloveful-logo-black_rwsx2j.png";

  return (
    <Link to="/" className={`logo ${className}`}>
      <img 
        src={logoSrc} 
        alt="BELOVEFUL Photography" 
        className="h-12 w-auto"
        draggable={false}
      />
    </Link>
  );
}