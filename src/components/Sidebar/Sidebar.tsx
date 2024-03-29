import { useEffect } from "react";

import { useBreakpoint } from "@/hooks/useBreakpoint";
import { useSidebarStore } from "@/store/useSidebarStore";
import { selectActiveWidgets, useWidgetStore } from "@/store/useWidgetStore";
import { DarkModeToggleButton } from "./DarkModeToggleButton";
import { LanguageButton } from "./LanguageButton";
import { ProfileButton } from "./ProfileButton";
import { SidebarButton } from "./SidebarButton";
import { SidebarToggleButton } from "./SidebarToggleButton";

export const Sidebar = () => {
  const activeWidgets = useWidgetStore(selectActiveWidgets);
  const closeSidebar = useSidebarStore((state) => state.closeSidebar);
  const matches = useBreakpoint("md");
  const side = matches ? "right" : "top";

  useEffect(() => {
    if (activeWidgets.length === 0) {
      closeSidebar();
    }
  }, [activeWidgets]);

  return (
    <nav className="z-10 flex h-16 w-full flex-row md:flex-col md:h-full md:w-16 gap-4 md:border-r-2 bg-background p-4 justify-center">
      <SidebarToggleButton side={side} />
      {activeWidgets.map((widget, index) => (
        <SidebarButton
          key={widget.id}
          index={index}
          widgetId={widget.id}
          title={widget.title}
          side={side}
        />
      ))}
      <div className="flex md:flex-col ml-auto md:mt-auto gap-4">
        <LanguageButton side={side} />
        <DarkModeToggleButton side={side} />
        <ProfileButton side={side} />
      </div>
    </nav>
  );
};
