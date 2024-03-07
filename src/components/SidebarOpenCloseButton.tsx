import { ChevronsLeft } from "lucide-react";

import { cn } from "@/lib/utils";
import { useLayoutStore } from "@/store/useLayoutStore";
import { Tooltip } from "./Tooltip";
import { Button } from "./ui/button";

export const SidebarOpenCloseButton = () => {
  const sidebarOpen = useLayoutStore((state) => state.sidebarOpen);
  const toggleSidebar = useLayoutStore((state) => state.toggleSidebar);

  const handleClick = () => {
    toggleSidebar();
  };

  return (
    <Tooltip title={sidebarOpen ? "Close" : "Open"} side="right">
      <Button className="h-8 w-8" size="icon" onClick={handleClick}>
        <ChevronsLeft
          className={cn(
            "h-4 w-4 transition-transform duration-500",
            sidebarOpen ? "rotate-180 transform" : "",
          )}
        />
      </Button>
    </Tooltip>
  );
};
