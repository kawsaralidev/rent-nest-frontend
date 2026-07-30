import { api } from "@/lib/api/api";
import { IPropertyResponse } from "@/lib/types/property";

export const getProperties = async (): Promise<IPropertyResponse> => {
  return api({
    endpoint: "/properties",
    method: "GET",
    next: {
      tags: ["PROPERTIES"],
    },
  });
};
