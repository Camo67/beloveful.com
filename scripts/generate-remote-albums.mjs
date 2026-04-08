#!/usr/bin/env node
/**
 * Generate generatedAlbums.ts from public-html-assets/index.json
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');
const assetsDir = path.join(repoRoot, 'src', 'lib', 'public-html-assets');
const outputFile = path.join(repoRoot, 'src', 'lib', 'generatedAlbums.ts');
const publicLibraryDir = path.join(repoRoot, 'public', 'Website beloveful.com');
const DEAD_PUBLIC_IMAGE_HOSTS = new Set(['beloveful.com', 'www.beloveful.com']);
let publicFileIndexPromise;

function encodePathForUrl(relativePath) {
  return relativePath
    .split('/')
    .map((segment) => encodeURIComponent(segment))
    .join('/');
}

function normalizeAlbumSlug(value) {
  return String(value || '')
    .trim()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function decodeSafe(value) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function splitCamelCase(value) {
  return value.replace(/([a-z0-9])([A-Z])/g, '$1 $2');
}

function normalizeMatchString(value) {
  return splitCamelCase(decodeSafe(String(value || '')))
    .replace(/\.[^.]+$/, '')
    .toLowerCase()
    .replace(/\b(website|insta|landscape|portrait|copy)\b/g, ' ')
    .replace(/[^a-z0-9]+/g, '');
}

function tokenizeMatchString(value) {
  return splitCamelCase(decodeSafe(String(value || '')))
    .replace(/\.[^.]+$/, '')
    .toLowerCase()
    .replace(/\b(website|insta|landscape|portrait|copy)\b/g, ' ')
    .split(/[^a-z0-9]+/)
    .map((token) => token.trim())
    .filter((token) => token.length >= 4 && !/^\d+$/.test(token));
}

function extractNumericGroups(value) {
  return Array.from(
    new Set(decodeSafe(String(value || '')).match(/\d{3,}/g) || []),
  );
}

async function buildPublicFileIndex() {
  const files = [];

  async function walk(currentDir, relativeSegments = []) {
    const entries = await fs.readdir(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      const nextRelativeSegments = [...relativeSegments, entry.name];
      const fullPath = path.join(currentDir, entry.name);

      if (entry.isDirectory()) {
        await walk(fullPath, nextRelativeSegments);
        continue;
      }

      files.push({
        fullPath,
        filename: entry.name,
        filenameLower: entry.name.toLowerCase(),
        stemNormalized: normalizeMatchString(entry.name),
        tokens: tokenizeMatchString(entry.name),
        numericGroups: extractNumericGroups(entry.name),
        relativePath: nextRelativeSegments.join('/'),
        folderKey: relativeSegments.map((segment) => segment.toLowerCase()).join('/'),
      });
    }
  }

  await walk(publicLibraryDir);
  return files;
}

async function getPublicFileIndex() {
  if (!publicFileIndexPromise) {
    publicFileIndexPromise = buildPublicFileIndex();
  }
  return publicFileIndexPromise;
}

function buildLocalLibraryUrlFromFullPath(fullPath) {
  const relative = path.relative(publicLibraryDir, fullPath).split(path.sep);
  return `/${encodePathForUrl(['Website beloveful.com', ...relative].join('/'))}`;
}

async function resolvePathCaseInsensitive(baseDir, segments) {
  let currentDir = baseDir;
  const resolvedSegments = [];

  for (const rawSegment of segments) {
    const segment = rawSegment.trim();
    if (!segment) continue;

    const entries = await fs.readdir(currentDir, { withFileTypes: true });
    const matched = entries.find(
      (entry) => entry.name.toLowerCase() === segment.toLowerCase(),
    );

    if (!matched) {
      return null;
    }

    resolvedSegments.push(matched.name);
    currentDir = path.join(currentDir, matched.name);
  }

  return resolvedSegments;
}

async function findFileInTree(baseDir, targetFilename) {
  const entries = await fs.readdir(baseDir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(baseDir, entry.name);

    if (entry.isFile() && entry.name.toLowerCase() === targetFilename.toLowerCase()) {
      return fullPath;
    }

    if (entry.isDirectory()) {
      const nestedMatch = await findFileInTree(fullPath, targetFilename);
      if (nestedMatch) {
        return nestedMatch;
      }
    }
  }

  return null;
}

function scoreFuzzyFileMatch(targetFilename, candidate) {
  const targetNormalized = normalizeMatchString(targetFilename);
  if (!targetNormalized || !candidate?.stemNormalized) {
    return { score: 0, sharedTokensCount: 0, sharedNumbersCount: 0 };
  }

  const targetTokens = tokenizeMatchString(targetFilename);
  const targetNumericGroups = extractNumericGroups(targetFilename);
  const sharedTokens = targetTokens.filter((token) => candidate.tokens.includes(token));
  const sharedNumbers = targetNumericGroups.filter((group) =>
    candidate.numericGroups.includes(group),
  );

  let score = 0;
  if (candidate.filenameLower === decodeSafe(targetFilename).toLowerCase()) score += 500;
  if (candidate.stemNormalized === targetNormalized) score += 240;
  if (
    candidate.stemNormalized.includes(targetNormalized) ||
    targetNormalized.includes(candidate.stemNormalized)
  ) {
    score += 90;
  }
  score += sharedTokens.length * 35;
  score += sharedNumbers.length * 70;
  if (targetNumericGroups.length === 1 && sharedNumbers.length === 1) score += 60;
  if (
    targetNumericGroups.length > 0 &&
    candidate.numericGroups.length > 0 &&
    targetNumericGroups[targetNumericGroups.length - 1] ===
      candidate.numericGroups[candidate.numericGroups.length - 1]
  ) {
    score += 30;
  }

  return {
    score,
    sharedTokensCount: sharedTokens.length,
    sharedNumbersCount: sharedNumbers.length,
  };
}

function pickBestFuzzyMatch(entries, targetFilename, minimumScore) {
  const scored = entries
    .map((entry) => ({
      entry,
      ...scoreFuzzyFileMatch(targetFilename, entry),
    }))
    .filter(
      (match) =>
        match.score >= minimumScore &&
        (match.sharedTokensCount >= 2 || match.sharedNumbersCount >= 1 || match.score >= 240),
    )
    .sort((a, b) => b.score - a.score || a.entry.relativePath.length - b.entry.relativePath.length);

  if (scored.length === 0) {
    return null;
  }

  const [best, runnerUp] = scored;
  if (runnerUp && best.score < runnerUp.score + 20) {
    return null;
  }

  return best.entry;
}

async function resolveMirroredPublicUrl(item, folder) {
  const itemUrl = String(item?.url || '');
  const itemFilename = decodeSafe(String(item?.filename || ''));

  try {
    const parsed = new URL(itemUrl);
    const decodedPath = decodeURIComponent(parsed.pathname).replace(/^\/images\//i, '');
    const pathSegments = decodedPath.split('/').filter(Boolean);
    if (pathSegments.length === 0) return itemUrl;
    const filename = itemFilename || decodeSafe(pathSegments[pathSegments.length - 1]);

    const directMatch = await resolvePathCaseInsensitive(publicLibraryDir, pathSegments);
    if (directMatch) {
      return `/${encodePathForUrl(['Website beloveful.com', ...directMatch].join('/'))}`;
    }

    const folderSegments = String(folder.folder || '')
      .split('/')
      .filter(Boolean);

    if (folderSegments.length > 0) {
      const resolvedFolder = await resolvePathCaseInsensitive(publicLibraryDir, folderSegments);
      if (resolvedFolder) {
        const resolvedFile = await resolvePathCaseInsensitive(
          path.join(publicLibraryDir, ...resolvedFolder),
          [filename],
        );
        if (resolvedFile) {
          return `/${encodePathForUrl(['Website beloveful.com', ...resolvedFolder, ...resolvedFile].join('/'))}`;
        }

        const recursiveFile = await findFileInTree(
          path.join(publicLibraryDir, ...resolvedFolder),
          filename,
        );
        if (recursiveFile) {
          const relative = path.relative(publicLibraryDir, recursiveFile).split(path.sep);
          return `/${encodePathForUrl(['Website beloveful.com', ...relative].join('/'))}`;
        }

        const indexedFiles = await getPublicFileIndex();
        const folderKey = resolvedFolder.map((segment) => segment.toLowerCase()).join('/');
        const folderCandidates = indexedFiles.filter(
          (entry) => entry.folderKey === folderKey || entry.folderKey.startsWith(`${folderKey}/`),
        );
        const fuzzyFolderMatch = pickBestFuzzyMatch(folderCandidates, filename, 70);
        if (fuzzyFolderMatch) {
          return buildLocalLibraryUrlFromFullPath(fuzzyFolderMatch.fullPath);
        }
      }
    }

    const indexedFiles = await getPublicFileIndex();
    const exactAnywhereMatches = indexedFiles.filter(
      (entry) => entry.filenameLower === filename.toLowerCase(),
    );
    if (exactAnywhereMatches.length === 1) {
      return buildLocalLibraryUrlFromFullPath(exactAnywhereMatches[0].fullPath);
    }

    const fuzzyAnywhereMatch = pickBestFuzzyMatch(indexedFiles, filename, 110);
    if (fuzzyAnywhereMatch) {
      return buildLocalLibraryUrlFromFullPath(fuzzyAnywhereMatch.fullPath);
    }

    if (
      DEAD_PUBLIC_IMAGE_HOSTS.has(parsed.hostname.toLowerCase()) &&
      /^\/images\//i.test(parsed.pathname)
    ) {
      console.warn(`Skipping unresolved dead public image URL: ${itemUrl}`);
      return null;
    }
  } catch {
    if (itemUrl) {
      console.warn(`Skipping unresolved image URL: ${itemUrl}`);
    }
    return null;
  }

  return itemUrl;
}

function compactImages(images) {
  return images.filter((image) => image && image.desktop && image.mobile);
}

async function buildAlbumImages(folder, urlsData) {
  const resolvedImages = await Promise.all(
    urlsData.map(async (item) => {
      const resolvedUrl = await resolveMirroredPublicUrl(item, folder);
      if (!resolvedUrl) {
        return null;
      }

      return {
        desktop: resolvedUrl,
        mobile: resolvedUrl,
      };
    }),
  );

  const images = compactImages(resolvedImages);
  const droppedCount = urlsData.length - images.length;
  if (droppedCount > 0) {
    console.warn(
      `Dropped ${droppedCount} unresolved image URL${droppedCount === 1 ? '' : 's'} for ${folder.folder}`,
    );
  }

  return images;
}

async function main() {
  const indexPath = path.join(assetsDir, 'index.json');
  const indexData = JSON.parse(await fs.readFile(indexPath, 'utf8'));

  const albums = [];
  const slideshowDesktop = [];
  const slideshowMobile = [];

  for (const folder of indexData.folders) {
    if (folder.type !== 'country') continue;

    const urlsPath = path.join(assetsDir, folder.assetsPath.replace('public-html-assets/', ''));
    const urlsData = JSON.parse(await fs.readFile(urlsPath, 'utf8'));

    const images = await buildAlbumImages(folder, urlsData);

    albums.push({
      region: folder.region,
      country: folder.country,
      slug: normalizeAlbumSlug(folder.country),
      title: folder.country,
      description: '',
      images,
    });
  }

  // For slideshow, we need to find Homepage folders
  const homepageDesktop = indexData.folders.find(f => f.folder === 'Homepage/Desktop Landscape');
  const homepageMobile = indexData.folders.find(f => f.folder === 'Homepage/Mobile Portrait');

  if (homepageDesktop) {
    const urlsPath = path.join(assetsDir, homepageDesktop.assetsPath.replace('public-html-assets/', ''));
    const urlsData = JSON.parse(await fs.readFile(urlsPath, 'utf8'));
    slideshowDesktop.push(...urlsData.map(item => ({ desktop: item.url, mobile: item.url })));
  }

  if (homepageMobile) {
    const urlsPath = path.join(assetsDir, homepageMobile.assetsPath.replace('public-html-assets/', ''));
    const urlsData = JSON.parse(await fs.readFile(urlsPath, 'utf8'));
    slideshowMobile.push(...urlsData.map(item => ({ desktop: item.url, mobile: item.url })));
  }

  // For simplicity, use the same for both desktop and mobile
  const slideshow = slideshowDesktop.length > 0 ? slideshowDesktop : slideshowMobile;

  const content = `// AUTO-GENERATED FILE. Do not edit by hand.
// Generated from public-html-assets
import type { CountryAlbum, SlideshowImage } from './data';

export const GENERATED_ALBUMS: CountryAlbum[] = ${JSON.stringify(albums, null, 2)} as any;

export const GENERATED_HOME_SLIDESHOW: SlideshowImage[] = ${JSON.stringify(slideshow, null, 2)} as any;

export const GENERATED_CLIENT_LOGOS: string[] = [] as any;
`;

  await fs.writeFile(outputFile, content, 'utf8');
  console.log('Generated generatedAlbums.ts from public-html-assets');
}

main().catch(console.error);
