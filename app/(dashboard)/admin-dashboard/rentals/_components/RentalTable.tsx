"use client";

import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { IAdminRental } from "@/lib/types/admin";

interface RentalTableProps {
  rentals: IAdminRental[];
}

const ITEMS_PER_PAGE = 10;

const RentalTable = ({ rentals }: RentalTableProps) => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  /* =========================
      SEARCH
  ========================== */

  const filteredRentals = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    if (!keyword) {
      return rentals;
    }

    return rentals.filter((rental) => {
      return (
        rental.tenant.name.toLowerCase().includes(keyword) ||
        rental.tenant.email.toLowerCase().includes(keyword) ||
        rental.property.landlord.name.toLowerCase().includes(keyword) ||
        rental.property.landlord.email.toLowerCase().includes(keyword) ||
        rental.property.title.toLowerCase().includes(keyword) ||
        rental.property.location.toLowerCase().includes(keyword) ||
        rental.status.toLowerCase().includes(keyword) ||
        rental.payment?.status?.toLowerCase().includes(keyword)
      );
    });
  }, [rentals, search]);

  /* =========================
      PAGINATION
  ========================== */

  const totalPages = Math.ceil(filteredRentals.length / ITEMS_PER_PAGE);

  const paginatedRentals = filteredRentals.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const startItem =
    filteredRentals.length === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1;

  const endItem = Math.min(
    currentPage * ITEMS_PER_PAGE,
    filteredRentals.length,
  );

  /* =========================
      EMPTY STATE
  ========================== */

  if (rentals.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-card p-10 text-center shadow-sm">
        <p className="text-muted-foreground">No rental requests found.</p>
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
          placeholder="Search tenant, landlord, property or status..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full bg-background md:max-w-lg"
        />

        <p className="text-sm text-muted-foreground">
          Total Rentals:{" "}
          <span className="font-semibold text-foreground">
            {filteredRentals.length}
          </span>
        </p>
      </div>

      {/* =========================
          NO SEARCH RESULTS
      ========================== */}

      {filteredRentals.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-card p-10 text-center shadow-sm">
          <p className="text-muted-foreground">
            No rental requests match your search.
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
            <table className="min-w-[1100px]">
              <thead className="bg-muted/50">
                <tr className="border-b border-border">
                  <th className="px-5 py-4 text-left text-sm font-semibold text-foreground">
                    Tenant
                  </th>

                  <th className="px-5 py-4 text-left text-sm font-semibold text-foreground">
                    Landlord
                  </th>

                  <th className="px-5 py-4 text-left text-sm font-semibold text-foreground">
                    Property
                  </th>

                  <th className="px-5 py-4 text-left text-sm font-semibold text-foreground">
                    Price
                  </th>

                  <th className="px-5 py-4 text-left text-sm font-semibold text-foreground">
                    Rental Status
                  </th>

                  <th className="px-5 py-4 text-left text-sm font-semibold text-foreground">
                    Payment
                  </th>

                  <th className="px-5 py-4 text-center text-sm font-semibold text-foreground">
                    Review
                  </th>

                  <th className="px-5 py-4 text-left text-sm font-semibold text-foreground">
                    Created
                  </th>
                </tr>
              </thead>

              <tbody>
                {paginatedRentals.map((rental) => (
                  <tr
                    key={rental.id}
                    className="border-b border-border last:border-b-0 transition-colors hover:bg-accent/40"
                  >
                    {/* Tenant */}
                    <td className="px-5 py-4">
                      <div>
                        <p className="font-medium text-foreground">
                          {rental.tenant.name}
                        </p>

                        <p className="text-sm text-muted-foreground">
                          {rental.tenant.email}
                        </p>
                      </div>
                    </td>

                    {/* Landlord */}
                    <td className="px-5 py-4">
                      <div>
                        <p className="font-medium text-foreground">
                          {rental.property.landlord.name}
                        </p>

                        <p className="text-sm text-muted-foreground">
                          {rental.property.landlord.email}
                        </p>
                      </div>
                    </td>

                    {/* Property */}
                    <td className="px-5 py-4">
                      <div>
                        <p className="font-medium text-foreground">
                          {rental.property.title}
                        </p>

                        <p className="text-sm text-muted-foreground">
                          {rental.property.location}
                        </p>
                      </div>
                    </td>

                    {/* Price */}
                    <td className="px-5 py-4 font-semibold text-foreground">
                      ৳ {Number(rental.property.price).toLocaleString()}
                    </td>

                    {/* Rental Status */}
                    <td className="px-5 py-4">
                      <Badge
                        variant={
                          rental.status === "COMPLETED"
                            ? "default"
                            : rental.status === "REJECTED"
                              ? "destructive"
                              : "secondary"
                        }
                      >
                        {rental.status}
                      </Badge>
                    </td>

                    {/* Payment */}
                    <td className="px-5 py-4">
                      {rental.payment ? (
                        <Badge
                          variant={
                            rental.payment.status === "COMPLETED"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {rental.payment.status}
                        </Badge>
                      ) : (
                        <Badge variant="outline">N/A</Badge>
                      )}
                    </td>

                    {/* Review */}
                    <td className="px-5 py-4 text-center">
                      {rental.review ? (
                        <span className="text-sm font-medium text-foreground">
                          ⭐ {rental.review.rating}/5
                        </span>
                      ) : (
                        <span className="text-sm text-muted-foreground">-</span>
                      )}
                    </td>

                    {/* Created */}
                    <td className="px-5 py-4 text-sm text-muted-foreground">
                      {new Date(rental.createdAt).toLocaleDateString()}
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
                {filteredRentals.length}
              </span>{" "}
              rentals
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

export default RentalTable;
