import { useEffect, useMemo, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
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
  sort_order?: number;
  country?: string;
  region?: string;
  created_at: string;
}

interface Album {
  id: number;
  country: string;
  region: string;
}

export const ImagesPage = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [albumFilter, setAlbumFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isImportingPortfolio, setIsImportingPortfolio] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editingImage, setEditingImage] = useState<Image | null>(null);
  const [formData, setFormData] = useState({
    album_id: 'unassigned',
    title: '',
    description: '',
    desktop_url: '',
    mobile_url: '',
    sort_order: 0,
    is_published: true,
  });

  useEffect(() => {
    void Promise.all([fetchImages(), fetchAlbums()]);
  }, []);

  const filteredImages = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return images.filter((image) => {
      const matchesQuery =
        !normalizedQuery ||
        [
          image.title,
          image.description,
          image.country,
          image.region,
          image.desktop_url,
          image.mobile_url,
        ]
          .filter(Boolean)
          .some((value) => String(value).toLowerCase().includes(normalizedQuery));

      const imageAlbumId = image.album_id ? String(image.album_id) : 'unassigned';
      const matchesAlbum = albumFilter === 'all' || albumFilter === imageAlbumId;
      const matchesStatus =
        statusFilter === 'all' ||
        (statusFilter === 'published' && image.is_published) ||
        (statusFilter === 'draft' && !image.is_published);

      return matchesQuery && matchesAlbum && matchesStatus;
    });
  }, [albumFilter, images, searchQuery, statusFilter]);

  const fetchImages = async () => {
    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch('/api/images/admin/all', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      const data = await response.json();
      if (data.success) {
        setImages(data.images);
        setError('');
      } else {
        setError(data.error || 'Failed to fetch images');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch images');
    } finally {
      setLoading(false);
    }
  };

  const fetchAlbums = async () => {
    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch('/api/albums/admin/all', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (data.success) {
        setAlbums(data.albums || []);
      }
    } catch (err) {
      console.error('Failed to fetch albums', err);
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
        setSuccess('Image deleted successfully.');
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
        setSuccess(`Image moved to ${!currentStatus ? 'published' : 'draft'}.`);
      } else {
        setError(data.error || 'Failed to update image');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to update image');
    }
  };

  const openEditDialog = (image: Image) => {
    setEditingImage(image);
    setFormData({
      album_id: image.album_id ? String(image.album_id) : 'unassigned',
      title: image.title || '',
      description: image.description || '',
      desktop_url: image.desktop_url,
      mobile_url: image.mobile_url,
      sort_order: image.sort_order || 0,
      is_published: image.is_published,
    });
    setIsDialogOpen(true);
    setError('');
  };

  const handleSave = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!editingImage) return;

    try {
      setIsSaving(true);
      const token = localStorage.getItem('admin_token');
      const response = await fetch(`/api/images/admin/${editingImage.id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          album_id: formData.album_id === 'unassigned' ? null : Number.parseInt(formData.album_id, 10),
          title: formData.title,
          description: formData.description,
          desktop_url: formData.desktop_url,
          mobile_url: formData.mobile_url,
          sort_order: formData.sort_order,
          is_published: formData.is_published,
        }),
      });

      const data = await response.json();
      if (!response.ok || !data?.success) {
        throw new Error(data?.error || 'Failed to update image');
      }

      setIsDialogOpen(false);
      setEditingImage(null);
      setSuccess('Image updated successfully.');
      await fetchImages();
    } catch (err: any) {
      setError(err?.message || 'Failed to update image');
    } finally {
      setIsSaving(false);
    }
  };

  const importStaticPortfolio = async () => {
    try {
      setIsImportingPortfolio(true);
      setError('');
      setSuccess('');
      const token = localStorage.getItem('admin_token');
      const response = await fetch('/api/albums/admin/import-static', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (!response.ok || !data?.success) {
        throw new Error(data?.error || 'Failed to import website portfolio');
      }

      setSuccess(
        `Imported ${data.insertedAlbums} albums and ${data.insertedImages} images from the live website into the backend.`,
      );
      await Promise.all([fetchImages(), fetchAlbums()]);
    } catch (err: any) {
      setError(err?.message || 'Failed to import website portfolio');
    } finally {
      setIsImportingPortfolio(false);
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

      {success && (
        <div className="text-sm text-emerald-800 bg-emerald-50 p-3 rounded-md border border-emerald-200">
          {success}
        </div>
      )}

      {images.length === 0 && (
        <Card className="border-dashed">
          <CardHeader>
            <CardTitle>Import Current Website Portfolio</CardTitle>
            <CardDescription>
              Pull the live portfolio into the backend so you can edit and remove the same images that appear on the website.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <p className="text-sm text-muted-foreground">
              This imports the existing travel portfolio from the site into the admin database. After that, changes you make here control what shows publicly.
            </p>
            <Button onClick={importStaticPortfolio} disabled={isImportingPortfolio}>
              <ImageIcon className="mr-2 h-4 w-4" />
              {isImportingPortfolio ? 'Importing Portfolio...' : 'Import Website Portfolio'}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Images Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Images</CardTitle>
          <CardDescription>
            {filteredImages.length} of {images.length} images shown • {images.filter(i => i.is_published).length} published total
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 mb-6 md:grid-cols-[minmax(0,1.5fr)_220px_180px]">
            <div className="space-y-2">
              <Label htmlFor="image_search">Search Images</Label>
              <Input
                id="image_search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search title, album, region, description, or URL"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="album_filter">Album</Label>
              <Select value={albumFilter} onValueChange={setAlbumFilter}>
                <SelectTrigger id="album_filter">
                  <SelectValue placeholder="All albums" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All albums</SelectItem>
                  <SelectItem value="unassigned">No album</SelectItem>
                  {albums.map((album) => (
                    <SelectItem key={album.id} value={String(album.id)}>
                      {album.country} ({album.region})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status_filter">Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger id="status_filter">
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All statuses</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {filteredImages.length > 0 ? (
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
                {filteredImages.map((image) => (
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
                          onClick={() => openEditDialog(image)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
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
          ) : images.length === 0 ? (
            <div className="text-center py-8">
              <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No images yet</h3>
              <p className="text-muted-foreground mb-4">
                Import the website portfolio or upload your first images to get started.
              </p>
              <div className="flex justify-center gap-3">
                <Button onClick={importStaticPortfolio} disabled={isImportingPortfolio}>
                  <ImageIcon className="mr-2 h-4 w-4" />
                  {isImportingPortfolio ? 'Importing Portfolio...' : 'Import Website Portfolio'}
                </Button>
                <Link to="/admin/images/upload">
                  <Button variant="outline">
                    <ImageIcon className="mr-2 h-4 w-4" />
                    Upload Images
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No images match these filters</h3>
              <p className="text-muted-foreground">
                Try a different search term, album, or status filter.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Image</DialogTitle>
          </DialogHeader>

          <form className="space-y-4" onSubmit={handleSave}>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="image_title">Title</Label>
                <Input
                  id="image_title"
                  value={formData.title}
                  onChange={(event) =>
                    setFormData((current) => ({ ...current, title: event.target.value }))
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image_album">Album</Label>
                <Select
                  value={formData.album_id}
                  onValueChange={(value) =>
                    setFormData((current) => ({ ...current, album_id: value }))
                  }
                >
                  <SelectTrigger id="image_album">
                    <SelectValue placeholder="Select an album" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="unassigned">No album</SelectItem>
                    {albums.map((album) => (
                      <SelectItem key={album.id} value={String(album.id)}>
                        {album.country} ({album.region})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="image_description">Description</Label>
              <Textarea
                id="image_description"
                value={formData.description}
                onChange={(event) =>
                  setFormData((current) => ({ ...current, description: event.target.value }))
                }
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image_desktop_url">Desktop URL</Label>
              <Input
                id="image_desktop_url"
                value={formData.desktop_url}
                onChange={(event) =>
                  setFormData((current) => ({ ...current, desktop_url: event.target.value }))
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image_mobile_url">Mobile URL</Label>
              <Input
                id="image_mobile_url"
                value={formData.mobile_url}
                onChange={(event) =>
                  setFormData((current) => ({ ...current, mobile_url: event.target.value }))
                }
                required
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="image_sort_order">Sort Order</Label>
                <Input
                  id="image_sort_order"
                  type="number"
                  value={formData.sort_order}
                  onChange={(event) =>
                    setFormData((current) => ({
                      ...current,
                      sort_order: Number.parseInt(event.target.value, 10) || 0,
                    }))
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image_status">Status</Label>
                <Select
                  value={formData.is_published ? 'published' : 'draft'}
                  onValueChange={(value) =>
                    setFormData((current) => ({ ...current, is_published: value === 'published' }))
                  }
                >
                  <SelectTrigger id="image_status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <DialogFooter>
              <Button type="submit" disabled={isSaving}>
                {isSaving ? 'Saving...' : 'Save Changes'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
