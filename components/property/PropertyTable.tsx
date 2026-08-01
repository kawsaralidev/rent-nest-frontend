"use client";

import UpdatePropertyModal from "./UpdatePropertyModal";
import { IProperty } from "@/lib/types/property";
import DeletePropertyButton from "./DeletePropertyButton";
import { ICategory } from "@/lib/types/category";

interface PropertyTableProps {
  properties: IProperty[];
  categories: ICategory[];
}

export default function PropertyTable({
  properties,
  categories,
}: PropertyTableProps) {
  if (properties.length === 0) {
    return (
      <div className="rounded-lg border p-10 text-center">
        <h3 className="text-xl font-semibold">No Property Found</h3>
        <p className="mt-2 text-muted-foreground">
          You have not created any property yet.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="w-full">
        <thead className="bg-muted">
          <tr>
            <th className="px-4 py-3 text-left">Title</th>
            <th className="px-4 py-3 text-left">Location</th>
            <th className="px-4 py-3 text-left">Price</th>
            <th className="px-4 py-3 text-left">Category</th>
            <th className="px-4 py-3 text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {properties.map((property) => (
            <tr key={property.id} className="border-t">
              <td className="px-4 py-3">{property.title}</td>

              <td className="px-4 py-3">{property.location}</td>

              <td className="px-4 py-3">
                ৳ {Number(property.price).toLocaleString()}
              </td>

              <td className="px-4 py-3">{property.category.name}</td>

              <td className="px-4 py-3">
                <div className="flex items-center justify-center gap-2">
                  <UpdatePropertyModal
                    property={property}
                    categories={categories}
                  />
                  <DeletePropertyButton id={property.id} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
