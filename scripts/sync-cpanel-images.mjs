#!/usr/bin/env node

/**
 * Sync cPanel-hosted image folders into local JSON manifests that the app can consume.
 *
 * Usage:
 *   CPANEL_FTP_HOST=... CPANEL_FTP_USER=... CPANEL_FTP_PASSWORD=... npm run cpanel:sync
 *
 * The script connects over FTP, walks `/public_html/images` (override via CPANEL_FTP_ROOT),
 * and writes `urls.json` files under `src/lib/cloudinary-assets/**`. It also rewrites
 * `index.json` so existing asset loaders can treat the cPanel tree just like the historic
 * Cloudinary export.
 */

import { Client } from 'basic-ftp';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');
const outputRoot = path.join(repoRoot, 'src', 'lib', 'cloudinary-assets');

let FTP_HOST = process.env.CPANEL_FTP_HOST;
let FTP_USER = process.env.CPANEL_FTP_USER;
let FTP_PASSWORD = process.env.CPANEL_FTP_PASSWORD;
let FTP_PORT = Number(process.env.CPANEL_FTP_PORT || 21);
let FTP_ROOT = process.env.CPANEL_FTP_ROOT || '/public_html/images';
const BASE_URL = (process.env.CPANEL_IMAGES_BASE_URL || '/Website%20beloveful.com').replace(/\/$/, '');
const SECURE = (process.env.CPANEL_FTP_SECURE || '').toLowerCase() === 'true';

async function loadFtpSimpleProfile() {
  if (FTP_HOST && FTP_USER && FTP_PASSWORD) return;

  const home = process.env.HOME || process.env.USERPROFILE;
  const candidates = [];
  if (home) {
    candidates.push(
      path.join(
        home,
        '.config',
        'Code',
        'User',
        'globalStorage',
        'humy2833.ftp-simple',
        'ftp-simple-temp.json',
      ),
    );
  }
  candidates.push(
    path.join(
      repoRoot,
      '.config',
      'Code',
      'User',
      'globalStorage',
      'humy2833.ftp-simple',
      'ftp-simple-temp.json',
    ),
  );

  for (const configPath of candidates) {
    try {
      const raw = await fs.readFile(configPath, 'utf8');
      const parsed = JSON.parse(raw);
      const first = Array.isArray(parsed) ? parsed[0] : null;
      if (!first) continue;
      FTP_HOST ??= first.host;
      FTP_USER ??= first.username;
      FTP_PASSWORD ??= first.password;
      if (!process.env.CPANEL_FTP_ROOT && first.path && first.path !== '/') {
        FTP_ROOT = first.path;
      }
      console.log(`ℹ️  Loaded FTP credentials from ftp-simple profile: ${first.name || first.host}`);
      return;
    } catch (error) {
      if (error.code !== 'ENOENT') {
        console.warn('⚠️  Unable to read VS Code ftp-simple config:', error.message);
      }
    }
  }
}

await loadFtpSimpleProfile();

if (!FTP_HOST || !FTP_USER || !FTP_PASSWORD) {
  console.error('❌  Missing CPANEL_FTP_HOST / CPANEL_FTP_USER / CPANEL_FTP_PASSWORD environment variables.');
  process.exit(1);
}

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

const SPECIAL_TYPES = new Map([
  ['Homepage', 'homepage'],
  ['Logo', 'logo'],
  ['Clients & Partners', 'clients'],
  ['clients', 'clients'],
  ['Erasing Borders', 'erasing-borders'],
  ['Open Edition size 5x7', 'open-edition'],
  ['Workshop Photos', 'workshop'],
]);

const IMAGE_EXTENSIONS = new Set([
  '.jpg',
  '.jpeg',
  '.png',
  '.gif',
  '.webp',
  '.tif',
  '.tiff',
  '.bmp',
  '.svg',
  '.avif',
  '.heic',
]);

const foldersMeta = [];
let totalAssets = 0;
const seenFolders = new Set();

const client = new Client();
client.ftp.verbose = false;

function encodeSegments(parts) {
  return parts.map((segment) => encodeURIComponent(segment)).join('/');
}

function isSafeName(name) {
  return (
    name &&
    name !== '.' &&
    name !== '..' &&
    !name.startsWith('__MACOSX') &&
    !name.startsWith('.')
  );
}

function isImageFile(name) {
  const ext = path.extname(name || '').toLowerCase();
  return IMAGE_EXTENSIONS.has(ext);
}

