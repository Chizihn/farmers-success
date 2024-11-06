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

//Get cart items
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

  fragment ProductField on Product {
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

  fragment CartItemsList on CartItem {
    product {
      ...ProductField
    }
    quantity
  }
  query GetProductCart {
    getProductCart {
      items {
        ...CartItemsList
      }
      totalAmount
      totalQuantity
    }
  }
`;

// Get cart items by user id
export const GET_CART_ITEM = gql`
  query GetCartItem($cartItemId: String!) {
    getCartItem(cartItemId: $cartItemId) {
      cartId
      createdAt
      endDate
      id
      marketPlaceId
      marketplace {
        id
        name
        location
      }
      startDate
      updatedAt
    }
  }
`;

// Get order items by filter
export const GET_ORDER_ITEMS = gql`
  query GetOrderItems($filter: OrderItemFilter!) {
    getOrderItems(filter: $filter) {
      buyer {
        id
        email
      }
      buyerId
      createdAt
      deliveryInfo
      endDate
      id
      location
      marketPlace {
        id
        name
        location
      }
      marketPlaceId
      orderId
      rentPrice
      seller {
        id
        email
      }
      sellerId
      startDate
      state
      status
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
