import { Suspense, lazy, useMemo } from "react";

import { selectDockedWidget, useWidgetStore } from "@/store/useWidgetStore";
import { X } from "lucide-react";
import { SearchButton } from "./SearchButton";
import { Tooltip } from "./Tooltip";
import { Button } from "./ui/button";

export const Sidebar = () => {
  const dockedWidget = useWidgetStore(selectDockedWidget)!;
  const deactivateWidget = useWidgetStore((state) => state.deactivateWidget);

  const Widget = useMemo(
    () => lazy(() => import(`../widgets/${dockedWidget.id}/index.ts`)),
    [dockedWidget],
  );

  const handleXClick = () => {
    deactivateWidget(dockedWidget.id);
  };

  return (
    <div className="flex h-full w-[32rem] flex-col gap-y-4 bg-gray-100 p-4">
      <SearchButton fullWidth />
      <div className="group flex items-center justify-between border-b-2">
        <p className="text-2xl">{dockedWidget.title}</p>
        <Tooltip title="Close" side="right">
          <Button variant="ghost" size="icon" onClick={handleXClick}>
            <X className="h-8 w-8 text-red-400 opacity-0 transition-opacity group-hover:opacity-100" />
          </Button>
        </Tooltip>
      </div>
      <Suspense fallback={<p>Loading...</p>}>
        <Widget />
      </Suspense>
    </div>
  );
};
