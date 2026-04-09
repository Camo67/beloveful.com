#!/usr/bin/env node

import fs from "fs/promises";
import path from "path";
import { execSync } from "child_process";

// Quick development utilities script for common tasks
const args = process.argv.slice(2);
const command = args[0];

async function displayHelp() {
  console.log(`
Quick Development Utilities for Beloveful.com

Usage: node scripts/quick-dev.mjs [command]

Commands:
  help                    Show this help message
  status                  Display current project status
  clean                   Clean build artifacts and cache
  reset-db                Reset the local database
  restart                 Restart dev servers with fresh start
  audit                   Run dependency audit and fixes
  logs                    Show recent development logs
  rebuild               Force a full rebuild
  `);
}

async function showStatus() {
  console.log("🔍 Project Status:");
  console.log("- Package manager: npm");
  console.log("- Frontend: React 18 + TypeScript");
  console.log("- Backend: Cloudflare Workers + D1");
  console.log("- Image hosting: Cloudinary + R2");
  console.log("- Current Git branch:", execSync("git branch --show-current").toString().trim());
  
  try {
    const pkg = JSON.parse(await fs.readFile("package.json", "utf8"));
    console.log("- Project version:", pkg.version);
  } catch (e) {
    console.log("- Could not read package.json");
  }
}

async function cleanCache() {
  console.log("🧹 Cleaning caches and build artifacts...");
  
  const pathsToClean = [
    "node_modules/.vite",
    "dist",
    ".wrangler",
    "node_modules/.cache",
    "node_modules/.vite/deps"
  ];
  
  for (const p of pathsToClean) {
    try {
      await fs.rm(p, { recursive: true, force: true });
      console.log(`✓ Removed ${p}`);
    } catch (e) {
      console.log(`- Skipped ${p} (not found)`);
    }
  }
  
  console.log("Cache cleaning completed!");
}

async function resetDatabase() {
  console.log("🔄 Resetting local database...");
  try {
    execSync("npm run db:reset:local", { stdio: "inherit" });
    console.log("Database reset completed!");
  } catch (e) {
    console.error("Error resetting database:", e.message);
  }
}

async function restartDev() {
  console.log("🔄 Restarting development environment...");
  try {
    // Kill any existing processes on ports 8080 and 8787
    try {
      execSync("lsof -ti:8080 | xargs kill -9", { stdio: 'ignore' });
    } catch {}
    try {
      execSync("lsof -ti:8787 | xargs kill -9", { stdio: 'ignore' });
    } catch {}
    
    console.log("Ports cleared. Starting dev servers...");
    console.log("Run: npm run dev");
  } catch (e) {
    console.error("Error restarting dev environment:", e.message);
  }
}

async function runAudit() {
  console.log("🔍 Auditing dependencies...");
  try {
    execSync("npm audit", { stdio: "inherit" });
    
    console.log("\nAttempting to fix vulnerabilities...");
    execSync("npm audit fix", { stdio: "inherit" });
    console.log("Dependency audit completed!");
  } catch (e) {
    console.log("Some vulnerabilities couldn't be fixed automatically.");
    console.log("Consider checking: npm audit --audit-level high");
  }
}

async function showLogs() {
  console.log("📋 Recent development logs would appear here");
  console.log("(Implementation depends on your logging setup)");
  
  // Check for common log files
  const logFiles = [
    "debug.log",
    "npm-debug.log",
    "wrangler.log"
  ];
  
  for (const logFile of logFiles) {
    try {
      await fs.access(logFile);
      console.log(`Found log file: ${logFile}`);
    } catch (e) {
      // File doesn't exist, continue
    }
  }
}

async function forceRebuild() {
  console.log("🔨 Performing full rebuild...");
  
  try {
    await cleanCache();
    execSync("npm install", { stdio: "inherit" });
    execSync("npm run build", { stdio: "inherit" });
    console.log("Full rebuild completed!");
  } catch (e) {
    console.error("Error during rebuild:", e.message);
  }
}

async function runCommand() {
  switch(command) {
    case "help":
    case "--help":
    case "-h":
      await displayHelp();
      break;
      
    case "status":
      await showStatus();
      break;
      
    case "clean":
      await cleanCache();
      break;
      
    case "reset-db":
      await resetDatabase();
      break;
      
    case "restart":
      await restartDev();
      break;
      
    case "audit":
      await runAudit();
      break;
      
    case "logs":
      await showLogs();
      break;
      
    case "rebuild":
      await forceRebuild();
      break;
      
    default:
      console.log(`Unknown command: ${command}`);
      console.log("Run 'node scripts/quick-dev.mjs help' for available commands");
      break;
  }
}

// Execute the requested command
await runCommand();