import { useEffect, useRef } from "react";

import { view } from "@/arcgis";
import { useSidebarStore } from "@/store/useSidebarStore";
import { RecentChipsContainer } from "./RecentChipsContainer";
import { SearchButton } from "./SearchButton";

interface MapWidgetContainerProps {
  searchButton: React.ReactNode;
  recentChipsContainer: React.ReactNode;
}

const MapWidgetContainerInner = ({
  searchButton,
  recentChipsContainer,
}: MapWidgetContainerProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const sidebarOpen = useSidebarStore((state) => state.sidebarOpen);

  useEffect(() => {
    if (ref.current) {
      view.ui.add(ref.current, { position: "top-left", index: 0 });
    }
    if (sidebarOpen) {
      view.ui.remove(ref.current!);
    }
  }, [sidebarOpen]);

  return (
    <div ref={ref} className="!shadow-none w-full flex flex-col gap-y-4">
      {searchButton}
      {recentChipsContainer}
    </div>
  );
};

export const MapWidgetContainer = () => {
  return (
    <MapWidgetContainerInner
      searchButton={<SearchButton />}
      recentChipsContainer={
        <RecentChipsContainer parent="MapWidgetContainer" />
      }
    />
  );
};
