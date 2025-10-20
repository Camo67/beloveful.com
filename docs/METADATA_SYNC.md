# Cloudinary Metadata Sync API

## Overview
This API endpoint syncs folder-based organization to metadata fields in Cloudinary, enabling advanced filtering and search capabilities.

## Architecture
- **Platform**: Cloudflare Workers
- **Framework**: Hono (already included in dependencies)
- **Deployment**: Integrated with main site deployment

## API Endpoints

### POST /api/sync-metadata
Syncs Cloudinary folder structure to metadata fields.

**Request Body:**
```json
{
  "continentFolder": "Africa",
  "countryFolder": "Egypt"
}
```

**Response (Success):**
```json
{
  "success": true,
  "updated": 42
}
```

**Response (Error):**
```json
{
  "error": "Invalid continent or country"
}
```

### GET /api/health
Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2025-01-19T10:00:00.000Z"
}
```

## Setup Instructions

### 1. Set Cloudflare Secrets
You need to add your Cloudinary credentials as secrets:

```bash
# Set each secret (you'll be prompted to enter the value)
wrangler secret put CLOUDINARY_CLOUD_NAME
wrangler secret put CLOUDINARY_API_KEY
wrangler secret put CLOUDINARY_API_SECRET
```

### 2. Build and Deploy
```bash
npm run deploy
```

This runs `vite build && wrangler deploy` which:
1. Builds your React app to `dist/`
2. Deploys the worker with static assets to Cloudflare

### 3. Test the API
```bash
# Health check
curl https://beloveful.com/api/health

# Sync metadata for Africa/Egypt
curl -X POST https://beloveful.com/api/sync-metadata \
  -H "Content-Type: application/json" \
  -d '{"continentFolder": "Africa", "countryFolder": "Egypt"}'
```

## Folder → Metadata Mapping

### Continents
| Folder Name | Metadata ID |
|------------|-------------|
| Africa | africa_id |
| Asia | asia_id |
| Australia & New Zealand | australia_id |
| Central America & Caribbean | central_america_id |
| Europe & Scandinavia | europe_id |
| Middle East | middle_east_id |
| North America | north_america_id |
| Oceania | oceania_id |
| South America | south_america_id |

### Countries
| Country Name | Metadata ID |
|-------------|-------------|
| Egypt | egypt_id |
| Ethiopia | ethiopia_id |
| Morocco | morocco_id |
| Namibia | namibia_id |
| South Africa | south_africa_id |

**To add more countries:**
1. Edit `src/worker.js`
2. Add entry to `COUNTRY_MAP` object
3. Redeploy with `npm run deploy`

## Rate Limits
- Processes up to 500 assets per request
- Searches in batches of 100
- Implements error handling for API failures

## Automation Options

### Option 1: GitHub Actions (Recommended)
Create `.github/workflows/sync-metadata.yml`:

```yaml
name: Sync Cloudinary Metadata
on:
  schedule:
    - cron: '0 2 * * 0'  # Weekly on Sunday at 2 AM
  workflow_dispatch:      # Manual trigger

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - name: Sync Africa/Egypt
        run: |
          curl -X POST https://beloveful.com/api/sync-metadata \
            -H "Content-Type: application/json" \
            -d '{"continentFolder": "Africa", "countryFolder": "Egypt"}'
      
      # Add more countries as needed
```

### Option 2: Local Script
Create `scripts/sync-all-metadata.sh`:

```bash
#!/bin/bash
CONTINENTS=("Africa")
COUNTRIES=("Egypt" "Ethiopia" "Morocco")

for country in "${COUNTRIES[@]}"; do
  echo "Syncing ${country}..."
  curl -X POST https://beloveful.com/api/sync-metadata \
    -H "Content-Type: application/json" \
    -d "{\"continentFolder\": \"Africa\", \"countryFolder\": \"${country}\"}"
  sleep 2  # Rate limit safety
done
```

### Option 3: Cloudflare Cron Trigger
Add to `wrangler.toml`:

```toml
[triggers]
crons = ["0 2 * * 0"]  # Weekly
```

Then handle in worker:
```js
export default {
  async scheduled(event, env, ctx) {
    // Trigger metadata sync
  }
}
```

## Troubleshooting

### "Cloudinary credentials not configured"
Run `wrangler secret put` commands to set credentials.

### "Invalid continent or country"
Check spelling in `CONTINENT_MAP` and `COUNTRY_MAP` in `src/worker.js`.

### Rate limit errors
The worker limits to 500 assets per call. For larger folders, run multiple times or increase the limit.

## Security Notes
- API secrets never exposed in client code
- Secrets stored in Cloudflare's encrypted secrets storage
- No authentication required (consider adding if exposed publicly)
- CORS enabled for `/api/*` routes only
