import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => setMounted(true), []);
  
  if (!mounted) return null;

  const isDark = (resolvedTheme ?? theme) === "dark";
  
  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="h-8 px-3 rounded-md border border-neutral-300 dark:border-neutral-700 text-sm hover:opacity-80 transition-opacity"
      aria-label="Toggle theme"
    >
      {isDark ? "☀️" : "🌙"}
    </button>
  );
}
