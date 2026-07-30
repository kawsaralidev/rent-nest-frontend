import { api } from "@/lib/api/api";

export const createRental = async (propertyId: string) => {
  return api({
    endpoint: "/rentals",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      propertyId,
    }),
  });
};
