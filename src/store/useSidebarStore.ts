import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type State = {
  sidebarOpen: boolean;
};

type Actions = {
  toggleSidebar: () => void;
  openSidebar: () => void;
  closeSidebar: () => void;
};

const url = new URL(window.location.href);
const searchParams = new URLSearchParams(url.search);
const activeWidgetIds = searchParams.getAll("aw");
const dockedWidgetId = searchParams.get("dw");

const defaultSidebarOpen = Boolean(
  dockedWidgetId && activeWidgetIds.includes(dockedWidgetId),
);

export const useSidebarStore = create<State & Actions>()(
  immer((set) => ({
    sidebarOpen: defaultSidebarOpen,
    toggleSidebar: () =>
      set((state) => {
        state.sidebarOpen = !state.sidebarOpen;
      }),
    openSidebar: () =>
      set((state) => {
        state.sidebarOpen = true;
      }),
    closeSidebar: () =>
      set((state) => {
        state.sidebarOpen = false;
      }),
  })),
);
