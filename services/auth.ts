import {
  ILoginPayload,
  ILoginResponse,
  IRegisterPayload,
  IRegisterResponse,
} from "@/lib/types/auth";

const BASE_URL = process.env.BACKEND_API_URL!;

export const login = async (
  payload: ILoginPayload,
): Promise<ILoginResponse & { refreshToken?: string }> => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  const result = await res.json();

  if (!res.ok) {
    return result;
  }

  const setCookie =
    typeof res.headers.getSetCookie === "function"
      ? res.headers.getSetCookie()[0]
      : res.headers.get("set-cookie");

  let refreshToken: string | undefined;

  if (setCookie) {
    const match = setCookie.match(/refreshToken=([^;]+)/);

    if (match) {
      refreshToken = match[1];
    }
  }

  return {
    ...result,
    refreshToken,
  };
};

export const register = async (
  payload: IRegisterPayload,
): Promise<IRegisterResponse> => {
  const res = await fetch(`${BASE_URL}/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  return res.json();
};

export const refreshToken = async (token: string) => {
  const res = await fetch(`${BASE_URL}/auth/refresh-token`, {
    method: "POST",
    headers: {
      Cookie: `refreshToken=${token}`,
    },
    cache: "no-store",
  });

  return res.json();
};

export const logout = async (token?: string) => {
  const res = await fetch(`${BASE_URL}/auth/logout`, {
    method: "POST",
    headers: token
      ? {
          Cookie: `refreshToken=${token}`,
        }
      : undefined,
    cache: "no-store",
  });

  return res.json();
};
