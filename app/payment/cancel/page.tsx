"use client";

import { useRouter } from "next/navigation";
import { XCircle } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function PaymentCancelPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
      <div className="w-full max-w-md rounded-xl border bg-background p-8 text-center shadow-lg">
        <XCircle className="mx-auto h-20 w-20 text-red-600" />

        <h1 className="mt-6 text-3xl font-bold">Payment Cancelled</h1>

        <p className="mt-3 text-muted-foreground">
          Your payment was cancelled.
        </p>

        <div className="mt-8 flex justify-center gap-3">
          <Button variant="outline" onClick={() => router.back()}>
            Go Back
          </Button>

          <Button
            onClick={() => router.push("/tenant-dashboard/payment-history")}
          >
            Payment History
          </Button>
        </div>
      </div>
    </div>
  );
}
