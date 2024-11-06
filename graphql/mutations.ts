import { gql } from "@apollo/client";

// Signin with email Mutation
export const SIGN_IN_WITH_EMAIL = gql`
  mutation SignInWithEmail($email: String!, $password: String!) {
    signInWithEmail(email: $email, password: $password) {
      token
    }
  }
`;

// Signin with phone Mutation
export const SIGN_IN_WITH_PHONE = gql`
  mutation SignInWithPhone($phoneNumber: String!) {
    loginUser(phoneNumber: $phoneNumber) {
      token
    }
  }
`;

// Signup with email Mutation
export const SIGN_UP_WITH_EMAIL = gql`
  mutation SignUpwithEmail($email: String!, $password: String!) {
    signUpWithEmail(email: $email, password: $password) {
      token
    }
  }
`;

// Signup with phone
export const SIGN_UP_WITH_PHONE = gql`
  mutation signUpWithPhone($phoneNumber: String!) {
    createUserAccount(phoneNumber: $phoneNumber) {
      token
    }
  }
`;

// Forgot password
export const FORGOT_PASSWORD = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email) {
      token
    }
  }
`;

// Reset password
export const RESET_PASSWORD = gql`
  mutation ResetPassword($otp: Int!, $password: String!, $token: String!) {
    resetPassword(otp: $otp, password: $password, token: $token)
  }
`;

// Resend OTP
export const RESEND_OTP = gql`
  mutation ResendOTP($identifier: String!, $activity: OtpActivity!) {
    resendOTP(identifier: $identifier, activity: $activity) {
      token
    }
  }
`;

// Verify email OTP
export const VERIFY_EMAIL_OTP = gql`
  mutation VerifyEmailOTP($otp: Int!, $token: String!) {
    verifyEmailOTP(otp: $otp, token: $token)
  }
`;

// Verify OTP
export const VERIFY_OTP = gql`
  mutation VerifyOTP($otp: Int!, $token: String!) {
    verifyOTP(otp: $otp, token: $token) {
      token
    }
  }
`;

// Verify phone number OTP
export const VERIFY_PHONE_NUMBER_OTP = gql`
  mutation VerifyPhoneNumberOTP($otp: Int!, $token: String!) {
    verifyPhoneNumberOTP(otp: $otp, token: $token)
  }
`;

//Update user profile
export const UPDATE_USER_ACCOUNT = gql`
  mutation UpdateUserAccount($data: UpdateUser!) {
    updateUserAccount(data: $data) {
      address
      city
      dob
      firstName
      gender
      lastName
      maritalStatus
      profileImageURL
      state
    }
  }
`;

// Add item to cart
export const ADD_CART_ITEM = gql`
  mutation addCartItem($data: AddCartItem!) {
    addCartItem(data: $data) {
      cartItems {
        cartId
        createdAt
        endDate
        id
        marketPlaceId
        startDate
        updatedAt
      }
      createdAt
      id
      updatedAt
      userId
    }
  }
`;

// Delete cartitem
export const DELETE_CART_ITEM = gql`
  mutation DeleteCartItem($cartItemId: String!) {
    deleteCartItem(cartItemId: $cartItemId)
  }
`;
