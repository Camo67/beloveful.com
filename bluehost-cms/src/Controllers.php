<?php
declare(strict_types=1);

final class BaseController
{
    public function __construct(
        protected readonly Database $database,
        protected readonly Config $config,
        protected readonly TokenAuth $auth,
        protected readonly NodeRedService $nodeRed,
    ) {
    }

    protected function requireUser(HttpRequest $request): array
    {
        $user = $this->auth->resolveUser($request);
        if (!$user) {
            throw new HttpError(401, 'Authentication required.');
        }
        return $user;
    }

    protected function requireAdmin(HttpRequest $request): array
    {
        $user = $this->requireUser($request);
        if (($user['role'] ?? '') !== 'admin') {
            throw new HttpError(403, 'Admin access required.');
        }
        return $user;
    }

    protected function body(HttpRequest $request): array
    {
        return $request->json();
    }

    protected function ok(array $payload, int $status = 200): array
    {
        return [$status, ['success' => true] + $payload];
    }

    protected function snapshot(string $table, int $id): ?array
    {
        return $this->database->one("SELECT * FROM {$table} WHERE id = :id LIMIT 1", [':id' => $id]);
    }

    protected function audit(?array $actor, string $action, string $entityType, ?int $entityId, array $metadata = []): void
    {
        $this->database->insert(
            'INSERT INTO audit_log (actor_user_id, action, entity_type, entity_id, metadata_json)
             VALUES (:actor_user_id, :action, :entity_type, :entity_id, :metadata_json)',
            [
                ':actor_user_id' => $actor['id'] ?? null,
                ':action' => $action,
                ':entity_type' => $entityType,
                ':entity_id' => $entityId,
                ':metadata_json' => json_encode($metadata, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE),
            ]
        );
    }

    protected function revision(?array $actor, string $entityType, int $entityId, mixed $before, mixed $after, string $summary): void
    {
        $this->database->insert(
            'INSERT INTO revisions (entity_type, entity_id, before_json, after_json, summary, changed_by)
             VALUES (:entity_type, :entity_id, :before_json, :after_json, :summary, :changed_by)',
            [
                ':entity_type' => $entityType,
                ':entity_id' => $entityId,
                ':before_json' => json_encode($before, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE),
                ':after_json' => json_encode($after, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE),
                ':summary' => $summary,
                ':changed_by' => $actor['id'] ?? null,
            ]
        );
    }

    protected function pageSnapshot(int $pageId): array
    {
        $page = $this->database->one('SELECT * FROM pages WHERE id = :id', [':id' => $pageId]) ?? [];
        $sections = $this->database->all(
            'SELECT * FROM page_sections WHERE page_id = :page_id ORDER BY sort_order ASC, id ASC',
            [':page_id' => $pageId]
        );
        foreach ($sections as &$section) {
            $section['settings_json'] = json_decode_array($section['settings_json'] ?? null);
            $section['fields'] = $this->database->all(
                'SELECT * FROM content_fields WHERE page_section_id = :section_id ORDER BY id ASC',
                [':section_id' => $section['id']]
            );
        }
        unset($section);

        return [
            'page' => $page,
            'sections' => $sections,
        ];
    }

    protected function gallerySnapshot(int $galleryId): array
    {
        $gallery = $this->database->one('SELECT * FROM galleries WHERE id = :id', [':id' => $galleryId]) ?? [];
        $items = $this->database->all(
            'SELECT gi.*, ma.filename, ma.public_url, ma.status AS media_status
             FROM gallery_items gi
             INNER JOIN media_assets ma ON ma.id = gi.media_asset_id
             WHERE gi.gallery_id = :gallery_id
             ORDER BY gi.sort_order ASC, gi.id ASC',
            [':gallery_id' => $galleryId]
        );

        return [
            'gallery' => $gallery,
            'items' => $items,
        ];
    }

    protected function mediaDependencies(int $mediaAssetId): array
    {
        $slotAssignments = $this->database->all(
            'SELECT sa.id, sa.status, sd.slot_key, sd.label
             FROM slot_assignments sa
             INNER JOIN slot_definitions sd ON sd.id = sa.slot_definition_id
             WHERE sa.media_asset_id = :media_asset_id
             ORDER BY sa.updated_at DESC',
            [':media_asset_id' => $mediaAssetId]
        );

        $galleryItems = $this->database->all(
            'SELECT gi.id, gi.status, g.slug AS gallery_slug, g.title AS gallery_title
             FROM gallery_items gi
             INNER JOIN galleries g ON g.id = gi.gallery_id
             WHERE gi.media_asset_id = :media_asset_id
             ORDER BY gi.id DESC',
            [':media_asset_id' => $mediaAssetId]
        );

        return [
            'slot_assignments' => $slotAssignments,
            'gallery_items' => $galleryItems,
        ];
    }

    protected function findSlotByKey(string $slotKey): ?array
    {
        $slot = $this->database->one('SELECT * FROM slot_definitions WHERE slot_key = :slot_key LIMIT 1', [
            ':slot_key' => $slotKey,
        ]);
        if ($slot) {
            $slot['settings_json'] = json_decode_array($slot['settings_json'] ?? null);
        }
        return $slot;
    }

    protected function ensureSlotDefinition(string $slotKey, array $payload): array
    {
        $slot = $this->findSlotByKey($slotKey);
        if ($slot) {
            return $slot;
        }

        $entityType = (string) ($payload['entity_type'] ?? '');
        $entityRef = (string) ($payload['entity_ref'] ?? '');
        $label = (string) ($payload['label'] ?? $slotKey);
        $allowedCount = max(1, (int) ($payload['allowed_count'] ?? 1));
        $settings = $payload['settings_json'] ?? [];

        if (!in_array($entityType, ['page', 'section', 'gallery', 'global'], true) || $entityRef === '') {
            throw new HttpError(422, 'Unknown slot. Provide entity_type and entity_ref to create it.');
        }

        $slotId = $this->database->insert(
            'INSERT INTO slot_definitions (slot_key, entity_type, entity_ref, label, allowed_count, settings_json, is_required)
             VALUES (:slot_key, :entity_type, :entity_ref, :label, :allowed_count, :settings_json, :is_required)',
            [
                ':slot_key' => $slotKey,
                ':entity_type' => $entityType,
                ':entity_ref' => $entityRef,
                ':label' => $label,
                ':allowed_count' => $allowedCount,
                ':settings_json' => json_encode($settings, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE),
                ':is_required' => !empty($payload['is_required']) ? 1 : 0,
            ]
        );

        return $this->findSlotByKey($slotKey) ?? ['id' => $slotId, 'slot_key' => $slotKey];
    }
}

final class AuthController extends BaseController
{
    public function login(HttpRequest $request, array $params = []): array
    {
        $payload = $this->body($request);
        $identifier = trim((string) ($payload['identifier'] ?? $payload['email'] ?? $payload['username'] ?? ''));
        $password = (string) ($payload['password'] ?? '');

        if ($identifier === '' || $password === '') {
            throw new HttpError(422, 'Email/username and password are required.');
        }

        $user = $this->database->one(
            'SELECT * FROM users WHERE (email = :identifier OR name = :identifier) LIMIT 1',
            [':identifier' => $identifier]
        );

        if (!$user || !$this->auth->verifyPassword($password, (string) $user['password_hash'])) {
            throw new HttpError(401, 'Invalid credentials.');
        }

        if (($user['status'] ?? '') !== 'active') {
            throw new HttpError(403, 'This user is disabled.');
        }

        $token = $this->auth->createSession((int) $user['id']);
        $this->database->execute('UPDATE users SET last_login_at = NOW() WHERE id = :id', [':id' => $user['id']]);
        unset($user['password_hash']);

        $this->audit($user, 'auth.login', 'user', (int) $user['id']);

        return $this->ok([
            'token' => $token,
            'user' => $user,
        ]);
    }

    public function logout(HttpRequest $request, array $params = []): array
    {
        $user = $this->requireUser($request);
        $this->auth->revokeToken($request->bearerToken());
        $this->audit($user, 'auth.logout', 'user', (int) $user['id']);
        return $this->ok(['message' => 'Signed out.']);
    }

    public function me(HttpRequest $request, array $params = []): array
    {
        $user = $this->requireUser($request);
        return $this->ok(['user' => $user]);
    }

    public function changePassword(HttpRequest $request, array $params = []): array
    {
        $user = $this->requireUser($request);
        $payload = $this->body($request);
        $currentPassword = (string) ($payload['current_password'] ?? '');
        $newPassword = (string) ($payload['new_password'] ?? '');

        if (strlen($newPassword) < 8) {
            throw new HttpError(422, 'New password must be at least 8 characters.');
        }

        $current = $this->database->one('SELECT password_hash FROM users WHERE id = :id', [':id' => $user['id']]);
        if (!$current || !$this->auth->verifyPassword($currentPassword, (string) $current['password_hash'])) {
            throw new HttpError(422, 'Current password is incorrect.');
        }

        $this->database->execute(
            'UPDATE users SET password_hash = :password_hash WHERE id = :id',
            [
                ':password_hash' => $this->auth->passwordHash($newPassword),
                ':id' => $user['id'],
            ]
        );

        $this->audit($user, 'auth.change-password', 'user', (int) $user['id']);
        return $this->ok(['message' => 'Password updated.']);
    }
}

final class MediaController extends BaseController
{
    public function list(HttpRequest $request, array $params = []): array
    {
        $this->requireUser($request);

        $status = trim((string) ($request->query['status'] ?? ''));
        $search = trim((string) ($request->query['q'] ?? ''));
        $params = [];
        $where = [];

        if ($status !== '') {
            $where[] = 'ma.status = :status';
            $params[':status'] = $status;
        }

        if ($search !== '') {
            $where[] = '(ma.filename LIKE :search OR ma.alt_text LIKE :search OR ma.caption LIKE :search)';
            $params[':search'] = '%' . $search . '%';
        }

        $sql = 'SELECT ma.*,
                   (SELECT COUNT(*) FROM media_tags mt WHERE mt.media_asset_id = ma.id) AS tag_count,
                   (SELECT COUNT(*) FROM slot_assignments sa WHERE sa.media_asset_id = ma.id AND sa.status = "published") AS published_assignment_count,
                   (SELECT COUNT(*) FROM gallery_items gi WHERE gi.media_asset_id = ma.id AND gi.status = "published") AS published_gallery_count
                FROM media_assets ma';
        if ($where) {
            $sql .= ' WHERE ' . implode(' AND ', $where);
        }
        $sql .= ' ORDER BY ma.created_at DESC';

        $media = $this->database->all($sql, $params);
        $summary = [
            'total' => count($media),
            'published' => count(array_filter($media, static fn (array $item): bool => ($item['status'] ?? '') === 'published')),
            'processing' => count(array_filter($media, static fn (array $item): bool => ($item['status'] ?? '') === 'processing')),
            'failed' => count(array_filter($media, static fn (array $item): bool => ($item['status'] ?? '') === 'failed')),
        ];

        return $this->ok([
            'media' => $media,
            'summary' => $summary,
        ]);
    }

