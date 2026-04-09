import { useEffect, useMemo, useState } from "react";
import { cmsRequest } from "@/lib/cms-admin";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface PageRecord {
  id: number;
  title: string;
  slug: string;
  status: string;
}

interface GalleryRecord {
  id: number;
  title: string;
  slug: string;
  status: string;
}

interface SlotRecord {
  slot_key: string;
  pending_suggestion_count: number;
  published_assignment_count: number;
}

export const PublishQueuePage = () => {
  const [pages, setPages] = useState<PageRecord[]>([]);
  const [galleries, setGalleries] = useState<GalleryRecord[]>([]);
  const [slots, setSlots] = useState<SlotRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const [pageData, galleryData, slotData] = await Promise.all([
          cmsRequest<{ pages: PageRecord[] }>("/admin/pages"),
          cmsRequest<{ galleries: GalleryRecord[] }>("/admin/galleries"),
          cmsRequest<{ slots: SlotRecord[] }>("/admin/slots"),
        ]);
        setPages(pageData.pages || []);
        setGalleries(galleryData.galleries || []);
        setSlots(slotData.slots || []);
        setError("");
      } catch (err: any) {
        setError(err.message || "Failed to load publish queue");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const draftPages = useMemo(() => pages.filter((page) => page.status === "draft"), [pages]);
  const draftGalleries = useMemo(() => galleries.filter((gallery) => gallery.status === "draft"), [galleries]);
  const pendingSlots = useMemo(() => slots.filter((slot) => slot.pending_suggestion_count > 0), [slots]);

  if (loading) {
    return <div className="flex items-center justify-center p-8">Loading publish queue...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Publish Queue</h2>
        <p className="text-muted-foreground">
          Review draft content and pending suggestion work before publishing changes.
        </p>
      </div>

      {error && <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{error}</div>}

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Draft Pages</CardTitle>
            <CardDescription>{draftPages.length} pages waiting for publish</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {draftPages.map((page) => (
              <div key={page.id} className="rounded-lg border p-3">
                <div className="font-medium">{page.title}</div>
                <div className="text-sm text-muted-foreground">/{page.slug}</div>
              </div>
            ))}
            {draftPages.length === 0 && <div className="text-sm text-muted-foreground">No draft pages.</div>}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Draft Galleries</CardTitle>
            <CardDescription>{draftGalleries.length} galleries waiting for publish</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {draftGalleries.map((gallery) => (
              <div key={gallery.id} className="rounded-lg border p-3">
                <div className="font-medium">{gallery.title}</div>
                <div className="text-sm text-muted-foreground">/{gallery.slug}</div>
              </div>
            ))}
            {draftGalleries.length === 0 && <div className="text-sm text-muted-foreground">No draft galleries.</div>}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pending Suggestions</CardTitle>
            <CardDescription>{pendingSlots.length} slots need editorial review</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {pendingSlots.map((slot) => (
              <div key={slot.slot_key} className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <div className="font-medium">{slot.slot_key}</div>
                  <div className="text-sm text-muted-foreground">
                    {slot.published_assignment_count} live assignments
                  </div>
                </div>
                <Badge variant="secondary">{slot.pending_suggestion_count} pending</Badge>
              </div>
            ))}
            {pendingSlots.length === 0 && <div className="text-sm text-muted-foreground">No pending suggestions.</div>}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
