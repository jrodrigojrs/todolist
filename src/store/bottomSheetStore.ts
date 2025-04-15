import { create } from "zustand";

interface BottomSheetStore {
 isOpen: boolean;
 onOpen: () => void;
 onClose: () => void;
}

export const useBottomSheetStore = create<BottomSheetStore>((set) => ({
 isOpen: false,
 onOpen: () => set({ isOpen: true }),
 onClose: () => set({ isOpen: false }), 
}))