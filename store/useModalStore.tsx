import { create } from "zustand";

interface ModalState {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;

  isCheckoutModalOpen: boolean;
  openCheckoutModal: () => void;
  closeCheckoutModal: () => void;

  isPaymentSuccess: boolean;
  openPaymentSuccess: () => void;
  closePaymentSuccess: () => void;

  isPaymentFailure: boolean;
  openPaymentFailure: () => void;
  closePaymentFailure: () => void;
}

export const useModalStore = create<ModalState>()((set) => ({
  isModalOpen: false,
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),

  isCheckoutModalOpen: false,
  openCheckoutModal: () => set({ isCheckoutModalOpen: true }),
  closeCheckoutModal: () => set({ isCheckoutModalOpen: false }),

  isPaymentSuccess: false,
  openPaymentSuccess: () => set({ isPaymentSuccess: true }),
  closePaymentSuccess: () => set({ isPaymentSuccess: false }),

  isPaymentFailure: false,
  openPaymentFailure: () => set({ isPaymentFailure: true }),
  closePaymentFailure: () => set({ isPaymentFailure: false }),
}));

export default useModalStore;
