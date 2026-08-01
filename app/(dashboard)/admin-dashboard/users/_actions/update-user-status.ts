"use server";

import { revalidatePath } from "next/cache";

import { updateUserStatus } from "@/services/admin/update-user-status";
import { IUpdateUserResponse } from "@/lib/types/admin";

export const updateUserStatusAction = async (
  id: string,
  status: "ACTIVE" | "BANNED",
): Promise<IUpdateUserResponse> => {
  try {
    const result = await updateUserStatus(id, status);

    revalidatePath("/admin-dashboard/users");

    return result;
  } catch (error) {
    return {
      success: false,
      statusCode: 500,
      message:
        error instanceof Error ? error.message : "Failed to update user status",
      data: {} as never,
    };
  }
};
