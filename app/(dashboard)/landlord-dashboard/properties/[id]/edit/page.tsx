import PropertyForm from "@/components/forms/PropertyForm";

import { getCategories } from "@/services/category/get-categories";
import { getSingleProperty } from "@/services/property/get-single-property";

interface EditPropertyPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditPropertyPage({
  params,
}: EditPropertyPageProps) {
  const { id } = await params;

  const [categories, propertyResponse] = await Promise.all([
    getCategories(),
    getSingleProperty(id),
  ]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Update Property</h1>

      <PropertyForm
        mode="edit"
        categories={categories}
        property={propertyResponse.data}
      />
    </div>
  );
}
