<?php
declare(strict_types=1);

const BELOVEFUL_DEFAULT_ALBUMS = [
    ['region' => 'Africa', 'country' => 'Egypt', 'slug' => 'egypt'],
    ['region' => 'Africa', 'country' => 'Ethiopia', 'slug' => 'ethiopia'],
    ['region' => 'Africa', 'country' => 'Morocco', 'slug' => 'morocco'],
    ['region' => 'Africa', 'country' => 'Namibia', 'slug' => 'namibia'],
    ['region' => 'Africa', 'country' => 'South Africa', 'slug' => 'south-africa'],
    ['region' => 'Asia', 'country' => 'Hong Kong', 'slug' => 'hong-kong'],
    ['region' => 'Asia', 'country' => 'India', 'slug' => 'india'],
    ['region' => 'Asia', 'country' => 'Japan', 'slug' => 'japan'],
    ['region' => 'Asia', 'country' => 'Myanmar', 'slug' => 'myanmar'],
    ['region' => 'Asia', 'country' => 'Nepal', 'slug' => 'nepal'],
    ['region' => 'Asia', 'country' => 'Philippines', 'slug' => 'phillipines'],
    ['region' => 'Asia', 'country' => 'Thailand', 'slug' => 'thailand'],
    ['region' => 'Asia', 'country' => 'Vietnam', 'slug' => 'vietnam'],
    ['region' => 'Central America & Caribbean', 'country' => 'Caribbean', 'slug' => 'caribbean'],
    ['region' => 'Central America & Caribbean', 'country' => 'Cuba', 'slug' => 'cuba'],
    ['region' => 'Central America & Caribbean', 'country' => 'Mexico', 'slug' => 'mexico'],
    ['region' => 'Central America & Caribbean', 'country' => 'Puerto Rico', 'slug' => 'puerto-rico'],
    ['region' => 'Europe & Scandinavia', 'country' => 'France', 'slug' => 'france'],
    ['region' => 'Europe & Scandinavia', 'country' => 'Greece', 'slug' => 'greece'],
    ['region' => 'Europe & Scandinavia', 'country' => 'Italy', 'slug' => 'italy'],
    ['region' => 'Europe & Scandinavia', 'country' => 'Portugal', 'slug' => 'portugal'],
    ['region' => 'Europe & Scandinavia', 'country' => 'Spain', 'slug' => 'spain'],
    ['region' => 'Europe & Scandinavia', 'country' => 'UK & Ireland', 'slug' => 'uk-ireland'],
    ['region' => 'Middle East', 'country' => 'Jordan', 'slug' => 'jordan'],
    ['region' => 'Middle East', 'country' => 'Israel / Palestine', 'slug' => 'israel-palestine'],
    ['region' => 'North America', 'country' => 'Chicago', 'slug' => 'chicago'],
    ['region' => 'North America', 'country' => 'New York', 'slug' => 'new-york'],
    ['region' => 'South America', 'country' => 'Argentina', 'slug' => 'argentina'],
];

const BELOVEFUL_TRAVEL_REGIONS = [
    'Africa',
    'Asia',
    'Central America & Caribbean',
    'Europe & Scandinavia',
    'Middle East',
    'North America',
    'South America',
    'Oceania',
];

main();

function main(): void
{
    $method = strtoupper($_SERVER['REQUEST_METHOD'] ?? 'GET');
    if ($method === 'OPTIONS') {
        respond_json(['success' => true], 200);
    }

    $path = api_path();
    if ($path === '/health') {
        respond_json([
            'status' => 'ok',
            'runtime' => 'bluehost-php',
            'timestamp' => gmdate(DATE_ATOM),
        ]);
    }

    $state = load_state();
    route_request($method, $path, $state);
}

function route_request(string $method, string $path, array $state): void
{
    $segments = array_values(array_filter(explode('/', trim($path, '/')), 'strlen'));

    if ($segments === ['auth', 'login'] && $method === 'POST') {
        handle_auth_login($state);
    }
    if ($segments === ['auth', 'verify'] && $method === 'POST') {
        handle_auth_verify($state);
    }
    if ($segments === ['auth', 'change-password'] && $method === 'POST') {
        handle_auth_change_password($state);
    }

    if ($segments === ['settings', 'public'] && $method === 'GET') {
        handle_settings_public($state);
    }
    if ($segments === ['settings', 'admin'] && $method === 'GET') {
        handle_settings_admin_get($state);
    }
    if ($segments === ['settings', 'admin'] && $method === 'POST') {
        handle_settings_admin_post($state);
    }

    if ($segments === ['albums'] && $method === 'GET') {
        handle_public_albums($state);
    }
    if (count($segments) === 2 && $segments[0] === 'albums' && $method === 'GET') {
        handle_public_album_detail($state, $segments[1]);
    }
    if ($segments === ['public', 'albums'] && $method === 'GET') {
        handle_public_albums($state);
    }
    if (count($segments) === 3 && $segments[0] === 'public' && $segments[1] === 'albums' && $method === 'GET') {
        handle_public_album_detail($state, $segments[2]);
    }
    if ($segments === ['public', 'slideshow'] && $method === 'GET') {
        handle_public_slideshow($state);
    }
    if ($segments === ['content', 'public'] && $method === 'GET') {
        handle_public_content($state);
    }

    if ($segments === ['albums', 'admin', 'all'] && $method === 'GET') {
        handle_admin_albums_get($state);
    }
    if ($segments === ['albums', 'admin', 'all'] && $method === 'POST') {
        handle_admin_albums_post($state);
    }
    if ($segments === ['albums', 'admin', 'seed'] && $method === 'POST') {
        handle_admin_albums_seed($state);
    }
    if (count($segments) === 3 && $segments[0] === 'albums' && $segments[1] === 'admin' && $method === 'PUT') {
        handle_admin_album_update($state, (int) $segments[2]);
    }
    if (count($segments) === 3 && $segments[0] === 'albums' && $segments[1] === 'admin' && $method === 'DELETE') {
        handle_admin_album_delete($state, (int) $segments[2]);
    }

    if ($segments === ['images', 'admin', 'all'] && $method === 'GET') {
        handle_admin_images_get($state);
    }
    if ($segments === ['images', 'admin', 'all'] && $method === 'POST') {
        handle_admin_images_post($state);
    }
    if ($segments === ['images', 'upload'] && $method === 'POST') {
        handle_admin_image_upload($state);
    }
    if ($segments === ['images', 'upload-cpanel'] && $method === 'POST') {
        handle_admin_image_upload_cpanel($state);
    }
    if ($segments === ['images', 'admin', 'slideshow', 'all'] && $method === 'GET') {
        handle_admin_slideshow_get($state);
    }
    if ($segments === ['images', 'admin', 'slideshow', 'all'] && $method === 'POST') {
        handle_admin_slideshow_post($state);
    }
    if (count($segments) === 3 && $segments[0] === 'images' && $segments[1] === 'admin' && $segments[2] !== 'slideshow' && $method === 'PUT') {
        handle_admin_image_update($state, (int) $segments[2]);
    }
    if (count($segments) === 3 && $segments[0] === 'images' && $segments[1] === 'admin' && $segments[2] !== 'slideshow' && $method === 'DELETE') {
        handle_admin_image_delete($state, (int) $segments[2]);
    }
    if (count($segments) === 4 && $segments[0] === 'images' && $segments[1] === 'admin' && $segments[2] === 'slideshow' && $method === 'PUT') {
        handle_admin_slideshow_update($state, (int) $segments[3]);
    }
    if (count($segments) === 4 && $segments[0] === 'images' && $segments[1] === 'admin' && $segments[2] === 'slideshow' && $method === 'DELETE') {
        handle_admin_slideshow_delete($state, (int) $segments[3]);
    }

    if ($segments === ['content', 'admin', 'all'] && $method === 'GET') {
        handle_admin_content_get($state);
    }
    if ($segments === ['content', 'admin', 'all'] && $method === 'POST') {
        handle_admin_content_post($state);
    }
    if (count($segments) === 3 && $segments[0] === 'content' && $segments[1] === 'admin' && $method === 'PUT') {
        handle_admin_content_update($state, (int) $segments[2]);
    }
    if (count($segments) === 3 && $segments[0] === 'content' && $segments[1] === 'admin' && $method === 'DELETE') {
        handle_admin_content_delete($state, (int) $segments[2]);
    }

    if ($segments === ['create-checkout-session'] && $method === 'POST') {
        handle_checkout_session();
    }

    respond_json(['success' => false, 'error' => 'Not found'], 404);
}

