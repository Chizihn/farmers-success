import { z } from "zod";

// Define Zod schemas for Signin validation
export const emailSigninSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});
export const phoneSigninSchema = z.object({
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
});

// Define Signin types based on Zod schemas
export type EmailSigninFormType = z.infer<typeof emailSigninSchema>;
export type PhoneSigninFormType = z.infer<typeof phoneSigninSchema>;

// Define Zod schemas for Signup validation
export const emailSignupSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const phoneSignupSchema = z.object({
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
});

// Define Signup types based on Zod schemas
export type EmailSignupFormType = z.infer<typeof emailSignupSchema>;
export type PhoneSignupFormType = z.infer<typeof phoneSignupSchema>;

// Forgot Password Form Schema
export const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

// Forgot Password Form Type
export type ForgotPasswordFormType = z.infer<typeof forgotPasswordSchema>;

// Reset Password Form Schema
export const resetPasswordSchema = z.object({
  otp: z.array(z.string().min(1).max(1)).length(4),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Za-z]/, "Password must contain both letters and numbers"),
  token: z.string(),
});

// Reset Password Form Type
export type ResetPasswordFormType = z.infer<typeof resetPasswordSchema>;

//Resend otp
export enum OtpActivity {
  EmailVerification = "email_verification",
  PhoneNumberVerification = "phone_number_verification",
  Auth = "auth",
  ForgotPassword = "forgot_password",
}

// Validation schema for OTP
export const otpSchema = z.object({
  otp: z.array(z.string().min(1).max(1)).length(4),
});

export type OtpFormType = z.infer<typeof otpSchema>;
