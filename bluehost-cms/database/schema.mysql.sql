CREATE TABLE IF NOT EXISTS users (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    email VARCHAR(190) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('admin', 'editor') NOT NULL DEFAULT 'editor',
    status ENUM('active', 'disabled') NOT NULL DEFAULT 'active',
    last_login_at DATETIME NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS admin_sessions (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL,
    token_hash CHAR(64) NOT NULL UNIQUE,
    expires_at DATETIME NOT NULL,
    revoked_at DATETIME NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_admin_sessions_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_admin_sessions_user (user_id),
    INDEX idx_admin_sessions_expires (expires_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS revisions (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    entity_type VARCHAR(64) NOT NULL,
    entity_id BIGINT UNSIGNED NOT NULL,
    before_json LONGTEXT NULL,
    after_json LONGTEXT NULL,
    summary VARCHAR(255) NULL,
    changed_by BIGINT UNSIGNED NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_revisions_entity (entity_type, entity_id),
    INDEX idx_revisions_changed_by (changed_by)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS pages (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    slug VARCHAR(160) NOT NULL UNIQUE,
    title VARCHAR(190) NOT NULL,
    template_key VARCHAR(120) NOT NULL,
    status ENUM('draft', 'published', 'archived') NOT NULL DEFAULT 'draft',
    seo_title VARCHAR(255) NULL,
    seo_description TEXT NULL,
    published_revision_id BIGINT UNSIGNED NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_pages_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS page_sections (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    page_id BIGINT UNSIGNED NOT NULL,
    section_key VARCHAR(120) NOT NULL,
    label VARCHAR(190) NOT NULL,
    section_type VARCHAR(80) NOT NULL,
    sort_order INT NOT NULL DEFAULT 0,
    status ENUM('draft', 'published', 'archived') NOT NULL DEFAULT 'draft',
    settings_json JSON NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_page_sections_page FOREIGN KEY (page_id) REFERENCES pages(id) ON DELETE CASCADE,
    UNIQUE KEY uq_page_section_key (page_id, section_key),
    INDEX idx_page_sections_page (page_id, sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS content_fields (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    page_section_id BIGINT UNSIGNED NOT NULL,
    field_key VARCHAR(120) NOT NULL,
    field_type ENUM('text', 'html', 'markdown', 'json') NOT NULL DEFAULT 'text',
    field_value LONGTEXT NULL,
    status ENUM('draft', 'published', 'archived') NOT NULL DEFAULT 'draft',
    updated_by BIGINT UNSIGNED NULL,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_content_fields_section FOREIGN KEY (page_section_id) REFERENCES page_sections(id) ON DELETE CASCADE,
    UNIQUE KEY uq_content_fields_key (page_section_id, field_key),
    INDEX idx_content_fields_section (page_section_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS media_assets (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    filename VARCHAR(255) NOT NULL,
    absolute_path TEXT NOT NULL,
    public_url TEXT NOT NULL,
    mime_type VARCHAR(120) NULL,
    width INT NULL,
    height INT NULL,
    bytes BIGINT UNSIGNED NULL,
    checksum CHAR(64) NULL,
    alt_text TEXT NULL,
    caption TEXT NULL,
    credit VARCHAR(255) NULL,
    status ENUM('draft', 'published', 'archived', 'processing', 'failed') NOT NULL DEFAULT 'draft',
    source_type ENUM('cpanel', 'ftp', 'manual') NOT NULL DEFAULT 'cpanel',
    uploaded_by BIGINT UNSIGNED NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_media_assets_status (status),
    INDEX idx_media_assets_uploaded_by (uploaded_by),
    INDEX idx_media_assets_checksum (checksum)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS media_variants (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    media_asset_id BIGINT UNSIGNED NOT NULL,
    variant_key ENUM('original', 'web', 'thumb') NOT NULL,
    absolute_path TEXT NOT NULL,
    public_url TEXT NOT NULL,
    width INT NULL,
    height INT NULL,
    format VARCHAR(30) NULL,
    bytes BIGINT UNSIGNED NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_media_variants_asset FOREIGN KEY (media_asset_id) REFERENCES media_assets(id) ON DELETE CASCADE,
    UNIQUE KEY uq_media_variant (media_asset_id, variant_key)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS media_tags (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    media_asset_id BIGINT UNSIGNED NOT NULL,
    tag VARCHAR(120) NOT NULL,
    CONSTRAINT fk_media_tags_asset FOREIGN KEY (media_asset_id) REFERENCES media_assets(id) ON DELETE CASCADE,
    UNIQUE KEY uq_media_tag (media_asset_id, tag),
    INDEX idx_media_tag (tag)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS galleries (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    slug VARCHAR(160) NOT NULL UNIQUE,
    title VARCHAR(190) NOT NULL,
    description TEXT NULL,
    status ENUM('draft', 'published', 'archived') NOT NULL DEFAULT 'draft',
    cover_media_id BIGINT UNSIGNED NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_galleries_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS gallery_items (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    gallery_id BIGINT UNSIGNED NOT NULL,
    media_asset_id BIGINT UNSIGNED NOT NULL,
    sort_order INT NOT NULL DEFAULT 0,
    status ENUM('draft', 'published', 'archived') NOT NULL DEFAULT 'draft',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_gallery_items_gallery FOREIGN KEY (gallery_id) REFERENCES galleries(id) ON DELETE CASCADE,
    CONSTRAINT fk_gallery_items_asset FOREIGN KEY (media_asset_id) REFERENCES media_assets(id) ON DELETE CASCADE,
    UNIQUE KEY uq_gallery_media (gallery_id, media_asset_id),
    INDEX idx_gallery_items_gallery (gallery_id, sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS slot_definitions (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    slot_key VARCHAR(190) NOT NULL UNIQUE,
    entity_type ENUM('page', 'section', 'gallery', 'global') NOT NULL,
    entity_ref VARCHAR(190) NOT NULL,
    label VARCHAR(190) NOT NULL,
    allowed_count INT NOT NULL DEFAULT 1,
    settings_json JSON NULL,
    is_required TINYINT(1) NOT NULL DEFAULT 0,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_slot_entity (entity_type, entity_ref)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS workflow_runs (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    flow_name VARCHAR(120) NOT NULL,
    trigger_action VARCHAR(120) NOT NULL,
    entity_type VARCHAR(64) NOT NULL,
    entity_id BIGINT UNSIGNED NULL,
    status ENUM('queued', 'running', 'completed', 'failed') NOT NULL DEFAULT 'queued',
    input_json LONGTEXT NULL,
    output_json LONGTEXT NULL,
    error_text TEXT NULL,
    started_at DATETIME NULL,
    finished_at DATETIME NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_workflow_status (status, created_at),
    INDEX idx_workflow_entity (entity_type, entity_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS slot_assignments (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    slot_definition_id BIGINT UNSIGNED NOT NULL,
    media_asset_id BIGINT UNSIGNED NOT NULL,
    assignment_source ENUM('manual', 'suggested') NOT NULL DEFAULT 'manual',
    status ENUM('draft', 'published', 'archived') NOT NULL DEFAULT 'draft',
    alt_override TEXT NULL,
    caption_override TEXT NULL,
    assigned_by BIGINT UNSIGNED NULL,
    published_at DATETIME NULL,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_slot_assignments_slot FOREIGN KEY (slot_definition_id) REFERENCES slot_definitions(id) ON DELETE CASCADE,
    CONSTRAINT fk_slot_assignments_asset FOREIGN KEY (media_asset_id) REFERENCES media_assets(id) ON DELETE CASCADE,
    INDEX idx_slot_assignments_slot (slot_definition_id, status),
    INDEX idx_slot_assignments_asset (media_asset_id, status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS assignment_suggestions (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    slot_definition_id BIGINT UNSIGNED NOT NULL,
    media_asset_id BIGINT UNSIGNED NOT NULL,
    score DECIMAL(8, 4) NOT NULL DEFAULT 0,
    reason_json JSON NULL,
    status ENUM('pending', 'accepted', 'rejected', 'expired') NOT NULL DEFAULT 'pending',
    workflow_run_id BIGINT UNSIGNED NULL,
    reviewed_by BIGINT UNSIGNED NULL,
    reviewed_at DATETIME NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_assignment_suggestions_slot FOREIGN KEY (slot_definition_id) REFERENCES slot_definitions(id) ON DELETE CASCADE,
    CONSTRAINT fk_assignment_suggestions_asset FOREIGN KEY (media_asset_id) REFERENCES media_assets(id) ON DELETE CASCADE,
    UNIQUE KEY uq_slot_suggestion (slot_definition_id, media_asset_id, status),
    INDEX idx_assignment_suggestions_status (status, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS audit_log (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    actor_user_id BIGINT UNSIGNED NULL,
    action VARCHAR(190) NOT NULL,
    entity_type VARCHAR(64) NOT NULL,
    entity_id BIGINT UNSIGNED NULL,
    metadata_json LONGTEXT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_audit_entity (entity_type, entity_id),
    INDEX idx_audit_actor (actor_user_id),
    INDEX idx_audit_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS settings (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `key` VARCHAR(190) NOT NULL UNIQUE,
    value_json LONGTEXT NULL,
    updated_by BIGINT UNSIGNED NULL,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
