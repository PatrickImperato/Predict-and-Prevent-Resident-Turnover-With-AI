import { ShieldCheck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const DiagnosticsSessionCard = ({ session }) => {
  return (
    <Card className="happyco-card" data-testid="diagnostics-session-card">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/12 text-primary">
            <ShieldCheck className="h-5 w-5" strokeWidth={1.75} />
          </div>
          <div>
            <CardTitle className="text-xl tracking-[-0.02em]">Current session</CardTitle>
            <CardDescription>Authenticated user identity and role context.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="grid gap-3">
        <div className="flex items-center justify-between rounded-xl border border-border/80 bg-muted/40 p-3">
          <span className="text-sm text-muted-foreground">Authenticated</span>
          <Badge className={session?.authenticated ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"} data-testid="diagnostics-session-authenticated-badge" variant="secondary">
            {session?.authenticated ? "true" : "false"}
          </Badge>
        </div>
        <div className="flex items-center justify-between rounded-xl border border-border/80 bg-muted/40 p-3">
          <span className="text-sm text-muted-foreground">Current user</span>
          <span className="text-sm font-medium text-foreground" data-testid="diagnostics-session-display-name">
            {session?.display_name || "—"}
          </span>
        </div>
        <div className="flex items-center justify-between rounded-xl border border-border/80 bg-muted/40 p-3">
          <span className="text-sm text-muted-foreground">Email</span>
          <span className="font-mono text-sm text-foreground" data-testid="diagnostics-session-email">
            {session?.email || "—"}
          </span>
        </div>
        <div className="flex items-center justify-between rounded-xl border border-border/80 bg-muted/40 p-3">
          <span className="text-sm text-muted-foreground">Role</span>
          <Badge className="bg-secondary text-secondary-foreground" data-testid="diagnostics-session-role-badge" variant="secondary">
            {session?.role || "—"}
          </Badge>
        </div>
        <div className="flex items-center justify-between rounded-xl border border-border/80 bg-muted/40 p-3">
          <span className="text-sm text-muted-foreground">Super-admin</span>
          <Badge className={session?.is_super_admin ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"} data-testid="diagnostics-session-super-admin-badge" variant="secondary">
            {session?.is_super_admin ? "true" : "false"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};
