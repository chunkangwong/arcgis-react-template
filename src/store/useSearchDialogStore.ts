import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export type Tab = "places" | "portalItems" | "widgets";

type State = {
  open: boolean;
  tab: Tab;
};

type Actions = {
  setSearchDialogOpen: (open: boolean) => void;
  setSearchDialog: ({ open, tab }: { open?: boolean; tab?: Tab }) => void;
};

export const useSearchDialogStore = create<State & Actions>()(
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
