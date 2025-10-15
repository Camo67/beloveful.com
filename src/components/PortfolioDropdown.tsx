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

interface PortfolioDropdownProps {
  variant?: "white" | "auto";
}

export function PortfolioDropdown({ variant = "auto" }: PortfolioDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const albums = getAllAlbumsSorted();

  // Group albums by region for better organization
  const albumsByRegion = albums.reduce((acc, album) => {
    if (!acc[album.region]) {
      acc[album.region] = [];
    }
    acc[album.region].push(album);
    return acc;
  }, {} as Record<string, typeof albums>);

  const textColorClass = variant === "white" 
    ? "text-white hover:text-gray-200" 
    : "text-black dark:text-white hover:opacity-70";

  const iconColorClass = variant === "white" ? "text-white" : "text-black dark:text-white";

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <button
          className={`flex items-center space-x-1 nav-link transition-colors duration-200 text-lg ${textColorClass}`}
        >
          <span>Portfolio</span>
          <ChevronDown 
            size={16} 
            className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''} ${iconColorClass}`} 
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="w-56 max-h-96 overflow-y-auto dropdown-content text-black dark:text-white"
        align="start"
      >
        <DropdownMenuItem asChild>
          <Link 
            to="/portfolio" 
            className="w-full px-2 py-2 font-semibold hover:bg-muted focus-enhanced text-black dark:text-white"
            onClick={() => setIsOpen(false)}
          >
            All Countries
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        
        {Object.entries(albumsByRegion)
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([region, regionAlbums]) => (
            <div key={region}>
              <div className="px-2 py-1 text-xs font-semibold text-text-tertiary uppercase tracking-wide">
                {region}
              </div>
              {regionAlbums.map((album) => (
                <DropdownMenuItem key={album.slug} asChild>
                  <Link
                    to={`/portfolio/${album.region.toLowerCase().replace(' ', '-')}/${album.slug}`}
                    className="w-full px-4 py-2 hover:bg-muted focus-enhanced pl-4 text-black dark:text-white"
                    onClick={() => setIsOpen(false)}
                  >
                    {album.country}
                  </Link>
                </DropdownMenuItem>
              ))}
            </div>
          ))
        }
      </DropdownMenuContent>
    </DropdownMenu>
  );
}