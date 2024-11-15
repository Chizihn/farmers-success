import { gql } from "@apollo/client";

export const PRODUCT_OWNER_FRAGMENT = gql`
  fragment ProductOwnerFields on ProductOwner {
    firstName
    id
    lastName
    profileImageURL
  }
`;
export const PRODUCT_CATEGORY_FRAGMENT = gql`
  fragment ProductCategoryFields on ProductCategory {
    categoryId
    categoryType
    name
    productId
  }
`;
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

export const PRODUCT_FRAGMENT = gql`
  fragment ProductFields on Product {
    categories {
      ...ProductCategoryFields
    }
    city
    createdAt
    description
    id
    images
    location
    name
    price
    quantity
    state
    status
    updatedAt
    user {
      ...ProductOwnerFields
    }
    userId
  }
  ${PRODUCT_OWNER_FRAGMENT}
  ${PRODUCT_CATEGORY_FRAGMENT}
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

export const USER_ORDER_DATA_FRAGMENT = gql`
  fragment UserOrderData on UserOrder {
    address
    amount
    createdAt
    discount
    id
    orderItems {
      ...UserOrderItem
    }
    paymentMethod
    updatedAt
    user {
      ...UserData
    }
    userId
  }
  ${ORDER_ITEM_DATA_FRAGMENT}
  ${USER_DATA_FRAGMENT}
`;
