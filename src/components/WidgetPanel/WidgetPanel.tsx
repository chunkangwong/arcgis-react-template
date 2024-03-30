import { useTranslation } from "react-i18next";

import { useBreakpoint } from "@/hooks/useBreakpoint";
import { useResizeSidebarWidth } from "@/hooks/useResizeSidebarWidth";
import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/store/useSidebarStore";
import { RecentChipsContainer } from "../RecentChipsContainer";
import { SearchButton } from "../SearchButton";
import { ActiveWidgets } from "./ActiveWidgets";
import { WidgetPanelHeader } from "./WidgetPanelHeader";

interface WidgetPanelProps {
  searchButton: React.ReactNode;
  recentChipsContainer: React.ReactNode;
  widgetPanelHeader: React.ReactNode;
  activeWidgets: React.ReactNode;
}

const WidgetPanelWrapper = ({
  activeWidgets,
  recentChipsContainer,
  searchButton,
  widgetPanelHeader,
}: WidgetPanelProps) => {
  const sidebarOpen = useSidebarStore((state) => state.sidebarOpen);
  const width = useSidebarStore((state) => state.width);
  const setWidth = useSidebarStore((state) => state.setWidth);
  const matches = useBreakpoint("md");

  const { enableResize } = useResizeSidebarWidth({
    onWidthChange: setWidth,
    minWidth: 20 * 16,
  });

  return (
    <>
      <div
        style={matches ? { width: `${width / 16}rem` } : undefined}
        className={cn(
          "flex h-full w-full transform transition-transform duration-300 flex-col gap-y-4 overflow-y-auto bg-background p-4",
          !sidebarOpen &&
            "hidden md:flex translate-y-full translate-x-0 md:translate-y-0 md:-translate-x-full",
        )}
      >
        {searchButton}
        {recentChipsContainer}
        {widgetPanelHeader}
        {activeWidgets}
      </div>
      <div
        className="w-4 cursor-ew-resize bg-background border-r-4 border-r-gray-200 dark:border-r-gray-800 hover:border-r-gray-500 dark:hover:border-r-gray-500 active:border-r-gray-500 dark:active:border-r-gray-500 hover:transition-colors"
        onMouseDown={enableResize}
        draggable
        onDragStart={(e) => e.preventDefault()}
      ></div>
    </>
  );
};

export const WidgetPanel = () => {
  const { t } = useTranslation();
  return (
    <WidgetPanelWrapper
      searchButton={
        <SearchButton
          fullWidth
          label={t("Search for widget...")}
          tabToOpen="widgets"
        />
      }
      recentChipsContainer={
        <RecentChipsContainer enableScrollButton parent="WidgetPanel" />
      }
      widgetPanelHeader={<WidgetPanelHeader />}
      activeWidgets={<ActiveWidgets />}
    />
  );
};
