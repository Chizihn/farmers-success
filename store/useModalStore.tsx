<<<<<<< HEAD
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface ModalState {
  isModalOpen: boolean;
=======
"use client";

import { create } from "zustand";

interface ModalState {
  isOpen: boolean;
>>>>>>> b95be22edf50a55697986b04c5c99be73de60731
  openModal: () => void;
  closeModal: () => void;
}

<<<<<<< HEAD
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
=======
export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));
>>>>>>> b95be22edf50a55697986b04c5c99be73de60731

export default useModalStore;
