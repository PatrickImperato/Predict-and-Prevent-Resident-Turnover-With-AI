import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";

/**
 * Protected route wrapper with role-based access control.
 * Replaces the old AdminRoute component.
 * 
 * Features:
 * - Session validation
 * - Session timeout detection (24 hour max)
 * - Role-based access control
 * - Deep link preservation
 * - Automatic redirect to login when unauthorized
 */
export function ProtectedRoute({ allowedRoles = [] }) {
  const { loading, session, logout } = useAuth();
  const location = useLocation();

  // Check for session timeout (24 hours)
  useEffect(() => {
    if (session?.authenticated && session?.timestamp) {
      const sessionAge = Date.now() - session.timestamp;
      const maxSessionAge = 24 * 60 * 60 * 1000; // 24 hours
      
      if (sessionAge > maxSessionAge) {
        // Session expired - logout and redirect
        logout();
      }
    }
  }, [session, logout]);

  // Show loading state
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent mx-auto"></div>
          <p className="mt-4 text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Not authenticated - redirect to login with return URL
  if (!session?.authenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // Check if user's role is allowed
  const userRole = session?.role;
  const hasAccess = allowedRoles.length === 0 || allowedRoles.includes(userRole);

  // Role not allowed - redirect to unauthorized
  if (!hasAccess) {
    return <Navigate to="/unauthorized" replace />;
  }

  // All checks passed - render protected content
  return <Outlet />;
}
