import { AuthMethod, UserProfile } from "@/types";

export enum VerificationStatus {
  NoUser,
  EmailUnverified,
  PhoneUnverified,
  OtpPending,
  Verified,
}

export const getVerificationStatus = (
  user: UserProfile | null
): VerificationStatus => {
  if (!user) return VerificationStatus.NoUser;
  if (user.email && !user.isEmailVerified)
    return VerificationStatus.EmailUnverified;
  if (user.phoneNumber && !user.isPhoneVerified)
    return VerificationStatus.PhoneUnverified;
  if (user.phoneNumber && user.isPhoneVerified)
    return VerificationStatus.OtpPending;
  return VerificationStatus.Verified;
};

export const isPathAllowed = (
  path: string,
  allowedPaths: Record<VerificationStatus, string[]>,
  verificationStatus: VerificationStatus
): boolean => {
  return allowedPaths[verificationStatus]?.includes(path);
};

//  Verification message
export const getVerificationMessage = (
  method: AuthMethod | null | undefined, // Update parameter type
  user: UserProfile | null,
  isPhoneVerified: boolean | undefined,
  context: "cart" | "default" = "default"
) => {
  // Add a null/undefined check at the start of the function
  if (method == null) {
    return null;
  }

  switch (method) {
    case "email":
      if (!user?.isEmailVerified) {
        return {
          message:
            context === "cart"
              ? "You need to verify your email address to view your cart."
              : "Your account has not been verified. Please verify your email.",
          route: "/verify-email",
          buttonText: "Verify Email",
        };
      }
      break;

    case "phone-signup":
      if (!user?.isPhoneVerified) {
        return {
          message:
            context === "cart"
              ? "You need to verify your phone number to access your cart."
              : "Your account has not been verified. Please verify your phone number.",
          route: "/verify-phone",
          buttonText: "Verify Phone",
        };
      }
      break;

    case "phone-signin":
      if (!isPhoneVerified) {
        return {
          message:
            context === "cart"
              ? "You need to authorize your login to access your cart."
              : "Your login session has not been authorized. Please verify your phone number.",
          route: "/verify-otp",
          buttonText: "Verify",
        };
      }
      break;

    default:
      return null;
  }

  return null;
};
