import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import widgetsConfig from "@/config/widgets.config.json";

type State = {
  activeWidgetIds: string[];
  dockedWidgetId: string | null;
};

type Actions = {
  activateWidget: (id: string) => void;
  deactivateWidget: (id: string) => void;
  dockWidget: (index: number) => void;
};

type Widget = (typeof widgetsConfig)[number];

const widgets = widgetsConfig.reduce(
  (acc, curr) => ({
    ...acc,
    [curr.id]: curr,
  }),
  {} as Record<string, Widget>,
);

export const useWidgetStore = create<State & Actions>()(
  immer((set) => ({
    activeWidgetIds: [],
    dockedWidgetId: null,
    activateWidget: (id: string) =>
      set((state) => {
        if (state.activeWidgetIds.includes(id)) return;
        state.activeWidgetIds.push(id);
        state.dockedWidgetId = id;
      }),
    deactivateWidget: (id: string) =>
      set((state) => {
        state.activeWidgetIds = state.activeWidgetIds.filter(
          (activeId) => activeId !== id,
        );
        if (state.dockedWidgetId !== id) return;
        if (state.activeWidgetIds.length > 0) {
          state.dockedWidgetId = state.activeWidgetIds[0];
        } else {
          state.dockedWidgetId = null;
        }
      }),
    dockWidget: (index: number) =>
      set((state) => {
        const id = state.activeWidgetIds[index];
        if (id) {
          state.dockedWidgetId = id;
        }
      }),
  })),
);

export const selectActiveWidgets = (state: State) =>
  state.activeWidgetIds.filter(Boolean).map((id) => widgets[id]); // BUG: filter(Boolean) is needed when deactivating widget from SidebarButton

export const selectDockedWidget = (state: State) =>
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
