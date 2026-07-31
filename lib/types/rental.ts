export interface IRental {
  id: string;
  tenantId: string;
  propertyId: string;

  status: "PENDING" | "APPROVED" | "REJECTED" | "ACTIVE" | "COMPLETED";

  createdAt: string;
  updatedAt: string;

  tenant: {
    id: string;
    name: string;
    email: string;
    role: string;
    status: string;
  };

  property: {
    id: string;
    title: string;
    description: string;
    location: string;
    price: string;
    availability: boolean;
    landlordId: string;
    categoryId: string;
    amenities: string[];

    category: {
      id: string;
      name: string;
    };
  };

  payment: {
    id: string;
    transactionId: string;
    rentalRequestId: string;
    amount: string;
    status: string;
    paidAt: string | null;
    method: string;
  } | null;

  review: {
    id: string;
    rating: number;
    comment: string;
  } | null;
}
