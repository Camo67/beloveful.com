#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');
const defaultSourceFile = path.join(repoRoot, 'data', 'events', 'past-exhibitions.json');
const outputFile = path.join(repoRoot, 'src', 'lib', 'generatedExhibitions.ts');
const validTypes = new Set(['Solo', 'Group', 'Invitational']);

function parseArgs(argv) {
  const args = {
    append: false,
    input: defaultSourceFile,
    title: '',
    location: '',
    year: '',
    type: '',
  };

  for (const rawArg of argv) {
    if (rawArg === '--append') {
      args.append = true;
      continue;
    }

    const [flag, ...rest] = rawArg.split('=');
    const value = rest.join('=').trim();

    switch (flag) {
      case '--input':
        if (value) args.input = path.resolve(repoRoot, value);
        break;
      case '--title':
        args.title = value;
        break;
      case '--location':
        args.location = value;
        break;
      case '--year':
        args.year = value;
        break;
      case '--type':
        args.type = value;
        break;
      default:
        throw new Error(`Unknown argument: ${rawArg}`);
    }
  }

  return args;
}

function normalizeType(value) {
  const normalized = String(value || '').trim();
  if (!validTypes.has(normalized)) {
    throw new Error(`Invalid exhibition type "${value}". Use Solo, Group, or Invitational.`);
  }
  return normalized;
}

function normalizeExhibition(value) {
  if (!value || typeof value !== 'object') {
    throw new Error('Each exhibition must be an object.');
  }

  const exhibition = value;
  const title = String(exhibition.title || '').trim();
  const location = String(exhibition.location || '').trim();
  const year = Number.parseInt(String(exhibition.year || '').trim(), 10);
  const type = normalizeType(exhibition.type);

  if (!title) {
    throw new Error('Each exhibition requires a title.');
  }

  if (!Number.isInteger(year) || year < 1900 || year > 3000) {
    throw new Error(`Invalid exhibition year "${exhibition.year}" for "${title}".`);
  }

  return { title, location, year, type };
}

function dedupeAndSort(exhibitions) {
  const seen = new Set();

  return exhibitions
    .map((value, index) => ({
      exhibition: normalizeExhibition(value),
      index,
    }))
    .filter(({ exhibition }) => {
      const key = [
        exhibition.title.toLowerCase(),
        exhibition.location.toLowerCase(),
        exhibition.year,
        exhibition.type.toLowerCase(),
      ].join('|');

      if (seen.has(key)) {
        return false;
      }

      seen.add(key);
      return true;
    })
    .sort((left, right) => {
      if (right.exhibition.year !== left.exhibition.year) {
        return right.exhibition.year - left.exhibition.year;
      }

      return left.index - right.index;
    })
    .map(({ exhibition }) => exhibition);
}

async function loadExhibitions(filePath) {
  const raw = await fs.readFile(filePath, 'utf8');
  const parsed = JSON.parse(raw);

  if (Array.isArray(parsed)) {
    return parsed;
  }

  if (parsed && Array.isArray(parsed.exhibitions)) {
    return parsed.exhibitions;
  }

  throw new Error(`Expected an array or { exhibitions: [] } in ${filePath}`);
}

async function writeSourceFile(filePath, exhibitions) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, `${JSON.stringify(exhibitions, null, 2)}\n`, 'utf8');
}

async function appendExhibition(args) {
  if (!args.title || !args.year || !args.type) {
    throw new Error('Append mode requires --title, --year, and --type.');
  }

  const current = await loadExhibitions(args.input);
  const appended = [
    ...current,
    {
      title: args.title,
      location: args.location,
      year: args.year,
      type: args.type,
    },
  ];

  const normalized = dedupeAndSort(appended);
  await writeSourceFile(args.input, normalized);
  return normalized;
}

function renderTypescript(exhibitions) {
  return `// AUTO-GENERATED FILE. Do not edit by hand.
// Generated from data/events/past-exhibitions.json

export type ExhibitionCardType = 'Solo' | 'Group' | 'Invitational';

export interface ExhibitionCard {
  title: string;
  location: string;
  year: number;
  type: ExhibitionCardType;
}

export const GENERATED_EXHIBITIONS: ExhibitionCard[] = ${JSON.stringify(exhibitions, null, 2)};
`;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));

  const exhibitions = args.append
    ? await appendExhibition(args)
    : dedupeAndSort(await loadExhibitions(args.input));

  await fs.mkdir(path.dirname(outputFile), { recursive: true });
  await fs.writeFile(outputFile, renderTypescript(exhibitions), 'utf8');

  console.log(`Generated ${path.relative(repoRoot, outputFile)} with ${exhibitions.length} exhibition cards.`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
