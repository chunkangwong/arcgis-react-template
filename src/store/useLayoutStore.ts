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
  setSearchDialog: ({ open, tab }: { open?: boolean; tab?: Tab }) => void;
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
    setSearchDialog: ({ open, tab }) =>
      set((state) => {
        if (open !== undefined) {
          state.searchDialog.open = open;
        }
        if (tab !== undefined) {
          state.searchDialog.tab = tab;
        }
      }),
    setProfileDialogOpen: (open) =>
      set((state) => {
        state.profileDialogOpen = open;
      }),
  })),
);
