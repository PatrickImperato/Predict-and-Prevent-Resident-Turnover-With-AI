import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Activity,
  AlertTriangle,
  BriefcaseBusiness,
  Calendar,
  DollarSign,
  LayoutDashboard,
  LogOut,
  Settings,
  Users,
  Wrench,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { getSarahManagedProperty } from "@/lib/canonicalData";

const managerNavItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/app/manager/dashboard" },
  { label: "Residents", icon: Users, path: "/app/manager/residents" },
  { label: "Churn Risk", icon: AlertTriangle, path: "/app/manager/churn-risk" },
  { label: "Retention Rules", icon: Settings, path: "/app/manager/retention-rules" },
  { label: "Providers", icon: BriefcaseBusiness, path: "/app/manager/providers" },
  { label: "Maintenance", icon: Wrench, path: "/app/manager/maintenance" },
  { label: "Revenue", icon: DollarSign, path: "/app/manager/revenue" },
  { label: "Bookings", icon: Calendar, path: "/app/manager/bookings" },
];

export const ManagerSidebar = () => {
  const { session, logout } = useAuth();
  const property = getSarahManagedProperty();

  return (
    <motion.aside
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      className="fixed left-0 top-0 z-40 h-screen w-64 bg-slate-900 flex flex-col"
      data-testid="manager-sidebar"
    >
      <div className="flex-none px-5 py-6">
        {/* HappyCo Branding */}
        <div className="flex items-center gap-3 border-b border-slate-700 pb-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-600 text-white" data-testid="manager-sidebar-brand-mark">
            <Activity className="h-5 w-5" strokeWidth={2} />
          </div>
          <div>
            <p className="font-[var(--font-heading)] text-sm font-semibold tracking-tight text-white">
              HappyCo Concierge
            </p>
            <p className="text-xs text-slate-400">Property Manager</p>
          </div>
        </div>

        {/* Manager Identity Block */}
        <div className="mt-5 rounded-lg bg-slate-800 p-4 border border-slate-700">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-teal-600 text-white font-semibold text-sm">
              SM
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-white truncate">{session?.displayName || "Sarah Mitchell"}</p>
              <p className="text-xs text-slate-400 truncate">{property?.shortName || "The Metropolitan"}</p>
              <p className="mt-1 text-xs text-slate-500">{property?.address?.city}, {property?.address?.state}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation - Scrollable */}
      <nav className="flex-1 overflow-y-auto px-5 mt-6 space-y-1" data-testid="manager-sidebar-nav">
        {managerNavItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.22, delay: 0.24 + index * 0.04, ease: "easeOut" }}
            >
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center gap-3 rounded-lg bg-teal-600 px-3 py-2.5 text-sm font-medium text-white transition-all duration-150"
                    : "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 transition-all duration-150 hover:bg-slate-800 hover:text-white"
                }
                data-testid={`manager-nav-${item.label.toLowerCase().replace(/\s+/g, '-')}-link`}
                to={item.path}
              >
                <Icon className="h-[18px] w-[18px] flex-shrink-0" strokeWidth={1.75} />
                <span>{item.label}</span>
              </NavLink>
            </motion.div>
          );
        })}
      </nav>

      {/* Bottom Section - Property Info & Sign Out */}
      <div className="flex-none px-5 py-6 border-t border-slate-700">
        {/* Property Info */}
        <div className="rounded-lg border border-slate-700 bg-slate-800 p-3 mb-3">
          <p className="text-xs font-medium text-slate-400">Managed Property</p>
          <p className="mt-1 text-sm font-semibold text-white">{property?.name}</p>
          <div className="mt-2 flex items-center justify-between text-xs text-slate-400">
            <span>{property?.occupiedUnits}/{property?.totalUnits} occupied</span>
            <span className="font-semibold text-teal-400">{property?.occupancyRate}%</span>
          </div>
        </div>

        {/* Sign Out Button */}
        <Button
          variant="outline"
          className="w-full border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white"
          size="sm"
          onClick={logout}
          data-testid="manager-sidebar-sign-out-button"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </motion.aside>
  );
};
