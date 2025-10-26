import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { preloadCriticalAssets } from "./lib/assetLoader.ts";

// Preload critical assets to prevent 404 errors
const preloadWithTimeout = () => {
  return Promise.race([
    preloadCriticalAssets().catch(error => {
      console.warn("Failed to preload critical assets:", error);
    }),
    new Promise(resolve => setTimeout(resolve, 5000)) // 5 second timeout
  ]);
};

preloadWithTimeout().finally(() => {
  const rootElement = document.getElementById("root");
  if (rootElement) {
    createRoot(rootElement).render(<App />);
  } else {
    console.error("Failed to find root element");
  }
});