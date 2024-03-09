import { X } from "lucide-react";

import { cn } from "@/lib/utils";
import { useLayoutStore } from "@/store/useLayoutStore";
import {
  selectActiveWidgets,
  selectDockedWidget,
  useWidgetStore,
} from "@/store/useWidgetStore";
import { SearchButton } from "../SearchButton";
import { Tooltip } from "../Tooltip";
import { Button } from "../ui/button";
import { WidgetRenderer } from "./WidgetRenderer";

export const WidgetPanel = () => {
  const dockedWidget = useWidgetStore(selectDockedWidget);
  const activeWidgets = useWidgetStore(selectActiveWidgets);
  const deactivateWidget = useWidgetStore((state) => state.deactivateWidget);
  const sidebarOpen = useLayoutStore((state) => state.sidebarOpen);

  const handleXClick = () => {
    if (dockedWidget) {
      deactivateWidget(dockedWidget.id);
    }
  };

  return (
    <div
      className={cn(
        "flex h-full w-[32rem] transform flex-col gap-y-4 overflow-y-auto bg-gray-100 p-4 transition-transform duration-500",
        sidebarOpen ? "translate-x-0" : "-translate-x-full",
      )}
    >
      <SearchButton fullWidth />
      <div className="group flex items-center justify-between border-b-2">
        <p className="text-2xl">{dockedWidget?.title}</p>
        <Tooltip title="Close" side="right">
          <Button variant="ghost" size="icon" onClick={handleXClick}>
            <X className="h-8 w-8 text-red-400 opacity-0 transition-opacity group-hover:opacity-100" />
          </Button>
        </Tooltip>
      </div>
      {activeWidgets.map((widget) => (
        <div hidden={widget.id !== dockedWidget?.id} key={widget.id}>
          <WidgetRenderer widgetId={widget.id} />
        </div>
      ))}
    </div>
  );
};
