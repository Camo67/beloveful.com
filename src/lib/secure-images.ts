import manifest from "../../secure-image-manifest.json";

type ManifestEntry = {
  source: string;
  filename: string;
  output: string;
  watermarkTag: string;
  createdAt: string;
};

const SECURE_MANIFEST = (manifest as ManifestEntry[]) ?? [];
const SECURE_BY_FILENAME = new Map(
  SECURE_MANIFEST.map((entry) => [entry.filename.toLowerCase(), entry]),
);

const runtimeEnv = (() => {
  try {
    if (typeof import.meta !== "undefined" && (import.meta as any)?.env) {
      return (import.meta as any).env as Record<string, string>;
    }
  } catch {
    /* noop */
  }
  if (typeof process !== "undefined" && process.env) {
    return process.env as Record<string, string>;
  }
  return {};
})();

const SECURE_CDN_BASE =
  runtimeEnv.VITE_SECURE_CDN_BASE_URL ||
  runtimeEnv.VITE_CDN_BASE_URL ||
  runtimeEnv.VITE_APP_CDN_BASE ||
  "";

const SECURE_PREFIX = runtimeEnv.VITE_SECURE_IMAGES_PREFIX || "";

function normalizeOutputPath(output: string): string {
  const clean = output.replace(/^\.?\/*/, "").replace(/^public[\\/]/, "");
  return clean.replace(/\\/g, "/");
}

export function getSecureImageUrl(sourcePath: string): string | null {
  const entry = SECURE_MANIFEST.find((m) => m.source === sourcePath);
  if (!entry) return null;
  const normalized = normalizeOutputPath(entry.output);
  const prefix = SECURE_PREFIX ? SECURE_PREFIX.replace(/\/+$/, "") + "/" : "";
  return `${SECURE_CDN_BASE.replace(/\/+$/, "")}/${prefix}${normalized}`;
}

export function getSecureImageUrlByFilename(filename?: string | null): string | null {
  if (!filename) return null;
  const entry = SECURE_BY_FILENAME.get(filename.toLowerCase());
  if (!entry) return null;
  const normalized = normalizeOutputPath(entry.output);
  const prefix = SECURE_PREFIX ? SECURE_PREFIX.replace(/\/+$/, "") + "/" : "";
  return `${SECURE_CDN_BASE.replace(/\/+$/, "")}/${prefix}${normalized}`;
}

export function getWatermarkTag(sourcePath: string): string | null {
  const entry = SECURE_MANIFEST.find((m) => m.source === sourcePath);
  return entry?.watermarkTag ?? null;
}

export function listSecureImages(): ManifestEntry[] {
  return SECURE_MANIFEST;
}
