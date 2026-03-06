import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";

import { AppProviders } from "@/components/app/AppProviders";
import { AdminRoute } from "@/components/app/AdminRoute";
import { AdminShell } from "@/components/layout/AdminShell";
import { useAuth } from "@/context/AuthContext";
import DiagnosticsPage from "@/pages/admin/DiagnosticsPage";
import LoginPage from "@/pages/LoginPage";


function RootRedirect() {
  const { loading, session } = useAuth();

  if (loading) {
    return <div className="min-h-screen bg-background" data-testid="root-redirect-loading" />;
  }

  if (session?.authenticated && session?.role === "admin") {
    return <Navigate replace to="/app/admin/diagnostics" />;
  }

  return <Navigate replace to="/login" />;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<RootRedirect />} />
      <Route path="/login" element={<LoginPage />} />

      <Route element={<AdminRoute />}>
        <Route path="/app/admin" element={<AdminShell />}>
          <Route index element={<Navigate replace to="diagnostics" />} />
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
