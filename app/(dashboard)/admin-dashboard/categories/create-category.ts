"use server";

import { revalidateTag } from "next/cache";

import {
  ICreateCategoryPayload,
  ICreateCategoryResponse,
} from "@/lib/types/category";
import { createCategory } from "@/services/category/create-category";

export const createCategoryAction = async (
  prevState: ICreateCategoryResponse,
  formData: FormData,
): Promise<ICreateCategoryResponse> => {
  try {
    const payload: ICreateCategoryPayload = {
      name: formData.get("name") as string,
    };

    const result = await createCategory(payload);

    revalidateTag("CATEGORIES");

    return result;
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Request failed.",
      data: {} as never,
    };
  }
};
