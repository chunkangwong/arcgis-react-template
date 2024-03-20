import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { Tab } from "./useSearchDialogStore";

type RecentItem = {
  id: string;
  title: string;
  type: Tab;
};

type State = {
  recentItems: RecentItem[];
};

type Actions = {
  addRecentItem: (recentItem: RecentItem) => void;
  removeRecentItem: (id: string) => void;
};

const MAXIMUM_RECENT_ITEMS = 5;

export const useRecentStore = create<State & Actions>()(
  persist(
    immer((set) => ({
      recentItems: [],
      addRecentItem: (id) =>
        set((state) => {
          state.recentItems = state.recentItems.filter(
            (item) => item.id !== id.id,
          );
          state.recentItems.unshift(id);
          if (state.recentItems.length > MAXIMUM_RECENT_ITEMS) {
            state.recentItems.pop();
          }
        }),
      removeRecentItem: (id) =>
        set((state) => {
          state.recentItems = state.recentItems.filter(
            (item) => item.id !== id,
          );
        }),
    })),
    {
      name: "recent",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
