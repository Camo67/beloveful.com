# Quick Start: Fix Bluehost FTP Connection

## Problem
Admin panel's "Scan Bluehost FTP" button was failing because FTP password was missing.

## Solution (3 Steps)

### Step 1: Run Setup Wizard (Local Development)
```bash
npm run ftp:setup
```
Follow the prompts to enter your Bluehost credentials.

**Note**: FTP scanning runs locally via Vite middleware. Credentials are stored in `.env.local` (not committed to git).

### Step 2: Test Connection
```bash
npm run ftp:test
```
Should show "✅ Successfully connected to FTP server!"

### Step 3: Use Admin Panel
```bash
npm run dev
```
Go to: Admin > Images > Upload > Click "Scan Bluehost FTP"

## Where to Find Credentials

Log in to Bluehost cPanel → Files → FTP Accounts

- **Host**: Server IP or your domain
- **Username**: Your FTP username (e.g., `belovefu`)
- **Password**: Reset if needed in cPanel
- **Root**: `/public_html/beloveful.com/public_html/images`

## Architecture Note

**FTP scanning is a local development feature:**
- ✅ Runs on your machine via Vite dev server
- ✅ Credentials stored in `.env.local` (never committed)
- ✅ Used for admin operations only
- ❌ NOT deployed to Cloudflare Workers (no FTP creds in production)

For production, images are served directly from Bluehost URLs. To add new images:
1. Upload to Bluehost via FTP/FileZilla
2. Run local dev and scan/import
3. Redeploy to Cloudflare

See [CLOUDFLARE_ENV_SETUP.md](CLOUDFLARE_ENV_SETUP.md) for details.

## Troubleshooting

**Missing credentials?** → Run `npm run ftp:setup`
**Connection failed?** → Check host/port, try FileZilla first
**Auth failed?** → Reset password in cPanel
**Path not found?** → Browse with FTP client to find correct path

## Documentation

- 📖 Full guide: [FTP_SETUP_GUIDE.md](FTP_SETUP_GUIDE.md)
- 🔍 Detailed fix info: [FTP_FIX_SUMMARY.md](FTP_FIX_SUMMARY.md)
- ☁️ Cloudflare setup: [CLOUDFLARE_ENV_SETUP.md](CLOUDFLARE_ENV_SETUP.md)
- ✅ Testing checklist: [VERIFICATION_CHECKLIST.md](VERIFICATION_CHECKLIST.md)

## Need Help?

Run diagnostic: `node test-ftp-connection.js`
Check console logs when clicking "Scan Bluehost FTP"
