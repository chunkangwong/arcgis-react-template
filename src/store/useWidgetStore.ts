import { create } from "zustand";

import widgetsConfig from "@/config/widgets.config.json";

type Widget = {
  title: string;
  id: string;
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
