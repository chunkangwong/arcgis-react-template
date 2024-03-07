import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type State = {
  sidebarOpen: boolean;
};

type Actions = {
  openSidebar: () => void;
  closeSidebar: () => void;
  toggleSidebar: () => void;
};

export const useLayoutStore = create<State & Actions>()(
  immer((set) => ({
    sidebarOpen: false,
    openSidebar: () =>
      set((state) => {
        state.sidebarOpen = true;
      }),
    closeSidebar: () =>
      set((state) => {
        state.sidebarOpen = false;
      }),
    toggleSidebar: () =>
      set((state) => {
        state.sidebarOpen = !state.sidebarOpen;
      }),
  })),
);
