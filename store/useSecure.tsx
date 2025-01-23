import { create } from "zustand";
import {
  FORGOT_PASSWORD,
  RESEND_OTP,
  RESET_PASSWORD,
} from "@/graphql/mutations";
import client from "@/lib/apolloClient";
import { ForgotPasswordResponse, PersistedAuthState } from "@/types";
import Cookies from "js-cookie";
import { OtpActivity } from "@/types/forms";

const EXPIRE_MINUTES = 5;

interface SecureState extends PersistedAuthState {
  forgotPassword: (email: string) => Promise<boolean>;
  resendOTP: (identifier: string, activity: OtpActivity) => Promise<boolean>;
  resetPassword: (
    otp: number,
    password: string,
    token: string
  ) => Promise<boolean>;
  clearResetState: () => void;
}

const useSecureStore = create<SecureState>()((set, get) => ({
  user: null,

  isAuthenticated: false,
  token: null,
  loading: false,
  error: null,
  identifier: "",

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
      set({
        identifier: email,
      });
      Cookies.set("reset_token", data.forgotPassword.token, {
        secure: true,
        sameSite: "strict",
        expires: EXPIRE_MINUTES / (24 * 60),
      });
      localStorage.setItem("identifier", email);
      console.log("reset token", data.forgotPassword.token);
      console.log("identifier", email);
      return true;
    } catch (error) {
      set({
        identifier: email,
        error: error instanceof Error ? error.message : "Error occurred",
      });
      return false;
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
        return true;
      } else {
        throw new Error("Failed to resend OTP");
      }
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
      console.error("Failed to resend OTP:", error);
      return false;
    }
  },
  resetPassword: async (otp: number, password: string) => {
    set({ loading: true, error: null });
    try {
      // Retrieve the token from the cookie
      const token = Cookies.get("reset_token");
      if (!token) throw new Error("Token not found");

      const { data } = await client.mutate({
        mutation: RESET_PASSWORD,
        variables: { otp, password, token },
      });

      if (!data?.resetPassword) {
        throw new Error("Password reset failed");
      }

      // Clear token after successful reset
      Cookies.remove("reset_token");
      set({ identifier: "" });
      return true;
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "Failed to reset password",
      });
      return false;
    } finally {
      set({ loading: false });
    }
  },

  clearResetState: () => {
    set({ error: null, loading: false });
  },
}));

export default useSecureStore;
