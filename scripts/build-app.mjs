#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');
const publicRoot = path.join(repoRoot, 'public');
const distRoot = path.join(repoRoot, 'dist');
const websiteAssetsRoot = path.join(publicRoot, 'Website beloveful.com');
const mode = process.argv[2] || 'production';

await fs.rm(distRoot, { recursive: true, force: true, maxRetries: 3, retryDelay: 100 });

await runCommand('npx', ['vite', 'build', '--mode', mode], {
  ...process.env,
  VITE_COPY_PUBLIC_DIR: 'false',
});

await copyPublicAssets();

console.log(`App build ready in ${distRoot} (${mode} mode)`);

async function copyPublicAssets() {
  const entries = await fs.readdir(publicRoot, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.name === 'index.html' || entry.name === 'images') {
      continue;
    }

    const sourcePath = path.join(publicRoot, entry.name);
    const destinationPath = path.join(distRoot, entry.name);

    if (entry.isDirectory()) {
      await syncDirectory(sourcePath, destinationPath);
      continue;
    }

    if (entry.isFile()) {
      await fs.copyFile(sourcePath, destinationPath);
    }
  }

  // Materialize /images as a real directory for deploys; in the repo it is only
  // a symlink to "Website beloveful.com".
  await syncDirectory(websiteAssetsRoot, path.join(distRoot, 'images'));
}

function runCommand(command, args, env) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: repoRoot,
      stdio: 'inherit',
      shell: process.platform === 'win32',
      env,
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

async function syncDirectory(from, to) {
  await fs.mkdir(to, { recursive: true });

  if (process.platform !== 'win32') {
    await runCommand('rsync', ['-a', `${from}/`, `${to}/`], process.env);
    return;
  }

  await fs.cp(from, to, { recursive: true, force: true });
}
