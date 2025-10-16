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

// Partner website mapping with provided URLs
// Maps logo filenames/patterns to their official website URLs
export function getClientLinkForIndex(index: number): string | null {
  const original = CURATED_CLIENT_LOGOS[index] || "";
  const lower = original.toLowerCase();
  
  // National Geographic
  if (lower.includes("natgeo") || lower.includes("national") || lower.includes("geo")) {
    return "https://www.nationalgeographic.com/";
  }
  
  // Netflix
  if (lower.includes("netflix")) {
    return "https://www.netflix.com/?utm_source=chatgpt.com";
  }
  
  // TED
  if (lower.includes("ted")) {
    return "https://www.ted.com/";
  }
  
  // TIME Magazine
  if (lower.includes("time")) {
    return "https://time.com/?utm_source=chatgpt.com";
  }
  
  // Flickr
  if (lower.includes("flickr")) {
    return "https://www.flickr.com/?utm_source=chatgpt.com";
  }
  
  // Hard Rock Hotels
  if (lower.includes("hard_rock") || lower.includes("hard-rock") || lower.includes("hard rock")) {
    return "https://hotel.hardrock.com/?utm_source=chatgpt.com";
  }
  
  // Crowne Plaza (IHG)
  if (lower.includes("crowne")) {
    return "https://www.ihg.com/crowneplaza/hotels/us/en/cairo/caisz/hoteldetail?utm_source=chatgpt.com";
  }
  
  // Navy Pier / Chicago Shakespeare Theater
  if (lower.includes("navy") && lower.includes("pier")) {
    return "https://www.chicagoshakes.com/?utm_source=chatgpt.com";
  }
  
  // BenQ
  if (lower.includes("benq")) {
    return "https://www.benq.com/en-us/index.html?utm_source=chatgpt.com";
  }
  
  // Cairo International Airport (Egypt)
  if (lower.includes("egypt")) {
    return "https://www.cairo-airport.com/en-us/?utm_source=chatgpt.com";
  }
  
  // The Second City (breaks-chicago)
  if (lower.includes("breaks")) {
    return "https://www.secondcity.com/?utm_source=chatgpt.com";
  }
  
  // Google
  if (lower.includes("google")) {
    return "https://www.google.com/?utm_source=chatgpt.com";
  }
  
  // Fairmont Hotels
  if (lower.includes("fairmont")) {
    return "https://www.fairmont.com/en.html?utm_source=chatgpt.com";
  }
  
  // Moab, Utah
  if (lower.includes("moab")) {
    return "https://www.discovermoab.com/?utm_source=chatgpt.com";
  }
  
  return null;
}
