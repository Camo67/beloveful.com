# Beloveful Visions CMS Backend

This document outlines the new content management system (CMS) backend for the Beloveful Visions photography portfolio website.

## Overview

The CMS backend provides:
- **Image Management**: Upload, organize, and manage photography albums and slideshow images
- **Content Management**: Create and edit dynamic content blocks for all pages  
- **User Authentication**: Secure admin login system
- **Drag & Drop**: Reorder images, albums, and content blocks
- **API Integration**: RESTful APIs for all content operations
- **Cloudflare Integration**: Runs on Cloudflare Workers with D1 database

## Architecture

### Backend Stack
- **Runtime**: Cloudflare Workers
- **Framework**: Hono (lightweight web framework)
- **Database**: Cloudflare D1 (SQLite)
- **Authentication**: JWT tokens with bcrypt password hashing
- **Image Storage**: Cloudinary (existing)

### Frontend Integration
- **Dynamic Data**: React hooks fetch content from APIs with static data fallbacks
- **Admin Interface**: React-based admin dashboard
- **Authentication**: Token-based admin authentication
- **Loading States**: Graceful loading and error handling

## Database Schema

### Core Tables
- `users` - Admin user accounts
- `regions` - Photo regions (Africa, Asia, etc.)
- `albums` - Country-specific photo albums
- `images` - Individual photos with desktop/mobile URLs
- `slideshow_images` - Homepage slideshow images
- `content_blocks` - Dynamic page content
- `site_settings` - Global site configuration

### Key Features
- **Hierarchical Structure**: Regions → Albums → Images
- **Sort Ordering**: Drag-and-drop reordering support
- **Publishing Control**: Draft/published status for all content
- **Metadata Storage**: Title, description, alt text for images
- **Flexible Content**: JSON settings for advanced block configurations

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

This installs the new backend dependencies:
- `hono` - Web framework for Cloudflare Workers
- `bcryptjs` - Password hashing
- `@types/bcryptjs` - TypeScript definitions
- `wrangler` - Cloudflare Workers CLI

### 2. Create Cloudflare D1 Database

```bash
# Create the database
npm run db:create
```

This will output a database ID. Copy this ID and update `wrangler.toml`:

```toml
[[d1_databases]]
binding = "DB"
database_name = "beloveful-cms"
database_id = "YOUR_DATABASE_ID_HERE"
```

### 3. Set Up Environment Variables

Create a `.dev.vars` file in the project root:

```env
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random
```

For production, set this in Cloudflare Workers:

```bash
wrangler secret put JWT_SECRET
```

### 4. Initialize Database Schema

```bash
# For local development
npm run db:migrate:local

# For production
npm run db:migrate
```

### 5. Create Admin User

Navigate to `/admin` in your browser and you'll see a setup page to create the initial admin user.

Or use the API directly:

```bash
curl -X POST https://your-domain.com/api/auth/setup \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "email": "admin@beloveful.com",
    "password": "your-secure-password"
  }'
```

### 6. Migrate Existing Data

Import your current static album and slideshow data:

```bash
# This will populate the database with your existing content
curl -X POST https://your-domain.com/migrate
```

## Development Workflow

### Local Development

```bash
# Start frontend development server
npm run dev

# Start Cloudflare Workers locally (in another terminal)
npm run dev:worker
```

The frontend will proxy API requests to the Workers dev server.

### Building and Deployment

```bash
# Build and deploy to Cloudflare
npm run deploy
```

This runs `vite build` and `wrangler deploy`.

## API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/verify` - Verify JWT token
- `POST /api/auth/setup` - Create initial admin user
- `POST /api/auth/change-password` - Change password

### Albums
- `GET /api/albums` - Get all published albums
- `GET /api/albums/:region/:country` - Get specific album
- `POST /api/albums/admin/create` - Create new album (auth required)
- `PUT /api/albums/admin/:id` - Update album (auth required)
- `DELETE /api/albums/admin/:id` - Delete album (auth required)

