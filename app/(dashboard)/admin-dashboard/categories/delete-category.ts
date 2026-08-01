"use server";

import { revalidateTag } from "next/cache";

import { deleteCategory } from "@/services/category/delete-category";

export const deleteCategoryAction = async (id: string) => {
  const result = await deleteCategory(id);

  revalidateTag("CATEGORIES");

  return result;
};
