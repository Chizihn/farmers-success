import { create } from "zustand";

interface ModalState {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;

  isCheckoutModalOpen: boolean;
  openCheckoutModal: () => void;
  closeCheckoutModal: () => void;
}

export const useModalStore = create<ModalState>()((set) => ({
  isModalOpen: false,

  openModal: () => {
    set({ isModalOpen: true });
  },
  closeModal: () => {
    set({ isModalOpen: false });
  },

  isCheckoutModalOpen: false,
  openCheckoutModal: () => {
    set({ isCheckoutModalOpen: true });
  },
  closeCheckoutModal: () => {
    set({ isCheckoutModalOpen: false });
  },
}));

export default useModalStore;
