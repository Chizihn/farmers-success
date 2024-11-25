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
import { AuthState, UserProfile } from "@/types";

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
      (set, get) => ({
        user: null,
        setUser: (user: UserProfile) => set({ user }),
        isAuthenticated: false,
        token: cookieStorage.getItem("token") || null,
        isPhoneVerified: false,
        setPhoneVerified: (isPhoneVerified) => {
          set({ isPhoneVerified });
        },
        identifier: "",
        method: null,
        setMethod: (method) => {
          set({ method });
        },
        loading: false,
        error: null,
        setError: (error) => {
          set({ error });
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

              cookieStorage.setItem("token", token);
              await get().fetchUserDetails(token);

              set({
                token,
                isAuthenticated: true,
                identifier: email,
                loading: false,
                method: "email",
                error: "Invalid credentials",
              });

              console.log("Signin was successful");
              return true;
            } else {
              throw new Error("Failed to retrieve token");
            }
          } catch (error) {
            set({ error: (error as Error).message, loading: false });
            console.error("Signin failed:", error);
          }
          return false;
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
              await get().fetchUserDetails(token);

              set({
                token,
                isAuthenticated: true,
                identifier: phoneNumber,
                method: "phone-signin",
                loading: false,
              });

              console.log("Signin was successful with phone number");
              return true;
            } else {
              throw new Error("Failed to retrieve token");
            }
          } catch (error) {
            set({ error: (error as Error).message, loading: false });
            console.error("Signin failed with phone number", error);
            return false;
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

              cookieStorage.setItem("token", token);
              cookieStorage.setItem("user", JSON.stringify(user));

              set({
                user,
                token,
                isAuthenticated: true,
                identifier: email,
                method: "email",
                loading: false,
              });

              console.log("Signup successful");
              return true;
            } else {
              throw new Error("Failed to retrieve user or token");
            }
          } catch (error) {
            set({ error: (error as Error).message, loading: false });
            console.error("Signup failed:", error);
            return false;
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

              cookieStorage.setItem("token", token);
              cookieStorage.setItem("user", JSON.stringify(user));

              set({
                user,
                token,
                isAuthenticated: true,
                identifier: phoneNumber,
                method: "phone-signup",
                loading: false,
              });

              console.log("Signup successful");
              return true;
            } else {
              throw new Error("Failed to retrieve user or token");
            }
          } catch (error) {
            set({ error: (error as Error).message, loading: false });
            console.error("Signup failed:", error);
            return false;
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
                user: { ...state.user, isEmailVerified: true } as UserProfile,
              }));
              console.log("Email OTP verified successfully");
              return true;
            } else {
              throw new Error("OTP verification failed");
            }
          } catch (error) {
            set({ error: (error as Error).message });
            console.error("Email OTP verification failed:", error);
            return false;
          } finally {
            set({ loading: false });
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
                user: { ...state.user, isPhoneVerified: true } as UserProfile,
              }));
              console.log("Phone OTP verified successfully");
              return true;
            } else {
              throw new Error("OTP verification failed");
            }
          } catch (error) {
            set({ error: (error as Error).message });
            console.error("Phone OTP verification failed:", error);
            return false;
          } finally {
            set({ loading: false });
          }
        },

        verifyOTP: async (otp: number, token: string) => {
          try {
            set({ loading: true, error: null });
            const response = await client.mutate({
              mutation: VERIFY_OTP,
              variables: { otp, token },
            });

            // verifyOtpSuccess contains the token if OTP is valid
            if (response.data?.verifyOTP?.token) {
              const token = response.data.verifyOTP.token;
              set({
                isPhoneVerified: true,
                isAuthenticated: true,
                token: token,
              });
              cookieStorage.setItem("token", token);
              await useAuthStore.getState().fetchUserDetails(token);
              console.log("OTP verified successfully, user signed in");
              return true;
            } else {
              throw new Error("OTP verification failed");
            }
          } catch (error) {
            set({
              error: (error as Error).message || "OTP verification failed",
            });
            console.error("OTP verification failed:", error);
            return false;
          } finally {
            set({ loading: false });
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
            const fetchedUser = userResponse.data.user;
            set({ user: fetchedUser, isAuthenticated: true });

            // Save user to localStorage for persistence
            cookieStorage.setItem("user", JSON.stringify(fetchedUser));
          } catch (error) {
            set({ error: (error as Error).message });
          }
        },
        logout: () => {
          cookieStorage.removeItem("token");
          cookieStorage.removeItem("user");
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            identifier: "",
            method: null,
            isPhoneVerified: false,
            error: null,
          });
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
          identifier: state.identifier,
          isPhoneVerified: state.isPhoneVerified,
          method: state.method,
        }),
      }
    )
  )
);

export default useAuthStore;
