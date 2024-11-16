// src/utils/filterProducts.ts
import { Product } from "@/types/product";

export interface Filters {
  city: string;
  state: string;
  type: string;
  minPrice: string;
  maxPrice: string;
  searchTerm: string;
  userId?: string;
}

export function filterProducts(
  products: Product[],
  filters: Filters,
  debouncedSearchTerm: string
): Product[] {
  return products.filter((product) => {
    const matchesCity =
      !filters.city ||
      product.city.toLowerCase().includes(filters.city.toLowerCase());
    const matchesState =
      !filters.state ||
      product.state.toLowerCase().includes(filters.state.toLowerCase());
    const matchesCategory =
      !filters.type ||
      product.categories.some(
        (category) => category.name.toLowerCase() === filters.type.toLowerCase()
      );
    const matchesMinPrice =
      !filters.minPrice || product.price >= parseFloat(filters.minPrice);
    const matchesMaxPrice =
      !filters.maxPrice || product.price <= parseFloat(filters.maxPrice);
    const matchesSearch =
      !debouncedSearchTerm ||
      product.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      product.description
        .toLowerCase()
        .includes(debouncedSearchTerm.toLowerCase());
    const matchesUserId = !filters.userId || product.userId === filters.userId;

    return (
      matchesCity &&
      matchesState &&
      matchesCategory &&
      matchesMinPrice &&
      matchesMaxPrice &&
      matchesSearch &&
      matchesUserId
    );
  });
}
