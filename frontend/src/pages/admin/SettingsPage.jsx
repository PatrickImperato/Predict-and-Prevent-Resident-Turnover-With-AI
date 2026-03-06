import { AdminPagePlaceholder } from "@/components/admin/AdminPagePlaceholder";

export default function SettingsPage() {
  return (
    <AdminPagePlaceholder
      description="The settings route is now present in the shell and protected by admin auth. Platform and property settings forms will be added in a later phase."
      routePath="/app/admin/settings"
      title="Settings"
    />
  );
}
