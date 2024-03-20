import { Component, Layers, Pin, X } from "lucide-react";

import { useRecentStore } from "@/store/useRecentStore";
import { Tooltip } from "../Tooltip";
import { Button } from "../ui/button";

const chipIcons = {
  places: <Pin className="h-3 w-3" />,
  widgets: <Component className="h-3 w-3" />,
  portalItems: <Layers className="h-3 w-3" />,
};

export const RecentChips = () => {
  const recentItems = useRecentStore((state) => state.recentItems);
  const removeRecentItem = useRecentStore((state) => state.removeRecentItem);

  const handleRemove = (id: string) => (e: React.MouseEvent) => {
    e.stopPropagation();
    removeRecentItem(id);
  };

  return (
    <>
      {recentItems.map((item) => (
        <Tooltip title={item.title} key={item.id} side="bottom">
          <Button size="sm" className="group flex rounded-3xl gap-x-2 px-2 h-8">
            {chipIcons[item.type]}
            <span className="text-xs max-w-32 overflow-hidden whitespace-nowrap text-ellipsis">
              {item.title}
            </span>
            <X
              className="cursor-pointer opacity-0 h-4 w-4 rounded-full group-hover:opacity-100 transition-opacity bg-red-400 hover:bg-red-500"
              onClick={handleRemove(item.id)}
            />
          </Button>
        </Tooltip>
      ))}
    </>
  );
};
