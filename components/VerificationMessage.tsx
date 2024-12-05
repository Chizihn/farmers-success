import useAuthStore from "@/store/useAuthStore";
import Link from "next/link";

const VerificationMessage = () => {
  const { user, method, isPhoneVerified } = useAuthStore();

  // Get the verification message and button details
  const getVerificationMessage = () => {
    switch (method) {
      case "email":
        if (!user?.isEmailVerified) {
          return {
            message:
              "Your account hasn't been verified. Please verify your email.",
            route: "/verify-email",
            buttonText: "Verify email",
          };
        }
        break;

      case "phone-signup":
        if (!user?.isPhoneVerified) {
          return {
            message:
              "Your account hasn't been verified. Please verify your phone number.",
            route: "/verify-phone",
            buttonText: "Verify phone",
          };
        }
        break;

      case "phone-signin":
        if (!isPhoneVerified) {
          return {
            message:
              "Your login session hasn't been verified. Please verify your phone number.",
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

  const verificationInfo = getVerificationMessage();

  // If there's no verification message, don't render anything
  if (!verificationInfo) return null;

  return (
    <div className="bg-gray-100 p-1 px-3 rounded-lg shadow-md">
      <p className="text-lg text-gray-600">
        {verificationInfo.message}
        <Link
          href={verificationInfo.route}
          className="text-green-700 hover:text-green-800 font-bold text-center  "
        >
          {verificationInfo.buttonText}
        </Link>
      </p>
    </div>
  );
};

export default VerificationMessage;
