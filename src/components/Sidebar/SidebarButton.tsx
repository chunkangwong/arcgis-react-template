import { X } from "lucide-react";

import { useSidebarStore } from "@/store/useSidebarStore";
import { useWidgetStore } from "@/store/useWidgetStore";
import { Tooltip } from "../Tooltip";
import { MotionButton } from "../ui/button";

interface SidebarButtonProps {
  widgetId: string;
  title: string;
  index: number;
  side: "top" | "right";
}

export const SidebarButton = ({
  title,
  widgetId,
  index,
  side,
}: SidebarButtonProps) => {
  const dockWidget = useWidgetStore((state) => state.dockWidget);
  const deactivateWidget = useWidgetStore((state) => state.deactivateWidget);
  const openSidebar = useSidebarStore((state) => state.openSidebar);

  const handleClick = () => {
    dockWidget(index);
    openSidebar();
  };

  const handleXClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    deactivateWidget(widgetId);
  };

  return (
    <Tooltip key={`SidebarButton-widget-${widgetId}`} title={title} side={side}>
      <MotionButton
        className="group relative h-8 w-8 text-xs capitalize"
        onClick={handleClick}
        layout
        layoutId={`SidebarButton-widget-${widgetId}`}
      >
        <X
          className="absolute -left-2 -top-2 h-4 w-4 cursor-pointer rounded-full bg-red-400 hover:bg-red-500 text-white opacity-0 group-hover:opacity-100 hover:scale-125 transition duration-300"
          onClick={handleXClick}
        />
        {title
          .split(" ")
          .map((word) => word[0])
          .join("")}
      </MotionButton>
    </Tooltip>
  );
};
