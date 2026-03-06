import { useMemo, useState } from "react";
import { RotateCcw } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { diagnosticsApi } from "@/lib/api";

const RESET_PREVIEW_PHRASE = "RESET PREVIEW";

export const PreviewResetDialog = ({ canPreviewReset, datasetId, dbName, onComplete }) => {
  const [confirmationPhrase, setConfirmationPhrase] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const confirmationMatches = useMemo(
    () => confirmationPhrase.trim().toUpperCase() === RESET_PREVIEW_PHRASE,
    [confirmationPhrase],
  );

  const handlePreviewReset = async () => {
    if (!confirmationMatches) {
      toast.error("Type the confirmation phrase exactly to continue.");
      return;
    }

    setSubmitting(true);
    try {
      const response = await diagnosticsApi.runPreviewReset({
        confirmation_phrase: confirmationPhrase,
      });
      toast.success(response.data.message || "Preview database reseeded successfully.");
      setConfirmationPhrase("");
      onComplete?.();
    } catch (error) {
      const message =
        error?.response?.data?.detail ||
        "Preview reset failed. Please check diagnostics and try again.";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  if (!canPreviewReset) {
    return (
      <div className="rounded-xl border border-border/80 bg-muted/40 p-4 text-sm text-muted-foreground" data-testid="diagnostics-preview-reset-unavailable-message">
        Preview reset is available only to a super-admin session bound to the preview environment.
      </div>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-xl" data-testid="diagnostics-preview-reset-trigger" type="button" variant="outline">
          <RotateCcw className="mr-2 h-4 w-4" strokeWidth={1.75} />
          Reset preview demoA
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-3xl border-border/80" data-testid="diagnostics-preview-reset-dialog">
        <DialogHeader>
          <DialogTitle>Reset preview demo dataset</DialogTitle>
          <DialogDescription>
            This reseeds the preview database only. Managed HappyCo collections are cleared and demoA is inserted again with stable IDs and rolling dates.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-3 rounded-2xl border border-border/80 bg-muted/35 p-4 text-sm text-muted-foreground">
          <div className="flex items-center justify-between gap-4">
            <span>Database</span>
            <span className="font-mono text-foreground" data-testid="diagnostics-preview-reset-db-name">{dbName}</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span>Dataset</span>
            <span className="font-mono text-foreground" data-testid="diagnostics-preview-reset-dataset-id">{datasetId}</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span>Required phrase</span>
            <span className="font-mono text-foreground" data-testid="diagnostics-preview-reset-required-phrase">{RESET_PREVIEW_PHRASE}</span>
          </div>
        </div>

        <div className="space-y-2">
          <Label data-testid="diagnostics-preview-reset-input-label" htmlFor="preview-reset-confirmation">
            Type the confirmation phrase
          </Label>
          <Input
            className="h-11 rounded-xl"
            data-testid="diagnostics-preview-reset-input"
            id="preview-reset-confirmation"
            onChange={(event) => setConfirmationPhrase(event.target.value)}
            placeholder={RESET_PREVIEW_PHRASE}
            value={confirmationPhrase}
          />
        </div>

        <DialogFooter>
          <Button className="rounded-xl" data-testid="diagnostics-preview-reset-confirm" disabled={!confirmationMatches || submitting} onClick={handlePreviewReset} type="button">
            {submitting ? "Resetting preview…" : "Run preview reset"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
