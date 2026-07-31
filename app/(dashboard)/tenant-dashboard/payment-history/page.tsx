import { IPayment } from "@/lib/types/payment";
import { getPayments } from "@/services/payment/get-payments";

const PaymentHistoryPage = async () => {
  const response = await getPayments();

  const payments: IPayment[] = response?.data ?? [];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Payment History</h1>

      {payments.length === 0 ? (
        <div className="rounded-lg border p-10 text-center">
          <p className="text-muted-foreground">No payment history found.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {payments.map((payment) => (
            <div key={payment.id} className="rounded-lg border p-5 shadow-sm">
              <p>
                <strong>Transaction ID:</strong> {payment.transactionId}
              </p>

              <p>
                <strong>Amount:</strong> ৳ {payment.amount}
              </p>

              <p>
                <strong>Method:</strong> {payment.method}
              </p>

              <p>
                <strong>Status:</strong> {payment.status}
              </p>

              <p>
                <strong>Paid At:</strong> {payment.paidAt ?? "Not Paid Yet"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PaymentHistoryPage;
