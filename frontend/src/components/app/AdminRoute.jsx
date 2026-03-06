import { Navigate, Outlet } from "react-router-dom";

import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/context/AuthContext";

export const AdminRoute = () => {
  const { loading, session } = useAuth();

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

  if (!session?.authenticated || session?.role !== "admin") {
    return <Navigate replace to="/login" />;
  }

  return <Outlet />;
};
