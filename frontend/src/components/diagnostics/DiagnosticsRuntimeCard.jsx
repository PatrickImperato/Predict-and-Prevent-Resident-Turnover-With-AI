import { ServerCog } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const runtimeRows = [
  { label: "Environment", key: "app_env" },
  { label: "Host", key: "host" },
  { label: "Database", key: "db_name" },
  { label: "Build channel", key: "build_channel" },
  { label: "Version", key: "app_version" },
  { label: "Build ID", key: "app_build_id" },
  { label: "Build time", key: "app_build_time" },
  { label: "Demo mode", key: "demo_mode_enabled" },
  { label: "Preview reset flag", key: "allow_preview_reset" },
  { label: "Dataset default", key: "dataset_default" },
  { label: "Config status", key: "config_status" },
];

export const DiagnosticsRuntimeCard = ({ runtime }) => {
  return (
    <Card className="happyco-card" data-testid="diagnostics-runtime-card">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/12 text-primary">
            <ServerCog className="h-5 w-5" strokeWidth={1.75} />
          </div>
          <div>
            <CardTitle className="text-xl tracking-[-0.02em]">Runtime</CardTitle>
            <CardDescription>Explicit environment and database binding details.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="grid gap-3">
        {runtimeRows.map((row) => (
          <div className="flex items-start justify-between gap-4 rounded-xl border border-border/80 bg-muted/40 p-3" key={row.key}>
            <span className="text-sm text-muted-foreground">{row.label}</span>
            <span className={row.key.includes("db") || row.key.includes("build") ? "font-mono text-right text-sm text-foreground" : "text-right text-sm font-medium text-foreground"} data-testid={`diagnostics-runtime-${row.key}`}>
              {typeof runtime?.[row.key] === "boolean" ? String(runtime[row.key]) : runtime?.[row.key] || "—"}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
