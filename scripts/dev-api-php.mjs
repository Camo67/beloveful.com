#!/usr/bin/env node

import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');
const port = Number.parseInt(process.env.DEV_API_PORT ?? '8787', 10) || 8787;

const child = spawn('php', ['-S', `127.0.0.1:${port}`, 'scripts/dev-php-router.php'], {
  cwd: repoRoot,
  stdio: 'inherit',
  shell: process.platform === 'win32',
  env: process.env,
});

child.on('exit', (code) => {
  process.exit(code ?? 0);
});
