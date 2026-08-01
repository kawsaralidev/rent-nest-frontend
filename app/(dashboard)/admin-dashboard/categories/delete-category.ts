"use server";

import { revalidateTag } from "next/cache";

import { deleteCategory } from "@/services/category/delete-category";

export const deleteCategoryAction = async (id: string) => {
  try {
    const result = await deleteCategory(id);

    revalidateTag("CATEGORIES");

    return result;
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Request failed.",
    };
  }
};
