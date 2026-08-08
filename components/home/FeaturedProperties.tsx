import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { getProperties } from "@/services/property/get-properties";
import { IProperty } from "@/lib/types/property";

import PropertyCard from "../property/PropertyCard";

const FeaturedProperties = async () => {
  const response = await getProperties({
    page: 1,
    limit: 6,
    featured: true,
  });

  const properties: IProperty[] = response?.data ?? [];

  return (
    <section className="bg-background py-20 transition-colors duration-300 sm:py-24">
      <div className="container mx-auto px-6">
        {/* =========================
            SECTION HEADER
        ========================== */}
        <div className="mx-auto mb-14 max-w-3xl text-center sm:mb-16">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 shadow-sm">
            <Sparkles className="h-4 w-4 text-primary" />

            <span className="text-sm font-semibold text-primary">
              Featured Properties
            </span>
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Discover Your Next Home
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            Explore our handpicked selection of quality rental properties
            designed for comfortable and convenient living.
          </p>
        </div>

        {/* =========================
            EXACTLY 6 PROPERTY CARDS
        ========================== */}
        {properties.length > 0 ? (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:gap-7 xl:grid-cols-3">
              {properties.slice(0, 6).map((property: IProperty) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>

            {/* =========================
                EXPLORE MORE BUTTON
            ========================== */}
            <div className="mt-12 flex justify-center sm:mt-14">
              <Button
                asChild
                size="lg"
                className="group rounded-xl px-7 shadow-sm transition-all duration-300 hover:px-8 hover:shadow-lg"
              >
                <Link href="/properties">
                  Explore More Properties
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </>
        ) : (
          /* =========================
              EMPTY STATE
          ========================== */
          <div className="rounded-3xl border border-dashed border-border bg-card px-6 py-16 text-center shadow-sm">
            <div className="mx-auto max-w-md">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>

              <h3 className="mt-5 text-xl font-bold text-foreground">
                No Featured Properties
              </h3>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                No featured properties are currently available. Explore all
                available properties to find your next home.
              </p>

              <Button asChild variant="outline" className="mt-5 rounded-xl">
                <Link href="/properties">
                  Explore Properties
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProperties;