function api_path(): string
{
    $uri = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?: '/';
    $path = preg_replace('#^/api#', '', $uri, 1);
    return $path === '' ? '/' : $path;
}

function storage_root(): string
{
    return dirname(__DIR__) . DIRECTORY_SEPARATOR . '_cms_data';
}

function runtime_state_file(): string
{
    return storage_root() . DIRECTORY_SEPARATOR . 'runtime' . DIRECTORY_SEPARATOR . 'cms.json';
}

function bootstrap_seed_file(): string
{
    return storage_root() . DIRECTORY_SEPARATOR . 'bootstrap' . DIRECTORY_SEPARATOR . 'default-data.json';
}

function public_root(): string
{
    return dirname(__DIR__);
}

function uploads_root(): string
{
    return public_root() . DIRECTORY_SEPARATOR . 'uploads';
}

function ensure_storage_layout(): void
{
    $paths = [
        storage_root(),
        storage_root() . DIRECTORY_SEPARATOR . 'runtime',
        storage_root() . DIRECTORY_SEPARATOR . 'bootstrap',
        uploads_root(),
        uploads_root() . DIRECTORY_SEPARATOR . 'gallery',
    ];

    foreach ($paths as $path) {
        if (!is_dir($path) && !mkdir($path, 0775, true) && !is_dir($path)) {
            respond_json(['success' => false, 'error' => 'Unable to create CMS storage'], 500);
        }
    }
}

function load_state(): array
{
    ensure_storage_layout();
    $file = runtime_state_file();
    if (!is_file($file)) {
        $state = build_initial_state();
        save_state($state);
        return $state;
    }

    $raw = @file_get_contents($file);
    if ($raw === false) {
        respond_json(['success' => false, 'error' => 'Unable to read CMS state'], 500);
    }

    $decoded = json_decode($raw, true);
    if (!is_array($decoded)) {
        $decoded = build_initial_state();
        save_state($decoded);
        return $decoded;
    }

    return normalize_state($decoded);
}

