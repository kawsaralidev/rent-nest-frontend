"use server";

import {
  ICreatePropertyPayload,
  ICreatePropertyResponse,
} from "@/lib/types/property";
import { createProperty } from "@/services/property/create-property";

export const createPropertyAction = async (
  prevState: ICreatePropertyResponse,
  formData: FormData,
): Promise<ICreatePropertyResponse> => {
  const payload: ICreatePropertyPayload = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    imageUrl: (formData.get("imageUrl") as string) || undefined,
    location: formData.get("location") as string,
    price: Number(formData.get("price")),
    categoryId: formData.get("categoryId") as string,
    amenities: (formData.get("amenities") as string)
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean),
  };

  return await createProperty(payload);
};
