# Beloveful Bluehost Migration

This document is the canonical guide for the current default production deployment path: the Bluehost/cPanel package with a PHP API overlay.

## What changed

- Cloudflare Worker, D1, and R2 are not required for the Bluehost deployment path.
- The app now has a Bluehost-compatible PHP API at `bluehost/public_html/api/index.php`.
- Admin-managed data lives under `public_html/_cms_data/runtime`.
- Admin-uploaded images live under `public_html/uploads`.
- The packaged Bluehost artifact is built into `build/bluehost/public_html`.
- The Cloudflare runtime and `wrangler.toml` remain in the repo for alternate deployments, migration support, local Worker development, and DNS/account operations.

## Build and deploy

Build the Bluehost package:

```bash
npm run build:bluehost
```

Deploy with the included FTP script:

```bash
BLUEHOST_FTP_HOST=...
BLUEHOST_FTP_USER=...
BLUEHOST_FTP_PASSWORD=...
npm run deploy
```

Or upload `build/bluehost/public_html/*` manually to Bluehost `public_html`.

Do not delete these on future deploys:

- `public_html/_cms_data/runtime`
- `public_html/uploads`

## Admin access

- URL: `/admin`
- Default username: `admin`
- Default password: `admin123`

Change the password immediately after first login.

## First-run behavior

On the first live request, the PHP runtime bootstraps its data store from:

- `public_html/_cms_data/bootstrap/default-data.json`

That seed currently includes:

- 28 albums
- 1168 images
- 10 slideshow images
- site settings pointing to `tony@beloveful.com`

## Cloudflare account move

This section is operationally separate from the default Bluehost production deploy. Keep it only for DNS/account management or if you intentionally continue to use the alternate Cloudflare runtime.

Cloudflare’s current documented path for moving a zone between accounts is:

1. Log in to the destination Cloudflare account for `devries.cameron20@gmail.com`.
2. Add `beloveful.com` to that account as a new site.
3. Export DNS from the old account first, then import/recreate the records in the new account.
4. Disable DNSSEC and remove old zone-specific add-ons before the move.
5. Update the registrar nameservers to the new Cloudflare nameservers.
6. Wait for the new zone to become `Active`.
7. Recreate any SSL/TLS settings or certificates that were only present in the old zone.

Official references:

- Zone move: `https://developers.cloudflare.com/fundamentals/setup/manage-domains/move-domain/`
- Zone/account overview: `https://developers.cloudflare.com/fundamentals/setup/accounts-and-zones/`
- Zone/account IDs: `https://developers.cloudflare.com/fundamentals/setup/find-account-and-zone-ids/`
- Zone status behavior: `https://developers.cloudflare.com/dns/zone-setups/reference/domain-status/`

If the domain registration itself is also at Cloudflare Registrar, use the registrar inter-account move flow in addition to the zone move:

- `https://developers.cloudflare.com/registrar/account-options/inter-account-transfer/`

## Bluehost file access

Bluehost’s current FTP help pages:

- FTP account details / FTP management: `https://www.bluehost.com/help/article/ftp-uploading-the-website`
- Secure FTP (SFTP) overview: `https://www.bluehost.com/help/article/sftp`

The included deploy script uses FTP/FTPS credentials because that matches the existing cPanel workflow.

## Local development

The new PHP API dev helper is available at:

```bash
npm run dev:api:php
```

This requires `php` to be installed locally. If PHP is not available, the legacy Cloudflare dev path still exists:

```bash
npm run dev:api:cloudflare
```
