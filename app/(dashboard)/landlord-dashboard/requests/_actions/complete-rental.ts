"use server";

import { revalidatePath } from "next/cache";

import { completeRental } from "@/services/rental/complete-rental";

export const completeRentalAction = async (rentalId: string) => {
  try {
    const result = await completeRental(rentalId);

    revalidatePath("/landlord-dashboard/requests");

    return result;
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to complete rental",
    };
  }
};
