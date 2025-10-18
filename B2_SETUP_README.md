# Backblaze B2 Dynamic Image System

This system replaces static Cloudinary images with a dynamic Backblaze B2 solution that provides:
- **Lazy loading** with intersection observer
- **No duplicates** - each image stored once with multiple size variants
- **Dynamic upload system** with drag & drop interface
- **Organized file structure** by region and country
- **Admin interface** for managing images
- **Cost optimization** - only pay for what you use

## 🚀 Quick Setup

### 1. Create Backblaze B2 Account & Bucket

1. Sign up at [backblaze.com](https://www.backblaze.com/b2/cloud-storage.html)
2. Create a new bucket:
   - **Bucket Name**: `beloveful-images` (or your preferred name)
   - **Files in Bucket are**: Public
   - **Object Lock**: Disabled

### 2. Get Your Credentials

1. Go to **App Keys** in your B2 account
2. Use the provided credentials:
   - **Key ID**: `00371432da9a71d0000000001`
   - **Application Key**: [Your actual key from Backblaze]
   - **Bucket ID**: [Your bucket ID from Backblaze]

### 3. Configure Environment Variables

Copy the credentials to your environment:

```bash
cp .env.example .env.local
```

Update `.env.local` with your B2 credentials:

```env
# Backblaze B2 Configuration
VITE_B2_APPLICATION_KEY=your_actual_application_key_here
VITE_B2_BUCKET_ID=your_actual_bucket_id_here
```

### 4. Update B2 Configuration

Edit `src/lib/b2-config.ts`:

```typescript
export const B2_CONFIG = {
  keyId: '00371432da9a71d0000000001',
  applicationKey: process.env.VITE_B2_APPLICATION_KEY || '',
  bucketId: process.env.VITE_B2_BUCKET_ID || '',
  bucketName: 'your-actual-bucket-name', // Replace with your bucket name
  downloadUrl: 'https://f005.backblazeb2.com', // Replace with your bucket's download URL
  // ... rest of config
};
```

To find your bucket's download URL:
1. Go to your B2 bucket in the web interface
2. Look for the "Endpoint" or "Download URL"
3. It will be something like `https://f005.backblazeb2.com`

## 📁 File Organization

The system organizes images in a structured hierarchy:

```
bucket/
├── portfolio/
│   ├── africa/
│   │   ├── morocco/
│   │   │   ├── image1.jpg
│   │   │   └── image2.jpg
│   │   └── egypt/
│   ├── asia/
│   │   ├── india/
│   │   └── china/
│   └── ...
├── slideshow/
│   ├── 2024-01-15/
│   │   ├── slide1.jpg
│   │   └── slide2.jpg
│   └── ...
└── assets/
    └── logos/
        └── logo.png
```

## 🖼️ Using the Image Manager

### Accessing the Admin Interface

1. Navigate to `/admin` in your browser
2. Login with your admin credentials
3. Go to **Images** → **Upload** to access the B2 Image Manager

### Uploading Images

1. **Select Upload Type**:
   - **Portfolio**: For country/region galleries
   - **Slideshow**: For homepage slideshow
   - **Logo**: For logos and assets

2. **Configure Location** (for Portfolio uploads):
   - Choose Region (Africa, Asia, etc.)
   - Enter Country name

3. **Upload Images**:
   - Drag and drop images onto the upload area
   - Or click "Choose Images" to browse files
   - Supports: JPG, PNG, WebP (max 50MB per image)

4. **Monitor Progress**:
   - Real-time upload progress
   - Success/error feedback
   - Automatic retry on failures

### Managing Existing Images

- **Load Images**: Click "Load Images" to view existing files
- **View Details**: Click any image to see metadata
- **Delete Images**: Use the delete button in the detail modal
- **Bulk Operations**: Select multiple images for batch actions

## 🔧 Using Dynamic Gallery Component

### Replace Existing Gallery

Replace the old Gallery with DynamicGallery:

```typescript
import { DynamicGallery } from '@/components/DynamicGallery';

// Legacy usage (backward compatible)
<DynamicGallery 
  images={legacyImages} 
  country="Morocco"
  region="Africa"
/>

// Dynamic B2 usage
<DynamicGallery
  region="Africa"
  country="Morocco"
  loadDynamically={true}
  enablePrintCta={true}
/>
```

### Component Props

```typescript
interface DynamicGalleryProps {
  // Legacy support
  images?: SlideshowImage[];
  dynamicImages?: DynamicImage[];
  
  // B2 dynamic loading
  region?: string;
  country?: string;
  loadDynamically?: boolean;
  
  // Features
  enablePrintCta?: boolean;
  ctaLabel?: string;
}
```

## 🚀 Migration from Cloudinary

### Option 1: Gradual Migration

Keep existing Cloudinary URLs and add new images to B2:

```typescript
// Works with both systems
<DynamicGallery
  images={existingCloudinaryImages} // Legacy
  region="Asia" 
  country="India"
  loadDynamically={false} // Use legacy for now
/>
```

### Option 2: Full Migration

1. **Download existing images** from Cloudinary
2. **Upload to B2** using the Image Manager
3. **Update components** to use B2:

```typescript
<DynamicGallery
  region="Asia"
  country="India"
  loadDynamically={true} // Use B2 system
/>
```

## 🎯 Benefits

### Performance
- **Lazy loading**: Images load only when needed
- **Responsive images**: Different sizes for different devices
- **Intersection Observer**: Efficient scroll detection
- **Preloading**: Smart preloading of thumbnails

### Cost Optimization
- **Pay per use**: No monthly fees, only storage + bandwidth
- **No duplicates**: Each image stored once with variants
- **Efficient storage**: Organized structure reduces overhead

### User Experience
- **Fast loading**: Progressive image loading
- **Error handling**: Graceful fallbacks and retry logic
- **Loading states**: Spinners and placeholders
- **Responsive design**: Works on all devices

## 🔍 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Check bucket permissions (should be Public)
   - Verify B2 CORS settings allow your domain

2. **Authentication Failures**
   - Verify Application Key and Bucket ID
   - Check if key has correct permissions

3. **Images Not Loading**
   - Verify download URL in config
   - Check network tab for failed requests
   - Ensure bucket name matches config

4. **Upload Failures**
   - Check file size (max 50MB)
   - Verify file format (JPG, PNG, WebP)
   - Check B2 service logs in console

### Debug Mode

Enable debug mode in `.env.local`:

```env
VITE_DEBUG_UPLOADS=true
VITE_DEV_MODE=true
```

This will show detailed upload logs in the browser console.

### Testing

Test the system with small images first:

1. Upload a test image via the admin interface
2. Check it appears in B2 bucket
3. Try loading it in a gallery component
4. Verify lazy loading works by scrolling

## 🔒 Security

### Environment Variables
- Never commit real credentials to git
- Use different keys for development/production
- Rotate keys regularly

### Access Control
- Use Application Keys with minimal permissions
- Consider IP restrictions if needed
- Monitor usage in B2 dashboard

### File Validation
- System validates file types and sizes
- Prevents malicious uploads
- Generates secure file paths

## 📈 Scaling

The system is designed to handle:
- **Thousands of images** with efficient lazy loading
- **High traffic** with B2's global CDN
- **Multiple admins** with role-based access
- **Future growth** with modular architecture

## 🆘 Support

If you encounter issues:

1. Check the browser console for errors
2. Verify B2 credentials and permissions
3. Test with a small image first
4. Review the setup steps above

The system includes comprehensive error handling and user feedback to help identify and resolve issues quickly.

## 🎉 Conclusion

You now have a modern, scalable image management system that:
- ✅ Eliminates duplicates
- ✅ Provides lazy loading
- ✅ Offers cost-effective storage
- ✅ Includes an intuitive admin interface
- ✅ Supports both legacy and modern workflows

Your photography portfolio is now ready to scale efficiently with Backblaze B2!