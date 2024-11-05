import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import useAuthStore from "@/store/useAuthStore";
import Cookies from "js-cookie";

// Enum for different verification states
enum VerificationStatus {
  NoUser,
  Unverified,
  EmailUnverified,
  PhoneUnverified,
  Verified,
  OtpPending,
}

const useProtectedRoute = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useAuthStore();

  // Handle reset password route separately
  if (pathname === "/reset-password") {
    const resetToken = Cookies.get("reset_token");
    if (!resetToken) {
      router.push("/signin");
    }
    setLoading(false);
    return loading;
  }

  // Determine verification status
  const getVerificationStatus = (): VerificationStatus => {
    if (!user) return VerificationStatus.NoUser;
    if (!user.isEmailVerified && !user.isPhoneVerified) {
      return VerificationStatus.Unverified;
    }
    if (!user.isEmailVerified) return VerificationStatus.EmailUnverified;
    if (!user.isPhoneVerified) return VerificationStatus.PhoneUnverified;
    if (user.isPhoneVerified) return VerificationStatus.OtpPending;
    return VerificationStatus.Verified;
  };

  const verificationStatus = getVerificationStatus();

  // Define allowed paths for each verification status
  const allowedPaths: Record<VerificationStatus, string[]> = {
    [VerificationStatus.NoUser]: ["/signin", "/signup"],
    [VerificationStatus.Unverified]: ["/verify-account"],
    [VerificationStatus.EmailUnverified]: ["/verify-email"],
    [VerificationStatus.PhoneUnverified]: ["/verify-phone"],
    [VerificationStatus.OtpPending]: ["/verify-otp"],
    [VerificationStatus.Verified]: ["/", "/dashboard", "/profile"], // Add your authenticated routes here
  };

  // Check if current path is allowed for the user's verification status
  const isPathAllowed = allowedPaths[verificationStatus]?.includes(pathname);

  // Handle routing based on verification status
  if (!isPathAllowed) {
    const defaultRedirect = allowedPaths[verificationStatus]?.[0] || "/signin";

    // Delay redirect slightly to prevent immediate flashing
    setTimeout(() => {
      router.push(defaultRedirect);
    }, 100);
  }

  // Set loading to false after initial check
  if (loading) {
    setLoading(false);
  }

  return loading;
};

export default useProtectedRoute;