function folderTypeFor(root) {
  if (TRAVEL_REGIONS.has(root)) {
    return 'country';
  }
  return SPECIAL_TYPES.get(root) || 'category';
}

function buildFolderMeta(relativeParts, count) {
  const folder = relativeParts.join('/');
  const root = relativeParts[0];
  const rest = relativeParts.slice(1);
  const meta = {
    folder,
    path: `cloudinary-assets/${folder}`,
    type: folderTypeFor(root),
    count,
    assetsPath: `cloudinary-assets/${folder}/urls.json`,
  };

  if (TRAVEL_REGIONS.has(root)) {
    meta.region = root;
    meta.country = rest.length ? rest.join(' / ') : root;
  } else {
    meta.category = root;
  }

  return meta;
}

async function writeAlbum(relativeParts, files) {
  const relFolder = path.join(...relativeParts);
  const diskDir = path.join(outputRoot, relFolder);
  await fs.mkdir(diskDir, { recursive: true });

  const payload = files.map((file) => {
      const relativeUrl = `${encodeSegments([...relativeParts, file.name])}`;
      const url = BASE_URL.startsWith('http')
        ? `${BASE_URL}/${relativeUrl}`
        : `${BASE_URL}/${relativeUrl}`;
    return {
      filename: file.name,
      url,
      size: typeof file.size === 'number' ? file.size : undefined,
    };
  });

  await fs.writeFile(
    path.join(diskDir, 'urls.json'),
    JSON.stringify(payload, null, 2),
    'utf8',
  );

  const meta = buildFolderMeta(relativeParts, payload.length);
  if (!seenFolders.has(meta.folder)) {
    foldersMeta.push(meta);
    seenFolders.add(meta.folder);
  }

  totalAssets += payload.length;
  console.log(`✅  ${meta.folder} — ${payload.length} images`);
}

async function scanDirectory(remotePath, relativeParts) {
  let entries;
  try {
    entries = await client.list(remotePath);
  } catch (error) {
    console.warn(`⚠️  Failed to list ${remotePath}:`, error.message);
    return;
  }

  const files = [];
  const directories = [];

  for (const entry of entries) {
    if (!isSafeName(entry.name)) continue;
    if (entry.isDirectory) {
      directories.push(entry);
    } else if (isImageFile(entry.name)) {
      files.push(entry);
    }
  }

  if (files.length) {
    await writeAlbum(relativeParts, files);
  }

  for (const dir of directories) {
    await scanDirectory(`${remotePath}/${dir.name}`, [...relativeParts, dir.name]);
  }
}

async function cleanExistingFolders(rootNames) {
  await Promise.all(
    rootNames.map(async (name) => {
      const target = path.join(outputRoot, name);
      await fs.rm(target, { recursive: true, force: true });
    }),
  );
}

async function main() {
  await client.access({
    host: FTP_HOST,
    user: FTP_USER,
    password: FTP_PASSWORD,
    port: FTP_PORT,
    secure: SECURE,
  });

  console.log(`☁️  Connected to ${FTP_HOST}`);
  console.log(`📂 Syncing directories under ${FTP_ROOT}`);

  let rootEntries = await client.list(FTP_ROOT);
  rootEntries = rootEntries.filter(
    (entry) => entry.isDirectory && isSafeName(entry.name),
  );

  await cleanExistingFolders(rootEntries.map((entry) => entry.name));

  for (const entry of rootEntries) {
    console.log(`\n➡️  Scanning ${entry.name}`);
    await scanDirectory(`${FTP_ROOT}/${entry.name}`, [entry.name]);
  }

  foldersMeta.sort((a, b) => a.folder.localeCompare(b.folder));

  const summary = {
    considered: totalAssets,
    skipped_already_foldered: 0,
    matched_regions: new Set(
      foldersMeta.map((meta) => meta.region || meta.category || meta.folder.split('/')[0]),
    ).size,
    unknown_count: 0,
  };

  const indexPayload = {
    summary,
    totals: {
      folders: foldersMeta.length,
      assets: totalAssets,
    },
    folders: foldersMeta,
  };

  await fs.writeFile(
    path.join(outputRoot, 'index.json'),
    JSON.stringify(indexPayload, null, 2),
    'utf8',
  );

  console.log('\n🎉  Sync complete!');
  console.log(`   Folders: ${foldersMeta.length}`);
  console.log(`   Images : ${totalAssets}`);
}

main()
  .catch((error) => {
    console.error('❌  Sync failed:', error);
    process.exitCode = 1;
  })
  .finally(() => {
    client.close();
  });
