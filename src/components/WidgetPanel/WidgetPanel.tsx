import { X } from "lucide-react";

import { cn } from "@/lib/utils";
import { useLayoutStore } from "@/store/useLayoutStore";
import {
  selectActiveWidgets,
  selectDockedWidget,
  useWidgetStore,
} from "@/store/useWidgetStore";
import { SearchButton } from "../SearchButton";
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
        "flex h-full w-full md:w-[32rem] transform transition-transform duration-300 flex-col gap-y-4 overflow-y-auto bg-gray-100 p-4",
        !sidebarOpen &&
          "hidden md:block translate-y-full translate-x-0 md:translate-y-0 md:-translate-x-full",
      )}
    >
      <SearchButton
        fullWidth
        label="Search for widget..."
        tabToOpen="widgets"
      />
      <div className="group flex items-center justify-between border-b-2">
        <p className="text-2xl">{dockedWidget?.title}</p>
        {dockedWidget && (
          <Button
            variant="ghost"
            size="icon"
            className="opacity-0 transition-opacity group-hover:opacity-100"
            onClick={handleXClick}
          >
            <X className="h-8 w-8 text-red-400 hover:text-red-500 transition-colors" />
          </Button>
        )}
      </div>
      {activeWidgets.length === 0 ? (
        <p className="text-center">No widget available</p>
      ) : (
        activeWidgets.map((widget) => (
          <div hidden={widget.id !== dockedWidget?.id} key={widget.id}>
            <WidgetRenderer widgetId={widget.id} />
          </div>
        ))
      )}
    </div>
  );
};
