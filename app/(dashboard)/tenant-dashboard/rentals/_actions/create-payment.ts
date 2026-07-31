"use server";

import { createPayment } from "@/services/payment/create-payment";

export const createPaymentAction = async (rentalRequestId: string) => {
  return await createPayment(rentalRequestId);
};
