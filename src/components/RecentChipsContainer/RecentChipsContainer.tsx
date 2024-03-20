import {
  ChevronLeft,
  ChevronRight,
  Component,
  Layers,
  Pin,
} from "lucide-react";

import { useRecentStore } from "@/store/useRecentStore";
import { useEffect, useRef, useState } from "react";
import { Tooltip } from "../Tooltip";
import { Button } from "../ui/button";

const chipIcons = {
  places: <Pin className="h-3 w-3" />,
  widgets: <Component className="h-3 w-3" />,
  portalItems: <Layers className="h-3 w-3" />,
};

export const RecentChipsContainer = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState<
    "start" | "end" | "middle"
  >("start");

  const recentItems = useRecentStore((state) => state.recentItems);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (container.scrollLeft === 0) {
        setScrollPosition("start");
      } else if (
        container.scrollLeft + container.clientWidth >=
        container.scrollWidth
      ) {
        setScrollPosition("end");
      } else {
        setScrollPosition("middle");
      }
    };

    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = (direction: "left" | "right") => () => {
    const container = containerRef.current;
    if (!container) return;
    if (direction === "left") {
      container.scrollBy({
        left: -container.clientWidth,
        behavior: "smooth",
      });
    } else {
      container.scrollBy({
        left: container.clientWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="flex w-full items-center">
      <Button
        disabled={scrollPosition === "start"}
        size="icon"
        variant="ghost"
        className="h-8 w-8 disabled:opacity-20 transition-opacity"
        onClick={handleScroll("left")}
      >
        <ChevronLeft />
      </Button>
      <div ref={containerRef} className="flex gap-2 w-full overflow-auto">
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
      <Button
        disabled={scrollPosition === "end"}
        size="icon"
        variant="ghost"
        className="h-8 w-8 disabled:opacity-20 transition-opacity"
        onClick={handleScroll("right")}
      >
        <ChevronRight />
      </Button>
    </div>
  );
};
