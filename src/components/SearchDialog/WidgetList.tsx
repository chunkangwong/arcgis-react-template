import { Component } from "lucide-react";
import { useMemo } from "react";

import { useLayoutStore } from "@/store/useLayoutStore";
import { useSearchDialogStore } from "@/store/useSearchDialogStore";
import {
  selectWidgetsBySearchTerm,
  useWidgetStore,
} from "@/store/useWidgetStore";
import { SearchList } from "./SearchList";

interface WidgetListProps {
  searchTerm: string;
}

export const WidgetList = ({ searchTerm }: WidgetListProps) => {
  const widgetList = useMemo(
    () => selectWidgetsBySearchTerm(searchTerm),
    [searchTerm],
  );
  const activateWidget = useWidgetStore((state) => state.activateWidget);
  const openSidebar = useLayoutStore((state) => state.openSidebar);
  const setSearchDialogOpen = useSearchDialogStore(
    (state) => state.setSearchDialogOpen,
  );

  const handleSelect = (widgetId: string) => {
    activateWidget(widgetId);
    openSidebar();
    setSearchDialogOpen(false);
  };

  return (
    <SearchList
      icon={Component}
      searchList={widgetList}
      onSelect={handleSelect}
      emptyText="No widgets found"
    />
  );
};
