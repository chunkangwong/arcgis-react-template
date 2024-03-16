import { useBreakpoint } from "@/hooks/useBreakpoint";
import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/store/useSidebarStore";
import { Map } from "./Map";

interface MapWrapperProps {
  children: React.ReactNode;
}

const MapWrapperInner = ({ children }: MapWrapperProps) => {
  const sidebarOpen = useSidebarStore((state) => state.sidebarOpen);
  const width = useSidebarStore((state) => state.width);
  const matches = useBreakpoint("md");

  return (
    <div
      style={
        !sidebarOpen && matches
          ? {
              marginLeft: `-${width / 16}rem`,
            }
          : undefined
      }
      className={cn(
        "h-full flex-1 transform duration-300",
        sidebarOpen && "hidden md:block ml-0",
      )}
    >
      {children}
    </div>
  );
};

export const MapWrapper = () => {
  return (
    <MapWrapperInner>
      <Map />
    </MapWrapperInner>
  );
};
