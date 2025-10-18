// Backblaze B2 Configuration
export const B2_CONFIG = {
  // Application keys from your Backblaze account
  keyId: '00371432da9a71d0000000001', // Your beloveful key ID
  applicationKey: process.env.VITE_B2_APPLICATION_KEY || '', // Will be set in .env
  bucketId: process.env.VITE_B2_BUCKET_ID || '', // Your bucket ID
  bucketName: 'beloveful-images', // Replace with your actual bucket name
  
  // B2 API endpoints
  apiUrl: 'https://api.backblazeb2.com',
  downloadUrl: 'https://f005.backblazeb2.com', // Replace with your bucket's download URL
  
  // File organization structure
  folders: {
    regions: 'portfolio', // portfolio/africa/morocco/
    slideshow: 'slideshow', // slideshow/
    logos: 'assets/logos', // assets/logos/
    temp: 'temp' // temp/ for temporary uploads
  },
  
  // Supported image formats
  supportedFormats: ['.jpg', '.jpeg', '.png', '.webp'],
  
  // Image processing settings
  optimization: {
    maxWidth: 2400,
    maxHeight: 1600,
    quality: 85,
    format: 'webp' // Default output format
  }
};

// Generate file path for B2 based on region, country, and filename
export const generateB2Path = (
  type: 'portfolio' | 'slideshow' | 'logo' | 'temp',
  filename: string,
  region?: string,
  country?: string
): string => {
  const timestamp = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  
  switch (type) {
    case 'portfolio':
      if (!region || !country) throw new Error('Region and country required for portfolio images');
      return `${B2_CONFIG.folders.regions}/${region.toLowerCase().replace(/\s+/g, '-')}/${country.toLowerCase().replace(/\s+/g, '-')}/${filename}`;
    
    case 'slideshow':
      return `${B2_CONFIG.folders.slideshow}/${timestamp}/${filename}`;
    
    case 'logo':
      return `${B2_CONFIG.folders.logos}/${filename}`;
    
    case 'temp':
      return `${B2_CONFIG.folders.temp}/${timestamp}/${filename}`;
    
    default:
      throw new Error(`Unknown image type: ${type}`);
  }
};

// Generate public URL for B2 file
export const generateB2Url = (filepath: string): string => {
  return `${B2_CONFIG.downloadUrl}/file/${B2_CONFIG.bucketName}/${filepath}`;
};