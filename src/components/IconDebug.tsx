import { Mail, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function IconDebug() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => setMounted(true), []);
  
  if (!mounted) return null;

  const isDark = (resolvedTheme ?? theme) === "dark";
  
  return (
    <div className="fixed top-4 right-4 p-4 bg-white dark:bg-neutral-900 border border-gray-300 dark:border-neutral-700 rounded-lg shadow-lg z-50">
      <h3 className="text-lg font-bold mb-2 text-black dark:text-white">Debug Panel</h3>
      
      <div className="space-y-2 text-sm">
        <p className="text-black dark:text-white">Theme: {theme}</p>
        <p className="text-black dark:text-white">Resolved: {resolvedTheme}</p>
        <p className="text-black dark:text-white">Is Dark: {isDark ? "Yes" : "No"}</p>
      </div>
      
      <div className="mt-4 space-y-2">
        <button
          onClick={() => setTheme("light")}
          className="block w-full px-3 py-1 text-left text-black dark:text-white hover:bg-gray-100 dark:hover:bg-neutral-800"
        >
          <Sun size={16} className="inline mr-2" />
          Light
        </button>
        <button
          onClick={() => setTheme("dark")}
          className="block w-full px-3 py-1 text-left text-black dark:text-white hover:bg-gray-100 dark:hover:bg-neutral-800"
        >
          <Moon size={16} className="inline mr-2" />
          Dark
        </button>
      </div>
      
      <div className="mt-4 border-t border-gray-200 dark:border-neutral-700 pt-4">
        <p className="text-black dark:text-white mb-2">Icon Test:</p>
        <div className="text-black dark:text-white">
          <Mail size={24} />
        </div>
        <div className="text-red-500 mt-2">
          <Mail size={24} />
        </div>
      </div>
    </div>
  );
}