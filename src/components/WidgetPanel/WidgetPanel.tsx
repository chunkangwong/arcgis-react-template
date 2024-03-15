import { useResizeSidebarWidth } from "@/hooks/useResizeSidebarWidth";
import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/store/useSidebarStore";
import { SearchButton } from "../SearchButton";
import { ActiveWidgets } from "./ActiveWidgets";
import { WidgetPanelHeader } from "./WidgetPanelHeader";

interface WidgetPanelProps {
  searchButton: React.ReactNode;
  widgetPanelHeader: React.ReactNode;
  activeWidgets: React.ReactNode;
}

const WidgetPanelWrapper = ({
  activeWidgets,
  searchButton,
  widgetPanelHeader,
}: WidgetPanelProps) => {
  const sidebarOpen = useSidebarStore((state) => state.sidebarOpen);
  const width = useSidebarStore((state) => state.width);
  const setWidth = useSidebarStore((state) => state.setWidth);

  const { enableResize } = useResizeSidebarWidth(setWidth);

  return (
    <>
      <div
        style={{ width: `${width / 16}rem` }}
        className={cn(
          "flex h-full w-full transform transition-transform duration-300 flex-col gap-y-4 overflow-y-auto bg-gray-100 p-4",
          !sidebarOpen &&
            "hidden md:flex translate-y-full translate-x-0 md:translate-y-0 md:-translate-x-full",
        )}
      >
        {searchButton}
        {widgetPanelHeader}
        {activeWidgets}
      </div>
      <div
        className="w-4 cursor-ew-resize bg-gray-100 border-r-4 border-r-gray-200 hover:border-r-gray-500 active:border-r-gray-500 transition-colors"
        onMouseDown={enableResize}
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
      widgetPanelHeader={<WidgetPanelHeader />}
      activeWidgets={<ActiveWidgets />}
    />
  );
};
