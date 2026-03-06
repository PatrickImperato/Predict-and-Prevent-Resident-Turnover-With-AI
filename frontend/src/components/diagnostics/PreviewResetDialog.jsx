import { useState } from "react";
import { RotateCcw } from "lucide-react";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { diagnosticsApi } from "@/lib/api";

export const PreviewResetDialog = ({ canPreviewReset, onComplete }) => {
  const [submitting, setSubmitting] = useState(false);

  const handlePreviewReset = async () => {
    setSubmitting(true);
    try {
      await diagnosticsApi.triggerPreviewResetPlaceholder();
      toast.success("Preview reset placeholder reached.");
      onComplete?.();
    } catch (error) {
      const message =
        error?.response?.data?.detail ||
        "Preview reset remains a protected placeholder in Phase 4.";
      toast.warning(message);
    } finally {
      setSubmitting(false);
    }
  };

  if (!canPreviewReset) {
    return (
      <div className="rounded-xl border border-border/80 bg-muted/40 p-4 text-sm text-muted-foreground" data-testid="diagnostics-preview-reset-unavailable-message">
        Preview reset control is hidden unless the active session is both preview-bound and super-admin authorized.
      </div>
    );
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="rounded-xl" data-testid="diagnostics-preview-reset-trigger" type="button" variant="outline">
          <RotateCcw className="mr-2 h-4 w-4" strokeWidth={1.75} />
          Preview reset placeholder
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent data-testid="diagnostics-preview-reset-dialog">
        <AlertDialogHeader>
          <AlertDialogTitle>Protected placeholder only</AlertDialogTitle>
          <AlertDialogDescription>
            Preview reset has the correct role and environment protections wired, but the actual reset logic is intentionally not implemented in Phase 4.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel data-testid="diagnostics-preview-reset-cancel">Cancel</AlertDialogCancel>
          <AlertDialogAction
            data-testid="diagnostics-preview-reset-confirm"
            disabled={submitting}
            onClick={handlePreviewReset}
          >
            {submitting ? "Checking placeholder…" : "Call placeholder"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
