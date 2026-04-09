INSERT INTO users (name, email, password_hash, role, status)
VALUES (
    'admin',
    'admin@beloveful.com',
    '$2y$10$s4dxqAtF7JrGOXUQ7j7b5u1rVwJ3T2qM0W4zv4VQpm5P9G/9Su3We',
    'admin',
    'active'
)
ON DUPLICATE KEY UPDATE email = VALUES(email);

INSERT INTO settings (`key`, value_json)
VALUES
    ('site.title', JSON_OBJECT('value', 'Beloveful')),
    ('site.description', JSON_OBJECT('value', 'Beloveful photography and storytelling')),
    ('site.contact_email', JSON_OBJECT('value', 'tony@beloveful.com')),
    ('paths.site_root', JSON_OBJECT('value', '/public_html/beloveful.com/public_html')),
    ('paths.media_root', JSON_OBJECT('value', '/public_html/beloveful.com/public_html/images')),
    ('paths.site_asset_root', JSON_OBJECT('value', '/public_html/beloveful.com/public_html/site-assets'))
ON DUPLICATE KEY UPDATE value_json = VALUES(value_json);

INSERT INTO pages (slug, title, template_key, status, seo_title, seo_description)
VALUES
    ('home', 'Home', 'homepage', 'published', 'Beloveful', 'Beloveful home page'),
    ('about', 'About', 'content-page', 'draft', 'About Beloveful', 'About the photographer'),
    ('contact', 'Contact', 'content-page', 'draft', 'Contact Beloveful', 'Contact page')
ON DUPLICATE KEY UPDATE title = VALUES(title);
