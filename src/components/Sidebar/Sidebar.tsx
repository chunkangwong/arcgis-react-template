import { useEffect } from "react";

import { useSidebarStore } from "@/store/useSidebarStore";
import { selectActiveWidgets, useWidgetStore } from "@/store/useWidgetStore";
import { DarkModeToggleButton } from "./DarkModeToggleButton";
import { ProfileButton } from "./ProfileButton";
import { SidebarButton } from "./SidebarButton";
import { SidebarToggleButton } from "./SidebarToggleButton";

export const Sidebar = () => {
  const activeWidgets = useWidgetStore(selectActiveWidgets);
  const closeSidebar = useSidebarStore((state) => state.closeSidebar);

  useEffect(() => {
    if (activeWidgets.length === 0) {
      closeSidebar();
    }
  }, [activeWidgets]);

  return (
    <div className="z-10 flex h-16 w-full flex-row md:flex-col md:h-full md:w-16 gap-4 md:border-r-2 bg-gray-100 p-4 justify-center">
      <SidebarToggleButton />
      {activeWidgets.map((widget, index) => (
        <SidebarButton
          key={widget.id}
          index={index}
          widgetId={widget.id}
          title={widget.title}
        />
      ))}
      <DarkModeToggleButton />
      <ProfileButton />
    </div>
  );
};
