import { AdminPagePlaceholder } from "@/components/admin/AdminPagePlaceholder";

export default function ProvidersPage() {
  return (
    <AdminPagePlaceholder
      description="The provider management section is routed and admin-gated, but provider business logic and CRUD controls are intentionally deferred."
      routePath="/app/admin/providers"
      title="Providers"
    />
  );
}
