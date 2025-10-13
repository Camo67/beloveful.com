import { useState, useEffect } from 'react';
import { ImageUpload } from '@/components/admin/ImageUpload';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Album {
  id: number;
  country: string;
  region: string;
  slug: string;
  is_published: boolean;
}

export const ImageUploadPage = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAlbums();
  }, []);

  const fetchAlbums = async () => {
    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch('/api/albums/admin/all', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      const data = await response.json();
      if (data.success) {
        // Only show published albums for upload
        setAlbums(data.albums.filter((album: Album) => album.is_published));
      }
    } catch (error) {
      console.error('Failed to fetch albums:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadComplete = () => {
    // Optionally refresh albums or show success message
    console.log('Upload completed');
  };

  if (loading) {
    return <div className="flex items-center justify-center p-8">Loading albums...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link to="/admin/images">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Images
          </Button>
        </Link>
        <div>
          <h2 className="text-2xl font-bold">Upload Images</h2>
          <p className="text-muted-foreground">
            Add new images to your photography albums
          </p>
        </div>
      </div>

      {/* Upload Component */}
      <ImageUpload 
        albums={albums}
        onUploadComplete={handleUploadComplete}
      />

      {albums.length === 0 && !loading && (
        <div className="text-center py-8">
          <h3 className="text-lg font-medium mb-2">No albums available</h3>
          <p className="text-muted-foreground mb-4">
            Create and publish some albums first before uploading images.
          </p>
          <Link to="/admin/albums">
            <Button>
              Create Albums
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};