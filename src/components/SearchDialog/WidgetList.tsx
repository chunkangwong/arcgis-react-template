import { Settings } from "lucide-react";

import {
  selectWidgetsBySearchTerm,
  useWidgetStore,
} from "@/store/useWidgetStore";
import { useMemo } from "react";
import { SearchList } from "./SearchList";

interface WidgetListProps {
  searchTerm: string;
  onClose: () => void;
}

export const WidgetList = ({ searchTerm, onClose }: WidgetListProps) => {
  const widgetList = useMemo(
    () => selectWidgetsBySearchTerm(searchTerm),
    [searchTerm],
  );
  const activateWidget = useWidgetStore((state) => state.activateWidget);

  const handleSelect = (widgetId: string) => {
    activateWidget(widgetId);
    onClose();
  };

  return (
    <SearchList
      icon={Settings}
      searchList={widgetList}
      onSelect={handleSelect}
      emptyText="No widgets found"
    />
  );
};