function save_state(array $state): void
{
    ensure_storage_layout();
    $file = runtime_state_file();
    $normalized = normalize_state($state);
    $encoded = json_encode($normalized, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
    if ($encoded === false) {
        respond_json(['success' => false, 'error' => 'Unable to encode CMS state'], 500);
    }

    $handle = @fopen($file, 'c+');
    if (!$handle) {
        respond_json(['success' => false, 'error' => 'Unable to open CMS state file'], 500);
    }

    if (!flock($handle, LOCK_EX)) {
        fclose($handle);
        respond_json(['success' => false, 'error' => 'Unable to lock CMS state file'], 500);
    }

    ftruncate($handle, 0);
    rewind($handle);
    fwrite($handle, $encoded);
    fflush($handle);
    flock($handle, LOCK_UN);
    fclose($handle);
}

function build_initial_state(): array
{
    $now = now_iso();
    $seed = load_bootstrap_seed();
    $authSecret = env_string('CMS_AUTH_SECRET') ?? env_string('JWT_SECRET') ?? bin2hex(random_bytes(32));
    $adminPassword = env_string('CMS_ADMIN_PASSWORD') ?? 'admin123';
    $adminEmail = env_string('CMS_ADMIN_EMAIL') ?? ($seed['settings']['contact_email'] ?? 'tony@beloveful.com');
    $adminUsername = env_string('CMS_ADMIN_USERNAME') ?? 'admin';

    $state = [
        'users' => [[
            'id' => 1,
            'username' => $adminUsername,
            'email' => $adminEmail,
            'role' => 'admin',
            'password_hash' => password_hash($adminPassword, PASSWORD_DEFAULT),
            'created_at' => $now,
            'updated_at' => $now,
        ]],
        'albums' => array_values($seed['albums'] ?? []),
        'images' => array_values($seed['images'] ?? []),
        'slideshow_images' => array_values($seed['slideshow_images'] ?? []),
        'content_blocks' => array_values($seed['content_blocks'] ?? []),
        'settings' => array_merge([
            'contact_email' => 'tony@beloveful.com',
            'print_email' => 'tony@beloveful.com',
            'calendly_url' => '',
            'updated_at' => $now,
        ], $seed['settings'] ?? []),
        'meta' => [
            'auth_secret' => $authSecret,
            'next_ids' => [
                'users' => 2,
                'albums' => next_id_for($seed['albums'] ?? []),
                'images' => next_id_for($seed['images'] ?? []),
                'slideshow_images' => next_id_for($seed['slideshow_images'] ?? []),
                'content_blocks' => next_id_for($seed['content_blocks'] ?? []),
            ],
        ],
    ];

    return normalize_state($state);
}

function load_bootstrap_seed(): array
{
    $file = bootstrap_seed_file();
    if (!is_file($file)) {
        return [
            'albums' => [],
            'images' => [],
            'slideshow_images' => [],
            'content_blocks' => [],
            'settings' => [],
        ];
    }

    $raw = @file_get_contents($file);
    if ($raw === false) {
        return [];
    }

    $decoded = json_decode($raw, true);
    return is_array($decoded) ? $decoded : [];
}

function normalize_state(array $state): array
{
    $state['users'] = array_values($state['users'] ?? []);
    $state['albums'] = array_values($state['albums'] ?? []);
    $state['images'] = array_values($state['images'] ?? []);
    $state['slideshow_images'] = array_values($state['slideshow_images'] ?? []);
    $state['content_blocks'] = array_values($state['content_blocks'] ?? []);
    $state['settings'] = is_array($state['settings'] ?? null) ? $state['settings'] : [];
    $state['meta'] = is_array($state['meta'] ?? null) ? $state['meta'] : [];
    $state['meta']['auth_secret'] = (string) ($state['meta']['auth_secret'] ?? bin2hex(random_bytes(32)));
    $state['meta']['next_ids'] = is_array($state['meta']['next_ids'] ?? null) ? $state['meta']['next_ids'] : [];
    $state['meta']['next_ids']['users'] = max(2, (int) ($state['meta']['next_ids']['users'] ?? next_id_for($state['users'])));
    $state['meta']['next_ids']['albums'] = max(1, (int) ($state['meta']['next_ids']['albums'] ?? next_id_for($state['albums'])));
    $state['meta']['next_ids']['images'] = max(1, (int) ($state['meta']['next_ids']['images'] ?? next_id_for($state['images'])));
    $state['meta']['next_ids']['slideshow_images'] = max(1, (int) ($state['meta']['next_ids']['slideshow_images'] ?? next_id_for($state['slideshow_images'])));
    $state['meta']['next_ids']['content_blocks'] = max(1, (int) ($state['meta']['next_ids']['content_blocks'] ?? next_id_for($state['content_blocks'])));
    $state['settings']['contact_email'] = (string) ($state['settings']['contact_email'] ?? 'tony@beloveful.com');
    $state['settings']['print_email'] = (string) ($state['settings']['print_email'] ?? $state['settings']['contact_email']);
    $state['settings']['calendly_url'] = (string) ($state['settings']['calendly_url'] ?? '');
    $state['settings']['updated_at'] = (string) ($state['settings']['updated_at'] ?? now_iso());
    return $state;
}

function next_id_for(array $items): int
{
    $max = 0;
    foreach ($items as $item) {
        $max = max($max, (int) ($item['id'] ?? 0));
    }
    return $max + 1;
}

function now_iso(): string
{
    return gmdate(DATE_ATOM);
}

function env_string(string $key): ?string
{
    $value = getenv($key);
    if ($value !== false && $value !== '') {
        return (string) $value;
    }
    $serverValue = $_SERVER[$key] ?? null;
    if (is_string($serverValue) && $serverValue !== '') {
        return $serverValue;
    }
    return null;
}

function request_json(): array
{
    $raw = file_get_contents('php://input');
    if ($raw === false || trim($raw) === '') {
        return [];
    }
    $decoded = json_decode($raw, true);
    if (!is_array($decoded)) {
        respond_json(['success' => false, 'error' => 'Invalid JSON body'], 400);
    }
    return $decoded;
}

function authorization_header(): string
{
    if (!empty($_SERVER['HTTP_AUTHORIZATION'])) {
        return (string) $_SERVER['HTTP_AUTHORIZATION'];
    }
    if (function_exists('getallheaders')) {
        $headers = getallheaders();
        foreach ($headers as $key => $value) {
            if (strtolower((string) $key) === 'authorization') {
                return (string) $value;
            }
        }
    }
    return '';
}

function require_auth(array $state): array
{
    $header = authorization_header();
    if (!preg_match('/^Bearer\s+(.+)$/i', $header, $matches)) {
        respond_json(['success' => false, 'error' => 'Authorization token required'], 401);
    }

    $payload = verify_token(trim($matches[1]), (string) $state['meta']['auth_secret']);
    $user = find_by_id($state['users'], (int) ($payload['userId'] ?? 0));
    if (!$user) {
        respond_json(['success' => false, 'error' => 'User not found'], 401);
    }
    return $user;
}

function create_token(array $payload, string $secret): string
{
    $header = base64url_encode(json_encode(['alg' => 'HS256', 'typ' => 'JWT']));
    $body = base64url_encode(json_encode(array_merge($payload, [
        'exp' => time() + 86400,
        'iat' => time(),
    ])));
    $signature = hash_hmac('sha256', $header . '.' . $body, $secret, true);
    return $header . '.' . $body . '.' . base64url_encode($signature);
}

function verify_token(string $token, string $secret): array
{
    $parts = explode('.', $token);
    if (count($parts) !== 3) {
        respond_json(['success' => false, 'error' => 'Invalid or expired token'], 401);
    }

    [$header, $body, $signature] = $parts;
    $expected = base64url_encode(hash_hmac('sha256', $header . '.' . $body, $secret, true));
    if (!hash_equals($expected, $signature)) {
        respond_json(['success' => false, 'error' => 'Invalid or expired token'], 401);
    }

    $payload = json_decode(base64url_decode($body), true);
    if (!is_array($payload) || (int) ($payload['exp'] ?? 0) < time()) {
        respond_json(['success' => false, 'error' => 'Invalid or expired token'], 401);
    }
    return $payload;
}

function base64url_encode(string $value): string
{
    return rtrim(strtr(base64_encode($value), '+/', '-_'), '=');
}

function base64url_decode(string $value): string
{
    $padding = strlen($value) % 4;
    if ($padding > 0) {
        $value .= str_repeat('=', 4 - $padding);
    }
    return (string) base64_decode(strtr($value, '-_', '+/'));
}

function public_user(array $user): array
{
    $copy = $user;
    unset($copy['password_hash']);
    return $copy;
}

function handle_auth_login(array $state): void
{
    $body = request_json();
    $username = trim((string) ($body['username'] ?? ''));
    $password = (string) ($body['password'] ?? '');

    if ($username === '' || $password === '') {
        respond_json(['success' => false, 'error' => 'Username and password are required'], 400);
    }

    $user = null;
    foreach ($state['users'] as $candidate) {
        if (($candidate['username'] ?? '') === $username || ($candidate['email'] ?? '') === $username) {
            $user = $candidate;
            break;
        }
    }

    if (!$user || !password_verify($password, (string) ($user['password_hash'] ?? ''))) {
        respond_json(['success' => false, 'error' => 'Invalid credentials'], 401);
    }

    $token = create_token([
        'userId' => (int) $user['id'],
        'username' => $user['username'],
        'role' => $user['role'],
    ], (string) $state['meta']['auth_secret']);

    respond_json([
        'success' => true,
        'token' => $token,
        'user' => public_user($user),
    ]);
}

function handle_auth_verify(array $state): void
{
    $user = require_auth($state);
    respond_json([
        'success' => true,
        'user' => public_user($user),
    ]);
}

function handle_auth_change_password(array $state): void
{
    $user = require_auth($state);
    $body = request_json();
    $currentPassword = (string) ($body['currentPassword'] ?? '');
    $newPassword = (string) ($body['newPassword'] ?? '');

    if ($currentPassword === '' || $newPassword === '') {
        respond_json(['success' => false, 'error' => 'Current password and new password are required'], 400);
    }
    if (strlen($newPassword) < 8) {
        respond_json(['success' => false, 'error' => 'New password must be at least 8 characters long'], 400);
    }

    if (!password_verify($currentPassword, (string) $user['password_hash'])) {
        respond_json(['success' => false, 'error' => 'Current password is incorrect'], 400);
    }

    foreach ($state['users'] as &$candidate) {
        if ((int) $candidate['id'] === (int) $user['id']) {
            $candidate['password_hash'] = password_hash($newPassword, PASSWORD_DEFAULT);
            $candidate['updated_at'] = now_iso();
            break;
        }
    }
    unset($candidate);

    save_state($state);
    respond_json(['success' => true, 'message' => 'Password changed successfully']);
}

function handle_settings_public(array $state): void
{
    respond_json([
        'success' => true,
        'settings' => [
            'contact_email' => $state['settings']['contact_email'],
            'print_email' => $state['settings']['print_email'],
            'calendly_url' => $state['settings']['calendly_url'],
        ],
    ]);
}

function handle_settings_admin_get(array $state): void
{
    require_auth($state);
    respond_json([
        'success' => true,
        'settings' => [
            'contact_email' => $state['settings']['contact_email'],
            'print_email' => $state['settings']['print_email'],
            'calendly_url' => $state['settings']['calendly_url'],
            'updated_at' => $state['settings']['updated_at'],
        ],
    ]);
}

function handle_settings_admin_post(array $state): void
{
    require_auth($state);
    $body = request_json();

    $state['settings']['contact_email'] = trim((string) ($body['contact_email'] ?? $state['settings']['contact_email']));
    $state['settings']['print_email'] = trim((string) ($body['print_email'] ?? $state['settings']['print_email']));
    $state['settings']['calendly_url'] = trim((string) ($body['calendly_url'] ?? $state['settings']['calendly_url']));
    $state['settings']['updated_at'] = now_iso();

    save_state($state);

    respond_json([
        'success' => true,
        'settings' => [
            'contact_email' => $state['settings']['contact_email'],
            'print_email' => $state['settings']['print_email'],
            'calendly_url' => $state['settings']['calendly_url'],
            'updated_at' => $state['settings']['updated_at'],
        ],
    ]);
}

function handle_public_albums(array $state): void
{
    $albums = public_album_summaries($state);
    respond_json(['success' => true, 'albums' => $albums]);
}

function handle_public_album_detail(array $state, string $slug): void
{
    $album = find_album_by_slug($state['albums'], $slug);
    if (!$album || !truthy($album['is_published'] ?? true)) {
        respond_json(['success' => false, 'error' => 'Album not found'], 404);
    }

    $images = public_images_for_album($state['images'], (int) $album['id']);
    respond_json([
        'success' => true,
        'album' => array_merge($album, [
            'image_count' => count($images),
            'images' => $images,
        ]),
    ]);
}

function handle_public_slideshow(array $state): void
{
    $images = array_values(array_filter($state['slideshow_images'], static function (array $image): bool {
        return truthy($image['is_active'] ?? true);
    }));

    usort($images, static function (array $a, array $b): int {
        return compare_by_sort_then_time($a, $b);
    });

    $images = array_map(static function (array $image): array {
        return [
            'id' => (int) $image['id'],
            'title' => $image['title'] ?? null,
            'desktop_url' => $image['desktop_url'],
            'mobile_url' => $image['mobile_url'],
            'sort_order' => (int) ($image['sort_order'] ?? 0),
        ];
    }, $images);

    respond_json(['success' => true, 'images' => $images]);
}

function handle_public_content(array $state): void
{
    $pageKey = trim((string) ($_GET['page_key'] ?? ''));
    $blocks = array_values(array_filter($state['content_blocks'], static function (array $block) use ($pageKey): bool {
        return $pageKey === '' || ($block['page_key'] ?? '') === $pageKey;
    }));

    usort($blocks, static function (array $a, array $b): int {
        return strcmp(($a['page_key'] ?? '') . '|' . ($a['content_key'] ?? ''), ($b['page_key'] ?? '') . '|' . ($b['content_key'] ?? ''));
    });

    $content = [];
    foreach ($blocks as $block) {
        $content[$block['content_key']] = $block['content_value'];
    }

    respond_json([
        'success' => true,
        'blocks' => $blocks,
        'content' => $content,
    ]);
}

function handle_admin_albums_get(array $state): void
{
    require_auth($state);
    $albums = admin_albums_with_counts($state);
    respond_json(['success' => true, 'albums' => $albums]);
}

function handle_admin_albums_post(array $state): void
{
    require_auth($state);
    $body = request_json();

    $region = trim((string) ($body['region'] ?? ''));
    $country = trim((string) ($body['country'] ?? ''));
    $slug = sanitize_slug((string) ($body['slug'] ?? ''));
    if ($region === '' || $country === '' || $slug === '') {
        respond_json(['success' => false, 'error' => 'Region, country, and slug are required'], 400);
    }
    if (find_album_by_slug($state['albums'], $slug)) {
        respond_json(['success' => false, 'error' => 'An album with that slug already exists'], 409);
    }

    $album = [
        'id' => consume_next_id($state, 'albums'),
        'region' => $region,
        'country' => $country,
        'slug' => $slug,
        'description' => trim((string) ($body['description'] ?? '')),
        'is_published' => truthy($body['is_published'] ?? true),
        'sort_order' => normalize_int($body['sort_order'] ?? 0),
        'created_at' => now_iso(),
        'updated_at' => now_iso(),
    ];

    $state['albums'][] = $album;
    save_state($state);
    respond_json(['success' => true, 'album' => $album], 201);
}

function handle_admin_albums_seed(array $state): void
{
    require_auth($state);
    $inserted = 0;

    foreach (BELOVEFUL_DEFAULT_ALBUMS as $index => $seedAlbum) {
        $exists = false;
        foreach ($state['albums'] as $album) {
            if (($album['slug'] ?? '') === $seedAlbum['slug']) {
                $exists = true;
                break;
            }
        }
        if ($exists) {
            continue;
        }

        $state['albums'][] = [
            'id' => consume_next_id($state, 'albums'),
            'region' => $seedAlbum['region'],
            'country' => $seedAlbum['country'],
            'slug' => $seedAlbum['slug'],
            'description' => '',
            'is_published' => true,
            'sort_order' => $index,
            'created_at' => now_iso(),
            'updated_at' => now_iso(),
        ];
        $inserted++;
    }

    save_state($state);
    respond_json([
        'success' => true,
        'inserted' => $inserted,
        'total' => count(BELOVEFUL_DEFAULT_ALBUMS),
    ]);
}

function handle_admin_album_update(array $state, int $albumId): void
{
    require_auth($state);
    $albumIndex = find_index_by_id($state['albums'], $albumId);
    if ($albumIndex < 0) {
        respond_json(['success' => false, 'error' => 'Album not found'], 404);
    }

    $body = request_json();
    $album = $state['albums'][$albumIndex];

    foreach (['region', 'country', 'description'] as $field) {
        if (array_key_exists($field, $body)) {
            $album[$field] = trim((string) $body[$field]);
        }
    }
    if (array_key_exists('slug', $body)) {
        $newSlug = sanitize_slug((string) $body['slug']);
        if ($newSlug === '') {
            respond_json(['success' => false, 'error' => 'Slug is required'], 400);
        }
        foreach ($state['albums'] as $candidate) {
            if ((int) $candidate['id'] !== $albumId && ($candidate['slug'] ?? '') === $newSlug) {
                respond_json(['success' => false, 'error' => 'An album with that slug already exists'], 409);
            }
        }
        $album['slug'] = $newSlug;
    }
    if (array_key_exists('is_published', $body)) {
        $album['is_published'] = truthy($body['is_published']);
    }
    if (array_key_exists('sort_order', $body)) {
        $album['sort_order'] = normalize_int($body['sort_order']);
    }
    $album['updated_at'] = now_iso();

    $state['albums'][$albumIndex] = $album;
    save_state($state);
    respond_json(['success' => true, 'album' => $album]);
}

function handle_admin_album_delete(array $state, int $albumId): void
{
    require_auth($state);
    $albumIndex = find_index_by_id($state['albums'], $albumId);
    if ($albumIndex < 0) {
        respond_json(['success' => false, 'error' => 'Album not found'], 404);
    }

    $imagesToDelete = array_values(array_filter($state['images'], static function (array $image) use ($albumId): bool {
        return (int) ($image['album_id'] ?? 0) === $albumId;
    }));
    foreach ($imagesToDelete as $image) {
        delete_local_file_from_record($image);
    }

    $state['images'] = array_values(array_filter($state['images'], static function (array $image) use ($albumId): bool {
        return (int) ($image['album_id'] ?? 0) !== $albumId;
    }));
    $state['albums'] = array_values(array_filter($state['albums'], static function (array $album) use ($albumId): bool {
        return (int) ($album['id'] ?? 0) !== $albumId;
    }));

    save_state($state);
    respond_json(['success' => true, 'message' => 'Album deleted successfully']);
}

function handle_admin_images_get(array $state): void
{
    require_auth($state);
    $albumId = isset($_GET['album_id']) ? (int) $_GET['album_id'] : null;
    $albumsById = index_by_id($state['albums']);
    $images = $state['images'];

    if ($albumId) {
        $images = array_values(array_filter($images, static function (array $image) use ($albumId): bool {
            return (int) ($image['album_id'] ?? 0) === $albumId;
        }));
    }

    usort($images, static function (array $a, array $b): int {
        return compare_by_sort_then_time($a, $b, true);
    });

    $images = array_map(static function (array $image) use ($albumsById): array {
        $album = $albumsById[(int) ($image['album_id'] ?? 0)] ?? null;
        return array_merge($image, [
            'country' => $album['country'] ?? null,
            'region' => $album['region'] ?? null,
        ]);
    }, $images);

    respond_json(['success' => true, 'images' => $images]);
}

function handle_admin_images_post(array $state): void
{
    require_auth($state);
    $body = request_json();
    $desktopUrl = trim((string) ($body['desktop_url'] ?? ''));
    $mobileUrl = trim((string) ($body['mobile_url'] ?? ''));
    if ($desktopUrl === '' || $mobileUrl === '') {
        respond_json(['success' => false, 'error' => 'Desktop and mobile URLs are required'], 400);
    }

    $image = [
        'id' => consume_next_id($state, 'images'),
        'album_id' => isset($body['album_id']) && $body['album_id'] !== '' ? (int) $body['album_id'] : null,
        'title' => trim((string) ($body['title'] ?? '')),
        'description' => trim((string) ($body['description'] ?? '')),
        'desktop_url' => $desktopUrl,
        'mobile_url' => $mobileUrl,
        'cloudinary_public_id' => trim((string) ($body['cloudinary_public_id'] ?? '')),
        'is_published' => truthy($body['is_published'] ?? true),
        'sort_order' => normalize_int($body['sort_order'] ?? 0),
        'created_at' => now_iso(),
        'updated_at' => now_iso(),
    ];

    $state['images'][] = $image;
    save_state($state);
    respond_json(['success' => true, 'image' => $image], 201);
}

function handle_admin_image_upload(array $state): void
{
    require_auth($state);

    if (!isset($_FILES['file'])) {
        respond_json(['success' => false, 'error' => 'No file provided'], 400);
    }

    $albumId = isset($_POST['album_id']) && $_POST['album_id'] !== '' ? (int) $_POST['album_id'] : null;
    if (!$albumId) {
        respond_json(['success' => false, 'error' => 'Album is required'], 400);
    }

    $album = find_by_id($state['albums'], $albumId);
    if (!$album) {
        respond_json(['success' => false, 'error' => 'Album not found'], 404);
    }

    $stored = store_uploaded_image($_FILES['file'], (string) ($album['slug'] ?? 'uploads'));
    $title = trim((string) ($_POST['title'] ?? pathinfo((string) $stored['filename'], PATHINFO_FILENAME)));
    $description = trim((string) ($_POST['description'] ?? ''));

    $image = [
        'id' => consume_next_id($state, 'images'),
        'album_id' => $albumId,
        'title' => $title,
        'description' => $description,
        'desktop_url' => $stored['public_url'],
        'mobile_url' => $stored['public_url'],
        'cloudinary_public_id' => 'local:' . $stored['relative_path'],
        'storage_path' => $stored['relative_path'],
        'is_published' => true,
        'sort_order' => 0,
        'created_at' => now_iso(),
        'updated_at' => now_iso(),
    ];

    $state['images'][] = $image;
    save_state($state);

    respond_json([
        'success' => true,
        'image' => $image,
    ], 201);
}

function handle_admin_image_upload_cpanel(array $state): void
{
    require_auth($state);
    $body = request_json();

    $paths = $body['paths'] ?? $body['cpanel_paths'] ?? [];
    if (!is_array($paths) || count($paths) === 0) {
        respond_json(['success' => false, 'error' => 'Provide at least one cPanel image path in `paths`'], 400);
    }

    $baseUrl = trim((string) ($body['base_url'] ?? '/Website%20beloveful.com'));
    if ($baseUrl === '') {
        $baseUrl = '/Website%20beloveful.com';
    }
    $createMissingAlbums = !array_key_exists('create_missing_albums', $body) || truthy($body['create_missing_albums']);

    $results = [];
    $imported = 0;
    $skipped = 0;
    $failed = 0;

    foreach ($paths as $rawPath) {
        try {
            $parsed = parse_cpanel_path((string) $rawPath, $baseUrl);
            $album = find_album_by_region_country($state['albums'], $parsed['region'], $parsed['country']);
            if (!$album && !$createMissingAlbums) {
                $results[] = ['status' => 'skipped', 'input' => $rawPath, 'reason' => 'Album does not exist'];
                $skipped++;
                continue;
            }

            if (!$album) {
                $album = [
                    'id' => consume_next_id($state, 'albums'),
                    'region' => $parsed['region'],
                    'country' => $parsed['country'],
                    'slug' => unique_album_slug($state['albums'], sanitize_slug($parsed['country'])),
                    'description' => '',
                    'is_published' => true,
                    'sort_order' => count($state['albums']),
                    'created_at' => now_iso(),
                    'updated_at' => now_iso(),
                ];
                $state['albums'][] = $album;
            }

            $duplicate = find_image_by_url($state['images'], $parsed['public_url']);
            if ($duplicate) {
                $results[] = [
                    'status' => 'skipped',
                    'input' => $rawPath,
                    'album_id' => $album['id'],
                    'album_region' => $album['region'],
                    'album_country' => $album['country'],
                    'image_id' => $duplicate['id'],
                    'public_url' => $duplicate['desktop_url'],
                    'reason' => 'Image already imported',
                ];
                $skipped++;
                continue;
            }

            $image = [
                'id' => consume_next_id($state, 'images'),
                'album_id' => $album['id'],
                'title' => title_from_filename($parsed['file_name']),
                'description' => '',
                'desktop_url' => $parsed['public_url'],
                'mobile_url' => $parsed['public_url'],
                'cloudinary_public_id' => 'cpanel:' . $parsed['source_path'],
                'source_path' => $parsed['source_path'],
                'is_published' => true,
                'sort_order' => 0,
                'created_at' => now_iso(),
                'updated_at' => now_iso(),
            ];
            $state['images'][] = $image;
            $results[] = [
                'status' => 'imported',
                'input' => $rawPath,
                'album_id' => $album['id'],
                'album_region' => $album['region'],
                'album_country' => $album['country'],
                'image_id' => $image['id'],
                'public_url' => $image['desktop_url'],
            ];
            $imported++;
        } catch (Throwable $error) {
            $results[] = ['status' => 'error', 'input' => $rawPath, 'reason' => $error->getMessage()];
            $failed++;
        }
    }

    save_state($state);

    respond_json([
        'success' => true,
        'summary' => [
            'total' => count($paths),
            'imported' => $imported,
            'skipped' => $skipped,
            'failed' => $failed,
            'set_pin_thumbnail' => truthy($body['set_pin_thumbnail'] ?? true),
            'create_missing_albums' => $createMissingAlbums,
            'base_url' => $baseUrl,
        ],
        'results' => $results,
    ]);
}

function handle_admin_image_update(array $state, int $imageId): void
{
    require_auth($state);
    $index = find_index_by_id($state['images'], $imageId);
    if ($index < 0) {
        respond_json(['success' => false, 'error' => 'Image not found'], 404);
    }

    $body = request_json();
    $image = $state['images'][$index];
    foreach (['title', 'description', 'desktop_url', 'mobile_url', 'cloudinary_public_id'] as $field) {
        if (array_key_exists($field, $body)) {
            $image[$field] = trim((string) $body[$field]);
        }
    }
    if (array_key_exists('album_id', $body)) {
        $image['album_id'] = $body['album_id'] === '' || $body['album_id'] === null ? null : (int) $body['album_id'];
    }
    if (array_key_exists('is_published', $body)) {
        $image['is_published'] = truthy($body['is_published']);
    }
    if (array_key_exists('sort_order', $body)) {
        $image['sort_order'] = normalize_int($body['sort_order']);
    }
    $image['updated_at'] = now_iso();

    $state['images'][$index] = $image;
    save_state($state);
    respond_json(['success' => true, 'image' => $image]);
}

function handle_admin_image_delete(array $state, int $imageId): void
{
    require_auth($state);
    $image = find_by_id($state['images'], $imageId);
    if (!$image) {
        respond_json(['success' => false, 'error' => 'Image not found'], 404);
    }

    delete_local_file_from_record($image);

    $state['images'] = array_values(array_filter($state['images'], static function (array $candidate) use ($imageId): bool {
        return (int) ($candidate['id'] ?? 0) !== $imageId;
    }));
    save_state($state);
    respond_json(['success' => true, 'message' => 'Image deleted successfully']);
}

function handle_admin_slideshow_get(array $state): void
{
    require_auth($state);
    $images = $state['slideshow_images'];
    usort($images, static function (array $a, array $b): int {
        return compare_by_sort_then_time($a, $b);
    });
    respond_json(['success' => true, 'images' => $images]);
}

function handle_admin_slideshow_post(array $state): void
{
    require_auth($state);
    $body = request_json();
    $desktopUrl = trim((string) ($body['desktop_url'] ?? ''));
    $mobileUrl = trim((string) ($body['mobile_url'] ?? ''));
    if ($desktopUrl === '' || $mobileUrl === '') {
        respond_json(['success' => false, 'error' => 'Desktop and mobile URLs are required'], 400);
    }

    $image = [
        'id' => consume_next_id($state, 'slideshow_images'),
        'title' => trim((string) ($body['title'] ?? '')),
        'desktop_url' => $desktopUrl,
        'mobile_url' => $mobileUrl,
        'sort_order' => normalize_int($body['sort_order'] ?? 0),
        'is_active' => truthy($body['is_active'] ?? true),
        'created_at' => now_iso(),
        'updated_at' => now_iso(),
    ];
    $state['slideshow_images'][] = $image;
    save_state($state);
    respond_json(['success' => true, 'image' => $image], 201);
}

function handle_admin_slideshow_update(array $state, int $imageId): void
{
    require_auth($state);
    $index = find_index_by_id($state['slideshow_images'], $imageId);
    if ($index < 0) {
        respond_json(['success' => false, 'error' => 'Slideshow image not found'], 404);
    }

    $body = request_json();
    $image = $state['slideshow_images'][$index];
    foreach (['title', 'desktop_url', 'mobile_url'] as $field) {
        if (array_key_exists($field, $body)) {
            $image[$field] = trim((string) $body[$field]);
        }
    }
    if (array_key_exists('sort_order', $body)) {
        $image['sort_order'] = normalize_int($body['sort_order']);
    }
    if (array_key_exists('is_active', $body)) {
        $image['is_active'] = truthy($body['is_active']);
    }
    $image['updated_at'] = now_iso();

    $state['slideshow_images'][$index] = $image;
    save_state($state);
    respond_json(['success' => true, 'image' => $image]);
}

function handle_admin_slideshow_delete(array $state, int $imageId): void
{
    require_auth($state);
    $state['slideshow_images'] = array_values(array_filter($state['slideshow_images'], static function (array $image) use ($imageId): bool {
        return (int) ($image['id'] ?? 0) !== $imageId;
    }));
    save_state($state);
    respond_json(['success' => true, 'message' => 'Slideshow image deleted successfully']);
}

function handle_admin_content_get(array $state): void
{
    require_auth($state);
    $pageKey = trim((string) ($_GET['page_key'] ?? ''));
    $blocks = array_values(array_filter($state['content_blocks'], static function (array $block) use ($pageKey): bool {
        return $pageKey === '' || ($block['page_key'] ?? '') === $pageKey;
    }));
    usort($blocks, static function (array $a, array $b): int {
        return strcmp(($a['page_key'] ?? '') . '|' . ($a['content_key'] ?? ''), ($b['page_key'] ?? '') . '|' . ($b['content_key'] ?? ''));
    });
    respond_json(['success' => true, 'blocks' => $blocks]);
}

function handle_admin_content_post(array $state): void
{
    require_auth($state);
    $body = request_json();
    $pageKey = trim((string) ($body['page_key'] ?? ''));
    $contentKey = trim((string) ($body['content_key'] ?? ''));
    $contentType = strtolower(trim((string) ($body['content_type'] ?? 'text')));
    if ($pageKey === '' || $contentKey === '') {
        respond_json(['success' => false, 'error' => 'Page and block key are required'], 400);
    }
    if (!in_array($contentType, ['text', 'html', 'markdown'], true)) {
        respond_json(['success' => false, 'error' => 'Invalid content type'], 400);
    }
    foreach ($state['content_blocks'] as $block) {
        if (($block['page_key'] ?? '') === $pageKey && ($block['content_key'] ?? '') === $contentKey) {
            respond_json(['success' => false, 'error' => 'A block with that page and key already exists'], 409);
        }
    }

    $block = [
        'id' => consume_next_id($state, 'content_blocks'),
        'page_key' => $pageKey,
        'content_key' => $contentKey,
        'content_value' => (string) ($body['content_value'] ?? ''),
        'content_type' => $contentType,
        'created_at' => now_iso(),
        'updated_at' => now_iso(),
    ];

    $state['content_blocks'][] = $block;
    save_state($state);
    respond_json(['success' => true, 'block' => $block], 201);
}

function handle_admin_content_update(array $state, int $blockId): void
{
    require_auth($state);
    $index = find_index_by_id($state['content_blocks'], $blockId);
    if ($index < 0) {
        respond_json(['success' => false, 'error' => 'Content block not found'], 404);
    }

    $body = request_json();
    $block = $state['content_blocks'][$index];

    foreach (['page_key', 'content_key'] as $field) {
        if (array_key_exists($field, $body)) {
            $block[$field] = trim((string) $body[$field]);
        }
    }
    if (array_key_exists('content_value', $body)) {
        $block['content_value'] = (string) $body['content_value'];
    }
    if (array_key_exists('content_type', $body)) {
        $type = strtolower(trim((string) $body['content_type']));
        if (!in_array($type, ['text', 'html', 'markdown'], true)) {
            respond_json(['success' => false, 'error' => 'Invalid content type'], 400);
        }
        $block['content_type'] = $type;
    }

    foreach ($state['content_blocks'] as $candidate) {
        if ((int) ($candidate['id'] ?? 0) !== $blockId
            && ($candidate['page_key'] ?? '') === ($block['page_key'] ?? '')
            && ($candidate['content_key'] ?? '') === ($block['content_key'] ?? '')) {
            respond_json(['success' => false, 'error' => 'A block with that page and key already exists'], 409);
        }
    }

    $block['updated_at'] = now_iso();
    $state['content_blocks'][$index] = $block;
    save_state($state);
    respond_json(['success' => true, 'block' => $block]);
}

function handle_admin_content_delete(array $state, int $blockId): void
{
    require_auth($state);
    $state['content_blocks'] = array_values(array_filter($state['content_blocks'], static function (array $block) use ($blockId): bool {
        return (int) ($block['id'] ?? 0) !== $blockId;
    }));
    save_state($state);
    respond_json(['success' => true, 'message' => 'Content block deleted successfully']);
}

function handle_checkout_session(): void
{
    $secret = env_string('STRIPE_SECRET_KEY') ?? env_string('CMS_STRIPE_SECRET_KEY');
    if (!$secret) {
        respond_json(['error' => 'Stripe is not configured'], 500);
    }

    $body = request_json();
    $priceId = trim((string) ($body['priceId'] ?? ''));
    $quantity = normalize_int($body['quantity'] ?? 0);
    if ($priceId === '' || $quantity < 1) {
        respond_json(['error' => 'Invalid price or quantity'], 400);
    }

    $origin = request_origin();
    $payload = http_build_query([
        'mode' => 'payment',
        'success_url' => $origin . '/print-shop?success=true',
        'cancel_url' => $origin . '/print-shop?canceled=true',
        'line_items[0][price]' => $priceId,
        'line_items[0][quantity]' => (string) $quantity,
    ]);

    $ch = curl_init('https://api.stripe.com/v1/checkout/sessions');
    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER => [
            'Authorization: Bearer ' . $secret,
            'Content-Type: application/x-www-form-urlencoded',
        ],
        CURLOPT_POSTFIELDS => $payload,
    ]);
    $response = curl_exec($ch);
    $status = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error = curl_error($ch);
    curl_close($ch);

    if ($response === false || $error !== '') {
        respond_json(['error' => 'Stripe request failed'], 502);
    }

    $decoded = json_decode((string) $response, true);
    if ($status >= 400 || !is_array($decoded) || empty($decoded['url'])) {
        respond_json(['error' => $decoded['error']['message'] ?? 'Unable to create checkout session'], 502);
    }

    respond_json(['url' => $decoded['url']]);
}

