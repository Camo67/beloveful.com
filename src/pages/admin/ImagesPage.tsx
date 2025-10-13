import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Edit, Trash2, Image as ImageIcon, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Image {
  id: number;
  album_id?: number;
  title?: string;
  description?: string;
  desktop_url: string;
  mobile_url: string;
  is_published: boolean;
  country?: string;
  region?: string;
  created_at: string;
}

export const ImagesPage = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch('/api/images/admin/all', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      const data = await response.json();
      if (data.success) {
        setImages(data.images);
      } else {
        setError(data.error || 'Failed to fetch images');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch images');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (imageId: number) => {
    if (!confirm('Are you sure you want to delete this image?')) {
      return;
    }

    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch(`/api/images/admin/${imageId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      const data = await response.json();
      if (data.success) {
        await fetchImages();
      } else {
        setError(data.error || 'Failed to delete image');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to delete image');
    }
  };

  const togglePublished = async (imageId: number, currentStatus: boolean) => {
    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch(`/api/images/admin/${imageId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ is_published: !currentStatus })
      });
      
      const data = await response.json();
      if (data.success) {
        await fetchImages();
      } else {
        setError(data.error || 'Failed to update image');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to update image');
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center p-8">Loading images...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Images</h2>
          <p className="text-muted-foreground">
            Manage your photography images and metadata
          </p>
        </div>
        <Link to="/admin/images/upload">
          <Button>
            <ImageIcon className="mr-2 h-4 w-4" />
            Upload Images
          </Button>
        </Link>
      </div>

      {error && (
        <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
          {error}
        </div>
      )}

      {/* Images Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Images</CardTitle>
          <CardDescription>
            {images.length} images total • {images.filter(i => i.is_published).length} published
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Album</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {images.map((image) => (
                <TableRow key={image.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img
                        src={image.mobile_url}
                        alt={image.title || 'Image'}
                        className="w-12 h-12 object-cover rounded-md"
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{image.title || 'Untitled'}</div>
                      {image.description && (
                        <div className="text-sm text-muted-foreground truncate max-w-xs">
                          {image.description}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {image.country ? (
                      <div>
                        <div className="font-medium">{image.country}</div>
                        <div className="text-sm text-muted-foreground">{image.region}</div>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">No album</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => togglePublished(image.id, image.is_published)}
                    >
                      <Badge variant={image.is_published ? 'default' : 'secondary'}>
                        {image.is_published ? 'Published' : 'Draft'}
                      </Badge>
                    </Button>
                  </TableCell>
                  <TableCell>{new Date(image.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(image.desktop_url, '_blank')}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDelete(image.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {images.length === 0 && (
            <div className="text-center py-8">
              <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No images yet</h3>
              <p className="text-muted-foreground mb-4">
                Upload your first images to get started.
              </p>
              <Link to="/admin/images/upload">
                <Button>
                  <ImageIcon className="mr-2 h-4 w-4" />
                  Upload Images
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};