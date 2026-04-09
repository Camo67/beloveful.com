#!/usr/bin/env node

/**
 * Read-only audit for travel portfolio images.
 *
 * Compares the local travel library under `public/Website beloveful.com`
 * against the hosted cPanel/FTP travel image tree.
 *
 * The script only performs read operations:
 * - local directory reads / local file hashing
 * - remote FTP directory listings / optional remote file reads for hashing
 * - local report writes to console, JSON, and CSV
 *
 * It never uploads, renames, deletes, or mutates local or remote image files.
 *
 * Usage:
 *   npm run travel:audit -- --filter /asia/india
 *   npm run travel:audit -- --hash --hash-algorithm sha256
 *   npm run travel:audit -- --remote-root /public_html/images --output-dir output/travel-audits
 */

import { config as loadEnv } from "dotenv";
import { Client } from "basic-ftp";
import { spawn } from "node:child_process";
import { createHash } from "node:crypto";
import { createReadStream } from "node:fs";
import fs from "node:fs/promises";
import path from "node:path";
import { Writable } from "node:stream";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, "..");

loadEnv({ path: path.join(REPO_ROOT, ".env.local"), quiet: true });

const DEFAULT_LOCAL_ROOT = path.join(REPO_ROOT, "public", "Website beloveful.com");
const DEFAULT_OUTPUT_ROOT = path.join(REPO_ROOT, "output", "travel-portfolio-audit");

const TRAVEL_REGIONS = new Set([
  "Africa",
  "Asia",
  "Central America & Caribbean",
  "Europe & Scandinavia",
  "Middle East",
  "North America",
  "South America",
  "Oceania",
]);

const IMAGE_EXTENSIONS = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".gif",
  ".webp",
  ".tif",
  ".tiff",
  ".bmp",
  ".svg",
  ".avif",
  ".heic",
]);

const SYSTEM_FILE_NAMES = new Set([
  ".ds_store",
  "thumbs.db",
  "desktop.ini",
]);

const DEFAULT_PROTOCOL = "auto";
const DEFAULT_SAMPLE_LIMIT = 20;
const SSH_KEY_CANDIDATE_NAMES = [
  "belovefu_ed25519",
  "belovefu-cpanel-2026-03-23",
  "id_rsa_temp",
  "id_rsa",
];

function printUsage() {
  console.log(`
Read-only travel portfolio audit

Usage:
  node scripts/audit-travel-portfolio.mjs [options]

Options:
  --filter <path>            Limit scan to one travel subtree, e.g. /asia/india
  --protocol <mode>          Remote transport: auto, ssh, ftp
                             Default: ${DEFAULT_PROTOCOL}
  --local-root <path>        Local travel root
                             Default: public/Website beloveful.com
  --remote-root <path>       Remote FTP root
                             Default: auto-detect from common cPanel image roots
  --output-dir <path>        Directory for JSON/CSV reports
                             Default: output/travel-portfolio-audit
  --hash                     Hash same-path matches with the selected algorithm
  --hash-algorithm <name>    Hash algorithm for --hash
                             Default: sha256
  --sample-limit <number>    Console sample size per category
                             Default: ${DEFAULT_SAMPLE_LIMIT}
  --verbose                  Print full category listings to console
  --help                     Show this help

Environment:
  CPANEL_FTP_HOST
  CPANEL_FTP_USER
  CPANEL_FTP_PASSWORD
  CPANEL_FTP_PORT
  CPANEL_FTP_SECURE
  CPANEL_FTP_ALLOW_INVALID_CERT
  CPANEL_FTP_ROOT
  CPANEL_SFTP_HOST
  CPANEL_SFTP_USER
  CPANEL_SFTP_PORT
  CPANEL_SFTP_ROOT
  CPANEL_SFTP_PRIVATE_KEY_PATH

Notes:
  - Travel scope only: homepage, workshop, projects, logo, and other sections are skipped.
  - The script never uploads, deletes, renames, or modifies image files.
  - SSH mode hashes files by streaming remote file bytes over SSH; FTP mode downloads matching remote files only when hashing is enabled.
`);
}

function parseArgs(argv) {
  const options = {
    filter: "",
    hash: false,
    hashAlgorithm: "sha256",
    help: false,
    localRoot: DEFAULT_LOCAL_ROOT,
    outputDir: DEFAULT_OUTPUT_ROOT,
    protocol: DEFAULT_PROTOCOL,
    remoteRoot: "",
    sampleLimit: DEFAULT_SAMPLE_LIMIT,
    verbose: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    const next = argv[index + 1];

    if (arg === "--help") {
      options.help = true;
      continue;
    }
    if (arg === "--hash") {
      options.hash = true;
      continue;
    }
    if (arg === "--protocol" && next) {
      options.protocol = next;
      index += 1;
      continue;
    }
    if (arg.startsWith("--protocol=")) {
      options.protocol = arg.slice("--protocol=".length);
      continue;
    }
    if (arg === "--verbose") {
      options.verbose = true;
      continue;
    }
    if (arg === "--filter" && next) {
      options.filter = next;
      index += 1;
      continue;
    }
    if (arg.startsWith("--filter=")) {
      options.filter = arg.slice("--filter=".length);
      continue;
    }
    if (arg === "--local-root" && next) {
      options.localRoot = path.resolve(REPO_ROOT, next);
      index += 1;
      continue;
    }
    if (arg.startsWith("--local-root=")) {
      options.localRoot = path.resolve(REPO_ROOT, arg.slice("--local-root=".length));
      continue;
    }
    if (arg === "--remote-root" && next) {
      options.remoteRoot = next;
      index += 1;
      continue;
    }
    if (arg.startsWith("--remote-root=")) {
      options.remoteRoot = arg.slice("--remote-root=".length);
      continue;
    }
    if (arg === "--output-dir" && next) {
      options.outputDir = path.resolve(REPO_ROOT, next);
      index += 1;
      continue;
    }
    if (arg.startsWith("--output-dir=")) {
      options.outputDir = path.resolve(REPO_ROOT, arg.slice("--output-dir=".length));
      continue;
    }
    if (arg === "--hash-algorithm" && next) {
      options.hashAlgorithm = next;
      index += 1;
      continue;
    }
    if (arg.startsWith("--hash-algorithm=")) {
      options.hashAlgorithm = arg.slice("--hash-algorithm=".length);
      continue;
    }
    if (arg === "--sample-limit" && next) {
      options.sampleLimit = Number(next);
      index += 1;
      continue;
    }
    if (arg.startsWith("--sample-limit=")) {
      options.sampleLimit = Number(arg.slice("--sample-limit=".length));
      continue;
    }

    throw new Error(`Unknown or incomplete argument: ${arg}`);
  }

  if (!Number.isInteger(options.sampleLimit) || options.sampleLimit < 0) {
    throw new Error(`Invalid --sample-limit value: ${options.sampleLimit}`);
  }
  if (!["auto", "ssh", "ftp"].includes(options.protocol)) {
    throw new Error(`Invalid --protocol value: ${options.protocol}`);
  }

  return options;
}

