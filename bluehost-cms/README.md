# Beloveful Bluehost CMS

This directory contains the Bluehost-native CMS backend that matches the MySQL + PHP 8 + Node-RED plan.

## Deploy Shape

- `public/index.php`: front controller for all `/api/...` routes
- `public/.htaccess`: rewrites non-file requests to the front controller
- `database/schema.mysql.sql`: canonical MySQL schema
- `database/seed.mysql.sql`: starter admin user and baseline settings
- `config/app.example.php`: example runtime config for Bluehost paths, MySQL, and Node-RED
- `nodered/flows.example.json`: starter flow tabs for media import and suggestion jobs

## Bluehost Setup

1. Copy this directory to your Bluehost account, for example:
   - `/public_html/beloveful.com/cms`
2. Copy `config/app.example.php` to `config/app.php` and fill in the MySQL credentials.
3. Import `database/schema.mysql.sql` into MySQL, then import `database/seed.mysql.sql`.
4. Point your Bluehost web server or subdirectory routing so requests for `/api/...` hit `public/index.php`.
5. Configure Node-RED to call the internal routes with the shared secret if you want async processing.

## Runtime Roots

- `SITE_ROOT=/public_html/beloveful.com/public_html`
- `MEDIA_ROOT=/public_html/beloveful.com/public_html/images`
- `SITE_ASSET_ROOT=/public_html/beloveful.com/public_html/site-assets`

## Auth

The backend uses opaque bearer tokens stored in `admin_sessions`, not JWTs.

The seed file creates:

- email: `admin@beloveful.com`
- name/login: `admin`
- password hash for a starter password you should replace immediately after first login

## React Admin

The React admin shell in `src/` now points at the new `/api/admin/...` route family and includes pages for:

- Dashboard
- Media
- Pages
- Galleries
- Assignments
- Publish Queue
- Activity
- Settings