function request_origin(): string
{
    $scheme = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
    $host = $_SERVER['HTTP_HOST'] ?? 'localhost';
    return $scheme . '://' . $host;
}

function public_album_summaries(array $state): array
{
    $albums = array_values(array_filter($state['albums'], static function (array $album): bool {
        return truthy($album['is_published'] ?? true);
    }));

    usort($albums, static function (array $a, array $b): int {
        return strcmp(($a['region'] ?? '') . '|' . sprintf('%08d', normalize_int($a['sort_order'] ?? 0)) . '|' . ($a['country'] ?? ''), ($b['region'] ?? '') . '|' . sprintf('%08d', normalize_int($b['sort_order'] ?? 0)) . '|' . ($b['country'] ?? ''));
    });

    $summaries = [];
    foreach ($albums as $album) {
        $images = public_images_for_album($state['images'], (int) $album['id']);
        $cover = $images[0] ?? null;
        $summaries[] = [
            'id' => (int) $album['id'],
            'region' => $album['region'],
            'country' => $album['country'],
            'slug' => $album['slug'],
            'description' => $album['description'] !== '' ? $album['description'] : null,
            'image_count' => count($images),
            'cover_desktop_url' => $cover['desktop_url'] ?? null,
            'cover_mobile_url' => $cover['mobile_url'] ?? null,
        ];
    }
    return $summaries;
}

