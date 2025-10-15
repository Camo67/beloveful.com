import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Lightbulb } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const isDark = (resolvedTheme ?? theme) === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
      aria-label="Toggle theme"
      title="Toggle theme"
    >
      <Lightbulb
        size={16}
        className={isDark ? "text-yellow-400" : "text-neutral-700"}
      />
    </button>
  );
}
