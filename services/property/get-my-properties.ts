"use server";

import { cookies } from "next/headers";

export const getMyProperties = async (page = 1, limit = 10, search = "") => {
  const token = (await cookies()).get("accessToken")?.value;

  const params = new URLSearchParams();

  params.append("page", page.toString());
  params.append("limit", limit.toString());

  if (search) {
    params.append("searchTerm", search);
  }

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/properties?${params.toString()}`,
    {
      method: "GET",
      headers: {
        Authorization: token || "",
      },
      cache: "no-store",
    },
  );

  return res.json();
};
