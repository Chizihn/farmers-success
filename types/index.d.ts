import { AssetType } from "./category";
import { OtpActivity } from "./forms";

export interface AuthState extends PersistedAuthState {
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signInWithPhone: (phoneNumber: string) => Promise<void>;
  fetchUserDetails: (token: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithPhone: (phoneNumber: string) => Promise<void>;
  verifyEmailOTP: (otp: number, token: string) => Promise<void>;
  verifyOTP: (otp: number, token: string) => Promise<void>;
  verifyPhoneOTP: (otp: number, token: string) => Promise<void>;
  resendOTP: (identifier: string, activity: OtpActivity) => Promise<void>;
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

export interface ProductOwner {
  firstName: string;
  id: string;
  lastName: string;
  profileImageUrl: string;
}

export interface ProductCategory {
  categoryId: string;
  categoryType: AssetType;
  name: string;
  productId: string;
}

export interface Product {
  categories: ProductCategory[];
  city: string;
  createdAt: Date;
  description: string;
  id: string;
  images: string[];
  location: string;
  name: string;
  price: number;
  quantity: number;
  state: string;
  status: ProductStatus;
  updatedAt: Date;
  user: ProductOwner;
  userId: string;
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

export interface Farm {
  address: string;
  city: string;
  createdAt: string;
  cropCount: number;
  farmImage: string;
  id: string;
  livestockCount: number;
  name: string;
  size: number;
  state: string;
  userId: String;
  updatedAt: Date;
}
export interface PersistedAuthState {
  user: UserProfile | null;
  isAuthenticated: boolean;
  setAuthenticated: (isAuthenticated: boolean) => void;
  token: string | null;
  loading: boolean;
  error: string | null;
  identifier: string;
  setIdentifier: (identifier: string) => void;
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