    public function importPaths(HttpRequest $request, array $params = []): array
    {
        $user = $this->requireUser($request);
        $payload = $this->body($request);
        $paths = array_values(array_filter(array_map(static fn ($value): string => trim((string) $value), (array) ($payload['paths'] ?? []))));
        if ($paths === []) {
            throw new HttpError(422, 'Provide at least one media path.');
        }

        $results = [];
        foreach ($paths as $path) {
            try {
                $absolutePath = normalize_media_path($this->config, $path);
                if (!is_file($absolutePath)) {
                    throw new RuntimeException('File does not exist on the server.');
                }

                $existing = $this->database->one(
                    'SELECT id, public_url FROM media_assets WHERE absolute_path = :absolute_path LIMIT 1',
                    [':absolute_path' => $absolutePath]
                );
                if ($existing) {
                    $results[] = [
                        'status' => 'skipped',
                        'path' => $path,
                        'media_asset_id' => (int) $existing['id'],
                        'reason' => 'Path already imported.',
                        'public_url' => $existing['public_url'],
                    ];
                    continue;
                }

                $imageInfo = @getimagesize($absolutePath) ?: [0, 0, null, null];
                $publicUrl = media_public_url($this->config, $absolutePath, (string) ($payload['public_base_url'] ?? ''));
                $mediaId = $this->database->insert(
                    'INSERT INTO media_assets
                        (filename, absolute_path, public_url, mime_type, width, height, bytes, checksum, status, source_type, uploaded_by, alt_text, caption, credit)
                     VALUES
                        (:filename, :absolute_path, :public_url, :mime_type, :width, :height, :bytes, :checksum, :status, :source_type, :uploaded_by, :alt_text, :caption, :credit)',
                    [
                        ':filename' => basename($absolutePath),
                        ':absolute_path' => $absolutePath,
                        ':public_url' => $publicUrl,
                        ':mime_type' => function_exists('mime_content_type') ? mime_content_type($absolutePath) : null,
                        ':width' => $imageInfo[0] ?: null,
                        ':height' => $imageInfo[1] ?: null,
                        ':bytes' => filesize($absolutePath) ?: null,
                        ':checksum' => hash_file('sha256', $absolutePath) ?: null,
                        ':status' => 'processing',
                        ':source_type' => (string) ($payload['source_type'] ?? 'cpanel'),
                        ':uploaded_by' => $user['id'],
                        ':alt_text' => null,
                        ':caption' => null,
                        ':credit' => null,
                    ]
                );

                $this->database->insert(
                    'INSERT INTO media_variants (media_asset_id, variant_key, absolute_path, public_url, width, height, format, bytes)
                     VALUES (:media_asset_id, :variant_key, :absolute_path, :public_url, :width, :height, :format, :bytes)',
                    [
                        ':media_asset_id' => $mediaId,
                        ':variant_key' => 'original',
                        ':absolute_path' => $absolutePath,
                        ':public_url' => $publicUrl,
                        ':width' => $imageInfo[0] ?: null,
                        ':height' => $imageInfo[1] ?: null,
                        ':format' => pathinfo($absolutePath, PATHINFO_EXTENSION) ?: null,
                        ':bytes' => filesize($absolutePath) ?: null,
                    ]
                );

                $workflow = $this->nodeRed->queue('media-import', 'media.import', 'media_asset', $mediaId, [
                    'media_asset_id' => $mediaId,
                    'absolute_path' => $absolutePath,
                    'public_url' => $publicUrl,
                    'site_root' => $this->config->get('app.site_root'),
                    'media_root' => $this->config->get('app.media_root'),
                ]);

                $this->audit($user, 'media.import', 'media_asset', $mediaId, ['path' => $absolutePath]);

                $results[] = [
                    'status' => 'imported',
                    'path' => $path,
                    'media_asset_id' => $mediaId,
                    'public_url' => $publicUrl,
                    'workflow' => $workflow,
                ];
            } catch (Throwable $throwable) {
                $results[] = [
                    'status' => 'error',
                    'path' => $path,
                    'reason' => $throwable->getMessage(),
                ];
            }
        }

        return $this->ok([
            'results' => $results,
            'summary' => [
                'total' => count($results),
                'imported' => count(array_filter($results, static fn (array $item): bool => $item['status'] === 'imported')),
                'skipped' => count(array_filter($results, static fn (array $item): bool => $item['status'] === 'skipped')),
                'failed' => count(array_filter($results, static fn (array $item): bool => $item['status'] === 'error')),
            ],
        ], 201);
    }

    public function detail(HttpRequest $request, array $params): array
    {
        $this->requireUser($request);
        $mediaId = (int) $params['id'];
        $asset = $this->snapshot('media_assets', $mediaId);
        if (!$asset) {
            throw new HttpError(404, 'Media asset not found.');
        }

        return $this->ok([
            'media_asset' => $asset,
            'variants' => $this->database->all('SELECT * FROM media_variants WHERE media_asset_id = :id ORDER BY id ASC', [':id' => $mediaId]),
            'tags' => array_values(array_map(static fn (array $row): string => (string) $row['tag'], $this->database->all('SELECT tag FROM media_tags WHERE media_asset_id = :id ORDER BY tag ASC', [':id' => $mediaId]))),
            'dependencies' => $this->mediaDependencies($mediaId),
            'revisions' => $this->database->all('SELECT * FROM revisions WHERE entity_type = :entity_type AND entity_id = :entity_id ORDER BY created_at DESC', [
                ':entity_type' => 'media_asset',
                ':entity_id' => $mediaId,
            ]),
        ]);
    }

    public function update(HttpRequest $request, array $params): array
    {
        $user = $this->requireUser($request);
        $mediaId = (int) $params['id'];
        $before = $this->snapshot('media_assets', $mediaId);
        if (!$before) {
            throw new HttpError(404, 'Media asset not found.');
        }

        $payload = $this->body($request);
        $allowed = ['alt_text', 'caption', 'credit', 'status'];
        $sets = [];
        $bindings = [':id' => $mediaId];

        foreach ($allowed as $field) {
            if (array_key_exists($field, $payload)) {
                $sets[] = "{$field} = :{$field}";
                $bindings[":{$field}"] = $payload[$field];
            }
        }

        if ($sets === [] && !array_key_exists('tags', $payload)) {
            throw new HttpError(422, 'No changes were provided.');
        }

        if ($sets !== []) {
            $this->database->execute('UPDATE media_assets SET ' . implode(', ', $sets) . ' WHERE id = :id', $bindings);
        }

        if (array_key_exists('tags', $payload)) {
            $tags = array_values(array_unique(array_filter(array_map(static fn ($value): string => trim((string) $value), (array) $payload['tags']))));
            $this->database->execute('DELETE FROM media_tags WHERE media_asset_id = :media_asset_id', [':media_asset_id' => $mediaId]);
            foreach ($tags as $tag) {
                $this->database->insert(
                    'INSERT INTO media_tags (media_asset_id, tag) VALUES (:media_asset_id, :tag)',
                    [':media_asset_id' => $mediaId, ':tag' => $tag]
                );
            }
        }

        $after = $this->snapshot('media_assets', $mediaId) ?? [];
        $this->revision($user, 'media_asset', $mediaId, $before, $after, 'Updated media asset metadata');
        $this->audit($user, 'media.update', 'media_asset', $mediaId, ['fields' => array_keys($payload)]);

        return $this->ok(['media_asset' => $after]);
    }

    public function archive(HttpRequest $request, array $params): array
    {
        $user = $this->requireUser($request);
        $mediaId = (int) $params['id'];
        $before = $this->snapshot('media_assets', $mediaId);
        if (!$before) {
            throw new HttpError(404, 'Media asset not found.');
        }

        $dependencies = $this->mediaDependencies($mediaId);
        $blockingAssignments = array_values(array_filter($dependencies['slot_assignments'], static fn (array $row): bool => ($row['status'] ?? '') === 'published'));
        $blockingGalleryItems = array_values(array_filter($dependencies['gallery_items'], static fn (array $row): bool => ($row['status'] ?? '') === 'published'));
        if ($blockingAssignments !== [] || $blockingGalleryItems !== []) {
            throw new HttpError(409, 'This media asset is still published in slots or galleries.', [
                'dependencies' => $dependencies,
            ]);
        }

        $this->database->execute('UPDATE media_assets SET status = :status WHERE id = :id', [':status' => 'archived', ':id' => $mediaId]);
        $after = $this->snapshot('media_assets', $mediaId) ?? [];
        $this->revision($user, 'media_asset', $mediaId, $before, $after, 'Archived media asset');
        $this->audit($user, 'media.archive', 'media_asset', $mediaId);

        return $this->ok(['media_asset' => $after]);
    }

    public function restore(HttpRequest $request, array $params): array
    {
        $user = $this->requireUser($request);
        $mediaId = (int) $params['id'];
        $before = $this->snapshot('media_assets', $mediaId);
        if (!$before) {
            throw new HttpError(404, 'Media asset not found.');
        }

        $this->database->execute('UPDATE media_assets SET status = :status WHERE id = :id', [':status' => 'draft', ':id' => $mediaId]);
        $after = $this->snapshot('media_assets', $mediaId) ?? [];
        $this->revision($user, 'media_asset', $mediaId, $before, $after, 'Restored media asset');
        $this->audit($user, 'media.restore', 'media_asset', $mediaId);

        return $this->ok(['media_asset' => $after]);
    }

    public function dependencies(HttpRequest $request, array $params): array
    {
        $this->requireUser($request);
        return $this->ok(['dependencies' => $this->mediaDependencies((int) $params['id'])]);
    }

