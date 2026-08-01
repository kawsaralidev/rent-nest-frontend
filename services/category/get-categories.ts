import { ICategoryResponse } from "./../../lib/types/category";
import { api } from "@/lib/api/api";
import { ICategory } from "@/lib/types/category";

export const getCategories = async (): Promise<ICategory[]> => {
  const response = (await api({
    endpoint: "/categories",
    method: "GET",
    next: {
      tags: ["CATEGORIES"],
    },
  })) as ICategoryResponse;

  return response.data;
};
