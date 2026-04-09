import type { SlideshowImage } from "@/lib/data";
import { mapToCdnUrl, validateAndFixImageUrl } from "@/lib/image-utils";

export type AlbumImageCandidate = {
  desktop?: string | null;
  mobile?: string | null;
};

type TravelPortfolioFinalizeOptions = {
  galleryId?: string;
  denylist?: Iterable<string>;
};

const TRAVEL_PORTFOLIO_DISALLOWED_EXTENSIONS = new Set([
  ".svg",
  ".ico",
]);

const TRAVEL_PORTFOLIO_DISALLOWED_PATTERNS = [
  /\bbeloveful\b/i,
  /\blogo\b/i,
  /\bbrand(?:ing)?\b/i,
  /\bicon\b/i,
  /\bplaceholder\b/i,
];

const DEFAULT_TRAVEL_PORTFOLIO_DENYLIST = [
  "img_1052.jpg",
  "logo/img_1052.jpg",
  "beloveful_white_transparent.png",
  "beloveful_copy_3.png",
  "beloveful.png",
];

function cleanUrl(value?: string | null): string {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeImageUrl(url?: string | null): string {
  const trimmed = cleanUrl(url);
  if (!trimmed) {
    return "";
  }

  // Keep canonicalization conservative: normalize equivalent URL forms,
  // but do not collapse distinct crops or formats beyond their resolved URL.
  const fixedUrl = validateAndFixImageUrl(trimmed, trimmed);
  return mapToCdnUrl(fixedUrl) ?? fixedUrl;
}

function decodeUrlPath(url: string): string {
  const trimmed = cleanUrl(url);
  if (!trimmed) {
    return "";
  }

  try {
    const parsed = new URL(trimmed, "https://beloveful.com");
    return decodeURIComponent(parsed.pathname);
  } catch {
    const withoutQuery = trimmed.split("?")[0]?.split("#")[0] ?? trimmed;
    try {
      return decodeURIComponent(withoutQuery);
    } catch {
      return withoutQuery;
    }
  }
}

function normalizePathSegment(segment: string): string {
  return segment.trim().toLowerCase();
}

function getFilenameFromUrl(url: string): string {
  const pathname = decodeUrlPath(url);
  if (!pathname) {
    return "";
  }

  const segments = pathname.split("/").filter(Boolean);
  return normalizeAssetFilename(segments[segments.length - 1] ?? "");
}

function getFileExtension(filename: string): string {
  const match = filename.match(/(\.[^.]+)$/);
  return match?.[1]?.toLowerCase() ?? "";
}

function normalizeAssetFilename(filename: string): string {
  const trimmed = filename.trim();
  if (!trimmed) {
    return "";
  }

  const match = trimmed.match(/^(.+?)(\.[^.]+)$/);
  if (!match) {
    return normalizePathSegment(trimmed);
  }

  let base = match[1];
  const ext = match[2].toLowerCase();

  // Strip legacy NextGEN Gallery suffixes while preserving meaningful filename variants.
  base = base.replace(/-nggid.*$/i, "");
  base = base.replace(/\.(jpe?g|png|gif|webp|avif)$/i, "");
  base = base.replace(/\s+copy\s*$/i, "");
  base = base.replace(/\s*\(1\)\s*$/i, "");

  return `${normalizePathSegment(base)}${ext}`;
}

function hasCopySuffix(url: string): boolean {
  const pathname = decodeUrlPath(url);
  if (!pathname) {
    return false;
  }

  const filename = pathname.split("/").filter(Boolean).pop() ?? "";
  const trimmed = filename.trim();
  if (!trimmed) {
    return false;
  }

  const match = trimmed.match(/^(.+?)(\.[^.]+)$/);
  const base = (match?.[1] ?? trimmed).replace(/-nggid.*$/i, "").trim();
  return /\s+copy\s*$/i.test(base);
}

function getNormalizedAssetScope(url: string): string[] {
  const pathname = decodeUrlPath(url);
  if (!pathname) {
    return [];
  }

  const segments = pathname.split("/").filter(Boolean);
  const lowerSegments = segments.map(normalizePathSegment);
  let scopeStart = -1;

  if (lowerSegments[0] === "website beloveful.com" || lowerSegments[0] === "images") {
    scopeStart = 1;
  } else {
    const legacyStart = lowerSegments.findIndex(
      (_, index) =>
        lowerSegments[index] === "public_html" &&
        lowerSegments[index + 1] === "beloveful.com" &&
        lowerSegments[index + 2] === "public_html" &&
        lowerSegments[index + 3] === "images",
    );

    if (legacyStart !== -1) {
      scopeStart = legacyStart + 4;
    }
  }

  if (scopeStart === -1) {
    return [];
  }

  return segments.slice(scopeStart).map(normalizePathSegment);
}

function deriveStructuredAssetIdentity(url: string): string {
  const scopedSegments = getNormalizedAssetScope(url);
  if (scopedSegments.length < 3) {
    return "";
  }

  const filename = getFilenameFromUrl(url);
  if (!filename) {
    return "";
  }

  const [region, country, ...folders] = scopedSegments;

  // Legacy India DB assets may point at /indiaImages while static assets use the album root.
  const normalizedFolders =
    region === "asia" && country === "india" && folders[0] === "indiaimages"
      ? folders.slice(1)
      : folders;

  return [region, country, ...normalizedFolders, filename].join("/");
}

function getPreferredUrlScore(url: string): number {
  const lower = url.toLowerCase();
  let score = 0;

  if (lower.includes("/website%20beloveful.com/") || lower.includes("/website beloveful.com/")) {
    score += 6;
  }
  if (!lower.includes("/public_html/")) {
    score += 4;
  }
  if (!lower.includes("/indiaimages/")) {
    score += 2;
  }
  if (!hasCopySuffix(url)) {
    score += 3;
  }

  // Prefer shorter canonical paths when two URLs map to the same logical asset.
  score -= lower.length / 1000;

  return score;
}

function choosePreferredImage(current: SlideshowImage, candidate: SlideshowImage): SlideshowImage {
  const currentScore = getPreferredUrlScore(current.desktop) + getPreferredUrlScore(current.mobile);
  const candidateScore =
    getPreferredUrlScore(candidate.desktop) + getPreferredUrlScore(candidate.mobile);

  return candidateScore > currentScore ? candidate : current;
}

function normalizeDenylistEntry(entry: string): string {
  const trimmed = cleanUrl(entry);
  if (!trimmed) {
    return "";
  }

  if (!trimmed.startsWith("/") && !/^[a-z]+:/i.test(trimmed)) {
    const normalizedSegments = trimmed
      .split("/")
      .map((segment, index, segments) =>
        index === segments.length - 1 ? normalizeAssetFilename(segment) : normalizePathSegment(segment),
      )
      .filter(Boolean);

    if (normalizedSegments.length > 0) {
      return normalizedSegments.join("/");
    }
  }

  const normalizedUrl = normalizeImageUrl(trimmed);
  const scopedPath = deriveStructuredAssetIdentity(normalizedUrl);
  if (scopedPath) {
    return scopedPath;
  }

  const filename = getFilenameFromUrl(normalizedUrl || trimmed);
  if (filename) {
    return filename;
  }

  return normalizePathSegment(trimmed);
}

function createTravelPortfolioDenylist(extraEntries?: Iterable<string>): Set<string> {
  const denylist = new Set(
    DEFAULT_TRAVEL_PORTFOLIO_DENYLIST.map(normalizeDenylistEntry).filter(Boolean),
  );

  if (!extraEntries) {
    return denylist;
  }

  for (const entry of extraEntries) {
    const normalizedEntry = normalizeDenylistEntry(entry);
    if (normalizedEntry) {
      denylist.add(normalizedEntry);
    }
  }

  return denylist;
}

function getTravelPortfolioImageTokens(
  image: SlideshowImage,
): Array<{ filename: string; scopedPath: string }> {
  return [image.desktop, image.mobile]
    .map((url) => normalizeImageUrl(url))
    .filter(Boolean)
    .map((url) => ({
      filename: getFilenameFromUrl(url),
      scopedPath: deriveStructuredAssetIdentity(url),
    }));
}

export function isEligibleTravelPortfolioImage(
  image?: AlbumImageCandidate | null,
  options: Pick<TravelPortfolioFinalizeOptions, "denylist"> = {},
): boolean {
  const normalized = normalizeAlbumImage(image);
  if (!normalized) {
    return false;
  }

  const denylist = createTravelPortfolioDenylist(options.denylist);

  return getTravelPortfolioImageTokens(normalized).every(({ filename, scopedPath }) => {
    if (!filename) {
      return false;
    }

    if (TRAVEL_PORTFOLIO_DISALLOWED_EXTENSIONS.has(getFileExtension(filename))) {
      return false;
    }

    if (denylist.has(filename) || (scopedPath && denylist.has(scopedPath))) {
      return false;
    }

    if (TRAVEL_PORTFOLIO_DISALLOWED_PATTERNS.some((pattern) => pattern.test(filename))) {
      return false;
    }

    if (scopedPath && TRAVEL_PORTFOLIO_DISALLOWED_PATTERNS.some((pattern) => pattern.test(scopedPath))) {
      return false;
    }

    return true;
  });
}

export function normalizeAlbumImage(
  image?: AlbumImageCandidate | null,
): SlideshowImage | null {
  if (!image) {
    return null;
  }

  const rawDesktop = cleanUrl(image.desktop);
  const rawMobile = cleanUrl(image.mobile);
  const resolvedDesktop = rawDesktop || rawMobile;
  const resolvedMobile = rawMobile || rawDesktop;

  if (!resolvedDesktop && !resolvedMobile) {
    return null;
  }

  const desktop = normalizeImageUrl(resolvedDesktop);
  const mobile = normalizeImageUrl(resolvedMobile || resolvedDesktop);

  if (!desktop && !mobile) {
    return null;
  }

  return {
    desktop: desktop || mobile,
    mobile: mobile || desktop,
  };
}

export function getAlbumImageAssetIdentity(url?: string | null): string {
  const normalizedUrl = normalizeImageUrl(url);
  if (!normalizedUrl) {
    return "";
  }

  return deriveStructuredAssetIdentity(normalizedUrl) || normalizedUrl;
}

export function getAlbumImageStableKey(
  image?: AlbumImageCandidate | null,
): string {
  const normalized = normalizeAlbumImage(image);
  if (!normalized) {
    return "";
  }

  const desktopIdentity = getAlbumImageAssetIdentity(normalized.desktop) || normalized.desktop;
  const mobileIdentity = getAlbumImageAssetIdentity(normalized.mobile) || normalized.mobile;

  return desktopIdentity === mobileIdentity
    ? desktopIdentity
    : `${desktopIdentity}|${mobileIdentity}`;
}

export function dedupeAlbumImages(
  images: Array<AlbumImageCandidate | null | undefined>,
): SlideshowImage[] {
  const deduped: SlideshowImage[] = [];
  const seen = new Map<string, number>();

  for (const image of images) {
    const normalized = normalizeAlbumImage(image);
    if (!normalized) {
      continue;
    }

    const key = getAlbumImageStableKey(normalized);
    if (!key) {
      continue;
    }

    const existingIndex = seen.get(key);
    if (existingIndex !== undefined) {
      deduped[existingIndex] = choosePreferredImage(deduped[existingIndex], normalized);
      continue;
    }

    seen.set(key, deduped.length);
    deduped.push(normalized);
  }

  return deduped;
}

export function finalizeTravelPortfolioImages(
  images: Array<AlbumImageCandidate | null | undefined>,
  options: TravelPortfolioFinalizeOptions = {},
): SlideshowImage[] {
  const eligibleImages = images.filter((image) =>
    isEligibleTravelPortfolioImage(image, { denylist: options.denylist }),
  );
  const dedupedImages = dedupeAlbumImages(eligibleImages);

  if (import.meta.env.DEV) {
    console.debug("[TravelPortfolio] finalized images", {
      gallery: options.galleryId ?? "unknown",
      total: images.length,
      eligible: eligibleImages.length,
      unique: dedupedImages.length,
      excluded: images.length - eligibleImages.length,
    });
  }

  return dedupedImages;
}
