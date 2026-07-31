"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { createPaymentAction } from "@/app/(dashboard)/tenant-dashboard/rentals/_actions/create-payment";
import { toast } from "sonner";

interface Props {
  rentalRequestId: string;
}

const PayNowButton = ({ rentalRequestId }: Props) => {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    try {
      setLoading(true);

      const response = await createPaymentAction(rentalRequestId);

      window.location.href = response.data.paymentUrl;
    } catch (error) {
      if (
        error instanceof Error &&
        error.message === "Payment already exists"
      ) {
        toast.error("You already have a pending payment.");
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to process your payment.");
      }

      setLoading(false);
    }
  };

  return (
    <Button onClick={handlePayment} disabled={loading}>
      {loading ? "Redirecting..." : "Pay Now"}
    </Button>
  );
};

export default PayNowButton;
