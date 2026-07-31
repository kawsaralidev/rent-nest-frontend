import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { IPayment } from "@/lib/types/payment";
import { getPayments } from "@/services/payment/get-payments";
import Link from "next/link";

const PaymentHistoryPage = async () => {
  const response = await getPayments();

  const payments: IPayment[] = response?.data ?? [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Payment History</h1>
        <p className="text-muted-foreground">
          View all your completed and pending payments.
        </p>
      </div>

      {payments.length === 0 ? (
        <Card>
          <CardContent className="py-10 text-center">
            <p className="text-muted-foreground">No payment history found.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {payments.map((payment) => (
            <Card
              key={payment.id}
              className="overflow-hidden rounded-2xl border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <CardContent className="p-0">
                {/* Header */}
                <div className="flex items-center justify-between border-b bg-muted/40 px-6 py-5">
                  <div>
                    <h2 className="text-xl font-bold">
                      🏠 {payment.rentalRequest.property.title}
                    </h2>

                    <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                      📍 {payment.rentalRequest.property.location}
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-4 py-1.5 text-sm font-semibold ${
                      payment.status === "COMPLETED"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {payment.status}
                  </span>
                </div>

                {/* Body */}
                <div className="space-y-4 p-6">
                  <div className="flex items-center justify-between border-b pb-3">
                    <span className="font-medium text-muted-foreground">
                      💰 Monthly Rent
                    </span>

                    <span className="font-semibold">
                      ৳ {payment.rentalRequest.property.price}
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-b pb-3">
                    <span className="font-medium text-muted-foreground">
                      💳 Paid Amount
                    </span>

                    <span className="font-semibold">৳ {payment.amount}</span>
                  </div>

                  <div className="flex items-center justify-between border-b pb-3">
                    <span className="font-medium text-muted-foreground">
                      💼 Payment Method
                    </span>

                    <span className="uppercase font-semibold">
                      {payment.method}
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-b pb-3">
                    <span className="font-medium text-muted-foreground">
                      🆔 Transaction ID
                    </span>

                    <span className="max-w-[220px] truncate font-mono text-sm">
                      {payment.transactionId || "-"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="font-medium text-muted-foreground">
                      📅 Paid At
                    </span>

                    <span>
                      {payment.paidAt
                        ? new Date(payment.paidAt).toLocaleDateString()
                        : "Not Paid Yet"}
                    </span>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between border-t bg-muted/30 px-6 py-4">
                  <span className="text-sm text-muted-foreground">
                    Property ID: {payment.rentalRequest.property.id}
                  </span>

                  <Link
                    href={`/properties/${payment.rentalRequest.property.id}`}
                    className="font-semibold text-primary transition hover:underline"
                  >
                    View Property →
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default PaymentHistoryPage;
