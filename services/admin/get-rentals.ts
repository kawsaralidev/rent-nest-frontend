import { api } from "@/lib/api/api";
import { IAdminRentalResponse } from "@/lib/types/admin";

export const getRentals = async (): Promise<IAdminRentalResponse> => {
  return api({
    endpoint: "/admin/rentals",
    method: "GET",
    next: {
      tags: ["ADMIN_RENTALS"],
    },
  });
};
