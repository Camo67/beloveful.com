import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function ShopDropdown() {
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
        className="hover:opacity-70 transition-opacity"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        Shop ▾
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 z-50 mt-2 min-w-56 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-lg"
        >
          <a
            role="menuitem"
            href="https://www.printinnovationlab.com/collections/beloveful"
            target="_blank"
            rel="noopener noreferrer"
            className="block px-4 py-3 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            Limited Edition (External)
          </a>
          <Link
            role="menuitem"
            to="/shop/special"
            className="block px-4 py-3 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            onClick={() => setOpen(false)}
          >
            Special Edition (On-Site)
          </Link>
        </div>
      )}
    </div>
  );
}
