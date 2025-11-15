## Beloveful Secure Image Pipeline

This document covers the prep work we can run **before new Adobe exports arrive** so the moment assets land we can batch them into the protected delivery chain.

### 1. Environment setup

1. Copy the client masters into a temporary ingest folder (default: `incoming/`).
2. Configure the following environment variables when running the pipeline:

| Variable | Default | Purpose |
| --- | --- | --- |
| `PROTECT_SOURCE_DIR` | `./incoming` | Folder containing the downloaded Adobe exports. |
| `PROTECT_OUTPUT_DIR` | `./public/secure-images` | Where processed WebP/AVIF files are written (hashed subfolders). |
| `PROTECT_MANIFEST` | `./secure-image-manifest.json` | JSON mapping of source file → hashed path → watermark tag. |
| `PROTECT_WATERMARK_SECRET` | `beloveful-default-secret` | Secret salt for hashing filenames and watermark IDs. Set this per project. |
| `PROTECT_WATERMARK_NAMESPACE` | `https://beloveful.com/xmp/1.0/` | Namespace used inside the invisible watermark (XMP). |
| `PROTECT_TARGET_WIDTH` | `2200` | Maximum width in pixels (aspect preserved). |
| `PROTECT_FORMAT` | `webp` | Output format (`webp`, `avif`, or `jpg`). |
| `PROTECT_JPEG_QUALITY` | `88` | Quality when `PROTECT_FORMAT=jpg` or `webp`. |
| `PROTECT_AVIF_QUALITY` | `55` | AVIF quality setting. |
| `VITE_SECURE_CDN_BASE_URL` | *(set in `.env`)* | URL prefix used by the frontend when resolving the hashed outputs (e.g., `https://cdn.beloveful.com`). Use `/` for local dev. |

### 2. Run the secure processor

```
PROTECT_SOURCE_DIR=/path/to/masters \
PROTECT_OUTPUT_DIR=./public/secure-images \
PROTECT_WATERMARK_SECRET="prod-secret" \
npm run images:secure
```

What it does:
- Resizes and optimizes each image.
- Strips default metadata.
- Injects an **invisible forensic watermark** as XMP with a per-image UUID.
- Writes the file to a hashed two-level directory (`/public/secure-images/ab/cd/hash.webp`).
- Updates `secure-image-manifest.json` so we can sync hashed URLs to the CDN/R2 bucket.

### 3. Upload and lock down delivery

1. Publish the processed folder to Cloudflare R2 (or your CDN of choice) using the hashed paths.
2. Update `src/lib/cdn-url-mapping.json` (or the automated sync script) with the manifest output so the frontend references only the protected paths.
3. Enable/verify the protection layers:
   - Hotlink protection (only `beloveful.com` allowed).
   - Firewall rule blocking requests with missing/invalid referers.
   - Rate-limit `/secure-images/*` (e.g., 200 req/min/IP).
   - Transform rule stripping metadata from any legacy uploads (new pipeline already embeds only the watermark tag).

### 4. Future automation

Once Adobe uploads are available, the exact sequence is:

1. Download masters from the private Adobe shared folder.
2. Run `npm run images:secure`.
3. Sync hashed outputs + manifest to CDN/R2.
4. Redeploy frontend so it consumes the refreshed `cdn-url-mapping`.

This gives us immediate coverage until the Adobe automation hooks are wired up, and everything here can run locally or in CI without needing direct Adobe APIs.
