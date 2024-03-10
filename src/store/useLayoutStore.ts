import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type State = {
  sidebarOpen: boolean;
  searchDialogOpen: boolean;
  profileDialogOpen: boolean;
};

type Actions = {
  toggleSidebar: () => void;
  openSidebar: () => void;
  setSearchDialogOpen: (open: boolean) => void;
  setProfileDialogOpen: (open: boolean) => void;
};

export const useLayoutStore = create<State & Actions>()(
  immer((set) => ({
    sidebarOpen: false,
    searchDialogOpen: false,
    profileDialogOpen: false,
    toggleSidebar: () =>
      set((state) => {
        state.sidebarOpen = !state.sidebarOpen;
      }),
    openSidebar: () =>
      set((state) => {
        state.sidebarOpen = true;
      }),
    setSearchDialogOpen: (open) =>
      set((state) => {
        state.searchDialogOpen = open;
      }),
    setProfileDialogOpen: (open) =>
      set((state) => {
        state.profileDialogOpen = open;
      }),
  })),
);
