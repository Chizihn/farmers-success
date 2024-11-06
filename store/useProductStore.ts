"use client";
import { GET_PRODUCTS, GET_ASSET_INFO_TYPES } from "@/graphql/queries";
import client from "@/lib/apolloClient";
import { Category, GetProductsFilter, Product } from "@/types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface ProductStore {
  products: Product[];
  loading: boolean;
  error: Error | null;
  categories: Category[];
  fetchProducts: (filter?: GetProductsFilter) => Promise<void>;
  fetchCategories: (assetType?: string) => Promise<void>;
}

const useProductStore = create<ProductStore>()(
  persist(
    (set) => ({
      products: [],
      loading: false,
      error: null,
      categories: [],

      fetchProducts: async (filter = {}) => {
        try {
          set({ loading: true, error: null });
          const { data } = await client.query({
            query: GET_PRODUCTS,
            variables: { input: filter },
            fetchPolicy: "network-only",
          });
          set({ products: data.getProducts, loading: false });
        } catch (error) {
          console.error("Error fetching products:", error);
          set({ error: error as Error, loading: false });
        }
      },

      fetchCategories: async (assetType) => {
        try {
          set({ loading: true, error: null });
          const { data } = await client.query({
            query: GET_ASSET_INFO_TYPES,
            variables: { assetType },
            fetchPolicy: "network-only",
          });
          set({ categories: data.getAssetInfoTypes, loading: false });
        } catch (error) {
          console.error("Error fetching categories:", error);
          set({ error: error as Error, loading: false });
        }
      },
    }),
    {
      name: "allproducts-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        products: state.products,
        categories: state.categories,
      }),
    }
  )
);

export default useProductStore;
