#!/usr/bin/env node
/**
 * Scan the static assets folder (default: public/images/adobe) and emit a JSON manifest
 * describing each image. The manifest can then be consumed by the UI layer so we never
 * hard-code image imports manually.
 *
 * Usage:
 *   node scripts/list-images.mjs
 *   node scripts/list-images.mjs ./public/images       # custom root
 */

import fs from "node:fs/promises";
import path from "node:path";

const PUBLIC_DIR = path.resolve("public");
const DEFAULT_ROOT = path.join(PUBLIC_DIR, "images", "adobe");
const FALLBACK_ROOT = path.join(PUBLIC_DIR, "images");
const TARGET_ROOT = process.argv[2]
  ? path.resolve(process.argv[2])
  : DEFAULT_ROOT;
const OUTPUT_FILE = path.resolve("data/adobe-images.json");

const SUPPORTED_EXTENSIONS = new Set([
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
  ".svg",
  ".gif",
]);

async function ensureTargetDir(root) {
  try {
    await fs.access(root);
    return root;
  } catch (error) {
    if (root === DEFAULT_ROOT && !process.argv[2]) {
      try {
        await fs.access(FALLBACK_ROOT);
        console.warn(
          `[list-images] Default folder ${DEFAULT_ROOT} not found. Using ${FALLBACK_ROOT} instead.`,
        );
        return FALLBACK_ROOT;
      } catch (fallbackError) {
        throw new Error(
          `[list-images] Neither ${DEFAULT_ROOT} nor ${FALLBACK_ROOT} exist.`,
        );
      }
    }
    throw new Error(
      `[list-images] Provided folder ${root} does not exist or is inaccessible.`,
    );
  }
}

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(fullPath)));
    } else if (SUPPORTED_EXTENSIONS.has(path.extname(entry.name).toLowerCase())) {
      files.push(fullPath);
    }
  }

  return files;
}

function toPosix(input) {
  return input.split(path.sep).join("/");
}

function toAltText(filename) {
  const base = filename.replace(/\.[^/.]+$/, "");
  const words = base
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (!words) return "Image";
  return words
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function toCategory(folderRelativeToRoot) {
  if (!folderRelativeToRoot) return undefined;
  const [firstSegment] = folderRelativeToRoot.split(path.sep);
  if (!firstSegment) return undefined;
  return toAltText(firstSegment);
}

async function main() {
  const rootDir = await ensureTargetDir(TARGET_ROOT);
  const files = await walk(rootDir);

  if (files.length === 0) {
    console.warn(`[list-images] No image files found under ${rootDir}`);
    await fs.mkdir(path.dirname(OUTPUT_FILE), { recursive: true });
    await fs.writeFile(OUTPUT_FILE, "[]\n", "utf8");
    return;
  }

  const records = files
    .map((file) => {
      const relativeToPublic = path.relative(PUBLIC_DIR, file);
      const src = `/${toPosix(relativeToPublic)}`.replace(
        /^\/images\//,
        "/Website beloveful.com/",
      );
      const relDir = path.relative(rootDir, path.dirname(file));
      return {
        src,
        alt: toAltText(path.basename(file)),
        category: toCategory(relDir),
      };
    })
    .sort((a, b) => a.src.localeCompare(b.src));

  await fs.mkdir(path.dirname(OUTPUT_FILE), { recursive: true });
  await fs.writeFile(OUTPUT_FILE, JSON.stringify(records, null, 2), "utf8");

  console.log(
    `[list-images] Indexed ${records.length.toLocaleString()} images from ${rootDir}`,
  );
  console.log(`[list-images] Manifest written to ${OUTPUT_FILE}`);
}

main().catch((error) => {
  console.error(error.message ?? error);
  process.exit(1);
});
