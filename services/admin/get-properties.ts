import { api } from "@/lib/api/api";
import { IAdminPropertyResponse } from "@/lib/types/admin";

export const getAdminProperties = async (): Promise<IAdminPropertyResponse> => {
  return api({
    endpoint: "/admin/properties",
    method: "GET",
    next: {
      tags: ["ADMIN_PROPERTIES"],
    },
  });
};
