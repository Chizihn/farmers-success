import { useFetchProducts } from "./useFetchProducts";

export const useFetchOwners = () => {
  const { products } = useFetchProducts();

  const owners = Array.from(new Set(products.map((product) => product.user)));

  return owners;
};

// import { ProductOwner } from "@/types/product";
// import { useFetchProducts } from "./useFetchProducts";

// export const useFetchOwners = () => {
//   const { products } = useFetchProducts();

//   // Use a Map to maintain unique owners by ID
//   const ownersMap = new Map<string, ProductOwner>();
//   products.forEach((product) => {
//     if (product.user) {
//       ownersMap.set(product.user.id, product.user);
//     }
//   });

//   return Array.from(ownersMap.values());
// };
