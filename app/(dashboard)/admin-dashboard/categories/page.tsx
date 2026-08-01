import CategoryTable from "@/components/admin/CategoryTable";
import { getCategories } from "@/services/category/get-categories";

const CategoryPage = async () => {
  const categories = await getCategories();

  return (
    <div className="w-full space-y-6">
      <h1 className="text-3xl font-bold">Categories</h1>

      <CategoryTable categories={categories} />
    </div>
  );
};

export default CategoryPage;
