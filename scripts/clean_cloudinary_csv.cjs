#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const INPUT = '/home/camo/new/beloveful.com/cloudinary_asset_urls.csv';
const OUT_CSV = '/home/camo/new/beloveful.com/cloudinary_asset_urls.cleaned.csv';
const OUT_JSON = '/home/camo/new/beloveful.com/cloudinary_asset_urls.cleaned.json';

function parseCSVLine(line){
  const fields = [];
  let cur = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      // handle double-quote escape inside quoted field
      if (inQuotes && line[i+1] === '"') { cur += '"'; i++; continue; }
      inQuotes = !inQuotes;
      continue;
    }
    if (ch === ',' && !inQuotes) {
      fields.push(cur);
      cur = '';
      continue;
    }
    cur += ch;
  }
  fields.push(cur);
  return fields;
}

function main(){
  if (!fs.existsSync(INPUT)){
    console.error('Input file not found:', INPUT);
    process.exit(2);
  }

  const raw = fs.readFileSync(INPUT, 'utf8');
  const lines = raw.split(/\r?\n/);
  if (lines.length === 0) {
    console.error('Empty input file');
    process.exit(2);
  }

  // header -> find index of "url" column robustly
  const header = lines[0];
  const headerFields = parseCSVLine(header).map(h => h.replace(/^"|"$/g, '').trim());
  const urlIndex = headerFields.findIndex(h => h.toLowerCase() === 'url');
  if (urlIndex === -1) {
    console.error('Could not find "url" column in header');
    process.exit(2);
  }

  const urls = [];
  let malformed = 0;
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line) continue;
    const fields = parseCSVLine(line);
    if (fields.length <= urlIndex) { malformed++; continue; }
    let url = fields[urlIndex].trim();
    // strip surrounding quotes if any
    if (url.startsWith('"') && url.endsWith('"')) url = url.slice(1, -1);
    url = url.trim();
    if (!url) continue;
    // only accept http/https
    if (!/^https?:\/\//i.test(url)) { malformed++; continue; }
    urls.push(url);
  }

  // dedupe and normalize
  const uniq = Array.from(new Set(urls.map(u => u.replace(/\s+/g, '')))); // also remove accidental whitespace

  // sort for deterministic output
  uniq.sort();

  // write CSV
  const csvOut = ['url', ...uniq].join('\n');
  fs.writeFileSync(OUT_CSV, csvOut, 'utf8');
  fs.writeFileSync(OUT_JSON, JSON.stringify(uniq, null, 2), 'utf8');

  console.log('Parsed lines:', lines.length - 1);
  console.log('Extracted urls:', urls.length);
  console.log('Unique urls:', uniq.length);
  console.log('Malformed/skipped lines:', malformed);
  console.log('Wrote:', OUT_CSV);
  console.log('Wrote:', OUT_JSON);
}

main();
