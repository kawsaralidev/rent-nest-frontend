"use server";

import {
  IUpdatePropertyPayload,
  IUpdatePropertyResponse,
} from "@/lib/types/property";

import { updateProperty } from "@/services/property/update-property";

export const updatePropertyAction = async (
  prevState: IUpdatePropertyResponse,
  formData: FormData,
): Promise<IUpdatePropertyResponse> => {
  const id = formData.get("id") as string;

  const payload: IUpdatePropertyPayload = {
    title: formData.get("title") as string,

    description: formData.get("description") as string,

    imageUrl: (formData.get("imageUrl") as string) || undefined,

    bedrooms: Number(formData.get("bedrooms")),

    bathrooms: Number(formData.get("bathrooms")),

    area: Number(formData.get("area")),

    isFeatured: formData.get("isFeatured") === "true",

    location: formData.get("location") as string,

    price: Number(formData.get("price")),

    amenities: (formData.get("amenities") as string)
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean),
  };

  return await updateProperty(id, payload);
};
