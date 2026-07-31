import { api } from "@/lib/api/api";
import { IRental } from "@/lib/types/rental";

export const getLandlordRequests = async (): Promise<IRental[]> => {
  const response = await api({
    endpoint: "/landlord/requests",
    method: "GET",
  });

  return response.data;
};
