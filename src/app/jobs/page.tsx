"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { History } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getJobHistory } from "@/lib/history";
import type { JobHistoryEntry } from "@/types/api";

const STATUS_CONFIG: Record<
  string,
  { label: string; variant: "default" | "secondary" | "destructive" | "outline" }
> = {
  pending: { label: "Pending", variant: "secondary" },
  running: { label: "Running", variant: "default" },
  completed: { label: "Completed", variant: "outline" },
  cancelled: { label: "Cancelled", variant: "destructive" },
  failed: { label: "Failed", variant: "destructive" },
};

export default function JobsPage() {
  const router = useRouter();
  const [jobs, setJobs] = useState<JobHistoryEntry[]>([]);

  useEffect(() => {
    setJobs(getJobHistory());
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <History className="size-6" />
        <h1 className="text-2xl font-bold">ジョブ履歴</h1>
      </div>

      {jobs.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">
              ジョブ履歴がありません。テンプレートからジョブを実行するか、データ増幅を開始してください。
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="rounded-lg border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-primary hover:bg-primary border-b-0">
                <TableHead className="text-primary-foreground">種別</TableHead>
                <TableHead className="text-primary-foreground">プロジェクト</TableHead>
                <TableHead className="text-right text-primary-foreground">件数</TableHead>
                <TableHead className="text-primary-foreground">ステータス</TableHead>
                <TableHead className="text-primary-foreground">実行日時</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {jobs.map((job) => {
                const statusConfig = STATUS_CONFIG[job.status] ?? STATUS_CONFIG.pending;
                const params = new URLSearchParams();
                if (job.target_dataset_name) params.set("dataset", job.target_dataset_name);
                if (job.weave_dataset_url) params.set("dataset_url", job.weave_dataset_url);
                if (job.project_name) params.set("project", job.project_name);
                if (job.template_id) params.set("template_id", job.template_id);

                return (
                  <TableRow
                    key={job.job_id}
                    className="bg-card hover:bg-muted/50 cursor-pointer"
                    onClick={() => router.push(`/jobs/${job.job_id}?${params.toString()}`)}
                  >
                    <TableCell className="font-medium">
                      {job.template_name || "データ増幅"}
                    </TableCell>
                    <TableCell>{job.project_name}</TableCell>
                    <TableCell className="text-right">{job.num_samples}</TableCell>
                    <TableCell>
                      <Badge variant={statusConfig.variant}>{statusConfig.label}</Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(job.created_at).toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" })}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
