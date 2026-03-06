import { DatabaseZap } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { PreviewResetDialog } from "@/components/diagnostics/PreviewResetDialog";

export const DiagnosticsSeedCard = ({ canPreviewReset, onPreviewResetComplete, seeds }) => {
  return (
    <Card className="happyco-card" data-testid="diagnostics-seed-card">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/12 text-primary">
            <DatabaseZap className="h-5 w-5" strokeWidth={1.75} />
          </div>
          <div>
            <CardTitle className="text-xl tracking-[-0.02em]">Seed and bootstrap status</CardTitle>
            <CardDescription>
              Protected placeholders only in Phase 4. No functional reset or bootstrap yet.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-border/80 bg-muted/40 p-3" data-testid="diagnostics-seed-last-action">
            <p className="text-sm text-muted-foreground">Last seed action</p>
            <p className="mt-1 font-medium text-foreground">{seeds?.last_seed_action || "—"}</p>
          </div>
          <div className="rounded-xl border border-border/80 bg-muted/40 p-3" data-testid="diagnostics-seed-target-env">
            <p className="text-sm text-muted-foreground">Target environment</p>
            <p className="mt-1 font-medium text-foreground">{seeds?.last_seed_target_env || "—"}</p>
          </div>
          <div className="rounded-xl border border-border/80 bg-muted/40 p-3" data-testid="diagnostics-seed-dataset-id">
            <p className="text-sm text-muted-foreground">Dataset</p>
            <p className="mt-1 font-mono text-foreground">{seeds?.last_seed_dataset_id || "—"}</p>
          </div>
          <div className="rounded-xl border border-border/80 bg-muted/40 p-3" data-testid="diagnostics-seed-status">
            <p className="text-sm text-muted-foreground">Status</p>
            <p className="mt-1 font-medium text-foreground">{seeds?.seed_status || "—"}</p>
          </div>
        </div>
        <div className="rounded-xl border border-border/80 bg-secondary/35 p-4 text-sm text-secondary-foreground" data-testid="diagnostics-seed-production-bootstrap-placeholder">
          Production bootstrap remains a deployment-time protected placeholder and is intentionally not exposed in the runtime admin UI.
        </div>
        <PreviewResetDialog canPreviewReset={canPreviewReset} onComplete={onPreviewResetComplete} />
      </CardContent>
    </Card>
  );
};
