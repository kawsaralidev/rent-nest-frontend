"use server";

import {
  ICreateCategoryPayload,
  ICreateCategoryResponse,
} from "@/lib/types/category";

import { createCategory } from "@/services/category/create-category";

export const createCategoryAction = async (
  prevState: ICreateCategoryResponse,
  formData: FormData,
): Promise<ICreateCategoryResponse> => {
  const payload: ICreateCategoryPayload = {
    name: formData.get("name") as string,
  };

  return await createCategory(payload);
};
