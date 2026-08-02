"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export default function PaymentSuccessPage() {
  const router = useRouter();

  useEffect(() => {
    toast.success("Payment completed successfully.");

    const timer = setTimeout(() => {
      router.replace("/tenant-dashboard/payment-history");
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
      <div className="w-full max-w-md rounded-xl border bg-background p-8 text-center shadow-lg">
        <CheckCircle2 className="mx-auto h-20 w-20 text-green-600" />

        <h1 className="mt-6 text-3xl font-bold">Payment Successful</h1>

        <p className="mt-3 text-muted-foreground">
          Thank you for your payment.
        </p>

        <p className="mt-2 text-sm text-muted-foreground">
          Redirecting to Payment History...
        </p>
      </div>
    </div>
  );
}
