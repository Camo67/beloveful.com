import React, { useState, useCallback, useRef } from 'react';
import { Upload, X, Eye, Trash2, FolderOpen, Image as ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';

import { b2Service, UploadResult, ImageMetadata } from '@/lib/b2-service';
import { Region } from '@/lib/data';
import { LazyImage } from './LazyImage';
import { DynamicImage } from '@/lib/dynamic-data';

interface UploadProgress {
  file: File;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
  result?: UploadResult;
}

const REGIONS: Region[] = [
  'Africa', 'Asia', 'Middle East', 'South America', 
  'North America', 'Europe', 'Oceania', 'Erasing Borders'
];

export const ImageManager: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<Region>('Asia');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [uploadType, setUploadType] = useState<'portfolio' | 'slideshow' | 'logo'>('portfolio');
  const [uploads, setUploads] = useState<UploadProgress[]>([]);
  const [existingImages, setExistingImages] = useState<ImageMetadata[]>([]);
  const [selectedImage, setSelectedImage] = useState<ImageMetadata | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle file selection
  const handleFileSelect = useCallback((files: FileList | null) => {
    if (!files) return;

    const fileArray = Array.from(files);
    const validFiles = fileArray.filter(file => 
      file.type.startsWith('image/') && file.size <= 50 * 1024 * 1024 // 50MB limit
    );

    if (validFiles.length !== fileArray.length) {
      toast.error(`${fileArray.length - validFiles.length} files were invalid or too large`);
    }

    if (validFiles.length === 0) return;

    // Initialize upload progress tracking
    const newUploads: UploadProgress[] = validFiles.map(file => ({
      file,
      progress: 0,
      status: 'uploading'
    }));

    setUploads(prev => [...prev, ...newUploads]);
    startUploads(validFiles, newUploads);
  }, []);

  // Start upload process
  const startUploads = async (files: File[], uploadProgress: UploadProgress[]) => {
    if (uploadType === 'portfolio' && (!selectedRegion || !selectedCountry)) {
      toast.error('Please select region and country for portfolio images');
      return;
    }

    setIsUploading(true);

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const uploadItem = uploadProgress[i];

        // Update progress to show starting
        setUploads(prev => prev.map(item => 
          item.file === file ? { ...item, progress: 10 } : item
        ));

        // Upload to B2
        const result = await b2Service.uploadFile(
          file,
          uploadType,
          uploadType === 'portfolio' ? selectedRegion : undefined,
          uploadType === 'portfolio' ? selectedCountry : undefined
        );

        // Update progress based on result
        setUploads(prev => prev.map(item => 
          item.file === file ? {
            ...item,
            progress: 100,
            status: result.success ? 'completed' : 'error',
            result
          } : item
        ));

        if (result.success) {
          toast.success(`Uploaded ${file.name}`);
        } else {
          toast.error(`Failed to upload ${file.name}: ${result.error}`);
        }
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Upload process failed');
    } finally {
      setIsUploading(false);
    }
  };

  // Drag and drop handlers
  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files);
    }
  }, [handleFileSelect]);

  // Load existing images
  const loadExistingImages = async () => {
    try {
      const prefix = uploadType === 'portfolio' 
        ? `portfolio/${selectedRegion?.toLowerCase()}/${selectedCountry?.toLowerCase()}/`
        : uploadType === 'slideshow' 
          ? 'slideshow/' 
          : 'assets/logos/';
      
      const images = await b2Service.listFiles(prefix);
      setExistingImages(images);
    } catch (error) {
      console.error('Failed to load existing images:', error);
      toast.error('Failed to load existing images');
    }
  };

  // Delete image
  const deleteImage = async (filepath: string) => {
    try {
      const success = await b2Service.deleteFile(filepath);
      if (success) {
        toast.success('Image deleted successfully');
        setExistingImages(prev => prev.filter(img => img.filepath !== filepath));
        setSelectedImage(null);
      } else {
        toast.error('Failed to delete image');
      }
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Failed to delete image');
    }
  };

  // Clear completed uploads
  const clearUploads = () => {
    setUploads(prev => prev.filter(upload => upload.status === 'uploading'));
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Image Manager</h1>
        <Button onClick={loadExistingImages} variant="outline">
          <FolderOpen className="w-4 h-4 mr-2" />
          Load Images
        </Button>
      </div>

      {/* Upload Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Upload Settings</CardTitle>
          <CardDescription>Configure where to upload your images</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="upload-type">Upload Type</Label>
              <Select value={uploadType} onValueChange={(value: any) => setUploadType(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="portfolio">Portfolio</SelectItem>
                  <SelectItem value="slideshow">Slideshow</SelectItem>
                  <SelectItem value="logo">Logo</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {uploadType === 'portfolio' && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="region">Region</Label>
                  <Select value={selectedRegion} onValueChange={(value: Region) => setSelectedRegion(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {REGIONS.map(region => (
                        <SelectItem key={region} value={region}>{region}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    placeholder="Enter country name"
                  />
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Upload Area */}
      <Card>
        <CardContent className="p-6">
          <div
            className={cn(
              'border-2 border-dashed rounded-lg p-8 text-center transition-colors',
              dragActive
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-950'
                : 'border-gray-300 dark:border-gray-700',
              isUploading && 'opacity-50 pointer-events-none'
            )}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-medium mb-2">
              {dragActive ? 'Drop images here' : 'Upload Images'}
            </h3>
            <p className="text-gray-500 mb-4">
              Drag and drop images here or click to browse
            </p>
            <Button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="mb-2"
            >
              <ImageIcon className="w-4 h-4 mr-2" />
              Choose Images
            </Button>
            <p className="text-sm text-gray-400">
              Supports: JPG, PNG, WebP • Max size: 50MB per image
            </p>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFileSelect(e.target.files)}
          />
        </CardContent>
      </Card>

      {/* Upload Progress */}
      {uploads.length > 0 && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Upload Progress</CardTitle>
              <CardDescription>
                {uploads.filter(u => u.status === 'completed').length} of {uploads.length} completed
              </CardDescription>
            </div>
            <Button onClick={clearUploads} variant="outline" size="sm">
              <X className="w-4 h-4 mr-2" />
              Clear
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {uploads.map((upload, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="truncate">{upload.file.name}</span>
                  <span className="text-gray-500">
                    {upload.status === 'completed' && '✓'}
                    {upload.status === 'error' && '✗'}
                    {upload.status === 'uploading' && `${upload.progress}%`}
                  </span>
                </div>
                <Progress value={upload.progress} />
                {upload.status === 'error' && upload.result?.error && (
                  <p className="text-sm text-red-500">{upload.result.error}</p>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Existing Images Grid */}
      {existingImages.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Existing Images ({existingImages.length})</CardTitle>
            <CardDescription>Click an image to view details or delete</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {existingImages.map((image) => (
                <div
                  key={image.filepath}
                  className="relative group cursor-pointer rounded-lg overflow-hidden aspect-square bg-gray-100 dark:bg-gray-800"
                  onClick={() => setSelectedImage(image)}
                >
                  <img
                    src={image.url}
                    alt={image.filename}
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                    <Eye className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Image Detail Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{selectedImage?.filename}</DialogTitle>
            <DialogDescription>
              Uploaded: {selectedImage?.uploadDate ? new Date(selectedImage.uploadDate).toLocaleDateString() : 'Unknown'}
            </DialogDescription>
          </DialogHeader>
          
          {selectedImage && (
            <div className="space-y-4">
              <div className="max-h-96 overflow-hidden rounded-lg">
                <img
                  src={selectedImage.url}
                  alt={selectedImage.filename}
                  className="w-full h-full object-contain"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>File Size:</strong> {(selectedImage.size / 1024 / 1024).toFixed(2)} MB
                </div>
                <div>
                  <strong>Type:</strong> {selectedImage.type}
                </div>
                <div className="col-span-2">
                  <strong>Path:</strong> <code className="text-xs bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">{selectedImage.filepath}</code>
                </div>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => window.open(selectedImage.url, '_blank')}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View Full Size
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => selectedImage && deleteImage(selectedImage.filepath)}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};