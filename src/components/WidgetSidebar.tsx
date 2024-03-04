import { selectActiveWidgets, useWidgetStore } from "@/store/useWidgetStore";
import { WidgetSidebarButton } from "./WidgetSidebarButton";

export const WidgetSidebar = () => {
  const activeWidgets = useWidgetStore(selectActiveWidgets);

  return (
    <div className="flex h-full w-16 flex-col gap-y-4 border-r-2 bg-gray-100 p-4">
      {activeWidgets.map((widget) => (
        <WidgetSidebarButton
          key={widget.id}
          widgetId={widget.id}
          title="Hello World"
        />
      ))}
    </div>
  );
};
