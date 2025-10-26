import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { getAllAlbumsSorted } from "@/lib/data";
import type { CountryAlbum } from "@/lib/data";

interface PortfolioDropdownProps {
  variant?: "white" | "auto";
}

export function PortfolioDropdown({ variant = "auto" }: PortfolioDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const textColorClass = variant === "white" 
    ? "text-white font-bold hover:text-gray-200" 
    : "text-black dark:text-white hover:opacity-70";

  const iconColorClass = variant === "white" ? "text-white" : "text-black dark:text-white";

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <button
          className={`flex items-center space-x-1 nav-link transition-colors duration-200 text-lg ${textColorClass}`}
          style={variant === "white" ? { textShadow: '1px 1px 0 black' } : undefined}
        >
          <span>Portfolio</span>
          <ChevronDown
            size={16}
            className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''} ${iconColorClass}`}
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[340px] sm:w-[420px] p-3 dropdown-content text-black dark:text-white" align="start">
        {/* Travel link */}
        <Link to="/portfolio" onClick={() => setIsOpen(false)} className="block group">
          <div className="flex items-center justify-between mb-3">
            <div className="text-base font-semibold">Travel</div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-200 mb-3">
            Explore our collection of travel photography from around the world.
          </p>
        </Link>
        
        <DropdownMenuSeparator />
        
        {/* Projects link */}
        <Link to="/projects" onClick={() => setIsOpen(false)} className="block group">
          <div className="flex items-center justify-between mb-3">
            <div className="text-base font-semibold">Projects</div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-200 mb-3">
            View our documentary and conceptual photography projects.
          </p>
        </Link>
        
      </DropdownMenuContent>
    </DropdownMenu>
  );
}