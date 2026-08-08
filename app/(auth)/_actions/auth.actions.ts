"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt, { JwtPayload } from "jsonwebtoken";

import { login, logout, refreshToken, register } from "@/services/auth";

type LoginState = {
  success: boolean;
  statusCode: number;
  message: string;
  data?: {
    accessToken: string;
  };
};

type RegisterState = {
  success: boolean;
  statusCode: number;
  message: string;
};

export const loginAction = async (
  redirectTo: string,
  prevState: LoginState,
  formData: FormData,
) => {
  const payload = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const result = await login(payload);

  if (result.success) {
    const cookieStore = await cookies();

    // Access Token
    cookieStore.set("accessToken", result.data.accessToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60,
      path: "/",
    });

    // Refresh Token
    if (result.refreshToken) {
      cookieStore.set("refreshToken", result.refreshToken, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
    }

    const decodedToken = jwt.decode(result.data.accessToken) as JwtPayload;

    if (
      redirectTo &&
      redirectTo.startsWith("/") &&
      !redirectTo.startsWith("//")
    ) {
      redirect(redirectTo);
    }

    switch (decodedToken.role) {
      case "ADMIN":
        redirect("/admin-dashboard");

      case "LANDLORD":
        redirect("/landlord-dashboard");

      default:
        redirect("/tenant-dashboard");
    }
  }

  return result;
};

export const registerAction = async (
  prevState: RegisterState,
  formData: FormData,
) => {
  const payload = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    role: formData.get("role") as "TENANT" | "LANDLORD",
  };

  return await register(payload);
};

export const logoutAction = async () => {
  const cookieStore = await cookies();

  const refreshTokenValue = cookieStore.get("refreshToken")?.value;

  await logout(refreshTokenValue);

  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");

  redirect("/login");
};

export const refreshTokenAction = async () => {
  const cookieStore = await cookies();

  const refreshTokenValue = cookieStore.get("refreshToken")?.value;

  if (!refreshTokenValue) {
    return null;
  }

  const result = await refreshToken(refreshTokenValue);

  if (!result.success) {
    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");

    return null;
  }

  cookieStore.set("accessToken", result.data.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60,
    path: "/",
  });

  return result;
};
