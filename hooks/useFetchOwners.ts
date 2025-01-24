import useProductStore from "@/store/useProductStore";

export const useFetchOwners = () => {
  const { products, loading, error, initialized } = useProductStore();

  const owners = products
    ? Array.from(new Set(products.map((product) => product.user)))
    : [];

  return {
    owners,
    loading,
    error,
    initialized,
  };
};
