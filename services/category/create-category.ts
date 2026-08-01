import { api } from "@/lib/api/api";
import {
  ICreateCategoryPayload,
  ICreateCategoryResponse,
} from "@/lib/types/category";

export const createCategory = async (
  payload: ICreateCategoryPayload,
): Promise<ICreateCategoryResponse> => {
  return api({
    endpoint: "/categories",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
};
