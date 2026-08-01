import Image from "next/image";

import { IAdminProperty } from "@/lib/types/admin";
import { ICategory } from "@/lib/types/category";
import { Badge } from "@/components/ui/badge";

interface PropertyTableProps {
  properties: IAdminProperty[];
}

const PropertyTable = ({ properties }: PropertyTableProps) => {
  if (properties.length === 0) {
    return (
      <div className="rounded-lg border p-10 text-center">
        <p className="text-muted-foreground">No properties found.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border bg-white">
      <table className="w-full">
        <thead className="border-b bg-muted/40">
          <tr>
            <th className="px-5 py-3 text-left">Image</th>
            <th className="px-5 py-3 text-left">Title</th>
            <th className="px-5 py-3 text-left">Landlord</th>
            <th className="px-5 py-3 text-left">Category</th>
            <th className="px-5 py-3 text-left">Price</th>
            <th className="px-5 py-3 text-left">Status</th>
            <th className="px-5 py-3 text-center">Rentals</th>
            <th className="px-5 py-3 text-center">Reviews</th>
          </tr>
        </thead>

        <tbody>
          {properties.map((property) => (
            <tr
              key={property.id}
              className="border-b transition-colors hover:bg-muted/30"
            >
              <td className="px-5 py-4">
                <Image
                  src={
                    property.imageUrl ||
                    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=600&auto=format&fit=crop"
                  }
                  alt={property.title}
                  width={70}
                  height={50}
                  className="rounded-md object-cover"
                />
              </td>

              <td className="px-5 py-4 font-medium">{property.title}</td>

              <td className="px-5 py-4">{property.landlord.name}</td>

              <td className="px-5 py-4">{property.category.name}</td>

              <td className="px-5 py-4">
                ৳ {Number(property.price).toLocaleString()}
              </td>

              <td className="px-5 py-4">
                <Badge
                  variant={property.availability ? "default" : "destructive"}
                >
                  {property.availability ? "Available" : "Unavailable"}
                </Badge>
              </td>

              <td className="px-5 py-4 text-center">
                {property.rentalRequests.length}
              </td>

              <td className="px-5 py-4 text-center">
                {property.reviews.length}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PropertyTable;
