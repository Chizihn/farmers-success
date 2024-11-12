import { UserProfile } from "@/types";

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
