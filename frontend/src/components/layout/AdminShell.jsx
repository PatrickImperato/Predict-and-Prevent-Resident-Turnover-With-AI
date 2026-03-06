import { Outlet, useLocation } from "react-router-dom";

import { AdminSidebar } from "@/components/layout/AdminSidebar";
import { AdminTopbar } from "@/components/layout/AdminTopbar";

const TITLES = {
  "/app/admin": "Dashboard",
  "/app/admin/dashboard": "Dashboard",
  "/app/admin/properties": "Properties",
  "/app/admin/providers": "Providers",
  "/app/admin/tenants": "Tenants",
  "/app/admin/analytics": "Analytics",
  "/app/admin/settings": "Settings",
  "/app/admin/diagnostics": "Diagnostics",
};

export const AdminShell = () => {
  const location = useLocation();
  const pageTitle = TITLES[location.pathname] || "Admin";

  return (
    <div className="min-h-screen bg-background" data-testid="admin-shell-root">
      <div className="mx-auto flex min-h-screen max-w-[1600px] flex-col xl:flex-row">
        <AdminSidebar />
        <div className="flex min-h-screen flex-1 flex-col">
          <AdminTopbar pageTitle={pageTitle} />
          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8" data-testid="admin-shell-main-content">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};
