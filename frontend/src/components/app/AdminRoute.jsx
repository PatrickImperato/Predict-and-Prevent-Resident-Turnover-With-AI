import { Navigate, Outlet } from "react-router-dom";

import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/context/AuthContext";

const SESSION_STORAGE_KEY = "happyco-concierge-session-cache";

const readCachedAdminSession = () => {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw);
    return parsed?.authenticated && parsed?.role === "admin" ? parsed : null;
  } catch {
    return null;
  }
};

export const AdminRoute = () => {
  const { loading, session } = useAuth();
  const cachedAdminSession = readCachedAdminSession();
  const effectiveSession = session?.authenticated ? session : cachedAdminSession;

  if (loading && !effectiveSession?.authenticated) {
    return (
      <div className="min-h-screen bg-background px-6 py-8" data-testid="admin-route-loading-state">
        <div className="mx-auto flex max-w-5xl flex-col gap-4">
          <Skeleton className="h-10 w-56" />
          <Skeleton className="h-72 w-full rounded-xl" />
        </div>
      </div>
    );
  }

  if (!effectiveSession?.authenticated || effectiveSession?.role !== "admin") {
    return <Navigate replace to="/login" />;
  }

  return <Outlet />;
};
