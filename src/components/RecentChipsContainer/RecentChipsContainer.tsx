import { ChevronLeft, ChevronRight } from "lucide-react";

import { useRecentStore } from "@/store/useRecentStore";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { RecentChips } from "./RecentChips";

interface RecentChipsContainerProps {
  recentChips: React.ReactNode;
}

const RecentChipsContainerWrapper = ({
  recentChips,
}: RecentChipsContainerProps) => {
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

  if (recentItems.length === 0) return null;

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
        {recentChips}
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

export const RecentChipsContainer = () => {
  return <RecentChipsContainerWrapper recentChips={<RecentChips />} />;
};
