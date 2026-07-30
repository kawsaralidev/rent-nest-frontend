import { getProperties } from "@/services/property/get-properties";
import PropertyCard from "@/components/property/PropertyCard";

const PropertiesPage = async () => {
  const response = await getProperties();

  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-8 text-3xl font-bold">Available Properties</h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {response.data.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
};

export default PropertiesPage;