    public function reprocess(HttpRequest $request, array $params): array
    {
        $user = $this->requireUser($request);
        $mediaId = (int) $params['id'];
        $asset = $this->snapshot('media_assets', $mediaId);
        if (!$asset) {
            throw new HttpError(404, 'Media asset not found.');
        }

        $this->database->execute('UPDATE media_assets SET status = :status WHERE id = :id', [':status' => 'processing', ':id' => $mediaId]);
        $workflow = $this->nodeRed->queue('media-reprocess', 'media.reprocess', 'media_asset', $mediaId, [
            'media_asset_id' => $mediaId,
            'absolute_path' => $asset['absolute_path'],
        ]);

        $this->audit($user, 'media.reprocess', 'media_asset', $mediaId, ['workflow' => $workflow]);

        return $this->ok(['workflow' => $workflow], 202);
    }
}

final class PageController extends BaseController
{
    public function list(HttpRequest $request, array $params = []): array
    {
        $this->requireUser($request);
        $pages = $this->database->all(
            'SELECT p.*,
                (SELECT COUNT(*) FROM page_sections ps WHERE ps.page_id = p.id) AS section_count,
                (SELECT COUNT(*) FROM page_sections ps WHERE ps.page_id = p.id AND ps.status = "draft") AS draft_section_count
             FROM pages p
             ORDER BY p.updated_at DESC'
        );

        return $this->ok(['pages' => $pages]);
    }

    public function create(HttpRequest $request, array $params = []): array
    {
        $user = $this->requireUser($request);
        $payload = $this->body($request);
        $title = trim((string) ($payload['title'] ?? ''));
        $templateKey = trim((string) ($payload['template_key'] ?? 'content-page'));
        $slug = normalize_slug((string) ($payload['slug'] ?? $title));

        if ($title === '') {
            throw new HttpError(422, 'Page title is required.');
        }

        $pageId = $this->database->insert(
            'INSERT INTO pages (slug, title, template_key, status, seo_title, seo_description)
             VALUES (:slug, :title, :template_key, :status, :seo_title, :seo_description)',
            [
                ':slug' => $slug,
                ':title' => $title,
                ':template_key' => $templateKey,
                ':status' => $payload['status'] ?? 'draft',
                ':seo_title' => $payload['seo_title'] ?? null,
                ':seo_description' => $payload['seo_description'] ?? null,
            ]
        );

        $after = $this->pageSnapshot($pageId);
        $this->revision($user, 'page', $pageId, null, $after, 'Created page');
        $this->audit($user, 'page.create', 'page', $pageId, ['slug' => $slug]);

        return $this->ok(['page' => $after['page']], 201);
    }

    public function detail(HttpRequest $request, array $params): array
    {
        $this->requireUser($request);
        $page = $this->pageSnapshot((int) $params['id']);
        if ($page['page'] === []) {
            throw new HttpError(404, 'Page not found.');
        }

        return $this->ok($page);
    }

    public function update(HttpRequest $request, array $params): array
    {
        $user = $this->requireUser($request);
        $pageId = (int) $params['id'];
        $before = $this->pageSnapshot($pageId);
        if ($before['page'] === []) {
            throw new HttpError(404, 'Page not found.');
        }

        $payload = $this->body($request);
        $allowed = ['slug', 'title', 'template_key', 'status', 'seo_title', 'seo_description'];
        $sets = [];
        $bindings = [':id' => $pageId];

        foreach ($allowed as $field) {
            if (array_key_exists($field, $payload)) {
                $sets[] = "{$field} = :{$field}";
                $bindings[":{$field}"] = $field === 'slug' ? normalize_slug((string) $payload[$field]) : $payload[$field];
            }
        }

        if ($sets === []) {
            throw new HttpError(422, 'No page fields were provided.');
        }

        $this->database->execute('UPDATE pages SET ' . implode(', ', $sets) . ' WHERE id = :id', $bindings);
        $after = $this->pageSnapshot($pageId);
        $this->revision($user, 'page', $pageId, $before, $after, 'Updated page');
        $this->audit($user, 'page.update', 'page', $pageId, ['fields' => array_keys($payload)]);

        return $this->ok($after);
    }

    public function sections(HttpRequest $request, array $params): array
    {
        $this->requireUser($request);
        $pageId = (int) $params['id'];
        $page = $this->snapshot('pages', $pageId);
        if (!$page) {
            throw new HttpError(404, 'Page not found.');
        }

        return $this->ok([
            'page' => $page,
            'sections' => $this->pageSnapshot($pageId)['sections'],
        ]);
    }

    public function createSection(HttpRequest $request, array $params): array
    {
        $user = $this->requireUser($request);
        $pageId = (int) $params['id'];
        $page = $this->snapshot('pages', $pageId);
        if (!$page) {
            throw new HttpError(404, 'Page not found.');
        }

        $payload = $this->body($request);
        $sectionKey = normalize_slug((string) ($payload['section_key'] ?? $payload['label'] ?? 'section'));
        $label = trim((string) ($payload['label'] ?? $sectionKey));
        $sectionType = trim((string) ($payload['section_type'] ?? 'content'));

        $sectionId = $this->database->insert(
            'INSERT INTO page_sections (page_id, section_key, label, section_type, sort_order, status, settings_json)
             VALUES (:page_id, :section_key, :label, :section_type, :sort_order, :status, :settings_json)',
            [
                ':page_id' => $pageId,
                ':section_key' => $sectionKey,
                ':label' => $label,
                ':section_type' => $sectionType,
                ':sort_order' => (int) ($payload['sort_order'] ?? 0),
                ':status' => $payload['status'] ?? 'draft',
                ':settings_json' => json_encode($payload['settings_json'] ?? [], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE),
            ]
        );

        foreach ((array) ($payload['slots'] ?? []) as $slot) {
            if (!is_array($slot)) {
                continue;
            }
            $slotKey = (string) ($slot['slot_key'] ?? '');
            if ($slotKey === '') {
                continue;
            }
            $this->ensureSlotDefinition($slotKey, [
                'entity_type' => 'section',
                'entity_ref' => $page['slug'] . ':' . $sectionKey,
                'label' => $slot['label'] ?? $slotKey,
                'allowed_count' => $slot['allowed_count'] ?? 1,
                'settings_json' => $slot['settings_json'] ?? [],
                'is_required' => $slot['is_required'] ?? false,
            ]);
        }

        $this->audit($user, 'page.section.create', 'page_section', $sectionId, ['page_id' => $pageId]);
        return $this->ok(['section' => $this->snapshot('page_sections', $sectionId)], 201);
    }

    public function updateSection(HttpRequest $request, array $params): array
    {
        $user = $this->requireUser($request);
        $sectionId = (int) $params['id'];
        $before = $this->snapshot('page_sections', $sectionId);
        if (!$before) {
            throw new HttpError(404, 'Section not found.');
        }

        $payload = $this->body($request);
        $allowed = ['section_key', 'label', 'section_type', 'sort_order', 'status'];
        $sets = [];
        $bindings = [':id' => $sectionId];
        foreach ($allowed as $field) {
            if (array_key_exists($field, $payload)) {
                $sets[] = "{$field} = :{$field}";
                $bindings[":{$field}"] = $field === 'section_key' ? normalize_slug((string) $payload[$field]) : $payload[$field];
            }
        }

        if (array_key_exists('settings_json', $payload)) {
            $sets[] = 'settings_json = :settings_json';
            $bindings[':settings_json'] = json_encode($payload['settings_json'], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
        }

        if ($sets === []) {
            throw new HttpError(422, 'No section fields were provided.');
        }

        $this->database->execute('UPDATE page_sections SET ' . implode(', ', $sets) . ' WHERE id = :id', $bindings);
        $after = $this->snapshot('page_sections', $sectionId) ?? [];
        $this->revision($user, 'page_section', $sectionId, $before, $after, 'Updated page section');
        $this->audit($user, 'page.section.update', 'page_section', $sectionId, ['fields' => array_keys($payload)]);

        return $this->ok(['section' => $after]);
    }

    public function putFields(HttpRequest $request, array $params): array
    {
        $user = $this->requireUser($request);
        $sectionId = (int) $params['id'];
        $section = $this->snapshot('page_sections', $sectionId);
        if (!$section) {
            throw new HttpError(404, 'Section not found.');
        }

        $payload = $this->body($request);
        $incomingFields = $payload['fields'] ?? [];
        if (!is_array($incomingFields) || $incomingFields === []) {
            throw new HttpError(422, 'Provide at least one field definition.');
        }

        $replace = !empty($payload['replace']);
        $keptKeys = [];
        foreach ($incomingFields as $field) {
            if (!is_array($field)) {
                continue;
            }
            $fieldKey = normalize_slug((string) ($field['field_key'] ?? $field['key'] ?? 'field'));
            $keptKeys[] = $fieldKey;
            $existing = $this->database->one(
                'SELECT id FROM content_fields WHERE page_section_id = :page_section_id AND field_key = :field_key LIMIT 1',
                [':page_section_id' => $sectionId, ':field_key' => $fieldKey]
            );

            if ($existing) {
                $this->database->execute(
                    'UPDATE content_fields
                     SET field_type = :field_type, field_value = :field_value, status = :status, updated_by = :updated_by
                     WHERE id = :id',
                    [
                        ':field_type' => $field['field_type'] ?? $field['type'] ?? 'text',
                        ':field_value' => $field['field_value'] ?? $field['value'] ?? '',
                        ':status' => $field['status'] ?? 'draft',
                        ':updated_by' => $user['id'],
                        ':id' => $existing['id'],
                    ]
                );
            } else {
                $this->database->insert(
                    'INSERT INTO content_fields (page_section_id, field_key, field_type, field_value, status, updated_by)
                     VALUES (:page_section_id, :field_key, :field_type, :field_value, :status, :updated_by)',
                    [
                        ':page_section_id' => $sectionId,
                        ':field_key' => $fieldKey,
                        ':field_type' => $field['field_type'] ?? $field['type'] ?? 'text',
                        ':field_value' => $field['field_value'] ?? $field['value'] ?? '',
                        ':status' => $field['status'] ?? 'draft',
                        ':updated_by' => $user['id'],
                    ]
                );
            }
        }

        if ($replace && $keptKeys !== []) {
            $placeholders = implode(', ', array_fill(0, count($keptKeys), '?'));
            $this->database->pdo()->prepare("DELETE FROM content_fields WHERE page_section_id = ? AND field_key NOT IN ({$placeholders})")
                ->execute(array_merge([$sectionId], $keptKeys));
        }

        $fields = $this->database->all('SELECT * FROM content_fields WHERE page_section_id = :page_section_id ORDER BY id ASC', [
            ':page_section_id' => $sectionId,
        ]);
        $this->audit($user, 'page.section.fields.put', 'page_section', $sectionId, ['field_count' => count($fields)]);

        return $this->ok(['fields' => $fields]);
    }

    public function publish(HttpRequest $request, array $params): array
    {
        $user = $this->requireUser($request);
        $pageId = (int) $params['id'];
        $before = $this->pageSnapshot($pageId);
        if ($before['page'] === []) {
            throw new HttpError(404, 'Page not found.');
        }

        $page = $before['page'];
        $this->database->transaction(function (Database $database) use ($pageId, $page): void {
            $database->execute('UPDATE pages SET status = :status WHERE id = :id', [':status' => 'published', ':id' => $pageId]);
            $database->execute(
                'UPDATE page_sections SET status = :status WHERE page_id = :page_id AND status <> :archived',
                [':status' => 'published', ':page_id' => $pageId, ':archived' => 'archived']
            );
            $database->execute(
                'UPDATE content_fields cf
                 INNER JOIN page_sections ps ON ps.id = cf.page_section_id
                 SET cf.status = :status
                 WHERE ps.page_id = :page_id AND cf.status <> :archived',
                [':status' => 'published', ':page_id' => $pageId, ':archived' => 'archived']
            );
            $database->execute(
                'UPDATE slot_assignments sa
                 INNER JOIN slot_definitions sd ON sd.id = sa.slot_definition_id
                 SET sa.status = :status, sa.published_at = NOW()
                 WHERE sa.status = :draft
                   AND ((sd.entity_type = :page_type AND sd.entity_ref = :page_ref)
                     OR (sd.entity_type = :section_type AND sd.entity_ref LIKE :section_ref))',
                [
                    ':status' => 'published',
                    ':draft' => 'draft',
                    ':page_type' => 'page',
                    ':page_ref' => $page['slug'],
                    ':section_type' => 'section',
                    ':section_ref' => $page['slug'] . ':%',
                ]
            );
        });

        $after = $this->pageSnapshot($pageId);
        $this->revision($user, 'page', $pageId, $before, $after, 'Published page');
        $this->audit($user, 'page.publish', 'page', $pageId);

        return $this->ok($after);
    }

    public function unpublish(HttpRequest $request, array $params): array
    {
        $user = $this->requireUser($request);
        $pageId = (int) $params['id'];
        $before = $this->pageSnapshot($pageId);
        if ($before['page'] === []) {
            throw new HttpError(404, 'Page not found.');
        }

        $this->database->execute('UPDATE pages SET status = :status WHERE id = :id', [':status' => 'draft', ':id' => $pageId]);
        $after = $this->pageSnapshot($pageId);
        $this->revision($user, 'page', $pageId, $before, $after, 'Unpublished page');
        $this->audit($user, 'page.unpublish', 'page', $pageId);

        return $this->ok($after);
    }
}

final class GalleryController extends BaseController
{
    public function list(HttpRequest $request, array $params = []): array
    {
        $this->requireUser($request);
        $galleries = $this->database->all(
            'SELECT g.*,
                ma.public_url AS cover_public_url,
                (SELECT COUNT(*) FROM gallery_items gi WHERE gi.gallery_id = g.id) AS item_count
             FROM galleries g
             LEFT JOIN media_assets ma ON ma.id = g.cover_media_id
             ORDER BY g.updated_at DESC'
        );

        return $this->ok(['galleries' => $galleries]);
    }

