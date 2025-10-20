# 🚀 Quick Start - Beloveful.com on Cloudflare

## ✅ What's Done
- [x] Cloudflare Worker deployed
- [x] API endpoints created (`/api/health`, `/api/sync-metadata`)
- [x] Static site hosting configured
- [x] Documentation written

## ⚠️ What You Need to Do

### 1. Update DNS (5 minutes)
Go to **Cloudflare Dashboard** → **beloveful.com** → **DNS**

Make sure these records exist and are **Proxied** (orange cloud ☁️):

```
Type: A
Name: @
Content: 192.0.2.1
Proxy: ON ✅

Type: CNAME  
Name: www
Content: beloveful.com
Proxy: ON ✅
```

Delete any old Vercel A records.

### 2. Set Cloudinary Secrets (2 minutes)
Run these commands (you'll be prompted for values):

```bash
wrangler secret put CLOUDINARY_CLOUD_NAME
wrangler secret put CLOUDINARY_API_KEY
wrangler secret put CLOUDINARY_API_SECRET
```

Get values from: https://console.cloudinary.com/settings/api-keys

### 3. Test Everything (2 minutes)
After DNS propagates (5-15 min):

```bash
# Test site
curl -I https://beloveful.com

# Test API
curl https://beloveful.com/api/health

# Test metadata sync
curl -X POST https://beloveful.com/api/sync-metadata \
  -H "Content-Type: application/json" \
  -d '{"continentFolder": "Africa", "countryFolder": "Egypt"}'
```

## 📖 Full Documentation
- **Complete Guide**: `docs/DEPLOYMENT_SUMMARY.md`
- **API Docs**: `docs/METADATA_SYNC.md`
- **Project Overview**: `WARP.md`

## 🆘 Need Help?
Check the **Troubleshooting** section in `docs/DEPLOYMENT_SUMMARY.md`

---

**That's it!** Once DNS is updated and secrets are set, you're live on Cloudflare. 🎉
