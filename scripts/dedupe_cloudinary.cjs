#!/usr/bin/env node
const fs = require('fs');

const INPUT = '/home/camo/new/beloveful.com/cloudinary_asset_urls.csv';
const OUT_DEDUP_CSV = '/home/camo/new/beloveful.com/cloudinary_asset_urls.deduped.csv';
const OUT_DEDUP_JSON = '/home/camo/new/beloveful.com/cloudinary_asset_urls.deduped.json';
const OUT_DUPES = '/home/camo/new/beloveful.com/cloudinary_asset_urls.duplicates.json';

function parseCSVLine(line){
  const fields = [];
  let cur = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i+1] === '"') { cur += '"'; i++; continue; }
      inQuotes = !inQuotes;
      continue;
    }
    if (ch === ',' && !inQuotes) { fields.push(cur); cur = ''; continue; }
    cur += ch;
  }
  fields.push(cur);
  return fields;
}

function tryDecode(u){
  try { return decodeURIComponent(u); } catch (e) { return u; }
}

function normalize(u){
  // trim, decode if possible, remove accidental whitespace
  let d = tryDecode(u).trim();
  d = d.replace(/\s+/g, '');
  return d;
}

function main(){
  if (!fs.existsSync(INPUT)){
    console.error('Input not found:', INPUT);
    process.exit(2);
  }

  const raw = fs.readFileSync(INPUT, 'utf8');
  const lines = raw.split(/\r?\n/);
  if (lines.length <= 1) {
    console.error('No data rows in CSV');
    process.exit(2);
  }

  const header = lines[0];
  const headerFields = parseCSVLine(header).map(h => h.replace(/^"|"$/g, '').trim());
  const urlIndex = headerFields.findIndex(h => h.toLowerCase() === 'url');
  if (urlIndex === -1) { console.error('No url column'); process.exit(2); }

  const firstSeen = new Map();
  const dupes = {};
  let total = 0;

  for (let i = 1; i < lines.length; i++){
    const line = lines[i];
    if (!line) continue;
    total++;
    const fields = parseCSVLine(line);
    if (fields.length <= urlIndex) continue;
    let url = fields[urlIndex].trim();
    if (url.startsWith('"') && url.endsWith('"')) url = url.slice(1, -1);
    if (!url) continue;
    const key = normalize(url);
    if (!firstSeen.has(key)) {
      firstSeen.set(key, { url, originalLine: i, rawLine: line });
    } else {
      if (!dupes[key]) dupes[key] = [];
      dupes[key].push({ url, originalLine: i, rawLine: line });
    }
  }

  const unique = Array.from(firstSeen.values()).map(v => v.url);

  // write outputs
  const csvOut = ['url', ...unique].join('\n');
  fs.writeFileSync(OUT_DEDUP_CSV, csvOut, 'utf8');
  fs.writeFileSync(OUT_DEDUP_JSON, JSON.stringify(unique, null, 2), 'utf8');
  fs.writeFileSync(OUT_DUPES, JSON.stringify(dupes, null, 2), 'utf8');

  console.log('Total rows scanned:', total);
  console.log('Unique urls:', unique.length);
  console.log('Duplicate groups:', Object.keys(dupes).length);
  console.log('Wrote:', OUT_DEDUP_CSV);
  console.log('Wrote:', OUT_DEDUP_JSON);
  console.log('Wrote duplicates map:', OUT_DUPES);
}

main();
