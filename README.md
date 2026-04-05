 beloveful.com

Beloveful is a content-rich React site for Tony Menias / Beloveful that combines a travel photography portfolio, print shop, workshops, editorial pages, and an admin CMS. The frontend is built with Vite + React, while a Cloudflare Worker handles API routes, D1-backed content, Stripe checkout session creation, and R2 asset delivery.

## What this repo contains

- A public-facing SPA with routes for home, portfolio, country galleries, workshops, events, about, FAQ, contact, and print sales
- A password-protected admin area at `/admin` / `/adminlogin`
- Cloudflare Pages/Workers-style API functions under `functions/api`
- A custom Worker entrypoint in `src/worker.js` that serves both API routes and built frontend assets
- Static and generated image libraries sourced from `public/Website beloveful.com`, Cloudinary exports, and generated JSON data
- Deployment tooling for both Cloudflare and Bluehost/cPanel

## Tech stack

- React 18
- TypeScript
- Vite
- React Router
- TanStack Query
- Tailwind CSS + shadcn/ui components
- Cloudflare Workers
- Cloudflare D1
- Cloudflare R2
- Stripe Checkout
- Cloudinary-based asset workflows

## Main features

- Travel portfolio with region and country galleries
- Homepage slideshow and curated content blocks
- Workshops and mentorship landing pages
- Print shop with open-edition checkout and limited-edition catalog content
- Editable site copy via D1-backed `page_content`
- Editable contact/print/calendly settings via D1-backed `settings`
- Admin-managed albums, images, slideshow entries, and page content
- Upload pipeline that prefers WordPress media uploads when configured and falls back to R2
- Optional Bluehost build/export pipeline for static hosting + CMS bootstrap data

## Getting started

### Prerequisites

- Node.js 20+ recommended
- npm
- Wrangler CLI access through the project dependencies

### Install

```bash
npm install
```

### Environment files

Use `.env.local` for client/build-time variables and `.dev.vars` for local Worker secrets.

Start with:

```bash
cp .env.example .env.local
```

Common variables used in this repo:

- Client/build-time:
  - `VITE_CLOUDINARY_CLOUD_NAME`
  - `VITE_CALENDLY_LINK`
  - `VITE_SPOTIFY_CLIENT_ID`
  - `VITE_B2_*`
  - `VITE_IMAGE_CDN_URL`
- Worker/runtime secrets:
  - `JWT_SECRET`
  - `STRIPE_SECRET_KEY`
  - `CLOUDINARY_CLOUD_NAME`
  - `CLOUDINARY_API_KEY`
  - `CLOUDINARY_API_SECRET`
  - `WP_BASE_URL`
  - `WP_USERNAME`
  - `WP_APP_PASSWORD`
  - `CPANEL_IMAGES_BASE_URL`
- Bluehost/cPanel deploy variables:
  - `BLUEHOST_FTP_*` or `CPANEL_FTP_*`

### Local database setup

The admin/CMS flow depends on the local D1 schema.

```bash
npm run db:init:local
```

This seeds the tables used by the Worker, including albums, images, slideshow images, page content, settings, and a default admin user from `scripts/init-db.sql`.

If you are updating the schema from `server/schema.sql`, use:

```bash
npm run db:migrate:local
```

### Run the app

```bash
npm run dev
```

That starts:

- Vite on `http://localhost:8080`
- Wrangler local dev for `/api/*` on port `8787` by default

The dev launcher auto-selects another API port if `8787` is already in use and updates the Vite proxy automatically.

If you only want one side of the stack:

```bash
npm run dev:vite
npm run dev:api
```

### Admin login

- Public admin routes: `/adminlogin` and `/admin`
- Local auth is backed by D1 + JWT
- A default admin user is inserted by `scripts/init-db.sql`; replace it before using this outside local development

## Useful scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Run Vite and local Worker together |
| `npm run dev:vite` | Run only the frontend dev server |
| `npm run dev:api` | Run only the local Worker/API server |
| `npm run build` | Create the production build in `dist/` |
| `npm run preview` | Preview the Vite build locally |
| `npm run lint` | Run ESLint |
| `npm run db:init:local` | Initialize the local D1 database from `scripts/init-db.sql` |
| `npm run db:migrate:local` | Apply `server/schema.sql` to the local D1 database |
| `npm run deploy:cloudflare` | Build and deploy to Cloudflare Workers |
| `npm run build:bluehost` | Build the static Bluehost package in `build/bluehost/` |
| `npm run deploy:bluehost` | Build and upload the Bluehost package via FTP |
| `npm run portfolio:fetch` | Pull portfolio data from Cloudinary |
| `npm run portfolio:build` | Build album data from Cloudinary exports |
| `npm run images:secure` | Run the secure image pipeline |
| `npm run workshop:generate` | Generate workshop image JSON |

