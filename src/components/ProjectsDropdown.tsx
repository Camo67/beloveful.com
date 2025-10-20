import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getAllAlbumsSorted } from "@/lib/data";

interface ProjectsDropdownProps {
  variant?: "white" | "auto";
}

export default function ProjectsDropdown({ variant = "auto" }: ProjectsDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const album = useMemo(() => {
    const all = getAllAlbumsSorted();
    return all.find(a => a.slug === 'erasing-borders') || null;
  }, []);

  const thumbs = useMemo(() => (album ? album.images.slice(0, 3) : []), [album]);

  const textColorClass = variant === "white"
    ? "text-white font-bold hover:text-gray-200"
    : "text-black dark:text-white hover:opacity-70";

  const iconColorClass = variant === "white" ? "text-white" : "text-black dark:text-white";

  const hero1 = "Roughly 8 billion human beings are roaming the earth this very moment...";
  const hero2 = "I aim to bring this connection into focus through the images in this collection...";

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <button
          className={`flex items-center space-x-1 nav-link transition-colors duration-200 text-lg ${textColorClass}`}
          style={variant === "white" ? { textShadow: '1px 1px 0 black' } : undefined}
        >
          <span>Projects</span>
          <ChevronDown
            size={16}
            className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''} ${iconColorClass}`}
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[340px] sm:w-[420px] p-3 dropdown-content text-black dark:text-white" align="start">
        <Link to="/projects" onClick={() => setIsOpen(false)} className="block group">
          <div className="flex items-center justify-between mb-3">
            <div className="text-base font-semibold">Erasing Borders</div>
            <div className="text-xs text-accent-neutral group-hover:translate-x-1 transition-transform">View Project →</div>
          </div>
          {/* Thumbnails from Cloudinary (direct URLs) */}
          {thumbs.length > 0 && (
            <div className="grid grid-cols-3 gap-2 mb-3">
              {thumbs.map((img, i) => (
                <div key={i} className="relative aspect-[4/3] overflow-hidden rounded-sm bg-muted">
                  <img
                    src={encodeURI(img.desktop)}
                    alt={`${album?.country || 'Erasing Borders'} thumbnail ${i+1}`}
                    className="w-full h-full object-cover"
                    draggable={false}
                    onContextMenu={(e) => e.preventDefault()}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          )}
          {/* Hero text excerpt */}
          <p className="text-xs text-muted-foreground leading-snug line-clamp-3">
            {hero1} {hero2}
          </p>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