    public function create(HttpRequest $request, array $params = []): array
    {
        $user = $this->requireUser($request);
        $payload = $this->body($request);
        $title = trim((string) ($payload['title'] ?? ''));
        if ($title === '') {
            throw new HttpError(422, 'Gallery title is required.');
        }

        $galleryId = $this->database->insert(
            'INSERT INTO galleries (slug, title, description, status, cover_media_id)
             VALUES (:slug, :title, :description, :status, :cover_media_id)',
            [
                ':slug' => normalize_slug((string) ($payload['slug'] ?? $title)),
                ':title' => $title,
                ':description' => $payload['description'] ?? null,
                ':status' => $payload['status'] ?? 'draft',
                ':cover_media_id' => $payload['cover_media_id'] ?? null,
            ]
        );

        $after = $this->gallerySnapshot($galleryId);
        $this->revision($user, 'gallery', $galleryId, null, $after, 'Created gallery');
        $this->audit($user, 'gallery.create', 'gallery', $galleryId);

        return $this->ok(['gallery' => $after['gallery']], 201);
    }

    public function update(HttpRequest $request, array $params): array
    {
        $user = $this->requireUser($request);
        $galleryId = (int) $params['id'];
        $before = $this->gallerySnapshot($galleryId);
        if ($before['gallery'] === []) {
            throw new HttpError(404, 'Gallery not found.');
        }

        $payload = $this->body($request);
        $allowed = ['slug', 'title', 'description', 'status', 'cover_media_id'];
        $sets = [];
        $bindings = [':id' => $galleryId];
        foreach ($allowed as $field) {
            if (array_key_exists($field, $payload)) {
                $sets[] = "{$field} = :{$field}";
                $bindings[":{$field}"] = $field === 'slug' ? normalize_slug((string) $payload[$field]) : $payload[$field];
            }
        }
        if ($sets === []) {
            throw new HttpError(422, 'No gallery fields were provided.');
        }

        $this->database->execute('UPDATE galleries SET ' . implode(', ', $sets) . ' WHERE id = :id', $bindings);
        $after = $this->gallerySnapshot($galleryId);
        $this->revision($user, 'gallery', $galleryId, $before, $after, 'Updated gallery');
        $this->audit($user, 'gallery.update', 'gallery', $galleryId, ['fields' => array_keys($payload)]);

        return $this->ok($after);
    }

    public function putItems(HttpRequest $request, array $params): array
    {
        $user = $this->requireUser($request);
        $galleryId = (int) $params['id'];
        $before = $this->gallerySnapshot($galleryId);
        if ($before['gallery'] === []) {
            throw new HttpError(404, 'Gallery not found.');
        }

        $payload = $this->body($request);
        $items = (array) ($payload['items'] ?? []);

        $this->database->transaction(function (Database $database) use ($galleryId, $items): void {
            $database->execute('DELETE FROM gallery_items WHERE gallery_id = :gallery_id', [':gallery_id' => $galleryId]);
            foreach ($items as $index => $item) {
                if (!is_array($item) || empty($item['media_asset_id'])) {
                    continue;
                }
                $database->insert(
                    'INSERT INTO gallery_items (gallery_id, media_asset_id, sort_order, status)
                     VALUES (:gallery_id, :media_asset_id, :sort_order, :status)',
                    [
                        ':gallery_id' => $galleryId,
                        ':media_asset_id' => (int) $item['media_asset_id'],
                        ':sort_order' => (int) ($item['sort_order'] ?? $index),
                        ':status' => $item['status'] ?? 'draft',
                    ]
                );
            }
        });

        $after = $this->gallerySnapshot($galleryId);
        $this->revision($user, 'gallery', $galleryId, $before, $after, 'Replaced gallery items');
        $this->audit($user, 'gallery.items.put', 'gallery', $galleryId, ['item_count' => count($items)]);

        return $this->ok($after);
    }
}

final class SlotController extends BaseController
{
    public function list(HttpRequest $request, array $params = []): array
    {
        $this->requireUser($request);
        $slots = $this->database->all(
            'SELECT sd.*,
                (SELECT COUNT(*) FROM slot_assignments sa WHERE sa.slot_definition_id = sd.id AND sa.status = "published") AS published_assignment_count,
                (SELECT COUNT(*) FROM assignment_suggestions sug WHERE sug.slot_definition_id = sd.id AND sug.status = "pending") AS pending_suggestion_count
             FROM slot_definitions sd
             ORDER BY sd.entity_type ASC, sd.slot_key ASC'
        );
        foreach ($slots as &$slot) {
            $slot['settings_json'] = json_decode_array($slot['settings_json'] ?? null);
        }
        unset($slot);

        return $this->ok(['slots' => $slots]);
    }

    public function detail(HttpRequest $request, array $params): array
    {
        $this->requireUser($request);
        $slot = $this->findSlotByKey((string) $params['slotKey']);
        if (!$slot) {
            throw new HttpError(404, 'Slot not found.');
        }

        $assignments = $this->database->all(
            'SELECT sa.*, ma.filename, ma.public_url, ma.alt_text AS media_alt_text
             FROM slot_assignments sa
             INNER JOIN media_assets ma ON ma.id = sa.media_asset_id
             WHERE sa.slot_definition_id = :slot_definition_id
             ORDER BY sa.updated_at DESC',
            [':slot_definition_id' => $slot['id']]
        );

        return $this->ok([
            'slot' => $slot,
            'assignments' => $assignments,
        ]);
    }

    public function suggestions(HttpRequest $request, array $params): array
    {
        $this->requireUser($request);
        $slot = $this->findSlotByKey((string) $params['slotKey']);
        if (!$slot) {
            throw new HttpError(404, 'Slot not found.');
        }

        $suggestions = $this->database->all(
            'SELECT sug.*, ma.filename, ma.public_url, ma.width, ma.height
             FROM assignment_suggestions sug
             INNER JOIN media_assets ma ON ma.id = sug.media_asset_id
             WHERE sug.slot_definition_id = :slot_definition_id
             ORDER BY sug.score DESC, sug.created_at DESC',
            [':slot_definition_id' => $slot['id']]
        );
        foreach ($suggestions as &$suggestion) {
            $suggestion['reason_json'] = json_decode_array($suggestion['reason_json'] ?? null);
        }
        unset($suggestion);

        return $this->ok([
            'slot' => $slot,
            'suggestions' => $suggestions,
        ]);
    }

