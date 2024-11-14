// app/_middleware.ts (or at root for older Next.js versions)
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value; // Adjust according to your auth implementation

  // Define protected paths
  const protectedPaths = [
    "verify-email",
    "verify-phone",
    "verify-otp",
    "/reset-password",
    "/account",
    "products/category",
  ];

  if (
    protectedPaths.some((path) => request.nextUrl.pathname.startsWith(path))
  ) {
    // Redirect to signin if token is missing (user not authenticated)
    if (!token) {
      const url = request.nextUrl.clone();
      url.pathname = "/unauthorized";
      return NextResponse.redirect(url);
    }
  }

  // If user is authenticated, allow the request
  return NextResponse.next();
}
