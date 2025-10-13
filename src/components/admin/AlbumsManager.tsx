import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Edit, Trash2, Camera, Globe } from 'lucide-react';
import { REGIONS } from '@/lib/data';

interface Album {
  id: number;
  region: string;
  country: string;
  slug: string;
  description?: string;
  is_published: boolean;
  sort_order: number;
  image_count: number;
  created_at: string;
  updated_at: string;
}

export const AlbumsManager = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingAlbum, setEditingAlbum] = useState<Album | null>(null);
  const [formData, setFormData] = useState({
    region: '',
    country: '',
    slug: '',
    description: '',
    is_published: true,
    sort_order: 0
  });

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
        setAlbums(data.albums);
      } else {
        setError(data.error || 'Failed to fetch albums');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch albums');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem('admin_token');
      const url = editingAlbum 
        ? `/api/albums/admin/${editingAlbum.id}` 
        : '/api/albums/admin/all';
      
      const response = await fetch(url, {
        method: editingAlbum ? 'PUT' : 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      if (data.success) {
        await fetchAlbums();
        resetForm();
        setIsCreateDialogOpen(false);
        setEditingAlbum(null);
      } else {
        setError(data.error || 'Failed to save album');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to save album');
    }
  };

  const handleDelete = async (albumId: number) => {
    if (!confirm('Are you sure you want to delete this album? This will also remove all associated images.')) {
      return;
    }

    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch(`/api/albums/admin/${albumId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      const data = await response.json();
      if (data.success) {
        await fetchAlbums();
      } else {
        setError(data.error || 'Failed to delete album');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to delete album');
    }
  };

  const resetForm = () => {
    setFormData({
      region: '',
      country: '',
      slug: '',
      description: '',
      is_published: true,
      sort_order: 0
    });
  };

  const openEditDialog = (album: Album) => {
    setFormData({
      region: album.region,
      country: album.country,
      slug: album.slug,
      description: album.description || '',
      is_published: album.is_published,
      sort_order: album.sort_order
    });
    setEditingAlbum(album);
    setIsCreateDialogOpen(true);
  };

  const generateSlug = (country: string) => {
    return country.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  };

  if (loading) {
    return <div className="flex items-center justify-center p-8">Loading albums...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Albums</h2>
          <p className="text-muted-foreground">
            Manage your photography albums and countries
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="mr-2 h-4 w-4" />
              Add Album
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingAlbum ? 'Edit Album' : 'Create New Album'}
              </DialogTitle>
              <DialogDescription>
                {editingAlbum 
                  ? 'Update the album information below.' 
                  : 'Add a new country/region album to your portfolio.'
                }
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="region">Region</Label>
                  <Select 
                    value={formData.region} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, region: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select region" />
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
                    value={formData.country}
                    onChange={(e) => {
                      const country = e.target.value;
                      setFormData(prev => ({ 
                        ...prev, 
                        country,
                        slug: generateSlug(country)
                      }));
                    }}
                    placeholder="Enter country name"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="slug">URL Slug</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                  placeholder="url-friendly-name"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Brief description of this album..."
                  rows={3}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sort_order">Sort Order</Label>
                  <Input
                    id="sort_order"
                    type="number"
                    value={formData.sort_order}
                    onChange={(e) => setFormData(prev => ({ ...prev, sort_order: parseInt(e.target.value) || 0 }))}
                    placeholder="0"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select 
                    value={formData.is_published ? 'published' : 'draft'} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, is_published: value === 'published' }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {error && (
                <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
                  {error}
                </div>
              )}

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => {
                  setIsCreateDialogOpen(false);
                  setEditingAlbum(null);
                  resetForm();
                }}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingAlbum ? 'Update Album' : 'Create Album'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Albums Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Albums</CardTitle>
          <CardDescription>
            {albums.length} albums across {new Set(albums.map(a => a.region)).size} regions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Country</TableHead>
                <TableHead>Region</TableHead>
                <TableHead>Images</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {albums.map((album) => (
                <TableRow key={album.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{album.country}</div>
                      <div className="text-sm text-muted-foreground">/{album.slug}</div>
                    </div>
                  </TableCell>
                  <TableCell>{album.region}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Camera className="h-4 w-4" />
                      {album.image_count}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={album.is_published ? 'default' : 'secondary'}>
                      {album.is_published ? (
                        <>
                          <Globe className="mr-1 h-3 w-3" />
                          Published
                        </>
                      ) : (
                        'Draft'
                      )}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(album.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => openEditDialog(album)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleDelete(album.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {albums.length === 0 && (
            <div className="text-center py-8">
              <Camera className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No albums yet</h3>
              <p className="text-muted-foreground mb-4">
                Create your first album to start organizing your photography.
              </p>
              <Button onClick={() => setIsCreateDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Create Album
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};