export interface ICategory {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICategoryResponse {
  success: boolean;
  message: string;
  data: ICategory[];
}

export interface ICreateCategoryPayload {
  name: string;
}

export interface ICreateCategoryResponse {
  success: boolean;
  message: string;
  data: ICategory;
}

export interface IUpdateCategoryPayload {
  name: string;
}

export interface IUpdateCategoryResponse {
  success: boolean;
  message: string;
  data: ICategory;
}

export interface ICategory {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICategoryResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: ICategory[];
}
