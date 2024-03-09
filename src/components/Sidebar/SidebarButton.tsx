import { X } from "lucide-react";

import { useWidgetStore } from "@/store/useWidgetStore";
import { Tooltip } from "../Tooltip";
import { Button } from "../ui/button";

interface SidebarButtonProps {
  widgetId: string;
  title: string;
  index: number;
}

export const SidebarButton = ({
  title,
  widgetId,
  index,
}: SidebarButtonProps) => {
  const dockWidget = useWidgetStore((state) => state.dockWidget);
  const deactivateWidget = useWidgetStore((state) => state.deactivateWidget);

  const handleClick = () => {
    dockWidget(index);
  };

  const handleXClick = () => {
    deactivateWidget(widgetId);
  };

  return (
    <Tooltip title={title} side="right">
      <Button
        className="group relative h-8 w-8 text-xs capitalize"
        onClick={handleClick}
      >
        <X
          className="absolute -left-2 -top-2 h-4 w-4 cursor-pointer rounded-full bg-red-400 text-white opacity-0 transition-opacity group-hover:opacity-100"
          onClick={handleXClick}
        />
        {title
          .split(" ")
          .map((word) => word[0])
          .join("")}
      </Button>
    </Tooltip>
  );
};
