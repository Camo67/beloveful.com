#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');
const outputRoot = path.join(repoRoot, 'build', 'bluehost');
const publicHtmlRoot = path.join(outputRoot, 'public_html');
const distRoot = path.join(repoRoot, 'dist');
const overlayRoot = path.join(repoRoot, 'bluehost', 'public_html');
const contentAssetsRoot = path.join(publicHtmlRoot, 'content-assets');

const TRAVEL_REGIONS = new Set([
  'Africa',
  'Asia',
  'Central America & Caribbean',
  'Europe & Scandinavia',
  'Middle East',
  'North America',
  'South America',
  'Oceania',
]);

const DEFAULT_ALBUMS = [
  ['Africa', 'Egypt', 'egypt'],
  ['Africa', 'Ethiopia', 'ethiopia'],
  ['Africa', 'Morocco', 'morocco'],
  ['Africa', 'Namibia', 'namibia'],
  ['Africa', 'South Africa', 'south-africa'],
  ['Asia', 'Hong Kong', 'hong-kong'],
  ['Asia', 'India', 'india'],
  ['Asia', 'Japan', 'japan'],
  ['Asia', 'Myanmar', 'myanmar'],
  ['Asia', 'Nepal', 'nepal'],
  ['Asia', 'Philippines', 'phillipines'],
  ['Asia', 'Thailand', 'thailand'],
  ['Asia', 'Vietnam', 'vietnam'],
  ['Central America & Caribbean', 'Caribbean', 'caribbean'],
  ['Central America & Caribbean', 'Cuba', 'cuba'],
  ['Central America & Caribbean', 'Mexico', 'mexico'],
  ['Central America & Caribbean', 'Puerto Rico', 'puerto-rico'],
  ['Europe & Scandinavia', 'France', 'france'],
  ['Europe & Scandinavia', 'Greece', 'greece'],
  ['Europe & Scandinavia', 'Italy', 'italy'],
  ['Europe & Scandinavia', 'Portugal', 'portugal'],
  ['Europe & Scandinavia', 'Spain', 'spain'],
  ['Europe & Scandinavia', 'UK & Ireland', 'uk-ireland'],
  ['Middle East', 'Jordan', 'jordan'],
  ['Middle East', 'Israel / Palestine', 'israel-palestine'],
  ['North America', 'Chicago', 'chicago'],
  ['North America', 'New York', 'new-york'],
  ['South America', 'Argentina', 'argentina'],
];

const ALBUM_SLUGS = new Map(
  DEFAULT_ALBUMS.map(([region, country, slug]) => [`${normalizeLabel(region)}|${normalizeLabel(country)}`, slug]),
);

await runCommand('node', ['scripts/build-app.mjs', 'bluehost']);

await fs.rm(outputRoot, { recursive: true, force: true });
await fs.mkdir(publicHtmlRoot, { recursive: true });

await copyDirectory(distRoot, publicHtmlRoot);
await copyDirectory(overlayRoot, publicHtmlRoot);

await fs.mkdir(contentAssetsRoot, { recursive: true });
await copyDirectory(path.join(repoRoot, 'src', 'lib', 'cloudinary-assets'), path.join(contentAssetsRoot, 'cloudinary-assets'));
await copyDirectory(path.join(repoRoot, 'src', 'lib', 'portolio'), path.join(contentAssetsRoot, 'portolio'));

const defaultData = await buildDefaultData();
await fs.mkdir(path.join(publicHtmlRoot, '_cms_data', 'bootstrap'), { recursive: true });
await fs.writeFile(
  path.join(publicHtmlRoot, '_cms_data', 'bootstrap', 'default-data.json'),
  `${JSON.stringify(defaultData, null, 2)}\n`,
  'utf8',
);

await fs.writeFile(
  path.join(outputRoot, 'DEPLOYMENT.txt'),
  [
    'Upload the contents of public_html to Bluehost cPanel /public_html via FTP.',
    'The _cms_data/runtime directory is created on first request and should be preserved across future deploys.',
    'Client uploads are stored under /public_html/uploads and should also be preserved during future deploys.',
  ].join('\n') + '\n',
  'utf8',
);

console.log(`Bluehost package ready at ${outputRoot}`);

