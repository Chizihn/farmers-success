import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  getVerificationStatus,
  isPathAllowed,
  VerificationStatus,
} from "./utils/auth";
import { AuthHook } from "./hooks/useAuth";

export async function middleware(request: NextRequest) {
  const { user, token } = await AuthHook();
  const verificationStatus = getVerificationStatus(user);

  // Define allowed paths for each verification status
  const allowedPaths: Record<VerificationStatus, string[]> = {
    [VerificationStatus.NoUser]: ["/", "/signin", "/signup", "/products/*"],
    [VerificationStatus.EmailUnverified]: ["/verify-email", "/"],
    [VerificationStatus.PhoneUnverified]: ["/verify-phone", "/"],
    [VerificationStatus.OtpPending]: ["/verify-otp", "/"],
    [VerificationStatus.Verified]: ["/account", "/checkout", "/*"],
  };

  // Check if the current path is allowed for the user's verification status
  const isAllowedPath = isPathAllowed(
    request.nextUrl.pathname,
    allowedPaths,
    verificationStatus
  );

  // If the path is not allowed, redirect the user to the appropriate path
  if (!isAllowedPath && token) {
    const defaultRedirect = allowedPaths[verificationStatus]?.[0] || "/signin";
    return NextResponse.redirect(new URL(defaultRedirect, request.url));
  }

  // Allow access to allowed paths
  return NextResponse.next();
}

export const config = {
  matcher: ["/account/:path*", "/checkout/:path*"],
};
