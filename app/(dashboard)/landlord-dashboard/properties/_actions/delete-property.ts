"use server";

import { deleteProperty } from "@/services/property/delete-property";

export const deletePropertyAction = async (id: string) => {
  return await deleteProperty(id);
};
