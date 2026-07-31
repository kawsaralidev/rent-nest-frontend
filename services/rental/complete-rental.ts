import { api } from "@/lib/api/api";

export const completeRental = async (rentalId: string) => {
  return api({
    endpoint: `/landlord/requests/${rentalId}/complete`,
    method: "PATCH",
  });
};
