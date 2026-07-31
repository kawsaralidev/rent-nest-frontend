import { api } from "@/lib/api/api";

interface UpdateRequestStatusPayload {
  rentalId: string;
  status: "APPROVED" | "REJECTED" | "COMPLETED";
}

export const updateRequestStatus = async ({
  rentalId,
  status,
}: UpdateRequestStatusPayload) => {
  return api({
    endpoint: `/landlord/requests/${rentalId}`,
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      status,
    }),
  });
};
