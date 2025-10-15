#!/usr/bin/env node
/*
  Sync products from Print Innovation Lab (Shopify) collection to local JSON
  - Source: https://www.printinnovationlab.com/collections/beloveful/products.json
  - Output: src/lib/printlab.json
*/

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT = path.resolve(__dirname, '..');
const OUT_FILE = path.resolve(ROOT, 'src/lib/printlab.json');

const COLLECTION_URL = 'https://www.printinnovationlab.com/collections/beloveful/products.json?limit=250';

async function main() {
  console.log('Fetching products from Print Innovation Lab...');
  const res = await fetch(COLLECTION_URL, { headers: { 'accept': 'application/json' } });
  if (!res.ok) {
    throw new Error(`Failed to fetch products: ${res.status} ${res.statusText}`);
  }
  const data = await res.json();
  const products = Array.isArray(data?.products) ? data.products : [];

  const mapped = products.map(p => {
    const images = Array.isArray(p.images) ? p.images.map(img => img.src).filter(Boolean) : [];
    const title = p.title;
    const handle = p.handle;
    const url = `https://www.printinnovationlab.com/products/${handle}`;
    const variants = Array.isArray(p.variants) ? p.variants : [];
    const prices = variants.map(v => parseFloat(String(v.price))).filter(n => Number.isFinite(n));
    const minPrice = prices.length ? Math.min(...prices) : null;
    // Preselect cheapest variant for buyUrl when available
    let buyUrl = url;
    if (variants.length) {
      const cheapest = variants.reduce((acc, v) => (parseFloat(String(v.price)) < parseFloat(String(acc.price)) ? v : acc), variants[0]);
      if (cheapest?.id) buyUrl = `${url}?variant=${cheapest.id}`;
    }
    return {
      id: p.id,
      title,
      handle,
      url,
      buyUrl,
      description: p.body_html ?? null,
      images,
      image: images[0] ?? null,
      minPrice,
      vendor: p.vendor ?? null,
      tags: p.tags ?? [],
      published_at: p.published_at ?? null,
      created_at: p.created_at ?? null,
      updated_at: p.updated_at ?? null,
    };
  });

  const output = {
    source: 'printinnovationlab',
    collection: 'beloveful',
    lastUpdated: new Date().toISOString(),
    count: mapped.length,
    products: mapped,
  };

  await fs.mkdir(path.dirname(OUT_FILE), { recursive: true });
  await fs.writeFile(OUT_FILE, JSON.stringify(output, null, 2) + '\n', 'utf8');
  console.log(`Wrote ${mapped.length} products to ${path.relative(ROOT, OUT_FILE)}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
