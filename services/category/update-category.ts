import { api } from "@/lib/api/api";
import {
  IUpdateCategoryPayload,
  IUpdateCategoryResponse,
} from "@/lib/types/category";

export const updateCategory = async (
  id: string,
  payload: IUpdateCategoryPayload,
): Promise<IUpdateCategoryResponse> => {
  return api({
    endpoint: `/categories/${id}`,
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
};