    public function refreshSuggestions(HttpRequest $request, array $params): array
    {
        $user = $this->requireUser($request);
        $slot = $this->ensureSlotDefinition((string) $params['slotKey'], $this->body($request));
        $settings = json_decode_array($slot['settings_json'] ?? null);
        $preferredTags = array_values(array_filter(array_map('strval', (array) ($settings['preferred_tags'] ?? []))));
        $preferredOrientation = (string) ($settings['preferred_orientation'] ?? '');

        $candidates = $this->database->all(
            'SELECT ma.*,
                GROUP_CONCAT(mt.tag ORDER BY mt.tag SEPARATOR ",") AS tag_list,
                (SELECT COUNT(*) FROM slot_assignments sa WHERE sa.media_asset_id = ma.id AND sa.status = "published") AS current_usage_count
             FROM media_assets ma
             LEFT JOIN media_tags mt ON mt.media_asset_id = ma.id
             WHERE ma.status IN ("draft", "published")
             GROUP BY ma.id
             ORDER BY ma.updated_at DESC
             LIMIT 100'
        );

        $scored = [];
        foreach ($candidates as $candidate) {
            $tags = array_values(array_filter(explode(',', (string) ($candidate['tag_list'] ?? ''))));
            $score = 0.0;
            $reasons = [];

            if ($preferredTags !== []) {
                $matches = array_values(array_intersect(array_map('strtolower', $preferredTags), array_map('strtolower', $tags)));
                if ($matches !== []) {
                    $score += 35 + (count($matches) * 5);
                    $reasons[] = ['type' => 'tag-match', 'tags' => $matches];
                }
            }

            if ($preferredOrientation !== '' && !empty($candidate['width']) && !empty($candidate['height'])) {
                $orientation = ((int) $candidate['height'] > (int) $candidate['width']) ? 'portrait' : 'landscape';
                if ($orientation === $preferredOrientation) {
                    $score += 20;
                    $reasons[] = ['type' => 'orientation-match', 'orientation' => $orientation];
                }
            }

            if (($candidate['status'] ?? '') === 'published') {
                $score += 10;
                $reasons[] = ['type' => 'already-published'];
            }

            $usagePenalty = ((int) ($candidate['current_usage_count'] ?? 0)) * 8;
            if ($usagePenalty > 0) {
                $score -= $usagePenalty;
                $reasons[] = ['type' => 'usage-penalty', 'count' => (int) $candidate['current_usage_count']];
            }

            $score += max(0, 5 - min(5, (int) ($candidate['current_usage_count'] ?? 0)));
            $scored[] = [
                'media_asset_id' => (int) $candidate['id'],
                'score' => round($score, 4),
                'reason_json' => $reasons,
            ];
        }

        usort($scored, static fn (array $left, array $right): int => $right['score'] <=> $left['score']);
        $top = array_slice($scored, 0, 12);

        $workflow = $this->nodeRed->queue('slot-suggestions', 'slot.refresh-suggestions', 'slot_definition', (int) $slot['id'], [
            'slot_key' => $slot['slot_key'],
            'slot_definition_id' => (int) $slot['id'],
            'settings_json' => $settings,
        ]);

        $this->database->execute(
            'UPDATE assignment_suggestions SET status = :status WHERE slot_definition_id = :slot_definition_id AND status = :pending',
            [':status' => 'expired', ':slot_definition_id' => $slot['id'], ':pending' => 'pending']
        );

        foreach ($top as $suggestion) {
            $this->database->insert(
                'INSERT INTO assignment_suggestions (slot_definition_id, media_asset_id, score, reason_json, status, workflow_run_id)
                 VALUES (:slot_definition_id, :media_asset_id, :score, :reason_json, :status, :workflow_run_id)',
                [
                    ':slot_definition_id' => $slot['id'],
                    ':media_asset_id' => $suggestion['media_asset_id'],
                    ':score' => $suggestion['score'],
                    ':reason_json' => json_encode($suggestion['reason_json'], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE),
                    ':status' => 'pending',
                    ':workflow_run_id' => $workflow['workflow_run_id'],
                ]
            );
        }

        $this->audit($user, 'slot.refresh-suggestions', 'slot_definition', (int) $slot['id'], ['count' => count($top)]);

        return $this->ok([
            'slot' => $slot,
            'workflow' => $workflow,
            'suggestions' => $this->database->all(
                'SELECT * FROM assignment_suggestions WHERE slot_definition_id = :slot_definition_id AND workflow_run_id = :workflow_run_id ORDER BY score DESC',
                [
                    ':slot_definition_id' => $slot['id'],
                    ':workflow_run_id' => $workflow['workflow_run_id'],
                ]
            ),
        ], 202);
    }

    public function createAssignment(HttpRequest $request, array $params): array
    {
        $user = $this->requireUser($request);
        $payload = $this->body($request);
        $slot = $this->ensureSlotDefinition((string) $params['slotKey'], $payload);
        $mediaAssetId = (int) ($payload['media_asset_id'] ?? 0);
        if ($mediaAssetId <= 0) {
            throw new HttpError(422, 'media_asset_id is required.');
        }

        $assignmentId = $this->database->insert(
            'INSERT INTO slot_assignments
                (slot_definition_id, media_asset_id, assignment_source, status, alt_override, caption_override, assigned_by, published_at)
             VALUES
                (:slot_definition_id, :media_asset_id, :assignment_source, :status, :alt_override, :caption_override, :assigned_by, :published_at)',
            [
                ':slot_definition_id' => $slot['id'],
                ':media_asset_id' => $mediaAssetId,
                ':assignment_source' => $payload['assignment_source'] ?? (!empty($payload['suggestion_id']) ? 'suggested' : 'manual'),
                ':status' => $payload['status'] ?? 'draft',
                ':alt_override' => $payload['alt_override'] ?? null,
                ':caption_override' => $payload['caption_override'] ?? null,
                ':assigned_by' => $user['id'],
                ':published_at' => ($payload['status'] ?? 'draft') === 'published' ? (new DateTimeImmutable())->format('Y-m-d H:i:s') : null,
            ]
        );

        if (!empty($payload['suggestion_id'])) {
            $this->database->execute(
                'UPDATE assignment_suggestions SET status = :status, reviewed_by = :reviewed_by, reviewed_at = NOW()
                 WHERE id = :id',
                [
                    ':status' => 'accepted',
                    ':reviewed_by' => $user['id'],
                    ':id' => (int) $payload['suggestion_id'],
                ]
            );
        }

        $assignment = $this->database->one('SELECT * FROM slot_assignments WHERE id = :id', [':id' => $assignmentId]);
        $this->audit($user, 'slot.assignment.create', 'slot_assignment', $assignmentId, ['slot_key' => $slot['slot_key']]);

        return $this->ok(['assignment' => $assignment], 201);
    }
}

final class AssignmentController extends BaseController
{
    public function update(HttpRequest $request, array $params): array
    {
        $user = $this->requireUser($request);
        $assignmentId = (int) $params['id'];
        $before = $this->snapshot('slot_assignments', $assignmentId);
        if (!$before) {
            throw new HttpError(404, 'Assignment not found.');
        }

        $payload = $this->body($request);
        $allowed = ['assignment_source', 'status', 'alt_override', 'caption_override'];
        $sets = [];
        $bindings = [':id' => $assignmentId];
        foreach ($allowed as $field) {
            if (array_key_exists($field, $payload)) {
                $sets[] = "{$field} = :{$field}";
                $bindings[":{$field}"] = $payload[$field];
            }
        }
        if ($sets === []) {
            throw new HttpError(422, 'No assignment fields were provided.');
        }

        $this->database->execute('UPDATE slot_assignments SET ' . implode(', ', $sets) . ' WHERE id = :id', $bindings);
        $after = $this->snapshot('slot_assignments', $assignmentId) ?? [];
        $this->revision($user, 'slot_assignment', $assignmentId, $before, $after, 'Updated slot assignment');
        $this->audit($user, 'slot.assignment.update', 'slot_assignment', $assignmentId);

        return $this->ok(['assignment' => $after]);
    }

    public function publish(HttpRequest $request, array $params): array
    {
        $user = $this->requireUser($request);
        $assignmentId = (int) $params['id'];
        $before = $this->snapshot('slot_assignments', $assignmentId);
        if (!$before) {
            throw new HttpError(404, 'Assignment not found.');
        }

        $slot = $this->snapshot('slot_definitions', (int) $before['slot_definition_id']);
        if (!$slot) {
            throw new HttpError(404, 'Slot definition not found.');
        }

        $this->database->transaction(function (Database $database) use ($slot, $assignmentId): void {
            if ((int) ($slot['allowed_count'] ?? 1) <= 1) {
                $database->execute(
                    'UPDATE slot_assignments
                     SET status = :status
                     WHERE slot_definition_id = :slot_definition_id AND id <> :id AND status = :published',
                    [
                        ':status' => 'archived',
                        ':slot_definition_id' => $slot['id'],
                        ':id' => $assignmentId,
                        ':published' => 'published',
                    ]
                );
            }

            $database->execute(
                'UPDATE slot_assignments SET status = :status, published_at = NOW() WHERE id = :id',
                [':status' => 'published', ':id' => $assignmentId]
            );
        });

        $after = $this->snapshot('slot_assignments', $assignmentId) ?? [];
        $this->revision($user, 'slot_assignment', $assignmentId, $before, $after, 'Published slot assignment');
        $this->audit($user, 'slot.assignment.publish', 'slot_assignment', $assignmentId);

        return $this->ok(['assignment' => $after]);
    }
}

final class SystemController extends BaseController
{
    public function activity(HttpRequest $request, array $params = []): array
    {
        $this->requireUser($request);
        $items = $this->database->all(
            'SELECT al.*, u.name AS actor_name, u.email AS actor_email
             FROM audit_log al
             LEFT JOIN users u ON u.id = al.actor_user_id
             ORDER BY al.created_at DESC
             LIMIT 100'
        );

        return $this->ok(['activity' => $items]);
    }

    public function workflowRuns(HttpRequest $request, array $params = []): array
    {
        $this->requireUser($request);
        $runs = $this->database->all('SELECT * FROM workflow_runs ORDER BY created_at DESC LIMIT 100');
        foreach ($runs as &$run) {
            $run['input_json'] = json_decode_array($run['input_json'] ?? null);
            $run['output_json'] = json_decode_array($run['output_json'] ?? null);
        }
        unset($run);

        return $this->ok(['workflow_runs' => $runs]);
    }

    public function settings(HttpRequest $request, array $params = []): array
    {
        $this->requireUser($request);
        $settings = $this->database->all('SELECT * FROM settings ORDER BY `key` ASC');
        foreach ($settings as &$setting) {
            $setting['value_json'] = json_decode_array($setting['value_json'] ?? null);
        }
        unset($setting);

        return $this->ok(['settings' => $settings]);
    }

