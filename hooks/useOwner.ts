import { ProductOwner } from "@/types/product";
import { useFetchProducts } from "./useFetchProducts";

export const useOwner = (
  userId: string
): {
  owner: ProductOwner | null;
  loading: boolean;
  error: Error | null;
} => {
  const { products, loading, error } = useFetchProducts({ userId });

  if (loading) {
    return { owner: null, loading: true, error: null };
  }

  if (error) {
    return { owner: null, loading: false, error };
  }

  // Find the first product by this user and get their details
  const product = products.find((p) => p.user?.id === userId);
  return {
    owner: product?.user || null,
    loading: false,
    error: null,
  };
};
