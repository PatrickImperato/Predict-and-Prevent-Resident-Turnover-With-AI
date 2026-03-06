import { AdminPagePlaceholder } from "@/components/admin/AdminPagePlaceholder";

export default function DashboardPage() {
  return (
    <AdminPagePlaceholder
      description="The dashboard shell is now part of the shared admin layout. KPI cards, charts, alerts, and revenue logic will be implemented in the next business-logic phase."
      routePath="/app/admin/dashboard"
      title="Dashboard"
    />
  );
}
