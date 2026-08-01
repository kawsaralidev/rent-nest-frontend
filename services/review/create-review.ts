import { api } from "@/lib/api/api";
import { ICreateReviewPayload } from "@/lib/types/property";

export const createReview = async (payload: ICreateReviewPayload) => {
  return api({
    endpoint: "/reviews",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
};
