import { ChevronDown, LogOut, ShieldCheck, User2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/AuthContext";

export const AdminUserMenu = () => {
  const { logout, session } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="rounded-full border-border/80 px-3"
          data-testid="admin-topbar-user-menu-trigger"
          size="sm"
          type="button"
          variant="outline"
        >
          <User2 className="mr-2 h-4 w-4" strokeWidth={1.75} />
          {session.display_name || "Account"}
          <ChevronDown className="ml-2 h-4 w-4" strokeWidth={1.75} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64 rounded-xl border-border/80 p-2" data-testid="admin-topbar-user-menu-content">
        <DropdownMenuLabel className="space-y-1">
          <p className="font-medium text-foreground" data-testid="admin-topbar-user-menu-name">
            {session.display_name || "Authenticated user"}
          </p>
          <p className="font-mono text-xs font-normal text-muted-foreground" data-testid="admin-topbar-user-menu-email">
            {session.email}
          </p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="gap-2 rounded-lg" data-testid="admin-topbar-user-menu-role-item">
          <ShieldCheck className="h-4 w-4" strokeWidth={1.75} />
          {session.is_super_admin ? "Super-admin" : session.role || "Admin session"}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="gap-2 rounded-lg text-foreground"
          data-testid="admin-topbar-user-menu-sign-out"
          onClick={logout}
        >
          <LogOut className="h-4 w-4" strokeWidth={1.75} />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
