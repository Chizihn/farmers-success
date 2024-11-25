import { useState } from "react";
import { OtpActivity } from "@/types/forms";
import useSecureStore from "@/store/useSecure";
import toast from "react-hot-toast";
import useAuthStore from "@/store/useAuthStore";

export interface ResendOtpProps {
  activity: OtpActivity;
}

const ResendOtp: React.FC<ResendOtpProps> = ({ activity }) => {
  const { resendOTP, error } = useSecureStore();
  const storeIdentifier = useAuthStore((state) => state.identifier);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleResend = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // Check identifier from store or fallback to localStorage
    const identifier = storeIdentifier || localStorage.getItem("identifier");

    if (!identifier) {
      toast.error("No identifier found. Please try again.");
      setIsLoading(false);
      return;
    }

    const success = await resendOTP(identifier, activity);
    if (success) {
      toast.success("OTP code resent successfully.");
    } else {
      toast.error(error || "Failed to resend OTP. Please try again.");
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-1 items-center">
        <p className="text-center text-gray-600">Didn’t receive the code? </p>{" "}
        <button
          onClick={handleResend}
          disabled={isLoading}
          className="text-green-600 hover:text-green-700 transition duration-200"
        >
          {isLoading ? "Resending..." : "Resend OTP"}
        </button>
      </div>

      {error && <span className="text-center text-red-500 mt-2">{error}</span>}
    </div>
  );
};

export default ResendOtp;
