import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import widgetsConfig from "@/config/widgets.config.json";

interface WidgetStore {
  activeWidgetIds: string[];
  dockedWidgetId: string | null;
  activateWidget: (id: string) => void;
  deactivateWidget: (id: string) => void;
  dockWidget: (index: number) => void;
}

type Widget = (typeof widgetsConfig)[number];

const widgets = widgetsConfig.reduce(
  (acc, curr) => ({
    ...acc,
    [curr.id]: curr,
  }),
  {} as Record<string, Widget>,
);

const url = new URL(window.location.href);
const searchParams = new URLSearchParams(url.search);
const activeWidgetIds = searchParams.getAll("aw");
const dockedWidgetId = searchParams.get("dw");

export const useWidgetStore = create<WidgetStore>()(
  immer((set) => ({
    activeWidgetIds: activeWidgetIds,
    dockedWidgetId: dockedWidgetId,
    activateWidget: (id: string) =>
      set((state) => {
        if (state.activeWidgetIds.includes(id)) return;
        state.activeWidgetIds.push(id);
        state.dockedWidgetId = id;

        const url = new URL(window.location.href);
        const searchParams = new URLSearchParams(url.search);
        searchParams.append("aw", id);
        searchParams.set("dw", id);
        window.history.replaceState(null, "", `?${searchParams.toString()}`);
      }),
    deactivateWidget: (id: string) =>
      set((state) => {
        const url = new URL(window.location.href);
        const searchParams = new URLSearchParams(url.search);

        state.activeWidgetIds = state.activeWidgetIds.filter(
          (activeId) => activeId !== id,
        );
        searchParams.delete("aw", id);
        if (state.dockedWidgetId !== id) return;
        if (state.activeWidgetIds.length > 0) {
          state.dockedWidgetId = state.activeWidgetIds[0];
          searchParams.set("dw", state.dockedWidgetId);
        } else {
          state.dockedWidgetId = null;
          searchParams.delete("dw");
        }
        window.history.replaceState(null, "", `?${searchParams.toString()}`);
      }),
    dockWidget: (index: number) =>
      set((state) => {
        const id = state.activeWidgetIds[index];
        if (id) {
          state.dockedWidgetId = id;

          const url = new URL(window.location.href);
          const searchParams = new URLSearchParams(url.search);
          searchParams.set("dw", id);
          window.history.replaceState(null, "", `?${searchParams.toString()}`);
        }
      }),
  })),
);

export const selectActiveWidgets = (state: WidgetStore) =>
  state.activeWidgetIds.filter(Boolean).map((id) => widgets[id]); // BUG: filter(Boolean) is needed when deactivating widget from SidebarButton

export const selectDockedWidget = (state: WidgetStore) =>
  state.dockedWidgetId ? widgets[state.dockedWidgetId] ?? null : null;

export const selectWidgetsBySearchTerm = (searchTerm: string) => {
  let widgets = widgetsConfig;
  if (searchTerm) {
    widgets = widgets.filter((widget) =>
      widget.title.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }
  return widgets.map((widget) => ({
    label: widget.title,
    value: widget.id,
    description: widget.description,
  }));
};
