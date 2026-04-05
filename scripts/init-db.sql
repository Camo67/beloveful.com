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

-- Privacy consent log (append-only)
CREATE TABLE IF NOT EXISTS privacy_consent_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  anonymous_consent_id TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('accepted', 'rejected', 'customized', 'withdrawn', 'unknown')),
  action TEXT NOT NULL CHECK (action IN ('accept_all', 'reject_non_essential', 'customize', 'withdraw', 'opt_out_sale_sharing', 'gpc_signal')),
  consent_version TEXT NOT NULL,
  policy_version TEXT NOT NULL,
  region_mode TEXT NOT NULL CHECK (region_mode IN ('opt_in', 'california', 'conservative')),
  categories_json TEXT NOT NULL,
  sale_sharing_opt_out BOOLEAN NOT NULL DEFAULT 0,
  gpc_signal BOOLEAN NOT NULL DEFAULT 0,
  ip_prefix TEXT,
  user_agent_summary TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- First-party privacy event log
CREATE TABLE IF NOT EXISTS privacy_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  anonymous_consent_id TEXT,
  session_id TEXT,
  pseudonymous_user_id TEXT,
  event_name TEXT NOT NULL,
  event_category TEXT NOT NULL CHECK (event_category IN ('necessary', 'analytics', 'personalization', 'advertising')),
  path TEXT,
  referrer_path TEXT,
  payload_json TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Privacy request intake
CREATE TABLE IF NOT EXISTS privacy_requests (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  request_type TEXT NOT NULL,
  identifier_type TEXT NOT NULL,
  identifier_value TEXT NOT NULL,
  identifier_hash TEXT NOT NULL,
  contact_email TEXT,
  details TEXT,
  status TEXT NOT NULL DEFAULT 'submitted',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_albums_region ON albums(region);
CREATE INDEX IF NOT EXISTS idx_albums_slug ON albums(slug);
CREATE INDEX IF NOT EXISTS idx_images_album_id ON images(album_id);
CREATE INDEX IF NOT EXISTS idx_images_published ON images(is_published);
CREATE INDEX IF NOT EXISTS idx_slideshow_order ON slideshow_images(sort_order);
CREATE INDEX IF NOT EXISTS idx_page_content_page ON page_content(page_key);
CREATE INDEX IF NOT EXISTS idx_privacy_consent_log_consent_id ON privacy_consent_log(anonymous_consent_id);
CREATE INDEX IF NOT EXISTS idx_privacy_consent_log_created_at ON privacy_consent_log(created_at);
CREATE INDEX IF NOT EXISTS idx_privacy_events_consent_id ON privacy_events(anonymous_consent_id);
CREATE INDEX IF NOT EXISTS idx_privacy_events_created_at ON privacy_events(created_at);
CREATE INDEX IF NOT EXISTS idx_privacy_requests_identifier_hash ON privacy_requests(identifier_hash);
CREATE INDEX IF NOT EXISTS idx_privacy_requests_contact_email ON privacy_requests(contact_email);
CREATE INDEX IF NOT EXISTS idx_privacy_requests_created_at ON privacy_requests(created_at);

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

CREATE TRIGGER IF NOT EXISTS privacy_requests_updated_at
  AFTER UPDATE ON privacy_requests
  BEGIN
    UPDATE privacy_requests SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
  END;

-- Insert default admin user (password: admin123)
-- You should change this password after first login!
INSERT OR IGNORE INTO users (username, email, password_hash, role)
VALUES ('admin', 'admin@beloveful.com', '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9', 'admin');

-- Insert some initial page content
INSERT OR IGNORE INTO page_content (page_key, content_key, content_value, content_type)
VALUES 
  ('about', 'hero_title', 'About Beloveful Visions', 'text'),
  ('about', 'hero_description', 'Capturing moments that matter, creating memories that last.', 'text'),
  ('contact', 'email', 'tony@beloveful.com', 'text'),
  ('contact', 'message', 'Get in touch to discuss your photography needs.', 'text'),
  ('workshops', 'title', 'Photography Workshops', 'text'),
  ('workshops', 'description', 'Join our workshops to improve your photography skills.', 'text');

-- Insert settings
INSERT OR IGNORE INTO settings (key, value, description)
VALUES 
  ('site_title', 'Beloveful Visions', 'Main site title'),
  ('site_description', 'Professional Travel Photography', 'Site description for SEO'),
  ('contact_email', 'tony@beloveful.com', 'Main contact email'),
  ('print_email', 'tony@beloveful.com', 'Print inquiry email'),
  ('calendly_url', '', 'Calendly scheduling link'),
  ('social_instagram', '@belovefulvisions', 'Instagram handle'),
  ('cloudinary_folder', 'portfolio', 'Default Cloudinary folder for uploads');
