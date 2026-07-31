"use server";

import { revalidatePath } from "next/cache";

import { updateRequestStatus } from "@/services/rental/update-request-status";

export const updateRequestStatusAction = async (
  rentalId: string,
  status: "APPROVED" | "REJECTED" | "COMPLETED",
) => {
  try {
    const result = await updateRequestStatus({
      rentalId,
      status,
    });

    revalidatePath("/landlord-dashboard/requests");

    return result;
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to update request status",
    };
  }
};
