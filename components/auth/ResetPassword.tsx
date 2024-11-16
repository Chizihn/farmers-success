"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Logo from "../Logo";
import ResendOtp from "./ResendOtp";
import useSecureStore from "@/store/useSecure";

import { capitalizeFirstChar } from "@/utils";

interface ResetPasswordProps {
  token: string;
}

const ResetPassword: React.FC<ResetPasswordProps> = ({ token }) => {
  const { resetPassword, loading } = useSecureStore();
  const router = useRouter();

  const [otp, setOtp] = useState(["", "", "", ""]);
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleOtpChange = (index: number, value: string) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value.length === 1 && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }

    if (value.length === 0 && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Simple validation
    if (otp.some((digit) => digit === "") || password === "") {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const otpValue = parseInt(otp.join(""), 10);
      if (!token) throw new Error("Token not found");

      await resetPassword(otpValue, password, token);
      setMessage("Password reset successfully!");
      Cookies.remove("reset_token");
      router.push("/signin");
    } catch (error) {
      console.error("Password reset failed:", error);
      setError("Password reset failed. Please check your OTP or try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 lg:bg-gray-50">
      <div className="w-full lg:max-w-lg p-6 bg-white lg:shadow-md lg:rounded-lg md:w-[40rem] flex flex-col justify-center items-center gap-2">
        <h1 className="text-2xl font-bold text-green-700 mb-4 text-center">
          Reset Your Password
        </h1>
        <p className="text-gray-600 mb-6 text-center">
          Please enter the OTP sent to your email and your new password.
        </p>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="flex space-x-2">
            {[0, 1, 2, 3].map((index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength={1}
                value={otp[index]}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                className="w-1/4 h-20 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-600 text-center"
              />
            ))}
          </div>
          {error && (
            <p className="text-red-500">{capitalizeFirstChar(error)}</p>
          )}

          <input
            type="password"
            placeholder="Enter your new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-green-600"
          />

          <button
            type="submit"
            className="w-full bg-green-700 text-white py-2 rounded-md hover:bg-green-800 transition duration-200"
            disabled={loading}
          >
            {loading ? "Resetting..." : "Reset password"}
          </button>
        </form>

        {message && <p className="text-green-600 mt-2">{message}</p>}
        <ResendOtp activity="forgot_password" />
        <Logo />
      </div>
    </div>
  );
};

export default ResetPassword;
