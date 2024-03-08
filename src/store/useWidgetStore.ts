import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import widgetsConfig from "@/config/widgets.config.json";

type State = {
  activeWidgetIds: string[];
};

type Actions = {
  activateWidget: (id: string) => void;
  deactivateWidget: (id: string) => void;
  dockWidget: (id: string) => void;
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
    activateWidget: (id: string) =>
      set((state) => {
        state.activeWidgetIds.push(id);
      }),
    deactivateWidget: (id: string) =>
      set((state) => {
        state.activeWidgetIds = state.activeWidgetIds.filter(
          (activeId) => activeId !== id,
        );
      }),
    dockWidget: (id: string) =>
      set((state) => {
        state.activeWidgetIds = state.activeWidgetIds.filter(
          (activeId) => activeId !== id,
        );
        state.activeWidgetIds.push(id);
      }),
  })),
);

export const selectActiveWidgets = (state: State) =>
  state.activeWidgetIds.map((id) => widgets[id]);

export const selectDockedWidget = (state: State) =>
  state.activeWidgetIds.length > 0
    ? widgets[state.activeWidgetIds[state.activeWidgetIds.length - 1]]
    : null;

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
