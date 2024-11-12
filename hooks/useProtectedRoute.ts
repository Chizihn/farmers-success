import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import useAuthStore from "@/store/useAuthStore";

// Enum for different verification states
enum VerificationStatus {
  NoUser,
  EmailUnverified,
  PhoneUnverified,
  Verified,
  OtpPending,
}

const useProtectedRoute = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const pathname = usePathname();
  const { user, token } = useAuthStore();

  // Define allowed paths for each verification status
  const allowedPaths: Record<VerificationStatus, string[]> = {
    [VerificationStatus.NoUser]: [
      "/signin",
      "/",
      "/products/",
      "/category/",
      "/owners",
      "/search",
      "/signup",
      "/forgot-password",
    ],
    [VerificationStatus.EmailUnverified]: ["/verify-email", "/"],
    [VerificationStatus.PhoneUnverified]: ["/verify-phone", "/"],
    [VerificationStatus.OtpPending]: ["/verify-otp", "/"],
    [VerificationStatus.Verified]: [
      "/",
      "/category/",
      "/account",
      "/edit-profile",
      "/orders",
      "/orders/",
    ],
  };

  // Determine verification status
  const getVerificationStatus = (): VerificationStatus => {
    if (!user) return VerificationStatus.NoUser;
    if (user.email && !user.isEmailVerified)
      return VerificationStatus.EmailUnverified;
    if (user.phoneNumber && !user.isPhoneVerified)
      return VerificationStatus.PhoneUnverified;
    if (user.phoneNumber && user.isPhoneVerified)
      return VerificationStatus.OtpPending;
    return VerificationStatus.Verified;
  };

  useEffect(() => {
    const initializeRoute = () => {
      const verificationStatus = getVerificationStatus();
      const isPathAllowed =
        allowedPaths[verificationStatus]?.includes(pathname);

      // Check if the user has a valid token
      if (token) {
        // If the path is allowed, let the user access it
        if (isPathAllowed) {
          setLoading(false);
          return;
        }
        // If the path is not allowed, redirect to the default allowed path
        const defaultRedirect =
          allowedPaths[verificationStatus]?.[0] || "/signin";
        router.push(defaultRedirect);
      } else {
        // If the user doesn't have a valid token, redirect to the signin page
        router.push("/signin");
      }

      setLoading(false);
    };

    initializeRoute();
  }, [pathname, user, token]);

  return { loading };
};

export default useProtectedRoute;
