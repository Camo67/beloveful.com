# Beloveful Visions Admin System Setup Guide

This guide will help you deploy and configure your new admin content management system.

## Overview

You now have a complete admin system that allows you to:
- ✅ **Manage Albums**: Create, edit, and organize country/region albums
- ✅ **Upload Images**: Drag-and-drop image uploads with Cloudinary integration
- ✅ **Manage Slideshow**: Control homepage slideshow images
- ✅ **Edit Content**: Manage page text and content blocks
- ✅ **User Authentication**: Secure admin login with JWT tokens
- ✅ **Database**: Cloudflare D1 for data storage

## 🚀 Deployment Steps

### 1. Initialize the Database

Run this command to set up your database schema:

```bash
wrangler d1 execute beloveful-cms --file=scripts/init-db.sql
```

This will create all necessary tables and insert a default admin user.

### 2. Set Up Environment Variables

Set these secrets in Cloudflare Workers:

```bash
# JWT secret for authentication (use a strong random string)
wrangler secret put JWT_SECRET

# Your Cloudinary credentials
wrangler secret put CLOUDINARY_CLOUD_NAME
wrangler secret put CLOUDINARY_API_KEY  
wrangler secret put CLOUDINARY_API_SECRET
```

You can find your Cloudinary credentials in your [Cloudinary dashboard](https://cloudinary.com/console).

### 3. Build and Deploy

```bash
# Build the application
npm run build

# Deploy to Cloudflare Workers
wrangler deploy
```

### 4. Access the Admin Panel

After deployment, you can access your admin panel at:
- **URL**: `https://beloveful.com/admin`
- **Username**: `admin`
- **Password**: `admin123`

⚠️ **IMPORTANT**: Change the default password immediately after first login!

## 🔧 Configuration

### Default Admin Login
- Username: `admin`
- Password: `admin123`
- Email: `admin@beloveful.com`

### Cloudinary Integration
The system automatically:
- Uploads images to your Cloudinary account
- Creates both desktop (2000px) and mobile (800px) versions
- Organizes files in folders (default: "portfolio")
- Generates optimized URLs with transformations

### Database Schema
The system uses these main tables:
- `users` - Admin user accounts
- `albums` - Photo albums/countries
- `images` - Individual photos with metadata
- `slideshow_images` - Homepage slideshow
- `page_content` - Editable page content
- `settings` - Site configuration

## 📱 Admin Features

### Albums Management
- Create new country/region albums
- Set publication status (published/draft)
- Organize with sort ordering
- Track image counts per album

### Image Upload
- Drag-and-drop interface
- Bulk upload support
- Automatic Cloudinary integration
- Title and description metadata
- Album assignment

### Slideshow Management
- Upload slideshow images
- Set display order
- Enable/disable images
- Desktop and mobile versions

### Content Management
- Edit page text content
- Manage site settings
- Update contact information
- Configure social media links

## 🔒 Security Features

- JWT-based authentication
- Password hashing with SHA-256
- Role-based access (admin/editor)
- Secure API endpoints
- Token expiration (24 hours)

## 🚨 Important Notes

1. **Change Default Password**: The system creates a default admin user with password `admin123`. Change this immediately!

2. **Environment Variables**: Make sure all Cloudinary secrets are properly set in your Cloudflare Workers environment.

3. **Database**: Your D1 database is already configured in `wrangler.toml`. The initialization script will set up all tables.

4. **Image Storage**: Images are stored in Cloudinary, not in your Workers. This provides better performance and CDN delivery.

5. **Static Data Migration**: Your existing static data in `src/lib/data.ts` will continue to work. The admin system adds database functionality on top.

## 🔄 Migration from Static Data

To migrate your existing images and albums to the database:

1. Log into the admin panel
2. Go to the dashboard
3. Click "Import Data" to migrate your static content
4. This will create database entries for all your existing albums and images

## 🛠 Troubleshooting

### Admin Panel Won't Load
- Check that your D1 database is properly initialized
- Verify JWT_SECRET is set in Cloudflare Workers
- Check browser console for API errors

### Image Upload Fails
- Verify Cloudinary credentials are set correctly
- Check Cloudinary upload quotas and limits
- Ensure image files are valid formats (JPG, PNG, WebP)

### Authentication Issues
- Check JWT_SECRET environment variable
- Clear browser localStorage and try again
- Verify database connection and user table

## 📞 Support

If you need help with the admin system:
1. Check the browser console for error messages
2. Verify all environment variables are set
3. Test the API endpoints directly
4. Check Cloudflare Workers logs for backend errors

## 🎯 Next Steps

After successful deployment:

1. **Change admin password**
2. **Upload some test images**
3. **Create your first album**
4. **Update page content**
5. **Configure site settings**
6. **Import existing data**

Your admin system is now ready to use! 🎉