#!/usr/bin/env node
import { promises as fs } from 'fs';
import path from 'path';

const ROOT = process.cwd();
const PUBLIC_DIR = path.join(ROOT, 'public');

const REGION_MAP = new Map([
  ['Africa', 'Africa'],
  ['Asia', 'Asia'],
  ['Middle East', 'Middle East'],
  ['South America', 'South America'],
  ['North America', 'North America'],
  ['Oceania', 'Oceania'],
  ['Europe & Scandinavia', 'Europe'],
  ['Australia & New Zealand', 'Oceania'],
  ['Central America & Caribbean', 'North America'],
  ['Erasing Borders', 'Erasing Borders'],
]);

const IGNORED_TOP_LEVEL = new Set(['Logo', 'Clients & Partners']);

const IMAGE_EXT_RE = /\.(jpe?g|png|webp|avif)$/i;

function toSlug(name) {
  return name
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[_:]/g, ' ')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function encodeSegments(...segs) {
  return segs.map(s => encodeURIComponent(s)).join('/');
}

async function exists(p) {
  try { await fs.access(p); return true; } catch { return false; }
}

async function listDir(p) {
  const entries = await fs.readdir(p, { withFileTypes: true });
  return entries.map(e => ({ name: e.name, isDir: e.isDirectory() }));
}

async function pickWebsiteFolder() {
  const entries = await listDir(PUBLIC_DIR);
  // Prefer the most recent matching folder name
  const candidates = entries
    .filter(e => e.isDir && e.name.startsWith('Website beloveful.com-'))
    .map(e => e.name)
    .sort() // lexicographic; timestamp in name keeps order
    .reverse();
  if (candidates.length === 0) {
    throw new Error('No folder like "Website beloveful.com-*" found under public/.');
  }
  return candidates[0];
}

async function collectImages(dir) {
  const entries = await fs.readdir(dir);
  return entries
    .filter(n => IMAGE_EXT_RE.test(n))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
}

async function main() {
  const websiteFolder = await pickWebsiteFolder();
  const baseFsDir = path.join(PUBLIC_DIR, websiteFolder, 'Website beloveful.com');
  const baseUrl = `/${encodeURIComponent(websiteFolder)}/Website%20beloveful.com`;

  const top = await listDir(baseFsDir);

  const albums = [];
  let slideshowDesktop = [];
  let slideshowMobile = [];

  for (const entry of top) {
    if (!entry.isDir) continue;
    if (IGNORED_TOP_LEVEL.has(entry.name)) continue;

    if (entry.name === 'Homepage') {
      const desktopDir = path.join(baseFsDir, 'Homepage', 'Desktop Landscape');
      const mobileDir = path.join(baseFsDir, 'Homepage', 'Mobile Portrait');
      if (await exists(desktopDir)) slideshowDesktop = await collectImages(desktopDir);
      if (await exists(mobileDir)) slideshowMobile = await collectImages(mobileDir);
      continue;
    }

    const region = REGION_MAP.get(entry.name);
    if (!region) {
      // Unknown top-level folder; skip
      continue;
    }

    const regionDir = path.join(baseFsDir, entry.name);
    const regionChildren = await listDir(regionDir);

    // Country subfolders
    for (const child of regionChildren) {
      if (!child.isDir) continue;
      const countryDir = path.join(regionDir, child.name);
      const files = await collectImages(countryDir);
      if (files.length === 0) continue;

      const countryLabel = child.name;
      const slug = toSlug(countryLabel);

      const images = files.map(f => {
        const url = `${baseUrl}/${encodeSegments(entry.name, child.name, f)}`;
        return { desktop: url, mobile: url };
      });

      albums.push({ region, country: countryLabel, slug, images });
    }

    // If region folder itself contains images (no country subfolders)
    const filesAtRegion = (await collectImages(regionDir));
    if (filesAtRegion.length > 0) {
      const countryLabel = entry.name;
      const slug = toSlug(countryLabel);
      const images = filesAtRegion.map(f => {
        const url = `${baseUrl}/${encodeSegments(entry.name, f)}`;
        return { desktop: url, mobile: url };
      });
      albums.push({ region, country: countryLabel, slug, images });
    }
  }

  // Pair slideshow desktop/mobile by index, fallback to same if one side missing
  const slideshow = [];
  const n = Math.max(slideshowDesktop.length, slideshowMobile.length);
  for (let i = 0; i < n; i++) {
    const d = slideshowDesktop[i];
    const m = slideshowMobile[i] ?? d;
    if (!d && !m) continue;
    const desktopUrl = d ? `${baseUrl}/${encodeSegments('Homepage', 'Desktop Landscape', d)}` : `${baseUrl}/${encodeSegments('Homepage', 'Mobile Portrait', m)}`;
    const mobileUrl = m ? `${baseUrl}/${encodeSegments('Homepage', 'Mobile Portrait', m)}` : desktopUrl;
    slideshow.push({ desktop: desktopUrl, mobile: mobileUrl });
  }

  // Collect clients & partners logos if present
  const clientsDir = path.join(baseFsDir, 'Clients & Partners');
  let clientLogos = [];
  if (await exists(clientsDir)) {
    const clientFiles = await collectImages(clientsDir);
    clientLogos = clientFiles.map(f => `${baseUrl}/${encodeSegments('Clients & Partners', f)}`);
    // Also look one level deep for organization-specific folders
    const clientChildren = await listDir(clientsDir);
    for (const c of clientChildren) {
      if (!c.isDir) continue;
      const cdir = path.join(clientsDir, c.name);
      const files = await collectImages(cdir);
      for (const f of files) {
        clientLogos.push(`${baseUrl}/${encodeSegments('Clients & Partners', c.name, f)}`);
      }
    }
  }

  const outPath = path.join(ROOT, 'src', 'lib', 'generatedAlbums.ts');
  const header = `// AUTO-GENERATED FILE. Do not edit by hand.\n` +
`// Generated from public/${websiteFolder}/Website beloveful.com\n`;
  const body = `import type { CountryAlbum, SlideshowImage } from './data';\n\n` +
`export const GENERATED_ALBUMS: CountryAlbum[] = ${JSON.stringify(albums, null, 2)} as any;\n\n` +
`export const GENERATED_HOME_SLIDESHOW: SlideshowImage[] = ${JSON.stringify(slideshow, null, 2)} as any;\n\n` +
`export const GENERATED_CLIENT_LOGOS: string[] = ${JSON.stringify(clientLogos, null, 2)} as any;\n`;

  await fs.writeFile(outPath, header + body, 'utf8');
  console.log(`Wrote ${outPath} with ${albums.length} albums, ${slideshow.length} slideshow images, and ${clientLogos.length} client logos.`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
