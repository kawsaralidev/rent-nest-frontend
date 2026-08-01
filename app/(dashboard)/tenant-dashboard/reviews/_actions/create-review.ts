"use server";

import { revalidatePath } from "next/cache";

import { createReview } from "@/services/review/create-review";

export const createReviewAction = async (
  rentalRequestId: string,
  rating: number,
  comment: string,
) => {
  try {
    const result = await createReview({
      rentalRequestId,
      rating,
      comment,
    });

    revalidatePath("/tenant-dashboard/rentals");

    return result;
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to submit review",
    };
  }
};
