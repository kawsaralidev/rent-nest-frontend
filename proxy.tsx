import { NextRequest, NextResponse } from "next/server";

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
    if (
      Object.values(roleBasedPrivateRoutes)
        .flat()
        .some((route) => route.test(pathname))
    ) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
  }

  // Logged in user can't access auth pages
  if (authRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
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
