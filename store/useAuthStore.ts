import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";
import Cookies from "js-cookie";
import {
  SIGN_IN_WITH_EMAIL,
  SIGN_UP_WITH_EMAIL,
  VERIFY_EMAIL_OTP,
  VERIFY_OTP,
  VERIFY_PHONE_NUMBER_OTP,
  SIGN_IN_WITH_PHONE,
  SIGN_UP_WITH_PHONE,
  RESEND_OTP,
} from "@/graphql/mutations";
import client from "@/lib/apolloClient";
import { GET_USER } from "@/graphql/queries";
import { AuthState, UserProfile } from "@/types";
import { OtpActivity } from "@/types/forms";

// Custom storage object for cookies
const cookieStorage = {
  getItem: (name: string): string | null => {
    const value = Cookies.get(name);
    return value ? value : null;
  },
  setItem: (name: string, value: string): void => {
    Cookies.set(name, value, { expires: 30 });
  },
  removeItem: (name: string): void => {
    Cookies.remove(name);
  },
};

const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        isAuthenticated: false,
        token: cookieStorage.getItem("token") || null,
        loading: false,
        error: null,
        identifier: "",
        setIdentifier: (identifier) => {
          set({ identifier });
        },
        setAuthenticated: (isAuthenticated: boolean) => {
          set({ isAuthenticated });
        },
        signInWithEmail: async (email: string, password: string) => {
          try {
            set({ loading: true, error: null });
            const response = await client.mutate({
              mutation: SIGN_IN_WITH_EMAIL,
              variables: { email, password },
            });

            // Check if the response contains the token
            if (response.data?.signInWithEmail?.token) {
              const { token } = response.data.signInWithEmail;
              set({ token, isAuthenticated: true, loading: false });
              cookieStorage.setItem("token", token);
              await useAuthStore.getState().fetchUserDetails(token);
              console.log("Signin was successful");
            } else {
              throw new Error("Failed to retrieve token");
            }
          } catch (error) {
            set({ error: (error as Error).message, loading: false });
            console.error("Signin failed:", error);
          }
        },

        signInWithPhone: async (phoneNumber: string) => {
          try {
            set({ loading: true, error: null });
            const response = await client.mutate({
              mutation: SIGN_IN_WITH_PHONE,
              variables: { phoneNumber },
            });

            // Check if the response contains the token
            if (response.data?.loginUser?.token) {
              const { token } = response.data.loginUser;
              set({ token, isAuthenticated: true, loading: false });
              cookieStorage.setItem("token", token);
              await useAuthStore.getState().fetchUserDetails(token);
              console.log("Signin was successful with phone number");
            } else {
              throw new Error("Failed to retrieve token");
            }
          } catch (error) {
            set({ error: (error as Error).message, loading: false });
            console.error("Signin failed with phone number", error);
          }
        },

        signUpWithEmail: async (email: string, password: string) => {
          try {
            set({ loading: true, error: null });
            const response = await client.mutate({
              mutation: SIGN_UP_WITH_EMAIL,
              variables: { email, password },
            });

            // Check if the response contains the user and token
            if (response.data?.signUp?.token && response.data?.signUp?.user) {
              const { user, token } = response.data.signUp;
              set({ user, token, isAuthenticated: true, loading: false });
              cookieStorage.setItem("token", token);
              cookieStorage.setItem("user", JSON.stringify(user));
              console.log("Signup successful");
            } else {
              throw new Error("Failed to retrieve user or token");
            }
          } catch (error) {
            set({ error: (error as Error).message, loading: false });
            console.error("Signup failed:", error);
          }
        },

        signUpWithPhone: async (phoneNumber: string) => {
          try {
            set({ loading: true, error: null });
            const response = await client.mutate({
              mutation: SIGN_UP_WITH_PHONE,
              variables: { phoneNumber },
            });

            // Check if the response contains the user and token
            if (
              response.data?.createAccount?.token &&
              response.data?.createAccount?.user
            ) {
              const { user, token } = response.data.createAccount;
              set({ user, token, isAuthenticated: true, loading: false });
              cookieStorage.setItem("token", token);
              cookieStorage.setItem("user", JSON.stringify(user));
              console.log("Signup successful");
            } else {
              throw new Error("Failed to retrieve user or token");
            }
          } catch (error) {
            set({ error: (error as Error).message, loading: false });
            console.error("Signup failed:", error);
          }
        },

        verifyEmailOTP: async (otp: number, token: string) => {
          try {
            set({ loading: true, error: null });
            const response = await client.mutate({
              mutation: VERIFY_EMAIL_OTP,
              variables: { otp, token },
            });

            if (response.data?.verifyEmailOTP) {
              set((state) => ({
                loading: false,
                user: { ...state.user, isEmailVerified: true } as UserProfile,
              }));
              console.log("Email OTP verified successfully");
            } else {
              throw new Error("OTP verification failed");
            }
          } catch (error) {
            set({ error: (error as Error).message, loading: false });
            console.error("Email OTP verification failed:", error);
          }
        },

        verifyPhoneOTP: async (otp: number, token: string) => {
          try {
            set({ loading: true, error: null });
            const response = await client.mutate({
              mutation: VERIFY_PHONE_NUMBER_OTP,
              variables: { otp, token },
            });

            if (response.data?.verifyPhoneNumberOTP) {
              set((state) => ({
                loading: false,
                user: { ...state.user, isPhoneVerified: true } as UserProfile,
              }));
              console.log("Phone OTP verified successfully");
            } else {
              throw new Error("OTP verification failed");
            }
          } catch (error) {
            set({ error: (error as Error).message, loading: false });
            console.error("Phone OTP verification failed:", error);
          }
        },

        verifyOTP: async (otp: number, token: string) => {
          try {
            set({ loading: true, error: null });
            const response = await client.mutate({
              mutation: VERIFY_OTP,
              variables: { otp, token },
            });

            // Assuming verifyOtpSuccess contains the token if OTP is valid
            if (response.data?.verifyOTP?.token) {
              const token = response.data.verifyOTP.token;
              set({
                loading: false,
                isAuthenticated: true,
                token: token,
              });
              cookieStorage.setItem("token", token); // Store token
              await useAuthStore.getState().fetchUserDetails(token); // Fetch user details if needed
              console.log("OTP verified successfully, user signed in");
            } else {
              throw new Error("OTP verification failed");
            }
          } catch (error) {
            set({
              error: (error as Error).message || "OTP verification failed",
              loading: false,
            });
            console.error("OTP verification failed:", error);
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
            } else {
              throw new Error("Failed to resend OTP");
            }
          } catch (error) {
            set({ error: (error as Error).message, loading: false });
            console.error("Failed to resend OTP:", error);
          }
        },

        fetchUserDetails: async (token: string) => {
          try {
            const userResponse = await client.query({
              query: GET_USER,
              context: {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              },
            });
            const user = userResponse.data.user;
            set({ user, isAuthenticated: true });

            // Save user to localStorage for persistence
            cookieStorage.setItem("user", JSON.stringify(user));
          } catch (error) {
            set({ error: (error as Error).message });
          }
        },
        logout: () => {
          cookieStorage.removeItem("token");
          cookieStorage.removeItem("user");
          set({ user: null, token: null, isAuthenticated: false, error: null });
          window.location.reload();
        },
      }),
      {
        name: "auth-storage",
        storage: createJSONStorage(() => cookieStorage),
        onRehydrateStorage: () => (state) => {
          const token = cookieStorage.getItem("token");
          if (token) {
            state?.setAuthenticated(true);
            state?.fetchUserDetails(token);
          }
        },
        partialize: (state) => ({
          user: state.user,
          token: state.token,
          isAuthenticated: state.isAuthenticated,
        }),
      }
    )
  )
);

export default useAuthStore;