function public_images_for_album(array $images, int $albumId): array
{
    $images = array_values(array_filter($images, static function (array $image) use ($albumId): bool {
        return (int) ($image['album_id'] ?? 0) === $albumId && truthy($image['is_published'] ?? true);
    }));

    usort($images, static function (array $a, array $b): int {
        return compare_by_sort_then_time($a, $b);
    });

    return array_map(static function (array $image): array {
        return [
            'id' => (int) $image['id'],
            'title' => $image['title'] !== '' ? $image['title'] : null,
            'description' => $image['description'] !== '' ? $image['description'] : null,
            'desktop_url' => $image['desktop_url'],
            'mobile_url' => $image['mobile_url'],
            'sort_order' => (int) ($image['sort_order'] ?? 0),
        ];
    }, $images);
}

function admin_albums_with_counts(array $state): array
{
    $albums = $state['albums'];
    usort($albums, static function (array $a, array $b): int {
        return strcmp(($a['region'] ?? '') . '|' . sprintf('%08d', normalize_int($a['sort_order'] ?? 0)) . '|' . ($a['country'] ?? ''), ($b['region'] ?? '') . '|' . sprintf('%08d', normalize_int($b['sort_order'] ?? 0)) . '|' . ($b['country'] ?? ''));
    });

    return array_map(static function (array $album) use ($state): array {
        $count = 0;
        foreach ($state['images'] as $image) {
            if ((int) ($image['album_id'] ?? 0) === (int) $album['id']) {
                $count++;
            }
        }
        return array_merge($album, ['image_count' => $count]);
    }, $albums);
}

