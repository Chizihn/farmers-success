import { create } from "zustand";

interface CheckoutModalState {
  isCheckoutModalOpen: boolean;
  openCheckoutModal: () => void;
  closeCheckoutModal: () => void;
}

export const useCheckoutModalStore = create<CheckoutModalState>()((set) => ({
  isCheckoutModalOpen: false,
  openCheckoutModal: () => {
    set({ isCheckoutModalOpen: true });
  },
  closeCheckoutModal: () => {
    set({ isCheckoutModalOpen: false });
  },
}));

export default useCheckoutModalStore;
