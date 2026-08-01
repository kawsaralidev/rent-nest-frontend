import PayNowButton from "@/components/rentals/PayNowButton";
import ReviewButton from "@/components/rentals/ReviewButton";
import { IRental } from "@/lib/types/rental";
import { getRentals } from "@/services/property/get-rentals";
import Link from "next/link";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";

import { Card, CardContent } from "@/components/ui/card";

const RentalsPage = async () => {
  const response = await getRentals();

  const rentals: IRental[] = response?.data ?? [];
  console.log("Rental:", rentals);

  return (
    <div className="space-y-6 w-full">
      <h1 className="text-3xl font-bold">My Rentals</h1>

      {rentals.length === 0 ? (
        <div className="rounded-lg border p-10 text-center">
          <p className="text-muted-foreground">
            You have not requested any rentals yet.
          </p>
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Property</TableHead>
                  <TableHead>Rent</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Review</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {rentals.map((rental) => (
                  <TableRow key={rental.id}>
                    {/* Property */}
                    <TableCell>
                      <div>
                        <p className="font-semibold">{rental.property.title}</p>

                        <p className="text-sm text-muted-foreground">
                          📍 {rental.property.location}
                        </p>
                      </div>
                    </TableCell>

                    {/* Rent */}
                    <TableCell className="font-semibold">
                      ৳ {Number(rental.property.price).toLocaleString()}
                    </TableCell>

                    {/* Status */}
                    <TableCell>
                      <Badge
                        className={
                          rental.status === "PENDING"
                            ? "bg-yellow-500 hover:bg-yellow-500"
                            : rental.status === "APPROVED"
                              ? "bg-blue-600 hover:bg-blue-600"
                              : rental.status === "ACTIVE"
                                ? "bg-green-600 hover:bg-green-600"
                                : rental.status === "COMPLETED"
                                  ? "bg-slate-600 hover:bg-slate-600"
                                  : "bg-red-600 hover:bg-red-600"
                        }
                      >
                        {rental.status}
                      </Badge>
                    </TableCell>

                    {/* Payment */}
                    <TableCell>
                      {rental.status === "APPROVED" ? (
                        <PayNowButton rentalRequestId={rental.id} />
                      ) : rental.payment ? (
                        <Badge className="bg-green-600 hover:bg-green-600">
                          Paid
                        </Badge>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>

                    {/* Review */}
                    <TableCell>
                      {rental.status === "COMPLETED" ? (
                        rental.review ? (
                          <Badge className="bg-green-600 hover:bg-green-600">
                            Reviewed
                          </Badge>
                        ) : (
                          <ReviewButton rental={rental} />
                        )
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>

                    {/* Action */}
                    <TableCell className="text-right">
                      <Link
                        href={`/properties/${rental.property.id}`}
                        className="font-semibold text-primary hover:underline"
                      >
                        View →
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default RentalsPage;
