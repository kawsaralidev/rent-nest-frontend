import { IProperty } from "@/lib/types/property";
import Image from "next/image";
import Link from "next/link";

interface PropertyCardProps {
  property: IProperty;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm transition hover:shadow-lg">
      <div className="relative h-56 w-full">
        <Image
          src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2"
          alt={property.title}
          fill
          className="object-cover"
        />
      </div>

      <div className="space-y-3 p-5">
        <span className="rounded bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          {property.category?.name ?? "Property"}
        </span>

        <h3 className="line-clamp-1 text-xl font-semibold">{property.title}</h3>

        <p className="text-muted-foreground text-sm">📍 {property.location}</p>

        <p className="text-2xl font-bold text-primary">
          ৳ {Number(property.price).toLocaleString()}
          <span className="text-sm font-normal text-gray-500"> /month</span>
        </p>

        <Link
          href={`/properties/${property.id}`}
          className="block rounded-lg bg-primary py-2 text-center font-medium text-white transition hover:opacity-90"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default PropertyCard;
