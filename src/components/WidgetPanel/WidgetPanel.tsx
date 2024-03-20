import { useBreakpoint } from "@/hooks/useBreakpoint";
import { useResizeSidebarWidth } from "@/hooks/useResizeSidebarWidth";
import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/store/useSidebarStore";
import { RecentChips } from "../RecentChips";
import { SearchButton } from "../SearchButton";
import { ActiveWidgets } from "./ActiveWidgets";
import { WidgetPanelHeader } from "./WidgetPanelHeader";

interface WidgetPanelProps {
  searchButton: React.ReactNode;
  recentChips: React.ReactNode;
  widgetPanelHeader: React.ReactNode;
  activeWidgets: React.ReactNode;
}

const WidgetPanelWrapper = ({
  activeWidgets,
  recentChips,
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
          "flex h-full w-full transform transition-transform duration-300 flex-col gap-y-4 overflow-y-auto bg-gray-100 p-4",
          !sidebarOpen &&
            "hidden md:flex translate-y-full translate-x-0 md:translate-y-0 md:-translate-x-full",
        )}
      >
        {searchButton}
        {recentChips}
        {widgetPanelHeader}
        {activeWidgets}
      </div>
      <div
        className="w-4 cursor-ew-resize bg-gray-100 border-r-4 border-r-gray-200 hover:border-r-gray-500 active:border-r-gray-500 transition-colors"
        onMouseDown={enableResize}
        draggable
        onDragStart={(e) => e.preventDefault()}
      ></div>
    </>
  );
};

export const WidgetPanel = () => {
  return (
    <WidgetPanelWrapper
      searchButton={
        <SearchButton
          fullWidth
          label="Search for widget..."
          tabToOpen="widgets"
        />
      }
      recentChips={<RecentChips />}
      widgetPanelHeader={<WidgetPanelHeader />}
      activeWidgets={<ActiveWidgets />}
    />
  );
};
