-- Database initialization for Beloveful Visions Admin System
-- Run this with: wrangler d1 execute beloveful-cms --file=scripts/init-db.sql

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'editor' CHECK (role IN ('admin', 'editor')),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Albums table
CREATE TABLE IF NOT EXISTS albums (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  region TEXT NOT NULL,
  country TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  is_published BOOLEAN DEFAULT 1,
  sort_order INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Images table
CREATE TABLE IF NOT EXISTS images (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  album_id INTEGER,
  title TEXT,
  description TEXT,
  desktop_url TEXT NOT NULL,
  mobile_url TEXT NOT NULL,
  cloudinary_public_id TEXT,
  is_published BOOLEAN DEFAULT 1,
  sort_order INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (album_id) REFERENCES albums (id) ON DELETE SET NULL
);

-- Slideshow images table
CREATE TABLE IF NOT EXISTS slideshow_images (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT,
  desktop_url TEXT NOT NULL,
  mobile_url TEXT NOT NULL,
  cloudinary_public_id TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Page content table
CREATE TABLE IF NOT EXISTS page_content (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  page_key TEXT NOT NULL,
  content_key TEXT NOT NULL,
  content_value TEXT NOT NULL,
  content_type TEXT NOT NULL DEFAULT 'text' CHECK (content_type IN ('text', 'html', 'markdown')),
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(page_key, content_key)
);

-- Settings table
CREATE TABLE IF NOT EXISTS settings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL,
  description TEXT,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_albums_region ON albums(region);
CREATE INDEX IF NOT EXISTS idx_albums_slug ON albums(slug);
CREATE INDEX IF NOT EXISTS idx_images_album_id ON images(album_id);
CREATE INDEX IF NOT EXISTS idx_images_published ON images(is_published);
CREATE INDEX IF NOT EXISTS idx_slideshow_order ON slideshow_images(sort_order);
CREATE INDEX IF NOT EXISTS idx_page_content_page ON page_content(page_key);

-- Triggers to update timestamps
CREATE TRIGGER IF NOT EXISTS users_updated_at 
  AFTER UPDATE ON users 
  BEGIN 
    UPDATE users SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id; 
  END;

CREATE TRIGGER IF NOT EXISTS albums_updated_at 
  AFTER UPDATE ON albums 
  BEGIN 
    UPDATE albums SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id; 
  END;

CREATE TRIGGER IF NOT EXISTS images_updated_at 
  AFTER UPDATE ON images 
  BEGIN 
    UPDATE images SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id; 
  END;

CREATE TRIGGER IF NOT EXISTS slideshow_updated_at 
  AFTER UPDATE ON slideshow_images 
  BEGIN 
    UPDATE slideshow_images SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id; 
  END;

CREATE TRIGGER IF NOT EXISTS page_content_updated_at 
  AFTER UPDATE ON page_content 
  BEGIN 
    UPDATE page_content SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id; 
  END;

CREATE TRIGGER IF NOT EXISTS settings_updated_at 
  AFTER UPDATE ON settings 
  BEGIN 
    UPDATE settings SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id; 
  END;

-- Insert default admin user (password: admin123)
-- You should change this password after first login!
INSERT OR IGNORE INTO users (username, email, password_hash, role)
VALUES ('admin', 'admin@beloveful.com', 'ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f', 'admin');

-- Insert some initial page content
INSERT OR IGNORE INTO page_content (page_key, content_key, content_value, content_type)
VALUES 
  ('about', 'hero_title', 'About Beloveful Visions', 'text'),
  ('about', 'hero_description', 'Capturing moments that matter, creating memories that last.', 'text'),
  ('contact', 'email', 'hello@beloveful.com', 'text'),
  ('contact', 'message', 'Get in touch to discuss your photography needs.', 'text'),
  ('workshops', 'title', 'Photography Workshops', 'text'),
  ('workshops', 'description', 'Join our workshops to improve your photography skills.', 'text');

-- Insert settings
INSERT OR IGNORE INTO settings (key, value, description)
VALUES 
  ('site_title', 'Beloveful Visions', 'Main site title'),
  ('site_description', 'Professional Travel Photography', 'Site description for SEO'),
  ('contact_email', 'hello@beloveful.com', 'Main contact email'),
  ('social_instagram', '@belovefulvisions', 'Instagram handle'),
  ('cloudinary_folder', 'portfolio', 'Default Cloudinary folder for uploads');