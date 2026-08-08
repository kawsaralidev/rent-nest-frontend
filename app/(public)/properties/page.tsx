import PropertyCard from "@/components/property/PropertyCard";
import PropertyFilters from "@/components/property/PropertyFilters";
import Footer from "@/components/shared/Footer";

import { getCategories } from "@/services/category/get-categories";
import { getProperties } from "@/services/property/get-properties";

interface PropertiesPageProps {
  searchParams: Promise<{
    page?: string;
    limit?: string;

    search?: string;
    location?: string;
    categoryId?: string;

    minPrice?: string;
    maxPrice?: string;

    bedrooms?: string;
    bathrooms?: string;

    amenity?: string;

    featured?: string;
    sort?: "price_asc" | "price_desc";
  }>;
}

const PropertiesPage = async ({ searchParams }: PropertiesPageProps) => {
  const params = await searchParams;

  const page = Number(params.page) || 1;
  const limit = Number(params.limit) || 15;

  const [response, categories] = await Promise.all([
    getProperties({
      page,
      limit,

      search: params.search,

      location: params.location,
      categoryId: params.categoryId,

      minPrice: params.minPrice,
      maxPrice: params.maxPrice,

      bedrooms: params.bedrooms ? Number(params.bedrooms) : undefined,

      bathrooms: params.bathrooms ? Number(params.bathrooms) : undefined,

      amenity: params.amenity,

      featured: params.featured === "true" ? true : undefined,

      sort: params.sort,
    }),

    getCategories(),
  ]);

  const properties = response?.data ?? [];
  const meta = response?.meta;

  const totalPages = meta?.totalPage ?? 1;
  const currentPage = meta?.page ?? page;
  const totalProperties = meta?.total ?? 0;

  const createPageUrl = (pageNumber: number) => {
    const query = new URLSearchParams();

    if (params.search) {
      query.set("search", params.search);
    }

    if (params.location) {
      query.set("location", params.location);
    }

    if (params.categoryId) {
      query.set("categoryId", params.categoryId);
    }

    if (params.minPrice) {
      query.set("minPrice", params.minPrice);
    }

    if (params.maxPrice) {
      query.set("maxPrice", params.maxPrice);
    }

    if (params.bedrooms) {
      query.set("bedrooms", params.bedrooms);
    }

    if (params.bathrooms) {
      query.set("bathrooms", params.bathrooms);
    }

    if (params.amenity) {
      query.set("amenity", params.amenity);
    }

    if (params.featured === "true") {
      query.set("featured", "true");
    }

    if (params.sort) {
      query.set("sort", params.sort);
    }

    query.set("page", pageNumber.toString());
    query.set("limit", limit.toString());

    return `/properties?${query.toString()}`;
  };

  return (
    <>
      <section className="min-h-screen bg-background py-14 transition-colors duration-300 sm:py-16">
        <div className="container mx-auto px-6">
          {/* =========================
              PAGE HEADER
          ========================== */}
          <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-14">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
              Explore Properties
            </p>

            <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Find Your Perfect Home
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
              Discover quality rental properties in locations that match your
              lifestyle, budget, and preferences.
            </p>
          </div>

          {/* =========================
              FILTERS
          ========================== */}
          <PropertyFilters categories={categories} />

          {/* =========================
              RESULTS HEADER
          ========================== */}
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-foreground">
                Available Properties
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                {totalProperties > 0
                  ? `Showing ${properties.length} of ${totalProperties} properties`
                  : "No properties available"}
              </p>
            </div>

            {totalPages > 1 && (
              <div className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-muted-foreground shadow-sm">
                Page {currentPage} of {totalPages}
              </div>
            )}
          </div>

          {/* =========================
              PROPERTY GRID
          ========================== */}
          {properties.length > 0 ? (
            <div className="grid items-stretch gap-6 sm:grid-cols-2 lg:gap-7 xl:grid-cols-3">
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            /* =========================
                EMPTY STATE
            ========================== */
            <div className="rounded-3xl border border-dashed border-border bg-card px-6 py-20 text-center shadow-sm">
              <div className="mx-auto max-w-md">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <span className="text-2xl">🏠</span>
                </div>

                <h2 className="mt-5 text-2xl font-bold text-foreground">
                  No Properties Found
                </h2>

                <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
                  We couldn&apos;t find any properties matching your current
                  search and filters.
                </p>

                <p className="mt-2 text-sm text-muted-foreground">
                  Try changing your filters or search for another location.
                </p>
              </div>
            </div>
          )}

          {/* =========================
              PAGINATION
          ========================== */}
          {properties.length > 0 && totalPages > 1 && (
            <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
              {/* Previous */}
              {currentPage > 1 ? (
                <a
                  href={createPageUrl(currentPage - 1)}
                  className="inline-flex h-10 items-center rounded-lg border border-border bg-card px-3 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-accent"
                >
                  Previous
                </a>
              ) : (
                <span className="inline-flex h-10 cursor-not-allowed items-center rounded-lg border border-border bg-muted px-3 text-sm font-medium text-muted-foreground">
                  Previous
                </span>
              )}

              {/* Page Numbers */}
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, index) => index + 1)
                  .filter((pageNumber) => {
                    if (totalPages <= 5) return true;

                    if (pageNumber === 1) return true;

                    if (pageNumber === totalPages) return true;

                    return Math.abs(pageNumber - currentPage) <= 1;
                  })
                  .map((pageNumber, index, pages) => {
                    const previousPage = pages[index - 1];

                    const showDots =
                      previousPage !== undefined &&
                      pageNumber - previousPage > 1;

                    return (
                      <div key={pageNumber} className="flex items-center gap-1">
                        {showDots && (
                          <span className="px-1 text-sm text-muted-foreground">
                            ...
                          </span>
                        )}

                        <a
                          href={createPageUrl(pageNumber)}
                          aria-current={
                            pageNumber === currentPage ? "page" : undefined
                          }
                          className={`inline-flex h-10 min-w-10 items-center justify-center rounded-lg px-3 text-sm font-semibold shadow-sm transition-colors ${
                            pageNumber === currentPage
                              ? "bg-primary text-primary-foreground"
                              : "border border-border bg-card text-foreground hover:bg-accent"
                          }`}
                        >
                          {pageNumber}
                        </a>
                      </div>
                    );
                  })}
              </div>

              {/* Next */}
              {currentPage < totalPages ? (
                <a
                  href={createPageUrl(currentPage + 1)}
                  className="inline-flex h-10 items-center rounded-lg border border-border bg-card px-3 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-accent"
                >
                  Next
                </a>
              ) : (
                <span className="inline-flex h-10 cursor-not-allowed items-center rounded-lg border border-border bg-muted px-3 text-sm font-medium text-muted-foreground">
                  Next
                </span>
              )}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
};

export default PropertiesPage;
