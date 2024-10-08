import { users } from "@/components/mockusers";
import { UserProfile } from "@/types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthState {
  user: UserProfile | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (email: string, password: string) => {
        const foundUser = users.find(
          (user) => user.email === email && user.password === password
        );

        if (foundUser) {
          set({
            user: foundUser,
            isAuthenticated: true,
          });
          console.log("Login successful:", foundUser.fullName);
        } else {
          console.log("Invalid email or password");
        }
      },
      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
        });
        console.log("User logged out");
      },
    }),
    {
      name: "user",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAuthStore;
