import { selectActiveWidgets, useWidgetStore } from "@/store/useWidgetStore";
import { SidebarButton } from "./SidebarButton";
import { SidebarOpenCloseButton } from "./SidebarOpenCloseButton";

export const Sidebar = () => {
  const activeWidgets = useWidgetStore(selectActiveWidgets);

  return (
    <div className="z-10 flex h-full w-16 flex-col gap-y-4 border-r-2 bg-gray-100 p-4">
      <SidebarOpenCloseButton />
      {activeWidgets.map((widget, index) => (
        <SidebarButton
          key={widget.id}
          index={index}
          widgetId={widget.id}
          title={widget.title}
        />
      ))}
    </div>
  );
};