function normalizeForFilter(segment) {
  return segment
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

function parseFilterSegments(filter) {
  if (!filter) {
    return [];
  }

  return filter
    .split("/")
    .map((segment) => segment.trim())
    .filter(Boolean)
    .map((segment) => {
      try {
        return decodeURIComponent(segment);
      } catch {
        return segment;
      }
    })
    .map(normalizeForFilter);
}

function isPrefix(prefix, value) {
  if (prefix.length > value.length) {
    return false;
  }
  return prefix.every((segment, index) => value[index] === segment);
}

function shouldTraversePath(relativeParts, filterSegments) {
  if (filterSegments.length === 0) {
    return true;
  }
  const current = relativeParts.map(normalizeForFilter);
  return isPrefix(current, filterSegments) || isPrefix(filterSegments, current);
}

function isWithinFilter(relativeParts, filterSegments) {
  if (filterSegments.length === 0) {
    return true;
  }
  return isPrefix(filterSegments, relativeParts.map(normalizeForFilter));
}

function toPosixPath(relativeParts) {
  return relativeParts.join("/");
}

function isSafeName(name) {
  if (!name || name === "." || name === "..") {
    return false;
  }
  if (name.startsWith(".")) {
    return false;
  }
  if (name.startsWith("__MACOSX")) {
    return false;
  }
  if (SYSTEM_FILE_NAMES.has(name.toLowerCase())) {
    return false;
  }
  return true;
}

function isImageFile(name) {
  const ext = path.extname(name || "").toLowerCase();
  return IMAGE_EXTENSIONS.has(ext);
}

function createRemotePath(base, name) {
  if (!base || base === "/") {
    return `/${name}`;
  }
  return `${base.replace(/\/+$/, "")}/${name}`;
}

function formatBytes(bytes) {
  if (!Number.isFinite(bytes)) {
    return "unknown";
  }
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  const units = ["KB", "MB", "GB", "TB"];
  let value = bytes;
  let unitIndex = -1;
  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex += 1;
  }
  return `${value.toFixed(2)} ${units[unitIndex]}`;
}

function formatTimestampForFilename(date = new Date()) {
  return date.toISOString().replace(/[:.]/g, "-");
}

