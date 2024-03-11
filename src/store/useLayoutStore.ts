import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type State = {
  sidebarOpen: boolean;
  profileDialogOpen: boolean;
};

type Actions = {
  toggleSidebar: () => void;
  openSidebar: () => void;
  setProfileDialogOpen: (open: boolean) => void;
};

export const useLayoutStore = create<State & Actions>()(
  immer((set) => ({
    sidebarOpen: false,
    profileDialogOpen: false,
    toggleSidebar: () =>
      set((state) => {
        state.sidebarOpen = !state.sidebarOpen;
      }),
    openSidebar: () =>
      set((state) => {
        state.sidebarOpen = true;
      }),
    setProfileDialogOpen: (open) =>
      set((state) => {
        state.profileDialogOpen = open;
      }),
  })),
);
