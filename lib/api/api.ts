import { cookies } from "next/headers";

import { refreshToken } from "@/services/auth";
import { handleError } from "./handleError";

const BASE_URL = process.env.BACKEND_API_URL!;

type FetchOptions = RequestInit & {
  endpoint: string;
};

export const api = async ({ endpoint, headers, ...options }: FetchOptions) => {
  const cookieStore = await cookies();

  let accessToken = cookieStore.get("accessToken")?.value;

  const makeRequest = async (token?: string) => {
    return fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        ...headers,
        ...(token
          ? {
              Authorization: `Bearer ${token}`,
            }
          : {}),
      },
      cache: "no-store",
    });
  };

  // =========================
  // First Request
  // =========================

  let response = await makeRequest(accessToken);

  // =========================
  // Access Token Expired
  // =========================

  if (response.status === 401) {
    const refreshTokenValue = cookieStore.get("refreshToken")?.value;

    if (!refreshTokenValue) {
      return handleError(response);
    }

    try {
      // Get new access token
      const refreshResult = await refreshToken(refreshTokenValue);

      if (!refreshResult.success || !refreshResult.data?.accessToken) {
        cookieStore.delete("accessToken");
        cookieStore.delete("refreshToken");

        return handleError(response);
      }

      const newAccessToken = refreshResult.data?.accessToken;

      if (!newAccessToken) {
        cookieStore.delete("accessToken");
        cookieStore.delete("refreshToken");

        return handleError(response);
      }

      accessToken = newAccessToken;

      cookieStore.set("accessToken", newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60,
        path: "/",
      });

      // =========================
      // Retry Original Request
      // =========================

      response = await makeRequest(accessToken);
    } catch {
      cookieStore.delete("accessToken");
      cookieStore.delete("refreshToken");

      return handleError(response);
    }
  }

  // =========================
  // Final Error
  // =========================

  if (!response.ok) {
    return handleError(response);
  }

  return response.json();
};
