import { useFetchProducts } from "./useFetchProducts";

export const useFetchOwners = () => {
  const { products } = useFetchProducts();

  const owners = Array.from(new Set(products.map((product) => product.user)));

  return owners;
};
