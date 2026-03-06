import { AdminPagePlaceholder } from "@/components/admin/AdminPagePlaceholder";

export default function AnalyticsPage() {
  return (
    <AdminPagePlaceholder
      description="The analytics route is wired into the admin shell and ready for future charts, date ranges, exports, and reconciliation logic."
      routePath="/app/admin/analytics"
      title="Analytics"
    />
  );
}
