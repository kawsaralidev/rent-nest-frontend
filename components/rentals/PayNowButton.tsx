"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { createPaymentAction } from "@/app/(dashboard)/tenant-dashboard/rentals/_actions/create-payment";

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
      console.error(error);
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
