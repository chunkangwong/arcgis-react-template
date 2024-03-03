import { Settings } from "lucide-react";

import {
  selectWidgetsBySearchTerm,
  useWidgetStore,
} from "@/store/useWidgetStore";
import { SearchList } from "./SearchList";

interface WidgetListProps {
  searchTerm: string;
}

export const WidgetList = ({ searchTerm }: WidgetListProps) => {
  const widgetList = useWidgetStore((state) =>
    selectWidgetsBySearchTerm(state, searchTerm)
  );
  const activateWidget = useWidgetStore((state) => state.activateWidget);

  const handleSelect = (widgetId: string) => {
    activateWidget(widgetId);
  };

  return (
    <SearchList
      emptyText="No widgets found"
      icon={Settings}
      searchList={widgetList}
      onSelect={handleSelect}
    />
  );
};
