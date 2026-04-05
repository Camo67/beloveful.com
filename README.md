# beloveful.com

Beloveful is a content-rich React site for Tony Menias / Beloveful that combines a travel photography portfolio, print shop, workshops, editorial pages, and an admin CMS. The frontend is built with Vite + React. The current default production path is a Bluehost/cPanel package with a PHP API overlay, while the Cloudflare Worker/D1/R2 runtime remains in the repo for local development, migration support, and alternate deployment needs.

## What this repo contains

- A public-facing SPA with routes for home, portfolio, country galleries, workshops, events, about, FAQ, contact, and print sales
- A password-protected admin area at `/admin` / `/adminlogin`
- Cloudflare Worker-style API functions under `functions/api`
- A Bluehost-compatible PHP API overlay under `bluehost/public_html/api`
- A custom Worker entrypoint in `src/worker.js` for the alternate Cloudflare runtime
- Static and generated image libraries sourced from `public/Website beloveful.com`, Cloudinary exports, and generated JSON data
- Deployment tooling for both Bluehost/cPanel and Cloudflare
- A privacy controls system with region-aware consent UI, first-party event gating, and D1-backed consent / rights-request logging

## Tech stack

- React 18
- TypeScript
- Vite
- React Router
- TanStack Query
- Tailwind CSS + shadcn/ui components
- PHP runtime for the Bluehost/cPanel deployment path
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
- Bluehost-first build/export pipeline for static hosting + CMS bootstrap data

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
- Privacy template and client-side privacy controls:
  - `VITE_PRIVACY_CONSENT_VERSION`
  - `VITE_PRIVACY_POLICY_VERSION`
  - `VITE_PRIVACY_LAST_UPDATED`
  - `VITE_PRIVACY_DISABLE_OPTIONAL_TRACKING`
  - `VITE_COMPANY_NAME`
  - `VITE_LEGAL_ENTITY`
  - `VITE_CONTACT_EMAIL`
  - `VITE_DPO_EMAIL`
  - `VITE_JURISDICTIONS`
  - `VITE_TRACKING_TOOLS`
  - `VITE_RETENTION_SCHEDULE`
  - `VITE_THIRD_PARTIES`
  - `VITE_LAWFUL_BASES`

Use `.dev.vars.example` as the template for runtime privacy secrets and retention settings:

- `PRIVACY_ADMIN_TOKEN`
- `PRIVACY_CONSENT_VERSION`
- `PRIVACY_POLICY_VERSION`
- `PRIVACY_DISABLE_OPTIONAL_TRACKING`
- `PRIVACY_REGION_FORCE_MODE`
- `PRIVACY_CONSENT_RETENTION_DAYS`
- `PRIVACY_EVENT_RETENTION_DAYS`
- `PRIVACY_REQUEST_RETENTION_DAYS`

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

To apply the privacy controls migration independently:

```bash
npm run db:migrate:privacy:local
```

### Run the app

```bash
npm run dev
```

This is the Worker-backed local development flow. It starts:

- Vite on `http://localhost:8080`
- Wrangler local dev for `/api/*` on port `8787` by default

The dev launcher auto-selects another API port if `8787` is already in use and updates the Vite proxy automatically.

If you only want one side of the stack:

```bash
npm run dev:vite
npm run dev:api
```

If you want the local API path that is closest to the default Bluehost production runtime, run the frontend and PHP API helper separately:

```bash
npm run dev:vite
npm run dev:api:php
```

This requires `php` to be installed locally.

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
| `npm run dev:api:php` | Run the local PHP API helper for Bluehost parity |
| `npm run build` | Create the production build in `dist/` |
| `npm run preview` | Preview the Vite build locally |
| `npm run lint` | Run ESLint |
| `npm run test` | Run the privacy/UI test suite with Vitest |
| `npm run db:init:local` | Initialize the local D1 database from `scripts/init-db.sql` |
| `npm run db:migrate:local` | Apply `server/schema.sql` to the local D1 database |
| `npm run db:migrate:privacy:local` | Apply only the privacy migration to local D1 |
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
├── functions/api/privacy/   Privacy consent, event, and rights-request API routes
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

This section applies to the alternate Cloudflare runtime that remains in the repo for local Worker-based development, migration work, and optional Cloudflare deployments.

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
- `functions/api/privacy/*` for consent logging, event logging, rights requests, exports, deletions, and sale/sharing opt-out
- `functions/api/rss/*`, `functions/api/spotify/*`, and `functions/api/ai/*` for integrations

