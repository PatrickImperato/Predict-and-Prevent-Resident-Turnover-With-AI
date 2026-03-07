import { Badge } from "@/components/ui/badge";
import { EnvironmentBadge } from "@/components/layout/EnvironmentBadge";
import { AdminUserMenu } from "@/components/layout/AdminUserMenu";
import { useAuth } from "@/context/AuthContext";

export const AdminTopbar = ({ pageTitle }) => {
  const { session } = useAuth();

  return (
    <header
      className="sticky top-0 z-20 border-b border-border/80 bg-background/90 backdrop-blur"
      data-testid="admin-topbar"
    >
      <div className="flex flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.08em] text-muted-foreground">HappyCo Concierge Admin</p>
          <h1 className="mt-1 font-[var(--font-heading)] text-2xl font-semibold tracking-[-0.02em] text-foreground" data-testid="admin-topbar-page-title">
            {pageTitle}
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <AdminUserMenu />
        </div>
      </div>
    </header>
  );
};