async function buildDefaultData() {
  const now = new Date().toISOString();
  const albums = [];
  const images = [];
  const slideshowImages = await buildSlideshow(now);
  const contentBlocks = [];
  const settings = {
    contact_email: 'tony@beloveful.com',
    print_email: 'tony@beloveful.com',
    calendly_url: process.env.VITE_CALENDLY_LINK || '',
    updated_at: now,
  };

  const libraryRoot = path.join(repoRoot, 'public', 'Website beloveful.com');
  let albumId = 1;
  let imageId = 1;

  const regions = await safeReadDir(libraryRoot);
  for (const regionEntry of regions) {
    if (!regionEntry.isDirectory() || !TRAVEL_REGIONS.has(regionEntry.name)) {
      continue;
    }

    const regionName = regionEntry.name;
    const regionPath = path.join(libraryRoot, regionName);
    const countries = await safeReadDir(regionPath);

    for (const countryEntry of countries) {
      if (!countryEntry.isDirectory()) {
        continue;
      }

      const countryName = countryEntry.name;
      const files = await walkImages(path.join(regionPath, countryName), [regionName, countryName]);
      if (!files.length) {
        continue;
      }

      const slug = uniqueSlug(
        albums,
        ALBUM_SLUGS.get(`${normalizeLabel(regionName)}|${normalizeLabel(countryName)}`) || slugify(countryName),
      );

      const album = {
        id: albumId++,
        region: regionName,
        country: countryName,
        slug,
        description: '',
        is_published: true,
        sort_order: albums.length,
        created_at: now,
        updated_at: now,
      };
      albums.push(album);

      for (const [index, file] of files.entries()) {
        const publicUrl = `/Website%20beloveful.com/${file.relativeSegments.map(encodePathSegment).join('/')}`;
        images.push({
          id: imageId++,
          album_id: album.id,
          title: titleFromFilename(file.name),
          description: '',
          desktop_url: publicUrl,
          mobile_url: publicUrl,
          cloudinary_public_id: `seed:${file.relativeSegments.join('/')}`,
          source_path: file.relativeSegments.join('/'),
          is_published: true,
          sort_order: index,
          created_at: now,
          updated_at: now,
        });
      }
    }
  }

  return {
    albums,
    images,
    slideshow_images: slideshowImages,
    content_blocks: contentBlocks,
    settings,
  };
}

async function buildSlideshow(now) {
  const desktopPath = path.join(repoRoot, 'src', 'lib', 'cloudinary-assets', 'Homepage', 'Desktop Landscape', 'urls.json');
  const mobilePath = path.join(repoRoot, 'src', 'lib', 'cloudinary-assets', 'Homepage', 'Mobile Portrait', 'urls.json');

  const desktop = await readJsonArray(desktopPath);
  const mobile = await readJsonArray(mobilePath);
  const length = Math.max(desktop.length, mobile.length);
  const slideshow = [];

  for (let index = 0; index < length; index += 1) {
    const desktopUrl = extractUrl(desktop[index]);
    const mobileUrl = extractUrl(mobile[index]) || desktopUrl;
    if (!desktopUrl && !mobileUrl) {
      continue;
    }

    slideshow.push({
      id: slideshow.length + 1,
      title: titleFromFilename(desktopUrl || mobileUrl),
      desktop_url: desktopUrl || mobileUrl,
      mobile_url: mobileUrl || desktopUrl,
      sort_order: index,
      is_active: true,
      created_at: now,
      updated_at: now,
    });
  }

  return slideshow;
}

async function readJsonArray(filePath) {
  try {
    const raw = await fs.readFile(filePath, 'utf8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function extractUrl(entry) {
  if (!entry) return '';
  if (typeof entry === 'string') return entry;
  if (typeof entry.url === 'string') return entry.url;
  if (typeof entry.secure_url === 'string') return entry.secure_url;
  return '';
}

async function walkImages(root, relativeSegments) {
  const entries = await safeReadDir(root);
  const files = [];

  for (const entry of entries) {
    if (entry.name.startsWith('.')) continue;
    const absolutePath = path.join(root, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walkImages(absolutePath, [...relativeSegments, entry.name])));
      continue;
    }
    if (!isImageFile(entry.name)) continue;
    files.push({
      name: entry.name,
      relativeSegments: [...relativeSegments, entry.name],
    });
  }

  files.sort((left, right) => left.relativeSegments.join('/').localeCompare(right.relativeSegments.join('/')));
  return files;
}

async function safeReadDir(target) {
  try {
    return await fs.readdir(target, { withFileTypes: true });
  } catch {
    return [];
  }
}

function isImageFile(name) {
  return /\.(avif|bmp|gif|heic|jpeg|jpg|png|svg|tif|tiff|webp)$/i.test(name);
}

function titleFromFilename(value) {
  const fileName = path.basename(value).replace(/\.[^.]+$/, '');
  return fileName.replace(/[_-]+/g, ' ').replace(/\s+/g, ' ').trim();
}

function slugify(value) {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function normalizeLabel(value) {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '');
}

function uniqueSlug(albums, preferred) {
  const base = preferred || 'album';
  let candidate = base;
  let counter = 2;
  while (albums.some((album) => album.slug === candidate)) {
    candidate = `${base}-${counter++}`;
  }
  return candidate;
}

function encodePathSegment(value) {
  return encodeURIComponent(value);
}

async function copyDirectory(from, to) {
  await fs.mkdir(to, { recursive: true });

  if (process.platform !== 'win32') {
    await runCommand('rsync', ['-a', `${from}/`, `${to}/`]);
    return;
  }

  await fs.cp(from, to, { recursive: true, force: true });
}

function runCommand(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: repoRoot,
      stdio: 'inherit',
      shell: process.platform === 'win32',
      env: process.env,
    });

    child.on('exit', (code) => {
      if (code === 0) {
        resolve();
        return;
      }
      reject(new Error(`${command} ${args.join(' ')} failed with code ${code}`));
    });
  });
}
