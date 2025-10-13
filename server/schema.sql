-- Users table for admin authentication
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT DEFAULT 'admin',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Regions table
CREATE TABLE IF NOT EXISTS regions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    sort_order INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Albums table (countries)
CREATE TABLE IF NOT EXISTS albums (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    region_id INTEGER NOT NULL,
    country TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    cover_image_desktop TEXT,
    cover_image_mobile TEXT,
    sort_order INTEGER DEFAULT 0,
    is_published BOOLEAN DEFAULT true,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (region_id) REFERENCES regions(id) ON DELETE CASCADE
);

-- Images table
CREATE TABLE IF NOT EXISTS images (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    album_id INTEGER NOT NULL,
    desktop_url TEXT NOT NULL,
    mobile_url TEXT NOT NULL,
    title TEXT,
    description TEXT,
    alt_text TEXT,
    sort_order INTEGER DEFAULT 0,
    is_published BOOLEAN DEFAULT true,
    metadata TEXT, -- JSON metadata
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (album_id) REFERENCES albums(id) ON DELETE CASCADE
);

-- Slideshow images table
CREATE TABLE IF NOT EXISTS slideshow_images (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    desktop_url TEXT NOT NULL,
    mobile_url TEXT NOT NULL,
    title TEXT,
    description TEXT,
    alt_text TEXT,
    sort_order INTEGER DEFAULT 0,
    is_published BOOLEAN DEFAULT true,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Content blocks table for dynamic page content
CREATE TABLE IF NOT EXISTS content_blocks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    page TEXT NOT NULL, -- 'about', 'workshops', 'contact', etc.
    block_type TEXT NOT NULL, -- 'text', 'image', 'gallery', 'hero', etc.
    title TEXT,
    content TEXT, -- HTML or markdown content
    image_url TEXT,
    settings TEXT, -- JSON settings for the block
    sort_order INTEGER DEFAULT 0,
    is_published BOOLEAN DEFAULT true,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Site settings table
CREATE TABLE IF NOT EXISTS site_settings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    key TEXT UNIQUE NOT NULL,
    value TEXT,
    description TEXT,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Insert default regions
INSERT OR IGNORE INTO regions (name, slug, sort_order) VALUES
('Africa', 'africa', 1),
('Asia', 'asia', 2),
('Middle East', 'middle-east', 3),
('South America', 'south-america', 4),
('North America', 'north-america', 5),
('Europe', 'europe', 6),
('Oceania', 'oceania', 7),
('Erasing Borders', 'erasing-borders', 8);

-- Insert default site settings
INSERT OR IGNORE INTO site_settings (key, value, description) VALUES
('site_title', 'Beloveful Visions', 'Main site title'),
('site_description', 'Travel Photography Portfolio', 'Site description'),
('photographer_name', 'Your Name', 'Photographer name'),
('contact_email', 'contact@beloveful.com', 'Contact email'),
('instagram_url', '', 'Instagram profile URL'),
('cloudinary_cloud_name', 'dvwdoezk1', 'Cloudinary cloud name');

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_albums_region_id ON albums(region_id);
CREATE INDEX IF NOT EXISTS idx_albums_slug ON albums(slug);
CREATE INDEX IF NOT EXISTS idx_images_album_id ON images(album_id);
CREATE INDEX IF NOT EXISTS idx_images_sort_order ON images(sort_order);
CREATE INDEX IF NOT EXISTS idx_slideshow_sort_order ON slideshow_images(sort_order);
CREATE INDEX IF NOT EXISTS idx_content_blocks_page ON content_blocks(page);
CREATE INDEX IF NOT EXISTS idx_content_blocks_sort_order ON content_blocks(sort_order);
CREATE INDEX IF NOT EXISTS idx_site_settings_key ON site_settings(key);