export interface ILandlord {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICategory {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface IProperty {
  id: string;
  title: string;
  description: string;
  location: string;
  price: string;
  availability: boolean;
  landlordId: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  amenities: string[];
  landlord: ILandlord;
  category: ICategory;
}

export interface IPropertyResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: IProperty[];
}

export interface ISinglePropertyResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: IProperty;
}
