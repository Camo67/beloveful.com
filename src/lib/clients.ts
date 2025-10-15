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

// Best-effort website mapping based on filename patterns.
// Unknown entries return null so the UI can gracefully render without links.
export function getClientLinkForIndex(index: number): string | null {
  const original = CURATED_CLIENT_LOGOS[index] || "";
  const lower = original.toLowerCase();
  if (lower.includes("natgeo") || lower.includes("national") || lower.includes("geo")) {
    return "https://www.nationalgeographic.com/";
  }
  if (lower.includes("netflix")) {
    return "https://www.netflix.com/";
  }
  if (lower.includes("ted")) {
    return "https://www.ted.com/";
  }
  if (lower.includes("time")) {
    return "https://time.com/";
  }
  if (lower.includes("flickr")) {
    return "https://www.flickr.com/";
  }
  if (lower.includes("hard_rock") || lower.includes("hard-rock") || lower.includes("hard rock")) {
    return "https://www.hardrockhotels.com/";
  }
  if (lower.includes("crowne")) {
    return "https://www.ihg.com/crowneplaza";
  }
  if (lower.includes("navy") && lower.includes("pier")) {
    return "https://navypier.org/";
  }
  if (lower.includes("benq")) {
    return "https://www.benq.com/";
  }
  if (lower.includes("egypt")) {
    return "https://www.egypt.travel/";
  }
  if (lower.includes("breaks")) {
    // Unknown exact domain; keep null to avoid mislinking.
    return null;
  }
  return null;
}
