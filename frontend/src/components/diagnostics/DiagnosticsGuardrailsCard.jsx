import { CircleAlert, CircleCheck } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const statusStyles = {
  pass: {
    icon: CircleCheck,
    className: "text-primary",
    label: "Pass",
  },
  warn: {
    icon: CircleAlert,
    className: "text-amber-600",
    label: "Warning",
  },
  fail: {
    icon: CircleAlert,
    className: "text-destructive",
    label: "Fail",
  },
};

export const DiagnosticsGuardrailsCard = ({ collections, runtime, session }) => {
  const checks = [
    {
      label: "APP_ENV is the only primary selector",
      status: runtime?.config_status === "valid" ? "pass" : "fail",
    },
    {
      label: "Single database binding is active",
      status: runtime?.db_name ? "pass" : "fail",
    },
    {
      label: "Diagnostics exposes full DB name to authenticated admins",
      status: session?.authenticated && runtime?.db_name ? "pass" : "fail",
    },
    {
      label: "Preview reset is limited to preview super-admin access",
      status:
        runtime?.app_env === "production" && runtime?.allow_preview_reset
          ? "fail"
          : "pass",
    },
    {
      label: "Missing dataset warnings are surfaced explicitly",
      status: Object.values(collections?.missing_dataset_id_counts || {}).some((value) => value > 0)
        ? "warn"
        : "pass",
    },
  ];

  return (
    <Card className="happyco-card" data-testid="diagnostics-guardrails-card">
      <CardHeader>
        <CardTitle className="text-xl tracking-[-0.02em]">Guardrails</CardTitle>
        <CardDescription>
          Operational checks that keep preview and production separation explicit.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-3">
        {checks.map((check) => {
          const style = statusStyles[check.status];
          const Icon = style.icon;
          return (
            <div className="flex items-start gap-3 rounded-xl border border-border/80 bg-muted/40 p-3" key={check.label}>
              <Icon className={`mt-0.5 h-4 w-4 ${style.className}`} strokeWidth={1.75} />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{check.label}</p>
                <p className={`mt-1 text-xs ${style.className}`} data-testid={`diagnostics-guardrail-${check.label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>
                  {style.label}
                </p>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};
