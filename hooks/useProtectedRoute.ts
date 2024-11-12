import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import useAuthStore from "@/store/useAuthStore";
import Cookies from "js-cookie";

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
  const { user, isAuthenticated, fetchUserDetails } = useAuthStore();

  // Allowed paths based on verification status
  const allowedPaths: Record<VerificationStatus, string[]> = {
    [VerificationStatus.NoUser]: [
      "/",
      "/products",
      "/products/",
      "/products/category",
      "/products/category/",
      "/category/",
      "/owners",
      "/owners/",
      "/signin",
      "/signup",
      "/forgot-password",
      "/search",
    ],
    [VerificationStatus.Unverified]: ["/verify-account", "/"],
    [VerificationStatus.EmailUnverified]: ["/verify-email", "/"],
    [VerificationStatus.PhoneUnverified]: ["/verify-phone", "/"],
    [VerificationStatus.OtpPending]: ["/verify-otp"],
    [VerificationStatus.Verified]: [
      "/",
      "/products",
      "/products/",
      "/products/category",
      "/category/",
      "/owners",
      "/owners/",
      "/account",
      "/account/",
      "/account/update-profile",
      "/orders",
      "/orders/",
      "/search",
    ],
  };

  // Determine the current user's verification status
  const getVerificationStatus = (): VerificationStatus => {
    if (!user) return VerificationStatus.NoUser;
    if (!user.isEmailVerified && !user.isPhoneVerified)
      return VerificationStatus.Unverified;
    if (user.email && !user.isEmailVerified)
      return VerificationStatus.EmailUnverified;
    if (user.phoneNumber && !user.isPhoneVerified)
      return VerificationStatus.PhoneUnverified;
    return VerificationStatus.Verified;
  };

  useEffect(() => {
    const initializeRoute = async () => {
      const token = Cookies.get("token");

      if (token && !user) {
        await fetchUserDetails(token);
      }

      const verificationStatus = getVerificationStatus();
      const isPathAllowed =
        allowedPaths[verificationStatus]?.includes(pathname);

      // Redirect to appropriate path based on verification status
      if (!isPathAllowed) {
        const defaultRedirect =
          allowedPaths[verificationStatus]?.[0] || "/signin";
        router.push(defaultRedirect);
      }

      setLoading(false);
    };

    initializeRoute();
  }, [pathname, user]);

  return { loading };
};

export default useProtectedRoute;
