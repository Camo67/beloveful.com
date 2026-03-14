import { useCallback, useEffect, useMemo, useState } from 'react';
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { Edit, FileText, Plus, Trash2 } from 'lucide-react';

interface ContentBlock {
  id: number;
  page_key: string;
  content_key: string;
  content_value: string;
  content_type: 'text' | 'html' | 'markdown';
  updated_at: string;
}

const COMMON_PAGES = [
  'home',
  'about',
  'contact',
  'workshops',
  'portfolio',
  'projects',
  'events',
  'faq',
  'print-shop',
  'open-edition',
];

const CONTENT_TYPES = [
  { value: 'text', label: 'Text' },
  { value: 'html', label: 'HTML' },
  { value: 'markdown', label: 'Markdown' },
];

const DEFAULT_FORM = {
  page_key: 'about',
  content_key: '',
  content_value: '',
  content_type: 'text',
};

export const ContentBlocksManager = () => {
  const [blocks, setBlocks] = useState<ContentBlock[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedPage, setSelectedPage] = useState('all-pages');
  const [editingBlock, setEditingBlock] = useState<ContentBlock | null>(null);
  const [formData, setFormData] = useState(DEFAULT_FORM);

  const availablePages = useMemo(() => {
    const pageSet = new Set(COMMON_PAGES);
    blocks.forEach((block) => pageSet.add(block.page_key));
    return Array.from(pageSet).sort((a, b) => a.localeCompare(b));
  }, [blocks]);

  const fetchBlocks = useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('admin_token');
      const query =
        selectedPage !== 'all-pages' ? `?page_key=${encodeURIComponent(selectedPage)}` : '';

      const response = await fetch(`/api/content/admin/all${query}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (response.ok && data?.success) {
        setBlocks(data.blocks || []);
        setError('');
      } else {
        setError(data?.error || 'Failed to fetch content blocks');
      }
    } catch (err: any) {
      setError(err?.message || 'Failed to fetch content blocks');
    } finally {
      setLoading(false);
    }
  }, [selectedPage]);

  useEffect(() => {
    fetchBlocks();
  }, [fetchBlocks]);

  const resetForm = () => {
    setFormData(DEFAULT_FORM);
    setEditingBlock(null);
  };

  const openCreateDialog = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const openEditDialog = (block: ContentBlock) => {
    setFormData({
      page_key: block.page_key,
      content_key: block.content_key,
      content_value: block.content_value,
      content_type: block.content_type,
    });
    setEditingBlock(block);
    setIsDialogOpen(true);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      setIsSaving(true);
      const token = localStorage.getItem('admin_token');
      const endpoint = editingBlock ? `/api/content/admin/${editingBlock.id}` : '/api/content/admin/all';
      const method = editingBlock ? 'PUT' : 'POST';

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
        throw new Error(data?.error || 'Failed to save content block');
      }

      setIsDialogOpen(false);
      resetForm();
      await fetchBlocks();
    } catch (err: any) {
      setError(err?.message || 'Failed to save content block');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (blockId: number) => {
    if (!confirm('Delete this content block?')) {
      return;
    }

    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch(`/api/content/admin/${blockId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (!response.ok || !data?.success) {
        throw new Error(data?.error || 'Failed to delete content block');
      }

      await fetchBlocks();
    } catch (err: any) {
      setError(err?.message || 'Failed to delete content block');
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center p-8">Loading content blocks...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold">Content Blocks</h2>
          <p className="text-muted-foreground">
            Create, edit, and delete the text blocks used across the site.
          </p>
        </div>

        <div className="flex gap-3">
          <Select value={selectedPage} onValueChange={setSelectedPage}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by page" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-pages">All Pages</SelectItem>
              {availablePages.map((page) => (
                <SelectItem key={page} value={page}>
                  {page}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={openCreateDialog}>
                <Plus className="mr-2 h-4 w-4" />
                Add Block
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl">
              <DialogHeader>
                <DialogTitle>{editingBlock ? 'Edit Block' : 'Create Content Block'}</DialogTitle>
                <DialogDescription>
                  Keep keys stable so page templates can continue to read the right content.
                </DialogDescription>
              </DialogHeader>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="page_key">Page</Label>
                    <Select
                      value={formData.page_key}
                      onValueChange={(value) =>
                        setFormData((current) => ({ ...current, page_key: value }))
                      }
                    >
                      <SelectTrigger id="page_key">
                        <SelectValue placeholder="Select page" />
                      </SelectTrigger>
                      <SelectContent>
                        {availablePages.map((page) => (
                          <SelectItem key={page} value={page}>
                            {page}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="content_type">Content Type</Label>
                    <Select
                      value={formData.content_type}
                      onValueChange={(value) =>
                        setFormData((current) => ({ ...current, content_type: value }))
                      }
                    >
                      <SelectTrigger id="content_type">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {CONTENT_TYPES.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content_key">Block Key</Label>
                  <Input
                    id="content_key"
                    value={formData.content_key}
                    onChange={(event) =>
                      setFormData((current) => ({ ...current, content_key: event.target.value }))
                    }
                    placeholder="hero_title"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content_value">Content</Label>
                  <Textarea
                    id="content_value"
                    value={formData.content_value}
                    onChange={(event) =>
                      setFormData((current) => ({ ...current, content_value: event.target.value }))
                    }
                    placeholder="Enter the text or markup for this block"
                    rows={8}
                  />
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
                    {isSaving ? 'Saving...' : editingBlock ? 'Update Block' : 'Create Block'}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {error ? (
        <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{error}</div>
      ) : null}

      <Card>
        <CardHeader>
          <CardTitle>Saved Blocks</CardTitle>
          <CardDescription>
            {blocks.length} block{blocks.length === 1 ? '' : 's'}
            {selectedPage !== 'all-pages' ? ` on ${selectedPage}` : ' across all pages'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {blocks.length === 0 ? (
            <div className="py-8 text-center">
              <FileText className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
              <h3 className="text-lg font-medium">No blocks found</h3>
              <p className="mb-4 text-muted-foreground">
                Add the first content block for this page and it will appear here.
              </p>
              <Button onClick={openCreateDialog}>
                <Plus className="mr-2 h-4 w-4" />
                Add Block
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Page</TableHead>
                  <TableHead>Key</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Content</TableHead>
                  <TableHead>Updated</TableHead>
                  <TableHead className="w-[120px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {blocks.map((block) => (
                  <TableRow key={block.id}>
                    <TableCell>
                      <Badge variant="secondary">{block.page_key}</Badge>
                    </TableCell>
                    <TableCell className="font-medium">{block.content_key}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{block.content_type}</Badge>
                    </TableCell>
                    <TableCell className="max-w-md">
                      <div className="line-clamp-3 whitespace-pre-wrap text-sm text-muted-foreground">
                        {block.content_value || 'No content'}
                      </div>
                    </TableCell>
                    <TableCell>{new Date(block.updated_at).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => openEditDialog(block)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDelete(block.id)}>
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
