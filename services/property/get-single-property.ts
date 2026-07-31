import { api } from "@/lib/api/api";
import { IProperty } from "@/lib/types/property";

export interface ISinglePropertyResponse {
  success: boolean;
  message: string;
  data: IProperty;
}

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
