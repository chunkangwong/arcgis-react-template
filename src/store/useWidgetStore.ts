import { create } from "zustand";

import widgetsConfig from "@/config/widgets.config.json";

type Widget = {
  title: string;
  id: string;
  description: string;
  active: boolean;
};

type State = {
  widgets: Record<string, Widget>;
};

type Actions = {
  activateWidget: (id: string) => void;
  deactivateWidget: (id: string) => void;
};

export const useWidgetStore = create<State & Actions>()((set) => ({
  widgets: widgetsConfig.reduce((acc, widget) => {
    acc[widget.id] = {
      title: widget.title,
      id: widget.id,
      description: widget.description,
      active: false,
    };
    return acc;
  }, {} as Record<string, Widget>),
  activateWidget: (id: string) =>
    set((state) => {
      state.widgets[id].active = true;
      return state;
    }),
  deactivateWidget: (id: string) =>
    set((state) => {
      state.widgets[id].active = false;
      return state;
    }),
}));

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
    widget.label.toLowerCase().includes(searchTerm.toLowerCase())
  );
};
