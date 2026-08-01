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
    location: formData.get("location") as string,
    price: Number(formData.get("price")),
    amenities: (formData.get("amenities") as string)
      .split(",")
      .map((item: string) => item.trim())
      .filter((item: string) => item.length > 0),
  };

  return await updateProperty(id, payload);
};
