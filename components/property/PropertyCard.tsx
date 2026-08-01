import { IProperty } from "@/lib/types/property";
import Image from "next/image";
import Link from "next/link";

interface PropertyCardProps {
  property: IProperty;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  return (
    <div className="group overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={
            property.imageUrl ||
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1200&auto=format&fit=crop"
          }
          alt={property.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {/* Availability */}
        <span
          className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold backdrop-blur-md ${
            property.availability
              ? "bg-green-500/90 text-white"
              : "bg-red-500/90 text-white"
          }`}
        >
          {property.availability ? "Available" : "Unavailable"}
        </span>

        {/* Category */}
        <span className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-primary backdrop-blur-md">
          {property.category?.name ?? "Property"}
        </span>
      </div>

      {/* Content */}
      <div className="space-y-5 p-6">
        <div>
          <h2 className="line-clamp-1 text-xl font-bold text-gray-900">
            {property.title}
          </h2>

          <p className="mt-2 flex items-center gap-2 text-sm text-gray-500">
            <span>📍</span>
            {property.location}
          </p>
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-2">
          {property.amenities.slice(0, 4).map((item) => (
            <span
              key={item}
              className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
            >
              {item}
            </span>
          ))}

          {property.amenities.length > 3 && (
            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
              +{property.amenities.length - 3} More
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-end justify-between">
          <div>
            <p className="text-2xl font-extrabold text-primary">
              ৳ {Number(property.price).toLocaleString()}
            </p>

            <span className="text-sm text-gray-500">per month</span>
          </div>

          <Link
            href={`/properties/${property.id}`}
            className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            View Details →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
