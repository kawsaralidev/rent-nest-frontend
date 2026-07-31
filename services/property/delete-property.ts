"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export const deleteProperty = async (id: string) => {
  const token = (await cookies()).get("accessToken")?.value;

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/landlord/properties/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: token || "",
      },
    },
  );

  const result = await res.json();

  if (result.success) {
    revalidatePath("/landlord-dashboard/properties");
  }

  return result;
};
