import type { CountryCode, CountryFeature, FolderId, LatLng } from "@/types/map";
import { COUNTRY_COORDS, COUNTRY_FOLDER_MAP } from "@/lib/map-mappings";

// Optional: minimal name→ISO lookup for fallbacks.
// Keep small and explicit to avoid accidental fuzzy matches.
const NAME_TO_ISO3: Record<string, CountryCode> = {
  "Argentina": "ARG",
  "Jordan": "JOR",
  "India": "IND",
  "Spain": "ESP",
  "Puerto Rico": "PRI",
  "Morocco": "MAR",
  "Egypt": "EGY",
  "Ethiopia": "ETH",
  "South Africa": "ZAF",
  "Namibia": "NAM",
  "Nepal": "NPL",
  "Thailand": "THA",
  "Vietnam": "VNM",
  "Hong Kong": "HKG",
  "Japan": "JPN",
  "Myanmar": "MMR",
  "France": "FRA",
  "Greece": "GRC",
  "Italy": "ITA",
  "Portugal": "PRT",
  "United Kingdom": "GBR",
  "UK & Ireland": "GBR",
  "Ireland": "IRL",
  "Cuba": "CUB",
  "Mexico": "MEX",
  "Caribbean": "CAR",
};

export function normalizeIso3(raw?: unknown): CountryCode | null {
  const s = String(raw ?? "").toUpperCase().trim();
  return (Object.keys(COUNTRY_FOLDER_MAP) as CountryCode[]).includes(s as CountryCode)
    ? (s as CountryCode)
    : null;
}

export function isoFromFeature(feature?: CountryFeature): CountryCode | null {
  const p = feature?.properties;
  // 1) iso_a3
  const iso3 = normalizeIso3(p?.iso_a3);
  if (iso3) return iso3;
  // 2) known name mapping
  const name = typeof p?.name === "string" ? p!.name.trim() : "";
  if (name && NAME_TO_ISO3[name]) return NAME_TO_ISO3[name];
  // 3) id as last resort
  return normalizeIso3(feature?.id);
}

export function folderForCountry(code: CountryCode): FolderId {
  return COUNTRY_FOLDER_MAP[code];
}

export function centerForCountry(code: CountryCode): LatLng {
  return COUNTRY_COORDS[code];
}

// Hard guard used in click handlers: throws on bad mapping during dev
export function assertMapped(code: CountryCode): void {
  if (!COUNTRY_FOLDER_MAP[code]) {
    throw new Error(`No folder mapping for ISO3 ${code}`);
  }
  if (!COUNTRY_COORDS[code]) {
    throw new Error(`No coords mapping for ISO3 ${code}`);
  }
}

export const projectCoordinates = (lat: number, lng: number): [number, number] => {
  const x = (lng + 180) / 360;
  const sinLat = Math.sin(lat * Math.PI / 180);
  const y = 0.5 - 0.25 * Math.log((1 + sinLat) / (1 - sinLat)) / Math.PI;
  return [x, y];
};

export const validateCoordinates = (lat: number, lng: number): boolean => {
  return lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
};

export const validateMapping = (code: CountryCode): boolean => {
  if (!COUNTRY_COORDS[code] || !COUNTRY_FOLDER_MAP[code]) {
    console.warn(`Incomplete mapping for ${code}`);
    return false;
  }
  return true;
};

export const safeFolderForCountry = (code: CountryCode): string | undefined => {
  try {
    assertMapped(code);
    return folderForCountry(code);
  } catch (err) {
    console.warn(`Invalid country code: ${code}`, err);
    return undefined;
  }
};

// Type safety for data sources
export interface AlbumMarker {
  code: CountryCode;
  title: string;
  previewUrl?: string;
  folderId: FolderId;
  center?: LatLng; // default from COUNTRY_COORDS if omitted
}

export function toAlbumMarker(code: CountryCode, folderId: FolderId): AlbumMarker {
  return { code, folderId, title: code, center: COUNTRY_COORDS[code] };
}
