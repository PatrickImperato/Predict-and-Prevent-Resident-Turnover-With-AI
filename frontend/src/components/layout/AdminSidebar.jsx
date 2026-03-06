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

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/app/admin/dashboard" },
  { label: "Properties", icon: Building2, path: "/app/admin/properties" },
  { label: "Providers", icon: BriefcaseBusiness, path: "/app/admin/providers" },
  { label: "Tenants", icon: Users, path: "/app/admin/tenants" },
  { label: "Analytics", icon: ChartColumnBig, path: "/app/admin/analytics" },
  { label: "Settings", icon: Settings2, path: "/app/admin/settings" },
  { label: "Diagnostics", icon: ShieldCheck, path: "/app/admin/diagnostics" },
];

export const AdminSidebar = () => {
  return (
    <motion.aside
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      className="surface-noise border-b border-border/80 bg-card/72 px-5 py-6 backdrop-blur xl:w-[280px] xl:border-b-0 xl:border-r"
      data-testid="admin-sidebar"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/12 text-primary" data-testid="admin-sidebar-brand-mark">
          <Activity className="h-5 w-5" strokeWidth={1.75} />
        </div>
        <div>
          <p className="font-[var(--font-heading)] text-base font-semibold tracking-[-0.02em] text-foreground">
            HappyCo Concierge
          </p>
          <p className="text-xs text-muted-foreground">Admin workspace</p>
        </div>
      </div>

      <nav className="mt-8 grid gap-2" data-testid="admin-sidebar-nav">
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
                  [
                    "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all",
                    isActive
                      ? "bg-primary/10 text-primary shadow-sm"
                      : "text-muted-foreground hover:bg-muted/70 hover:text-foreground hover:shadow-sm",
                  ].join(" ")
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
