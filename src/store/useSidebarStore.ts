import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type State = {
  sidebarOpen: boolean;
};

type Actions = {
  toggleSidebar: () => void;
  openSidebar: () => void;
};

export const useSidebarStore = create<State & Actions>()(
  immer((set) => ({
    sidebarOpen: false,
    toggleSidebar: () =>
      set((state) => {
        state.sidebarOpen = !state.sidebarOpen;
      }),
    openSidebar: () =>
      set((state) => {
        state.sidebarOpen = true;
      }),
  })),
);
