import { useEffect, useState } from "react";
import { cmsRequest } from "@/lib/cms-admin";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";

interface PageRecord {
  id: number;
  slug: string;
  title: string;
  template_key: string;
  status: string;
  section_count: number;
  draft_section_count: number;
  updated_at: string;
}

const defaultForm = {
  title: "",
  slug: "",
  template_key: "content-page",
};

export const PagesManagerPage = () => {
  const [pages, setPages] = useState<PageRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [form, setForm] = useState(defaultForm);

  const fetchPages = async () => {
    try {
      setLoading(true);
      const data = await cmsRequest<{ pages: PageRecord[] }>("/admin/pages");
      setPages(data.pages || []);
      setError("");
    } catch (err: any) {
      setError(err.message || "Failed to load pages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  const createPage = async () => {
    try {
      setIsSaving(true);
      await cmsRequest("/admin/pages", {
        method: "POST",
        body: JSON.stringify(form),
      });
      toast.success("Page created");
      setIsOpen(false);
      setForm(defaultForm);
      await fetchPages();
    } catch (err: any) {
      toast.error(err.message || "Failed to create page");
    } finally {
      setIsSaving(false);
    }
  };

  const togglePublish = async (page: PageRecord) => {
    try {
      const route = page.status === "published" ? "unpublish" : "publish";
      await cmsRequest(`/admin/pages/${page.id}/${route}`, { method: "POST" });
      toast.success(page.status === "published" ? "Page moved back to draft" : "Page published");
      await fetchPages();
    } catch (err: any) {
      toast.error(err.message || "Failed to update page");
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center p-8">Loading pages...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold">Pages</h2>
          <p className="text-muted-foreground">
            Manage published page shells, section counts, and publish state.
          </p>
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>Create Page</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Page</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="page-title">Title</Label>
                <Input
                  id="page-title"
                  value={form.title}
                  onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
                  placeholder="About"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="page-slug">Slug</Label>
                <Input
                  id="page-slug"
                  value={form.slug}
                  onChange={(event) => setForm((current) => ({ ...current, slug: event.target.value }))}
                  placeholder="about"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="page-template">Template Key</Label>
                <Input
                  id="page-template"
                  value={form.template_key}
                  onChange={(event) => setForm((current) => ({ ...current, template_key: event.target.value }))}
                  placeholder="content-page"
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button onClick={createPage} disabled={isSaving}>
                {isSaving ? "Creating..." : "Create Page"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {error && <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{error}</div>}

      <Card>
        <CardHeader>
          <CardTitle>All Pages</CardTitle>
          <CardDescription>{pages.length} pages tracked by the CMS</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Template</TableHead>
                <TableHead>Sections</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Updated</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pages.map((page) => (
                <TableRow key={page.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{page.title}</div>
                      <div className="text-sm text-muted-foreground">/{page.slug}</div>
                    </div>
                  </TableCell>
                  <TableCell>{page.template_key}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{page.section_count} total</div>
                      {page.draft_section_count > 0 && (
                        <div className="text-muted-foreground">{page.draft_section_count} draft</div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={page.status === "published" ? "default" : "secondary"}>
                      {page.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(page.updated_at).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" onClick={() => togglePublish(page)}>
                      {page.status === "published" ? "Move To Draft" : "Publish"}
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
