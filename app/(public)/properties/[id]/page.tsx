import Image from "next/image";
import Link from "next/link";

import {
  ArrowLeft,
  Bath,
  BedDouble,
  CheckCircle2,
  Home,
  MapPin,
  Ruler,
  Star,
  UserRound,
} from "lucide-react";

import RequestRentalButton from "@/components/property/rental-request-button";
import { getSingleProperty } from "@/services/property/get-single-property";
import { getMe } from "@/services/getme";

const PropertyDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const response = await getSingleProperty(id);
  const property = response.data;

  const user = await getMe();

  const rating = Number(property.averageRating || 0);
  const reviewCount = property.reviewCount || 0;

  return (
    <section className="min-h-screen bg-background py-8 sm:py-10 lg:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* =========================
            BACK BUTTON
        ========================== */}
        <Link
          href="/properties"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Properties
        </Link>

        {/* =========================
            HERO IMAGE
        ========================== */}
        <div className="relative h-[420px] overflow-hidden rounded-3xl shadow-xl sm:h-[480px] lg:h-[560px]">
          <Image
            src={
              property.imageUrl ||
              "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1600&auto=format&fit=crop"
            }
            alt={property.title}
            fill
            priority
            className="object-cover"
          />

          {/* Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

          {/* Availability */}
          <div className="absolute right-5 top-5 sm:right-7 sm:top-7">
            <span
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold shadow-lg backdrop-blur-md ${
                property.availability
                  ? "bg-green-500/90 text-white"
                  : "bg-red-500/90 text-white"
              }`}
            >
              <span
                className={`h-2 w-2 rounded-full ${
                  property.availability ? "bg-white" : "bg-white"
                }`}
              />

              {property.availability ? "Available" : "Unavailable"}
            </span>
          </div>

          {/* Featured */}
          {property.isFeatured && (
            <div className="absolute left-5 top-5 sm:left-7 sm:top-7">
              <span className="rounded-full bg-white/95 px-4 py-2 text-sm font-semibold text-primary shadow-lg backdrop-blur-md">
                ✦ Featured Property
              </span>
            </div>
          )}

          {/* Hero Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:p-10">
            <div className="max-w-4xl">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
                  {property.category?.name || "Property"}
                </span>

                {rating > 0 && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
                    <Star className="h-3.5 w-3.5 fill-current" />
                    {rating.toFixed(1)}
                  </span>
                )}
              </div>

              <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
                {property.title}
              </h1>

              <div className="mt-3 flex items-center gap-2 text-sm text-white/90 sm:text-base">
                <MapPin className="h-4 w-4 shrink-0" />
                <span>{property.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* =========================
            QUICK PROPERTY STATS
        ========================== */}
        <div className="relative z-10 -mt-8 px-4 sm:px-8">
          <div className="grid grid-cols-2 overflow-hidden rounded-2xl border border-border bg-card shadow-xl sm:grid-cols-4">
            {/* Bedrooms */}
            <div className="flex items-center gap-3 border-b border-r border-border p-4 sm:border-b-0 sm:p-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <BedDouble className="h-5 w-5" />
              </div>

              <div>
                <p className="text-lg font-bold text-foreground">
                  {property.bedrooms}
                </p>

                <p className="text-xs text-muted-foreground">Bedrooms</p>
              </div>
            </div>

            {/* Bathrooms */}
            <div className="flex items-center gap-3 border-b border-border p-4 sm:border-b-0 sm:border-r sm:p-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Bath className="h-5 w-5" />
              </div>

              <div>
                <p className="text-lg font-bold text-foreground">
                  {property.bathrooms}
                </p>

                <p className="text-xs text-muted-foreground">Bathrooms</p>
              </div>
            </div>

            {/* Area */}
            <div className="flex items-center gap-3 border-r border-border p-4 sm:p-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Ruler className="h-5 w-5" />
              </div>

              <div>
                <p className="text-lg font-bold text-foreground">
                  {property.area}
                </p>

                <p className="text-xs text-muted-foreground">Sq. Ft.</p>
              </div>
            </div>

            {/* Reviews */}
            <div className="flex items-center gap-3 p-4 sm:p-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
                <Star className="h-5 w-5 fill-current" />
              </div>

              <div>
                <p className="text-lg font-bold text-foreground">
                  {rating > 0 ? rating.toFixed(1) : "New"}
                </p>

                <p className="text-xs text-muted-foreground">
                  {reviewCount} Reviews
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* =========================
            MAIN CONTENT
        ========================== */}
        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          {/* =========================
              LEFT CONTENT
          ========================== */}
          <div className="space-y-8 lg:col-span-2">
            {/* Description */}
            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Home className="h-5 w-5" />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-foreground sm:text-2xl">
                    About This Property
                  </h2>

                  <p className="text-sm text-muted-foreground">
                    Property overview
                  </p>
                </div>
              </div>

              <p className="leading-8 text-muted-foreground">
                {property.description}
              </p>
            </div>

            {/* Amenities */}
            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-foreground sm:text-2xl">
                  Property Amenities
                </h2>

                <p className="mt-1 text-sm text-muted-foreground">
                  Everything included with this property
                </p>
              </div>

              {property.amenities.length > 0 ? (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {property.amenities.map((item: string) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 rounded-xl border border-border bg-muted/30 px-4 py-3 transition-colors hover:bg-muted/60"
                    >
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-green-500" />

                      <span className="text-sm font-medium capitalize text-foreground">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No amenities listed for this property.
                </p>
              )}
            </div>

            {/* Reviews */}
            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-foreground sm:text-2xl">
                    Guest Reviews
                  </h2>

                  <p className="mt-1 text-sm text-muted-foreground">
                    {reviewCount > 0
                      ? `${reviewCount} people reviewed this property`
                      : "No reviews yet"}
                  </p>
                </div>

                {rating > 0 && (
                  <div className="flex items-center gap-2 rounded-xl bg-amber-500/10 px-3 py-2">
                    <Star className="h-5 w-5 fill-amber-500 text-amber-500" />

                    <span className="font-bold text-foreground">
                      {rating.toFixed(1)}
                    </span>
                  </div>
                )}
              </div>

              {property.reviews && property.reviews.length > 0 ? (
                <div className="space-y-4">
                  {property.reviews.map((review) => (
                    <div
                      key={review.id}
                      className="rounded-2xl border border-border p-5"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-bold text-primary">
                            {review.tenant?.name?.charAt(0).toUpperCase() ||
                              "U"}
                          </div>

                          <div>
                            <p className="font-semibold text-foreground">
                              {review.tenant?.name || "Tenant"}
                            </p>

                            <p className="text-xs text-muted-foreground">
                              {new Date(review.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-amber-500 text-amber-500" />

                          <span className="text-sm font-semibold">
                            {review.rating}/5
                          </span>
                        </div>
                      </div>

                      <p className="mt-4 text-sm leading-6 text-muted-foreground">
                        {review.comment}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-border py-10 text-center">
                  <Star className="mx-auto h-8 w-8 text-muted-foreground/40" />

                  <p className="mt-3 font-medium text-foreground">
                    No reviews yet
                  </p>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Be the first tenant to review this property.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* =========================
              RIGHT SIDEBAR
          ========================== */}
          <aside>
            <div className="sticky top-24 space-y-5">
              {/* Booking Card */}
              <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-xl">
                <div className="p-6 sm:p-7">
                  <p className="text-sm font-medium text-muted-foreground">
                    Monthly Rent
                  </p>

                  <div className="mt-1 flex items-end gap-2">
                    <span className="text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
                      ৳ {Number(property.price).toLocaleString()}
                    </span>

                    <span className="mb-1 text-sm text-muted-foreground">
                      / month
                    </span>
                  </div>

                  <div className="my-6 h-px bg-border" />

                  {/* Property Info */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-sm text-muted-foreground">
                        Category
                      </span>

                      <span className="text-right text-sm font-semibold text-foreground">
                        {property.category?.name || "Property"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-4">
                      <span className="text-sm text-muted-foreground">
                        Location
                      </span>

                      <span className="text-right text-sm font-semibold text-foreground">
                        {property.location}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-4">
                      <span className="text-sm text-muted-foreground">
                        Availability
                      </span>

                      <span
                        className={`inline-flex items-center gap-1.5 text-sm font-semibold ${
                          property.availability
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        <span
                          className={`h-2 w-2 rounded-full ${
                            property.availability
                              ? "bg-green-500"
                              : "bg-red-500"
                          }`}
                        />

                        {property.availability ? "Available" : "Unavailable"}
                      </span>
                    </div>
                  </div>

                  <div className="my-6 h-px bg-border" />

                  {/* Request Button */}
                  <RequestRentalButton
                    propertyId={property.id}
                    availability={property.availability}
                    isLoggedIn={!!user}
                  />

                  <p className="mt-3 text-center text-xs text-muted-foreground">
                    You can send a rental request directly to the landlord.
                  </p>
                </div>
              </div>

              {/* Landlord Card */}
              <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <UserRound className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Listed By
                    </p>

                    <h3 className="font-bold text-foreground">
                      {property.landlord.name}
                    </h3>
                  </div>
                </div>

                <div className="rounded-xl bg-muted/40 px-4 py-3">
                  <p className="text-xs text-muted-foreground">Contact Email</p>

                  <p className="mt-1 break-all text-sm font-medium text-foreground">
                    {property.landlord.email}
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default PropertyDetailsPage;
