#!/usr/bin/env ts-node
/**
 * Generate src/lib/cloudinaryAlbums.ts from Cloudinary folders.
 *
 * Env vars required:
 * - CLOUDINARY_CLOUD_NAME
 * - CLOUDINARY_API_KEY
 * - CLOUDINARY_API_SECRET
 *
 * Usage:
 *   npx ts-node scripts/generate-cloudinary-albums.ts
 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const API_KEY = process.env.CLOUDINARY_API_KEY;
const API_SECRET = process.env.CLOUDINARY_API_SECRET;

if (!CLOUD_NAME || !API_KEY || !API_SECRET) {
  console.error('Missing Cloudinary credentials. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET');
  process.exit(1);
}

const API_BASE = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/resources/image`;

type CloudinaryResource = {
  public_id: string;
  secure_url: string;
  folder?: string;
};

type Album = {
  region: string;
  country: string;
  slug: string;
  images: { desktop: string; mobile: string }[];
};

function signQuery(params: Record<string, string>) {
  const toSign = Object.keys(params)
    .sort()
    .map((k) => `${k}=${params[k]}`)
    .join('&') + API_SECRET;
  return crypto.createHash('sha1').update(toSign).digest('hex');
}

async function fetchAll(): Promise<CloudinaryResource[]> {
  const all: CloudinaryResource[] = [];
  let nextCursor: string | undefined;
  do {
    const ts = Math.floor(Date.now() / 1000).toString();
    const params: Record<string, string> = {
      max_results: '500',
      type: 'upload',
      prefix: 'Website beloveful.com/',
      timestamp: ts,
    };
    if (nextCursor) params.next_cursor = nextCursor;
    const signature = signQuery(params);
    const body = new URLSearchParams({ ...params, api_key: API_KEY, signature });

    const res = await fetch(API_BASE + '/search', { method: 'POST', body });
    if (!res.ok) throw new Error(`Cloudinary error: ${res.status} ${await res.text()}`);
    const data = (await res.json()) as { resources: CloudinaryResource[]; next_cursor?: string };
    all.push(...data.resources);
    nextCursor = data.next_cursor;
  } while (nextCursor);
  return all;
}

function inferAlbum(resource: CloudinaryResource): { region: string; country: string } | null {
  // Expect folder like: Website beloveful.com/<Region>/<Country>/... or .../Erasing Borders
  const parts = (resource.public_id || '').split('/');
  const idx = parts.indexOf('Website beloveful.com');
  if (idx === -1) return null;
  const region = parts[idx + 1];
  if (!region) return null;
  const country = parts[idx + 2] || 'Misc';
  return { region, country };
}

function slugifyCountry(s: string) {
  return s.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

(async () => {
  const resources = await fetchAll();
  const byAlbum = new Map<string, Album>();

  for (const r of resources) {
    const meta = inferAlbum(r);
    if (!meta) continue;
    const key = `${meta.region}::${meta.country}`;
    if (!byAlbum.has(key)) {
      byAlbum.set(key, {
        region: meta.region,
        country: meta.country,
        slug: slugifyCountry(meta.country === 'Erasing Borders' ? 'erasing-borders' : meta.country),
        images: [],
      });
    }
    const album = byAlbum.get(key)!;
    album.images.push({ desktop: r.secure_url, mobile: r.secure_url });
  }

  // Sort albums by country
  const albums = Array.from(byAlbum.values()).sort((a, b) => a.country.localeCompare(b.country));

  const out = `// Generated from Cloudinary API on ${new Date().toISOString()}\nimport { CountryAlbum } from './data';\n\nexport const CLOUDINARY_ALBUMS: CountryAlbum[] = ${JSON.stringify(albums, null, 2)};\n`;
  const dest = path.resolve(process.cwd(), 'src/lib/cloudinaryAlbums.ts');
  fs.writeFileSync(dest, out);
  console.log(`Wrote ${albums.length} albums to ${dest}`);
})();
