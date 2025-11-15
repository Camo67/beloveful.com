import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
      <DropdownMenuContent className="w-[280px] sm:w-[320px] p-3 dropdown-content text-black dark:text-white" align="start">
        <DropdownMenuItem asChild className="px-0 py-2">
          <Link to="/portfolio" onClick={() => setIsOpen(false)} className="text-base font-semibold">
            My Travels
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="px-0 py-2">
          <Link to="/projects" onClick={() => setIsOpen(false)} className="text-base font-semibold">
            Projects
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
