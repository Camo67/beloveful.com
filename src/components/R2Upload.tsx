/**
 * R2Upload Component for Beloveful
 * Provides drag-and-drop file upload functionality with R2 integration
 */

import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { uploadToR2, batchUpload, R2_CONFIG, type UploadResponse } from '@/lib/r2';
import { Upload, X, Check, AlertCircle, Image, File } from 'lucide-react';
import { cn } from '@/lib/utils';

interface R2UploadProps {
  onUploadComplete?: (results: UploadResponse[]) => void;
  onUploadProgress?: (completed: number, total: number) => void;
  acceptedTypes?: string[];
  maxFiles?: number;
  maxFileSize?: number;
  uploadPath?: string;
  className?: string;
}

interface FileWithPreview extends File {
  id: string;
  preview?: string;
}

export function R2Upload({
  onUploadComplete,
  onUploadProgress,
  acceptedTypes = [...R2_CONFIG.SUPPORTED_IMAGE_TYPES, ...R2_CONFIG.SUPPORTED_VIDEO_TYPES],
  maxFiles = 10,
  maxFileSize = R2_CONFIG.MAX_FILE_SIZE,
  uploadPath = 'uploads',
  className
}: R2UploadProps) {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadResults, setUploadResults] = useState<UploadResponse[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  
  const inputRef = useRef<HTMLInputElement>(null);

  // Handle file selection
  const handleFiles = (selectedFiles: FileList) => {
    const newFiles: FileWithPreview[] = [];
    
    for (let i = 0; i < selectedFiles.length && newFiles.length < maxFiles; i++) {
      const file = selectedFiles[i];
      
      // Validate file type
      if (!acceptedTypes.includes(file.type)) {
        setError(`File type ${file.type} is not supported`);
        continue;
      }
      
      // Validate file size
      if (file.size > maxFileSize) {
        setError(`File ${file.name} is too large. Maximum size is ${Math.round(maxFileSize / 1024 / 1024)}MB`);
        continue;
      }
      
      const fileWithId = Object.assign(file, {
        id: Math.random().toString(36).substring(2),
      });
      
      // Generate preview for images
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          fileWithId.preview = e.target?.result as string;
          setFiles(prev => [...prev]);
        };
        reader.readAsDataURL(file);
      }
      
      newFiles.push(fileWithId);
    }
    
    setFiles(prev => [...prev, ...newFiles].slice(0, maxFiles));
    setError(null);
  };

  // Handle drag events
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const removeFile = (fileId: string) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const uploadFiles = async () => {
    if (files.length === 0) return;
    
    setUploading(true);
    setError(null);
    setUploadProgress(0);
    
    try {
      const results = await batchUpload(
        files,
        uploadPath,
        (completed, total) => {
          const progress = (completed / total) * 100;
          setUploadProgress(progress);
          onUploadProgress?.(completed, total);
        }
      );
      
      setUploadResults(results);
      onUploadComplete?.(results);
      
      // Clear successful uploads
      const failedUploads = results.filter(r => !r.success);
      if (failedUploads.length === 0) {
        setFiles([]);
      } else {
        setError(`${failedUploads.length} uploads failed`);
      }
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Card className={cn('w-full', className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Upload to R2 CDN
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Upload Area */}
        <div
          className={cn(
            'border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors',
            dragActive ? 'border-blue-500 bg-blue-50 dark:bg-blue-950' : 'border-gray-300',
            'hover:border-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
          )}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
        >
          <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Drop files here or <span className="text-blue-600 font-medium">browse</span>
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Up to {maxFiles} files, max {Math.round(maxFileSize / 1024 / 1024)}MB each
          </p>
          
          <input
            ref={inputRef}
            type="file"
            multiple
            accept={acceptedTypes.join(',')}
            onChange={handleInputChange}
            className="hidden"
          />
        </div>

        {/* Error Display */}
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* File List */}
        {files.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium text-sm">Selected Files ({files.length})</h4>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {files.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center gap-3 p-2 border rounded-lg bg-gray-50 dark:bg-gray-800"
                >
                  <div className="flex-shrink-0">
                    {file.preview ? (
                      <img
                        src={file.preview}
                        alt={file.name}
                        className="w-10 h-10 object-cover rounded"
                      />
                    ) : (
                      <div className="w-10 h-10 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded">
                        {file.type.startsWith('image/') ? (
                          <Image className="h-5 w-5 text-gray-500" />
                        ) : (
                          <File className="h-5 w-5 text-gray-500" />
                        )}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(file.size)} • {file.type}
                    </p>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(file.id)}
                    className="flex-shrink-0 h-8 w-8 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Upload Progress */}
        {uploading && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Uploading...</span>
              <span>{Math.round(uploadProgress)}%</span>
            </div>
            <Progress value={uploadProgress} />
          </div>
        )}

        {/* Upload Results */}
        {uploadResults.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium text-sm">Upload Results</h4>
            <div className="space-y-1 max-h-40 overflow-y-auto">
              {uploadResults.map((result, index) => (
                <div
                  key={index}
                  className={cn(
                    'flex items-center gap-2 p-2 text-sm rounded',
                    result.success 
                      ? 'text-green-700 bg-green-50 dark:bg-green-950 dark:text-green-300'
                      : 'text-red-700 bg-red-50 dark:bg-red-950 dark:text-red-300'
                  )}
                >
                  {result.success ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <AlertCircle className="h-4 w-4" />
                  )}
                  <span className="flex-1 truncate">
                    {result.success ? (
                      <a 
                        href={result.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {result.filename}
                      </a>
                    ) : (
                      result.error || 'Upload failed'
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Upload Button */}
        {files.length > 0 && (
          <Button 
            onClick={uploadFiles} 
            disabled={uploading}
            className="w-full"
          >
            {uploading ? 'Uploading...' : `Upload ${files.length} File${files.length > 1 ? 's' : ''}`}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}