import { X } from "lucide-react";

import { selectDockedWidget, useWidgetStore } from "@/store/useWidgetStore";
import { Button } from "../ui/button";

export const WidgetPanelHeader = () => {
  const dockedWidget = useWidgetStore(selectDockedWidget);
  const deactivateWidget = useWidgetStore((state) => state.deactivateWidget);

  const handleXClick = () => {
    if (dockedWidget) {
      deactivateWidget(dockedWidget.id);
    }
  };

  return (
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
  );
};
