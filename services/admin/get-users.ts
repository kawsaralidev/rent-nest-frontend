import { api } from "@/lib/api/api";
import { IUsersResponse } from "@/lib/types/admin";

export const getUsers = async (): Promise<IUsersResponse> => {
  return api({
    endpoint: "/admin/users",
    method: "GET",
    next: {
      tags: ["USERS"],
    },
  });
};
