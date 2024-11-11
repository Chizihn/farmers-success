import { gql } from "@apollo/client";

export const USER_DATA_FRAGMENT = gql`
  fragment UserData on User {
    address
    city
    createdAt
    credit
    dob
    email
    firstName
    gender
    id
    isEmailVerified
    isPhoneVerified
    lastName
    maritalStatus
    phoneNumber
    profileImageURL
    state
    updatedAt
    userType
  }
`;

export const ORDER_ITEM_DATA_FRAGMENT = gql`
  fragment OrderItemData on UserOrderItem {
    buyer {
      ...UserData
    }
    buyerId
    createdAt
    deliveryInfo
    endDate
    id
    location
    orderId
    seller {
      ...UserData
    }
    sellerId
    startDate
    state
    status {
      createdAt
      date
      id
      orderItemId
      status
      updatedAt
    }
    updatedAt
  }
  ${USER_DATA_FRAGMENT}
`;
