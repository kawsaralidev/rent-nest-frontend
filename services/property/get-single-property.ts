import { api } from "@/lib/api/api";
import { ISinglePropertyResponse } from "@/lib/types/property";

export const getSingleProperty = async (
  id: string,
): Promise<ISinglePropertyResponse> => {
  return api({
    endpoint: `/properties/${id}`,
    method: "GET",
    next: {
      tags: ["PROPERTY"],
    },
  });
};
