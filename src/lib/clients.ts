import { createProxiedImageUrl } from "./images";

const RAW_CLIENT_LOGOS = [
  "/images/clients/Crowneplaza4.png",
  "/images/clients/Flickr_logo.png",
  "/images/clients/Hard_Rock_Hotel.svg",
  "/images/clients/Netflix_Logo_RGB.png",
  "/images/clients/TED.jpg",
  "/images/clients/Time_Magazine_logo.svg.png",
  "/images/clients/benq.png",
  "/images/clients/breaks-chicago.jpg",
  "/images/clients/egypt.png",
  "/images/clients/kissclipart-navy-pier-logo-clipart-chicago-shakespeare-theater-e550ac399dac0a24.jpg",
  "/images/clients/logo.png",
  "/images/clients/mediakit_branding_1.jpg",
  "/images/clients/national-geographic-logo-vector-768x768.png",
  "/images/clients/pngegg.png",
  "/images/clients/pngegg (1).png",
  "/images/clients/pngegg (2).png",
] as const;

const CURATED_CLIENT_LOGOS = RAW_CLIENT_LOGOS.map((url) => createProxiedImageUrl(url));
const CLIENT_FILENAMES = RAW_CLIENT_LOGOS.map((url) => url.split("/").pop() || "");

// Source of client/partner logo URLs for About page
export const CLIENT_LOGOS_SOURCE: string[] = CURATED_CLIENT_LOGOS;

// Extract company names from logo file paths for better organization
export const CLIENT_NAMES: string[] = CLIENT_FILENAMES.map((filename) => {
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
  const target = (CLIENT_FILENAMES[index] || "").toLowerCase();
  if (!target) return null;

  // National Geographic
  if (target.includes("natgeo") || target.includes("national") || target.includes("geo")) {
    return "https://www.nationalgeographic.com/";
  }

  // Netflix
  if (target.includes("netflix")) {
    return "https://www.netflix.com/?utm_source=chatgpt.com";
  }

  // TED
  if (target.includes("ted")) {
    return "https://www.ted.com/";
  }

  // TIME Magazine
  if (target.includes("time")) {
    return "https://time.com/?utm_source=chatgpt.com";
  }

  // Flickr
  if (target.includes("flickr")) {
    return "https://www.flickr.com/?utm_source=chatgpt.com";
  }

  // Hard Rock Hotels
  if (target.includes("hard_rock") || target.includes("hard-rock") || target.includes("hard rock")) {
    return "https://hotel.hardrock.com/?utm_source=chatgpt.com";
  }

  // Crowne Plaza (IHG)
  if (target.includes("crowne")) {
    return "https://www.ihg.com/crowneplaza/hotels/us/en/cairo/caisz/hoteldetail?utm_source=chatgpt.com";
  }

  // Navy Pier / Chicago Shakespeare Theater
  if (target.includes("navy") && target.includes("pier")) {
    return "https://www.chicagoshakes.com/?utm_source=chatgpt.com";
  }

  // BenQ
  if (target.includes("benq")) {
    return "https://www.benq.com/en-us/index.html?utm_source=chatgpt.com";
  }

  // Cairo International Airport (Egypt)
  if (target.includes("egypt")) {
    return "https://www.cairo-airport.com/en-us/?utm_source=chatgpt.com";
  }

  // The Second City (breaks-chicago)
  if (target.includes("breaks")) {
    return "https://www.secondcity.com/?utm_source=chatgpt.com";
  }

  // Google
  if (target.includes("google")) {
    return "https://www.google.com/?utm_source=chatgpt.com";
  }

  // Fairmont Hotels
  if (target.includes("fairmont")) {
    return "https://www.fairmont.com/en.html?utm_source=chatgpt.com";
  }

  // Moab, Utah
  if (target.includes("moab")) {
    return "https://www.discovermoab.com/?utm_source=chatgpt.com";
  }

  return null;
}
