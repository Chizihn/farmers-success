import { create } from "zustand";
import { devtools } from "zustand/middleware";
import {
  FORGOT_PASSWORD,
  RESEND_OTP,
  RESET_PASSWORD,
} from "@/graphql/mutations";
import client from "@/lib/apolloClient";

import {
  ForgotPasswordResponse,
  PersistedAuthState,
  ResendOTPResponse,
  ResetPasswordResponse,
} from "@/types";
import Cookies from "js-cookie";
import { OtpActivity } from "@/types/forms";

const EXPIRE_MINUTES = 5;

interface SecureState extends PersistedAuthState {
  forgotPassword: (email: string) => Promise<void>;
  resendOTP: (identifier: string, activity: OtpActivity) => Promise<void>;
  resetPassword: (
    otp: number,
    password: string,
    token: string
  ) => Promise<void>;
  clearResetState: () => void;
}

const useSecureStore = create<SecureState>()(
  devtools(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      token: null,
      loading: false,
      error: null,

      forgotPassword: async (email: string) => {
        set({ loading: true, error: null });
        try {
          const { data } = await client.mutate<ForgotPasswordResponse>({
            mutation: FORGOT_PASSWORD,
            variables: { email },
          });

          if (!data?.forgotPassword.token) {
            throw new Error("No token received from server");
          }

          Cookies.set("reset_token", data.forgotPassword.token, {
            secure: true,
            sameSite: "strict",
            expires: EXPIRE_MINUTES / (24 * 60),
          });
          console.log("reset token", data.forgotPassword.token);
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : "Error occurred",
          });
        } finally {
          set({ loading: false });
        }
      },

      resendOTP: async (identifier: string, activity: OtpActivity) => {
        try {
          set({ loading: true, error: null });
          const response = await client.mutate({
            mutation: RESEND_OTP,
            variables: { identifier, activity },
          });

          if (response.data?.resendOTP?.token) {
            const token = response.data.resendOTP.token;
            set({
              loading: false,
              token: token,
            });
            console.log("OTP resent successfully");
            console.log(identifier);
          } else {
            throw new Error("Failed to resend OTP");
          }
        } catch (error) {
          set({ error: (error as Error).message, loading: false });
          console.error("Failed to resend OTP:", error);
        }
      },
      resetPassword: async (otp: number, password: string) => {
        set({ loading: true, error: null });
        try {
          // Retrieve the token from the cookie
          const token = Cookies.get("reset_token");
          if (!token) throw new Error("Token not found");

          const { data } = await client.mutate<ResetPasswordResponse>({
            mutation: RESET_PASSWORD,
            variables: { otp, password, token }, // Pass the token from the cookie here
          });

          if (!data?.resetPassword) {
            throw new Error("Password reset failed");
          }

          // Clear token after successful reset
          Cookies.remove("reset_token");
        } catch (error) {
          set({
            error:
              error instanceof Error
                ? error.message
                : "Failed to reset password",
          });
        } finally {
          set({ loading: false });
        }
      },

      clearResetState: () => {
        set({ error: null, loading: false });
      },
    }),
    { name: "Secure Store" }
  )
);

export default useSecureStore;