## Project structure

```text
beloveful.com/
├── src/
│   ├── components/          React UI and admin components
│   ├── hooks/               Data hooks for albums, content, settings, slideshow
│   ├── lib/                 Static data, generated assets, utilities, image helpers
│   ├── pages/               Route components for public pages and admin shell
│   ├── types/               Shared frontend types
│   ├── App.tsx              Client route map
│   └── worker.js            Cloudflare Worker entrypoint
├── functions/api/           API handlers used by the Worker
├── public/                  Static public assets and large image library
├── scripts/                 Data generation, sync, build, and deployment scripts
├── server/                  Legacy/local server helpers and SQL schema
├── docs/                    Deployment, asset, R2, and workflow notes
├── bluehost/                Bluehost overlay files
├── build/bluehost/          Generated Bluehost deploy package
└── wrangler.toml            Worker, route, R2, D1, and asset binding config
```

## How data flows through the site

### Public content

- Static gallery/image data is bundled from `src/lib/data.ts`, generated files in `src/lib/generated/`, and image libraries in `public/` and `src/lib/cloudinary-assets/`
- Dynamic page copy comes from `page_content` through `/api/content/public`
- Dynamic contact and booking settings come from `settings` through `/api/settings/public`
- Portfolio hooks merge bundled fallback data with D1-backed albums/images so the site can still render even if dynamic data is incomplete

### Admin content

The admin UI manages:

- Albums
- Images
- Slideshow images
- Editable page content
- Site settings

Authentication is JWT-based and verified in `functions/api/_utils/auth.ts`.

### Media storage

Image uploads can flow through:

- WordPress media uploads when `WP_*` credentials are configured
- Cloudflare R2 as a fallback
- Legacy cPanel path import helpers for bringing existing hosted files into the CMS

## Worker and API responsibilities

`src/worker.js` is responsible for:

- Routing all `/api/*` requests
- Serving the built SPA from the Wrangler assets binding
- Handling SPA fallback for client-side routes
- Serving R2-backed objects under `/r2/*`
- Creating Stripe checkout sessions at `/api/create-checkout-session`
- Exposing health and metadata sync endpoints

Representative API groups:

- `functions/api/auth/*` for admin auth
- `functions/api/albums/*` and `functions/api/images/*` for CMS data
- `functions/api/content/*` and `functions/api/settings/*` for editable page copy/settings
- `functions/api/public/*` for public-facing CMS reads
- `functions/api/rss/*`, `functions/api/spotify/*`, and `functions/api/ai/*` for integrations

## Deployment

### Cloudflare

Production Cloudflare configuration lives in `wrangler.toml`.

```bash
npm run deploy:cloudflare
```

This:

1. builds the frontend into `dist/`
2. deploys the Worker
3. binds static assets, D1, and R2 through Wrangler

Before deploying, make sure production secrets are configured with `wrangler secret put`.

### Bluehost / cPanel

This repo also supports a static export workflow for Bluehost.

```bash
npm run build:bluehost
```

That process:

- builds the app
- copies `dist/` into `build/bluehost/public_html`
- layers in files from `bluehost/public_html`
- packages bootstrap CMS data under `_cms_data/bootstrap`

To upload via FTP:

```bash
npm run deploy:bluehost
```

## Documentation

Additional notes live in `docs/`, including:

- `docs/DEPLOYMENT_SUMMARY.md`
- `docs/R2-CDN-SETUP.md`
- `docs/R2_UPLOAD_GUIDE.md`
- `docs/SECURE_IMAGE_PIPELINE.md`
- `docs/WORKSHOP_IMAGES.md`
- `docs/bluehost-migration.md`

## Notes for contributors

- This repo includes a very large image library, generated data, and legacy deployment artifacts, so file watching and builds can be heavier than a typical Vite app
- `npm run dev` already excludes the biggest asset folders from Vite watch to avoid file watcher limits
- The current worktree may include in-progress content and admin changes; read before refactoring shared data or deployment code

