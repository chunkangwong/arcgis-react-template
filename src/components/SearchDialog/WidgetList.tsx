import { Component } from "lucide-react";
import { useMemo } from "react";

import { useRecentStore } from "@/store/useRecentStore";
import { useSearchDialogStore } from "@/store/useSearchDialogStore";
import { useSidebarStore } from "@/store/useSidebarStore";
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
  const openSidebar = useSidebarStore((state) => state.openSidebar);
  const setSearchDialogOpen = useSearchDialogStore(
    (state) => state.setSearchDialogOpen,
  );
  const addRecentItem = useRecentStore((state) => state.addRecentItem);

  const handleSelect = (widgetId: string, index: number) => {
    activateWidget(widgetId);
    addRecentItem({
      id: widgetId,
      title: widgetList[index].label,
      type: "widgets",
    });
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
