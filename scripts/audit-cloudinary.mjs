#!/usr/bin/env node
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Configure Cloudinary (do not log secrets)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// Country/region mappings (flexible identifiers)
const COUNTRY_MAPPING = new Map([
  // Africa
  ['EGY', { country: 'Egypt', region: 'Africa' }],
  ['ETH', { country: 'Ethiopia', region: 'Africa' }],
  ['NAM', { country: 'Namibia', region: 'Africa' }],
  ['MAR', { country: 'Morocco', region: 'Africa' }],
  ['MOR', { country: 'Morocco', region: 'Africa' }],
  ['ZAF', { country: 'South Africa', region: 'Africa' }],
  ['RSA', { country: 'South Africa', region: 'Africa' }],
  ['SOUTH AFRICA', { country: 'South Africa', region: 'Africa' }],

  // Asia
  ['HK', { country: 'Hong Kong', region: 'Asia' }],
  ['IND', { country: 'India', region: 'Asia' }],
  ['JAP', { country: 'Japan', region: 'Asia' }],
  ['JPN', { country: 'Japan', region: 'Asia' }],
  ['MYA', { country: 'Myanmar', region: 'Asia' }],
  ['NEP', { country: 'Nepal', region: 'Asia' }],
  ['NPL', { country: 'Nepal', region: 'Asia' }],
  ['PHI', { country: 'Philippines', region: 'Asia' }],
  ['THAI', { country: 'Thailand', region: 'Asia' }],
  ['THA', { country: 'Thailand', region: 'Asia' }],
  ['VIET', { country: 'Vietnam', region: 'Asia' }],

  // Middle East
  ['PAL', { country: 'Israel_Palestine', region: 'Middle East' }],
  ['ISR', { country: 'Israel_Palestine', region: 'Middle East' }],
  ['JOR', { country: 'Jordan', region: 'Middle East' }],
  ['SAU', { country: 'Saudi Arabia', region: 'Middle East' }],
  ['SAUDI', { country: 'Saudi Arabia', region: 'Middle East' }],

  // Europe
  ['ITA', { country: 'Italy', region: 'Europe' }],
  ['FRA', { country: 'France', region: 'Europe' }],
  ['ESP', { country: 'Spain', region: 'Europe' }],
  ['POR', { country: 'Portugal', region: 'Europe' }],
  ['GRE', { country: 'Greece', region: 'Europe' }],
  ['GRC', { country: 'Greece', region: 'Europe' }],
  ['UK', { country: 'UK & Ireland', region: 'Europe' }],
  ['IRL', { country: 'UK & Ireland', region: 'Europe' }],

  // North America
  ['CHI', { country: 'Chicago', region: 'North America' }],
  ['NYC', { country: 'New York', region: 'North America' }],
  ['PR', { country: 'Puerto Rico', region: 'North America' }],
  ['CAR', { country: 'Caribbean', region: 'North America' }],
  ['STM', { country: 'St. Martin', region: 'North America' }],
  ['CAL', { country: 'California', region: 'North America' }],
  ['TEX', { country: 'Texas', region: 'North America' }],
  ['MEX', { country: 'Mexico', region: 'North America' }],
  ['CUBA', { country: 'Cuba', region: 'North America' }],
  ['CUB', { country: 'Cuba', region: 'North America' }],

  // South America
  ['ARG', { country: 'Argentina', region: 'South America' }],
  ['BRA', { country: 'Brazil', region: 'South America' }],

  // Oceania
  ['AUS', { country: 'Australia', region: 'Oceania' }],
  ['AUSTRALIA', { country: 'Australia', region: 'Oceania' }],
  ['NZ', { country: 'New Zealand', region: 'Oceania' }],
  ['NZL', { country: 'New Zealand', region: 'Oceania' }],
  ['NEW ZEALAND', { country: 'New Zealand', region: 'Oceania' }],
]);

