"use client";

import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { IProperty } from "@/lib/types/property";

interface PropertyTableProps {
  properties: IProperty[];
}

export default function PropertyTable({ properties }: PropertyTableProps) {
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
                  <Link
                    href={`/landlord-dashboard/properties/${property.id}/edit`}
                  >
                    <Button size="sm">
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                  </Link>

                  <Button size="sm" variant="destructive">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
