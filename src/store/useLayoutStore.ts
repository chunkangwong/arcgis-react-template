import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type State = {
  sidebarOpen: boolean;
  searchDialogOpen: boolean;
};

type Actions = {
  openSidebar: () => void;
  closeSidebar: () => void;
  toggleSidebar: () => void;
  setSearchDialogOpen: (open: boolean) => void;
};

export const useLayoutStore = create<State & Actions>()(
  immer((set) => ({
    sidebarOpen: false,
    searchDialogOpen: false,
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
    setSearchDialogOpen: (open) =>
      set((state) => {
        state.searchDialogOpen = open;
      }),
  })),
);
