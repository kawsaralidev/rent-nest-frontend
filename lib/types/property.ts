export interface IProperty {
  id: string;
  title: string;
  description: string;
  location: string;
  price: number;
  amenities: string[];
  images?: string[];
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;

  category: {
    id: string;
    name: string;
  };

  landlord: {
    id: string;
    name: string;
    email: string;
  };
}

export interface IPropertyResponse {
  success: boolean;
  message: string;
  data: IProperty[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
}

export interface ICreatePropertyPayload {
  title: string;
  description: string;
  location: string;
  price: number;
  categoryId: string;
  amenities: string[];
}

export interface ICreatePropertyResponse {
  success: boolean;
  message: string;
  data: IProperty;
}
