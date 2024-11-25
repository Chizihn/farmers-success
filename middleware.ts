import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AuthState } from "./types";

const PROTECTED_PATHS = [
  /^\/verify-email$/,
  /^\/verify-phone$/,
  /^\/verify-otp$/,
  /^\/reset-password$/,
  /^\/account$/,
];

export function middleware(request: NextRequest) {
  // Get token and auth state from cookies
  const token = request.cookies.get("token")?.value;
  let authState: AuthState | undefined;

  try {
    const authStorage = request.cookies.get("auth-storage")?.value;
    if (authStorage) {
      const decodedAuth = decodeURIComponent(authStorage);
      authState = JSON.parse(decodedAuth)?.state;
    }
  } catch (error) {
    console.warn("Invalid auth-storage cookie format:", error);
  }

  const {
    user,
    isPhoneVerified: isPhoneLoginVerified,
    method,
  } = authState || {};

  const { isEmailVerified, isPhoneVerified } = user || {};
  const pathname = request.nextUrl.pathname;

  // Check if current path is protected
  const isProtectedPath = PROTECTED_PATHS.some((regex) => regex.test(pathname));
  if (!isProtectedPath) return NextResponse.next();

  const redirectTo = (path: string) => {
    const url = request.nextUrl.clone();
    url.pathname = path;
    return NextResponse.redirect(url);
  };

  // Handle /reset-password route
  if (pathname === "/reset-password") {
    const resetToken = request.cookies.get("reset_token")?.value;
    if (!resetToken) {
      return redirectTo("/forgotpassword"); // Redirect to forgot password if reset_token is missing
    }
    return NextResponse.next(); // Allow access if reset_token is present
  }

  // Handle authentication for other routes
  if (!token) return redirectTo("/signin");

  // Different verification flows based on method
  switch (method) {
    case "email":
      // For email method, enforce email verification
      if (!isEmailVerified && pathname !== "/verify-email") {
        return redirectTo("/verify-email");
      }
      break;

    case "phone-signin":
      // For phone method, skip email verification
      if (!isPhoneLoginVerified && pathname !== "/verify-otp") {
        return redirectTo("/verify-otp");
      }
      break;

    case "phone-signup":
      if (!isPhoneVerified && pathname !== "/verify-phone") {
        return redirectTo("/verify-phone");
      }
      break;

    default:
      return redirectTo("/signin");
  }

  console.log({
    token,
    method,
    isPhoneVerified,
    isPhoneLoginVerified,
    pathname,
  });

  // Allow access by default if no redirects were triggered
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/verify-email",
    "/verify-phone",
    "/verify-otp",
    "/reset-password",
    "/account",
  ],
};