const REGION_FOLDER_MAP = new Map([
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

function parseRegionCountryFromPath(folderOrPublicId) {
  if (typeof folderOrPublicId !== 'string') return null;
  const parts = folderOrPublicId.split('/');
  const idx = parts.findIndex(p => p.toLowerCase() === 'website beloveful.com');
  if (idx === -1) return null;
  const regionFolder = parts[idx + 1];
  const countryFolder = parts[idx + 2];
  if (!regionFolder) return null;
  const region = REGION_FOLDER_MAP.get(regionFolder) || regionFolder;
  const country = countryFolder || region;
  return { region, country };
}

function extractCodePrefix(publicId) {
  const base = publicId.split('/').pop() || publicId;
  const m = base.match(/^([A-Z]{2,4})[-_]/);
  return m ? m[1] : null;
}

function getCountryInfo(resource) {
  // Prefer folder-based mapping
  const byFolder = parseRegionCountryFromPath(resource.folder || resource.public_id);
  if (byFolder) return byFolder;

  // Try public_id prefix mapping
  const code = extractCodePrefix(resource.public_id);
  if (code && COUNTRY_MAPPING.has(code)) return COUNTRY_MAPPING.get(code);

  // Special 'SA' ambiguity
  if (code === 'SA') {
    const folderLc = String(resource.folder || '').toLowerCase();
    if (folderLc.includes('south africa')) return { country: 'South Africa', region: 'Africa' };
    if (folderLc.includes('saudi') || folderLc.includes('middle east')) return { country: 'Saudi Arabia', region: 'Middle East' };
  }

  return null;
}

async function fetchAllResources() {
  const all = [];
  let next = null;
  do {
    const res = await cloudinary.api.resources({
      type: 'upload', resource_type: 'image', max_results: 500, next_cursor: next,
      context: true, metadata: true,
    });
    all.push(...res.resources);
    next = res.next_cursor;
    // polite delay
    await new Promise(r => setTimeout(r, 80));
  } while (next);
  return all;
}

function readCodeAlbumsPairs() {
  const codePath = path.join(process.cwd(), 'src', 'lib', 'generatedAlbums.ts');
  const txt = fs.readFileSync(codePath, 'utf8');
  // crude regex to capture region and country within album objects
  const re = /region:\s*"([^"]+)",[\s\S]*?country:\s*"([^"]+)"/g;
  const pairs = [];
  let m;
  while ((m = re.exec(txt))) {
    pairs.push({ region: m[1], country: m[2] });
  }
  return pairs;
}

function keyOf(rc) { return `${rc.region}|${rc.country}`; }

(async () => {
  console.log('Auditing Cloudinary vs code albums...');
  const resources = await fetchAllResources();
  console.log(`Fetched ${resources.length} images from Cloudinary`);

  // Build cloud albums
  const cloudMap = new Map();
  const unmapped = [];
  for (const r of resources) {
    const info = getCountryInfo(r);
    if (info) {
      const k = keyOf(info);
      if (!cloudMap.has(k)) cloudMap.set(k, { ...info, count: 0 });
      cloudMap.get(k).count++;
    } else {
      unmapped.push({ public_id: r.public_id, folder: r.folder || '', url: r.secure_url });
    }
  }

  const codePairs = readCodeAlbumsPairs();
  const codeSet = new Set(codePairs.map(keyOf));

  const cloudOnly = [];
  for (const [k, v] of cloudMap) {
    if (!codeSet.has(k)) cloudOnly.push(v);
  }

  const cloudSet = new Set([...cloudMap.keys()]);
  const codeOnly = [];
  for (const rc of codePairs) {
    const k = keyOf(rc);
    if (!cloudSet.has(k)) codeOnly.push(rc);
  }

  // Unmapped folders summary
  const unmappedByFolder = new Map();
  for (const u of unmapped) {
    const folder = (u.folder || (u.public_id.includes('/') ? u.public_id.split('/').slice(0, -1).join('/') : ''));
    const f = folder || '(root)';
    unmappedByFolder.set(f, (unmappedByFolder.get(f) || 0) + 1);
  }
  const topUnmappedFolders = [...unmappedByFolder.entries()]
    .sort((a,b) => b[1]-a[1]).slice(0, 15)
    .map(([folder, count]) => ({ folder, count }));

  const report = {
    summary: {
      totalImages: resources.length,
      cloudAlbums: cloudMap.size,
      codeAlbums: codeSet.size,
      unmappedImages: unmapped.length,
    },
    cloudOnlyAlbums: cloudOnly.sort((a,b)=> a.region.localeCompare(b.region) || a.country.localeCompare(b.country)),
    codeOnlyAlbums: codeOnly.sort((a,b)=> a.region.localeCompare(b.region) || a.country.localeCompare(b.country)),
    unmapped: {
      total: unmapped.length,
      topFolders: topUnmappedFolders,
      samplePublicIds: unmapped.slice(0, 20).map(u => u.public_id),
    }
  };

  const outPath = path.join(process.cwd(), 'cloudinary_audit_report.json');
  fs.writeFileSync(outPath, JSON.stringify(report, null, 2));

  console.log('Audit complete.');
  console.log(JSON.stringify(report.summary));
  console.log('Cloud-only albums:', report.cloudOnlyAlbums.length);
  console.log('Code-only albums:', report.codeOnlyAlbums.length);
  console.log('Unmapped images:', report.unmappedImages);
})();
