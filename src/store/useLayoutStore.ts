import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export type Tab = "places" | "portalItems" | "widgets";

type State = {
  sidebarOpen: boolean;
  searchDialog: {
    open: boolean;
    tab: Tab;
  };
  profileDialogOpen: boolean;
};

type Actions = {
  toggleSidebar: () => void;
  openSidebar: () => void;
  setSearchDialogOpen: (open: boolean) => void;
  setSearchDialogTab: (tab: Tab) => void;
  setProfileDialogOpen: (open: boolean) => void;
};

export const useLayoutStore = create<State & Actions>()(
  immer((set) => ({
    sidebarOpen: false,
    searchDialog: {
      open: false,
      tab: "places",
    },
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
        state.searchDialog.open = open;
      }),
    setSearchDialogTab: (tab) =>
      set((state) => {
        state.searchDialog.tab = tab;
      }),
    setProfileDialogOpen: (open) =>
      set((state) => {
        state.profileDialogOpen = open;
      }),
  })),
);
