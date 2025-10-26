import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    watch: {
      // Exclude large directories from being watched to avoid file watcher limit issues
      ignored: [
        '**/node_modules/**',
        '**/.wrangler/**',
        '**/dist/**',
        '**/build/**',
        '**/.git/**',
        '**/public/Website beloveful.com/**'
      ]
    },
    proxy: {
      '/api': {
        // Proxy API requests to the local images server during development
        target: 'http://localhost:4001',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  define: {
    __APP_ENV__: mode === 'production' ? JSON.stringify('prod') : JSON.stringify('dev'),
  },
  plugins: [
    react(),
    componentTagger(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // Add explicit alias for leaflet images to prevent 404 errors
      "leaflet/dist/images/marker-icon.png": path.resolve(__dirname, "node_modules/leaflet/dist/images/marker-icon.png"),
      "leaflet/dist/images/marker-icon-2x.png": path.resolve(__dirname, "node_modules/leaflet/dist/images/marker-icon-2x.png"),
      "leaflet/dist/images/marker-shadow.png": path.resolve(__dirname, "node_modules/leaflet/dist/images/marker-shadow.png"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        // Ensure assets have proper names to prevent caching issues
        assetFileNames: (assetInfo) => {
          if (!assetInfo.name) {
            return 'assets/unknown-[hash][extname]';
          }
          
          let extType = assetInfo.name.split('.').at(1);
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = 'img';
          }
          return `assets/${extType}/[name]-[hash][extname]`;
        },
      },
    },
  },
}));