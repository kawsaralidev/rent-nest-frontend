import Link from "next/link";

import { getMyProperties } from "@/services/property/get-my-properties";

import { Button } from "@/components/ui/button";
import PropertyTable from "@/components/property/PropertyTable";

export default async function MyPropertiesPage() {
  const response = await getMyProperties();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Properties</h1>

        <Link href="/landlord-dashboard/properties/create">
          <Button>Add Property</Button>
        </Link>
      </div>

      <PropertyTable properties={response.data} />
    </div>
  );
}
