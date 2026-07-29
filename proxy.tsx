import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

const authRoutes = ["/login", "/register"];

const roleBasedPrivateRoutes = {
  ADMIN: [/^\/admin-dashboard/],
  LANDLORD: [/^\/landlord-dashboard/],
  TENANT: [/^\/tenant-dashboard/],
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get("accessToken")?.value;

  // User is not logged in
  if (!accessToken) {
    const isPrivateRoute = Object.values(roleBasedPrivateRoutes)
      .flat()
      .some((route) => route.test(pathname));

    if (isPrivateRoute) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
  }

  // Logged in user can't access login/register
  if (authRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  try {
    const decoded = jwt.decode(accessToken) as JwtPayload & {
      role: "ADMIN" | "LANDLORD" | "TENANT";
    };

    const routes = roleBasedPrivateRoutes[decoded.role];

    const isAuthorized = routes.some((route) => route.test(pathname));

    if (
      pathname.startsWith("/admin-dashboard") ||
      pathname.startsWith("/landlord-dashboard") ||
      pathname.startsWith("/tenant-dashboard")
    ) {
      if (!isAuthorized) {
        return NextResponse.redirect(new URL("/", request.url));
      }
    }
  } catch {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/register",
    "/admin-dashboard/:path*",
    "/landlord-dashboard/:path*",
    "/tenant-dashboard/:path*",
  ],
};
