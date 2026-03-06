import { LogOut, Shield } from "lucide-react";

import { EnvironmentBadge } from "@/components/layout/EnvironmentBadge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

export const AdminTopbar = ({ pageTitle }) => {
  const { logout, session } = useAuth();

  return (
    <header
      className="sticky top-0 z-20 border-b border-border/80 bg-background/90 backdrop-blur"
      data-testid="admin-topbar"
    >
      <div className="flex flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.08em] text-muted-foreground">Admin</p>
          <h1 className="mt-1 font-[var(--font-heading)] text-2xl font-semibold tracking-[-0.02em] text-foreground" data-testid="admin-topbar-page-title">
            {pageTitle}
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <EnvironmentBadge appEnv={session.app_env} dataTestId="admin-topbar-environment-badge" />
          <Badge className="gap-2 rounded-full bg-muted px-3 py-1 text-muted-foreground" data-testid="admin-topbar-user-role-badge" variant="secondary">
            <Shield className="h-3.5 w-3.5" strokeWidth={1.75} />
            {session.is_super_admin ? "Super-admin" : session.role || "Session"}
          </Badge>
          <div className="rounded-full border border-border bg-card px-3 py-2 text-sm text-foreground" data-testid="admin-topbar-user-label">
            {session.display_name || session.email || "Authenticated user"}
          </div>
          <Button
            className="rounded-full"
            data-testid="admin-topbar-logout-button"
            onClick={logout}
            size="sm"
            type="button"
            variant="outline"
          >
            <LogOut className="mr-2 h-4 w-4" strokeWidth={1.75} />
            Sign out
          </Button>
        </div>
      </div>
    </header>
  );
};
