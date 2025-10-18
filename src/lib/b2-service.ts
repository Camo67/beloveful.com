import { B2_CONFIG, generateB2Path, generateB2Url } from './b2-config';

// Types
export interface UploadResult {
  success: boolean;
  filepath?: string;
  url?: string;
  error?: string;
}

export interface ImageMetadata {
  filename: string;
  filepath: string;
  url: string;
  size: number;
  type: string;
  region?: string;
  country?: string;
  uploadDate: string;
}

// B2 Authorization response
interface B2AuthResponse {
  accountId: string;
  authorizationToken: string;
  apiUrl: string;
  downloadUrl: string;
}

// B2 Upload URL response
interface B2UploadUrlResponse {
  bucketId: string;
  uploadUrl: string;
  authorizationToken: string;
}

class B2Service {
  private authToken: string | null = null;
  private apiUrl: string | null = null;
  private downloadUrl: string | null = null;

  /**
   * Authorize with B2 API
   */
  private async authorize(): Promise<B2AuthResponse> {
    if (!B2_CONFIG.applicationKey) {
      throw new Error('B2 Application Key not configured. Set VITE_B2_APPLICATION_KEY in .env');
    }

    const credentials = btoa(`${B2_CONFIG.keyId}:${B2_CONFIG.applicationKey}`);
    
    const response = await fetch(`${B2_CONFIG.apiUrl}/b2api/v2/b2_authorize_account`, {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${credentials}`
      }
    });

    if (!response.ok) {
      throw new Error(`B2 Authorization failed: ${response.statusText}`);
    }

    const data = await response.json() as B2AuthResponse;
    
    // Update instance variables
    this.authToken = data.authorizationToken;
    this.apiUrl = data.apiUrl;
    this.downloadUrl = data.downloadUrl;
    
    return data;
  }

  /**
   * Get upload URL for B2 bucket
   */
  private async getUploadUrl(): Promise<B2UploadUrlResponse> {
    if (!this.authToken || !this.apiUrl) {
      await this.authorize();
    }

    if (!B2_CONFIG.bucketId) {
      throw new Error('B2 Bucket ID not configured. Set VITE_B2_BUCKET_ID in .env');
    }

    const response = await fetch(`${this.apiUrl}/b2api/v2/b2_get_upload_url`, {
      method: 'POST',
      headers: {
        'Authorization': this.authToken!,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        bucketId: B2_CONFIG.bucketId
      })
    });

    if (!response.ok) {
      throw new Error(`Failed to get upload URL: ${response.statusText}`);
    }

    return response.json() as B2UploadUrlResponse;
  }

  /**
   * Upload file to B2
   */
  async uploadFile(
    file: File,
    type: 'portfolio' | 'slideshow' | 'logo' | 'temp',
    region?: string,
    country?: string
  ): Promise<UploadResult> {
    try {
      // Validate file
      if (!this.isValidImageFile(file)) {
        return {
          success: false,
          error: `Invalid file type. Supported formats: ${B2_CONFIG.supportedFormats.join(', ')}`
        };
      }

      // Generate file path
      const filepath = generateB2Path(type, file.name, region, country);
      
      // Get upload URL
      const uploadInfo = await this.getUploadUrl();
      
      // Calculate SHA1 hash (required by B2)
      const sha1Hash = await this.calculateSHA1(file);
      
      // Upload file
      const response = await fetch(uploadInfo.uploadUrl, {
        method: 'POST',
        headers: {
          'Authorization': uploadInfo.authorizationToken,
          'X-Bz-File-Name': encodeURIComponent(filepath),
          'Content-Type': file.type || 'application/octet-stream',
          'X-Bz-Content-Sha1': sha1Hash,
          'X-Bz-Info-src_last_modified_millis': Date.now().toString()
        },
        body: file
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Upload failed: ${errorData}`);
      }

      const result = await response.json();
      
      return {
        success: true,
        filepath: filepath,
        url: generateB2Url(filepath)
      };

    } catch (error) {
      console.error('B2 upload error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Upload failed'
      };
    }
  }

  /**
   * Upload multiple files
   */
  async uploadFiles(
    files: File[],
    type: 'portfolio' | 'slideshow' | 'logo' | 'temp',
    region?: string,
    country?: string
  ): Promise<UploadResult[]> {
    const results = await Promise.all(
      files.map(file => this.uploadFile(file, type, region, country))
    );
    
    return results;
  }

  /**
   * Delete file from B2
   */
  async deleteFile(filepath: string): Promise<boolean> {
    try {
      if (!this.authToken || !this.apiUrl) {
        await this.authorize();
      }

      // First, get file info
      const listResponse = await fetch(`${this.apiUrl}/b2api/v2/b2_list_file_names`, {
        method: 'POST',
        headers: {
          'Authorization': this.authToken!,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          bucketId: B2_CONFIG.bucketId,
          startFileName: filepath,
          maxFileCount: 1
        })
      });

      const listData = await listResponse.json();
      const file = listData.files?.[0];
      
      if (!file || file.fileName !== filepath) {
        throw new Error('File not found');
      }

      // Delete the file
      const deleteResponse = await fetch(`${this.apiUrl}/b2api/v2/b2_delete_file_version`, {
        method: 'POST',
        headers: {
          'Authorization': this.authToken!,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fileId: file.fileId,
          fileName: filepath
        })
      });

      return deleteResponse.ok;

    } catch (error) {
      console.error('B2 delete error:', error);
      return false;
    }
  }

  /**
   * List files in B2 bucket
   */
  async listFiles(prefix?: string, limit: number = 100): Promise<ImageMetadata[]> {
    try {
      if (!this.authToken || !this.apiUrl) {
        await this.authorize();
      }

      const response = await fetch(`${this.apiUrl}/b2api/v2/b2_list_file_names`, {
        method: 'POST',
        headers: {
          'Authorization': this.authToken!,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          bucketId: B2_CONFIG.bucketId,
          startFileName: prefix || '',
          maxFileCount: limit
        })
      });

      const data = await response.json();
      
      return data.files?.map((file: any) => ({
        filename: file.fileName.split('/').pop(),
        filepath: file.fileName,
        url: generateB2Url(file.fileName),
        size: file.size,
        type: file.contentType,
        uploadDate: new Date(file.uploadTimestamp).toISOString()
      })) || [];

    } catch (error) {
      console.error('B2 list files error:', error);
      return [];
    }
  }

  /**
   * Generate optimized image URL with transformations
   */
  generateOptimizedUrl(
    filepath: string, 
    options: {
      width?: number;
      height?: number;
      quality?: number;
      format?: 'webp' | 'jpg' | 'png';
    } = {}
  ): string {
    // B2 doesn't have built-in image transformations like Cloudinary
    // You could integrate with a service like ImageKit or implement 
    // server-side processing. For now, return the direct URL.
    const baseUrl = generateB2Url(filepath);
    
    // If you have image processing service, add query parameters here
    const params = new URLSearchParams();
    if (options.width) params.set('w', options.width.toString());
    if (options.height) params.set('h', options.height.toString());
    if (options.quality) params.set('q', options.quality.toString());
    if (options.format) params.set('f', options.format);
    
    return params.toString() ? `${baseUrl}?${params}` : baseUrl;
  }

  /**
   * Validate if file is a supported image format
   */
  private isValidImageFile(file: File): boolean {
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    return B2_CONFIG.supportedFormats.includes(fileExtension || '');
  }

  /**
   * Calculate SHA1 hash of file (required by B2)
   */
  private async calculateSHA1(file: File): Promise<string> {
    const arrayBuffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-1', arrayBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }
}

// Export singleton instance
export const b2Service = new B2Service();