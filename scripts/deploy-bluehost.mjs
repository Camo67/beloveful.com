#!/usr/bin/env node

import { Client } from 'basic-ftp';
import dotenv from 'dotenv';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');
const packageRoot = path.join(repoRoot, 'build', 'bluehost', 'public_html');
const deployStats = {
  uploaded: 0,
  skipped: 0,
};

loadLocalEnv();

let FTP_HOST = process.env.BLUEHOST_FTP_HOST || process.env.CPANEL_FTP_HOST;
let FTP_USER = process.env.BLUEHOST_FTP_USER || process.env.CPANEL_FTP_USER;
let FTP_PASSWORD = process.env.BLUEHOST_FTP_PASSWORD || process.env.CPANEL_FTP_PASSWORD;
let FTP_PORT = Number(process.env.BLUEHOST_FTP_PORT || process.env.CPANEL_FTP_PORT || 21);
let FTP_ROOT = process.env.BLUEHOST_FTP_ROOT || '/public_html';
const SECURE = (process.env.BLUEHOST_FTP_SECURE || process.env.CPANEL_FTP_SECURE || '').toLowerCase() === 'true';

await runCommand('node', ['scripts/build-bluehost.mjs']);

if (!FTP_HOST || !FTP_USER || !FTP_PASSWORD) {
  console.error(
    'Missing Bluehost FTP credentials. Set BLUEHOST_FTP_HOST / BLUEHOST_FTP_USER / BLUEHOST_FTP_PASSWORD or CPANEL_FTP_HOST / CPANEL_FTP_USER / CPANEL_FTP_PASSWORD.',
  );
  process.exit(1);
}

// Bluehost transfers can run for several minutes without control-socket chatter.
const client = new Client(0);
client.ftp.verbose = false;

await client.access({
  host: FTP_HOST,
  user: FTP_USER,
  password: FTP_PASSWORD,
  port: FTP_PORT,
  secure: SECURE,
});

console.log(`Connected to ${FTP_HOST}`);
console.log(`Uploading ${packageRoot} to ${FTP_ROOT}`);

await uploadDirectory(packageRoot, FTP_ROOT);

client.close();
console.log(`Uploaded ${deployStats.uploaded} files, skipped ${deployStats.skipped} unchanged files`);
console.log('Bluehost deploy finished');

async function uploadDirectory(localDir, remoteDir) {
  await client.ensureDir(remoteDir);
  const [entries, remoteEntries] = await Promise.all([
    fs.readdir(localDir, { withFileTypes: true }),
    client.list(remoteDir),
  ]);
  const orderedEntries = orderEntries(entries, remoteDir);
  const remoteEntriesByName = new Map(remoteEntries.map((entry) => [entry.name, entry]));

  for (const entry of orderedEntries) {
    const localPath = path.join(localDir, entry.name);
    const remotePath = joinRemotePath(remoteDir, entry.name);
    if (entry.isDirectory()) {
      await uploadDirectory(localPath, remotePath);
      continue;
    }
    const localStats = await fs.stat(localPath);
    const remoteEntry = remoteEntriesByName.get(entry.name);
    if (shouldSkipUnchangedFile(remotePath) && remoteEntry && !remoteEntry.isDirectory && Number(remoteEntry.size) === localStats.size) {
      deployStats.skipped += 1;
      continue;
    }
    await client.uploadFrom(localPath, remotePath);
    deployStats.uploaded += 1;
  }
}

function joinRemotePath(base, child) {
  return base === '/' ? `/${child}` : `${base}/${child}`;
}

function shouldSkipUnchangedFile(remotePath) {
  return remotePath === '/Website beloveful.com' || remotePath.startsWith('/Website beloveful.com/');
}

function orderEntries(entries, remoteDir) {
  const rootPriority = new Map([
    ['.htaccess', 0],
    ['index.html', 1],
    ['_redirects', 2],
    ['api', 3],
    ['assets', 4],
    ['_cms_data', 5],
    ['content-assets', 6],
    ['images', 7],
    ['secure-images', 8],
    ['workshop-photos', 9],
    ['Website beloveful.com', 99],
  ]);

  return [...entries].sort((left, right) => {
    if (remoteDir === '/') {
      const leftPriority = rootPriority.get(left.name) ?? 50;
      const rightPriority = rootPriority.get(right.name) ?? 50;
      if (leftPriority !== rightPriority) {
        return leftPriority - rightPriority;
      }
    }

    if (left.isDirectory() !== right.isDirectory()) {
      return left.isDirectory() ? 1 : -1;
    }

    return left.name.localeCompare(right.name);
  });
}

function loadLocalEnv() {
  const envFiles = [
    '.env',
    '.env.production',
    '.env.local',
    '.env.production.local',
  ];

  for (const file of envFiles) {
    dotenv.config({
      path: path.join(repoRoot, file),
      override: false,
      quiet: true,
    });
  }
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
