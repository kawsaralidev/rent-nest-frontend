import Link from "next/link";

import { getCategories } from "@/services/category/get-categories";
import { getMyProperties } from "@/services/property/get-my-properties";

import { Button } from "@/components/ui/button";
import PropertyTable from "@/components/property/PropertyTable";

export default async function MyPropertiesPage() {
  const [propertiesResponse, categories] = await Promise.all([
    getMyProperties(),
    getCategories(),
  ]);

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Properties</h1>

        <Link href="/landlord-dashboard/properties/create">
          <Button>Add Property</Button>
        </Link>
      </div>

      <PropertyTable
        properties={propertiesResponse.data}
        categories={categories}
      />
    </div>
  );
}