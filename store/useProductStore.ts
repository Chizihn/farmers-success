import { create } from "zustand";
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
  setInitialized: (initialized: boolean) => void;
  fetchProducts: (filter?: GetProductsFilter) => Promise<boolean>;
  fetchProduct: (getProductId: string) => Promise<boolean>;
  fetchCategories: (assetType: AssetType) => Promise<boolean>;
  resetError: () => void;
}

const MAX_RETRIES = 2;
const RETRY_DELAY = 1000; // ms

const useProductStore = create<ProductStore>()((set, get) => ({
  products: [],
  product: null,
  loading: false,
  initialized: false,
  error: null,
  categories: [],

  setInitialized: (initialized) => {
    set({ initialized });
  },

  resetError: () => {
    set({ error: null });
  },

  fetchProducts: async (filter = {}, retries = MAX_RETRIES) => {
    try {
      set({ loading: true, error: null });
      const { data } = await client.query({
        query: GET_PRODUCTS,
        variables: { input: filter },
      });
      set({
        products: data.getProducts,
        initialized: true,
        loading: false,
      });
      return true;
    } catch (error) {
      console.error("Error fetching products:", error);

      if (retries > 0) {
        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
        return get().fetchProducts(filter);
      }

      set({
        error: error instanceof Error ? error.message : "Unknown error",
        loading: false,
      });
      return false;
    }
  },

  fetchProduct: async (getProductId, retries = MAX_RETRIES) => {
    try {
      set({ loading: true, initialized: false, error: null });
      const { data } = await client.query({
        query: GET_PRODUCT,
        variables: { getProductId },
      });
      set({
        product: data.getProduct,
        initialized: true,
        loading: false,
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
      set({
        categories: data.getAssetInfoTypes,
        loading: false,
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
}));

export default useProductStore;
