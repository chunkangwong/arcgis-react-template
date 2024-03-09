import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type State = {
  sidebarOpen: boolean;
  searchDialogOpen: boolean;
};

type Actions = {
  toggleSidebar: () => void;
  setSearchDialogOpen: (open: boolean) => void;
};

export const useLayoutStore = create<State & Actions>()(
  immer((set) => ({
    sidebarOpen: false,
    searchDialogOpen: false,
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
