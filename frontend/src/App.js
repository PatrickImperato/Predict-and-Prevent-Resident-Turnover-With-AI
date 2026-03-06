import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { AppProviders } from "@/components/app/AppProviders";
import { AdminRoute } from "@/components/app/AdminRoute";
import { AdminShell } from "@/components/layout/AdminShell";
import { useAuth } from "@/context/AuthContext";

// Admin pages
import AnalyticsPage from "@/pages/admin/AnalyticsPage";
import DashboardPage from "@/pages/admin/DashboardPage";
import DiagnosticsPage from "@/pages/admin/DiagnosticsPage";
import PropertiesPage from "@/pages/admin/PropertiesPage";
import PropertyDetailPage from "@/pages/admin/PropertyDetailPage";
import ProvidersPage from "@/pages/admin/ProvidersPage";
import SettingsPage from "@/pages/admin/SettingsPage";
import TenantsPage from "@/pages/admin/TenantsPage";

// Manager pages
import ManagerDashboard from "@/pages/manager/ManagerDashboard";
import ManagerResidents from "@/pages/manager/ManagerResidents";
import ManagerChurnRisk from "@/pages/manager/ManagerChurnRisk";
import ManagerProviders from "@/pages/manager/ManagerProviders";
import ManagerMaintenance from "@/pages/manager/ManagerMaintenance";

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
  }

  return <LandingPage />;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<RootRoute />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/legal" element={<LegalPage />} />

      <Route element={<AdminRoute />}>
        {/* Admin Routes */}
        <Route path="/app/admin" element={<AdminShell />}>
          <Route index element={<Navigate replace to="dashboard" />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="properties" element={<PropertiesPage />} />
          <Route path="properties/:propertyId" element={<PropertyDetailPage />} />
          <Route path="providers" element={<ProvidersPage />} />
          <Route path="tenants" element={<TenantsPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="diagnostics" element={<DiagnosticsPage />} />
        </Route>

        {/* Manager Routes */}
        <Route path="/app/manager" element={<AdminShell />}>
          <Route index element={<Navigate replace to="dashboard" />} />
          <Route path="dashboard" element={<ManagerDashboard />} />
          <Route path="residents" element={<ManagerResidents />} />
          <Route path="churn-risk" element={<ManagerChurnRisk />} />
          <Route path="providers" element={<ManagerProviders />} />
          <Route path="maintenance" element={<ManagerMaintenance />} />
        </Route>

        {/* Resident Routes */}
        <Route path="/app/resident" element={<AdminShell />}>
          <Route index element={<Navigate replace to="dashboard" />} />
          <Route path="dashboard" element={<ResidentDashboard />} />
          <Route path="concierge" element={<ResidentConcierge />} />
          <Route path="services" element={<ResidentServices />} />
          <Route path="bookings" element={<ResidentBookings />} />
          <Route path="maintenance" element={<ResidentMaintenance />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate replace to="/" />} />
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
