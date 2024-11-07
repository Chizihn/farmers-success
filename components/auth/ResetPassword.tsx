"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Cookies from "js-cookie";
import Logo from "../Logo";
import ResendOtp from "./ResendOtp";

import {
  resetPasswordSchema,
  ResetPasswordFormType,
  OtpActivity,
} from "@/types/forms";
import useSecureStore from "@/store/useSecure";
import InputField from "../ui/InputField";
import { capitalizeFirstChar } from "@/utils";

interface ResetPasswordProps {
  token: string;
}

const ResetPassword: React.FC<ResetPasswordProps> = ({ token }) => {
  const { resetPassword } = useSecureStore();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ResetPasswordFormType>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordFormType) => {
    try {
      const otpValue = parseInt(data.otp.join(""));
      if (!token) throw new Error("Token not found");
      console.log("token not found");

      await resetPassword(otpValue, data.password, token);
      console.log("Password reset successfully!");

      Cookies.remove("reset_token");
      router.push("/signin");
    } catch (error) {
      console.error("Password reset failed:", error);
      alert("Password reset failed. Please check your OTP or try again.");
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    setValue(`otp.${index}`, value);

    if (value.length === 1 && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }

    if (value.length === 0 && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-screen lg:bg-gray-50">
      <div className="w-full lg:max-w-lg p-6 bg-white lg:shadow-md lg:rounded-lg md:w-[40rem] flex flex-col justify-center items-center gap-2">
        <h1 className="text-2xl font-bold text-green-600 mb-4 text-center">
          Reset Your Password
        </h1>
        <p className="text-gray-600 mb-6 text-center">
          Please enter the OTP sent to your email and your new password.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex space-x-2">
            {[0, 1, 2, 3].map((index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength={1}
                {...register(`otp.${index}` as const)}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                className="w-1/4 h-20 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-600 text-center"
              />
            ))}
          </div>
          {errors.otp && (
            <p className="text-red-500">
              {capitalizeFirstChar(errors.otp.message)}
            </p>
          )}

          <InputField
            type="password"
            placeholder="New Password"
            register={register("password")}
            error={errors.password?.message}
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-200"
          >
            Reset Password
          </button>
        </form>

        <ResendOtp identifier={token} activity={OtpActivity.ForgotPassword} />
        <Logo />
      </div>
    </div>
  );
};

export default ResetPassword;
