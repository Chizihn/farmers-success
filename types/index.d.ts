export interface ProductDetail {
  id: string;
  name: string;
  category: string;
  price: string | number;
  description: string;
  stock: string | number;
  images: string[];
  farm: Farm;
  deliveryAvailable: boolean;
}

export interface Farm {
  name: string;
  about: string;
  city: string;
  country: string;
}
