import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Edit, Image as ImageIcon, Plus, Trash2 } from 'lucide-react';

interface SlideshowImage {
  id: number;
  title?: string;
  desktop_url: string;
  mobile_url: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
}

const DEFAULT_FORM = {
  title: '',
  desktop_url: '',
  mobile_url: '',
  sort_order: 0,
  is_active: true,
};

export const SlideshowManager = () => {
  const [images, setImages] = useState<SlideshowImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editingImage, setEditingImage] = useState<SlideshowImage | null>(null);
  const [formData, setFormData] = useState(DEFAULT_FORM);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('admin_token');
      const response = await fetch('/api/images/admin/slideshow/all', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();

      if (!response.ok || !data?.success) {
        throw new Error(data?.error || 'Failed to fetch slideshow images');
      }

      setImages(data.images || []);
      setError('');
    } catch (err: any) {
      setError(err?.message || 'Failed to fetch slideshow images');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData(DEFAULT_FORM);
    setEditingImage(null);
  };

  const openCreateDialog = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const openEditDialog = (image: SlideshowImage) => {
    setFormData({
      title: image.title || '',
      desktop_url: image.desktop_url,
      mobile_url: image.mobile_url,
      sort_order: image.sort_order || 0,
      is_active: Boolean(image.is_active),
    });
    setEditingImage(image);
    setIsDialogOpen(true);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      setIsSaving(true);
      const token = localStorage.getItem('admin_token');
      const endpoint = editingImage
        ? `/api/images/admin/slideshow/${editingImage.id}`
        : '/api/images/admin/slideshow/all';
      const method = editingImage ? 'PUT' : 'POST';

      const response = await fetch(endpoint, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok || !data?.success) {
        throw new Error(data?.error || 'Failed to save slideshow image');
      }

      setIsDialogOpen(false);
      resetForm();
      await fetchImages();
    } catch (err: any) {
      setError(err?.message || 'Failed to save slideshow image');
    } finally {
      setIsSaving(false);
    }
  };

  const toggleActive = async (image: SlideshowImage) => {
    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch(`/api/images/admin/slideshow/${image.id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ is_active: !image.is_active }),
      });

      const data = await response.json();
      if (!response.ok || !data?.success) {
        throw new Error(data?.error || 'Failed to update slideshow image');
      }

      await fetchImages();
    } catch (err: any) {
      setError(err?.message || 'Failed to update slideshow image');
    }
  };

  const handleDelete = async (imageId: number) => {
    if (!confirm('Delete this slideshow image?')) {
      return;
    }

    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch(`/api/images/admin/slideshow/${imageId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (!response.ok || !data?.success) {
        throw new Error(data?.error || 'Failed to delete slideshow image');
      }

      await fetchImages();
    } catch (err: any) {
      setError(err?.message || 'Failed to delete slideshow image');
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center p-8">Loading slideshow...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold">Slideshow Images</h2>
          <p className="text-muted-foreground">
            Manage the homepage slideshow order, URLs, and active state.
          </p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreateDialog}>
              <Plus className="mr-2 h-4 w-4" />
              Add Slide
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingImage ? 'Edit Slide' : 'Add Slideshow Image'}</DialogTitle>
              <DialogDescription>
                Save desktop and mobile URLs separately so the homepage can choose the right asset.
              </DialogDescription>
            </DialogHeader>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="slide_title">Title</Label>
                <Input
                  id="slide_title"
                  value={formData.title}
                  onChange={(event) =>
                    setFormData((current) => ({ ...current, title: event.target.value }))
                  }
                  placeholder="Morning market"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="desktop_url">Desktop Image URL</Label>
                <Input
                  id="desktop_url"
                  value={formData.desktop_url}
                  onChange={(event) =>
                    setFormData((current) => ({ ...current, desktop_url: event.target.value }))
                  }
                  placeholder="https://..."
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="mobile_url">Mobile Image URL</Label>
                <Input
                  id="mobile_url"
                  value={formData.mobile_url}
                  onChange={(event) =>
                    setFormData((current) => ({ ...current, mobile_url: event.target.value }))
                  }
                  placeholder="https://..."
                  required
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="sort_order">Sort Order</Label>
                  <Input
                    id="sort_order"
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

                <div className="flex items-center justify-between rounded-md border px-4 py-3">
                  <div>
                    <Label htmlFor="is_active">Active</Label>
                    <p className="text-sm text-muted-foreground">Only active slides render publicly.</p>
                  </div>
                  <Switch
                    id="is_active"
                    checked={formData.is_active}
                    onCheckedChange={(checked) =>
                      setFormData((current) => ({ ...current, is_active: checked }))
                    }
                  />
                </div>
              </div>

              {error ? (
                <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                  {error}
                </div>
              ) : null}

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsDialogOpen(false);
                    resetForm();
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSaving}>
                  {isSaving ? 'Saving...' : editingImage ? 'Update Slide' : 'Create Slide'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {error ? (
        <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{error}</div>
      ) : null}

      <Card>
        <CardHeader>
          <CardTitle>Homepage Slides</CardTitle>
          <CardDescription>
            {images.length} slide{images.length === 1 ? '' : 's'} total,{' '}
            {images.filter((image) => image.is_active).length} active
          </CardDescription>
        </CardHeader>
        <CardContent>
          {images.length === 0 ? (
            <div className="py-8 text-center">
              <ImageIcon className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
              <h3 className="text-lg font-medium">No slideshow images yet</h3>
              <p className="mb-4 text-muted-foreground">
                Add the first slide to power the homepage hero rotation.
              </p>
              <Button onClick={openCreateDialog}>
                <Plus className="mr-2 h-4 w-4" />
                Add Slide
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Preview</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Order</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="w-[140px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {images.map((image) => (
                  <TableRow key={image.id}>
                    <TableCell>
                      <img
                        src={image.mobile_url || image.desktop_url}
                        alt={image.title || 'Slideshow image'}
                        className="h-12 w-12 rounded-md object-cover"
                      />
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{image.title || 'Untitled slide'}</div>
                      <div className="max-w-sm truncate text-sm text-muted-foreground">
                        {image.desktop_url}
                      </div>
                    </TableCell>
                    <TableCell>{image.sort_order}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="px-0"
                        onClick={() => toggleActive(image)}
                      >
                        <Badge variant={image.is_active ? 'default' : 'secondary'}>
                          {image.is_active ? 'Active' : 'Hidden'}
                        </Badge>
                      </Button>
                    </TableCell>
                    <TableCell>{new Date(image.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => openEditDialog(image)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDelete(image.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
