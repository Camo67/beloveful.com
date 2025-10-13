// Database utilities and schema for admin system
// This will work with Cloudflare D1 database

export interface User {
  id: number;
  username: string;
  email: string;
  password_hash: string;
  role: 'admin' | 'editor';
  created_at: string;
  updated_at: string;
}

export interface Album {
  id: number;
  region: string;
  country: string;
  slug: string;
  description?: string;
  is_published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Image {
  id: number;
  album_id?: number;
  title?: string;
  description?: string;
  desktop_url: string;
  mobile_url: string;
  cloudinary_public_id?: string;
  is_published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface SlideshowImage {
  id: number;
  title?: string;
  desktop_url: string;
  mobile_url: string;
  cloudinary_public_id?: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface PageContent {
  id: number;
  page_key: string; // e.g., 'about', 'contact', 'workshops'
  content_key: string; // e.g., 'hero_text', 'description'
  content_value: string;
  content_type: 'text' | 'html' | 'markdown';
  updated_at: string;
}

export interface Settings {
  id: number;
  key: string;
  value: string;
  description?: string;
  updated_at: string;
}

// SQL Schema for database initialization
export const DB_SCHEMA = `
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
`;

// Helper functions for database operations
export const initializeDatabase = async (db: any) => {
  try {
    await db.exec(DB_SCHEMA);
    console.log('Database initialized successfully');
    return true;
  } catch (error) {
    console.error('Database initialization failed:', error);
    return false;
  }
};

// Default admin user creation
export const createDefaultAdmin = async (db: any) => {
  try {
    // Check if any admin users exist
    const result = await db.prepare("SELECT COUNT(*) as count FROM users WHERE role = 'admin'").first();
    
    if (result.count === 0) {
      // Create default admin user
      const hashedPassword = await hashPassword('admin123'); // You should change this!
      
      await db.prepare(`
        INSERT INTO users (username, email, password_hash, role)
        VALUES (?, ?, ?, ?)
      `).bind('admin', 'admin@beloveful.com', hashedPassword, 'admin').run();
      
      console.log('Default admin user created: admin / admin123');
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Failed to create default admin:', error);
    return false;
  }
};

// Password hashing utility (simple implementation - use bcrypt in production)
async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export { hashPassword };