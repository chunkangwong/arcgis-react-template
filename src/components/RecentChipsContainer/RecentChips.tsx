import Point from "@arcgis/core/geometry/Point";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import { Component, Layers, Pin, X } from "lucide-react";
import { toast } from "sonner";

import { map, view } from "@/arcgis";
import {
  RecentItem,
  RecentPlaceItem,
  useRecentStore,
} from "@/store/useRecentStore";
import { useSidebarStore } from "@/store/useSidebarStore";
import { useWidgetStore } from "@/store/useWidgetStore";
import { Tooltip } from "../Tooltip";
import { MotionButton } from "../ui/button";

interface RecentChipsProps {
  parent: "WidgetPanel" | "MapWidgetContainer";
}

const chipIcons = {
  places: <Pin className="h-3 w-3" />,
  widgets: <Component className="h-3 w-3" />,
  portalItems: <Layers className="h-3 w-3" />,
};

export const RecentChips = ({ parent }: RecentChipsProps) => {
  const recentItems = useRecentStore((state) => state.recentItems);
  const removeRecentItem = useRecentStore((state) => state.removeRecentItem);
  const activateWidget = useWidgetStore((state) => state.activateWidget);
  const openSidebar = useSidebarStore((state) => state.openSidebar);

  const handleRemove = (id: string) => (e: React.MouseEvent) => {
    e.stopPropagation();
    removeRecentItem(id);
  };

  const handleClick = (recentItem: RecentItem) => async () => {
    if (recentItem.type === "portalItems") {
      for (const layer of map.layers) {
        if ((layer as __esri.FeatureLayer)?.portalItem?.id === recentItem.id) {
          layer.visible = true;
          await view.goTo(layer.fullExtent);
          return;
        }
      }
      try {
        toast.info("Adding layer...");
        const layer = new FeatureLayer({
          portalItem: {
            id: recentItem.id,
          },
        });
        map.add(layer);
        await layer.load();
        await view.goTo(layer.fullExtent);
        toast.success("Layer added");
      } catch (error) {
        console.error(error);
        toast.error("Error adding layer");
      }
    } else if (recentItem.type === "widgets") {
      activateWidget(recentItem.id);
      openSidebar();
    } else {
      const geometry = Point.fromJSON((recentItem as RecentPlaceItem).geometry);
      view.goTo({ target: geometry, zoom: 15 });
    }
  };

  return (
    <>
      {recentItems.map((item) => (
        <Tooltip title={item.title} key={`${parent}-${item.id}`} side="bottom">
          <MotionButton
            layout
            layoutId={`${parent}-${item.id}`}
            size="sm"
            className="group flex rounded-3xl gap-x-2 px-2 h-8"
            onClick={handleClick(item)}
          >
            {chipIcons[item.type]}
            <span className="text-xs max-w-32 overflow-hidden whitespace-nowrap text-ellipsis">
              {item.title}
            </span>
            <X
              className="cursor-pointer opacity-0 h-4 w-4 rounded-full text-white group-hover:opacity-100 bg-red-400 hover:bg-red-500 hover:scale-125 transition duration-300"
              onClick={handleRemove(item.id)}
            />
          </MotionButton>
        </Tooltip>
      ))}
    </>
  );
};
