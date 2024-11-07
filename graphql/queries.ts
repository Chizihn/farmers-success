import { gql } from "@apollo/client";

// Get user products
export const GET_USER_PRODUCTS = gql`
  query GetUserProducts {
    getUserProducts {
      createdAt
      deliveryMethod
      description
      id
      images
      location
      name
      price
      quantity
      status
      type
      updatedAt
      userId
    }
  }
`;

// Get products
export const GET_PRODUCTS = gql`
  fragment ProductOwnerFields on ProductOwner {
    firstName
    id
    lastName
    profileImageURL
  }

  fragment ProductCategoryFields on ProductCategory {
    categoryId
    categoryType
    name
    productId
  }

  query GetProducts($input: GetProductsFilter) {
    getProducts(input: $input) {
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
  }
`;

// Get product
export const GET_PRODUCT = gql`
  query GetProduct($id: String!) {
    getProduct(id: $id) {
      id
      name
      description
      price
      images
      quantity
      location
      deliveryMethod
      type
      status
      createdAt
      updatedAt
      userId
    }
  }
`;

export const GET_USER = gql`
  query User {
    user {
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
  }
`;

//Get All Categoried
export const GET_ASSET_INFO_TYPES = gql`
  query GetAssetInfoType($assetType: AssetType) {
    getAssetInfoTypes(assetType: $assetType) {
      assetType
      createdAt
      id
      name
      updatedAt
    }
  }
`;

// Get cart items by user id
export const GET_CART_ITEM = gql`
  query GetCartItem($cartItemId: String!) {
    getCartItem(cartItemId: $cartItemId) {
      cartId
      createdAt
      id
      updatedAt
    }
  }
`;

// Get order Item
export const GET_ORDER_ITEM = gql`
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

  query GetOrderItem($orderItemId: String!) {
    getOrderItem(orderItemId: $orderItemId) {
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
      order {
        address
        amount
        createdAt
        discount
        id
        orderItems {
          ...OrderItemData
        }
        paymentMethod
        updatedAt
        user {
          ...UserData
        }
        userId
      }
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
  }
`;

// Get order items by filter
export const GET_ORDER_ITEMS = gql`
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

  fragment OrderItemData on UserOrderItem {
    buyer {
      ...UserData
    }
    buyerId
    createdAt
    deliveryInfo
    id
    location
    orderId
    seller {
      ...UserData
    }
    sellerId
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

  query GetOrderItems($filter: OrderItemFilter!) {
    getOrderItems(filter: $filter) {
      buyer {
        ...UserData
      }
      buyerId
      createdAt
      deliveryInfo

      id
      location

      orderId
      order {
        address
        amount
        createdAt
        discount
        id
        orderItems {
          ...OrderItemData
        }
        paymentMethod
        updatedAt
        user {
          ...UserData
        }
        userId
      }
      seller {
        ...UserData
      }
      sellerId

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
  }
`;

// Get user cart
export const GET_USER_CART = gql`
  query GetUserCart {
    getUserCart {
      cartItems {
        id
        cartId
        createdAt
        updatedAt
      }
      createdAt
      id
      updatedAt
      userId
    }
  }
`;

// Get User Order Items
export const GET_USER_ORDER_ITEMS = gql`
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

  query GetUserOrderItems($userId: String!) {
    getUserOrderItems(userId: $userId) {
      buyer {
        ...UserData
      }
      buyerId
      createdAt
      deliveryInfo

      id
      location
      orderId
      seller {
        ...UserData
      }
      sellerId
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
  }
`;

// Get Product Cart
export const GET_PRODUCT_CART = gql`
  fragment ProductOwnerFields on ProductOwner {
    firstName
    id
    lastName
    profileImageURL
  }

  fragment ProductCategoryFields on ProductCategory {
    categoryId
    categoryType
    name
    productId
  }

  query GetProductCart {
    getProductCart {
      items {
        product {
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
        quantity
      }
      totalAmount
      totalQuantity
    }
  }
`;
