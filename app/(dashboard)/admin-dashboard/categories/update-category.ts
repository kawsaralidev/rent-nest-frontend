"use server";

import {
  IUpdateCategoryPayload,
  IUpdateCategoryResponse,
} from "@/lib/types/category";

import { updateCategory } from "@/services/category/update-category";

export const updateCategoryAction = async (
  prevState: IUpdateCategoryResponse,
  formData: FormData,
): Promise<IUpdateCategoryResponse> => {
  const id = formData.get("id") as string;

  const payload: IUpdateCategoryPayload = {
    name: formData.get("name") as string,
  };

  return await updateCategory(id, payload);
};