    public function updateSettings(HttpRequest $request, array $params = []): array
    {
        $user = $this->requireAdmin($request);
        $payload = $this->body($request);
        $settings = $payload['settings'] ?? $payload;
        if (!is_array($settings) || $settings === []) {
            throw new HttpError(422, 'Provide at least one setting.');
        }

        foreach ($settings as $key => $value) {
            if (is_int($key) && is_array($value)) {
                $settingKey = (string) ($value['key'] ?? '');
                $settingValue = $value['value_json'] ?? null;
            } else {
                $settingKey = (string) $key;
                $settingValue = $value;
            }

            if ($settingKey === '') {
                continue;
            }

            $this->database->execute(
                'INSERT INTO settings (`key`, value_json, updated_by, updated_at)
                 VALUES (:key, :value_json, :updated_by, NOW())
                 ON DUPLICATE KEY UPDATE value_json = VALUES(value_json), updated_by = VALUES(updated_by), updated_at = NOW()',
                [
                    ':key' => $settingKey,
                    ':value_json' => json_encode($settingValue, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE),
                    ':updated_by' => $user['id'],
                ]
            );
        }

        $this->audit($user, 'settings.update', 'setting', null, ['keys' => array_keys($settings)]);
        return $this->settings($request);
    }

    public function users(HttpRequest $request, array $params = []): array
    {
        $this->requireAdmin($request);
        $users = $this->database->all(
            'SELECT id, name, email, role, status, last_login_at, created_at, updated_at
             FROM users
             ORDER BY created_at DESC'
        );
        return $this->ok(['users' => $users]);
    }

    public function createUser(HttpRequest $request, array $params = []): array
    {
        $user = $this->requireAdmin($request);
        $payload = $this->body($request);
        $name = trim((string) ($payload['name'] ?? ''));
        $email = trim((string) ($payload['email'] ?? ''));
        $password = (string) ($payload['password'] ?? '');

        if ($name === '' || $email === '' || strlen($password) < 8) {
            throw new HttpError(422, 'name, email, and a password of at least 8 characters are required.');
        }

        $newUserId = $this->database->insert(
            'INSERT INTO users (name, email, password_hash, role, status)
             VALUES (:name, :email, :password_hash, :role, :status)',
            [
                ':name' => $name,
                ':email' => $email,
                ':password_hash' => $this->auth->passwordHash($password),
                ':role' => $payload['role'] ?? 'editor',
                ':status' => $payload['status'] ?? 'active',
            ]
        );

        $this->audit($user, 'user.create', 'user', $newUserId, ['email' => $email]);
        return $this->ok(['user' => $this->snapshot('users', $newUserId)], 201);
    }

    public function updateUser(HttpRequest $request, array $params): array
    {
        $admin = $this->requireAdmin($request);
        $userId = (int) $params['id'];
        $before = $this->snapshot('users', $userId);
        if (!$before) {
            throw new HttpError(404, 'User not found.');
        }

        $payload = $this->body($request);
        $allowed = ['name', 'email', 'role', 'status'];
        $sets = [];
        $bindings = [':id' => $userId];
        foreach ($allowed as $field) {
            if (array_key_exists($field, $payload)) {
                $sets[] = "{$field} = :{$field}";
                $bindings[":{$field}"] = $payload[$field];
            }
        }
        if (!empty($payload['password'])) {
            $sets[] = 'password_hash = :password_hash';
            $bindings[':password_hash'] = $this->auth->passwordHash((string) $payload['password']);
        }
        if ($sets === []) {
            throw new HttpError(422, 'No user fields were provided.');
        }

        $this->database->execute('UPDATE users SET ' . implode(', ', $sets) . ' WHERE id = :id', $bindings);
        $after = $this->snapshot('users', $userId) ?? [];
        unset($after['password_hash']);
        $this->revision($admin, 'user', $userId, $before, $after, 'Updated user');
        $this->audit($admin, 'user.update', 'user', $userId);

        return $this->ok(['user' => $after]);
    }
}

final class PublicController extends BaseController
{
    public function page(HttpRequest $request, array $params): array
    {
        $slug = (string) $params['slug'];
        $page = $this->database->one('SELECT * FROM pages WHERE slug = :slug AND status = :status LIMIT 1', [
            ':slug' => $slug,
            ':status' => 'published',
        ]);

        if (!$page) {
            throw new HttpError(404, 'Page not found.');
        }

        $sections = $this->database->all(
            'SELECT * FROM page_sections WHERE page_id = :page_id AND status = :status ORDER BY sort_order ASC, id ASC',
            [':page_id' => $page['id'], ':status' => 'published']
        );

        foreach ($sections as &$section) {
            $fieldRows = $this->database->all(
                'SELECT field_key, field_type, field_value
                 FROM content_fields
                 WHERE page_section_id = :page_section_id AND status = :status
                 ORDER BY id ASC',
                [':page_section_id' => $section['id'], ':status' => 'published']
            );
            $fields = [];
            foreach ($fieldRows as $fieldRow) {
                $fields[$fieldRow['field_key']] = [
                    'type' => $fieldRow['field_type'],
                    'value' => $fieldRow['field_type'] === 'json'
                        ? json_decode_array($fieldRow['field_value'])
                        : $fieldRow['field_value'],
                ];
            }

            $slots = $this->database->all(
                'SELECT sd.slot_key, sd.label, sd.allowed_count, sa.alt_override, sa.caption_override, ma.id AS media_asset_id, ma.public_url, ma.alt_text, ma.caption
                 FROM slot_definitions sd
                 LEFT JOIN slot_assignments sa ON sa.slot_definition_id = sd.id AND sa.status = :assignment_status
                 LEFT JOIN media_assets ma ON ma.id = sa.media_asset_id AND ma.status = :media_status
                 WHERE sd.entity_type = :entity_type AND sd.entity_ref = :entity_ref
                 ORDER BY sd.slot_key ASC, sa.published_at DESC',
                [
                    ':assignment_status' => 'published',
                    ':media_status' => 'published',
                    ':entity_type' => 'section',
                    ':entity_ref' => $slug . ':' . $section['section_key'],
                ]
            );

            $section['settings_json'] = json_decode_array($section['settings_json'] ?? null);
            $section['fields'] = $fields;
            $section['slots'] = $slots;
        }
        unset($section);

        $pageSlots = $this->database->all(
            'SELECT sd.slot_key, sd.label, sd.allowed_count, sa.alt_override, sa.caption_override, ma.id AS media_asset_id, ma.public_url, ma.alt_text, ma.caption
             FROM slot_definitions sd
             LEFT JOIN slot_assignments sa ON sa.slot_definition_id = sd.id AND sa.status = :assignment_status
             LEFT JOIN media_assets ma ON ma.id = sa.media_asset_id AND ma.status = :media_status
             WHERE sd.entity_type = :entity_type AND sd.entity_ref = :entity_ref
             ORDER BY sd.slot_key ASC, sa.published_at DESC',
            [
                ':assignment_status' => 'published',
                ':media_status' => 'published',
                ':entity_type' => 'page',
                ':entity_ref' => $slug,
            ]
        );

        return $this->ok([
            'page' => $page,
            'page_slots' => $pageSlots,
            'sections' => $sections,
        ]);
    }

    public function gallery(HttpRequest $request, array $params): array
    {
        $slug = (string) $params['slug'];
        $gallery = $this->database->one('SELECT * FROM galleries WHERE slug = :slug AND status = :status LIMIT 1', [
            ':slug' => $slug,
            ':status' => 'published',
        ]);
        if (!$gallery) {
            throw new HttpError(404, 'Gallery not found.');
        }

        $items = $this->database->all(
            'SELECT gi.id, gi.sort_order, ma.id AS media_asset_id, ma.filename, ma.public_url, ma.alt_text, ma.caption, ma.width, ma.height
             FROM gallery_items gi
             INNER JOIN media_assets ma ON ma.id = gi.media_asset_id
             WHERE gi.gallery_id = :gallery_id AND gi.status = :gallery_item_status AND ma.status = :media_status
             ORDER BY gi.sort_order ASC, gi.id ASC',
            [
                ':gallery_id' => $gallery['id'],
                ':gallery_item_status' => 'published',
                ':media_status' => 'published',
            ]
        );

        return $this->ok([
            'gallery' => $gallery,
            'items' => $items,
        ]);
    }

    public function navigation(HttpRequest $request, array $params = []): array
    {
        $pages = $this->database->all(
            'SELECT slug, title, template_key
             FROM pages
             WHERE status = :status
             ORDER BY title ASC',
            [':status' => 'published']
        );

        $galleries = $this->database->all(
            'SELECT slug, title
             FROM galleries
             WHERE status = :status
             ORDER BY title ASC',
            [':status' => 'published']
        );

        return $this->ok([
            'pages' => $pages,
            'galleries' => $galleries,
        ]);
    }

    public function siteSettings(HttpRequest $request, array $params = []): array
    {
        $settings = $this->database->all('SELECT `key`, value_json FROM settings WHERE `key` LIKE :prefix ORDER BY `key` ASC', [
            ':prefix' => 'site.%',
        ]);

        $mapped = [];
        foreach ($settings as $setting) {
            $decoded = json_decode_array($setting['value_json'] ?? null);
            $mapped[$setting['key']] = $decoded['value'] ?? $decoded;
        }

        return $this->ok(['settings' => $mapped]);
    }

    public function contact(HttpRequest $request, array $params = []): array
    {
        $payload = $this->body($request);
        
        // Honeypot check
        if (!empty($payload['website'])) {
            return $this->ok(['success' => true]);
        }

        $name = trim((string) ($payload['name'] ?? ''));
        $email = trim((string) ($payload['email'] ?? ''));
        $message = trim((string) ($payload['message'] ?? ''));

        if ($name === '' || $email === '' || $message === '') {
            throw new HttpError(422, 'Name, email, and message are required.');
        }

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            throw new HttpError(422, 'Invalid email address.');
        }

        $to = (string) $this->config->get('contact.to_email', 'tony@beloveful.com');
        $subject = (string) ($payload['subject'] ?? 'Website Inquiry from ' . $name);
        
        $bodyParts = [
            "Name: " . $name,
            "Email: " . $email,
            "Date: " . date('Y-m-d H:i:s'),
            "Source: " . ($payload['source'] ?? 'General Contact'),
        ];

