import { api } from "@/lib/api/api";

export interface ICategory {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

interface ICategoryResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: ICategory[];
}

export const getCategories = async (): Promise<ICategory[]> => {
  const response = (await api({
    endpoint: "/categories",
    method: "GET",
  })) as ICategoryResponse;

  return response.data;
};
