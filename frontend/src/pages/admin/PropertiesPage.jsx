import { AdminPagePlaceholder } from "@/components/admin/AdminPagePlaceholder";

export default function PropertiesPage() {
  return (
    <AdminPagePlaceholder
      description="The properties route now lives inside the shared admin shell and is ready for the future list/detail implementation with id-based routing."
      routePath="/app/admin/properties"
      title="Properties"
    />
  );
}
