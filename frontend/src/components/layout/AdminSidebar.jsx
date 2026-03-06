import { NavLink } from "react-router-dom";
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

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, implemented: false },
  { label: "Properties", icon: Building2, implemented: false },
  { label: "Providers", icon: BriefcaseBusiness, implemented: false },
  { label: "Tenants", icon: Users, implemented: false },
  { label: "Analytics", icon: ChartColumnBig, implemented: false },
  { label: "Settings", icon: Settings2, implemented: false },
  { label: "Diagnostics", icon: ShieldCheck, implemented: true, path: "/app/admin/diagnostics" },
];

export const AdminSidebar = () => {
  return (
    <aside
      className="surface-noise border-b border-border/80 bg-card/70 px-4 py-5 backdrop-blur xl:w-[280px] xl:border-b-0 xl:border-r"
      data-testid="admin-sidebar"
    >
      <div className="flex items-center justify-between gap-3 xl:block">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/12 text-primary" data-testid="admin-sidebar-brand-mark">
              <Activity className="h-5 w-5" strokeWidth={1.75} />
            </div>
            <div>
              <p className="font-[var(--font-heading)] text-base font-semibold tracking-[-0.02em] text-foreground">
                HappyCo Concierge
              </p>
              <p className="text-xs text-muted-foreground">Phase 4 Foundation</p>
            </div>
          </div>
        </div>
        <Badge className="bg-secondary text-secondary-foreground" data-testid="admin-sidebar-phase-badge" variant="secondary">
          Diagnostics first
        </Badge>
      </div>

      <nav className="mt-6 grid gap-2" data-testid="admin-sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;

          if (item.implemented) {
            return (
              <Button
                asChild
                className="justify-start rounded-xl"
                data-testid={`sidebar-nav-${item.label.toLowerCase()}-link`}
                key={item.label}
                variant="ghost"
              >
                <NavLink
                  className={({ isActive }) =>
                    [
                      "flex items-center gap-3 px-3 py-2 text-sm font-medium",
                      isActive
                        ? "bg-primary/10 text-primary shadow-[var(--shadow-soft)]"
                        : "text-muted-foreground hover:bg-muted/70 hover:text-foreground",
                    ].join(" ")
                  }
                  to={item.path}
                >
                  <Icon className="h-4 w-4" strokeWidth={1.75} />
                  <span>{item.label}</span>
                </NavLink>
              </Button>
            );
          }

          return (
            <div className="flex items-center gap-2" key={item.label}>
              <Button
                className="w-full justify-start rounded-xl text-muted-foreground"
                data-testid={`sidebar-nav-${item.label.toLowerCase()}-disabled`}
                disabled
                type="button"
                variant="ghost"
              >
                <Icon className="h-4 w-4" strokeWidth={1.75} />
                <span>{item.label}</span>
              </Button>
              <Badge className="shrink-0 bg-muted text-muted-foreground" data-testid={`sidebar-nav-${item.label.toLowerCase()}-badge`} variant="secondary">
                Later
              </Badge>
            </div>
          );
        })}
      </nav>
    </aside>
  );
};
