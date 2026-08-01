import { api } from "@/lib/api/api";

export const deleteCategory = async (id: string) => {
  return api({
    endpoint: `/categories/${id}`,
    method: "DELETE",
  });
};
