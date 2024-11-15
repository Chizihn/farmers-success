import { ProductStatus } from ".";
import { AssetType } from "./category";

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
