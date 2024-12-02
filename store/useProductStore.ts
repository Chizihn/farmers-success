"use client";
import {
  GET_PRODUCTS,
  GET_ASSET_INFO_TYPES,
  GET_PRODUCT,
} from "@/graphql/queries";
import client from "@/lib/apolloClient";
import { GetProductsFilter } from "@/types";
import { AssetInfoType, AssetType } from "@/types/category";
import { Product } from "@/types/product";
import { create } from "zustand";

interface ProductStore {
  products: Product[];
  product: Product | null;
  loading: boolean;
  initialized?: boolean;
  error: Error | null;
  categories: AssetInfoType[];
  setInitialized?: (initialized: boolean) => void;
  fetchProducts: (filter?: GetProductsFilter) => Promise<void>;
  fetchProduct: (getProductId: string) => Promise<void>;
  fetchCategories: (assetType: AssetType) => Promise<void>;
}

const useProductStore = create<ProductStore>()((set) => ({
  products: [],
  product: null,
  loading: false,
  initialized: false,
  error: null,
  categories: [],

  setInitialized: (initialized) => {
    set({ initialized });
  },

  fetchProducts: async (filter = {}) => {
    try {
      set({ loading: true, error: null });
      const { data } = await client.query({
        query: GET_PRODUCTS,
        variables: { input: filter },
      });
      set({ products: data.getProducts, initialized: true });
    } catch (error) {
      console.error("Error fetching products:", error);
      set({ error: error as Error });
    } finally {
      set({ loading: false });
    }
  },

  fetchProduct: async (getProductId: string) => {
    set({ loading: true, initialized: false, error: null });
    try {
      const { data } = await client.query({
        query: GET_PRODUCT,
        variables: { getProductId },
      });
      set({ product: data.getProduct, initialized: true });
    } catch (error) {
      console.error("Error fetching product:", error);
      set({ error: error as Error });
    } finally {
      set({ loading: false });
    }
  },

  fetchCategories: async (assetType: AssetType) => {
    try {
      set({ loading: true, error: null });
      const { data } = await client.query({
        query: GET_ASSET_INFO_TYPES,
        variables: { assetType },
      });
      set({ categories: data.getAssetInfoTypes, loading: false });
    } catch (error) {
      console.error("Error fetching categories:", error);
      set({ error: error as Error, loading: false });
    }
  },
}));

export default useProductStore;
