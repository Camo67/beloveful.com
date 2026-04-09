import { useEffect, useState } from "react";
import { cmsRequest } from "@/lib/cms-admin";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";

interface GalleryRecord {
  id: number;
  slug: string;
  title: string;
  description?: string | null;
  status: string;
  item_count: number;
  updated_at: string;
}

const defaultForm = {
  title: "",
  slug: "",
  description: "",
};

export const GalleriesAdminPage = () => {
  const [galleries, setGalleries] = useState<GalleryRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [form, setForm] = useState(defaultForm);

  const fetchGalleries = async () => {
    try {
      setLoading(true);
      const data = await cmsRequest<{ galleries: GalleryRecord[] }>("/admin/galleries");
      setGalleries(data.galleries || []);
      setError("");
    } catch (err: any) {
      setError(err.message || "Failed to load galleries");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGalleries();
  }, []);

  const createGallery = async () => {
    try {
      setIsSaving(true);
      await cmsRequest("/admin/galleries", {
        method: "POST",
        body: JSON.stringify(form),
      });
      toast.success("Gallery created");
      setIsOpen(false);
      setForm(defaultForm);
      await fetchGalleries();
    } catch (err: any) {
      toast.error(err.message || "Failed to create gallery");
    } finally {
      setIsSaving(false);
    }
  };

  const toggleStatus = async (gallery: GalleryRecord) => {
    try {
      const nextStatus = gallery.status === "published" ? "draft" : "published";
      await cmsRequest(`/admin/galleries/${gallery.id}`, {
        method: "PATCH",
        body: JSON.stringify({ status: nextStatus }),
      });
      toast.success(nextStatus === "published" ? "Gallery published" : "Gallery moved to draft");
      await fetchGalleries();
    } catch (err: any) {
      toast.error(err.message || "Failed to update gallery");
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center p-8">Loading galleries...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold">Galleries</h2>
          <p className="text-muted-foreground">
            Manage front-end gallery collections and their publish state.
          </p>
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>Create Gallery</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Gallery</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="gallery-title">Title</Label>
                <Input
                  id="gallery-title"
                  value={form.title}
                  onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gallery-slug">Slug</Label>
                <Input
                  id="gallery-slug"
                  value={form.slug}
                  onChange={(event) => setForm((current) => ({ ...current, slug: event.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gallery-description">Description</Label>
                <Textarea
                  id="gallery-description"
                  value={form.description}
                  onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))}
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button onClick={createGallery} disabled={isSaving}>
                {isSaving ? "Creating..." : "Create Gallery"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {error && <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{error}</div>}

      <Card>
        <CardHeader>
          <CardTitle>All Galleries</CardTitle>
          <CardDescription>{galleries.length} galleries tracked by the CMS</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Gallery</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Updated</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {galleries.map((gallery) => (
                <TableRow key={gallery.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{gallery.title}</div>
                      <div className="text-sm text-muted-foreground">/{gallery.slug}</div>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-sm">
                    <div className="truncate text-sm text-muted-foreground">
                      {gallery.description || "No description"}
                    </div>
                  </TableCell>
                  <TableCell>{gallery.item_count}</TableCell>
                  <TableCell>
                    <Badge variant={gallery.status === "published" ? "default" : "secondary"}>
                      {gallery.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(gallery.updated_at).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" onClick={() => toggleStatus(gallery)}>
                      {gallery.status === "published" ? "Move To Draft" : "Publish"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