function consume_next_id(array &$state, string $collection): int
{
    $current = (int) ($state['meta']['next_ids'][$collection] ?? 1);
    $state['meta']['next_ids'][$collection] = $current + 1;
    return $current;
}

function find_by_id(array $items, int $id): ?array
{
    foreach ($items as $item) {
        if ((int) ($item['id'] ?? 0) === $id) {
            return $item;
        }
    }
    return null;
}

function find_index_by_id(array $items, int $id): int
{
    foreach ($items as $index => $item) {
        if ((int) ($item['id'] ?? 0) === $id) {
            return $index;
        }
    }
    return -1;
}

function index_by_id(array $items): array
{
    $index = [];
    foreach ($items as $item) {
        $index[(int) ($item['id'] ?? 0)] = $item;
    }
    return $index;
}

function find_album_by_slug(array $albums, string $slug): ?array
{
    foreach ($albums as $album) {
        if (($album['slug'] ?? '') === $slug) {
            return $album;
        }
    }
    return null;
}

function find_album_by_region_country(array $albums, string $region, string $country): ?array
{
    foreach ($albums as $album) {
        if (normalize_label((string) ($album['region'] ?? '')) === normalize_label($region)
            && normalize_label((string) ($album['country'] ?? '')) === normalize_label($country)) {
            return $album;
        }
    }
    return null;
}

