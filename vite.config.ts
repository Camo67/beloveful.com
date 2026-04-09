import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const parsedApiPort = Number.parseInt(process.env.DEV_API_PORT ?? "8787", 10);
  const devApiPort =
    Number.isInteger(parsedApiPort) && parsedApiPort > 0 && parsedApiPort < 65536
      ? parsedApiPort
      : 8787;

  return {
    server: {
      host: "::",
      port: 8080,
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
          "**/bluehost-cms/**",
          "**/cloudinary-*.json",
          "**/cloudinary-*.csv",
          "**/cloudinary-*.txt",
          "**/website-images.json",
          "**/generated-albums.ts",
          "**/folder-assignments.json",
          "**/unique_unassigned_images.json",
          "**/unassigned_breakdown.json",
          "**/products.json",
          "**/r2-url-mapping.json",
          "**/secure-image-manifest.json",
          "**/update_stats.json",
          "**/assignment_summary.json",
          "**/cloudinary_audit_report.json",
          "**/cloudinary_country_tags_report.json",
          "**/cloudinary-resources.json",
          "**/cloudinary-upload-queue.json",
          "**/cloudinary-upload-report.json",
          "**/cloudinary-upload-results.json",
          "**/complete-upload-report.json",
          "**/homepage-upload-report.json",
          "**/homepage-upload-results.json",
          "**/local-cloudinary-sync-report.json",
          "**/cloudinary-fetch-report.json",
          "**/cloudinary-full-data.json",
          "**/cloudinary-images-updated.json",
          "**/cloudinary-images.json",
          "**/cloudinary-import.cjs",
          "**/cloudinary-postman-collection.json",
          "**/cloudinary_asset_urls.*",
          "**/d4d6d91c97f271c8255e0e3c6b690b85",
          "**/f1939f94-5706-4c9b-8135-c451493f2222",
          "**/filename.ext",
          "**/index.html",
          "**/schema.json",
          "**/vercel.json",
          "**/wrangler.toml",
        ],
      },
      proxy: {
        "/api": {
          // Proxy API requests to local Cloudflare Pages Functions during development
          // (started via `npm run dev:api`)
          target: `http://localhost:${devApiPort}`,
          changeOrigin: true,
          secure: false,
        },
      },
    },
    define: {
      __APP_ENV__:
        mode === "production" ? JSON.stringify("prod") : JSON.stringify("dev"),
    },
    plugins: [react(), componentTagger()],
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