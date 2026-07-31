import { api } from "@/lib/api/api";

export const getRentals = async () => {
  return api({
    endpoint: "/rentals",
    method: "GET",
  });
};