## Deployment

### Bluehost / cPanel

This is the current default production deployment path. `npm run deploy` maps to the Bluehost deploy flow.

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
BLUEHOST_FTP_HOST=...
BLUEHOST_FTP_USER=...
BLUEHOST_FTP_PASSWORD=...
npm run deploy
```

The deploy script reads FTP credentials from environment files such as `.env.local` or from your shell environment. It no longer falls back to editor-local credential storage.

Do not overwrite these runtime directories on the server during later deploys:

- `public_html/_cms_data/runtime`
- `public_html/uploads`

### Cloudflare

The Cloudflare runtime is still available for local development, migration work, and alternate deployments. It is not the default production path for this repo. Configuration for that path lives in `wrangler.toml`.

```bash
npm run deploy:cloudflare
```

This:

1. builds the frontend into `dist/`
2. deploys the Worker
3. binds static assets, D1, and R2 through Wrangler

Before deploying that path, make sure production secrets are configured with `wrangler secret put`.

## Privacy controls

This repo now includes a privacy-first consent management implementation for:

- Cookie/storage consent
- Granular optional tracking consent
- California sale/sharing opt-out handling
- D1-backed consent and privacy request logging
- First-party event tracking that is gated before optional categories are allowed

Important: this is a technical implementation scaffold, not a legal sign-off. Review by counsel is required before production use.

### Privacy setup

1. Copy `.env.example` to `.env.local` and fill in the privacy/legal placeholders.
2. Copy `.dev.vars.example` to `.dev.vars` and set runtime privacy secrets.
3. Run `npm run db:migrate:privacy:local` or `npm run db:init:local`.
4. Start the app with `npm run dev`.

### Region logic

- `opt_in` mode is used for EU/EEA/UK country codes detected from Cloudflare request metadata.
- `california` mode is used when Cloudflare request metadata reports `US-CA`.
- `conservative` mode is the fallback when the region cannot be determined.
- `PRIVACY_REGION_FORCE_MODE` can override detection for testing or controlled deployments.
- Browser Global Privacy Control signals are honored for sale/sharing-related uses where feasible.

### How consent gating works

- Strictly necessary storage is separate from optional tracking storage.
- The consent record is stored in first-party local storage and mirrored to the D1 `privacy_consent_log` table.
- Optional categories remain off until the user chooses otherwise.
- The tracking wrapper in `src/lib/privacy/tracking.ts` refuses to send optional events when valid consent is missing, withdrawn, stale, or globally disabled.
- The backend `/api/privacy/events` endpoint performs a second consent check against the latest D1 consent log before storing an optional event.

### How to add a new tracker

1. Add the placeholder config to `src/config/privacy-integrations.ts`.
2. Keep the integration disabled by default.
3. Gate all initialization behind `hasConsentFor(category)` or `trackEvent(..., category)`.
4. Do not load third-party scripts until counsel approves the disclosure text and the corresponding category behavior.
5. Update the legal template placeholders for `{{TRACKING_TOOLS}}` and `{{THIRD_PARTIES}}`.

### How to disable all optional tracking

- Set `VITE_PRIVACY_DISABLE_OPTIONAL_TRACKING=true` for the frontend.
- Set `PRIVACY_DISABLE_OPTIONAL_TRACKING=true` for the Worker/runtime.
- With both flags enabled, analytics, personalization, and advertising / sale-sharing stay off even if the UI is present.

### Legal review checklist

- Replace all template placeholders such as `{{COMPANY_NAME}}`, `{{LEGAL_ENTITY}}`, `{{CONTACT_EMAIL}}`, and `{{LAST_UPDATED}}`.
- Confirm whether any enabled analytics or ad-tech amounts to selling or sharing under California law.
- Confirm the lawful bases, retention schedule, and third-party disclosures for each region.
- Review the Global Privacy Control behavior and the Do Not Sell or Share workflow.
- Review the Data Request page, identity verification process, and export/delete operational handling.
- Approve the final wording on the Privacy Policy, Cookie Policy, California notice, Contact Privacy page, and footer links.

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
=======

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

>>>>>>> 4f5bd55dd8b20b5f7e604887f3cad6e4c2ee4718
