import { api } from "@/lib/api/api";
import { IUpdateUserResponse } from "@/lib/types/admin";

export const updateUserStatus = async (
  id: string,
  status: "ACTIVE" | "BANNED",
): Promise<IUpdateUserResponse> => {
  return api({
    endpoint: `/admin/users/${id}`,
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });
};
