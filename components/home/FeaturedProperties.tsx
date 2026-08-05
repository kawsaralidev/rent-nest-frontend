// import { getProperties } from "@/services/property";
// import PropertyCard from "@/components/modules/property/PropertyCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { getProperties } from "@/services/property/get-properties";
import PropertyCard from "../property/PropertyCard";
import { IProperty } from "@/lib/types/property";

const FeaturedProperties = async () => {
  const response = await getProperties();

  const properties = response?.data?.slice(0, 6) || [];

  return (
    <section className="relative overflow-hidden py-24">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-slate-50 to-white" />
      <div className="absolute left-0 top-20 h-72 w-72 rounded-full bg-blue-100 blur-3xl opacity-50 -z-10" />
      <div className="absolute right-0 bottom-10 h-80 w-80 rounded-full bg-cyan-100 blur-3xl opacity-50 -z-10" />

      <div className="container mx-auto px-6">
        {/* Heading */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border bg-white px-4 py-2 shadow-sm">
            <Sparkles className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-semibold text-blue-600">
              Featured Collection
            </span>
          </div>

          <h2 className="text-4xl font-bold text-slate-900 lg:text-5xl">
            Discover Our Featured Properties
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Explore our handpicked rental properties designed to provide
            comfort, convenience, and exceptional living experiences.
          </p>
        </div>

        {/* Property Grid */}
        <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
          {properties.map((property: IProperty) => (
            <div
              key={property.id}
              className="transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02]"
            >
              <PropertyCard property={property} />
            </div>
          ))}
        </div>

        {/* Empty */}
        {properties.length === 0 && (
          <div className="rounded-3xl border border-dashed py-20 text-center">
            <h3 className="text-2xl font-bold text-slate-800">
              No Featured Properties
            </h3>

            <p className="mt-3 text-slate-500">
              Please check back later for newly added rental properties.
            </p>
          </div>
        )}

        {/* CTA */}
        {properties.length > 0 && (
          <div className="mt-16 flex justify-center">
            <Button
              asChild
              size="lg"
              className="rounded-xl px-8 shadow-lg transition-all duration-300 hover:scale-105"
            >
              <Link href="/properties">
                Explore All Properties
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProperties;
