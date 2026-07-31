import { api } from "@/lib/api/api";

export const getPayments = async () => {
  return api({
    endpoint: "/payments",
    method: "GET",
  });
};