### Images
- `GET /api/images/slideshow` - Get slideshow images
- `GET /api/images/album/:albumId` - Get album images
- `POST /api/images/admin/add-to-album` - Add image to album (auth required)
- `POST /api/images/admin/add-to-slideshow` - Add slideshow image (auth required)
- `PUT /api/images/admin/album/:albumId/reorder` - Reorder album images (auth required)

### Content
- `GET /api/content/:page` - Get page content blocks
- `GET /api/content/site/settings` - Get site settings
- `POST /api/content/admin/blocks` - Create content block (auth required)
- `PUT /api/content/admin/blocks/:id` - Update content block (auth required)

## Admin Interface

### Dashboard Features
- **Overview**: Statistics and quick actions
- **Albums Management**: Create, edit, delete, and reorder albums
- **Image Management**: Upload, organize, and manage images
- **Slideshow Management**: Update homepage slideshow
- **Content Management**: Edit page content blocks with drag-and-drop
- **Settings**: Site configuration and admin preferences

### Access
Navigate to `/admin` to access the admin interface. You'll need to log in with your admin credentials.

### Image Upload
Images are uploaded directly to Cloudinary from the frontend. The backend stores metadata and URLs.

## Content Block System

### Block Types
- **Hero Section**: Large banner with background image
- **Text Block**: Rich text content
- **Image Block**: Single image with caption
- **Gallery**: Collection of images
- **Contact Form**: Customizable contact form
- **Testimonial**: Customer quotes
- **Call to Action**: Buttons and links
- **Video**: Embedded video content

### Block Management
- **Drag & Drop**: Reorder blocks on any page
- **Live Preview**: See changes immediately
- **Draft/Publish**: Control when content goes live
- **Custom Settings**: JSON configuration for advanced features

## Migration from Static Data

The system maintains compatibility with your existing static data structure while adding dynamic capabilities:

1. **Fallback System**: If APIs fail, static data is used
2. **Progressive Enhancement**: New features work alongside existing code
3. **Gradual Migration**: Move content to CMS over time
4. **Data Import**: Automated import of existing albums and slideshow images

## Security Features

- **JWT Authentication**: Secure token-based admin access
- **Password Hashing**: bcrypt for secure password storage
- **CORS Protection**: Restricted API access
- **Input Validation**: All inputs validated and sanitized
- **Role-Based Access**: Admin-only routes protected
- **Rate Limiting**: Protection against abuse (via Cloudflare)

## Performance Optimizations

- **Edge Deployment**: Runs on Cloudflare's global edge network
- **Database Optimization**: Indexed queries and efficient schema
- **Caching**: 5-minute cache for public APIs
- **Fallback Data**: Instant loading with static data fallbacks
- **Lazy Loading**: Admin interface loads components on demand

## Troubleshooting

### Common Issues

1. **Database Connection Errors**
   - Verify `database_id` in `wrangler.toml`
   - Check that database was created successfully

2. **Authentication Issues**
   - Ensure `JWT_SECRET` is set in environment
   - Check token expiration (7 days default)

3. **Migration Failures**
   - Verify static data imports correctly
   - Check console for detailed error messages

4. **Image Upload Issues**
   - Confirm Cloudinary credentials are correct
   - Check CORS settings for your domain

### Getting Help

- Check browser console for client-side errors
- View Cloudflare Workers logs for server-side issues
- Verify API responses using browser dev tools
- Test individual endpoints with curl

## Future Enhancements

### Planned Features
- **Bulk Image Upload**: Upload multiple images at once
- **Advanced SEO**: Meta tags and structured data management
- **Analytics Integration**: Track content performance
- **Backup System**: Automated database backups
- **Multi-user Support**: Multiple admin accounts with different permissions
- **Content Scheduling**: Schedule content to publish at specific times
- **Theme Customization**: Visual theme editor
- **API Webhooks**: Trigger external services on content changes

### Integration Opportunities
- **Social Media**: Auto-post new content to social platforms
- **Email Marketing**: Notify subscribers of new content
- **Search Enhancement**: Full-text search across all content
- **CDN Integration**: Automatic image optimization
- **Mobile App**: React Native app for mobile content management

This CMS backend provides a solid foundation for managing your photography portfolio while maintaining the performance and security of your existing Cloudflare Workers deployment.