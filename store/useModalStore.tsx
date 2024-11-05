import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface ModalState {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>()(
  persist(
    (set) => ({
      isModalOpen: false,

      openModal: () => {
        set({ isModalOpen: true });
      },
      closeModal: () => {
        set({ isModalOpen: false });
      },
    }),
    {
      name: "modal-store",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useModalStore;
