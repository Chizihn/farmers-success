import { useState, useEffect } from "react";
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
  const [initialized, setInitialized] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useAuthStore();

  // Define allowed paths for each verification status
  const allowedPaths: Record<VerificationStatus, string[]> = {
    [VerificationStatus.NoUser]: [
      "/",
      "/products/",
      "/owners",
      "/signin",
      "/signup",
    ],
    [VerificationStatus.Unverified]: ["/verify-account", "/"],
    [VerificationStatus.EmailUnverified]: ["/verify-email", "/"],
    [VerificationStatus.PhoneUnverified]: ["/verify-phone", "/"],
    [VerificationStatus.OtpPending]: ["/verify-otp"],
    [VerificationStatus.Verified]: [
      "/",
      "/account",
      "/edit-profile",
      "/dashboard",
      "/profile",
    ],
  };

  // Determine verification status
  const getVerificationStatus = (): VerificationStatus => {
    if (!user) return VerificationStatus.NoUser;
    if (!user.isEmailVerified && !user.isPhoneVerified) {
      return VerificationStatus.Unverified;
    }
    if (user.email && !user.isEmailVerified)
      return VerificationStatus.EmailUnverified;
    if (user.phoneNumber && !user.isPhoneVerified)
      return VerificationStatus.PhoneUnverified;
    if (user.phoneNumber && !user.isPhoneVerified)
      return VerificationStatus.OtpPending;
    return VerificationStatus.Verified;
  };

  useEffect(() => {
    const initializeRoute = async () => {
      // Handle reset password route separately
      if (pathname === "/reset-password") {
        const resetToken = Cookies.get("reset_token");
        if (!resetToken) {
          router.push("/signin");
        }
        setLoading(false);
        setInitialized(true);
        return;
      }

      const verificationStatus = getVerificationStatus();
      const isPathAllowed =
        allowedPaths[verificationStatus]?.includes(pathname);

      if (!isPathAllowed) {
        const defaultRedirect =
          allowedPaths[verificationStatus]?.[0] || "/signin";
        router.push(defaultRedirect);
      }

      setLoading(false);
      setInitialized(true);
    };

    initializeRoute();
  }, [pathname, user]);

  return { loading, initialized };
};

export default useProtectedRoute;
