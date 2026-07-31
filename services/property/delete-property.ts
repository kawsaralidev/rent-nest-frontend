import { api } from "@/lib/api/api";

export const deleteProperty = async (id: string) => {
  const result = await api({
    endpoint: `/landlord/properties/${id}`,
    method: "DELETE",
  });

  return result;
};
