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

export interface ProductCardData {
  image: string;
  alt: string;
  name: string;
  price: string;
  description: string;
  farm: string;
  sold: string;
  onClick: () => void;
}

export interface ProductCardProps {
  product: ProductCardData;
}
