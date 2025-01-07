import { create } from "zustand";

interface MenuState {
  currentCategory: string;
  setCategory: (category: string) => void;
}

const useMenuStore = create<MenuState>((set) => ({
  currentCategory: "",
  setCategory: (currentCategory) => set({ currentCategory }),
}));

export default useMenuStore;
