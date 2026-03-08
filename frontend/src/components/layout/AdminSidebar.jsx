import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Activity,
  BriefcaseBusiness,
  Building2,
  ChartColumnBig,
  LayoutDashboard,
  Settings2,
  ShieldCheck,
  Users,
} from "lucide-react";

import { useAuth } from "@/context/AuthContext";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/app/admin/dashboard" },
  { label: "Properties", icon: Building2, path: "/app/admin/properties" },
  { label: "Providers", icon: BriefcaseBusiness, path: "/app/admin/providers" },
  { label: "Tenants", icon: Users, path: "/app/admin/tenants" },
  { label: "Analytics", icon: ChartColumnBig, path: "/app/admin/analytics" },
  { label: "Settings", icon: Settings2, path: "/app/admin/settings" },
];

export const AdminSidebar = () => {
  return (
    <motion.aside
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      className="admin-sidebar-dark px-5 py-6 xl:w-[260px]"
      data-testid="admin-sidebar"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-600/10 text-teal-400" data-testid="admin-sidebar-brand-mark">
          <Activity className="h-5 w-5" strokeWidth={1.75} />
        </div>
        <div>
          <p className="font-[var(--font-heading)] text-sm font-semibold tracking-tight text-white">
            HappyCo Concierge
          </p>
          <p className="text-xs text-slate-400">Platform Admin</p>
        </div>
      </div>

      <nav className="mt-8 space-y-1" data-testid="admin-sidebar-nav">
        {navItems.map((item, index) => {
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
                    ? "admin-nav-item admin-nav-item-active"
                    : "admin-nav-item admin-nav-item-inactive"
                }
                data-testid={`sidebar-nav-${item.label.toLowerCase()}-link`}
                to={item.path}
              >
                <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
                <span>{item.label}</span>
              </NavLink>
            </motion.div>
          );
        })}
      </nav>
    </motion.aside>
  );
};
