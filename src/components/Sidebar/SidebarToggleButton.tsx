import { ChevronsLeft } from "lucide-react";

import { cn } from "@/lib/utils";
import { useLayoutStore } from "@/store/useLayoutStore";
import { selectActiveWidgets, useWidgetStore } from "@/store/useWidgetStore";
import { Tooltip } from "../Tooltip";
import { Button } from "../ui/button";
import { SidebarToggleButtonTooltipTitle } from "./SidebarToggleButtonTooltipTitle";

export const SidebarToggleButton = () => {
  const sidebarOpen = useLayoutStore((state) => state.sidebarOpen);
  const toggleSidebar = useLayoutStore((state) => state.toggleSidebar);
  const activeWidgets = useWidgetStore(selectActiveWidgets);

  const handleClick = () => {
    toggleSidebar();
  };

  return (
    <Tooltip title={<SidebarToggleButtonTooltipTitle />} side="right">
      <Button
        className={cn(
          "h-8 w-8 opacity-0 transition-opacity duration-300 rotate-90 md:rotate-0",
          activeWidgets.length > 0 && "opacity-100",
        )}
        size="icon"
        onClick={handleClick}
      >
        <ChevronsLeft
          className={cn(
            "h-4 w-4 transition-transform duration-300",
            sidebarOpen && "rotate-180 transform",
          )}
        />
      </Button>
    </Tooltip>
  );
};
