import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

interface ShopDropdownProps {
  variant?: "auto" | "white";
}

export default function ShopDropdown({ variant = "auto" }: ShopDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className={`nav-link transition-opacity text-lg ${
          variant === "white" 
            ? "text-white font-bold hover:text-gray-200" 
            : "font-medium text-black dark:text-white hover:opacity-70"
        }`}
        style={variant === "white" ? { textShadow: '1px 1px 0 black' } : undefined}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        Shop ▾
      </button>

      {open && (
        <div
          role="menu"
          className="absolute left-0 z-50 mt-2 min-w-56 rounded-lg border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 shadow-lg"
        >
          <Link
            role="menuitem"
            to="/open-edition"
            className="block px-4 py-3 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors"
            onClick={() => setOpen(false)}
          >
            Open Edition
          </Link>
          <a
            role="menuitem"
            href="https://www.printinnovationlab.com/collections/beloveful"
            target="_blank"
            rel="noopener noreferrer"
            className="block px-4 py-3 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors"
          >
            Limited Collection
          </a>
        </div>
      )}
    </div>
  );
}
