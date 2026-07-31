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

  rentalRequest: {
    id: string;

    property: {
      id: string;
      title: string;
      location: string;
      price: string;
      images: string[];
    };
  };
}
