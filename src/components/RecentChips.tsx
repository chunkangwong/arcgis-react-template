import { Component, Layers, Pin } from "lucide-react";

import { useRecentStore } from "@/store/useRecentStore";
import { Tooltip } from "./Tooltip";
import { Button } from "./ui/button";

const chipIcons = {
  places: <Pin className="h-3 w-3" />,
  widgets: <Component className="h-3 w-3" />,
  portalItems: <Layers className="h-3 w-3" />,
};

export const RecentChips = () => {
  const recentItems = useRecentStore((state) => state.recentItems);

  return (
    <div className="flex gap-2">
      {recentItems.map((item) => (
        <Tooltip title={item.title} key={item.id} side="bottom">
          <Button size="sm" className="flex rounded-3xl gap-x-2 px-2 h-8">
            {chipIcons[item.type]}
            <span className="text-xs max-w-32 overflow-hidden whitespace-nowrap text-ellipsis">
              {item.title}
            </span>
          </Button>
        </Tooltip>
      ))}
    </div>
  );
};
