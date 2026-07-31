"use client";

import { useTransition } from "react";
import { toast } from "sonner";

import { updateRequestStatusAction } from "@/app/(dashboard)/landlord-dashboard/requests/_actions/update-request-status";
import { completeRentalAction } from "@/app/(dashboard)/landlord-dashboard/requests/_actions/complete-rental";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { IRental } from "@/lib/types/rental";

interface Props {
  rental: IRental;
}

const RequestCard = ({ rental }: Props) => {
  const [isPending, startTransition] = useTransition();

  const handleStatusUpdate = (
    status: "APPROVED" | "REJECTED" | "COMPLETED",
  ) => {
    startTransition(async () => {
      const res = await updateRequestStatusAction(rental.id, status);

      if (res?.success) {
        toast.success(res.message);
      } else {
        toast.error(res?.message || "Something went wrong");
      }
    });
  };

  const handleCompleteRental = (rentalId: string) => {
    startTransition(async () => {
      const res = await completeRentalAction(rentalId);

      if (res?.success) {
        toast.success(res.message || "Rental completed successfully");
      } else {
        toast.error(res?.message || "Failed to complete rental");
      }
    });
  };

  return (
    <Card className="group border-border/50 hover:border-primary/40 hover:shadow-xl transition-all duration-300">
      <CardHeader className="flex flex-row items-center justify-between">
        <h3 className="text-lg font-semibold">{rental.property.title}</h3>

        <Badge
          className={
            rental.status === "PENDING"
              ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-100 hover:text-yellow-700"
              : rental.status === "APPROVED"
                ? "bg-blue-100 text-blue-700 hover:bg-blue-100 hover:text-blue-700"
                : rental.status === "ACTIVE"
                  ? "bg-green-100 text-green-700 hover:bg-green-100 hover:text-green-700"
                  : rental.status === "COMPLETED"
                    ? "bg-slate-200 text-slate-700 hover:bg-slate-200 hover:text-slate-700"
                    : "bg-red-100 text-red-700 hover:bg-red-100 hover:text-red-700"
          }
        >
          {rental.status}
        </Badge>
      </CardHeader>

      <CardContent className="space-y-3 text-sm">
        <div>
          <span className="font-medium">Tenant:</span> {rental.tenant.name}
        </div>
        <div>
          <span className="font-medium">Email:</span> {rental.tenant.email}
        </div>
        <div>
          <span className="font-medium">Location:</span>{" "}
          {rental.property.location}
        </div>
        <div>
          <span className="font-medium">Category:</span>{" "}
          {rental.property.category.name}
        </div>
        <div>
          <span className="font-medium">Rent:</span> ৳{rental.property.price}
        </div>
        <div>
          <span className="font-medium">Availability:</span>{" "}
          {rental.property.availability ? "Available" : "Unavailable"}
        </div>
        <div>
          <span className="font-medium">Payment:</span>{" "}
          {rental.payment?.status ?? "Not Paid"}
        </div>
        <div>
          <span className="font-medium">Review:</span>{" "}
          {rental.review ? "Submitted" : "Not Submitted"}
        </div>
        {rental.status === "PENDING" && (
          <div className="flex gap-2 pt-4">
            <Button
              className="flex-1"
              disabled={isPending}
              onClick={() => handleStatusUpdate("APPROVED")}
            >
              Approve
            </Button>

            <Button
              variant="destructive"
              className="flex-1"
              disabled={isPending}
              onClick={() => handleStatusUpdate("REJECTED")}
            >
              Reject
            </Button>
          </div>
        )}

        {rental.status === "APPROVED" && (
          <Button className="w-full" disabled>
            Waiting For Payment
          </Button>
        )}

        {rental.status === "ACTIVE" && (
          <Button
            className="w-full"
            disabled={isPending}
            onClick={() => handleCompleteRental(rental.id)}
          >
            Complete Rental
          </Button>
        )}

        {rental.status === "COMPLETED" && (
          <Button className="w-full" disabled>
            Rental Completed
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
export default RequestCard;
