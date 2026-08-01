import PropertyTable from "@/components/admin/PropertyTable";
import { getAdminProperties } from "@/services/admin/get-properties";

const AdminPropertiesPage = async () => {
  const response = await getAdminProperties();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Manage Properties</h1>

      <PropertyTable properties={response.data} />
    </div>
  );
};

export default AdminPropertiesPage;
