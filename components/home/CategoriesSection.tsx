import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Castle,
  Home,
  Hotel,
  Landmark,
  Store,
  Warehouse,
  Building,
} from "lucide-react";

import { getCategories } from "@/services/category/get-categories";

const iconMap = {
  apartment: Building2,
  house: Home,
  villa: Castle,
  office: Building,
  studio: Hotel,
  duplex: Landmark,
  commercial: Warehouse,
  shop: Store,
  default: Building2,
};

const CategoriesSection = async () => {
  const categories = await getCategories();

  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute " />
      <div className="absolute -left-20 top-20 -z-10 h-72 w-72 rounded-full bg-blue-100 blur-3xl opacity-60" />
      <div className="absolute -right-20 bottom-0 -z-10 h-72 w-72 rounded-full bg-cyan-100 blur-3xl opacity-60" />

      <div className="container mx-auto px-6">
        {/* Heading */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="inline-flex rounded-full bg-blue-100 px-5 py-2 text-sm font-semibold text-blue-600">
            Property Categories
          </span>

          <h2 className="mt-5 text-4xl font-bold text-slate-900 lg:text-5xl">
            Browse by Category
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Explore rental properties by category and quickly discover the
            perfect place that fits your lifestyle.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => {
            const Icon =
              iconMap[category.name.toLowerCase() as keyof typeof iconMap] ||
              iconMap.default;

            return (
              <Link
                key={category.id}
                href={`/properties?categoryId=${category.id}`}
                className="group"
              >
                <div className="flex items-center justify-between rounded-3xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-blue-500 hover:shadow-2xl">
                  <div className="flex items-center gap-5">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white transition duration-300 group-hover:scale-110">
                      <Icon size={30} />
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-slate-900">
                        {category.name}
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        Explore Properties
                      </p>
                    </div>
                  </div>

                  <ArrowRight className="text-slate-400 transition duration-300 group-hover:translate-x-2 group-hover:text-blue-600" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
