import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import widgetsConfig from "@/config/widgets.config.json";

type Widget = {
  title: string;
  id: string;
  description: string;
  active: boolean;
};

type State = {
  widgets: Record<string, Widget>;
  dockedWidgetId: string | null;
};

type Actions = {
  activateWidget: (id: string) => void;
  deactivateWidget: (id: string) => void;
  dockWidget: (id: string) => void;
};

export const useWidgetStore = create<State & Actions>()(
  immer((set) => ({
    widgets: widgetsConfig.reduce(
      (acc, widget) => {
        acc[widget.id] = {
          title: widget.title,
          id: widget.id,
          description: widget.description,
          active: false,
        };
        return acc;
      },
      {} as Record<string, Widget>,
    ),
    dockedWidgetId: "",
    activateWidget: (id: string) =>
      set((state) => {
        state.widgets[id].active = true;
        state.dockedWidgetId = id;
      }),
    deactivateWidget: (id: string) =>
      set((state) => {
        state.widgets[id].active = false;
        for (const widget of Object.values(state.widgets)) {
          if (widget.active) {
            state.dockedWidgetId = widget.id;
            return;
          }
        }
        state.dockedWidgetId = null;
      }),
    dockWidget: (id: string) =>
      set((state) => {
        state.dockedWidgetId = id;
      }),
  })),
);

export const selectActiveWidgets = (state: State) =>
  Object.values(state.widgets).filter((widget) => widget.active);

export const selectDockedWidget = (state: State) =>
  state.dockedWidgetId ? state.widgets[state.dockedWidgetId] : null;

export const selectWidgetsBySearchTerm = (state: State, searchTerm: string) => {
  const widgets = Object.values(state.widgets).map((widget) => ({
    label: widget.title,
    value: widget.id,
    description: widget.description,
  }));
  if (!searchTerm) {
    return widgets;
  }
  return widgets.filter((widget) =>
    widget.label.toLowerCase().includes(searchTerm.toLowerCase()),
  );
};
