import { useEffect, useState } from "react";
import { cmsRequest } from "@/lib/cms-admin";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface ActivityItem {
  id: number;
  action: string;
  entity_type: string;
  entity_id?: number | null;
  actor_name?: string | null;
  created_at: string;
}

interface WorkflowRun {
  id: number;
  flow_name: string;
  trigger_action: string;
  entity_type: string;
  entity_id?: number | null;
  status: string;
  created_at: string;
}

export const ActivityLogPage = () => {
  const [activity, setActivity] = useState<ActivityItem[]>([]);
  const [workflows, setWorkflows] = useState<WorkflowRun[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const [activityData, workflowData] = await Promise.all([
          cmsRequest<{ activity: ActivityItem[] }>("/admin/activity"),
          cmsRequest<{ workflow_runs: WorkflowRun[] }>("/admin/workflow-runs"),
        ]);
        setActivity(activityData.activity || []);
        setWorkflows(workflowData.workflow_runs || []);
        setError("");
      } catch (err: any) {
        setError(err.message || "Failed to load activity");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center p-8">Loading activity...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Activity Log</h2>
        <p className="text-muted-foreground">
          Review recent editorial actions and Node-RED workflow traffic.
        </p>
      </div>

      {error && <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{error}</div>}

      <div className="grid gap-6 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>{activity.length} recent audit entries</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Action</TableHead>
                  <TableHead>Entity</TableHead>
                  <TableHead>Actor</TableHead>
                  <TableHead>When</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activity.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.action}</TableCell>
                    <TableCell>
                      {item.entity_type}
                      {item.entity_id ? ` #${item.entity_id}` : ""}
                    </TableCell>
                    <TableCell>{item.actor_name || "System"}</TableCell>
                    <TableCell>{new Date(item.created_at).toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Workflow Runs</CardTitle>
            <CardDescription>{workflows.length} recent automation jobs</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Flow</TableHead>
                  <TableHead>Trigger</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {workflows.map((run) => (
                  <TableRow key={run.id}>
                    <TableCell className="font-medium">{run.flow_name}</TableCell>
                    <TableCell>{run.trigger_action}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          run.status === "completed"
                            ? "default"
                            : run.status === "failed"
                              ? "destructive"
                              : "secondary"
                        }
                      >
                        {run.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(run.created_at).toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
