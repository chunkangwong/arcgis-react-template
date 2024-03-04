import { X } from "lucide-react";
import { Button } from "./ui/button";
import { useWidgetStore } from "@/store/useWidgetStore";

interface WidgetSidebarButtonProps {
  widgetId: string;
  title: string;
}

export const WidgetSidebarButton = ({
  title,
  widgetId,
}: WidgetSidebarButtonProps) => {
  const dockWidget = useWidgetStore((state) => state.dockWidget);
  const deactivateWidget = useWidgetStore((state) => state.deactivateWidget);

  const handleClick = () => {
    dockWidget(widgetId);
  };

  const handleXClick = () => {
    deactivateWidget(widgetId);
  };

  return (
    <Button
      className="group relative h-8 w-8 text-xs capitalize"
      onClick={handleClick}
    >
      <X
        className="absolute -right-2 -top-2 h-4 w-4 cursor-pointer rounded-full bg-red-500 text-white opacity-0 transition-opacity group-hover:opacity-100"
        onClick={handleXClick}
      />
      {title
        .split(" ")
        .map((word) => word[0])
        .join("")}
    </Button>
  );
};
