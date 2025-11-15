// ISO 3166-1 alpha-3 codes we actually use.
// (Narrowing prevents typos like "PR" vs "PRI".)
export type CountryCode =
  | "ARG" | "JOR" | "IND" | "ESP" | "PRI"
  | "MAR" | "EGY" | "ETH" | "ZAF" | "NAM"
  | "NPL" | "THA" | "VNM" | "HKG" | "JPN" | "MMR"
  | "CHI" | "NYC" // Adding Chicago and New York
  | "FRA" | "GRC" | "ITA" | "PRT" | "GBR" | "IRL" | "CUB" | "MEX" | "CAR";

export interface LatLng {
  lat: number;
  lng: number;
}

// e.g. "folder-argentina"
export type FolderId = string;

// Map feature shape (works for Leaflet/Mapbox/D3 with minimal adaptation)
export interface CountryFeatureProps {
  iso_a3?: string;         // preferred
  iso_a2?: string;         // fallback if you must
  name?: string;           // last-resort (use lookup)
  [k: string]: unknown;
}
export interface CountryFeature {
  id?: string | number;
  properties?: CountryFeatureProps;
}
