import PropertyTable from "@/components/property/PropertyTable";
import { getMyProperties } from "@/services/property/get-my-properties";

export default async function MyPropertiesPage() {
  const properties = await getMyProperties();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">My Properties</h1>

      <PropertyTable properties={properties.data} />
    </div>
  );
}
