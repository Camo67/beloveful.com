import { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Upload, X, Image as ImageIcon, AlertCircle, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Album {
  id: number;
  country: string;
  region: string;
  slug: string;
}

interface UploadFile {
  id: string;
  file: File;
  preview: string;
  title: string;
  description: string;
  status: 'pending' | 'uploading' | 'success' | 'error';
  progress: number;
  error?: string;
}

interface ImageUploadProps {
  albums: Album[];
  onUploadComplete?: () => void;
}

export const ImageUpload = ({ albums, onUploadComplete }: ImageUploadProps) => {
  const [selectedAlbum, setSelectedAlbum] = useState<string>('');
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const createUploadFile = useCallback((file: File): UploadFile => ({
    id: Math.random().toString(36).substr(2, 9),
    file,
    preview: URL.createObjectURL(file),
    title: file.name.replace(/\.[^/.]+$/, ''), // Remove extension
    description: '',
    status: 'pending',
    progress: 0
  }), []);

  const handleFiles = useCallback((newFiles: FileList | File[]) => {
    const fileArray = Array.from(newFiles);
    const imageFiles = fileArray.filter(file => file.type.startsWith('image/'));
    
    const uploadFiles = imageFiles.map(createUploadFile);
    setFiles(prev => [...prev, ...uploadFiles]);
  }, [createUploadFile]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFiles(e.dataTransfer.files);
  }, [handleFiles]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleFileSelect = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  }, [handleFiles]);

  const removeFile = useCallback((fileId: string) => {
    setFiles(prev => {
      const file = prev.find(f => f.id === fileId);
      if (file) {
        URL.revokeObjectURL(file.preview);
      }
      return prev.filter(f => f.id !== fileId);
    });
  }, []);

  const updateFileInfo = useCallback((fileId: string, updates: Partial<UploadFile>) => {
    setFiles(prev => prev.map(f => f.id === fileId ? { ...f, ...updates } : f));
  }, []);

  const uploadFile = async (uploadFile: UploadFile) => {
    if (!selectedAlbum) {
      updateFileInfo(uploadFile.id, { status: 'error', error: 'Please select an album' });
      return;
    }

    updateFileInfo(uploadFile.id, { status: 'uploading', progress: 0 });

    try {
      const formData = new FormData();
      formData.append('file', uploadFile.file);
      formData.append('album_id', selectedAlbum);
      formData.append('title', uploadFile.title);
      formData.append('description', uploadFile.description);

      const token = localStorage.getItem('admin_token');
      const response = await fetch('/api/images/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      const data = await response.json();
      
      if (data.success) {
        updateFileInfo(uploadFile.id, { status: 'success', progress: 100 });
      } else {
        updateFileInfo(uploadFile.id, { 
          status: 'error', 
          error: data.error || 'Upload failed' 
        });
      }
    } catch (error: any) {
      updateFileInfo(uploadFile.id, { 
        status: 'error', 
        error: error.message || 'Upload failed' 
      });
    }
  };

  const uploadAllFiles = async () => {
    const pendingFiles = files.filter(f => f.status === 'pending');
    
    for (const file of pendingFiles) {
      await uploadFile(file);
    }
    
    // Call completion callback if all uploads finished
    if (onUploadComplete) {
      const allComplete = files.every(f => f.status === 'success' || f.status === 'error');
      if (allComplete) {
        setTimeout(onUploadComplete, 1000); // Small delay to show final state
      }
    }
  };

  const clearCompletedFiles = () => {
    setFiles(prev => {
      const toRemove = prev.filter(f => f.status === 'success' || f.status === 'error');
      toRemove.forEach(f => URL.revokeObjectURL(f.preview));
      return prev.filter(f => f.status === 'pending' || f.status === 'uploading');
    });
  };

  const getStatusIcon = (status: UploadFile['status']) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'uploading':
        return <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />;
      default:
        return <ImageIcon className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const pendingCount = files.filter(f => f.status === 'pending').length;
  const uploadingCount = files.filter(f => f.status === 'uploading').length;
  const successCount = files.filter(f => f.status === 'success').length;
  const errorCount = files.filter(f => f.status === 'error').length;

  return (
    <div className="space-y-6">
      {/* Album Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Upload Images</CardTitle>
          <CardDescription>
            Add new images to your photography albums
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Select Album</Label>
              <Select value={selectedAlbum} onValueChange={setSelectedAlbum}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose an album to upload to..." />
                </SelectTrigger>
                <SelectContent>
                  {albums.map(album => (
                    <SelectItem key={album.id} value={album.id.toString()}>
                      {album.country} ({album.region})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Drop Zone */}
            <div
              className={cn(
                "border-2 border-dashed rounded-lg p-8 text-center transition-colors",
                isDragOver 
                  ? "border-primary bg-primary/5" 
                  : "border-muted-foreground/25 hover:border-muted-foreground/50"
              )}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">
                Drop images here or click to browse
              </h3>
              <p className="text-muted-foreground mb-4">
                Support for JPG, PNG, WebP up to 10MB each
              </p>
              <Button onClick={handleFileSelect} disabled={!selectedAlbum}>
                <Upload className="mr-2 h-4 w-4" />
                Browse Files
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileInputChange}
                className="hidden"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* File List */}
      {files.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Upload Queue</CardTitle>
                <CardDescription>
                  {files.length} files • {pendingCount} pending • {successCount} uploaded • {errorCount} failed
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button 
                  onClick={clearCompletedFiles}
                  variant="outline"
                  disabled={successCount === 0 && errorCount === 0}
                >
                  Clear Completed
                </Button>
                <Button 
                  onClick={uploadAllFiles}
                  disabled={pendingCount === 0 || uploadingCount > 0 || !selectedAlbum}
                >
                  Upload All ({pendingCount})
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {files.map((uploadFile) => (
                <div key={uploadFile.id} className="border rounded-lg p-4">
                  <div className="flex gap-4">
                    {/* Image Preview */}
                    <div className="flex-shrink-0">
                      <img
                        src={uploadFile.preview}
                        alt={uploadFile.title}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                    </div>

                    {/* File Info */}
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(uploadFile.status)}
                          <span className="font-medium">{uploadFile.file.name}</span>
                          <Badge variant={
                            uploadFile.status === 'success' ? 'default' :
                            uploadFile.status === 'error' ? 'destructive' :
                            uploadFile.status === 'uploading' ? 'secondary' : 'outline'
                          }>
                            {uploadFile.status}
                          </Badge>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(uploadFile.id)}
                          disabled={uploadFile.status === 'uploading'}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* Progress Bar */}
                      {uploadFile.status === 'uploading' && (
                        <Progress value={uploadFile.progress} className="w-full" />
                      )}

                      {/* Error Message */}
                      {uploadFile.status === 'error' && uploadFile.error && (
                        <div className="text-sm text-destructive bg-destructive/10 p-2 rounded">
                          {uploadFile.error}
                        </div>
                      )}

                      {/* Editable Fields */}
                      {uploadFile.status === 'pending' && (
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Title</Label>
                            <Input
                              value={uploadFile.title}
                              onChange={(e) => updateFileInfo(uploadFile.id, { title: e.target.value })}
                              placeholder="Image title"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Description (Optional)</Label>
                            <Textarea
                              value={uploadFile.description}
                              onChange={(e) => updateFileInfo(uploadFile.id, { description: e.target.value })}
                              placeholder="Brief description..."
                              rows={2}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};