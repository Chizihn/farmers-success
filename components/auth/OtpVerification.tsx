"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Logo from "../Logo";
import ResendOtp from "./ResendOtp";
import { OtpFormType, otpSchema } from "@/types/forms";
import useAuthStore from "@/store/useAuthStore";

const OTPVerification: React.FC<{
  verificationType: "verifyEmail" | "verifyPhone" | "verifySignIn";
  token: string;
}> = ({ verificationType, token }) => {
  const { verifyEmailOTP, verifyPhoneOTP, verifyOTP } = useAuthStore();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<OtpFormType>({
    resolver: zodResolver(otpSchema),
  });

  const [otp, setOtp] = useState<string[]>(Array(4).fill(""));

  const handleOtpChange = (index: number, value: string) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setValue(`otp.${index}`, value);
  };

  const onSubmit = async (data: OtpFormType) => {
    const otpValue = parseInt(data.otp.join(""));
    try {
      if (verificationType === "verifyEmail") {
        await verifyEmailOTP(otpValue, token);
      } else if (verificationType === "verifyPhone") {
        await verifyPhoneOTP(otpValue, token);
      } else {
        await verifyOTP(otpValue, token);
      }
      router.push("/");
    } catch (error) {
      console.error("Verification failed:", error);
      alert("Verification failed. Please check your OTP or try again.");
    }
  };

  const isOtpComplete = otp.every((value) => value !== "");

  return (
    <div className="flex items-center justify-center w-full h-screen lg:bg-gray-50">
      <div className="w-full lg:max-w-lg p-6 bg-white lg:shadow-md lg:rounded-lg md:w-[40rem] flex flex-col justify-center items-center gap-2">
        <h1 className="text-2xl font-bold text-green-700 mb-4 text-center">
          Verify Your OTP
        </h1>
        <p className="text-gray-600 mb-6 text-center">
          Please enter the 4-digit code sent to your{" "}
          {verificationType === "verifyEmail" ? "email" : "phone number"}.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex space-x-2">
            {otp.map((_, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                {...register(`otp.${index}` as const)}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                className="w-1/4 h-20 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-600 text-center"
              />
            ))}
          </div>
          {errors.otp && <p className="text-red-500">{errors.otp.message}</p>}

          <button
            type="submit"
            className="w-full bg-green-700 text-white py-2 rounded-md hover:bg-green-800 transition duration-200"
            disabled={!isOtpComplete}
          >
            Verify
          </button>
        </form>

        <div className="mt-6">
          <ResendOtp
            activity={
              verificationType === "verifyEmail"
                ? "email_verification"
                : verificationType === "verifyPhone"
                ? "phone_number_verification"
                : "auth"
            }
          />
        </div>

        <div className="mt-8 flex justify-center">
          <Logo />
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;
