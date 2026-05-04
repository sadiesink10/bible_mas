import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public routes
  if (
    pathname === "/" ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/register") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.includes("favicon") ||
    pathname.endsWith(".json") ||
    pathname.endsWith(".ico")
  ) {
    return NextResponse.next();
  }

  // Check JWT token for protected routes
  const token = await getToken({ req: request, secret: process.env.AUTH_SECRET });

  if (!token) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // If logged in user visits login/register, redirect to dashboard
  if ((pathname === "/login" || pathname === "/register") && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|kjv.json).*)" ],
};
