import { Navigate, Outlet } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/context/AuthContext";

export const AdminRoute = () => {
  const { loading, logout, session } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-background px-6 py-8" data-testid="admin-route-loading-state">
        <div className="mx-auto flex max-w-5xl flex-col gap-4">
          <Skeleton className="h-10 w-56" />
          <Skeleton className="h-72 w-full rounded-xl" />
        </div>
      </div>
    );
  }

  if (!session?.authenticated) {
    return <Navigate replace to="/login" />;
  }

  if (session?.role !== "admin") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-6 py-10">
        <Card className="happyco-card max-w-xl" data-testid="admin-route-unsupported-role-card">
          <CardHeader>
            <CardTitle className="text-2xl tracking-[-0.02em]">Authenticated, but not yet supported</CardTitle>
            <CardDescription>
              Manager and resident shells are intentionally deferred. The Phase 4 foundation only
              unlocks the admin diagnostics experience.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="rounded-lg border border-border bg-muted/60 p-4 text-sm text-muted-foreground" data-testid="admin-route-unsupported-role-message">
              Signed in as <span className="font-medium text-foreground">{session.display_name || session.email}</span> with role <span className="font-medium text-foreground">{session.role}</span>.
            </div>
            <Button
              className="w-full"
              data-testid="admin-route-sign-out-button"
              onClick={logout}
              type="button"
            >
              Sign out
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <Outlet />;
};
