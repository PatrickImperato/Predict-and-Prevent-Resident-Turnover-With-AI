import { Outlet, useLocation } from "react-router-dom";
import { ManagerSidebar } from "@/components/layout/ManagerSidebar";

const TITLES = {
  "/app/manager": "Dashboard",
  "/app/manager/dashboard": "Dashboard",
  "/app/manager/residents": "Residents",
  "/app/manager/churn-risk": "Churn Risk",
  "/app/manager/retention-rules": "Retention Rules",
  "/app/manager/providers": "Service Providers",
  "/app/manager/maintenance": "Maintenance",
  "/app/manager/revenue": "Revenue",
  "/app/manager/bookings": "Bookings",
};

export const ManagerLayout = () => {
  const location = useLocation();
  const pageTitle = location.pathname.startsWith("/app/manager/residents/")
    ? "Resident Detail"
    : TITLES[location.pathname] || "Property Manager";

  return (
    <div className="min-h-screen bg-slate-50" data-testid="manager-layout-root">
      <ManagerSidebar />
      <div className="ml-64 min-h-screen">
        <main className="px-6 py-8" data-testid="manager-layout-main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
