#!/usr/bin/env node

import { config } from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { homedir } from 'os';

// Load environment variables from .env.local
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
config({ path: path.resolve(__dirname, '../.env.local') });

/**
 * Sync cPanel-hosted image folders via SFTP into local JSON manifests that the app can consume.
 *
 * Usage:
 *   CPANEL_SFTP_HOST=... CPANEL_SFTP_USER=... CPANEL_SFTP_PRIVATE_KEY_PATH=... npm run cpanel:sftp:sync
 *
 * The script connects over SFTP, walks the Bluehost image root
 * `/public_html/beloveful.com/public_html/images` (override via CPANEL_SFTP_ROOT),
 * writes `urls.json` files under `src/lib/public-html-assets/**` for remote image
 * URLs. It also rewrites `index.json` so other tooling can treat the hosted cPanel tree
 * as the canonical source.
 */

import fs from 'fs/promises';
import { existsSync } from 'fs';  // Import the synchronous fs module for existsSync
import SftpClient from 'ssh2-sftp-client';

const repoRoot = path.resolve(__dirname, '..');
const outputRoot = path.join(repoRoot, 'src', 'lib', 'public-html-assets');

// SFTP Configuration
let SFTP_HOST = process.env.CPANEL_SFTP_HOST || process.env.CPANEL_FTP_HOST;
let SFTP_USER = process.env.CPANEL_SFTP_USER || process.env.CPANEL_FTP_USER;
let SFTP_PRIVATE_KEY_PATH = process.env.CPANEL_SFTP_PRIVATE_KEY_PATH;

// Expand ~ to home directory if present in the path
if (SFTP_PRIVATE_KEY_PATH && SFTP_PRIVATE_KEY_PATH.startsWith('~')) {
  SFTP_PRIVATE_KEY_PATH = path.join(homedir(), SFTP_PRIVATE_KEY_PATH.slice(2));
}

let SFTP_PASSWORD = process.env.CPANEL_SFTP_PASSWORD || process.env.CPANEL_FTP_PASSWORD; // Use SFTP password or fall back to FTP password
let SFTP_PASSPHRASE = process.env.CPANEL_SFTP_PASSPHRASE; // Extract the passphrase from environment
let SFTP_PORT = Number(process.env.CPANEL_SFTP_PORT || 22); // SFTP default port
let SFTP_ROOT = process.env.CPANEL_SFTP_ROOT || '/public_html/beloveful.com/public_html/images';

const BASE_URL = (process.env.CPANEL_IMAGES_BASE_URL || '/images').replace(/\/$/, '');
const IGNORED_FOLDER_PATTERNS = new Set(
  (process.env.CPANEL_SYNC_IGNORE_FOLDERS || '')
    .split(',')
    .map((folder) => folder.trim().toLowerCase())
    .filter(Boolean),
);

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

const sftp = new SftpClient();

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

function isIgnoredFolder(relativeParts) {
  return relativeParts.some((part) => IGNORED_FOLDER_PATTERNS.has(part.toLowerCase()));
}

function buildFolderMeta(relativeParts, count) {
  const folder = relativeParts.join('/');
  const root = relativeParts[0];
  const rest = relativeParts.slice(1);
  const meta = {
    folder,
    path: `public-html-assets/${folder}`,
    type: folderTypeFor(root),
    count,
    assets: `public-html-assets/${folder}/urls.json`,
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
  if (isIgnoredFolder(relativeParts)) {
    console.log(`⏭️  Skipping ignored folder ${relativeParts.join('/')}`);
    return;
  }

  let entries;
  try {
    entries = await sftp.list(remotePath);
  } catch (error) {
    console.warn(`⚠️  Failed to list ${remotePath}:`, error.message);
    return;
  }

  const files = [];
  const directories = [];

  for (const entry of entries) {
    if (!isSafeName(entry.name)) continue;
    if (entry.type === 'd') {
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

async function main() {
  // Setup SFTP connection
  let connectionConfig = {
    host: SFTP_HOST,
    port: SFTP_PORT,
    username: SFTP_USER,
    readyTimeout: 60000,  // Increase timeout
    // Add debugging
    debug: (message) => {
      console.log('SSH DEBUG:', message);
    }
  };

  // Use private key if available and exists, with password fallback
  let authMethod = [];
  if (SFTP_PRIVATE_KEY_PATH && existsSync(SFTP_PRIVATE_KEY_PATH)) {
    connectionConfig.privateKey = await fs.readFile(SFTP_PRIVATE_KEY_PATH, 'utf8');
    if (SFTP_PASSPHRASE) {
      connectionConfig.passphrase = SFTP_PASSPHRASE;
    }
    authMethod.push('SSH key authentication');
  }
  if (SFTP_PASSWORD) {
    connectionConfig.password = SFTP_PASSWORD;
    authMethod.push('password authentication');
  }
  if (authMethod.length === 0) {
    console.error('❌  Missing authentication method. Provide either CPANEL_SFTP_PRIVATE_KEY_PATH or CPANEL_SFTP_PASSWORD.');
    process.exit(1);
  }
  console.log(`🔒 Connecting via SFTP using ${authMethod.join(' and ')} to ${SFTP_HOST}`);

  try {
    await sftp.connect(connectionConfig);
    console.log(`✅ Successfully connected to ${SFTP_HOST} via SFTP`);
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    process.exit(1);
  }

  console.log(`📂 Syncing directories under ${SFTP_ROOT}`);

  let rootEntries = await sftp.list(SFTP_ROOT);
  rootEntries = rootEntries.filter(
    (entry) => entry.type === 'd' && isSafeName(entry.name), // directories only
  );

  await cleanExistingFolders(rootEntries.map((entry) => entry.name));

  for (const entry of rootEntries) {
    console.log(`\n➡️  Scanning ${entry.name}`);
    await scanDirectory(`${SFTP_ROOT}/${entry.name}`, [entry.name]);
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
    sftp.end();
  });