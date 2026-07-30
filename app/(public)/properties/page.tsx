import { getProperties } from "@/services/property/get-properties";
import PropertyCard from "@/components/property/PropertyCard";

const PropertiesPage = async () => {
  const response = await getProperties();

  return (
    <section className="bg-gray-50">
      <div className="container mx-auto px-4 py-14">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight">
            Find Your Perfect Home
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-gray-500">
            Browse rental properties across different locations and discover the
            perfect place that matches your lifestyle.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          {response.data.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PropertiesPage;
