import PropertyForm from "@/components/forms/PropertyForm";
import { getCategories } from "@/services/category/get-categories";

export default async function CreatePropertyPage() {
  const categories = await getCategories();

  return (
    <div className="space-y-6  w-full">
      <PropertyForm mode="create" categories={categories} />
    </div>
  );
}