        if (!empty($payload['workshop'])) $bodyParts[] = "Workshop: " . $payload['workshop'];
        if (!empty($payload['image'])) $bodyParts[] = "Image: " . $payload['image'];
        if (!empty($payload['country'])) $bodyParts[] = "Country: " . $payload['country'];
        if (!empty($payload['region'])) $bodyParts[] = "Region: " . $payload['region'];
        
        $bodyParts[] = "\nMessage:\n" . $message;
        
        $fullBody = implode("\n", $bodyParts);
        
        $headers = [
            'From' => 'website@beloveful.com',
            'Reply-To' => $email,
            'X-Mailer' => 'PHP/' . phpversion()
        ];

        $headerString = "";
        foreach ($headers as $key => $value) {
            $headerString .= "{$key}: {$value}\r\n";
        }

        $success = @mail($to, $subject, $fullBody, $headerString);

        if (!$success) {
            throw new HttpError(500, 'Failed to send email. Please try again later or email ' . $to . ' directly.');
        }

    public function sync(HttpRequest $request, array $params = []): array
    {
        $mediaRoot = (string) $this->config->get('app.media_root');
        $targetFolder = $mediaRoot . '/Website beloveful.com';

        if (!is_dir($targetFolder)) {
            return $this->ok(['albums' => [], 'message' => 'Library folder not found at ' . $targetFolder]);
        }

        $albums = [];
        $slideshow = ['desktop' => [], 'mobile' => []];
        $logos = [];

        $regions = array_filter(scandir($targetFolder), fn($item) => $item[0] !== '.' && is_dir($targetFolder . '/' . $item));

        foreach ($regions as $regionName) {
            $regionPath = $targetFolder . '/' . $regionName;
            
            if ($regionName === 'Homepage') {
                $desktopDir = $regionPath . '/Desktop Landscape';
                $mobileDir = $regionPath . '/Mobile Portrait';
                if (is_dir($desktopDir)) {
                    $slideshow['desktop'] = array_values(array_filter(scandir($desktopDir), fn($f) => preg_match('/\.(jpe?g|png|webp|avif)$/i', $f)));
                }
                if (is_dir($mobileDir)) {
                    $slideshow['mobile'] = array_values(array_filter(scandir($mobileDir), fn($f) => preg_match('/\.(jpe?g|png|webp|avif)$/i', $f)));
                }
                continue;
            }

            if ($regionName === 'Clients & Partners' || $regionName === 'Logo') {
                $this->collectLogos($regionPath, $logos);
                continue;
            }

            $countries = array_filter(scandir($regionPath), fn($item) => $item[0] !== '.' && is_dir($regionPath . '/' . $item));
            
            foreach ($countries as $countryName) {
                $countryPath = $regionPath . '/' . $countryName;
                $files = array_values(array_filter(scandir($countryPath), fn($f) => preg_match('/\.(jpe?g|png|webp|avif)$/i', $f)));
                
                if (empty($files)) continue;

                $slug = normalize_slug($countryName);
                $images = array_map(function($f) use ($regionName, $countryName) {
                    $url = "/Website beloveful.com/" . rawurlencode($regionName) . "/" . rawurlencode($countryName) . "/" . rawurlencode($f);
                    return ['desktop' => $url, 'mobile' => $url];
                }, $files);

                $albums[] = [
                    'region' => $regionName,
                    'country' => $countryName,
                    'slug' => $slug,
                    'images' => $images
                ];
            }
            
            $filesInRegion = array_values(array_filter(scandir($regionPath), fn($f) => preg_match('/\.(jpe?g|png|webp|avif)$/i', $f)));
            if (!empty($filesInRegion)) {
                $slug = normalize_slug($regionName);
                $images = array_map(function($f) use ($regionName) {
                    $url = "/Website beloveful.com/" . rawurlencode($regionName) . "/" . rawurlencode($f);
                    return ['desktop' => $url, 'mobile' => $url];
                }, $filesInRegion);

                $albums[] = [
                    'region' => $regionName,
                    'country' => $regionName,
                    'slug' => $slug,
                    'images' => $images
                ];
            }
        }

        return $this->ok([
            'albums' => $albums,
            'slideshow' => $slideshow,
            'logos' => $logos
        ]);
    }

    private function collectLogos(string $path, array &$logos): void
    {
        $items = array_filter(scandir($path), fn($item) => $item[0] !== '.');
        foreach ($items as $item) {
            $fullPath = $path . '/' . $item;
            if (is_dir($fullPath)) {
                $this->collectLogos($fullPath, $logos);
            } elseif (preg_match('/\.(jpe?g|png|webp|avif|svg)$/i', $item)) {
                $relative = str_replace((string) $this->config->get('app.media_root'), '', $fullPath);
                $logos[] = str_replace('\\', '/', $relative);
            }
        }
    }
}

final class InternalController extends BaseController
{
    private function authorize(HttpRequest $request, array $payload = []): void
    {
        $expected = trim((string) $this->config->get('node_red.shared_secret', ''));
        if ($expected === '') {
            return;
        }

        $provided = (string) ($request->headers['x-node-red-secret'] ?? $payload['shared_secret'] ?? '');
        if (!hash_equals($expected, $provided)) {
            throw new HttpError(401, 'Invalid Node-RED shared secret.');
        }
    }

    public function workflowHeartbeat(HttpRequest $request, array $params): array
    {
        $payload = $this->body($request);
        $this->authorize($request, $payload);
        $workflowId = (int) $params['id'];

        $this->database->execute(
            'UPDATE workflow_runs SET status = :status, started_at = COALESCE(started_at, NOW()), output_json = :output_json WHERE id = :id',
            [
                ':status' => 'running',
                ':output_json' => json_encode($payload['output_json'] ?? [], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE),
                ':id' => $workflowId,
            ]
        );

        return $this->ok(['workflow_run_id' => $workflowId, 'status' => 'running']);
    }

    public function workflowComplete(HttpRequest $request, array $params): array
    {
        $payload = $this->body($request);
        $this->authorize($request, $payload);
        $workflowId = (int) $params['id'];
        $status = in_array((string) ($payload['status'] ?? ''), ['completed', 'failed'], true) ? (string) $payload['status'] : 'completed';

        $this->database->execute(
            'UPDATE workflow_runs
             SET status = :status, output_json = :output_json, error_text = :error_text, finished_at = NOW()
             WHERE id = :id',
            [
                ':status' => $status,
                ':output_json' => json_encode($payload['output_json'] ?? [], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE),
                ':error_text' => $payload['error_text'] ?? null,
                ':id' => $workflowId,
            ]
        );

        return $this->ok(['workflow_run_id' => $workflowId, 'status' => $status]);
    }

    public function mediaMetadata(HttpRequest $request, array $params): array
    {
        $payload = $this->body($request);
        $this->authorize($request, $payload);
        $mediaId = (int) $params['id'];
        $asset = $this->snapshot('media_assets', $mediaId);
        if (!$asset) {
            throw new HttpError(404, 'Media asset not found.');
        }

        $this->database->execute(
            'UPDATE media_assets
             SET mime_type = :mime_type,
                 width = :width,
                 height = :height,
                 bytes = :bytes,
                 checksum = :checksum,
                 alt_text = COALESCE(:alt_text, alt_text),
                 caption = COALESCE(:caption, caption),
                 credit = COALESCE(:credit, credit),
                 status = :status
             WHERE id = :id',
            [
                ':mime_type' => $payload['mime_type'] ?? $asset['mime_type'],
                ':width' => $payload['width'] ?? $asset['width'],
                ':height' => $payload['height'] ?? $asset['height'],
                ':bytes' => $payload['bytes'] ?? $asset['bytes'],
                ':checksum' => $payload['checksum'] ?? $asset['checksum'],
                ':alt_text' => $payload['alt_text'] ?? null,
                ':caption' => $payload['caption'] ?? null,
                ':credit' => $payload['credit'] ?? null,
                ':status' => $payload['status'] ?? 'draft',
                ':id' => $mediaId,
            ]
        );

        if (!empty($payload['variants']) && is_array($payload['variants'])) {
            foreach ($payload['variants'] as $variant) {
                if (!is_array($variant) || empty($variant['variant_key']) || empty($variant['absolute_path']) || empty($variant['public_url'])) {
                    continue;
                }
                $this->database->execute(
                    'INSERT INTO media_variants (media_asset_id, variant_key, absolute_path, public_url, width, height, format, bytes)
                     VALUES (:media_asset_id, :variant_key, :absolute_path, :public_url, :width, :height, :format, :bytes)
                     ON DUPLICATE KEY UPDATE absolute_path = VALUES(absolute_path), public_url = VALUES(public_url), width = VALUES(width), height = VALUES(height), format = VALUES(format), bytes = VALUES(bytes)',
                    [
                        ':media_asset_id' => $mediaId,
                        ':variant_key' => $variant['variant_key'],
                        ':absolute_path' => $variant['absolute_path'],
                        ':public_url' => $variant['public_url'],
                        ':width' => $variant['width'] ?? null,
                        ':height' => $variant['height'] ?? null,
                        ':format' => $variant['format'] ?? null,
                        ':bytes' => $variant['bytes'] ?? null,
                    ]
                );
            }
        }

        if (!empty($payload['tags']) && is_array($payload['tags'])) {
            $this->database->execute('DELETE FROM media_tags WHERE media_asset_id = :media_asset_id', [':media_asset_id' => $mediaId]);
            foreach ($payload['tags'] as $tag) {
                $tag = trim((string) $tag);
                if ($tag === '') {
                    continue;
                }
                $this->database->insert(
                    'INSERT INTO media_tags (media_asset_id, tag) VALUES (:media_asset_id, :tag)',
                    [':media_asset_id' => $mediaId, ':tag' => $tag]
                );
            }
        }

        if (!empty($payload['workflow_run_id'])) {
            $this->database->execute(
                'UPDATE workflow_runs SET status = :status, output_json = :output_json, finished_at = NOW() WHERE id = :id',
                [
                    ':status' => 'completed',
                    ':output_json' => json_encode(['media_asset_id' => $mediaId], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE),
                    ':id' => (int) $payload['workflow_run_id'],
                ]
            );
        }

        return $this->ok(['media_asset' => $this->snapshot('media_assets', $mediaId)]);
    }

