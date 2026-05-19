# Cloudflare Environment Variables Setup Guide

## Important Architecture Note

Your application has **TWO different runtime environments**:

### 1. Local Development (Vite Dev Server)
- Runs on your machine via `npm run dev`
- FTP scanning happens through Vite middleware (`/dev-api/ftp-sync`)
- Uses `.env.local` file for credentials ✅

### 2. Production (Cloudflare Workers)
- Deployed to Cloudflare's edge network
- Would need Cloudflare secrets/env vars
- **Currently, FTP scanning is ONLY available in local dev**

---

## 🖥️ Local Development Setup

For the admin panel's "Scan Bluehost FTP" feature during development:

### Step 1: Create `.env.local`
```bash
npm run ftp:setup
```

Or manually:
```bash
cp .env.local.template .env.local
# Edit .env.local with your credentials
```

### Step 2: Test Connection
```bash
npm run ftp:test
```

### Step 3: Start Dev Server
```bash
npm run dev
```

The FTP middleware runs locally and uses `.env.local` credentials.

---

## ☁️ Cloudflare Production Setup

**IMPORTANT**: The current FTP scanning feature (`/dev-api/ftp-sync`) only works in **local development** because it uses Vite middleware.

If you want FTP functionality in production on Cloudflare Workers, you have two options:

### Option A: Keep FTP Scanning Local-Only (Recommended)

**Current architecture:**
1. Run `npm run ftp:setup` locally to scan Bluehost
2. Import image paths into database
3. Deploy the app to Cloudflare (without FTP creds)
4. Images are served from Bluehost URLs directly

**Why this is better:**
- No sensitive FTP credentials stored in Cloudflare
- FTP scanning is an admin-only operation
- Simpler security model
- Works perfectly fine

### Option B: Move FTP Logic to Cloudflare Worker (Advanced)

If you need FTP scanning in production, you'd need to:

#### 1. Add FTP credentials as Cloudflare Secrets

```bash
# Set secrets in Cloudflare
wrangler secret put CPANEL_FTP_HOST
wrangler secret put CPANEL_FTP_USER
wrangler secret put CPANEL_FTP_PASSWORD
wrangler secret put CPANEL_FTP_PORT
wrangler secret put CPANEL_FTP_ROOT
wrangler secret put CPANEL_FTP_SECURE
```

#### 2. Update wrangler.toml

Add environment variable declarations:

```toml
[vars]
CPANEL_FTP_HOST = ""  # Set via wrangler secret put
CPANEL_FTP_USER = ""
CPANEL_FTP_PORT = "21"
CPANEL_FTP_ROOT = "/public_html/beloveful.com/public_html/images"
CPANEL_FTP_SECURE = "false"
```

#### 3. Create API Route in Worker

Create `functions/api/images/scan-ftp.ts`:

```typescript
import { Client } from 'basic-ftp';

export async function onRequestPost({ env, request }: any) {
  try {
    // Get credentials from Cloudflare env
    const host = env.CPANEL_FTP_HOST;
    const user = env.CPANEL_FTP_USER;
    const password = env.CPANEL_FTP_PASSWORD;
    
    if (!host || !user || !password) {
      return new Response(
        JSON.stringify({ error: 'FTP credentials not configured' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    // FTP scanning logic here...
    const client = new Client();
    await client.access({
      host,
      user,
      password,
      port: parseInt(env.CPANEL_FTP_PORT || '21'),
      secure: env.CPANEL_FTP_SECURE === 'true',
    });
    
    // ... rest of scanning logic
    
    return new Response(
      JSON.stringify({ success: true, paths: [] }),
      { headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
```

#### 4. Update Frontend to Use Production Endpoint

In `CpanelPathUpload.tsx`, change:
```typescript
// From:
const response = await fetch('/dev-api/ftp-sync', { method: 'POST' });

// To:
const response = await fetch('/api/images/scan-ftp', { method: 'POST' });
```

⚠️ **Security Warning**: Storing FTP credentials in Cloudflare means they're accessible to anyone who can deploy to your worker. Use with caution!

---

## 🔐 Security Best Practices

### For Local Development (.env.local)
✅ Do:
- Add `.env.local` to `.gitignore` (already done)
- Use strong passwords
- Rotate credentials regularly
- Never commit to version control

❌ Don't:
- Share `.env.local` files
- Store in cloud storage unencrypted
- Use same password across environments

### For Cloudflare Production
✅ Do:
- Use `wrangler secret put` for sensitive values
- Limit access to Cloudflare dashboard
- Enable audit logging
- Use separate FTP accounts with limited permissions

❌ Don't:
- Store FTP passwords in `wrangler.toml` (it's committed to git)
- Give admin access to everyone
- Use the same credentials for multiple purposes

---

## 📋 Current Configuration Status

### What Works Now:
- ✅ Local FTP scanning via Vite middleware
- ✅ Admin panel integration in dev mode
- ✅ Image path import to database
- ✅ Direct image serving from Bluehost URLs

### What Requires Changes:
- ❌ FTP scanning in production (needs worker implementation)
- ❌ Cloudflare environment variables (not set up yet)

---

## 🎯 Recommended Approach

**For most use cases, keep it simple:**

1. **Local Development:**
   ```bash
   npm run ftp:setup    # Configure once
   npm run dev          # Start dev server
   # Use admin panel to scan/import images
   ```

2. **Production Deployment:**
   ```bash
   npm run build        # Build the app
   npm run deploy       # Deploy to Cloudflare
   # Images served directly from Bluehost URLs
   ```

3. **Adding New Images:**
   - Upload to Bluehost via FTP/FileZilla
   - Run local dev server
   - Use admin panel to scan and import
   - Redeploy to Cloudflare

This approach:
- ✅ Keeps FTP credentials local only
- ✅ Simpler security model
- ✅ No Cloudflare secrets needed for FTP
- ✅ Works perfectly for admin operations

---

## 🔧 Setting Other Cloudflare Secrets

For other services (Cloudinary, email, etc.), use:

```bash
# Cloudinary (already configured per wrangler.toml)
wrangler secret put CLOUDINARY_CLOUD_NAME
wrangler secret put CLOUDINARY_API_KEY
wrangler secret put CLOUDINARY_API_SECRET

# Contact form (if using MailChannels/Resend)
wrangler secret put RESEND_API_KEY

# Check existing secrets
wrangler secret list
```

---

## 📊 Summary Table

| Feature | Local Dev | Production |
|---------|-----------|------------|
| FTP Scanning | ✅ Via `.env.local` | ❌ Not implemented |
| Image Serving | ✅ From Bluehost | ✅ From Bluehost |
| Database (D1) | ✅ Local SQLite | ✅ Cloudflare D1 |
| Storage (R2) | ✅ Local emulation | ✅ Cloudflare R2 |
| Cloudinary | ✅ Via `.env.local` | ✅ Via secrets |

---

## Need Production FTP Scanning?

If you absolutely need FTP scanning in production:

1. Follow "Option B" above
2. Consider using Cloudflare Queues for async processing
3. Add rate limiting and authentication
4. Monitor usage and costs
5. Consider alternative: webhook-based sync from Bluehost

But for 99% of use cases, **local-only FTP scanning is the right choice**.

---

**Last Updated**: 2026-05-20
**Status**: Local FTP scanning working, production optional
