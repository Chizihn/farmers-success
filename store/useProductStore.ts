import { create } from "zustand";
import { persist } from "zustand/middleware";
import client from "@/lib/apolloClient";
import {
  GET_PRODUCTS,
  GET_ASSET_INFO_TYPES,
  GET_PRODUCT,
} from "@/graphql/queries";
import { GetProductsFilter } from "@/types";
import { AssetInfoType, AssetType } from "@/types/category";
import { Product } from "@/types/product";

interface ProductStore {
  products: Product[];
  product: Product | null;
  loading: boolean;
  initialized?: boolean;
  error: string | null;
  categories: AssetInfoType[];

  // Methods with more precise typing
  setInitialized: (initialized: boolean) => void;
  fetchProducts: (filter?: GetProductsFilter) => Promise<void>;
  fetchProduct: (getProductId: string) => Promise<boolean>;
  fetchCategories: (assetType: AssetType) => Promise<boolean>;
  resetError: () => void;

  // New method to prevent unnecessary refetches
  shouldFetchProducts: (filter?: GetProductsFilter) => boolean;
  shouldFetchProduct: (getProductId: string) => boolean;
}

const MAX_RETRIES = 2;
const RETRY_DELAY = 1000; // ms

const useProductStore = create<ProductStore>()(
  persist(
    (set, get) => ({
      products: [],
      product: null,
      loading: false,
      initialized: false,
      error: null,
      categories: [],

      // Prevent unnecessary refetches
      shouldFetchProducts: (filter = {}) => {
        const { products, initialized } = get();

        // If no products or not initialized, fetch
        if (!initialized || products.length === 0) return true;

        // Add more granular conditions if needed
        // For example, check if the filter has changed
        return false;
      },

      shouldFetchProduct: (getProductId) => {
        const { product } = get();

        // If no current product or product ID differs
        return !product || product.id !== getProductId;
      },

      setInitialized: (initialized) => {
        set((state) =>
          // Only update if the value is different
          state.initialized !== initialized ? { initialized } : {}
        );
      },

      resetError: () => {
        set((state) =>
          // Only update if there's an existing error
          state.error ? { error: null } : {}
        );
      },

      fetchProducts: async (filter = {}) => {
        // Check if fetch is necessary
        if (!get().shouldFetchProducts(filter)) {
          return;
        }

        try {
          set({ loading: true, error: null });
          const response = await client.query({
            query: GET_PRODUCTS,
            variables: { input: filter },
          });

          if (response.errors) {
            console.error("GraphQL Errors:", response.errors);
            throw new Error(response.errors[0]?.message || "GraphQL error");
          }

          const fetchedProducts = response?.data.getProducts || [];

          if (!fetchedProducts) {
            console.warn("No producst found!");
            set({ products: [], initialized: true });
            return;
          }

          set({ products: fetchedProducts, initialized: true });
        } catch (error) {
          console.error("Error fetching products:", error);
          set({
            error: error instanceof Error ? error.message : "Unknown error",
          });
        } finally {
          set({ loading: false });
        }
      },

      fetchProduct: async (getProductId, retries = MAX_RETRIES) => {
        // Check if fetch is necessary
        if (!get().shouldFetchProduct(getProductId)) {
          return true;
        }

        try {
          set({ loading: true, error: null });
          const { data } = await client.query({
            query: GET_PRODUCT,
            variables: { getProductId },
          });

          set((state) => {
            // Only update if the fetched product is different
            const newProduct = data.getProduct;
            const productChanged =
              JSON.stringify(state.product) !== JSON.stringify(newProduct);

            return productChanged
              ? {
                  product: newProduct,
                  initialized: true,
                  loading: false,
                }
              : { loading: false };
          });

          return true;
        } catch (error) {
          console.error("Error fetching product:", error);

          if (retries > 0) {
            await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
            return get().fetchProduct(getProductId);
          }

          set({
            error: error instanceof Error ? error.message : "Unknown error",
            loading: false,
          });
          return false;
        }
      },

      fetchCategories: async (assetType, retries = MAX_RETRIES) => {
        try {
          set({ loading: true, error: null });
          const { data } = await client.query({
            query: GET_ASSET_INFO_TYPES,
            variables: { assetType },
          });

          set((state) => {
            // Only update if the fetched categories are different
            const newCategories = data.getAssetInfoTypes;
            const categoriesChanged =
              JSON.stringify(state.categories) !==
              JSON.stringify(newCategories);

            return categoriesChanged
              ? {
                  categories: newCategories,
                  loading: false,
                }
              : { loading: false };
          });

          return true;
        } catch (error) {
          console.error("Error fetching categories:", error);

          if (retries > 0) {
            await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
            return get().fetchCategories(assetType);
          }

          set({
            error: error instanceof Error ? error.message : "Unknown error",
            loading: false,
          });
          return false;
        }
      },
    }),
    {
      name: "product-storage",
      partialize: (state) => ({
        products: state.products,
        initialized: state.initialized,
      }),
    }
  )
);

export default useProductStore;
