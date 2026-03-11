#!/usr/bin/env node
import { spawn } from "node:child_process";
import net from "node:net";

const isWin = process.platform === "win32";
const npmCmd = isWin ? "npm.cmd" : "npm";
const defaultApiPort = parsePort(process.env.DEV_API_PORT, 8787);
const apiPort = await resolveApiPort(defaultApiPort);

process.env.DEV_API_PORT = String(apiPort);

if (apiPort !== defaultApiPort) {
  console.warn(
    `[dev] Port ${defaultApiPort} is in use, switching API port to ${apiPort}.`,
  );
}

function spawnNpm(scriptName) {
  return spawn(npmCmd, ["run", scriptName], {
    stdio: "inherit",
    env: process.env,
  });
}

const children = [
  { name: "dev:api", proc: spawnNpm("dev:api") },
  { name: "dev:vite", proc: spawnNpm("dev:vite") },
];

let shuttingDown = false;

function shutdown(exitCode = 0) {
  if (shuttingDown) return;
  shuttingDown = true;
  for (const child of children) {
    try {
      child.proc.kill("SIGINT");
    } catch {
      // ignore
    }
  }
  // Give child processes a moment to exit before we exit.
  setTimeout(() => process.exit(exitCode), 250);
}

process.on("SIGINT", () => shutdown(0));
process.on("SIGTERM", () => shutdown(0));

for (const child of children) {
  child.proc.on("exit", (code, signal) => {
    if (shuttingDown) return;
    const exitCode = typeof code === "number" ? code : signal ? 1 : 0;
    shutdown(exitCode);
  });
}

function parsePort(value, fallback) {
  const parsed = Number.parseInt(String(value ?? ""), 10);
  if (Number.isInteger(parsed) && parsed > 0 && parsed < 65536) {
    return parsed;
  }
  return fallback;
}

function isPortAvailable(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.unref();
    server.once("error", () => resolve(false));
    server.listen(port, "127.0.0.1", () => {
      server.close(() => resolve(true));
    });
  });
}

async function resolveApiPort(startPort) {
  if (await isPortAvailable(startPort)) {
    return startPort;
  }

  const maxPort = Math.min(startPort + 20, 65535);
  for (let port = startPort + 1; port <= maxPort; port += 1) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }

  console.error(
    `[dev] Could not find an open API port between ${startPort} and ${maxPort}. Set DEV_API_PORT and retry.`,
  );
  process.exit(1);
}
