import { selectActiveWidgets, useWidgetStore } from "@/store/useWidgetStore";
import { ProfileButton } from "./ProfileButton";
import { SidebarButton } from "./SidebarButton";
import { SidebarToggleButton } from "./SidebarToggleButton";

export const Sidebar = () => {
  const activeWidgets = useWidgetStore(selectActiveWidgets);

  return (
    <div className="z-10 flex h-full w-16 flex-col gap-y-4 border-r-2 bg-gray-100 p-4">
      <SidebarToggleButton />
      {activeWidgets.map((widget, index) => (
        <SidebarButton
          key={widget.id}
          index={index}
          widgetId={widget.id}
          title={widget.title}
        />
      ))}
      <ProfileButton />
    </div>
  );
};
