import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Activity,
  Calendar,
  Home,
  LogOut,
  MessageSquare,
  Settings,
  Wrench,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { getAlexChenData, getAlexProperty } from "@/lib/canonicalData";

const residentNavItems = [
  { label: "Dashboard", icon: Home, path: "/app/resident/dashboard" },
  { label: "Concierge", icon: MessageSquare, path: "/app/resident/concierge" },
  { label: "Services", icon: Activity, path: "/app/resident/services" },
  { label: "Bookings", icon: Calendar, path: "/app/resident/bookings" },
  { label: "Maintenance", icon: Wrench, path: "/app/resident/maintenance" },
];

export const ResidentSidebar = () => {
  const { session, logout } = useAuth();
  const alex = getAlexChenData();
  const property = getAlexProperty();

  return (
    <motion.aside
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      className="fixed left-0 top-0 z-40 h-screen w-64 bg-gradient-to-b from-teal-600 to-teal-700 flex flex-col"
      data-testid="resident-sidebar"
    >
      <div className="flex-none px-5 py-6">
        {/* HappyCo Branding */}
        <div className="flex items-center gap-3 border-b border-teal-500 pb-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-white" data-testid="resident-sidebar-brand-mark">
            <Activity className="h-5 w-5" strokeWidth={2} />
          </div>
          <div>
            <p className="font-[var(--font-heading)] text-sm font-semibold tracking-tight text-white">
              HappyCo Concierge
            </p>
            <p className="text-xs text-teal-100">Resident Portal</p>
          </div>
        </div>

        {/* Resident Identity Block */}
        <div className="mt-5 rounded-lg bg-white/10 p-4 backdrop-blur-sm border border-white/20">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-white text-teal-700 font-semibold text-sm">
              {alex.fullName.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-white truncate">{alex.fullName}</p>
              <p className="text-xs text-teal-100 truncate">Unit {alex.unit}</p>
              <p className="mt-1 text-xs text-teal-200">{property?.shortName}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation - Scrollable */}
      <nav className="flex-1 overflow-y-auto px-5 mt-6 space-y-1" data-testid="resident-sidebar-nav">
        {residentNavItems.map((item, index) => {
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
                    ? "flex items-center gap-3 rounded-lg bg-white/20 backdrop-blur-sm px-3 py-2.5 text-sm font-medium text-white transition-all duration-150"
                    : "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-teal-100 transition-all duration-150 hover:bg-white/10 hover:text-white"
                }
                data-testid={`resident-nav-${item.label.toLowerCase()}-link`}
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
      <div className="flex-none px-5 py-6 border-t border-teal-500">
        {/* Property Info */}
        <div className="rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm p-3 mb-3">
          <p className="text-xs font-medium text-teal-100">Your Property</p>
          <p className="mt-1 text-sm font-semibold text-white">{property?.name}</p>
          <p className="mt-1 text-xs text-teal-200">{property?.address?.city}, {property?.address?.state}</p>
        </div>

        {/* Sign Out Button */}
        <Button
          variant="outline"
          className="w-full border-white/20 bg-white/10 text-white hover:bg-white/20"
          size="sm"
          onClick={logout}
          data-testid="resident-sidebar-sign-out-button"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </motion.aside>
  );
};
