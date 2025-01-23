import { AssetType } from "./category";
import { OtpActivity } from "./forms";

export interface AuthState extends PersistedAuthState {
  setUser: (user: UserProfile) => void;
  setAuthenticated: (auth: PersistedAuthState) => void;
  setPhoneVerified?: (isPhoneVerified: boolean) => void;
  setError: (error: string | null) => void;
  setMethod?: (method: AuthMethod | null) => void;
  signInWithEmail: (email: string, password: string) => Promise<boolean>;
  signInWithPhone: (phoneNumber: string) => Promise<boolean>;
  fetchUserDetails: (token: string) => Promise<UserProfile>;
  signUpWithEmail: (email: string, password: string) => Promise<boolean>;
  signUpWithPhone: (phoneNumber: string) => Promise<boolean>;
  verifyEmailOTP: (otp: number, token: string) => Promise<boolean>;
  verifyOTP: (otp: number, token: string) => Promise<boolean>;
  verifyPhoneOTP: (otp: number, token: string) => Promise<boolean>;
  logout: () => void;
}

export type MaritalStatus = "single" | "married" | "divorced";

export type UserType = "admin" | "farmer";
export interface UserProfile {
  address: string;
  city: string;
  createdAt: Date;
  credit: number;
  dob: Date;
  email: string;
  firstName: string;
  gender: string;
  id: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  lastName: string;
  maritalStatus: MaritalStatus;
  phoneNumber: string;
  profileImageURL: string;
  state: string;
  updatedAt: Date;
  userType: UserType;
}

export type ProductStatus = "pending" | "approved" | "declined";

export interface PriceRange {
  min?: number;
  max?: number;
}

export interface GetProductsFilter {
  city?: string;
  state?: string;
  type?: string;
  priceRange?: PriceRange;
  userId?: string;
}

export interface Filter {
  keyword: string;
  location: string;
  maxPrice: number;
  minPrice: number;
  type: string;
}

export interface MarketPlace {
  pageSize: number;
  pageNumber: number;
  filter: Filter;
}

type ProductCardProps = {
  product: {
    id: string;
    images: string[];
    name: string;
    price: number;
    description: string;
  };
  onClick: () => void;
};

export interface GetProducts {
  products: Product[];
}

export interface AssetInfo {
  name: string;
}

export type AuthMethod = "email" | "phone-signup" | "phone-signin";

export interface PersistedAuthState {
  user?: UserProfile | null;
  isAuthenticated?: boolean;
  token?: string | null;
  isPhoneVerified?: boolean;
  loading?: boolean;
  error?: string | null;
  identifier?: string;
  method?: AuthMethod | null;
}

export interface ForgotPasswordResponse {
  forgotPassword: {
    token: string;
  };
}

export interface ResetPasswordResponse {
  resetPassword: boolean;
}

export interface ResendOTPResponse {
  resendOTP: {
    token: string;
  };
}