function unique_album_slug(array $albums, string $preferred): string
{
    $slug = $preferred !== '' ? $preferred : 'album';
    $candidate = $slug;
    $counter = 2;
    while (find_album_by_slug($albums, $candidate)) {
        $candidate = $slug . '-' . $counter;
        $counter++;
    }
    return $candidate;
}

function find_image_by_url(array $images, string $url): ?array
{
    foreach ($images as $image) {
        if (($image['desktop_url'] ?? '') === $url || ($image['mobile_url'] ?? '') === $url) {
            return $image;
        }
    }
    return null;
}

function normalize_int($value): int
{
    return is_numeric($value) ? (int) $value : 0;
}

function truthy($value): bool
{
    if (is_bool($value)) {
        return $value;
    }
    if (is_int($value)) {
        return $value === 1;
    }
    $normalized = strtolower(trim((string) $value));
    return in_array($normalized, ['1', 'true', 'yes', 'on', 'published', 'active'], true);
}

function sanitize_slug(string $value): string
{
    $value = strtolower(trim($value));
    $value = preg_replace('/[^a-z0-9]+/', '-', $value);
    $value = trim((string) $value, '-');
    return $value;
}

function normalize_label(string $value): string
{
    $value = strtolower(trim($value));
    $value = str_replace('&', ' and ', $value);
    return (string) preg_replace('/[^a-z0-9]+/', '', $value);
}

function compare_by_sort_then_time(array $a, array $b, bool $descCreated = false): int
{
    $sortCompare = normalize_int($a['sort_order'] ?? 0) <=> normalize_int($b['sort_order'] ?? 0);
    if ($sortCompare !== 0) {
        return $sortCompare;
    }

    $left = strtotime((string) ($a['created_at'] ?? '')) ?: 0;
    $right = strtotime((string) ($b['created_at'] ?? '')) ?: 0;
    return $descCreated ? ($right <=> $left) : ($left <=> $right);
}

function store_uploaded_image(array $file, string $albumSlug): array
{
    if (($file['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_OK) {
        respond_json(['success' => false, 'error' => 'Upload failed'], 400);
    }

    $tmpName = (string) ($file['tmp_name'] ?? '');
    if ($tmpName === '' || !is_uploaded_file($tmpName)) {
        respond_json(['success' => false, 'error' => 'Invalid uploaded file'], 400);
    }

    $originalName = (string) ($file['name'] ?? 'upload');
    $extension = strtolower((string) pathinfo($originalName, PATHINFO_EXTENSION));
    if (!in_array($extension, ['jpg', 'jpeg', 'png', 'gif', 'webp', 'avif'], true)) {
        respond_json(['success' => false, 'error' => 'Unsupported file type'], 400);
    }

    $targetDir = uploads_root() . DIRECTORY_SEPARATOR . 'gallery' . DIRECTORY_SEPARATOR . sanitize_slug($albumSlug ?: 'gallery');
    if (!is_dir($targetDir) && !mkdir($targetDir, 0775, true) && !is_dir($targetDir)) {
        respond_json(['success' => false, 'error' => 'Unable to prepare upload directory'], 500);
    }

    $baseName = sanitize_slug((string) pathinfo($originalName, PATHINFO_FILENAME));
    if ($baseName === '') {
        $baseName = 'image';
    }

    $fileName = $baseName . '-' . gmdate('Ymd-His') . '-' . bin2hex(random_bytes(4)) . '.' . $extension;
    $absolutePath = $targetDir . DIRECTORY_SEPARATOR . $fileName;
    if (!move_uploaded_file($tmpName, $absolutePath)) {
        respond_json(['success' => false, 'error' => 'Unable to save uploaded image'], 500);
    }

    $relativePath = 'uploads/gallery/' . sanitize_slug($albumSlug ?: 'gallery') . '/' . $fileName;
    return [
        'filename' => $fileName,
        'relative_path' => $relativePath,
        'public_url' => '/' . str_replace(DIRECTORY_SEPARATOR, '/', $relativePath),
    ];
}

function delete_local_file_from_record(array $record): void
{
    $relativePath = (string) ($record['storage_path'] ?? '');
    if ($relativePath === '' && str_starts_with((string) ($record['cloudinary_public_id'] ?? ''), 'local:')) {
        $relativePath = substr((string) $record['cloudinary_public_id'], strlen('local:'));
    }
    $relativePath = ltrim(str_replace('\\', '/', $relativePath), '/');
    if ($relativePath === '') {
        return;
    }

    $absolute = public_root() . DIRECTORY_SEPARATOR . str_replace('/', DIRECTORY_SEPARATOR, $relativePath);
    if (is_file($absolute)) {
        @unlink($absolute);
    }
}

function parse_cpanel_path(string $rawInput, string $baseUrl): array
{
    $input = trim(trim($rawInput), "\"'");
    if ($input === '') {
        throw new RuntimeException('Path is empty');
    }

    $sourcePath = $input;
    $url = null;
    if (preg_match('#^https?://#i', $input)) {
        $url = parse_url($input);
        $sourcePath = $url['path'] ?? $input;
    }

    $segments = array_values(array_filter(array_map(static function (string $segment): string {
        $decoded = rawurldecode(trim($segment));
        return $decoded;
    }, preg_split('#[\\\\/]#', $sourcePath) ?: []), 'strlen'));

    $websiteIndex = array_search('Website beloveful.com', $segments, true);
    if ($websiteIndex === false || count($segments) < $websiteIndex + 4) {
        throw new RuntimeException('Could not parse region, country, and filename from path');
    }

    $region = $segments[$websiteIndex + 1];
    $country = $segments[$websiteIndex + 2];
    $fileSegments = array_slice($segments, $websiteIndex + 3);
    $fileName = end($fileSegments) ?: '';

    if ($fileName === '' || !preg_match('/\.(avif|bmp|gif|heic|jpeg|jpg|png|svg|tif|tiff|webp)$/i', $fileName)) {
        throw new RuntimeException('Path does not appear to reference an image file');
    }

    $canonicalRegion = null;
    foreach (BELOVEFUL_TRAVEL_REGIONS as $candidate) {
        if (normalize_label($candidate) === normalize_label($region)) {
            $canonicalRegion = $candidate;
            break;
        }
    }
    if ($canonicalRegion === null) {
        throw new RuntimeException('Region "' . $region . '" is not a recognized travel region');
    }

    $relativeSegments = array_merge([$canonicalRegion, $country], $fileSegments);
    $encodedPath = implode('/', array_map('rawurlencode', $relativeSegments));
    $base = rtrim($baseUrl, '/');
    if (!preg_match('#^https?://#i', $base)) {
        $base = '/' . ltrim($base, '/');
    }

    return [
        'source_path' => $sourcePath,
        'region' => $canonicalRegion,
        'country' => $country,
        'file_name' => $fileName,
        'public_url' => $base . '/' . $encodedPath,
    ];
}

function title_from_filename(string $fileName): string
{
    $base = pathinfo($fileName, PATHINFO_FILENAME);
    $base = preg_replace('/[_-]+/', ' ', $base);
    $base = preg_replace('/\s+/', ' ', (string) $base);
    return trim((string) $base);
}

function respond_json(array $payload, int $status = 200): void
{
    http_response_code($status);
    header('Content-Type: application/json');
    header('Cache-Control: no-store');
    echo json_encode($payload, JSON_UNESCAPED_SLASHES);
    exit;
}
