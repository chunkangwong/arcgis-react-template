import { Settings } from "lucide-react";

import { useWidgetStore } from "@/store/useWidgetStore";
import { SearchList } from "./SearchList";

export const WidgetList = () => {
  const widgetList = useWidgetStore((state) =>
    Object.values(state.widgets).map((widget) => ({
      label: widget.title,
      value: widget.id,
      description: widget.description,
    }))
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
