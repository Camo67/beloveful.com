import { useMemo, useState } from "react";
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

  // Desired region display order (exclude "Erasing Borders" from grouped list)
  const orderedRegions = useMemo(
    () => [
      "Africa",
      "Asia",
      "Middle East",
      "South America",
      "North America",
      "Europe",
      "Oceania",
    ],
    []
  );

  // Group albums by region and sort countries within each region
  const albumsByRegion = useMemo(() => {
    const grouped = albums.reduce((acc, album) => {
      if (!acc[album.region]) acc[album.region] = [] as typeof albums;
      acc[album.region].push(album);
      return acc;
    }, {} as Record<string, typeof albums>);

    for (const key of Object.keys(grouped)) {
      grouped[key] = grouped[key].slice().sort((a, b) => a.country.localeCompare(b.country));
    }
    return grouped;
  }, [albums]);

  // Resolve a target for the special "Erasing Borders" link
  const erasingBordersTarget = useMemo(() => {
    const bySlug = albums.find(a => a.slug === "erasing-borders");
    if (bySlug) return bySlug;
    const firstInRegion = albums.find(a => a.region === "Erasing Borders");
    return firstInRegion;
  }, [albums]);

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
      <DropdownMenuContent 
        className="w-64 max-h-96 overflow-y-auto dropdown-content text-black dark:text-white"
        align="start"
      >
        <DropdownMenuItem asChild>
          <Link 
            to="/africa" 
            className="w-full px-2 py-2 font-semibold hover:bg-muted focus-enhanced text-black dark:text-white"
            onClick={() => setIsOpen(false)}
          >
            All Regions
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        
        {orderedRegions.map((region) => (
          <div key={region}>
            <div className="px-2 py-1 text-xs font-semibold text-text-tertiary uppercase tracking-wide">
              {region}
            </div>
            {(albumsByRegion[region] || []).map((album) => (
              <DropdownMenuItem key={album.slug} asChild>
                <Link
                  to={`/${album.region.toLowerCase().replace(/[^a-z]/g, "")}/${album.slug}`}
                  className="w-full px-4 py-2 hover:bg-muted focus-enhanced pl-4 text-black dark:text-white"
                  onClick={() => setIsOpen(false)}
                >
                  {album.country}
                </Link>
              </DropdownMenuItem>
            ))}
          </div>
        ))}

        {erasingBordersTarget && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link
                to={`/${erasingBordersTarget.region.toLowerCase().replace(/[^a-z]/g, "")}/${erasingBordersTarget.slug}`}
                className="w-full px-2 py-2 font-semibold hover:bg-muted focus-enhanced text-black dark:text-white"
                onClick={() => setIsOpen(false)}
              >
                Erasing Borders
              </Link>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
