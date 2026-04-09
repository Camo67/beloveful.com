import { useEffect, useMemo, useState } from "react";
import { cmsRequest } from "@/lib/cms-admin";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";

interface SlotRecord {
  id: number;
  slot_key: string;
  entity_type: string;
  entity_ref: string;
  label: string;
  allowed_count: number;
  pending_suggestion_count: number;
  published_assignment_count: number;
}

interface SuggestionRecord {
  id: number;
  media_asset_id: number;
  score: number;
  filename: string;
  public_url: string;
  status: string;
}

interface AssignmentRecord {
  id: number;
  media_asset_id: number;
  public_url: string;
  filename: string;
  status: string;
  media_alt_text?: string | null;
}

const defaultSlotForm = {
  slot_key: "",
  entity_type: "page",
  entity_ref: "",
  label: "",
  allowed_count: "1",
};

export const AssignmentQueuePage = () => {
  const [slots, setSlots] = useState<SlotRecord[]>([]);
  const [selectedSlotKey, setSelectedSlotKey] = useState<string>("");
  const [suggestions, setSuggestions] = useState<SuggestionRecord[]>([]);
  const [assignments, setAssignments] = useState<AssignmentRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSlotOpen, setIsSlotOpen] = useState(false);
  const [slotForm, setSlotForm] = useState(defaultSlotForm);

  const selectedSlot = useMemo(
    () => slots.find((slot) => slot.slot_key === selectedSlotKey) || null,
    [selectedSlotKey, slots],
  );

  const fetchSlots = async () => {
    try {
      setLoading(true);
      const data = await cmsRequest<{ slots: SlotRecord[] }>("/admin/slots");
      const nextSlots = data.slots || [];
      setSlots(nextSlots);
      if (!selectedSlotKey && nextSlots[0]?.slot_key) {
        setSelectedSlotKey(nextSlots[0].slot_key);
      }
      setError("");
    } catch (err: any) {
      setError(err.message || "Failed to load slots");
    } finally {
      setLoading(false);
    }
  };

  const fetchSlotDetail = async (slotKey: string) => {
    if (!slotKey) return;

    try {
      const [detail, suggestionData] = await Promise.all([
        cmsRequest<{ assignments: AssignmentRecord[] }>(`/admin/slots/${encodeURIComponent(slotKey)}`),
        cmsRequest<{ suggestions: SuggestionRecord[] }>(`/admin/slots/${encodeURIComponent(slotKey)}/suggestions`),
      ]);
      setAssignments(detail.assignments || []);
      setSuggestions(suggestionData.suggestions || []);
    } catch (err: any) {
      toast.error(err.message || "Failed to load slot details");
    }
  };

  useEffect(() => {
    fetchSlots();
  }, []);

  useEffect(() => {
    if (selectedSlotKey) {
      fetchSlotDetail(selectedSlotKey);
    }
  }, [selectedSlotKey]);

  const createSlotAndRefresh = async () => {
    try {
      await cmsRequest(`/admin/slots/${encodeURIComponent(slotForm.slot_key)}/refresh-suggestions`, {
        method: "POST",
        body: JSON.stringify({
          entity_type: slotForm.entity_type,
          entity_ref: slotForm.entity_ref,
          label: slotForm.label || slotForm.slot_key,
          allowed_count: Number(slotForm.allowed_count || 1),
        }),
      });
      toast.success("Slot created and suggestions queued");
      setIsSlotOpen(false);
      setSlotForm(defaultSlotForm);
      await fetchSlots();
      setSelectedSlotKey(slotForm.slot_key);
      await fetchSlotDetail(slotForm.slot_key);
    } catch (err: any) {
      toast.error(err.message || "Failed to create slot");
    }
  };

  const refreshSuggestions = async () => {
    if (!selectedSlotKey) return;
    try {
      await cmsRequest(`/admin/slots/${encodeURIComponent(selectedSlotKey)}/refresh-suggestions`, {
        method: "POST",
      });
      toast.success("Suggestions refreshed");
      await fetchSlots();
      await fetchSlotDetail(selectedSlotKey);
    } catch (err: any) {
      toast.error(err.message || "Failed to refresh suggestions");
    }
  };

  const acceptSuggestion = async (suggestion: SuggestionRecord) => {
    if (!selectedSlotKey) return;
    try {
      await cmsRequest(`/admin/slots/${encodeURIComponent(selectedSlotKey)}/assignments`, {
        method: "POST",
        body: JSON.stringify({
          media_asset_id: suggestion.media_asset_id,
          suggestion_id: suggestion.id,
          status: "draft",
        }),
      });
      toast.success("Suggestion accepted as draft assignment");
      await fetchSlotDetail(selectedSlotKey);
      await fetchSlots();
    } catch (err: any) {
      toast.error(err.message || "Failed to accept suggestion");
    }
  };

  const publishAssignment = async (assignmentId: number) => {
    try {
      await cmsRequest(`/admin/assignments/${assignmentId}/publish`, { method: "POST" });
      toast.success("Assignment published");
      if (selectedSlotKey) {
        await fetchSlotDetail(selectedSlotKey);
        await fetchSlots();
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to publish assignment");
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center p-8">Loading assignment queue...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold">Assignment Queue</h2>
          <p className="text-muted-foreground">
            Review Node-RED style suggestions, accept them as drafts, and publish final slot assignments.
          </p>
        </div>

        <div className="flex gap-3">
          <Dialog open={isSlotOpen} onOpenChange={setIsSlotOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">Create Slot</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Slot</DialogTitle>
              </DialogHeader>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="slot-key">Slot Key</Label>
                  <Input
                    id="slot-key"
                    value={slotForm.slot_key}
                    onChange={(event) => setSlotForm((current) => ({ ...current, slot_key: event.target.value }))}
                    placeholder="homepage.hero"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="entity-type">Entity Type</Label>
                  <Select
                    value={slotForm.entity_type}
                    onValueChange={(value) => setSlotForm((current) => ({ ...current, entity_type: value }))}
                  >
                    <SelectTrigger id="entity-type">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="page">Page</SelectItem>
                      <SelectItem value="section">Section</SelectItem>
                      <SelectItem value="gallery">Gallery</SelectItem>
                      <SelectItem value="global">Global</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="entity-ref">Entity Ref</Label>
                  <Input
                    id="entity-ref"
                    value={slotForm.entity_ref}
                    onChange={(event) => setSlotForm((current) => ({ ...current, entity_ref: event.target.value }))}
                    placeholder="home or home:hero"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="slot-label">Label</Label>
                  <Input
                    id="slot-label"
                    value={slotForm.label}
                    onChange={(event) => setSlotForm((current) => ({ ...current, label: event.target.value }))}
                    placeholder="Homepage Hero"
                  />
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsSlotOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={createSlotAndRefresh}>Create + Refresh Suggestions</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Button onClick={refreshSuggestions} disabled={!selectedSlotKey}>
            Refresh Suggestions
          </Button>
        </div>
      </div>

      {error && <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{error}</div>}

      <Card>
        <CardHeader>
          <CardTitle>Slots</CardTitle>
          <CardDescription>{slots.length} slot definitions configured</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-[260px_1fr]">
          <div className="space-y-2">
            {slots.map((slot) => (
              <button
                key={slot.id}
                type="button"
                className={`w-full rounded-lg border px-3 py-3 text-left transition-colors ${
                  slot.slot_key === selectedSlotKey ? "border-primary bg-primary/5" : "border-border hover:bg-accent"
                }`}
                onClick={() => setSelectedSlotKey(slot.slot_key)}
              >
                <div className="font-medium">{slot.label}</div>
                <div className="text-sm text-muted-foreground">{slot.slot_key}</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  <Badge variant="secondary">{slot.pending_suggestion_count} pending</Badge>
                  <Badge variant="outline">{slot.published_assignment_count} live</Badge>
                </div>
              </button>
            ))}
          </div>

          <div className="space-y-6">
            {selectedSlot ? (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle>{selectedSlot.label}</CardTitle>
                    <CardDescription>
                      {selectedSlot.entity_type} · {selectedSlot.entity_ref}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">allowed: {selectedSlot.allowed_count}</Badge>
                      <Badge variant="secondary">{suggestions.length} suggestions</Badge>
                      <Badge variant="secondary">{assignments.length} assignments</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Suggestions</CardTitle>
                    <CardDescription>Pending image candidates for this slot</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Image</TableHead>
                          <TableHead>Score</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {suggestions.map((suggestion) => (
                          <TableRow key={suggestion.id}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <img
                                  src={suggestion.public_url}
                                  alt={suggestion.filename}
                                  className="h-12 w-12 rounded-md object-cover"
                                />
                                <div className="text-sm">{suggestion.filename}</div>
                              </div>
                            </TableCell>
                            <TableCell>{Number(suggestion.score).toFixed(2)}</TableCell>
                            <TableCell>
                              <Badge variant="secondary">{suggestion.status}</Badge>
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => acceptSuggestion(suggestion)}
                                disabled={suggestion.status !== "pending"}
                              >
                                Accept As Draft
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Assignments</CardTitle>
                    <CardDescription>Draft and published assignments for this slot</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Image</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {assignments.map((assignment) => (
                          <TableRow key={assignment.id}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <img
                                  src={assignment.public_url}
                                  alt={assignment.filename}
                                  className="h-12 w-12 rounded-md object-cover"
                                />
                                <div className="text-sm">{assignment.filename}</div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant={assignment.status === "published" ? "default" : "secondary"}>
                                {assignment.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => publishAssignment(assignment.id)}
                                disabled={assignment.status === "published"}
                              >
                                Publish
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card>
                <CardContent className="py-10 text-center text-muted-foreground">
                  Create your first slot to begin routing image suggestions.
                </CardContent>
              </Card>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
