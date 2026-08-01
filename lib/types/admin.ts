export interface IUser {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "LANDLORD" | "TENANT";
  status: "ACTIVE" | "BANNED";
  createdAt: string;
  updatedAt: string;
}

export interface IUsersResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: IUser[];
}

export interface IUpdateUserResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: IUser;
}

export interface IAdminProperty {
  id: string;
  title: string;
  description: string;
  imageUrl: string | null;
  location: string;
  price: string;
  availability: boolean;
  landlordId: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  amenities: string[];

  category: {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  };

  landlord: {
    id: string;
    name: string;
    email: string;
    role: string;
    status: string;
    createdAt: string;
    updatedAt: string;
  };

  rentalRequests: {
    id: string;
    tenantId: string;
    propertyId: string;
    status: string;
    createdAt: string;
    updatedAt: string;
  }[];

  reviews: {
    id: string;
    rating: number;
    comment: string;
    tenantId: string;
    propertyId: string;
    rentalRequestId: string;
    createdAt: string;
    updatedAt: string;
  }[];
}

export interface IAdminPropertyResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: IAdminProperty[];
}

export interface IAdminRental {
  id: string;
  status: string;
  createdAt: string;
  updatedAt: string;

  tenant: {
    id: string;
    name: string;
    email: string;
    status: string;
  };

  property: {
    id: string;
    title: string;
    location: string;
    price: string;
    availability: boolean;

    landlord: {
      id: string;
      name: string;
      email: string;
    };
  };

  payment: {
    id: string;
    amount: string;
    status: string;
    method: string;
    paidAt: string | null;
  } | null;

  review: {
    id: string;
    rating: number;
    comment: string;
  } | null;
}

export interface IAdminRentalResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: IAdminRental[];
}
