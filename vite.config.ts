import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    server: {
      host: "::",
      port: 8080,
      proxy: {
        // Proxy image requests to Bluehost in dev mode
        "/Website beloveful.com": {
          target: "https://beloveful.com",
          changeOrigin: true,
          secure: true,
        },
        // Rewrite /images/* to /Website beloveful.com/* on Bluehost
        "/images": {
          target: "https://beloveful.com",
          changeOrigin: true,
          secure: true,
          rewrite: (path) => `/Website beloveful.com${decodeURIComponent(path).replace(/^\/images/, '')}`,
        },
      },
      watch: {
        // Exclude large directories from being watched to avoid file watcher limit issues
        ignored: [
          "**/node_modules/**",
          "**/.wrangler/**",
          "**/dist/**",
          "**/build/**",
          "**/.git/**",
          "**/public/Website beloveful.com/**",
          "**/*.jpg",
          "**/*.jpeg",
          "**/*.png",
          "**/*.gif",
          "**/*.svg",
          "**/*.mp4",
          "**/*.mpeg",
          "**/*.avi",
          "**/*.mov",
          "**/*.mkv",
          "**/*.webm",
          "**/*.pdf",
          "**/*.zip",
          "**/*.tar",
          "**/*.gz",
          "**/*.7z",
          "**/*.rar",
          "**/*.iso",
          "**/*.bin",
          "**/*.log",
          "**/*.tmp",
          "**/*.swp",
          "**/*.swo",
          "**/*.DS_Store",
          "**/id_rsa*",
          "**/belovefu_*",
        ],
      },
    },
    define: {
      __APP_ENV__:
        mode === "production" ? JSON.stringify("prod") : JSON.stringify("dev"),
    },
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        // Add explicit alias for leaflet images to prevent 404 errors
        "leaflet/dist/images/marker-icon.png": path.resolve(
          __dirname,
          "node_modules/leaflet/dist/images/marker-icon.png",
        ),
        "leaflet/dist/images/marker-icon-2x.png": path.resolve(
          __dirname,
          "node_modules/leaflet/dist/images/marker-icon-2x.png",
        ),
        "leaflet/dist/images/marker-shadow.png": path.resolve(
          __dirname,
          "node_modules/leaflet/dist/images/marker-shadow.png",
        ),
      },
    },
    build: {
      rollupOptions: {
        output: {
          // Ensure assets have proper names to prevent caching issues
          assetFileNames: (assetInfo) => {
            const originalName = assetInfo.name ?? "";
            const ext = path.extname(originalName).replace(".", "").toLowerCase();
            const isImage = /png|jpe?g|svg|gif|tiff|bmp|ico|webp|avif/.test(ext);
            const extType = isImage ? "img" : ext || "asset";
            return `assets/${extType}/[name]-[hash][extname]`;
          },
        },
      },
    },
  };
});
