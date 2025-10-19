"use client";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Instagram, Facebook, ExternalLink } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const NEWSLETTER_URL =
  "https://www.beloveful.com/sign-up/";

export default function FooterStrip() {
  const [email, setEmail] = useState("");
  const location = useLocation();

  // Hide footer on home page
  if (location.pathname === "/") return null;

  return (
    <footer className="w-full border-t border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-950/70 backdrop-blur supports-[backdrop-filter]:backdrop-blur">
      <div className="mx-auto flex flex-wrap items-center gap-3 px-3 py-3 md:px-6">
        {/* newsletter */}
        <form 
          action={NEWSLETTER_URL} 
          method="GET" 
          target="_blank"
          className="flex items-center gap-2"
        >
          <input
            type="email"
            name="email"
            required
            placeholder="Join newsletter"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-8 w-48 md:w-64 rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 text-sm text-black dark:text-white placeholder:text-neutral-500 dark:placeholder:text-neutral-400"
          />
          <button 
            type="submit"
            className="h-8 rounded-md border border-neutral-900 dark:border-neutral-200 px-3 text-sm text-black dark:text-white hover:bg-neutral-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition"
          >
            Join
          </button>
        </form>

        {/* Theme toggle next to newsletter */}
        <ThemeToggle />

        {/* Contact & Privacy - Center */}
        <div className="flex-1 flex justify-center items-center gap-4">
          <a 
            href="/contact" 
            className="text-xs text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors underline-offset-2 hover:underline"
          >
            Contact
          </a>
          <span className="text-xs text-neutral-400">•</span>
          <a 
            href="/faq#privacy" 
            className="text-xs text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors underline-offset-2 hover:underline"
          >
            Privacy
          </a>
        </div>

        <div className="flex items-center gap-3">
          {/* socials with icons */}
          <a 
            href="https://www.instagram.com/beloveful/#" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-black dark:text-white hover:opacity-75 transition-opacity" 
            aria-label="Instagram"
          >
            <Instagram size={20} />
          </a>
          <a 
            href="https://www.facebook.com/BelovefulPhotography" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-black dark:text-white hover:opacity-75 transition-opacity" 
            aria-label="Facebook"
          >
            <Facebook size={20} />
          </a>
          <a 
            href="https://linktr.ee/beloveful?lt_utm_source=lt_share_link#74152480" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-black dark:text-white hover:opacity-75 transition-opacity" 
            aria-label="Linktree"
          >
            <ExternalLink size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
