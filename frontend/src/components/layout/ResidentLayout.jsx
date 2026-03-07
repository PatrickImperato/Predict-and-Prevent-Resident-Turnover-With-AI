import { Outlet } from "react-router-dom";
import { ResidentSidebar } from "@/components/layout/ResidentSidebar";

export const ResidentLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50" data-testid="resident-layout-root">
      <ResidentSidebar />
      <div className="ml-64 min-h-screen">
        <main className="px-6 py-8" data-testid="resident-layout-main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
