import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { AppProviders } from "@/components/app/AppProviders";
import { AdminRoute } from "@/components/app/AdminRoute";
import { AdminShell } from "@/components/layout/AdminShell";
import { useAuth } from "@/context/AuthContext";
import AnalyticsPage from "@/pages/admin/AnalyticsPage";
import DashboardPage from "@/pages/admin/DashboardPage";
import DiagnosticsPage from "@/pages/admin/DiagnosticsPage";
import PropertiesPage from "@/pages/admin/PropertiesPage";
import PropertyDetailPage from "@/pages/admin/PropertyDetailPage";
import ProvidersPage from "@/pages/admin/ProvidersPage";
import SettingsPage from "@/pages/admin/SettingsPage";
import TenantsPage from "@/pages/admin/TenantsPage";
import LandingPage from "@/pages/LandingPage";
import LegalPage from "@/pages/LegalPage";
import LoginPage from "@/pages/LoginPage";

function RootRoute() {
  const { loading, session } = useAuth();

  if (loading) {
    return <div className="min-h-screen bg-background" data-testid="root-route-loading-state" />;
  }

  if (session?.authenticated && session?.role === "admin") {
    return <Navigate replace to="/app/admin/dashboard" />;
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
