import { api } from "@/lib/api/api";
import { IPropertyResponse } from "@/lib/types/property";

export const getMyProperties = async (): Promise<IPropertyResponse> => {
  return api({
    endpoint: "/landlord/properties",
    method: "GET",
    next: {
      tags: ["PROPERTY"],
    },
  });
};
