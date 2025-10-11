import { createProxiedImageUrl } from "./images";

// Prefer curated, stable public assets for client/partner logos.
// These live in /public/clients and are served at /clients/* at runtime.
import clientLogos from "./clientLogos.json";
const CURATED_CLIENT_LOGOS: string[] = Array.isArray(clientLogos)
  ? (clientLogos as string[])
  : [];

// Source of client/partner logo URLs for About page
export const CLIENT_LOGOS_SOURCE: string[] = CURATED_CLIENT_LOGOS.map((url) =>
  createProxiedImageUrl(url)
);

// Extract company names from logo file paths for better organization
export const CLIENT_NAMES: string[] = CLIENT_LOGOS_SOURCE.map((url) => {
  const filename = url.split("/").pop() || "";
  const name = filename.split(".")[0].replace(/%20/g, " ");

  // Clean up common filename patterns
  return (
    name
      .replace(/logo/gi, "")
      .replace(/vector/gi, "")
      .replace(/RGB/gi, "")
      .replace(/_/g, " ")
      .replace(/-/g, " ")
      .trim() || "Partner"
  );
});
