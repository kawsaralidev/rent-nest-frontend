"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt, { JwtPayload } from "jsonwebtoken";

import { login, register } from "@/services/auth";

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

    cookieStore.set("accessToken", result.data.accessToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24,
      path: "/",
    });

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
