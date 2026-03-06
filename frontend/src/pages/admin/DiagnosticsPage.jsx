import { useCallback, useEffect, useMemo, useState } from "react";
import { RefreshCw } from "lucide-react";
import { toast } from "sonner";

import { DiagnosticsCollectionsCard } from "@/components/diagnostics/DiagnosticsCollectionsCard";
import { DiagnosticsGuardrailsCard } from "@/components/diagnostics/DiagnosticsGuardrailsCard";
import { DiagnosticsRuntimeCard } from "@/components/diagnostics/DiagnosticsRuntimeCard";
import { DiagnosticsSeedCard } from "@/components/diagnostics/DiagnosticsSeedCard";
import { DiagnosticsSessionCard } from "@/components/diagnostics/DiagnosticsSessionCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/context/AuthContext";
import { diagnosticsApi } from "@/lib/api";

export default function DiagnosticsPage() {
  const { refreshSession, session } = useAuth();
  const [loading, setLoading] = useState(true);
  const [runtime, setRuntime] = useState(null);
  const [diagnosticsSession, setDiagnosticsSession] = useState(null);
  const [collections, setCollections] = useState(null);
  const [seeds, setSeeds] = useState(null);

  const loadDiagnostics = useCallback(async () => {
    setLoading(true);
    try {
      const [runtimeResponse, sessionResponse, collectionsResponse, seedsResponse] =
        await Promise.all([
          diagnosticsApi.getRuntime(),
          diagnosticsApi.getSession(),
          diagnosticsApi.getCollections(),
          diagnosticsApi.getSeeds(),
        ]);

      setRuntime(runtimeResponse.data);
      setDiagnosticsSession(sessionResponse.data);
      setCollections(collectionsResponse.data);
      setSeeds(seedsResponse.data);
    } catch (error) {
      toast.error(error?.response?.data?.detail || "Unable to load diagnostics.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDiagnostics();
  }, [loadDiagnostics]);

  const canPreviewReset = useMemo(() => {
    return (
      session?.authenticated &&
      session?.role === "admin" &&
      session?.is_super_admin &&
      runtime?.app_env === "preview" &&
      runtime?.allow_preview_reset === true
    );
  }, [runtime, session]);

  if (loading) {
    return (
      <div className="grid gap-4" data-testid="diagnostics-page-loading-state">
        <Skeleton className="h-16 w-full rounded-xl" />
        <Skeleton className="h-72 w-full rounded-xl" />
        <Skeleton className="h-72 w-full rounded-xl" />
      </div>
    );
  }

  return (
    <div className="space-y-6" data-testid="diagnostics-page-root">
      <div className="flex flex-col gap-4 rounded-3xl border border-border/80 bg-card/80 p-6 shadow-[var(--shadow-soft)] lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.08em] text-muted-foreground">Seed control and diagnostics</p>
          <h2 className="mt-2 font-[var(--font-heading)] text-3xl font-semibold tracking-[-0.02em] text-foreground" data-testid="diagnostics-page-title">
            Environment and diagnostics control center
          </h2>
          <p className="mt-3 max-w-3xl text-sm text-muted-foreground">
            Preview reset is now wired to the deterministic demoA seed service while production bootstrap remains protected internal scaffolding only.
          </p>
        </div>
        <Button
          className="rounded-xl"
          data-testid="diagnostics-refresh-button"
          onClick={async () => {
            await refreshSession();
            await loadDiagnostics();
            toast.success("Diagnostics refreshed.");
          }}
          type="button"
          variant="outline"
        >
          <RefreshCw className="mr-2 h-4 w-4" strokeWidth={1.75} />
          Refresh diagnostics
        </Button>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <DiagnosticsRuntimeCard runtime={runtime} />
        <DiagnosticsSessionCard session={diagnosticsSession} />
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <DiagnosticsCollectionsCard collections={collections} />
        <div className="grid gap-4">
          <DiagnosticsSeedCard
            canPreviewReset={canPreviewReset}
            onPreviewResetComplete={loadDiagnostics}
            runtime={runtime}
            seeds={seeds}
          />
          <DiagnosticsGuardrailsCard
            collections={collections}
            runtime={runtime}
            session={diagnosticsSession}
          />
        </div>
      </div>
    </div>
  );
}
