export interface IPayment {
  id: string;
  transactionId: string;
  rentalRequestId: string;
  amount: string;
  status: string;
  method: string;
  paidAt: string | null;
  createdAt: string;
  updatedAt: string;
}
