"use client";

import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
// import { IProperty } from "@/types/property";
import DeletePropertyButton from "./DeletePropertyButton";
import { IProperty } from "@/lib/types/property";

interface PropertyTableProps {
  properties: IProperty[];
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
}

export default function PropertyTable({ properties }: PropertyTableProps) {
  if (!properties.length) {
    return (
      <div className="flex h-40 items-center justify-center rounded-lg border">
        <p className="text-muted-foreground">No Properties Found</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {properties.map((property) => (
            <TableRow key={property.id}>
              <TableCell className="font-medium">{property.title}</TableCell>

              <TableCell>{property.category?.name}</TableCell>

              <TableCell>{property.location}</TableCell>

              <TableCell>৳ {property.price}</TableCell>

              <TableCell>
                <Badge
                  variant={property.isAvailable ? "default" : "destructive"}
                >
                  {property.isAvailable ? "Available" : "Unavailable"}
                </Badge>
              </TableCell>

              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button asChild size="sm" variant="outline">
                    <Link
                      href={`/landlord-dashboard/properties/${property.id}/edit`}
                    >
                      Edit
                    </Link>
                  </Button>

                  <DeletePropertyButton id={property.id} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
