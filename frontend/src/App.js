import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { AppProviders } from "@/components/app/AppProviders";
import { ProtectedRoute } from "@/components/app/ProtectedRoute";
import { AdminShell } from "@/components/layout/AdminShell";
import { ManagerLayout } from "@/components/layout/ManagerLayout";
import { ResidentLayout } from "@/components/layout/ResidentLayout";
import { useAuth } from "@/context/AuthContext";

// Admin pages
import AnalyticsPage from "@/pages/admin/AnalyticsPage";
import DashboardPage from "@/pages/admin/DashboardPage";
import PropertiesPage from "@/pages/admin/PropertiesPage";
import PropertyDetailPage from "@/pages/admin/PropertyDetailPage";
import ProvidersPage from "@/pages/admin/ProvidersPage";
import SettingsPage from "@/pages/admin/SettingsPage";
import TenantsPage from "@/pages/admin/TenantsPage";

// Manager pages
import ManagerDashboard from "@/pages/manager/ManagerDashboard";
import ManagerResidents from "@/pages/manager/ManagerResidents";
import ManagerResidentDetail from "@/pages/manager/ManagerResidentDetail";
import ManagerChurnRisk from "@/pages/manager/ManagerChurnRisk";
import ManagerRetentionRules from "@/pages/manager/ManagerRetentionRules";
import ManagerProviders from "@/pages/manager/ManagerProviders";
import ManagerMaintenance from "@/pages/manager/ManagerMaintenance";
import ManagerRevenue from "@/pages/manager/ManagerRevenue";
import ManagerBookings from "@/pages/manager/ManagerBookings";

// Resident pages
import ResidentDashboard from "@/pages/resident/ResidentDashboard";
import ResidentConcierge from "@/pages/resident/ResidentConcierge";
import ResidentServices from "@/pages/resident/ResidentServices";
import ResidentBookings from "@/pages/resident/ResidentBookings";
import ResidentMaintenance from "@/pages/resident/ResidentMaintenance";

// Public pages
import LandingPage from "@/pages/LandingPage";
import LegalPage from "@/pages/LegalPage";
import LoginPage from "@/pages/LoginPage";
import PrivacyPage from "@/pages/PrivacyPage";
import NotFoundPage from "@/pages/NotFoundPage";
import UnauthorizedPage from "@/pages/UnauthorizedPage";

function RootRoute() {
  const { loading, session } = useAuth();

  if (loading) {
    return <div className="min-h-screen bg-background" data-testid="root-route-loading-state" />;
  }

  if (session?.authenticated) {
    if (session?.role === "admin") {
      return <Navigate replace to="/app/admin/dashboard" />;
    }
    if (session?.role === "manager") {
      return <Navigate replace to="/app/manager/dashboard" />;
    }
    if (session?.role === "resident") {
      return <Navigate replace to="/app/resident/dashboard" />;
    }
    // Fallback if role is unknown but authenticated
    return <Navigate replace to="/login" />;
  }

  return <LandingPage />;
}

// Handles /app redirect based on user role
function AppRootRedirect() {
  const { loading, session } = useAuth();

  if (loading) {
    return <div className="min-h-screen bg-background" data-testid="app-root-loading-state" />;
  }

  if (!session?.authenticated) {
    return <Navigate replace to="/login" />;
  }

  // Redirect authenticated users to their role-specific dashboard
  if (session?.role === "admin") {
    return <Navigate replace to="/app/admin/dashboard" />;
  }
  if (session?.role === "manager") {
    return <Navigate replace to="/app/manager/dashboard" />;
  }
  if (session?.role === "resident") {
    return <Navigate replace to="/app/resident/dashboard" />;
  }

  // Unknown role - redirect to login
  return <Navigate replace to="/login" />;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<RootRoute />} />
      <Route path="/app" element={<AppRootRedirect />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/legal" element={<LegalPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/unauthorized" element={<UnauthorizedPage />} />

      {/* Admin Routes - Protected */}
      <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
        <Route path="/app/admin" element={<AdminShell />}>
          <Route index element={<Navigate replace to="dashboard" />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="properties" element={<PropertiesPage />} />
          <Route path="properties/:propertyId" element={<PropertyDetailPage />} />
          <Route path="providers" element={<ProvidersPage />} />
          <Route path="tenants" element={<TenantsPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Route>

      {/* Manager Routes - Protected */}
      <Route element={<ProtectedRoute allowedRoles={["manager", "admin"]} />}>
        <Route path="/app/manager" element={<ManagerLayout />}>
          <Route index element={<Navigate replace to="dashboard" />} />
          <Route path="dashboard" element={<ManagerDashboard />} />
          <Route path="residents" element={<ManagerResidents />} />
          <Route path="residents/:residentId" element={<ManagerResidentDetail />} />
          <Route path="churn-risk" element={<ManagerChurnRisk />} />
          <Route path="retention-rules" element={<ManagerRetentionRules />} />
          <Route path="providers" element={<ManagerProviders />} />
          <Route path="maintenance" element={<ManagerMaintenance />} />
          <Route path="revenue" element={<ManagerRevenue />} />
          <Route path="bookings" element={<ManagerBookings />} />
        </Route>
      </Route>

      {/* Resident Routes - Protected */}
      <Route element={<ProtectedRoute allowedRoles={["resident", "admin"]} />}>
        <Route path="/app/resident" element={<ResidentLayout />}>
          <Route index element={<Navigate replace to="dashboard" />} />
          <Route path="dashboard" element={<ResidentDashboard />} />
          <Route path="concierge" element={<ResidentConcierge />} />
          <Route path="services" element={<ResidentServices />} />
          <Route path="bookings" element={<ResidentBookings />} />
          <Route path="maintenance" element={<ResidentMaintenance />} />
        </Route>
      </Route>

      {/* 404 Catch-all */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AppProviders>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AppProviders>
  );
}
