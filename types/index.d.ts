export interface ProductDetail {
  id: string;
  name: string;
  category: string;
  price: string | number;
  description: string;
  stock: string | number;
  image: string;
  farmName: string;
  location: string;
  deliveryAvailable: boolean;
}

export type ProductCardDetail = {
  id: string;
  name: string;
  category: string;
  price: string;
  description: string;
  stock: string;
  image: string;
  farmName: string;
};
