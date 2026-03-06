import { AdminPagePlaceholder } from "@/components/admin/AdminPagePlaceholder";

export default function TenantsPage() {
  return (
    <AdminPagePlaceholder
      description="The tenants area is now part of the shared admin shell and will later host resident list/detail experiences including Alex Chen as the QA example."
      routePath="/app/admin/tenants"
      title="Tenants"
    />
  );
}
