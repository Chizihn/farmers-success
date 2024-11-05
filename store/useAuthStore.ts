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
} from "@/graphql/mutations";
import client from "@/lib/apolloClient";
import { GET_USER } from "@/graphql/queries";
import { AuthState } from "@/types";

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
        token: null,
        loading: false,
        error: null,

        // Fetch User Details Function
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
              cookieStorage.setItem("token", token);
              set({ token, isAuthenticated: true, loading: false });
              await useAuthStore.getState().fetchUserDetails(token);
              console.log("Signin successful");
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
              cookieStorage.setItem("token", token);
              set({ token, isAuthenticated: true, loading: false });
              await useAuthStore.getState().fetchUserDetails(token);
              console.log("Signin successful with phone number");
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
            await client.mutate({
              mutation: VERIFY_EMAIL_OTP,
              variables: { otp, token },
            });
            set({ loading: false });
            console.log("Otp correct and success");
          } catch (error) {
            set({ error: (error as Error).message, loading: false });
            console.log("Otp wrong and fail");
          }
        },
        verifyOTP: async (otp: number, token: string) => {
          try {
            set({ loading: true, error: null });
            await client.mutate({
              mutation: VERIFY_OTP,
              variables: { otp, token },
            });
            set({ loading: false });
            console.log("Otp correct and success");
          } catch (error) {
            set({ error: (error as Error).message, loading: false });
            console.log("Otp wrong and fail");
          }
        },
        verifyPhoneOTP: async (otp: number, token: string) => {
          try {
            set({ loading: true, error: null });
            await client.mutate({
              mutation: VERIFY_PHONE_NUMBER_OTP,
              variables: { otp, token },
            });
            set({ loading: false });
            console.log("Otp correct and success");
          } catch (error) {
            set({ error: (error as Error).message, loading: false });
            console.log("Otp wrong and fail");
          }
        },
        logout: () => {
          set({ user: null, token: null, isAuthenticated: false, error: null });
        },
      }),
      {
        name: "auth-storage",
        storage: createJSONStorage(() => cookieStorage),
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