    public function bulkSuggestions(HttpRequest $request, array $params = []): array
    {
        $payload = $this->body($request);
        $this->authorize($request, $payload);

        $slotDefinitionId = (int) ($payload['slot_definition_id'] ?? 0);
        if ($slotDefinitionId <= 0 && !empty($payload['slot_key'])) {
            $slot = $this->findSlotByKey((string) $payload['slot_key']);
            $slotDefinitionId = (int) ($slot['id'] ?? 0);
        }

        if ($slotDefinitionId <= 0) {
            throw new HttpError(422, 'slot_definition_id or slot_key is required.');
        }

        $this->database->execute(
            'UPDATE assignment_suggestions SET status = :status WHERE slot_definition_id = :slot_definition_id AND status = :pending',
            [':status' => 'expired', ':slot_definition_id' => $slotDefinitionId, ':pending' => 'pending']
        );

        foreach ((array) ($payload['suggestions'] ?? []) as $suggestion) {
            if (!is_array($suggestion) || empty($suggestion['media_asset_id'])) {
                continue;
            }
            $this->database->insert(
                'INSERT INTO assignment_suggestions (slot_definition_id, media_asset_id, score, reason_json, status, workflow_run_id, created_at)
                 VALUES (:slot_definition_id, :media_asset_id, :score, :reason_json, :status, :workflow_run_id, NOW())',
                [
                    ':slot_definition_id' => $slotDefinitionId,
                    ':media_asset_id' => (int) $suggestion['media_asset_id'],
                    ':score' => (float) ($suggestion['score'] ?? 0),
                    ':reason_json' => json_encode($suggestion['reason_json'] ?? $suggestion['reasons'] ?? [], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE),
                    ':status' => $suggestion['status'] ?? 'pending',
                    ':workflow_run_id' => $payload['workflow_run_id'] ?? null,
                ]
            );
        }

        if (!empty($payload['workflow_run_id'])) {
            $this->database->execute(
                'UPDATE workflow_runs SET status = :status, output_json = :output_json, finished_at = NOW() WHERE id = :id',
                [
                    ':status' => 'completed',
                    ':output_json' => json_encode(['slot_definition_id' => $slotDefinitionId], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE),
                    ':id' => (int) $payload['workflow_run_id'],
                ]
            );
        }

        return $this->ok(['slot_definition_id' => $slotDefinitionId]);
    }
}

final class CmsApiApplication
{
    private readonly Database $database;
    private readonly TokenAuth $auth;
    private readonly NodeRedService $nodeRed;
    private readonly array $routes;

    public function __construct(private readonly Config $config)
    {
        $this->database = new Database($config);
        $this->auth = new TokenAuth($this->database, $config);
        $this->nodeRed = new NodeRedService($config, $this->database);

        $auth = new AuthController($this->database, $config, $this->auth, $this->nodeRed);
        $media = new MediaController($this->database, $config, $this->auth, $this->nodeRed);
        $pages = new PageController($this->database, $config, $this->auth, $this->nodeRed);
        $galleries = new GalleryController($this->database, $config, $this->auth, $this->nodeRed);
        $slots = new SlotController($this->database, $config, $this->auth, $this->nodeRed);
        $assignments = new AssignmentController($this->database, $config, $this->auth, $this->nodeRed);
        $system = new SystemController($this->database, $config, $this->auth, $this->nodeRed);
        $public = new PublicController($this->database, $config, $this->auth, $this->nodeRed);
        $internal = new InternalController($this->database, $config, $this->auth, $this->nodeRed);

        $this->routes = [
            ['POST', '#^/api/admin/auth/login$#', [$auth, 'login']],
            ['POST', '#^/api/admin/auth/logout$#', [$auth, 'logout']],
            ['GET', '#^/api/admin/auth/me$#', [$auth, 'me']],
            ['POST', '#^/api/admin/auth/change-password$#', [$auth, 'changePassword']],

            ['POST', '#^/api/auth/login$#', [$auth, 'login']],
            ['POST', '#^/api/auth/logout$#', [$auth, 'logout']],
            ['GET', '#^/api/auth/verify$#', [$auth, 'me']],
            ['POST', '#^/api/auth/verify$#', [$auth, 'me']],
            ['POST', '#^/api/auth/change-password$#', [$auth, 'changePassword']],

            ['GET', '#^/api/admin/media$#', [$media, 'list']],
            ['POST', '#^/api/admin/media/import-paths$#', [$media, 'importPaths']],
            ['GET', '#^/api/admin/media/(?P<id>\d+)$#', [$media, 'detail']],
            ['PATCH', '#^/api/admin/media/(?P<id>\d+)$#', [$media, 'update']],
            ['POST', '#^/api/admin/media/(?P<id>\d+)/archive$#', [$media, 'archive']],
            ['POST', '#^/api/admin/media/(?P<id>\d+)/restore$#', [$media, 'restore']],
            ['GET', '#^/api/admin/media/(?P<id>\d+)/dependencies$#', [$media, 'dependencies']],
            ['POST', '#^/api/admin/media/(?P<id>\d+)/reprocess$#', [$media, 'reprocess']],

            ['POST', '#^/api/images/upload-cpanel$#', [$media, 'importPaths']],

            ['GET', '#^/api/admin/pages$#', [$pages, 'list']],
            ['POST', '#^/api/admin/pages$#', [$pages, 'create']],
            ['GET', '#^/api/admin/pages/(?P<id>\d+)$#', [$pages, 'detail']],
            ['PATCH', '#^/api/admin/pages/(?P<id>\d+)$#', [$pages, 'update']],
            ['GET', '#^/api/admin/pages/(?P<id>\d+)/sections$#', [$pages, 'sections']],
            ['POST', '#^/api/admin/pages/(?P<id>\d+)/sections$#', [$pages, 'createSection']],
            ['PATCH', '#^/api/admin/sections/(?P<id>\d+)$#', [$pages, 'updateSection']],
            ['PUT', '#^/api/admin/sections/(?P<id>\d+)/fields$#', [$pages, 'putFields']],
            ['POST', '#^/api/admin/pages/(?P<id>\d+)/publish$#', [$pages, 'publish']],
            ['POST', '#^/api/admin/pages/(?P<id>\d+)/unpublish$#', [$pages, 'unpublish']],

            ['GET', '#^/api/admin/galleries$#', [$galleries, 'list']],
            ['POST', '#^/api/admin/galleries$#', [$galleries, 'create']],
            ['PATCH', '#^/api/admin/galleries/(?P<id>\d+)$#', [$galleries, 'update']],
            ['PUT', '#^/api/admin/galleries/(?P<id>\d+)/items$#', [$galleries, 'putItems']],

            ['GET', '#^/api/admin/slots$#', [$slots, 'list']],
            ['GET', '#^/api/admin/slots/(?P<slotKey>[-a-zA-Z0-9:_]+)$#', [$slots, 'detail']],
            ['GET', '#^/api/admin/slots/(?P<slotKey>[-a-zA-Z0-9:_]+)/suggestions$#', [$slots, 'suggestions']],
            ['POST', '#^/api/admin/slots/(?P<slotKey>[-a-zA-Z0-9:_]+)/refresh-suggestions$#', [$slots, 'refreshSuggestions']],
            ['POST', '#^/api/admin/slots/(?P<slotKey>[-a-zA-Z0-9:_]+)/assignments$#', [$slots, 'createAssignment']],

            ['PATCH', '#^/api/admin/assignments/(?P<id>\d+)$#', [$assignments, 'update']],
            ['POST', '#^/api/admin/assignments/(?P<id>\d+)/publish$#', [$assignments, 'publish']],

            ['GET', '#^/api/admin/activity$#', [$system, 'activity']],
            ['GET', '#^/api/admin/workflow-runs$#', [$system, 'workflowRuns']],
            ['GET', '#^/api/admin/settings$#', [$system, 'settings']],
            ['PATCH', '#^/api/admin/settings$#', [$system, 'updateSettings']],
            ['GET', '#^/api/admin/users$#', [$system, 'users']],
            ['POST', '#^/api/admin/users$#', [$system, 'createUser']],
            ['PATCH', '#^/api/admin/users/(?P<id>\d+)$#', [$system, 'updateUser']],

            ['GET', '#^/api/public/pages/(?P<slug>[-a-zA-Z0-9_]+)$#', [$public, 'page']],
            ['GET', '#^/api/public/galleries/(?P<slug>[-a-zA-Z0-9_]+)$#', [$public, 'gallery']],
            ['GET', '#^/api/public/navigation$#', [$public, 'navigation']],
            ['GET', '#^/api/public/settings/site$#', [$public, 'siteSettings']],
            ['GET', '#^/api/public/sync$#', [$public, 'sync']],
            ['POST', '#^/api/public/contact$#', [$public, 'contact']],

            ['POST', '#^/api/internal/workflow-runs/(?P<id>\d+)/heartbeat$#', [$internal, 'workflowHeartbeat']],
            ['POST', '#^/api/internal/workflow-runs/(?P<id>\d+)/complete$#', [$internal, 'workflowComplete']],
            ['POST', '#^/api/internal/media/(?P<id>\d+)/metadata$#', [$internal, 'mediaMetadata']],
            ['POST', '#^/api/internal/assignment-suggestions/bulk$#', [$internal, 'bulkSuggestions']],
        ];
    }

    public function run(HttpRequest $request): void
    {
        header('Access-Control-Allow-Origin: ' . (string) $this->config->get('cors.allow_origin', '*'));
        header('Access-Control-Allow-Headers: Authorization, Content-Type, X-Node-Red-Secret');
        header('Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS');

        if ($request->method === 'OPTIONS') {
            JsonResponse::send(['success' => true, 'message' => 'ok'], 200);
        }

        try {
            foreach ($this->routes as [$method, $pattern, $handler]) {
                if ($request->method !== $method) {
                    continue;
                }
                if (!preg_match($pattern, $request->path, $matches)) {
                    continue;
                }

                $params = array_filter($matches, static fn ($key): bool => !is_int($key), ARRAY_FILTER_USE_KEY);
                [$status, $payload] = $handler($request, $params);
                JsonResponse::send($payload, $status);
            }

            throw new HttpError(404, 'Route not found.');
        } catch (HttpError $error) {
            JsonResponse::send(
                ['success' => false, 'error' => $error->getMessage()] + $error->payload,
                $error->statusCode
            );
        } catch (Throwable $throwable) {
            $payload = ['success' => false, 'error' => 'Internal server error.'];
            if ($this->config->get('app.debug', false)) {
                $payload['debug'] = [
                    'message' => $throwable->getMessage(),
                    'trace' => $throwable->getTraceAsString(),
                ];
            }
            JsonResponse::send($payload, 500);
        }
    }
}
