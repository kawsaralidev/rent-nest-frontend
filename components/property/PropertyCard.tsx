import { IProperty } from "@/lib/types/property";
import Image from "next/image";
import Link from "next/link";

import {
  ArrowUpRight,
  Bath,
  BedDouble,
  CheckCircle2,
  Heart,
  MapPin,
  Maximize,
  Star,
} from "lucide-react";

interface PropertyCardProps {
  property: IProperty;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl dark:shadow-black/20">
      {/* =========================
          IMAGE SECTION
      ========================== */}
      <div className="relative h-64 overflow-hidden">
        {property.imageUrl ? (
          <Image
            src={property.imageUrl}
            alt={property.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-muted">
            <div className="text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-background/80 text-muted-foreground shadow-sm">
                <HomePlaceholder />
              </div>

              <p className="text-sm font-medium text-muted-foreground">
                Property Image
              </p>
            </div>
          </div>
        )}

        {/* Image overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/20" />

        {/* Top badges */}
        <div className="absolute left-4 right-4 top-4 flex items-start justify-between gap-3">
          {/* Availability */}
          <div className="rounded-full border border-white/20 bg-black/45 px-3 py-1.5 shadow-lg backdrop-blur-md">
            <div className="flex items-center gap-2">
              <span
                className={`h-2 w-2 rounded-full ${
                  property.availability
                    ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"
                    : "bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.8)]"
                }`}
              />

              <span className="text-xs font-semibold text-white">
                {property.availability ? "Available" : "Unavailable"}
              </span>
            </div>
          </div>

          {/* Favorite */}
          <button
            type="button"
            aria-label="Add property to favorites"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white hover:text-primary dark:hover:bg-white"
          >
            <Heart className="h-4 w-4" />
          </button>
        </div>

        {/* Bottom image information */}
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
          {/* Category */}
          <span className="rounded-full border border-white/20 bg-black/30 px-3 py-1.5 text-xs font-semibold capitalize text-white shadow-lg backdrop-blur-md">
            {property.category?.name ?? "Property"}
          </span>

          {/* Featured */}
          {property.isFeatured && (
            <span className="rounded-full border border-primary/30 bg-primary/90 px-3 py-1.5 text-xs font-semibold text-primary-foreground shadow-lg backdrop-blur-md">
              Featured
            </span>
          )}
        </div>
      </div>

      {/* =========================
          CONTENT
      ========================== */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {/* Title */}
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <h2 className="line-clamp-1 text-xl font-bold tracking-tight text-card-foreground transition-colors duration-300 group-hover:text-primary">
              {property.title}
            </h2>

            <div className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 shrink-0 text-primary" />

              <span className="line-clamp-1">{property.location}</span>
            </div>
          </div>

          {/* Rating */}
          <div className="flex shrink-0 items-center gap-1.5 rounded-xl border border-border bg-muted/60 px-2.5 py-2">
            <Star className="h-4 w-4 fill-primary text-primary" />

            <span className="text-sm font-bold text-foreground">
              {property.averageRating > 0
                ? property.averageRating.toFixed(1)
                : "New"}
            </span>
          </div>
        </div>

        {/* Reviews */}
        {property.reviewCount > 0 && (
          <p className="mt-2 text-xs text-muted-foreground">
            Based on {property.reviewCount}{" "}
            {property.reviewCount === 1 ? "review" : "reviews"}
          </p>
        )}

        {/* =========================
            PROPERTY FEATURES
        ========================== */}
        <div className="mt-5 grid grid-cols-3 overflow-hidden rounded-2xl border border-border bg-muted/30">
          <div className="flex flex-col items-center gap-1.5 border-r border-border px-2 py-3.5">
            <BedDouble className="h-[18px] w-[18px] text-primary" />

            <span className="text-sm font-bold text-foreground">
              {property.bedrooms}
            </span>

            <span className="text-[11px] text-muted-foreground">Bedrooms</span>
          </div>

          <div className="flex flex-col items-center gap-1.5 border-r border-border px-2 py-3.5">
            <Bath className="h-[18px] w-[18px] text-primary" />

            <span className="text-sm font-bold text-foreground">
              {property.bathrooms}
            </span>

            <span className="text-[11px] text-muted-foreground">Bathrooms</span>
          </div>

          <div className="flex flex-col items-center gap-1.5 px-2 py-3.5">
            <Maximize className="h-[18px] w-[18px] text-primary" />

            <span className="text-sm font-bold text-foreground">
              {property.area}
            </span>

            <span className="text-[11px] text-muted-foreground">Sq Ft</span>
          </div>
        </div>

        {/* =========================
            AMENITIES
        ========================== */}
        {property.amenities.length > 0 && (
          <div className="mt-5">
            <div className="mb-2.5 flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Amenities
              </span>

              <div className="h-px flex-1 bg-border" />
            </div>

            <div className="flex min-h-7 flex-wrap gap-2">
              {property.amenities.slice(0, 3).map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-medium capitalize text-primary"
                >
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  {item}
                </span>
              ))}

              {property.amenities.length > 3 && (
                <span className="rounded-full bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground">
                  +{property.amenities.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* =========================
            FOOTER
        ========================== */}
        <div className="mt-auto pt-6">
          <div className="flex items-end justify-between gap-4 border-t border-border pt-5">
            {/* Price */}
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Monthly rent
              </p>

              <div className="mt-1 flex items-baseline gap-1">
                <span className="text-2xl font-extrabold tracking-tight text-primary">
                  ৳ {Number(property.price).toLocaleString()}
                </span>

                <span className="text-xs text-muted-foreground">/month</span>
              </div>
            </div>

            {/* CTA */}
            <Link
              href={`/properties/${property.id}`}
              className="group/button inline-flex shrink-0 items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all duration-300 hover:gap-3 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              View
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};

function HomePlaceholder() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-6 w-6"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="m3 10 9-7 9 7" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 9v10h14V9" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6h6v6" />
    </svg>
  );
}

export default PropertyCard;
