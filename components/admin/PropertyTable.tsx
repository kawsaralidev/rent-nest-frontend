"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import { IAdminProperty } from "@/lib/types/admin";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface PropertyTableProps {
  properties: IAdminProperty[];
}

const ITEMS_PER_PAGE = 10;

const PropertyTable = ({ properties }: PropertyTableProps) => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  /* =========================
      SEARCH
  ========================== */

  const filteredProperties = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    if (!keyword) {
      return properties;
    }

    return properties.filter((property) => {
      return (
        property.title.toLowerCase().includes(keyword) ||
        property.landlord.name.toLowerCase().includes(keyword) ||
        property.category.name.toLowerCase().includes(keyword) ||
        property.location.toLowerCase().includes(keyword)
      );
    });
  }, [properties, search]);

  /* =========================
      PAGINATION
  ========================== */

  const totalPages = Math.ceil(filteredProperties.length / ITEMS_PER_PAGE);

  const paginatedProperties = filteredProperties.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const startItem =
    filteredProperties.length === 0
      ? 0
      : (currentPage - 1) * ITEMS_PER_PAGE + 1;

  const endItem = Math.min(
    currentPage * ITEMS_PER_PAGE,
    filteredProperties.length,
  );

  /* =========================
      EMPTY STATE
  ========================== */

  if (properties.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-card p-10 text-center shadow-sm">
        <p className="text-muted-foreground">No properties found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* =========================
          SEARCH HEADER
      ========================== */}

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <Input
          placeholder="Search title, landlord, category or location..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full bg-background md:max-w-lg"
        />

        <p className="text-sm text-muted-foreground">
          Total Properties:{" "}
          <span className="font-semibold text-foreground">
            {filteredProperties.length}
          </span>
        </p>
      </div>

      {/* =========================
          NO SEARCH RESULTS
      ========================== */}

      {filteredProperties.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-card p-10 text-center shadow-sm">
          <p className="text-muted-foreground">
            No properties match your search.
          </p>

          <Button
            variant="outline"
            size="sm"
            className="mt-4"
            onClick={() => {
              setSearch("");
              setCurrentPage(1);
            }}
          >
            Clear Search
          </Button>
        </div>
      ) : (
        <>
          {/* =========================
              TABLE
          ========================== */}

          <div className="w-full overflow-x-auto rounded-xl border border-border bg-card shadow-sm">
            <table className="min-w-[1050px]">
              <thead className="bg-muted/50">
                <tr className="border-b border-border">
                  <th className="px-5 py-4 text-left text-sm font-semibold text-foreground">
                    Image
                  </th>

                  <th className="px-5 py-4 text-left text-sm font-semibold text-foreground">
                    Title
                  </th>

                  <th className="px-5 py-4 text-left text-sm font-semibold text-foreground">
                    Landlord
                  </th>

                  <th className="px-5 py-4 text-left text-sm font-semibold text-foreground">
                    Category
                  </th>

                  <th className="px-5 py-4 text-left text-sm font-semibold text-foreground">
                    Price
                  </th>

                  <th className="px-5 py-4 text-left text-sm font-semibold text-foreground">
                    Status
                  </th>

                  <th className="px-5 py-4 text-center text-sm font-semibold text-foreground">
                    Rentals
                  </th>

                  <th className="px-5 py-4 text-center text-sm font-semibold text-foreground">
                    Reviews
                  </th>
                </tr>
              </thead>

              <tbody>
                {paginatedProperties.map((property) => (
                  <tr
                    key={property.id}
                    className="border-b border-border last:border-b-0 transition-colors hover:bg-accent/40"
                  >
                    {/* Image */}
                    <td className="px-5 py-4">
                      <Image
                        src={
                          property.imageUrl ||
                          "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=600&auto=format&fit=crop"
                        }
                        alt={property.title}
                        width={70}
                        height={50}
                        className="h-[50px] w-[70px] rounded-lg border border-border object-cover"
                      />
                    </td>

                    {/* Title */}
                    <td className="px-5 py-4 font-medium text-foreground">
                      {property.title}
                    </td>

                    {/* Landlord */}
                    <td className="px-5 py-4">
                      <p className="text-sm font-medium text-foreground">
                        {property.landlord.name}
                      </p>
                    </td>

                    {/* Category */}
                    <td className="px-5 py-4 text-sm text-muted-foreground">
                      {property.category.name}
                    </td>

                    {/* Price */}
                    <td className="px-5 py-4 font-semibold text-foreground">
                      ৳ {Number(property.price).toLocaleString()}
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">
                      <Badge
                        variant={
                          property.availability ? "default" : "destructive"
                        }
                      >
                        {property.availability ? "Available" : "Unavailable"}
                      </Badge>
                    </td>

                    {/* Rentals */}
                    <td className="px-5 py-4 text-center font-medium text-foreground">
                      {property.rentalRequests.length}
                    </td>

                    {/* Reviews */}
                    <td className="px-5 py-4 text-center font-medium text-foreground">
                      {property.reviews.length}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* =========================
              PAGINATION
          ========================== */}

          <div className="flex flex-col items-center justify-between gap-4 rounded-xl border border-border bg-card px-6 py-4 shadow-sm md:flex-row">
            <p className="text-sm text-muted-foreground">
              Showing{" "}
              <span className="font-semibold text-foreground">{startItem}</span>{" "}
              -<span className="font-semibold text-foreground"> {endItem}</span>{" "}
              of{" "}
              <span className="font-semibold text-foreground">
                {filteredProperties.length}
              </span>{" "}
              properties
            </p>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
              >
                Previous
              </Button>

              <span className="rounded-md border border-border bg-background px-4 py-2 text-sm font-medium text-foreground">
                {currentPage} / {Math.max(totalPages, 1)}
              </span>

              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === totalPages || totalPages === 0}
                onClick={() => setCurrentPage((prev) => prev + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PropertyTable;
