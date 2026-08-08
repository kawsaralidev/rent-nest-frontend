export interface IProperty {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  isFeatured: boolean;
  averageRating: number;
  reviewCount: number;
  location: string;
  price: number;
  amenities: string[];
  availability: boolean;
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
  reviews?: {
    id: string;
    rating: number;
    comment: string;
    createdAt: string;

    tenant?: {
      id: string;
      name: string;
      email: string;
    };
  }[];
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

  imageUrl?: string;

  bedrooms: number;
  bathrooms: number;
  area: number;

  isFeatured?: boolean;

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

export interface IGetPropertyResponse {
  success: boolean;
  message: string;
  data: IProperty;
}

export interface IUpdatePropertyPayload {
  title?: string;
  description?: string;

  imageUrl?: string;

  bedrooms?: number;
  bathrooms?: number;
  area?: number;

  isFeatured?: boolean;

  location?: string;
  price?: number;

  amenities?: string[];
}

export interface IUpdatePropertyResponse {
  success: boolean;
  message: string;
  data: IProperty;
}

export interface ICreateReviewPayload {
  rentalRequestId: string;
  rating: number;
  comment: string;
}
