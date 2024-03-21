import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export type Tab = "places" | "portalItems" | "widgets";

interface SearchDialogStore {
  open: boolean;
  tab: Tab;
  setSearchDialogOpen: (open: boolean) => void;
  setSearchDialog: ({ open, tab }: { open?: boolean; tab?: Tab }) => void;
}

export const useSearchDialogStore = create<SearchDialogStore>()(
  immer((set) => ({
    open: false,
    tab: "places",
    setSearchDialogOpen: (open) =>
      set((state) => {
        state.open = open;
      }),
    setSearchDialog: ({ open, tab }) =>
      set((state) => {
        if (open !== undefined) {
          state.open = open;
        }
        if (tab !== undefined) {
          state.tab = tab;
        }
      }),
  })),
);
