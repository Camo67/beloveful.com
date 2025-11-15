#!/usr/bin/env node
/**
 * Build CountryAlbum data directly from the local static library.
 * Scans `public/Website beloveful.com/<Region>/<Country>/*`.
 */

import fs from "node:fs/promises";
import path from "node:path";

const PUBLIC_DIR = path.resolve("public");
const ROOT_DIR = path.join(PUBLIC_DIR, "Website beloveful.com");
const OUTPUT_FILE = path.resolve("src/lib/local-albums.json");

const REGION_ALLOW = new Set([
  "Africa",
  "Asia",
  "Central America & Caribbean",
  "Europe & Scandinavia",
  "Middle East",
  "North America",
  "South America",
  "Erasing Borders",
]);

const SUPPORTED_EXT = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".avif",
  ".gif",
]);

function slugify(input) {
  return input
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

function toPosix(relativePath) {
  return relativePath.split(path.sep).join("/");
}

async function collectImages(countryDir) {
  const entries = await fs.readdir(countryDir, { withFileTypes: true });
  const images = [];
  for (const entry of entries) {
    if (entry.isDirectory()) continue;
    const ext = path.extname(entry.name).toLowerCase();
    if (!SUPPORTED_EXT.has(ext)) continue;
    const absolute = path.join(countryDir, entry.name);
    const relative = path.relative(PUBLIC_DIR, absolute);
    const src = `/${toPosix(relative)}`;
    images.push({
      desktop: src,
      mobile: src,
    });
  }
  images.sort((a, b) => a.desktop.localeCompare(b.desktop));
  return images;
}

async function main() {
  await fs.access(ROOT_DIR).catch(() => {
    throw new Error(
      `Static library not found at ${ROOT_DIR}. Sync Adobe assets into this folder first.`,
    );
  });

  const regions = await fs.readdir(ROOT_DIR, { withFileTypes: true });
  const albums = [];

  for (const regionEntry of regions) {
    if (!regionEntry.isDirectory()) continue;
    const regionName = regionEntry.name;
    if (!REGION_ALLOW.has(regionName)) continue;
    const regionPath = path.join(ROOT_DIR, regionName);
    const entries = await fs.readdir(regionPath, { withFileTypes: true });
    const countryDirs = entries.filter((entry) => entry.isDirectory());

    if (countryDirs.length === 0) {
      const images = await collectImages(regionPath);
      if (images.length) {
        albums.push({
          region: regionName,
          country: regionName,
          slug: slugify(regionName),
          title: regionName,
          images,
        });
      }
      continue;
    }

    for (const countryEntry of countryDirs) {
      if (!countryEntry.isDirectory()) continue;
      const countryName = countryEntry.name;
      const countryPath = path.join(regionPath, countryName);
      const images = await collectImages(countryPath);
      if (images.length === 0) continue;

      albums.push({
        region: regionName,
        country: countryName,
        slug: slugify(countryName),
        title: countryName,
        images,
      });
    }
  }

  albums.sort((a, b) => a.country.localeCompare(b.country));

  await fs.writeFile(OUTPUT_FILE, JSON.stringify(albums, null, 2), "utf8");
  console.log(
    `[generate-local-albums] Wrote ${albums.length} country albums to ${OUTPUT_FILE}`,
  );
}

main().catch((error) => {
  console.error(error.message ?? error);
  process.exit(1);
});
