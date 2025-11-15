#!/usr/bin/env node
/**
 * Secure image pipeline
 * - Resizes masters into optimized WebP/AVIF outputs
 * - Strips metadata except for a forensic watermark tag
 * - Writes images into hashed paths so the CDN never exposes original filenames
 * - Generates a manifest so the frontend/CDN mapping can be updated automatically
 *
 * Usage:
 *   PROTECT_SOURCE_DIR=./incoming PROTECT_OUTPUT_DIR=./protected \
 *   PROTECT_WATERMARK_SECRET="my-secret" node scripts/secure-image-pipeline.mjs
 */

import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import sharp from "sharp";

const SOURCE_DIR = path.resolve(process.env.PROTECT_SOURCE_DIR ?? "incoming");
const OUTPUT_DIR = path.resolve(process.env.PROTECT_OUTPUT_DIR ?? "public/secure-images");
const MANIFEST_PATH = path.resolve(process.env.PROTECT_MANIFEST ?? "secure-image-manifest.json");
const WATERMARK_SECRET = process.env.PROTECT_WATERMARK_SECRET ?? "beloveful-default-secret";
const WATERMARK_NAMESPACE = process.env.PROTECT_WATERMARK_NAMESPACE ?? "https://beloveful.com/xmp/1.0/";

const TARGET_WIDTH = Number(process.env.PROTECT_TARGET_WIDTH ?? 2200);
const JPEG_QUALITY = Number(process.env.PROTECT_JPEG_QUALITY ?? 88);
const AVIF_QUALITY = Number(process.env.PROTECT_AVIF_QUALITY ?? 55);
const FORMAT = (process.env.PROTECT_FORMAT ?? "webp").toLowerCase(); // webp | avif | jpg

const SUPPORTED_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".tif", ".tiff", ".avif"]);

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function collectFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectFiles(full)));
    } else if (SUPPORTED_EXT.has(path.extname(entry.name).toLowerCase())) {
      files.push(full);
    }
  }
  return files;
}

function hashFilename(originalPath, watermarkTag) {
  const hash = crypto
    .createHash("sha256")
    .update(originalPath)
    .update(watermarkTag)
    .update(WATERMARK_SECRET)
    .digest("hex");
  const first = hash.slice(0, 2);
  const second = hash.slice(2, 4);
  const base = hash.slice(4, 16);
  return { first, second, base };
}

function createXmpBuffer(watermarkTag) {
  const xmp = `
  <?xpacket begin="﻿" id="W5M0MpCehiHzreSzNTczkc9d"?>
    <x:xmpmeta xmlns:x="adobe:ns:meta/">
      <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
        <rdf:Description xmlns:beloveful="${WATERMARK_NAMESPACE}"
          beloveful:watermark="${watermarkTag}" />
      </rdf:RDF>
    </x:xmpmeta>
  <?xpacket end="w"?>`.replace(/\n\s+/g, "");
  return Buffer.from(xmp);
}

async function processImage(file, manifest) {
  const relPath = path.relative(SOURCE_DIR, file);
  const baseName = path.parse(file).name;
  const watermarkTag = `beloveful:${baseName}:${crypto.randomUUID()}`;
  const hashed = hashFilename(relPath, watermarkTag);
  const outputExt = FORMAT === "jpg" ? ".jpg" : `.${FORMAT}`;
  const subdir = path.join(OUTPUT_DIR, hashed.first, hashed.second);
  const outputPath = path.join(subdir, `${hashed.base}${outputExt}`);

  await ensureDir(subdir);

  let transformer = sharp(file).rotate().resize({
    width: TARGET_WIDTH,
    withoutEnlargement: true,
    fit: "inside",
  });

  transformer = transformer.withMetadata({
    xmp: createXmpBuffer(watermarkTag),
  });

  if (FORMAT === "avif") {
    transformer = transformer.avif({ quality: AVIF_QUALITY, effort: 4 });
  } else if (FORMAT === "jpg" || FORMAT === "jpeg") {
    transformer = transformer.jpeg({
      quality: JPEG_QUALITY,
      chromaSubsampling: "4:4:4",
      progressive: true,
    });
  } else {
    transformer = transformer.webp({ quality: JPEG_QUALITY, effort: 5 });
  }

  await transformer.toFile(outputPath);

  manifest.push({
    source: relPath,
    filename: path.parse(file).base,
    output: path.relative(process.cwd(), outputPath),
    watermarkTag,
    createdAt: new Date().toISOString(),
  });
}

async function writeManifest(manifest) {
  const existing = await fs
    .readFile(MANIFEST_PATH, "utf8")
    .then((text) => JSON.parse(text))
    .catch(() => []);

  const combined = [...existing, ...manifest];
  await fs.writeFile(MANIFEST_PATH, JSON.stringify(combined, null, 2));
}

async function main() {
  await ensureDir(SOURCE_DIR);
  await ensureDir(OUTPUT_DIR);

  const files = await collectFiles(SOURCE_DIR);
  if (files.length === 0) {
    console.warn(`No source images found in ${SOURCE_DIR}.`);
    return;
  }

  console.log(`Processing ${files.length} images...`);
  const manifest = [];

  for (const file of files) {
    try {
      await processImage(file, manifest);
      console.log(`✓ Processed ${path.relative(SOURCE_DIR, file)}`);
    } catch (error) {
      console.error(`✗ Failed to process ${file}`, error);
    }
  }

  await writeManifest(manifest);
  console.log(`Manifest updated at ${MANIFEST_PATH}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