function sanitizeFilenamePart(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

function escapeCsv(value) {
  if (value === null || value === undefined) {
    return "";
  }
  const stringValue = String(value);
  if (/[",\n]/.test(stringValue)) {
    return `"${stringValue.replace(/"/g, '""')}"`;
  }
  return stringValue;
}

function expandUserPath(value) {
  if (!value) {
    return "";
  }

  const home = process.env.HOME || process.env.USERPROFILE || "";
  if (value === "~") {
    return home;
  }
  if (value.startsWith("~/")) {
    return path.join(home, value.slice(2));
  }
  return value;
}

async function pathExists(value) {
  try {
    await fs.access(value);
    return true;
  } catch {
    return false;
  }
}

function quoteForShell(value) {
  return `'${String(value).replace(/'/g, `'\\''`)}'`;
}

function toPosixRemotePath(...parts) {
  return path.posix.join(...parts).replace(/\/{2,}/g, "/");
}

function summarizeKeyPath(value) {
  if (!value) {
    return "(unset)";
  }
  return path.relative(REPO_ROOT, value) || value;
}

function getRemoteFindExpression() {
  return [...IMAGE_EXTENSIONS]
    .map((extension) => `-iname ${quoteForShell(`*${extension}`)}`)
    .join(" -o ");
}

function runCommand(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: options.cwd || REPO_ROOT,
      env: options.env || process.env,
      stdio: ["ignore", "pipe", "pipe"],
    });

    const stdoutChunks = [];
    const stderrChunks = [];

    child.stdout.on("data", (chunk) => stdoutChunks.push(chunk));
    child.stderr.on("data", (chunk) => stderrChunks.push(chunk));
    child.on("error", reject);
    child.on("close", (code) => {
      const stdout = Buffer.concat(stdoutChunks).toString("utf8");
      const stderr = Buffer.concat(stderrChunks).toString("utf8");
      if (code === 0) {
        resolve({ stdout, stderr, code });
        return;
      }
      const error = new Error(stderr.trim() || stdout.trim() || `${command} exited with code ${code}`);
      error.code = code;
      error.stdout = stdout;
      error.stderr = stderr;
      error.command = command;
      reject(error);
    });
  });
}

function hashCommandOutput(command, args, algorithm, options = {}) {
  return new Promise((resolve, reject) => {
    const hash = createHash(algorithm);
    const child = spawn(command, args, {
      cwd: options.cwd || REPO_ROOT,
      env: options.env || process.env,
      stdio: ["ignore", "pipe", "pipe"],
    });

    const stderrChunks = [];

    child.stdout.on("data", (chunk) => {
      hash.update(chunk);
    });
    child.stderr.on("data", (chunk) => {
      stderrChunks.push(chunk);
    });
    child.on("error", reject);
    child.on("close", (code) => {
      const stderr = Buffer.concat(stderrChunks).toString("utf8");
      if (code === 0) {
        resolve(hash.digest("hex"));
        return;
      }
      const error = new Error(stderr.trim() || `${command} exited with code ${code}`);
      error.code = code;
      error.stderr = stderr;
      error.command = command;
      reject(error);
    });
  });
}

class HashSink extends Writable {
  constructor(algorithm) {
    super();
    this.hash = createHash(algorithm);
  }

  _write(chunk, _encoding, callback) {
    this.hash.update(chunk);
    callback();
  }

  digest() {
    return this.hash.digest("hex");
  }
}

async function hashLocalFile(filePath, algorithm) {
  const hash = createHash(algorithm);
  const stream = createReadStream(filePath);
  for await (const chunk of stream) {
    hash.update(chunk);
  }
  return hash.digest("hex");
}

async function hashRemoteFile(client, remotePath, algorithm) {
  const sink = new HashSink(algorithm);
  await client.downloadTo(sink, remotePath);
  return sink.digest();
}

async function loadFtpSimpleProfile(credentials) {
  if (credentials.host && credentials.user && credentials.password) {
    return;
  }

  const home = process.env.HOME || process.env.USERPROFILE;
  const candidates = [];

  if (home) {
    candidates.push(
      path.join(
        home,
        ".config",
        "Code",
        "User",
        "globalStorage",
        "humy2833.ftp-simple",
        "ftp-simple-temp.json",
      ),
    );
  }

  candidates.push(
    path.join(
      REPO_ROOT,
      ".config",
      "Code",
      "User",
      "globalStorage",
      "humy2833.ftp-simple",
      "ftp-simple-temp.json",
    ),
  );

  for (const candidate of candidates) {
    try {
      const raw = await fs.readFile(candidate, "utf8");
      const parsed = JSON.parse(raw);
      const first = Array.isArray(parsed) ? parsed[0] : null;
      if (!first) {
        continue;
      }

      credentials.host ??= first.host;
      credentials.user ??= first.username;
      credentials.password ??= first.password;

      if (!process.env.CPANEL_FTP_ROOT && !credentials.remoteRoot && first.path && first.path !== "/") {
        credentials.remoteRoot = first.path;
      }

      console.log(
        `ℹ️  Loaded FTP credentials from ftp-simple profile: ${first.name || first.host}`,
      );
      return;
    } catch (error) {
      if (error?.code !== "ENOENT") {
        console.warn(`⚠️  Unable to read ftp-simple config ${candidate}: ${error.message}`);
      }
    }
  }
}

async function resolveSshKeyCandidates(explicitPath) {
  const candidates = [];
  const seen = new Set();
  const addCandidate = async (rawPath) => {
    const normalized = expandUserPath(rawPath);
    if (!normalized) {
      return;
    }
    const resolved = path.isAbsolute(normalized)
      ? normalized
      : path.resolve(REPO_ROOT, normalized);
    if (seen.has(resolved)) {
      return;
    }
    if (!(await pathExists(resolved))) {
      return;
    }
    seen.add(resolved);
    candidates.push(resolved);
  };

  await addCandidate(explicitPath);

  for (const name of SSH_KEY_CANDIDATE_NAMES) {
    await addCandidate(path.join(REPO_ROOT, name));
  }

  const home = process.env.HOME || process.env.USERPROFILE;
  if (home) {
    for (const name of ["id_ed25519", "id_rsa"]) {
      await addCandidate(path.join(home, ".ssh", name));
    }
  }

  return candidates;
}

function getSshCommandArgs(config, remoteCommand) {
  return [
    "-o",
    "BatchMode=yes",
    "-o",
    "IdentitiesOnly=yes",
    "-o",
    "StrictHostKeyChecking=accept-new",
    "-o",
    "ConnectTimeout=20",
    "-i",
    config.keyPath,
    "-p",
    String(config.port),
    `${config.user}@${config.host}`,
    remoteCommand,
  ];
}

async function tryCreateSshTransport(options) {
  const host = process.env.CPANEL_SFTP_HOST || process.env.CPANEL_FTP_HOST || "";
  const user = process.env.CPANEL_SFTP_USER || process.env.CPANEL_FTP_USER || "";
  const port = Number(process.env.CPANEL_SFTP_PORT || 22);
  const remoteRoot =
    options.remoteRoot ||
    process.env.CPANEL_SFTP_ROOT ||
    process.env.CPANEL_FTP_ROOT ||
    "/public_html/beloveful.com/public_html/images";

  if (!host || !user) {
    return {
      ok: false,
      attempt: {
        protocol: "ssh",
        host: host || "(unset)",
        user: user || "(unset)",
        remoteRoot,
        status: "skipped",
        detail: "Missing CPANEL_SFTP_HOST or CPANEL_SFTP_USER",
      },
    };
  }

  const keyCandidates = await resolveSshKeyCandidates(process.env.CPANEL_SFTP_PRIVATE_KEY_PATH);
  if (keyCandidates.length === 0) {
    return {
      ok: false,
      attempt: {
        protocol: "ssh",
        host,
        user,
        remoteRoot,
        status: "failed",
        detail: "No usable SSH key file found for CPANEL_SFTP_PRIVATE_KEY_PATH or known local key candidates",
      },
    };
  }

  const errors = [];
  for (const keyPath of keyCandidates) {
    const config = { host, user, port, remoteRoot, keyPath };
    try {
      const probe = await runCommand("ssh", getSshCommandArgs(config, "printf connected"));
      if (!probe.stdout.includes("connected")) {
        throw new Error("SSH probe connected but did not return the expected response");
      }
      return {
        ok: true,
        transport: {
          protocol: "ssh",
          host,
          user,
          port,
          remoteRoot,
          keyPath,
          async resolveRemoteRoot() {
            const candidates = options.remoteRoot
              ? [options.remoteRoot]
              : [
                  process.env.CPANEL_SFTP_ROOT,
                  process.env.CPANEL_FTP_ROOT,
                  "/public_html/beloveful.com/public_html/images",
                  "/public_html/images",
                ].filter(Boolean);
            for (const candidate of candidates) {
              const remoteCommand = `if [ -d ${quoteForShell(candidate)} ]; then printf ok; fi`;
              try {
                const result = await runCommand("ssh", getSshCommandArgs(config, remoteCommand));
                if (result.stdout.includes("ok")) {
                  return candidate;
                }
              } catch {
                // try next candidate
              }
            }
            throw new Error(
              `Unable to locate a remote travel root over SSH. Tried: ${candidates.join(", ") || "(none)"}`,
            );
          },
          async collectRemoteFiles(filterSegments) {
            const files = [];
            const findExpression = getRemoteFindExpression();
            for (const region of TRAVEL_REGIONS) {
              if (!shouldTraversePath([region], filterSegments)) {
                continue;
              }
              const regionRoot = toPosixRemotePath(this.remoteRoot, region);
              const remoteCommand = [
                `if [ -d ${quoteForShell(regionRoot)} ]; then`,
                `find ${quoteForShell(regionRoot)} -type f \\( ${findExpression} \\) -printf '%P\\t%s\\n';`,
                "fi",
              ].join(" ");

              let stdout = "";
              try {
                ({ stdout } = await runCommand("ssh", getSshCommandArgs(config, remoteCommand)));
              } catch (error) {
                if ((error.stderr || "").includes("No such file")) {
                  continue;
                }
                throw error;
              }

              for (const line of stdout.split(/\r?\n/)) {
                if (!line.trim()) {
                  continue;
                }
                const [relativeWithinRegion, sizeValue] = line.split("\t");
                if (!relativeWithinRegion) {
                  continue;
                }
                const relativePath = toPosixRemotePath(region, relativeWithinRegion);
                const relativeParts = relativePath.split("/").filter(Boolean);
                if (!isWithinFilter(relativeParts, filterSegments)) {
                  continue;
                }
                files.push({
                  source: "remote",
                  relativePath,
                  relativeDir: toPosixPath(relativeParts.slice(0, -1)),
                  filename: relativeParts[relativeParts.length - 1] ?? path.posix.basename(relativePath),
                  size: Number(sizeValue),
                  remotePath: toPosixRemotePath(regionRoot, relativeWithinRegion),
                });
              }
            }
            files.sort((left, right) => left.relativePath.localeCompare(right.relativePath));
            return files;
          },
          async hashRemoteFile(remotePath, algorithm) {
            const remoteCommand = `cat ${quoteForShell(remotePath)}`;
            return hashCommandOutput("ssh", getSshCommandArgs(config, remoteCommand), algorithm);
          },
          close() {},
        },
        attempt: {
          protocol: "ssh",
          host,
          user,
          remoteRoot,
          keyPath,
          status: "connected",
          detail: `Connected with SSH key ${summarizeKeyPath(keyPath)}`,
        },
      };
    } catch (error) {
      errors.push(`${summarizeKeyPath(keyPath)}: ${error.message}`);
    }
  }

  return {
    ok: false,
    attempt: {
      protocol: "ssh",
      host,
      user,
      remoteRoot,
      status: "failed",
      detail: errors.join(" | "),
    },
  };
}

async function connectFtp(credentials) {
  const client = new Client(60_000);
  client.ftp.verbose = false;
  await client.access({
    host: credentials.host,
    user: credentials.user,
    password: credentials.password,
    port: credentials.port,
    secure: credentials.secure,
    secureOptions: credentials.allowInvalidCert
      ? { rejectUnauthorized: false }
      : undefined,
  });
  return client;
}

async function tryCreateFtpTransport(options) {
  const credentials = {
    host: process.env.CPANEL_FTP_HOST,
    user: process.env.CPANEL_FTP_USER,
    password: process.env.CPANEL_FTP_PASSWORD,
    port: Number(process.env.CPANEL_FTP_PORT || 21),
    secure:
      process.env.CPANEL_FTP_SECURE === "implicit"
        ? "implicit"
        : String(process.env.CPANEL_FTP_SECURE || "").toLowerCase() === "true",
    allowInvalidCert: String(process.env.CPANEL_FTP_ALLOW_INVALID_CERT || "").toLowerCase() === "true",
    remoteRoot: options.remoteRoot || process.env.CPANEL_FTP_ROOT || "",
  };

  await loadFtpSimpleProfile(credentials);

  if (!credentials.host || !credentials.user || !credentials.password) {
    return {
      ok: false,
      attempt: {
        protocol: "ftp",
        host: credentials.host || "(unset)",
        user: credentials.user || "(unset)",
        remoteRoot: credentials.remoteRoot || "(unset)",
        status: "skipped",
        detail: "Missing CPANEL_FTP_HOST / CPANEL_FTP_USER / CPANEL_FTP_PASSWORD",
      },
    };
  }

  try {
    const client = await connectFtp(credentials);
    const remoteRoot = await resolveRemoteRoot(client, credentials.remoteRoot);
    return {
      ok: true,
      transport: {
        protocol: "ftp",
        host: credentials.host,
        user: credentials.user,
        port: credentials.port,
        remoteRoot,
        async collectRemoteFiles(filterSegments) {
          return collectRemoteFiles(client, remoteRoot, filterSegments);
        },
        async hashRemoteFile(remotePath, algorithm) {
          return hashRemoteFile(client, remotePath, algorithm);
        },
        close() {
          client.close();
        },
      },
      attempt: {
        protocol: "ftp",
        host: credentials.host,
        user: credentials.user,
        remoteRoot,
        status: "connected",
        detail: "Connected over FTP",
      },
    };
  } catch (error) {
    return {
      ok: false,
      attempt: {
        protocol: "ftp",
        host: credentials.host,
        user: credentials.user,
        remoteRoot: credentials.remoteRoot || "(unset)",
        status: "failed",
        detail: error.message,
      },
    };
  }
}

async function resolveRemoteRoot(client, explicitRoot) {
  const candidates = explicitRoot
    ? [explicitRoot]
    : [
        process.env.CPANEL_FTP_ROOT,
        "/public_html/beloveful.com/public_html/images",
        "/public_html/images",
      ].filter(Boolean);

  for (const candidate of candidates) {
    try {
      await client.list(candidate);
      return candidate;
    } catch {
      // try next candidate
    }
  }

  throw new Error(
    `Unable to list a remote travel root. Tried: ${candidates.join(", ") || "(none)"}`,
  );
}

function buildTransportFailureError(protocol, attempts) {
  const lines = [
    `Unable to establish a remote ${protocol === "auto" ? "FTP/SSH" : protocol.toUpperCase()} connection for the travel audit.`,
  ];

  for (const attempt of attempts) {
    const target = `${attempt.protocol.toUpperCase()} ${attempt.user}@${attempt.host}`;
    const root = attempt.remoteRoot ? ` root=${attempt.remoteRoot}` : "";
    const key = attempt.keyPath ? ` key=${summarizeKeyPath(attempt.keyPath)}` : "";
    lines.push(`- ${target}${root}${key}: ${attempt.status} (${attempt.detail})`);
  }

  lines.push(
    "Check that the CPANEL_* settings in .env.local point at the correct server for this repo and that the selected credentials are valid.",
  );
  lines.push(
    "If the server requires SSH/SFTP, ensure CPANEL_SFTP_PRIVATE_KEY_PATH references the correct key file or update the connection details before rerunning.",
  );

  return new Error(lines.join("\n"));
}

async function collectLocalFiles(localRoot, filterSegments) {
  const rootEntries = await fs.readdir(localRoot, { withFileTypes: true });
  const files = [];
  const stack = [];

  for (const entry of rootEntries) {
    if (!entry.isDirectory()) {
      continue;
    }
    if (!TRAVEL_REGIONS.has(entry.name)) {
      continue;
    }
    if (!shouldTraversePath([entry.name], filterSegments)) {
      continue;
    }
    stack.push({
      absolutePath: path.join(localRoot, entry.name),
      relativeParts: [entry.name],
    });
  }

  while (stack.length > 0) {
    const current = stack.pop();
    const entries = await fs.readdir(current.absolutePath, { withFileTypes: true });

    for (const entry of entries) {
      if (!isSafeName(entry.name)) {
        continue;
      }

      const relativeParts = [...current.relativeParts, entry.name];
      const absolutePath = path.join(current.absolutePath, entry.name);

      if (entry.isDirectory()) {
        if (shouldTraversePath(relativeParts, filterSegments)) {
          stack.push({ absolutePath, relativeParts });
        }
        continue;
      }

      if (!isImageFile(entry.name) || !isWithinFilter(relativeParts, filterSegments)) {
        continue;
      }

      const stats = await fs.stat(absolutePath);
      files.push({
        source: "local",
        relativePath: toPosixPath(relativeParts),
        relativeDir: toPosixPath(relativeParts.slice(0, -1)),
        filename: entry.name,
        size: stats.size,
        absolutePath,
      });
    }
  }

  files.sort((left, right) => left.relativePath.localeCompare(right.relativePath));
  return files;
}

async function collectRemoteFiles(client, remoteRoot, filterSegments) {
  const rootEntries = await client.list(remoteRoot);
  const files = [];
  const stack = [];

  for (const entry of rootEntries) {
    if (!entry.isDirectory || !TRAVEL_REGIONS.has(entry.name)) {
      continue;
    }
    if (!shouldTraversePath([entry.name], filterSegments)) {
      continue;
    }
    stack.push({
      remotePath: createRemotePath(remoteRoot, entry.name),
      relativeParts: [entry.name],
    });
  }

  while (stack.length > 0) {
    const current = stack.pop();
    const entries = await client.list(current.remotePath);

    for (const entry of entries) {
      if (!isSafeName(entry.name)) {
        continue;
      }

      const relativeParts = [...current.relativeParts, entry.name];
      const remotePath = createRemotePath(current.remotePath, entry.name);

      if (entry.isDirectory) {
        if (shouldTraversePath(relativeParts, filterSegments)) {
          stack.push({ remotePath, relativeParts });
        }
        continue;
      }

      if (!isImageFile(entry.name) || !isWithinFilter(relativeParts, filterSegments)) {
        continue;
      }

      const size = Number.isFinite(entry.size) ? entry.size : null;
      files.push({
        source: "remote",
        relativePath: toPosixPath(relativeParts),
        relativeDir: toPosixPath(relativeParts.slice(0, -1)),
        filename: entry.name,
        size,
        remotePath,
      });
    }
  }

  files.sort((left, right) => left.relativePath.localeCompare(right.relativePath));
  return files;
}

function createComparisonRow(category, localRecord, remoteRecord, extra = {}) {
  const localRelativePath = localRecord?.relativePath ?? null;
  const remoteRelativePath = remoteRecord?.relativePath ?? null;
  const relativePath =
    extra.relativePath ??
    localRelativePath ??
    remoteRelativePath ??
    "";
  return {
    category,
    relativePath,
    localRelativePath,
    remoteRelativePath,
    relativeDir: localRecord?.relativeDir ?? remoteRecord?.relativeDir ?? "",
    filename: localRecord?.filename ?? remoteRecord?.filename ?? path.posix.basename(relativePath),
    localSize: localRecord?.size ?? null,
    remoteSize: remoteRecord?.size ?? null,
    sizeMatch:
      Number.isFinite(localRecord?.size) && Number.isFinite(remoteRecord?.size)
        ? localRecord.size === remoteRecord.size
        : null,
    localHash: extra.localHash ?? null,
    remoteHash: extra.remoteHash ?? null,
    hashMatch: extra.hashMatch ?? null,
    reasons: extra.reasons ?? [],
    localPath: localRecord?.absolutePath ?? null,
    remotePath: remoteRecord?.remotePath ?? null,
  };
}

function pairCaseInsensitiveRecords(localRecords, remoteRecords) {
  const localByCaseFoldedPath = new Map();
  const remoteByCaseFoldedPath = new Map();

  for (const record of localRecords) {
    const key = record.relativePath.toLowerCase();
    if (!localByCaseFoldedPath.has(key)) {
      localByCaseFoldedPath.set(key, []);
    }
    localByCaseFoldedPath.get(key).push(record);
  }

  for (const record of remoteRecords) {
    const key = record.relativePath.toLowerCase();
    if (!remoteByCaseFoldedPath.has(key)) {
      remoteByCaseFoldedPath.set(key, []);
    }
    remoteByCaseFoldedPath.get(key).push(record);
  }

  const pathCaseMismatchPairs = [];
  const unmatchedLocal = [];
  const unmatchedRemote = [];
  const allKeys = [...new Set([
    ...localByCaseFoldedPath.keys(),
    ...remoteByCaseFoldedPath.keys(),
  ])].sort((left, right) => left.localeCompare(right));

  for (const key of allKeys) {
    const localGroup = [...(localByCaseFoldedPath.get(key) ?? [])].sort((left, right) =>
      left.relativePath.localeCompare(right.relativePath),
    );
    const remoteGroup = [...(remoteByCaseFoldedPath.get(key) ?? [])].sort((left, right) =>
      left.relativePath.localeCompare(right.relativePath),
    );
    const pairCount = Math.min(localGroup.length, remoteGroup.length);

    for (let index = 0; index < pairCount; index += 1) {
      pathCaseMismatchPairs.push({
        localRecord: localGroup[index],
        remoteRecord: remoteGroup[index],
      });
    }

    unmatchedLocal.push(...localGroup.slice(pairCount));
    unmatchedRemote.push(...remoteGroup.slice(pairCount));
  }

  return { pathCaseMismatchPairs, unmatchedLocal, unmatchedRemote };
}

async function compareMatchedRecords(category, localRecord, remoteRecord, options, remoteTransport, progress) {
  const canCompareSize =
    Number.isFinite(localRecord.size) && Number.isFinite(remoteRecord.size);
  const sizeMatch = canCompareSize ? localRecord.size === remoteRecord.size : null;
  let localHash = null;
  let remoteHash = null;
  let hashMatch = null;
  const reasons = [];

  if (sizeMatch === false) {
    reasons.push("size");
  }

  if (options.hash && sizeMatch !== false) {
    localHash = await hashLocalFile(localRecord.absolutePath, options.hashAlgorithm);
    remoteHash = await remoteTransport.hashRemoteFile(remoteRecord.remotePath, options.hashAlgorithm);
    hashMatch = localHash === remoteHash;
    progress.hashedPairs += 1;

    if (!hashMatch) {
      reasons.push("hash");
    }

    if (progress.hashedPairs % 100 === 0) {
      console.log(`🔎 Hashed ${progress.hashedPairs}/${progress.totalPairs} matched pairs...`);
    }
  }

  const isContentMatch =
    options.hash
      ? reasons.length === 0 && hashMatch === true
      : sizeMatch === true;
  const finalCategory =
    category === "path_case_mismatch"
      ? "path_case_mismatch"
      : isContentMatch
        ? "exact_match"
        : "different_content";
  const row = createComparisonRow(finalCategory, localRecord, remoteRecord, {
    localHash,
    remoteHash,
    hashMatch,
    reasons,
  });

  if (!isContentMatch && reasons.length === 0) {
    row.reasons = ["size_unavailable"];
  }

  return { row, isContentMatch };
}

async function compareInventories(localFiles, remoteFiles, options, remoteTransport) {
  const localByPath = new Map(localFiles.map((record) => [record.relativePath, record]));
  const remoteByPath = new Map(remoteFiles.map((record) => [record.relativePath, record]));
  const exactPathPairs = [...localByPath.keys()]
    .filter((relativePath) => remoteByPath.has(relativePath))
    .sort((left, right) => left.localeCompare(right))
    .map((relativePath) => ({
      localRecord: localByPath.get(relativePath),
      remoteRecord: remoteByPath.get(relativePath),
    }));
  const unmatchedLocalRecords = localFiles.filter(
    (record) => !remoteByPath.has(record.relativePath),
  );
  const unmatchedRemoteRecords = remoteFiles.filter(
    (record) => !localByPath.has(record.relativePath),
  );
  const { pathCaseMismatchPairs, unmatchedLocal, unmatchedRemote } = pairCaseInsensitiveRecords(
    unmatchedLocalRecords,
    unmatchedRemoteRecords,
  );

  const localOnly = [];
  const remoteOnly = [];
  const differentContent = [];
  const exactMatches = [];
  const pathCaseMismatch = [];
  const rows = [];
  const progress = {
    hashedPairs: 0,
    totalPairs: exactPathPairs.length + pathCaseMismatchPairs.length,
  };

  if (options.hash) {
    console.log(
      `🔐 Hashing enabled (${options.hashAlgorithm}). Matched pairs to verify: ${progress.totalPairs}`,
    );
  }

  for (const pair of exactPathPairs) {
    const { row } = await compareMatchedRecords(
      "exact_match",
      pair.localRecord,
      pair.remoteRecord,
      options,
      remoteTransport,
      progress,
    );

    if (row.category === "exact_match") {
      exactMatches.push(row);
    } else {
      differentContent.push(row);
    }

    rows.push(row);
  }

  for (const pair of pathCaseMismatchPairs) {
    const { row } = await compareMatchedRecords(
      "path_case_mismatch",
      pair.localRecord,
      pair.remoteRecord,
      options,
      remoteTransport,
      progress,
    );
    pathCaseMismatch.push(row);
    rows.push(row);
  }

  for (const localRecord of unmatchedLocal.sort((left, right) =>
    left.relativePath.localeCompare(right.relativePath),
  )) {
    const row = createComparisonRow("local_only", localRecord, null);
    localOnly.push(row);
    rows.push(row);
  }

  for (const remoteRecord of unmatchedRemote.sort((left, right) =>
    left.relativePath.localeCompare(right.relativePath),
  )) {
    const row = createComparisonRow("remote_only", null, remoteRecord);
    remoteOnly.push(row);
    rows.push(row);
  }

  rows.sort((left, right) => {
    const leftPath = left.relativePath.toLowerCase();
    const rightPath = right.relativePath.toLowerCase();
    if (leftPath !== rightPath) {
      return leftPath.localeCompare(rightPath);
    }
    return left.category.localeCompare(right.category);
  });

  return {
    localOnly,
    remoteOnly,
    differentContent,
    exactMatches,
    pathCaseMismatch,
    rows,
  };
}

function buildSummary(report, options, localFiles, remoteFiles, remoteRoot) {
  const localBytes = localFiles.reduce(
    (total, record) => total + (Number.isFinite(record.size) ? record.size : 0),
    0,
  );
  const remoteBytes = remoteFiles.reduce(
    (total, record) => total + (Number.isFinite(record.size) ? record.size : 0),
    0,
  );

  return {
    generatedAt: new Date().toISOString(),
    scope: "travel-portfolio-only",
    readOnly: true,
    comparisonBasis: options.hash
      ? `relative_path + filename + size + ${options.hashAlgorithm}`
      : "relative_path + filename + size",
    filter: options.filter || null,
    localRoot: options.localRoot,
    remoteRoot,
    totals: {
      localFiles: localFiles.length,
      remoteFiles: remoteFiles.length,
      matchedFiles: report.exactMatches.length + report.pathCaseMismatch.length,
      localBytes,
      remoteBytes,
      localOnly: report.localOnly.length,
      remoteOnly: report.remoteOnly.length,
      differentContent: report.differentContent.length,
      exactMatches: report.exactMatches.length,
      pathCaseMismatch: report.pathCaseMismatch.length,
    },
  };
}

function printCategory(name, records, options) {
  console.log(`\n${name}: ${records.length}`);
  if (records.length === 0) {
    return;
  }

  const list = options.verbose ? records : records.slice(0, options.sampleLimit);
  for (const record of list) {
    const displayPath =
      record.category === "path_case_mismatch" &&
      record.localRelativePath &&
      record.remoteRelativePath &&
      record.localRelativePath !== record.remoteRelativePath
        ? `${record.localRelativePath} <-> ${record.remoteRelativePath}`
        : record.relativePath;
    const suffix = [];
    if (Number.isFinite(record.localSize)) {
      suffix.push(`local=${formatBytes(record.localSize)}`);
    }
    if (Number.isFinite(record.remoteSize)) {
      suffix.push(`remote=${formatBytes(record.remoteSize)}`);
    }
    if (record.reasons?.length) {
      suffix.push(`reasons=${record.reasons.join("|")}`);
    }
    console.log(`  - ${displayPath}${suffix.length ? ` (${suffix.join(", ")})` : ""}`);
  }

  if (!options.verbose && records.length > list.length) {
    console.log(`  ... ${records.length - list.length} more (see JSON/CSV for full output)`);
  }
}

async function writeReports(summary, report, outputDir, outputPrefix) {
  await fs.mkdir(outputDir, { recursive: true });

  const jsonPath = path.join(outputDir, `${outputPrefix}.json`);
  const csvPath = path.join(outputDir, `${outputPrefix}.csv`);

  const jsonPayload = {
    summary,
    results: {
      localOnly: report.localOnly,
      remoteOnly: report.remoteOnly,
      differentContent: report.differentContent,
      exactMatches: report.exactMatches,
      pathCaseMismatch: report.pathCaseMismatch,
    },
  };

  await fs.writeFile(jsonPath, JSON.stringify(jsonPayload, null, 2), "utf8");

  const csvColumns = [
    "category",
    "relativePath",
    "localRelativePath",
    "remoteRelativePath",
    "relativeDir",
    "filename",
    "localSize",
    "remoteSize",
    "sizeMatch",
    "localHash",
    "remoteHash",
    "hashMatch",
    "reasons",
    "localPath",
    "remotePath",
  ];

  const csvLines = [
    csvColumns.join(","),
    ...report.rows.map((row) =>
      [
        row.category,
        row.relativePath,
        row.localRelativePath,
        row.remoteRelativePath,
        row.relativeDir,
        row.filename,
        row.localSize,
        row.remoteSize,
        row.sizeMatch,
        row.localHash,
        row.remoteHash,
        row.hashMatch,
        Array.isArray(row.reasons) ? row.reasons.join("|") : row.reasons,
        row.localPath,
        row.remotePath,
      ]
        .map(escapeCsv)
        .join(","),
    ),
  ];

  await fs.writeFile(csvPath, `${csvLines.join("\n")}\n`, "utf8");

  return { jsonPath, csvPath };
}

async function main() {
  let options;
  try {
    options = parseArgs(process.argv.slice(2));
  } catch (error) {
    console.error(`❌ ${error.message}`);
    printUsage();
    process.exit(1);
  }

  if (options.help) {
    printUsage();
    return;
  }

  const filterSegments = parseFilterSegments(options.filter);

  await fs.access(options.localRoot).catch(() => {
    throw new Error(`Local travel root not found: ${options.localRoot}`);
  });

  console.log("🔎 Starting read-only travel portfolio audit");
  console.log(`📁 Local root: ${options.localRoot}`);
  if (filterSegments.length > 0) {
    console.log(`🎯 Filter: ${options.filter}`);
  } else {
    console.log("🎯 Filter: all travel regions/countries");
  }
  console.log(`🌐 Protocol: ${options.protocol}`);

  const attempts = [];
  let remoteTransport = null;
  const protocolOrder =
    options.protocol === "auto"
      ? ["ssh", "ftp"]
      : [options.protocol];

  for (const protocol of protocolOrder) {
    const result = protocol === "ssh"
      ? await tryCreateSshTransport(options)
      : await tryCreateFtpTransport(options);
    attempts.push(result.attempt);
    if (result.ok) {
      remoteTransport = result.transport;
      break;
    }
  }

  if (!remoteTransport) {
    throw buildTransportFailureError(options.protocol, attempts);
  }

  try {
    if (typeof remoteTransport.resolveRemoteRoot === "function") {
      remoteTransport.remoteRoot = await remoteTransport.resolveRemoteRoot();
    }
    console.log(
      `🌐 Remote transport: ${remoteTransport.protocol.toUpperCase()} ${remoteTransport.user}@${remoteTransport.host}:${remoteTransport.port}`,
    );
    if (remoteTransport.keyPath) {
      console.log(`🔑 SSH key: ${summarizeKeyPath(remoteTransport.keyPath)}`);
    }
    console.log(`🌐 Remote root: ${remoteTransport.remoteRoot}`);

    console.log("📚 Collecting local travel image inventory...");
    const localFiles = await collectLocalFiles(options.localRoot, filterSegments);
    console.log(
      `✅ Local inventory complete: ${localFiles.length} files (${formatBytes(
        localFiles.reduce((sum, record) => sum + (record.size || 0), 0),
      )})`,
    );

    console.log("📚 Collecting remote travel image inventory...");
    const remoteFiles = await remoteTransport.collectRemoteFiles(filterSegments);
    console.log(
      `✅ Remote inventory complete: ${remoteFiles.length} files (${formatBytes(
        remoteFiles.reduce((sum, record) => sum + (record.size || 0), 0),
      )})`,
    );

    const report = await compareInventories(localFiles, remoteFiles, options, remoteTransport);
    const summary = buildSummary(report, options, localFiles, remoteFiles, remoteTransport.remoteRoot);

    const filterPart =
      filterSegments.length > 0
        ? `__${sanitizeFilenamePart(filterSegments.join("-"))}`
        : "";
    const outputPrefix = `travel-portfolio-audit${filterPart}__${formatTimestampForFilename()}`;
    const outputPaths = await writeReports(summary, report, options.outputDir, outputPrefix);

    console.log("\nSummary");
    console.log(`  - Local files: ${summary.totals.localFiles}`);
    console.log(`  - Remote files: ${summary.totals.remoteFiles}`);
    console.log(`  - Matched files (exact + case-only): ${summary.totals.matchedFiles}`);
    console.log(`  - Path-case mismatches: ${summary.totals.pathCaseMismatch}`);
    console.log(`  - Local-only: ${summary.totals.localOnly}`);
    console.log(`  - Remote-only: ${summary.totals.remoteOnly}`);
    console.log(`  - Different size/hash: ${summary.totals.differentContent}`);
    console.log(`  - Exact matches: ${summary.totals.exactMatches}`);

    printCategory("Path-case mismatches", report.pathCaseMismatch, options);
    printCategory("Local-only files", report.localOnly, options);
    printCategory("Remote-only files", report.remoteOnly, options);
    printCategory("Same path/name but different size/hash", report.differentContent, options);
    printCategory("Exact matches", report.exactMatches, options);

    console.log("\nReports");
    console.log(`  - JSON: ${outputPaths.jsonPath}`);
    console.log(`  - CSV: ${outputPaths.csvPath}`);
  } finally {
    remoteTransport.close?.();
  }
}

main().catch((error) => {
  console.error(`❌ ${error.message ?? error}`);
  process.exit(1);
});
