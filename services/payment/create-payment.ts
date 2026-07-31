import { api } from "@/lib/api/api";

export const createPayment = async (rentalRequestId: string) => {
  return api({
    endpoint: "/payments/create",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      rentalRequestId,
    }),
  });
};
