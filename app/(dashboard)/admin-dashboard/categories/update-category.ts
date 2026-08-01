"use server";

import { revalidateTag } from "next/cache";

import {
  IUpdateCategoryPayload,
  IUpdateCategoryResponse,
} from "@/lib/types/category";
import { updateCategory } from "@/services/category/update-category";

export const updateCategoryAction = async (
  prevState: IUpdateCategoryResponse,
  formData: FormData,
): Promise<IUpdateCategoryResponse> => {
  try {
    const id = formData.get("id") as string;

    const payload: IUpdateCategoryPayload = {
      name: formData.get("name") as string,
    };

    const result = await updateCategory(id, payload);

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
