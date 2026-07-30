"use server";

import { revalidatePath } from "next/cache";

import { createRental } from "@/services/property/create-rental";

export const createRentalAction = async (propertyId: string) => {
  const result = await createRental(propertyId);

  revalidatePath(`/properties/${propertyId}`);

  return result;
};
