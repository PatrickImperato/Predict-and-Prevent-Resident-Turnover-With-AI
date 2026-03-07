import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";

/**
 * Protected route wrapper for demo environment.
 * 
 * Demo-First Approach:
 * - Any authenticated user can access any demo route
 * - No role-based blocking for signed-in users
 * - Session validation and timeout still active
 * - Only unauthenticated users are redirected to login
 * 
 * Note: allowedRoles parameter is preserved for metadata/logging
 * but does NOT block access in demo mode
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

  // DEMO MODE: All authenticated users can access all routes
  // Role checking is disabled to allow smooth demo navigation
  // (Role metadata is preserved in session for display purposes)
  
  // All checks passed - render protected content
  return <Outlet />;
}
