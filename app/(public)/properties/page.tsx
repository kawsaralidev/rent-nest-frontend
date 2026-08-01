import PropertyCard from "@/components/property/PropertyCard";
import PropertyFilters from "@/components/property/PropertyFilters";

import { getCategories } from "@/services/category/get-categories";
import { getProperties } from "@/services/property/get-properties";

interface PropertiesPageProps {
  searchParams: Promise<{
    location?: string;
    categoryId?: string;
    minPrice?: string;
    maxPrice?: string;
    amenity?: string;
  }>;
}

const PropertiesPage = async ({ searchParams }: PropertiesPageProps) => {
  const params = await searchParams;

  const [response, categories] = await Promise.all([
    getProperties({
      location: params.location,
      categoryId: params.categoryId,
      minPrice: params.minPrice,
      maxPrice: params.maxPrice,
      amenity: params.amenity,
    }),
    getCategories(),
  ]);

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

        <PropertyFilters categories={categories} />

        {response.data.length === 0 ? (
          <div className="rounded-xl border bg-white py-16 text-center">
            <h2 className="text-xl font-semibold">No properties found</h2>

            <p className="mt-2 text-muted-foreground">
              Try changing your filters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
            {response.data.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PropertiesPage;
