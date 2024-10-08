// import useAuthStore from "@/store/useAuthStore";
// import { User } from "@/types";
// import  { createContext, useContext, ReactNode } from "react";

// // Define the shape of the context
// interface AuthContextProps {
//   user: User | null;
//   isAuthenticated: boolean;
//   login: (email: string, password: string) => void;
//   logout: () => void;
// }

// // Create the AuthContext with default values
// const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// // AuthProvider component that wraps your app and provides the auth store
// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const { user, isAuthenticated, login, logout } = useAuthStore();

//   return (
//     <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };
