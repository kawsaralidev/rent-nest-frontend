import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { IPayment } from "@/lib/types/payment";
import { getPayments } from "@/services/payment/get-payments";
import Link from "next/link";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const PaymentHistoryPage = async () => {
  const response = await getPayments();

  const payments: IPayment[] = response?.data ?? [];

  return (
    <div className="space-y-6 w-full">
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
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Property</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Paid At</TableHead>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {payments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell>
                      <div>
                        <p className="font-semibold">
                          {payment.rentalRequest.property.title}
                        </p>

                        <p className="text-sm text-muted-foreground">
                          📍 {payment.rentalRequest.property.location}
                        </p>
                      </div>
                    </TableCell>

                    <TableCell>
                      <span className="font-semibold">
                        ৳ {Number(payment.amount).toLocaleString()}
                      </span>
                    </TableCell>

                    <TableCell>
                      <Badge variant="outline" className="uppercase">
                        {payment.method}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      <Badge
                        className={
                          payment.status === "COMPLETED"
                            ? "bg-green-600 hover:bg-green-600"
                            : "bg-yellow-500 hover:bg-yellow-500"
                        }
                      >
                        {payment.status}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      {payment.paidAt
                        ? new Date(payment.paidAt).toLocaleDateString()
                        : "-"}
                    </TableCell>

                    <TableCell>
                      <span className="max-w-[140px] block truncate font-mono text-xs">
                        {payment.transactionId}
                      </span>
                    </TableCell>

                    <TableCell className="text-right">
                      <Link
                        href={`/properties/${payment.rentalRequest.property.id}`}
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

export default PaymentHistoryPage;
