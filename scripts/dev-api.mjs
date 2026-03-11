#!/usr/bin/env node
import { spawn } from "node:child_process";
import net from "node:net";

const isWin = process.platform === "win32";
const wranglerCmd = isWin ? "wrangler.cmd" : "wrangler";
const defaultPort = parsePort(process.env.DEV_API_PORT, 8787);
const apiPort = await resolveApiPort(defaultPort);

if (apiPort !== defaultPort) {
  console.warn(
    `[dev:api] Port ${defaultPort} is in use, switching to ${apiPort}.`,
  );
}

const child = spawn(
  wranglerCmd,
  ["dev", "--local", "--port", String(apiPort)],
  {
    stdio: "inherit",
    env: process.env,
  },
);

child.on("error", (error) => {
  console.error(`[dev:api] Failed to start Wrangler: ${error.message}`);
  process.exit(1);
});

child.on("exit", (code) => {
  process.exit(typeof code === "number" ? code : 1);
});

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
    `[dev:api] Could not find an open port between ${startPort} and ${maxPort}. Set DEV_API_PORT and retry.`,
  );
  process.exit(1);
}
