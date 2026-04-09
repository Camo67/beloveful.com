<?php
declare(strict_types=1);

return [
    'app' => [
        'name' => 'Beloveful Bluehost CMS',
        'env' => getenv('CMS_APP_ENV') ?: 'production',
        'debug' => filter_var(getenv('CMS_APP_DEBUG') ?: 'false', FILTER_VALIDATE_BOOL),
        'site_root' => getenv('SITE_ROOT') ?: '/public_html/beloveful.com/public_html',
        'media_root' => getenv('MEDIA_ROOT') ?: '/public_html/beloveful.com/public_html/images',
        'site_asset_root' => getenv('SITE_ASSET_ROOT') ?: '/public_html/beloveful.com/public_html/site-assets',
        'public_media_base_url' => getenv('PUBLIC_MEDIA_BASE_URL') ?: '/images',
    ],
    'db' => [
        'host' => getenv('CMS_DB_HOST') ?: '127.0.0.1',
        'port' => (int) (getenv('CMS_DB_PORT') ?: '3306'),
        'database' => getenv('CMS_DB_NAME') ?: 'beloveful_cms',
        'username' => getenv('CMS_DB_USER') ?: 'beloveful_cms',
        'password' => getenv('CMS_DB_PASSWORD') ?: '',
        'charset' => getenv('CMS_DB_CHARSET') ?: 'utf8mb4',
    ],
    'auth' => [
        'session_hours' => (int) (getenv('CMS_SESSION_HOURS') ?: '24'),
    ],
    'cors' => [
        'allow_origin' => getenv('CMS_CORS_ALLOW_ORIGIN') ?: '*',
    ],
    'node_red' => [
        'base_url' => getenv('NODE_RED_BASE_URL') ?: '',
        'shared_secret' => getenv('NODE_RED_SHARED_SECRET') ?: '',
        'connect_timeout_ms' => (int) (getenv('NODE_RED_CONNECT_TIMEOUT_MS') ?: '1500'),
        'request_timeout_ms' => (int) (getenv('NODE_RED_REQUEST_TIMEOUT_MS') ?: '3000'),
    ],
];
